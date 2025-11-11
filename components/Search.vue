<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import travelersinput from "~/components/TravelersInput.vue";
import departureinput from "~/components/DepartureInput.vue";
import destinationsinput from "~/components/DestinationsInput.vue";
import CalendarInput from "~/components/CalendarInput.vue";
import { storeToRefs } from 'pinia';
import { useHomeFormStore } from '@/store/homeFormStore'
import { useToast } from "primevue/usetoast";
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';

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

const handleSelectedLocation = (value) => {
  console.log("handleSelectedLocation: ",value);
  homeFormStore.changeDestinations(value);
  destinationsSelected.value = value;
  console.log("Updated location:", destinationsSelected.value);
};

const startString = ref('');

const errors = ref({departureSelected: false, destinationsSelected: false, totalTravelers: false, startString: false});


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
  const path = "/toursv2";
  const params = new URLSearchParams();
  params.append("search", "true");
  params.append("departureSelected", departureSelected.value);
  params.append("t_id", destinations);
  params.append("type", dTypes);
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
      // startString.value = getDatesSelected(params, 'dateRange').toString();
      console.log("startString.value", startString.value);
      timeSlider.value = getTimeStay(params);
    } else { console.log("not search"); }
    const type = params.get('type');
    if (type == "tour_type") {
      typeParam.value = "tour_type";
    }
  });
});

const visibleBottom = ref(false);

const tooltipMessage = computed(() => {
  if (Object.values(errors.value).some(value => value === true)) {
    return "To proceed, please fill the fields in red.";
  }
  return null;
});


function formatDateRange(dates) {
  if (!dates || dates.length === 0) return "";

  let [startDate, endDate] = dates;
  endDate = endDate ?? startDate; // Si endDate es null, usa startDate

  return [startDate, endDate]
    .map(date => new Date(date).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }))
    .join("-");
}

const getDates = (date) => {
  startString.value = formatDateRange(date.value);
  console.log("date", date.value);
  console.log("date", );
};
</script>
<template>
  <Toast />
  <div class="hero-image">
    <div class="hero-content">
      <p class="title font-semibold mx-5 lg:mx-0"> <span class="text-green-vibe">Adventures.</span> Booked. <span class="text-green-vibe">Easy.</span> </p>
      <h2 class="subtitle mobile-hidden interstate-font ">
        Choose among 30,000+ multi-day trips around the world
      </h2>
      <div class="searchbar-container grid" style="max-width:1200px">
        <div class="col-12 lg:col-10 pb-0">
          <div class="grid" style="padding: 0.5rem 0;">

            <!-- departure place -->
            <div class="col-12 md:col-6 lg:col-3 input-box input-box-first">
              <div :class="errors.departureSelected ? 'border-red-500 border-2' : ''"  style="border-radius: 5px;">
                <div class="input-label border-gray search-border">
                  <div class="icon-name">
                    <img src="/filter-icons/flights.svg" />
                    <h3 class="input-name font-semibold my-3">Departure Place</h3>
                  </div>
                </div>
                <div class="imported-input border-gray search-border">
                  <departureinput />
                </div>
              </div>
            </div>

            <!-- destination -->
            <div class="col-12 md:col-6 lg:col-3 input-box">
              <div :class="errors.destinationsSelected ? 'border-red-500 border-2' : ''"  style="border-radius: 5px;">
                <div class="input-label border-gray search-border">
                  <div class="icon-name">
                    <img src="/filter-icons/destinations.svg" />
                    <h3 class="input-name font-semibold my-3">Destination</h3>
                  </div>
                </div>
                <div class="imported-input border-gray search-border">
                  <destinationsinput @update:selectedDestination="handleSelectedLocation" />
                </div>
              </div>
            </div>

            <!-- Travelers -->
            <div class="col-12 md:col-6 lg:col-3 input-box input-box-travelers">
              <div :class="errors.totalTravelers ? 'border-red-500 border-2' : ''"  style="border-radius: 5px;">
                <div class="input-label border-gray search-border">
                  <div class="icon-name">
                    <img src="/filter-icons/physical.svg" />
                    <h3 class="input-name font-semibold my-3">Travelers</h3>
                  </div>
                </div>
                <div class="imported-input border-gray search-border">
                  <travelersinput />
                </div>
              </div>
            </div>


            <!-- Travel dates -->
            <div class="col-12 md:col-6 lg:col-3 input-box">
              <div :class="errors.startString ? 'border-red-500 border-2' : ''" style="border-radius: 5px;">
                <div class="input-label">
                  <div class="icon-name">
                    <img src="/filter-icons/calendar.svg" />
                    <h3 class="input-name font-semibold my-3">Travel Dates</h3>
                  </div>
                </div>
                <div class="imported-input border-gray w-full">
                  <CalendarInput v-on:update:dates-value="getDates($event)" />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="col-12 lg:col-2 pb-4 lg:pb-0" v-tooltip.top="tooltipMessage">
          <Button class="search-button text-sm back-orange-vibe interstate-font" style="color: white;" label="Search"
                  severity="warning" @click="search()" />
        </div>
      </div>
      <Button class="howItWorks-btn" label="How It Works" @click="visibleBottom = true" text />
      <div>
        <Sidebar class="howItWorks-sidebar" v-model:visible="visibleBottom" position="bottom" style="height: auto;background-color: #82cf45;" :pt="{
					closeButton: {
						style: {
							color: '#fff',
							background: '#ff3b30',
							borderRadius: '50%',
							width: '24px',
							height: '24px',
							fontSize: '2rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}
					}
				}"> 
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
    </div>
  </div>
</template>

<style>
@media only screen and (max-width:767px){
	.howItWorks-sidebar{
		height: 100% !important;
	}
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

.input-box-first{
  padding: 7px 0 7px 20px !important;
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
@media all and (max-width: 967px) {
  .hero-content {
    top:32rem !important;
  }
}
.hero-content {
  text-align: center;
  position: absolute;
  top: 53%;
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
  border-radius: 16px;
}

.input-label img {
  width: 20px;
  height: 20px;
}

.search-button {
  font-size: 20px;
  padding: 12px 45px;
  border-radius: 8px !important;
  font-size: 18px !important;
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

@media only screen and (max-width: 600px) {
  .input-box {
    padding-left: 20px;
  }
}

@media only screen and (max-width:768px) {
  .hero-content .title {
    font-size: 36px;
    width: 90%;
    margin: 8rem auto 0rem
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
	.hero-image{
		height: 120vh;
	}
  .input-box-travelers{
    padding-left: 20px!important;
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
