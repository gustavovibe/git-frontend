<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import travelersinput from "~/components/TravelersInput.vue";
import departureinput from "~/components/DepartureInput.vue";
import destinationsinput from "~/components/DestinationsInput.vue";
import { storeToRefs } from 'pinia';
import { useHomeFormStore } from '@/store/homeFormStore'
import { useToast } from "primevue/usetoast";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import ConfirmPopup from "primevue/confirmpopup";

import dayjs from 'dayjs';
import { useConfirm } from "primevue/useconfirm";
const toast = useToast();
const homeFormStore = useHomeFormStore();
const {
  departureSelected,
  destinationsSelected,
  totalTravelers,
  adultsCount,
  childrenCount,
  infantsCount,
  travelersSelected
} = storeToRefs(homeFormStore);

const showToast = (msg) => {
  toast.add({ severity: 'Secondary', detail: msg, life: 3000 });
}

const confirmCalendar = useConfirm();

const requireConfirmation = (event) => {
  confirmCalendar.require({
    target: event.currentTarget,
    group: 'calendarConfirmPopup',
    message: 'Save your current process?',
    accept: () => null,
    reject: () => null
  });
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

const formatDates = (startDate, endDate) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  return `${formattedStartDate}-${formattedEndDate}`;
};

const timeSlider = ref([2, 65]);
const timeString = ref();

watch(timeSlider, (value) => {
  timeString.value = `${value[0]},${value[1]}`;
});

const dates = ref([]);
const startString = ref('');

const errors = ref({departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false});

const selectedValue = ref({ label: '±0', value: 0 }); // Default value
const selectOptions = ref([
  { label: '±0', value: 0 },
  { label: '±1', value: 1 },
  { label: '±3', value: 3 },
  { label: '±5', value: 5 },
  { label: '±7', value: 7 },
  { label: '±15', value: 15 }
]);

const expandRange = (days) => {
  console.log("days expanded:", days);
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
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
  console.log("days reduced:", days);
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDatesInput(startDate, endDate);
    startString.value = formattedDates;
  }
};

// Function to handle toggling
const toggle = (value) => {
  console.log("toggle:", value);
  if (value.value == null && dates.value != null) {
    onDateSelect(dates.value);
  }
};

const lastSelectedValue = ref({ label: '±0', value: 0 });

watch(lastSelectedValue, (value) => {
  console.log("lastSelectedValue", value);
});

// Watch for changes to the selected value
const skipped = ref(false);
watch(selectedValue, (newValue, oldValue) => {
  if (skipped.value) {
    skipped.value = false;
    return;
  }
  changeValue(newValue, oldValue);
});

function changeValue(newValue, oldValue){
  console.log("selectedValue", selectedValue.value);
  if (oldValue && oldValue.value !== undefined) {
    lastSelectedValue.value = { ...oldValue };
  } else {
    lastSelectedValue.value = { ...newValue };
  }

  if (selectedValue.value.value == 0) {
    console.log("selectedValue.value.value == 0", lastSelectedValue.value);
    reduceRange(parseInt(lastSelectedValue.value.value));
  } else if (newValue.value !== oldValue.value) {
    reduceRange(parseInt(oldValue.value));
    expandRange(parseInt(newValue.value));
  }
}

function onDateSelect(date){
  skipped.value = true;
  selectedValue.value = { label: '±0', value: 0 };
  
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


const formatDatesInput = (startDate, endDate) => {
  const formattedStartDate = formatDateDay(startDate);
  const formattedEndDate = formatDateDay(endDate);
  return formattedStartDate + " - " +formattedEndDate;
};

const formatDateDay = (date) => {
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const visible = ref(false);

watch(departureSelected, (newDeparture) => {
  errors.value = {departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false};
  if (newDeparture) {
    console.log("departureSelected.value", departureSelected.value);
  }
});
watch(destinationsSelected, (newDeparture) => {
  errors.value = {departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false};
});
watch(totalTravelers, (newDeparture) => {
  errors.value = {departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false};
});
watch(startString, (newDeparture) => {
  errors.value = {departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false};
});

const typeParam = ref();

const search = () => {
  errors.value = {departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false};
  let errorFlag = false;
  console.log(departureSelected.value?.length)
  if (!departureSelected?.value?.length) {
    errors.value.departureSelected = true;
    errorFlag = true;
    // showToast('Please select a departure')
    // return
  }
  if (!destinationsSelected?.value?.length) {
    errors.value.destinationsSelected = true;
    errorFlag = true;
    // showToast('Please select destination')
    // return
  }
  if (!totalTravelers?.value) {
    errors.value.totalTravelers = true;
    errorFlag = true;
    // showToast('Please select travelers')
    // return
  }
  if (!startString.value?.length) {
    errors.value.startString = true;
    errorFlag = true;
    // showToast('Please select dates')
    // return
  }
  if(travelersSelected.value.childrenAges.some(child => child.age === null)){
    errors.value.totalTravelers = true;
    errorFlag = true;
  }
  if(errorFlag){
    showToast('Please fill the fields in red');
    return;
  }
  let destinations = [];
  for (const destination of destinationsSelected.value) {
    destinations.push(destination.t_id);
  }
  let multipleDestinations = destinations.join(",");
  const config = useRuntimeConfig();
  const frontend_url = config.public.FRONTEND_URL
  const path = "/tours";
  const params = new URLSearchParams();
  params.append("search", "true");
  params.append("departureSelected", departureSelected.value);
  params.append("t_id", multipleDestinations);
  console.log("typeParam.value", typeParam.value);
  if (typeParam.value == "tour_type") {
    params.append("type", "tour_type");
  }
  params.append("datesSelected", startString.value);
  params.append("timeStay", timeString.value);
  params.append("adultsCount", adultsCount.value);
  params.append("childrenCount", childrenCount.value);
  params.append("infantsCount", infantsCount.value);


  const url = `${frontend_url}${path}?${params.toString()}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};

function getDatesSelected(params, name) {
  if (!params.get(name)) {
    const firstDayNextMonth = dayjs().add(2, 'month').startOf('month').format('YYYY/MM/DD');
    const lastDayNextMonth = dayjs().add(2, 'month').endOf('month').format('YYYY/MM/DD');
    return `${firstDayNextMonth}-${lastDayNextMonth}`;
  }
  return params.get(name).split('-');
}


function getTimeStay(params) {
  if (!params.get('timeStay')) {
    return ["2", "65"] // default value
  }
  return params.get('timeStay').split(',')
}

onMounted(async () => {
  nextTick(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search == "true") {
      startString.value = getDatesSelected(params, 'dateRange').toString();
      console.log("startString.value", startString.value);
      timeSlider.value = getTimeStay(params);
    } else { console.log("not search"); }
    const type = params.get('type');
    if (type == "tour_type") {
      typeParam.value = "tour_type";
    }
  });
});
const minDate = ref(new Date());

const visibleBottom = ref(false);

const tooltipMessage = computed(() => {
  if (Object.values(errors.value).some(value => value === true)) {
    return "To proceed, please fill the fields in red.";
  }
  return null;
});
</script>
<template>
    <div class="col-12 lg:col-10">
      <div class="grid" style="padding: 0.5rem 0;">

        <!-- departure place -->
        <div class="col-12 md:col-6 lg:col-3 input-box">
          <div :class="errors.departureSelected ? 'border-red-500 border-2' : ''"  >
            <div class="input-label border-gray">
              <div class="icon-name">
                <img src="/filter-icons/flights.svg" />
                <h4 class="input-name font-semibold my-3">Departure Place</h4>
              </div>
            </div>
            <div class="imported-input border-gray">
              <departureinput />
            </div>
          </div>
        </div>

        <!-- destination -->
        <div class="col-12 md:col-6 lg:col-3 input-box">
          <div :class="errors.destinationsSelected ? 'border-red-500 border-2' : ''"  >
            <div class="input-label border-gray">
              <div class="icon-name">
                <img src="/filter-icons/destinations.svg" />
                <h4 class="input-name font-semibold my-3">Destination</h4>
              </div>
            </div>
            <div class="imported-input ">
              <destinationsinput />
            </div>
          </div>
        </div>

        <!-- Travelers -->
        <div class="col-12 md:col-6 lg:col-3 input-box">
          <div :class="errors.totalTravelers ? 'border-red-500 border-2' : ''"  >
            <div class="input-label">
              <div class="icon-name">
                <img src="/filter-icons/physical.svg" />
                <h4 class="input-name font-semibold my-3">Travelers</h4>
              </div>
            </div>
            <div class="imported-input">
              <travelersinput />
            </div>
          </div>
        </div>


        <!-- Travel dates -->
        <div class="col-12 md:col-6 lg:col-3 input-box">
          <div :class="errors.startString ? 'border-red-500 border-2' : ''" >
            <div class="input-label">
              <div class="icon-name">
                <img src="/filter-icons/calendar.svg" />
                <h4 class="input-name font-semibold my-3">Travel Dates</h4>
              </div>
            </div>
            <div class="imported-input  w-full">

              <ConfirmPopup group="calendarConfirmPopup">
                <template #container="{ message, acceptCallback, rejectCallback }">
                  <div class="grid" style="margin: 15px;">
                    <div class="card col-12 lg:col-12 " style="display:block">
                      <SelectButton v-model="selectedValue" @change="toggle" :options="selectOptions"
                                    optionLabel="value" dataKey="value" aria-labelledby="basic">
                        <template #option="slotProps">{{ slotProps.option.label }}</template>
                      </SelectButton>
                      <span style="display: flex; justify-self: right;" v-tooltip.top="`To select your travel dates, click the start date followed by the end date. The system will show all available adventure packages within those dates.`"><i class="pi pi-info-circle"></i></span>
                      <Calendar @click.stop style="display:block;margin-top:10px" :minDate="minDate" v-model="dates"
                                selectionMode="range" :manualInput="false" inline @date-select="onDateSelect" />
                    </div>
                    <div class="card col-12 lg:col-12 py-0" style="display:block">
                      <h3 class="pt-0 my-0" style="display:block">Time of stay: </h3>
                      <div class="grid" style="text-align: center;align-items: flex-end;" >
                        <div class="col-2">
                          <div class="slider-left">
                            <input disabled v-model.number="timeSlider[0]"
                                  style="width: 21px !important;border: none;background: white;" />Days
                          </div>
                        </div>
                        <div class="col-8" v-tooltip.top="`To select your trip duration, use the toggle. The system will display all available adventure packages that match your specified duration.`">
                          <Slider :min='1' :max="66" v-model="timeSlider" range
                                  style="width: 100%;margin: 0px auto 10px auto;" />
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
                </template>
              </ConfirmPopup>
              <InputText placeholder="When are you going?" readonly type="text" v-model="startString"
              @click="requireConfirmation($event)":pt="{
                  root: {
                    class: 'inputTextDateInSearchClass'
                  }
                }" />
              <!-- <Dialog v-model:visible="visible" modal header="Select Dates" :style="{ width: '30vw' }"
                      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" dismissableMask
                      :pt="{ header: { class: 'pb-1' }, content: { class: 'pb-2' } }">
                <div class="grid">
                  <div class="card col-12 lg:col-12 " style="display:block">
                    <SelectButton v-model="selectedValue" @change="toggle" :options="selectOptions"
                                  optionLabel="value" dataKey="value" aria-labelledby="basic">
                      <template #option="slotProps">{{ slotProps.option.label }}</template>
                    </SelectButton>
                    <span style="display: flex; justify-self: right;" v-tooltip.top="`To select your travel dates, click the start date followed by the end date. The system will show all available adventure packages within those dates.`"><i class="pi pi-info-circle"></i></span>
                    <Calendar style="display:block;margin-top:10px" :minDate="minDate" v-model="dates"
                              selectionMode="range" :manualInput="false" inline @date-select="onDateSelect" />
                  </div>
                  <div class="card col-12 lg:col-12 py-0" style="display:block">
                    <h3 class="pt-0 my-0" style="display:block">Time of stay: </h3>
                    <div class="grid" style="text-align: center;align-items: flex-end;" >
                      <div class="col-2">
                        <div class="slider-left">
                          <input disabled v-model.number="timeSlider[0]"
                                style="width: 21px !important;border: none;background: white;" />Days
                        </div>
                      </div>
                      <div class="col-8" v-tooltip.top="`To select your trip duration, use the toggle. The system will display all available adventure packages that match your specified duration.`">
                        <Slider min=1 max=66 v-model="timeSlider" range
                                style="width: 100%;margin: 0px auto 10px auto;" />
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
                  <Button type="button" label="Done" severity="warning" @click="visible = false"></Button>
                </div>
              </Dialog> -->
            </div>
          </div>  
        </div>

      </div>
    </div>
    <div class="col-12 lg:col-2" v-tooltip.top="tooltipMessage">
      <Button class="search-button text-sm back-orange-vibe interstate-font" style="color: white;" label="Search"
              severity="warning" @click="search()" />
    </div>
    <Button class="howItWorks-btn" label="How It Works" @click="visibleBottom = true" text />
    <div>
      <Sidebar class="howItWorks-sidebar" v-model:visible="visibleBottom" position="bottom" style="height: auto;background-color: #82cf45;">
      <template #header>
        <div class="custom-header">
        </div>
      </template>
      <div class="howItWorks-content">
        <div class="howItWorks-card">
          <img src="/images/howItWorks/destination.png">
          <p class="font-bold text-white text-lg">Find Your Dream Destination</p>
          <p class="text-center mt-0 text-white">Discover thousands of holiday packages around the world, all from reputable operators with guaranteed departures.</p>
        </div>
        <div class="howItWorks-card">
          <img src="/images/howItWorks/book.png">
          <p class="font-bold text-white text-lg">Book Your Adventure</p>
          <p class="text-center mt-0 text-white">Easily book your next lifetime adventure online,  including flights, accommodations, and tours, all in one place.</p>
        </div>
        <div class="howItWorks-card">
          <img src="/images/howItWorks/travel.png">
          <p class="font-bold text-white text-lg">Enjoy Your Travel</p>
          <p class="text-center mt-0 text-white">Get your e-tickets,  pack your luggage, and go.
            The world is waiting!</p>
        </div>
      </div>
      </Sidebar>
    </div>
</template>

<style>
@media only screen and (max-width:767px){

}
@media only screen and (min-width: 768px) and (max-width: 1199px){

}
@media only screen and (min-width:1200px){
  .search-border{
    border-right: 1.5px solid #C8C8C8;
  }
}
</style>

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

.how:hover {
  cursor: pointer;
}

.input-label .border-gray {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.hero-image {
  background-image: url("/images/vibeNobackground.jpg");
  height: 95vh;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-content {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 100%;
  padding: 1%;
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
}

.searchbar-container {
  width: 100%;
  margin: 0px auto;
  color: black;
  align-items: center;
  background-color: #8bc34a;
}

.input-label img {
  width: 20px;
  height: 20px;
}

.search-button {
  font-size: 20px;
  padding: 12px 45px;
}

.icon-name {
  display: flex;
  align-items: center;
}

.hero-content .title {
  font-family: 'Canaro';
}

.hero-content .subtitle {
  font-family: 'Interstate';
}

.input-name {
  margin-left: 5px
}

@media only screen and (max-width:767px) {
  .hero-content .title {
    font-size: 36px;
    text-align: left;
    width: 90%;
    margin: 0 auto;
  }

  .hero-content .subtitle {
    font-size: 16px;
    text-align: center
  }

  .mobile-hidden {
    display: none;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .howItWorks-card{
    width: calc((100%) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .hero-content .title {
    font-size: 40px;
  }

  .hero-content .subtitle {
    font-size: 20px;
    text-align: center
  }

  .mobile-hidden {
    display: block;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .howItWorks-card{
    width: calc((100% / 3) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

@media only screen and (min-width:1200px) {
  .hero-content .title {
    font-size: 60px;
  }

  .hero-content .subtitle {
    font-size: 26px;
    text-align: center
  }

  .mobile-hidden {
    display: block;
  }

  .input-box {
    border-inline-end-width: 2px;
    background: white;
    border-radius: 8px;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .howItWorks-card{
    width: calc((100% / 3) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}

/*How it Works*/
.howItWorks-btn:hover{
  background-color: unset;
}
button.p-button.p-component.p-button-text.howItWorks-btn {
  background: unset;
  color: #FFFFFF;
  border-color: transparent;
}
.p-button.howItWorks-btn:focus {
  box-shadow: unset;
}

:deep(.howItWorks-sidebar .p-sidebar-header) {
  justify-content: end !important;
}


</style>
