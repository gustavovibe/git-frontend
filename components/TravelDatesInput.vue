<script setup>
//@ts-nocheck
import { ref, watch, onMounted } from "vue";
import travelersinput from "~/components/TravelersInput.vue";
import departureinput from "~/components/DepartureInput.vue";
import destinationsinput from "~/components/DestinationsInput.vue";
import { storeToRefs } from 'pinia';
import { useHomeFormStore } from '@/store/homeFormStore'
import { useToast } from "primevue/usetoast";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';

const emit = defineEmits();
const toast = useToast();
const homeFormStore = useHomeFormStore();
const props = defineProps(['travelDatesSelected'])
const {
  departureSelected,
  destinationsSelected,
  totalTravelers,
  adultsCount,
  childrenCount,
  infantsCount
} = storeToRefs(homeFormStore);
const showToast = (msg) => {
  toast.add({ severity: 'Secondary', detail: msg, life: 3000 });
}

const startString = ref(null);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const formatDateDay = (date) => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatDates = (startDate, endDate) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  return formattedStartDate + "-" +formattedEndDate;
};
const formatDatesInput = (startDate, endDate) => {
  const formattedStartDate = formatDateDay(startDate);
  const formattedEndDate = formatDateDay(endDate);
  return formattedStartDate + "-" +formattedEndDate;
};

const dates = ref([]);
const timeSlider = ref([2, 65]);
const checked1 = ref(false);
const checked3 = ref(false);
const checked5 = ref(false);
const checked7 = ref(false);
const checked15 = ref(false);

const onDateSelect = (date) => {
  checked1.value = false;
  checked3.value = false;
  checked5.value = false;
  checked7.value = false;
  checked15.value = false;
  const today = new Date();
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
  if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

function handleCancelClick() {
  visible.value = false
  dates.value = []
  startString.value = null
}

watch(checked1, (value) => {
  if (value) {
    checked3.value = false;
    checked5.value = false;
    checked7.value = false;
    checked15.value = false;
    expandRange(1);
  }
  else { reduceRange(1); }
});

watch(checked3, (value) => {
  if (value) {
    checked1.value = false;
    checked5.value = false;
    checked7.value = false;
    checked15.value = false;
    expandRange(3);
  }
  else { reduceRange(3); }
});

watch(checked5, (value) => {
  if (value) {
    checked1.value = false;
    checked3.value = false;
    checked7.value = false;
    checked15.value = false;
    expandRange(5);
  }
  else { reduceRange(5); }
});
watch(checked7, (value) => {
  if (value) {
    checked1.value = false;
    checked3.value = false;
    checked5.value = false;
    checked15.value = false;
    expandRange(7);
  }
  else { reduceRange(7); }
});
watch(checked15, (value) => {
  if (value) {
    checked1.value = false;
    checked3.value = false;
    checked5.value = false;
    checked7.value = false;
    expandRange(14);
  }
  else { reduceRange(14); }
});


const expandRange = (days) => {
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
  else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

const reduceRange = (days) => {
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(startDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
  if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

const visible = ref(false);

watch(departureSelected, (newDeparture) => {
  if (newDeparture) {
    console.log("departureSelected.value", departureSelected.value);
  }
});

const updateTravelDates = () => {
  visible.value = false;
  const startDate = new Date(dates.value[0]);
  const endDate = new Date(dates.value[1]);
  const formattedDates = formatDates(startDate, endDate);
  emit('update:travelDatesSelected', formattedDates);
}

const search = () => {
  if (!departureSelected) {
    showToast('Please select a departure')
    return
  }
  if (!destinationsSelected.value) {
    showToast('Please select destination')
    return
  }
  if (!totalTravelers?.value) {
    showToast('Please select travelers')
    return
  }
  if (!startString.value?.length) {
    showToast('Please select dates')
    return
  }
  let destinations = [];
  for (const destination of destinationsSelected.value) {
    destinations.push(destination.t_id);
  }
  let multipleDestinations = destinations.join(",");
  const config = useRuntimeConfig();
  const frontend_url = config.public.FRONTEND_URL
  const path = "/tours"
  const params = new URLSearchParams();
  params.append("search", "true");
  params.append("departureSelected", departureSelected.value);
  params.append("t_id", multipleDestinations);
  params.append("datesSelected", startString.value);
  params.append("timeStay", `${timeSlider.value[0]},${timeSlider.value[1]}`);
  params.append("adultsCount", adultsCount.value);
  params.append("childrenCount", childrenCount.value);
  params.append("infantsCount", infantsCount.value);


  const url = `${frontend_url}${path}?${params.toString()}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};

</script>

<template>
  <div class="w-full">
    <InputText placeholder="When are you going?" readonly type="text" v-model="startString" @click="visible = true" :pt="{
      root: {
        class: 'inputTextDateInSearchClass'
      }
    }" />

    <Dialog v-model:visible="visible" modal header="Select Dates" :style="{ width: '30vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" dismissableMask
      :pt="{ header: { class: 'pb-1' }, content: { class: 'pb-2' } }">
      <div class="grid">
        <div class="card col-12 lg:col-12 " style="display:block">
          <ToggleButton style="margin-right: 10px;" v-model="checked1" class="w-4rem" onLabel="±1" offLabel="±1"
            :pt="{ box: { class: 'py-1' } }" />
          <ToggleButton style="margin-right: 10px;" v-model="checked3" class="w-4rem" onLabel="±3" offLabel="±3"
            :pt="{ box: { class: 'py-1' } }" />
          <ToggleButton style="margin-right: 10px;" v-model="checked5" class="w-4rem" onLabel="±5" offLabel="±5"
            :pt="{ box: { class: 'py-1' } }" />
          <ToggleButton style="margin-right: 10px;" v-model="checked7" class="w-4rem" onLabel="±7" offLabel="±7"
            :pt="{ box: { class: 'py-1' } }" />
          <ToggleButton v-model="checked15" class="w-4rem" onLabel="±15" offLabel="±15"
            :pt="{ box: { class: 'py-1' } }" />
          <Calendar style="display:block;margin-top:10px" v-model="dates" selectionMode="range" :manualInput="false"
            inline @date-select="onDateSelect" />
        </div>
        <div class="card col-12 lg:col-12 py-0" style="display:block">
          <h3 class="pt-0 my-0" style="display:block">Time of stay: </h3>
          <div class="grid" style="text-align: center;align-items: flex-end;">
            <div class="col-2">
              <div class="slider-left">
                <input disabled v-model.number="timeSlider[0]"
                  style="width: 21px !important;border: none;background: white;" />Days
              </div>
            </div>
            <div class="col-8">
              <Slider min=1 max=66 v-model="timeSlider" range style="width: 100%;margin: 0px auto 10px auto;" />
            </div>
            <div class="col-2">
              <div class="slider-right">
                <input disabled v-model.number="timeSlider[1]"
                  style="width: 21px !important;border: none;background: white;" />Days
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex" style="justify-content: center;">
        <Button type="button" style="margin-right:10px" label="Cancel" severity="secondary"
          @click="handleCancelClick()"></Button>
        <Button type="button" label="Done" severity="warning" @click="updateTravelDates()"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Canaro';
  src: url(/fonts/canaro-l.ttf);
  font-weight: normal;
}

@font-face {
  font-family: 'Interstate';
  src: url(/fonts/Interstate-regular.ttf);
  font-weight: 100 !important;
}

.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}
</style>