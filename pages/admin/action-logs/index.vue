<template>
  <div class="overflow-hidden mb-8 main-spacing-cms">
    <div class="grid">
      <div class="col-12 lg:col-2">
        <PanelMenuCMS/>
      </div>
      <div class="col-12 lg:col-10">
        <div class="flex align-items-center justify-content-between back-green-vibe-light px-5">
          <div>
            <h1 class="canaro-font font-semibold my-1">Action logs</h1>
            <p class="my-1">Showing {{ totalActionLogs }} logs</p>
          </div>
        </div>
        <div class="w-11 my-4 mx-auto lg:mx-0 lg:flex align-items-center justify-content-between">
          <InputGroup style="margin-right: 5px;">
            <InputGroupAddon>
              <i class="pi pi-search"></i>
            </InputGroupAddon>
            <InputText id="username" v-model="name" placeholder="Enter user name"
                       class="w-full lg:w-17rem" @input="handleUserName"/>
          </InputGroup>

          <InputGroup style="margin-right: 10px;">
            <Dropdown v-model="date" :options="dates" optionLabel="name" optionValue="code"
                      placeholder="All times"
                      :maxSelectedLabels="3" class="w-full lg:w-14rem" @change="dateCalculation(date)"/>
          </InputGroup>

          <InputGroup style="margin-right: 10px;">
            <Dropdown v-model="params.type" :options="types" optionLabel="text" optionValue="code"
                      placeholder="All log types"
                      :maxSelectedLabels="3" class="w-full lg:w-14rem"/>
          </InputGroup>

          <InputGroup>
            <Button class="btn-custom md:px-6 cover-mobile" label="Clear filters" @click="clearFilters"/>
          </InputGroup>
        </div>
        <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
        <div class="my-4 canaro-font">
          <DataTable :value="actionsLogs" tableStyle="min-width: 50rem">
            <Column field="date" header="Date" headerClass="custom-header" style="width: 15%;"></Column>
            <Column field="user.email" header="User" headerClass="custom-header" style="width: 30%;">
              <template #body="slotProps">
                <a>{{ `${slotProps.data.user.email} (${slotProps.data.user.name})` }}</a>
              </template>
            </Column>
            <Column field="action" header="Action" headerClass="custom-header" style="width: 30%;"></Column>
            <Column field="type" header="Type" headerClass="custom-header" style="width: 8%;"></Column>
            <Column field="item" header="Item" headerClass="custom-header" style="width: 8%;"></Column>

          </DataTable>
          <div class="card">
            <Paginator :rows="10" :totalRecords="totalActionLogs" :rowsPerPageOptions="[10, 20, 30]"
                       @page="onPageChange"
            ></Paginator>
          </div>
        </div>
        <Toast></Toast>
      </div>
    </div>
  </div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth','profile'],
	});
import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
import {ref, onMounted, watch} from 'vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column'
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from "primevue/button";
import {useToast} from "primevue/usetoast";
import {useActionLogStore} from "@/store/actionLogStore";
import ProgressBar from 'primevue/progressbar';
import Dropdown from 'primevue/dropdown';
import Paginator from "primevue/paginator";
import dayjs from 'dayjs';


const config = useRuntimeConfig();
const url = ref(config.public.BACKEND_URL)
const date = ref(0);
const name = ref('');
const loading = computed(() => actionLogStore.loadingActionLogs);
const totalActionLogs = computed(() => actionLogStore.total);
const actionLogStore = useActionLogStore();
const actionsLogs = computed(() => actionLogStore.actionLogs);
const toast = useToast();
const params = ref({});
const dates = ref([
  {name: 'All times', code: '0'},
  {name: 'Today', code: '1'},
  {name: 'Yesterdays', code: '2'},
  {name: 'Last 7 days', code: '3'},
  {name: 'Last 30 days', code: '4'},
  {name: 'This week', code: '5'},
  {name: 'Last week', code: '6'},
  {name: 'This month:', code: '7'},
  {name: 'Last month:', code: '8'},
  {name: 'This year', code: '9'},
  {name: 'Last year', code: '10'}
]);

const types = ref([
  {text: 'Create', code: 'create'},
  {text: 'Delete', code: 'delete'},
  {text: 'Update', code: 'update'},
  {text: 'All log types', code: 'all'},
]);

const handleUserName = () => {
  params.value.q = name.value
};

const dateCalculation = (code) => {
  let startDate, endDate;
  const today = dayjs();
  const startOfWeek = today.startOf('week');
  const endOfWeek = today.endOf('week');
  const startOfMonth = today.startOf('month');
  const endOfMonth = today.endOf('month');
  const startOfYear = today.startOf('year');
  const endOfYear = today.endOf('year');
  switch (code) {
    case '0':
      startDate = startOfYear.subtract(5, 'year');
      endDate = today.endOf('day');
      break;
    case '1':
      startDate = today.startOf('day');
      endDate = today.endOf('day');
      break;
    case '2':
      startDate = today.subtract(1, 'day').startOf('day');
      endDate = today.subtract(1, 'day').endOf('day');
      break;
    case '3':
      startDate = today.subtract(7, 'day').startOf('day');
      endDate = today.endOf('day');
      break;
    case '4':
      startDate = today.subtract(30, 'day').startOf('day');
      endDate = today.endOf('day');
      break;
    case '5':
      startDate = startOfWeek;
      endDate = endOfWeek;
      break;
    case '6':
      startDate = startOfWeek.subtract(7, 'day');
      endDate = endOfWeek.subtract(7, 'day');
      break;
    case '7':
      startDate = startOfMonth;
      endDate = endOfMonth;
      break;
    case '8':
      startDate = startOfMonth.subtract(1, 'month');
      endDate = endOfMonth.subtract(1, 'month');
      break;
    case '9':
      startDate = startOfYear;
      endDate = endOfYear;
      break;
    case '10':
      startDate = startOfYear.subtract(1, 'year');
      endDate = endOfYear.subtract(1, 'year');
      break;
    default:
      throw new Error("Invalid code provided.");
  }
  params.value.startDate = startDate ? startDate.format('YYYY-MM-DD') + ' 00:00:00' : null
  params.value.endDate = endDate ? endDate.format('YYYY-MM-DD') + ' 23:59:59' : null
};

const onPageChange = (event) => {
  params.value.perPage = event.rows;
  params.value.page = event.page + 1;
};

const clearFilters = () => {
  params.value.q = '';
  params.value.startDate = '';
  params.value.endDate = '';
  params.value.type = '';
  name.value = '';
  date.value = 0;
  actionLogStore.getAllActionLogs(params.value, url.value);
};

watch(params, () => {
  actionLogStore.getAllActionLogs(params.value, url.value);
}, {deep: true});

onMounted(() => {
  actionLogStore.getAllActionLogs(params.value, url.value);
});
</script>

<style scoped>
.table_s .p-datatable-thead > tr > th {
  background-color: rgba(0, 128, 0, 0.1);
}

.table_s .header-no-grid {
  border: none !important;
}

.table_s .content-grid {
  border: 1px solid #ccc;
}

@media only screen and (max-width: 767px) {
  .filters {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .filters {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

@media only screen and (min-width: 1200px) {
}

</style>