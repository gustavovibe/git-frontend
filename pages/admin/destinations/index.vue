<template>
  <div class="overflow-hidden mb-8 main-spacing-cms">
    <div class="grid">
      <div class="col-12 lg:col-2">
        <PanelMenuCMS/>
      </div>
      <div class="col-12 lg:col-10">
        <div class="back-green-vibe-light grid">
          <div class="col-6 md:col-8 lg:col-9" style="">
            <h1 class="canaro-font font-semibold">Destinations</h1>
            <p class="">Showing {{ totalDestination }} Destinations</p>
          </div>
          <div class="col-6 md:col-4 lg:col-3 flex justify-content-center align-items-center "
               style="">
            <div class="grid">
              <div class="col-12 md:col-12 lg:col-6 flex justify-content-center" style="">
                <Button class="w-13rem" label="Export to CSV" severity="secondary" @click="exportData"
                        style="background-color: #82cf35; color: white; border-color: #82cf35"/>
              </div>
              <div class="col-12 md:col-12 lg:col-6 flex justify-content-center" style="">
                <Dropdown v-model="order" optionLabel="text"
                          :options="sort_list" placeholder="Sort by"/>
              </div>
            </div>
          </div>
        </div>
        <div class="my-4 grid flex">
          <div class="col-6 md:col-3 lg:col-2 align-content-center">
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search"></InputIcon>
              <InputText v-model="city_name" editable optionLabel="name" placeholder="Search by name"
                         class="w-full" @input="handleCityName()"/>
            </IconField>
          </div>
          <div class="col-6 md:col-3 lg:col-2 align-content-center">
            <MultiSelect v-model="params.categoryFilter" display="chip" :options="options" optionLabel="name"
                         placeholder="Select Category"
                         :maxSelectedLabels="3" class="w-full" optionValue="code"/>
          </div>
          <div class="col-6 md:col-3 lg:col-2 align-content-center">
            <Button label="Adventures" severity="secondary" outlined class="w-full" @click="toggleAdventures"/>
            <div class="w-13rem">
              <OverlayPanel ref="opAdventures" :style="{width: '15rem'}">
                <Slider v-model="totalAdventuresRange" :min="0" :max="500" :step="1"
                        range @change="handleAdventures"/>
                <div class="flex align-items-center justify-content-between">
                  <div><p>{{ totalAdventuresRange[0] }}</p></div>
                  <div><p>{{ totalAdventuresRange[1] }}</p></div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2 align-content-center">
            <Button label="Total Commission" severity="secondary" outlined class="w-full"
                    @click="toggleTotalCommission"/>
            <div class="w-13rem">
              <OverlayPanel ref="opTotalCommission" :style="{width: '15rem'}">
                <Slider v-model="totalCommissionRange" :min="0" :max="50000" :step="1"
                        range @change="handleCommission"/>
                <div class="flex align-items-center justify-content-between">
                  <div><p>{{ totalCommissionRange[0] }}</p></div>
                  <div><p>{{ totalCommissionRange[1] }}</p></div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2 align-content-center">
            <Button label="Total Paid" severity="secondary" outlined class="w-full" @click="toggleTotalPaid"/>
            <div class="w-13rem">
              <OverlayPanel ref="opTotalPaid" :style="{width: '15rem'}">
                <Slider v-model="totalPaidRange" :min="0" :max="50000" :step="1"
                        range @change="handlePaid"/>
                <div class="flex align-items-center justify-content-between">
                  <div><p>{{ totalPaidRange[0] }}</p></div>
                  <div><p>{{ totalPaidRange[1] }}</p></div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <div class="col-6 md:col-3 lg:col-2 align-content-center">
            <a class="text_decoration_none md:mx-2">
              <button class="btn-custom w-full cover-mobile" style="padding-top: 0.7rem;padding-bottom: 0.7rem;"
                      @click="cleanFilter()">
                Clean filter
              </button>
            </a>
          </div>
        </div>
        <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
        <div class="my-4">
          <div class="card">
            <DataTable :value="destinations" tableStyle="min-width: 50rem">
              <Column field="name" header="Destination"></Column>
              <Column field="number_of_tours" header="Adventures"></Column>
              <Column field="commission" header="Total commission">
                <template #body="slotProps">
                  <a>{{ '$' + slotProps.data.commission }}</a>
                </template>
              </Column>
              <Column field="total_paid" header="Total paid">
                <template #body="slotProps">
                  <a>{{ '$' +Math.ceil( slotProps.data.total_paid) }}</a>
                </template>
              </Column>
              <Column header="Actions">
                <template #body="slotProps">
                  <Button label="Edit" @click="editRow(slotProps.data)"/>
                </template>
              </Column>
            </DataTable>
            <div class="card">
              <Paginator :rows="10" :totalRecords="totalDestination" :rowsPerPageOptions="[10, 20, 30]"
                         @page="onPageChange"
              ></Paginator>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth','profile'],
	});
import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import {onMounted, ref, watch} from 'vue';
import {useToast} from "primevue/usetoast";
import {debounce} from 'lodash-es';
import {useRouter} from 'vue-router';
import {useDestinationStore} from "@/store/destinationStore";
import OverlayPanel from 'primevue/overlaypanel';

const opAdventures = ref();
const toggleAdventures = (event) => {
  opAdventures.value.toggle(event);
}

const opTotalCommission = ref();
const toggleTotalCommission = (event) => {
  opTotalCommission.value.toggle(event);
}

const opTotalPaid = ref();
const toggleTotalPaid = (event) => {
  opTotalPaid.value.toggle(event);
}

const config = useRuntimeConfig();
const url = ref(config.public.BACKEND_URL)
const router = useRouter();
const editRow = (rowData) => {
  router.push(`/admin/destinations/${rowData.category}-${rowData.id}`);
}
const destinationStore = useDestinationStore();
const destinations = computed(() => destinationStore.destinations);
const totalAdventuresRange = ref([0, 500]);
const totalCommissionRange = ref([0, 50000]);
const totalPaidRange = ref([0, 50000]);
const city_name = ref('')
const cleanFilter = () => {
  city_name.value = '';
  totalAdventuresRange.value = [0, 500]
  totalCommissionRange.value = [0, 50000]
  totalPaidRange.value = [0, 50000]
  params.value.categoryFilter = []
  params.value.alphabeticOrderFilter = ''
  params.value.adventuresFilter = ''
  params.value.totalPaidFilter = ''
  params.value.commissionFilter = ''
  params.value.totalAdventuresRange = []
  params.value.totalCommissionRange = []
  params.value.totalPaidRange = []
  params.value.q = ''
}
const handleCityName = debounce(() => {
  params.value.q = city_name.value
}, 300);
const handleAdventures = debounce(() => {
  params.value.totalAdventuresRange = totalAdventuresRange.value
}, 300);
const handleCommission = debounce(() => {
  params.value.totalCommissionRange = totalCommissionRange.value
}, 300);
const handlePaid = debounce(() => {
  params.value.totalPaidRange = totalPaidRange.value
}, 300);
const category = ref();
const order = ref({"code": 1, "text": "Name: A to Z", "filter": "alphabeticOrderFilter", "value": "asc"});
const totalDestination = computed(() => destinationStore.totalDestinations);
const toast = useToast();
const loading = computed(() => destinationStore.loadingDestinations);
const options = ref([
  {name: 'Country', code: 'country'},
  {name: 'City', code: 'city'},
  {name: 'Natural Destination', code: 'natural_destination'},
]);
const perPage = ref(10);
const page = ref(1);
const onPageChange = (event) => {
  params.value.perPage = event.rows;
  params.value.page = event.page + 1;
};
const sort_list = ref([
  {code: 1, text: 'Name: A to Z'},
  {code: 2, text: 'Name: Z to A'},
  {code: 3, text: 'Adventures #: max first'},
  {code: 4, text: 'Adventures #: min first'},
  {code: 5, text: 'Total paid: max first'},
  {code: 6, text: 'Total paid: min first'},
  {code: 7, text: 'Total commission: max first'},
  {code: 8, text: 'Total commission: min first'},
]);
const params = ref({
  categoryFilter: [],
  alphabeticOrderFilter: '',
  adventuresFilter: '',
  totalPaidFilter: '',
  commissionFilter: '',
  totalAdventuresRange: [],
  totalCommissionRange: [],
  totalPaidRange: [],
});

const notification = (severity, summary, detail) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000
  });
};


const exportData = () => {
  if (params.value.categoryFilter.length === 0) {
    destinationStore.clean();
    notification('error', 'Error', 'To obtain the export you must select a category');
  } else {
    destinationStore.getAllDestinationsExport(params.value, url.value);
  }
};

watch(order, (newValue) => {
  params.value.alphabeticOrderFilter = '';
  params.value.adventuresFilter = '';
  params.value.totalPaidFilter = '';
  params.value.commissionFilter = '';
  switch (newValue.code) {
    case 1:
      params.value.alphabeticOrderFilter = 'asc';
      break;
    case 2:
      params.value.alphabeticOrderFilter = 'desc';
      break;
    case 3:
      params.value.adventuresFilter = 'desc';
      break;
    case 4:
      params.value.adventuresFilter = 'asc';
      break;
    case 5:
      params.value.totalPaidFilter = 'desc';
      break;
    case 6:
      params.value.totalPaidFilter = 'asc';
      break;
    case 7:
      params.value.commissionFilter = 'desc';
      break;
    case 8:
      params.value.commissionFilter = 'asc';
      break;
  }
});

watch(params, () => {
  if (params.value.categoryFilter.length === 0) {
    destinationStore.clean();
    notification('error', 'Error', 'To obtain the data you must select a category');
  } else {
    destinationStore.getAllDestinations(params.value, url.value);
  }
}, {deep: true});

onMounted(() => {
  params.value.categoryFilter = ['country', 'city', 'natural_destination']
  destinationStore.getAllDestinations(params.value, url.value);
});
</script>

<style scoped>
</style>