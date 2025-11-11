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
import dayjs from 'dayjs';
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

console.log("home form store destinationsSelected",destinationsSelected.value);

const handleSelectedLocation = (value) => {
  console.log("handleSelectedLocation: ",value);
  homeFormStore.changeDestinations(value);
  destinationsSelected.value = value;
  console.log("Updated location:", destinationsSelected.value);
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

watch(destinationsSelected.value, () => {
  console.log("watch destinationsSelected.value",destinationsSelected.value)
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
    const formattedDates = formatDates(startDate, endDate);
    startString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() - days);
    endDate.setDate(endDate.getDate() + days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDates(startDate, endDate);
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
    const formattedDates = formatDates(startDate, endDate);
    startString.value = formattedDates;
  } else if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    startDate.setDate(startDate.getDate() + days);
    endDate.setDate(endDate.getDate() - days);
    dates.value = [startDate, endDate];
    const formattedDates = formatDates(startDate, endDate);
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
watch(selectedValue, (newValue, oldValue) => {
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
  selectedValue.value = { label: '±0', value: 0 };
  console.log("onDateSelect", date);
  console.log("dates.value", dates.value);
  const today = new Date();
  if (dates.value.length === 2 && dates.value[1] == null) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[0]);
    const formattedDates = formatDates(startDate, endDate);
    startString.value = formattedDates;
  }
  if (dates.value.length === 2 && dates.value[1] >= dates.value[0]) {
    const startDate = new Date(dates.value[0]);
    const endDate = new Date(dates.value[1]);
    const formattedDates = formatDates(startDate, endDate);
    startString.value = formattedDates;
  }
};

const visible = ref(false);

const typeParam = ref();



const search = () => {
  errors.value = {departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false};
  let errorFlag = false;
  console.log(departureSelected.value?.length)
  if (!departureSelected?.value?.length) {
    errors.value.departureSelected = true;
    errorFlag = true;
  }
  if (!destinationsSelected?.value) {
    errors.value.destinationsSelected = true;
    errorFlag = true;
  }
  if (!totalTravelers?.value) {
    errors.value.totalTravelers = true;
    errorFlag = true;
  }
  if (!startString.value?.length) {
    errors.value.startString = true;
    errorFlag = true;
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
  //for (const destination of destinationsSelected.value) {
    destinations.push(destinationsSelected.value.t_id);
  //}
  let dTypes = [];
  //for (const destination of destinationsSelected.value) {
    dTypes.push(destinationsSelected.value.type);
  //}
  let multipleDestinations = destinations.join(",");
  const config = useRuntimeConfig();
  const frontend_url = config.public.FRONTEND_URL
  const path = "/tours";
  const params = new URLSearchParams();
  params.append("search", "true");
  params.append("departureSelected", departureSelected.value);
  params.append("t_id", destinations);
  params.append("type", dTypes);
  console.log("typeParam.value", typeParam.value);
  if (typeParam.value == "tour_type") {
    params.append("type", "tour_type");
  }
  params.append("dateRange", startString.value);
  // params.append("timeStay", timeString.value);
  params.append("adultsCount", adultsCount.value);
  params.append("childrenCount", childrenCount.value);
  params.append("infantsCount", infantsCount.value);
  if(travelersSelected.value.childrenAges.length > 0){
    var childrenAges = travelersSelected.value.childrenAges.map(item => item.age);
    params.append("childrenAges", childrenAges.join(','));
  }

  const url = `${frontend_url}${path}?${params.toString()}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};

async function getDatesSelected(params, name) {
  let dates = null;
  if (!params.get(name)) {
	console.log("dateRange not found");
    const firstDayNextMonth = dayjs().add(1, 'day').format('YYYY/MM/DD');
    const lastDayNextMonth = dayjs().add(2, 'month').endOf('month').format('YYYY/MM/DD');
    dates = [firstDayNextMonth, lastDayNextMonth];
	console.log("default dateRange",dates);
  } else{
	  dates = params.get(name).split('-');
	  console.log("dateRange from url",dates);
  }
  return dates;
}


function getTimeStay(params) {
  if (!params.get('timeStay')) {
    return ["2", "65"] // default value
  }
  return params.get('timeStay').split(',')
}
const preselectedDates = ref([]);
onMounted(async () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search == "true") {
      preselectedDates.value = await getDatesSelected(params, 'dateRange');
	  console.log("preselectedDates.value", preselectedDates.value);
	  //getDates(preselectedDates);
      //console.log("startString.value", startString.value);
      timeSlider.value = getTimeStay(params);
    } else { console.log("not search"); }
    const type = params.get('type');
    if (type == "tour_type") {
      typeParam.value = "tour_type";
    }
});
	
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = 10;
let prevYear = 2025;
let nextMonth = 1;
let nextYear = 2026;

const date = ref();	
const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(nextMonth);
maxDate.value.setFullYear(nextYear);

console.log("minDate",minDate);	
console.log("maxDate",maxDate);

function formatDateRange(dates) {
  if (!dates || dates.length === 0) return "";

  let [startDate, endDate] = dates;
  endDate = endDate ?? startDate; // Si endDate es null, usa startDate

  return [startDate, endDate]
    .map(date => new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }))
    .join("-");
}
const getDates = (date) => {
  startString.value = formatDateRange(date.value);
  console.log("date", date.value);
};
</script>

<template>
  <Toast />
  <div class="searchbar-container grid" style="max-width:1200px">
    <div class="col-12 lg:col-10">
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-3 input-box">
          <div :class="errors.departureSelected ? 'border-red-500 border-2' : ''"  style="border-radius: 5px;">
            <div class="input-label border-gray search-border">
              <div class="icon-name">
                <img src="/filter-icons/flights.svg" />
                <h3 class="input-name font-semibold mt-0 mb-3">Departure Place</h3>
              </div>

            </div>
            <div class="imported-input border-gray search-border">
              <departureinput />
            </div>
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-4 input-box">
          <div :class="errors.destinationsSelected ? 'border-red-500 border-2' : ''"  style="border-radius: 5px;">
            <div class="input-label border-gray search-border">
              <div class="icon-name">
                <img src="/filter-icons/destinations.svg" />
                <h3 class="input-name font-semibold mt-0 mb-3">Destination</h3>
              </div>
            </div>
            <div class="imported-input border-gray search-border">
              <destinationsInput @update:selectedDestination="handleSelectedLocation" />
            </div>
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-2 input-box">

          <div :class="errors.totalTravelers ? 'border-red-500 border-2' : ''"  style="border-radius: 5px;">
            <div class="input-label border-gray search-border">
              <div class="icon-name">
                <img src="/filter-icons/physical.svg" />
                <h3 class="input-name font-semibold mt-0 mb-3">Travelers</h3>
              </div>
            </div>
            <div class="imported-input border-gray search-border">
              <travelersinput />
            </div>
          </div>
        </div>
        <div class="col-12 md:col-6 lg:col-3 input-box">
          <div :class="errors.startString ? 'border-red-500 border-2' : ''" style="border-radius: 5px;">
            <div class="input-label">
              <div class="icon-name">
                <img src="/filter-icons/calendar.svg" />
                <h3 class="input-name font-semibold mt-0 mb-3">Travel Dates</h3>
              </div>
            </div>
            <div class="imported-input border-gray w-full">
              <!-- <InputText placeholder="When are you going?" readonly type="text" v-model="startString"
                @click="visible = true" :pt="{
                  root: {
                    class: 'inputTextDateInSearchClass'
                  }
                }" />
              <Dialog v-model:visible="visible" modal header="Select Dates" :style="{ width: '30vw' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <div class="grid">
                  <div class="card col-12 lg:col-12 " style="display:block">
                        <SelectButton v-model="selectedValue" @change="toggle" :options="selectOptions"
                          optionLabel="value" dataKey="value" aria-labelledby="basic">
                          <template #option="slotProps">{{ slotProps.option.label }}</template>
                        </SelectButton>
                        <Calendar style="display:block;margin-top:10px" :minDate="minDate" :maxDate="maxDate" v-model="dates"
                          selectionMode="range" :manualInput="false" inline @date-select="onDateSelect" />
                  </div>
                  <div class="card col-12 lg:col-12" style="display:block">
                    <h3 style="display:block">Time of stay: </h3>
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
                    @click="visible = false"></Button>
                  <Button type="button" label="Done" severity="warning" @click="visible = false"></Button>
                </div>
              </Dialog> -->
              <CalendarInput v-if="preselectedDates != null" v-on:update:dates-value="getDates($event)"  :preselectedDates="preselectedDates" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-2">
      <Button class="search-button text-sm back-orange-vibe interstate-font" style="color: white;" label="Search"
        severity="warning" @click="search()" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    travelersinput,
    departureinput,
    destinationsinput,
  }
}
</script>

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
  max-width: 1440px;
  width: 90%;
  margin: 40px auto;
  background: white;
  color: black;
  align-items: center;
  border-radius: .375rem;
}

.input-label img {
  width: 20px;
  height: 20px;
}

.search-button {
  font-size: 16px !important;
  padding: 12px 45px;
}

.icon-name {
  display: flex;
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
  }

  .search-border{
    border-right: 1.5px solid #C8C8C8;
  }
}
</style>

<style>
.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}
</style>
