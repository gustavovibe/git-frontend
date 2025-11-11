<template>
  <div class="flex flex-wrap tour_detail_search_bar p-0">
    <!-- departure place -->
    <div
      class="col-12 md:col-4 lg:col-4 flex flex-column"
      style="border-right: 1px solid #C8C8C8;"
    >
      <!-- Label -->
      <div class="input-label border-gray mb-2">
        <div class="icon-name flex align-items-center">
          <img src="/filter-icons/flights.svg" />
          <h4 class="font-family: interstate !important input-name font-semibold my-0 ml-2">
            Departure Place
          </h4>
        </div>
      </div>

      <!-- Input -->
      <div class="font-family: interstate !important imported-input border-gray">
        <DepartureInputReusable :selectedLocation="localSearchBar.selectedDeparture" @update="onTravelDateChange" />
      </div>
    </div>


    <!-- Travelers -->
    <div
      class="col-12 md:col-4 lg:col-3 flex flex-column pl-3"
      style="border-right: 1px solid #C8C8C8;"
    >
      <!-- Label -->
      <div class="input-label border-gray mb-2">
        <div class="icon-name flex align-items-center">
          <img src="/filter-icons/physical.svg" />
          <h4 class="font-family: interstate !important input-name font-semibold my-0 ml-2">
            Travelers
          </h4>
        </div>
      </div>

      <!-- Input -->
      <div class="imported-input border-gray">
        <travelersinput :prices="prices" :travelers="localSearchBar.travelersSelected" @update:travelersSelected="onTravelersChange" />
        <!-- 
        <TravelersInputReusable :travelers="localSearchBar.travelersSelected" @update:travelersSelected="ontravelersChange"/> 
        -->
      </div>
    </div>


    <div class="col-12 md:col-4 lg:col-4 flex flex-column pl-3">
      <div class="input-label border-gray mb-2">
        <div class="icon-name flex align-items-center">
          <img src="/filter-icons/calendar.svg" />
          <h4 class="font-family: interstate !important input-name font-semibold my-0 ml-2">
            Travel Dates
          </h4>
        </div>
      </div>

      <div class="imported-input border-gray text-sm">
        <CalendarInput
          v-if="preselectedDates.length > 0"
          v-on:update:dates-value="getDates($event)"
          :preselectedDates="preselectedDates"
        />
      </div>
    </div>

    <div class="col-12 lg:col-1 flex justify-content-center align-items-center">
      <Button
        class="text-sm back-orange-vibe interstate-font p-button-sm"
        style="color: white;"
        label="Search"
        severity="warning"
        @click="search()"
      />
    </div>
  </div>
</template>

<script setup>
import { watchEffect, onMounted, onBeforeUnmount } from 'vue';	
import TravelersInputReusable from "~/components/TravelersInputReusable.vue";
import DepartureInputReusable from "~/components/DepartureInputReusable.vue";
import TravelDatesInput from "~/components/TravelDatesInput.vue";
import travelersinput from "~/components/TourPage/TravelersInput.vue";
import CalendarInput from "~/components/CalendarInput.vue";	
import Button from 'primevue/button';
import dayjs from 'dayjs';
	
const emit = defineEmits();
const props = defineProps(['searchBar', 'datesRange', 'prices']);

console.log("props.prices",props.prices)
const prices= ref();
prices.value = props.prices; 
	
function search(){
  console.log("update:searchBar",localSearchBar.value);	
  emit('update:searchBar', localSearchBar.value);
};	
const localSearchBar = ref({
  selectedDeparture: {},
  travelersSelected: {adults: 1, children: 0, infants: 0},
  travelDatesSelected: {}
});
	
localSearchBar.value = props.searchBar;
console.log("localSearchBar.value",localSearchBar.value);
	
function getDatesSelected(params, name) {
  if (!params.get(name)) {
      const starts = dayjs().add(1, "day").format("YYYYMMDD");
	  const ends = dayjs().add(3, "month").format("YYYYMMDD");
	  return `${starts}-${ends}`;
  }
  return params.get(name).split('-');
}

const preselectedDates = ref([]);
	
onMounted(async () => {
    const params = new URLSearchParams(window.location.search);
	  if(props.datesRange){
		  console.log("props.datesRange",props.datesRange);
		  const formatted = props.datesRange.split('-');
		  console.log("formatted props.datesRange",formatted);
		  preselectedDates.value = formatted;
	  }else{
		  preselectedDates.value = getDatesSelected(params, 'dateRange');
	  }
    console.log("preselectedDates", preselectedDates.value);
});

const getDates = (date) => {
  // startString.value = formatDateRange(date.value);
  console.log("date updated on calendar", date);
  localSearchBar.value.travelDatesSelected = date;
  console.log("localSearchBar.value after dates changed",localSearchBar.value);	
};

// updates local selectedDeparture
const onLocationChange = (newLocationFromChildComponent) => {
  localSearchBar.value.selectedDeparture = newLocationFromChildComponent;
};

//updates local travelersSelected
const onTravelersChange = (newTravelers) => {
  console.log("newTravelers",newTravelers);	
  localSearchBar.value.travelersSelected = newTravelers;
};
	
const onTravelDateChange = (newTravelDate) => {
  localSearchBar.value.travelDatesSelected = newTravelDate;
};

// update when props change
watch(() => props.searchBar, async (newValue) => {
  localSearchBar.value = newValue
}, { deep: true });

</script>

<style scoped>
.search-button {
  font-size: 20px;
  padding: 12px 45px;
  border-radius: 8px !important;
  font-size: 18px !important;
}
	
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
}

.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}

.tour_detail_search_bar {
  border-radius: 10px;
  border: 1px solid var(--Green, #82CF45);
}

.red {
  background-color: red;
}
</style>