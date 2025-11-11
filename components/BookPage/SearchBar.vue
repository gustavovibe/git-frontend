<template>
  <div class="search-container" style="align-items: center;">
    <div class="search-fields">
      <!-- departure place -->
      <div class="search-field">
        <div class="input-label">
          <div class="icon-name">
            <img src="/filter-icons/flights.svg" />
            <h4 class="input-name">Departure Place</h4>
          </div>
        </div>
        <div class="imported-input border-gray">
          <DepartureInputReusable :selectedLocation="localSearchBar.selectedLocationDeparture"/>
        </div>
      </div>

      <!-- Travelers -->
      <div class="search-field">
        <div class="input-label">
          <div class="icon-name">
            <img src="/filter-icons/physical.svg" />
            <h4 class="input-name">Travelers</h4>
          </div>
        </div>
        <div class="imported-input border-gray">
			<travelersinput v-if="prices" :prices="prices" :travelers="localSearchBar.travelersSelected" @update:travelersSelected="onTravelersChange" />
        </div>
      </div>

      <!-- TravelDates -->
      <div class="search-field">
        <div class="input-label">
          <div class="icon-name">
            <img src="/filter-icons/calendar.svg" />
            <h4 class="input-name">Tour date</h4>
          </div>
        </div>
          <Dropdown 
            v-model="localSearchBar.selectedDepartureId"
            :options="localSearchBar.departuresDates"
            optionLabel="label"
            placeholder="Select"
            checkmark 
            :highlightOnSelect="false" 
            @update:selectedDepartureId="onSelectedDepartureChange"
            class="departure-dropdown interstate-placeholder"
          />
      </div>
    </div>
    
    <div class="search-action">
      <button class="update-search-btn" @click="updateSearch" style="font-family: Interstate !important;font-size: 14px;">Update search</button>
    </div>
  </div>
</template>

<script setup>
import {ref, watch,  computed, onMounted, nextTick} from 'vue';	
import TravelersInputReusable from "~/components/TravelersInputReusable.vue";
import DepartureInputReusable from "~/components/DepartureInputReusable.vue";
import Dropdown from 'primevue/dropdown';
import travelersinput from "~/components/BookPage/TravelersInput.vue";
import { GLOBAL_LOCATIONS } from "~/utils/globalLocations";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
const config = useRuntimeConfig();
	
const localDepartures = ref();	
	
const emit = defineEmits();

dayjs.extend(customParseFormat)	;	

const localSearchBar = ref({});
	
const props = defineProps({
  searchBar:    { type: Object, required: true },
  tour_length:  { type: Number, required: true },
  tour_start_city: { type: Object, required: true },
  tour_end_city:   { type: Object, required: true },
  tour_id: { type: Number,  required: true },	
  departures:   { type: Array,  required: true },
  departure_fly_from: {type:Array, required: true},	
  stored: {type:Array, required: true},		
});

console.log("props",props);
	
	
	
localSearchBar.value = props.searchBar;

console.log("localSearchBar.value",localSearchBar.value);

const onLocationChange = (newLocationFromChildComponent) => {
  localSearchBar.value.selectedLocationDeparture = newLocationFromChildComponent;
};

const changeDepartureId = ref(false);
	
const onSelectedDepartureChange = (newDepartureId) => {
console.log("newDepartureId.value local searchbar",newDepartureId.value);
  localSearchBar.value.selectedDepartureId = newDepartureId.value;
  //localSearchBar.value.selectedDepartureDate =  
  localStorage.setItem("selectedDepartureId", newDepartureId.value);
  changeDepartureId.value = true;
};

const onTravelersChange = (newTravelers) => {
  localSearchBar.value.travelersSelected = newTravelers;
};

// event to update parent component
watch(localSearchBar, (newValue) => {
  console.log("watcher SELECTED DEPARTURE", localSearchBar.value.selectedDepartureId);
}, { deep: true });

function updateSearch() {
  emit('update:searchBar', localSearchBar.value);
  console.log("updateSearch SELECTED DEPARTURE", localSearchBar.value.selectedDepartureId);
  // … (URL logic, etc.)
}

watch(() => props.searchBar, async (newValue) => {
  console.log("props.searchBar changed",props.searchBar);
  localSearchBar.value = newValue;
}, { deep: true });

const prices = ref(null)
	
const selectAccommodation = (accommodations, totalTravelers) => {
  if (!accommodations?.length) return null;

  // Sort accommodations by beds_number (ascending)
  const sortedAccommodations = [...accommodations].sort((a, b) => a.beds_number - b.beds_number);

  // Find the best accommodation where beds_number >= totalTravelers
  const bestMatch = sortedAccommodations.find(acc => acc.beds_number >= totalTravelers);

  // If no perfect match, return the accommodation with the largest beds_number
  return bestMatch ?? sortedAccommodations[sortedAccommodations.length - 1];
};	

function getAdultsCount(params, name) {
  if (!params.get(name)) {
    return 1 // default value when there is no param in url?
  }
  return parseInt(params.get(name));
}
	
function getChildrenCount(params, name) {
  if (!params.get(name)) {
    return 0 // default value when there is no param in url?
  }
  return parseInt(params.get(name));
}	
	
const adultsCount = ref();
const childrenCount = ref();
const travelersCount = ref();
		
async function fetchPrices(tour_id) {
  const url = `${config.public.BACKEND_URL}/api/prices?tourId=${tour_id}`;
  const options = {
    headers: {
      accept: "application/json",
    },
  };
  const {data} = await useFetch(url, options);  
  let prices = data.value.data;	
  return prices;
}		
	
onMounted(async () => {
    console.log("onMounted");
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const search = params.get('search');
    const tourId = params.get("tourId");  
      adultsCount.value = getAdultsCount(params, "adultsCount");
      console.log("adultsCount.value", adultsCount.value );
      childrenCount.value = getChildrenCount(params, 'childrenCount');
      console.log("childrenCount.value", childrenCount.value);
      travelersCount.value = Number(adultsCount.value) + Number(childrenCount.value);
	  console.log("travelersCount.value", travelersCount.value);
	prices.value = await fetchPrices(tourId);
	console.log("prices.value",prices.value);
});
	
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

/* Estilos base */
.search-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border: 1px solid #82CF45;
  border-radius: 10px;
  padding: 12px;
  box-sizing: border-box;
}

.search-fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.icon-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.imported-input {
  width: 100%;
}

.update-search-btn {
  background-color: #ff6600;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.update-search-btn:hover {
  background-color: #e65c00;
}

.departure-dropdown {
  width: 100%;
	font-size:120x;
}

/* Estilos para tablet */
@media (min-width: 768px) {
  .search-container {
    flex-direction: row;
    align-items: flex-end;
  }
  
  .search-fields {
    grid-template-columns: repeat(3, 1fr);
    flex: 1;
  }
  
  .search-action {
    width: auto;
    min-width: 150px;
  }
  
  .update-search-btn {
    width: auto;
    padding: 12px 24px;
    margin-left: 12px;
  }
}

/* Estilos para desktop */
@media (min-width: 1024px) {
  .search-container {
    padding: 16px;
  }
  
  .input-name {
    font-size: 16px;
  }
  
  .update-search-btn {
    padding: 16px 32px;
    font-size: 18px;
  }
}
</style>