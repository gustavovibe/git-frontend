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
          <DepartureInputReusable 
            :selectedLocation="localSearchBar.selectedLocationDeparture"
          />

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
          <travelersinput />
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
import travelersinput from "~/components/TravelersInput.vue";
import { GLOBAL_LOCATIONS } from "~/utils/globalLocations";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
const config = useRuntimeConfig();
	
const localDepartures = ref();	
	
const emit = defineEmits();

dayjs.extend(customParseFormat)	;	
	
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
	if(props){
		//fetchPrices();
		//addPossibleDeparturesPrices();	
	}

	
	
const localSearchBar = ref({
  selectedLocationDeparture: null,
  selectedDepartureId: null,
  travelersSelected: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  selectedDepartureDate: null,
  departuresDates: [],
});

console.log("localSearchBar.selectedLocationDeparture",localSearchBar.selectedLocationDeparture);

const onLocationChange = (newLocationFromChildComponent) => {
  localSearchBar.value.selectedLocationDeparture = newLocationFromChildComponent;
};

const changeDepartureId = ref(false);
const onSelectedDepartureChange = (newDepartureId) => {
console.log("newDepartureId.value local searchbar",newDepartureId.value);
  localSearchBar.value.selectedDepartureId = newDepartureId.value;
  localSearchBar.value.selectedDepartureDate = 
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

async function getIataCodeByCityName(cityName) {
  const location = GLOBAL_LOCATIONS.find(
    (location) => location.city == cityName
  );
  if (!location?.code) {
    console.error(`There's no IATA code for city ${cityName}`);
    return "";
  }
  return location.code;
}

function getFlightDepartureDate(departureDate) {
  console.log("getFlightDepartureDate",departureDate);	
  return dayjs(departureDate, "DD-MM-YYYY").subtract(1, "day").format("YYYY-MM-DD");
}

function getFlightDepartureDateInbound(tourLengthDays, departureDate) {
	console.log("getFlightDepartureDateInbound",tourLengthDays, departureDate);
	const stay = tourLengthDays + 1;
	console.log("stay",stay);
    const tourEndDate = dayjs(departureDate, "DD-MM-YYYY").add(stay, "day").format("YYYY-MM-DD");
	console.log("getFlightDepartureDateInbound end date", tourEndDate);
  return tourEndDate;
}

async function getFlights(tour_length, tour_start_city, tour_end_city, departure) {
	console.log("get flights",tour_length, tour_start_city, tour_end_city, departure);
  const origin = props.departure_fly_from;
  const destination = await getIataCodeByCityName(tour_start_city.city_name);
  const departureDate = getFlightDepartureDate(departure?.date);
  const originInbound = await getIataCodeByCityName(tour_end_city.city_name);
  const destinationInbound = props.departure_fly_from;
  const departureDateInbound = getFlightDepartureDateInbound(
    Number(tour_length),
    departure.date
  );
  console.log("get flights dates",departureDate,departureDateInbound);
  return await fetchFlights({
    origin,
    destination,
    departureDate,
    originInbound,
    destinationInbound,
    departureDateInbound,
    adultsCount: adultsCount.value,
    childrenCount: childrenCount.value,
  });
}

async function fetchFlights(paramsObj) {
  const {
    origin = "NYC",
    destination,
    departureDate,
    originInbound,
    destinationInbound,
    departureDateInbound,
    adultsCount,
    childrenCount,
    cabinClass,
    limit = 3,
  } = paramsObj;
  if (!destination) {
    console.error(
      `Destination not found before fetching flights: '${destination}'`
    );
    return [];
  }
  if (!departureDate) {
    console.error(
      `departureDate not found before fetching flights: '${destination}'`
    );
    return [];
  }

  const params = new URLSearchParams();
  params.append("origin", origin);
  params.append("destination", destination);
  params.append("departureDate", departureDate);

  // optional parameters
  if (originInbound !== undefined) {
    params.append("originInbound", originInbound);
  }
  if (destinationInbound !== undefined) {
    params.append("destinationInbound", destinationInbound);
  }
  if (departureDateInbound !== undefined) {
    params.append("departureDateInbound", departureDateInbound);
  }
  if (adultsCount !== undefined) {
    params.append("adultsCount", adultsCount);
  }
  if (childrenCount !== undefined) {
    params.append("childrenCount", childrenCount);
  }
  if (cabinClass !== undefined) {
    params.append("cabinClass", cabinClass);
  }
  if (limit !== undefined) {
    params.append("limit", limit);
  }

  params.append("sortByLeastExpensive", "sortByLeastExpensive");
  //params.append('payment','false');
  //params.append('airlines','AA');

  const url = `${
    config.public.BACKEND_URL
  }/api/duffel/create-request-get-offers?${params.toString()}`;

  //const response = await useFetch(`${config.public.FRONTEND_URL}/tours.json`);
  const { data, error } = await useFetch(url);
  if (error?.value?.data?.message) {
    for (const key in error?.value?.data?.message) {
      console.error(`${key}: ${error?.value?.data?.message[key]}`);
    }
    return [];
  }
  return data?.value?.data ?? [];
}

async function getDepartureFormattedDates(departure) {
  console.log("getDepartureFormattedDates departure: ",departure);
  var dates = {};

  if (departure?.duffel?.offers?.length) {

    var dpFlight = new Date(departure.duffel.offers[0].slices[0].segments[0]?.departing_at);
    var departureMonth = dpFlight.getMonth() + 1;
    var departureYear = dpFlight.getFullYear();
    var formattedDay = dpFlight.toLocaleDateString('en-US', { weekday: 'long' });
    var formattedDate = dpFlight.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    var dpReturnFlight = new Date(departure.duffel.offers[0].slices[1].segments[0]?.departing_at);
    var departureReturnMonth = dpReturnFlight.getMonth() + 1;
    var departureReturnYear = dpReturnFlight.getFullYear();
    var formattedReturnDay = dpReturnFlight.toLocaleDateString('en-US', { weekday: 'long' });
    var formattedReturnDate = dpReturnFlight.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    dates['departure_month'] = departureMonth;
    dates['departure_year'] = departureYear;
    dates['departure_date_mdy'] = dayjs(departure.duffel.offers[0].slices[0].segments[0]?.departing_at).format("MM/DD/YYYY");
    dates['departure_day'] = formattedDay;
    dates['departure_date_formatted'] = formattedDate;

    dates['departure_return_month'] = departureReturnMonth;
    dates['departure_return_year'] = departureReturnYear;
    dates['departure_return_date_mdy'] = dayjs(departure.duffel.offers[0].slices[1].segments[0]?.departing_at).format("MM/DD/YYYY");
    dates['departure_return_day'] = formattedReturnDay;
    dates['departure_return_date_formatted'] = formattedReturnDate;
	console.log("getDepartureFormattedDates", departure);
  }else {console.log("no duffel offers on this departure");}

  return dates;
}

async function fetchSpecificDeparture(tourId,departureId) {
	console.log("fetchSpecificDeparture",tourId,departureId);
  const url = `${config.public.BACKEND_URL}/api/departure/?tourId=${tourId}&departureId=${departureId}`;
  const options = {
    headers: {
      accept: "application/json",
    },
  };
  const { data } = await useFetch(url, options);
  let departure = data?.value ?? [];
  return departure;
}

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

function getDeparturePrices(departure){

  let firstPossibleOffer = departure?.duffel?.offers?.[0];
  let offer = firstPossibleOffer;
  if (!offer) {
    return null;
  }
  if (!offer?.total_amount) {
    return null;
  }

  // RAW PRICES
  const rawPriceFlightAllPerson = offer.total_amount;

  // rounded
  return rawPriceFlightAllPerson ?? 0;
}

function isOfferValid(offer, now) {
  console.log("offer",offer);	
  if (!offer?.expires_at) return false;
  const t = Date.parse(offer.expires_at);
  console.log("expires_at",t);
  if (Number.isNaN(t)) return false;
  console.log("Number.isNaN(t)",Number(t));	
  return t > now;
}	  	


function anyValidOffersInDeparture(dep, now) {
  console.log("anyValidOffersInDeparture");	
  return dep.some(dep => isOfferValid(dep, now))
}	
	
async function waitUntil(predicate, timeout = 3000, interval = 30) {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeout) return false;
    await new Promise((r) => setTimeout(r, interval));
  }
  return true;
}	
	
async function addPossibleDeparturesPrices() {
  const allDeparturesArray = [];
	
  	console.log("props before get flights ",props.tour_length, props.tour_start_city,       props.tour_end_city,props.departures,props.tour_id, props.departures);	
  for (var departure of props.stored) {
	const now = Date.now() 
	console.log("now",now);
	console.log("departure.duffel.offers",departure.duffel.offers);  
	const hasValidOffer = anyValidOffersInDeparture(departure.duffel.offers, now)
    if (hasValidOffer) {
		console.log("offer valid",departure);
		departure["duffel"] = departure.duffel;
		var departureDateFlight = await getDepartureFormattedDates(departure);
		console.log("departureDateFlight",departureDateFlight);
		const selectedAccommodation = departure.formattedInfo.selectedAccommodation;
		console.log("selectedAccommodation",selectedAccommodation);
		const vibeTourUnitPrice = selectedAccommodation?.price_tiers?.[0]?.value_promotion ??
	    selectedAccommodation?.[0]?.price_tiers?.[0]?.value ?? 0;
		console.log("vibeTourUnitPrice",vibeTourUnitPrice);
        const totalPriceAdult = vibeTourUnitPrice * (adultsCount.value ?? 0);
	    console.log("totalPriceAdult",totalPriceAdult);
		const totalPriceChild = departure.formattedInfo.unitChild;
		console.log("totalPriceChild",totalPriceChild);
		var departureInfo = {};
		departureInfo['departure_day'] = departure.formattedInfo.departure_day;
		departureInfo['departure_date_formatted'] = departure.formattedInfo.departure_date_formatted;
		departureInfo['departure_return_day'] = departure.formattedInfo.departure_return_day;
		departureInfo['departure_return_date_formatted'] = departure.formattedInfo.departure_return_date_formatted;
		  departureInfo['passengers'] =  travelersCount.value;
		departureInfo['totalTravelers'] = travelersCount.value;
		  departureInfo['flight_price'] = departure.formattedInfo.flight_price;
		  console.log("departure.formattedInfo.final_price",departure.formattedInfo.final_price);
		  console.log("departureInfo['flight_price']",departureInfo['flight_price']);
		departureInfo['final_price'] = Math.ceil(departure.formattedInfo.final_price);
		  console.log("departureInfo['final_price']",departureInfo['final_price']);
		if(departure.prices?.promotion != null){
		  console.log("promotion",departure.prices.promotion);
		  departureInfo['promotion'] = Number(departure.prices.promotion.discount);
		  departureInfo['promo'] = Math.ceil(Math.abs(departureInfo['promotion']));
		}
		
		departure.formattedInfo = departureInfo;
		allDeparturesArray.push(departure);
		console.log("localSearchBar.value.departuresDates",localSearchBar.value.departuresDates); 
		console.log("departure.id",departure.id); 
		const idx = localSearchBar.value.departuresDates.findIndex(opt => opt.value === departure.id);
		if (idx !== -1) {
		  // Build the new label
		  const dateStr = departure.formattedInfo.departure_date_formatted;
		  const priceStr = Number(departure.formattedInfo.final_price).toLocaleString("en-US")
		  const newLabel = `${dateStr} – $ ${priceStr} USD`;
		  localSearchBar.value.departuresDates[idx].label = newLabel;
	   }
		
	} else {
    departure["duffel"] = await getFlights(props.tour_length, props.tour_start_city, props.tour_end_city, departure);
    if(!departure?.duffel?.offers?.length || departure?.duffel?.offers?.length == 0){continue;}
    var departureDateFlight = await getDepartureFormattedDates(departure);
	  const specificDeparture = await fetchSpecificDeparture(props.tour_id,departure.value);
	  console.log("specificDeparture",specificDeparture);
	  const selectedAccommodation = selectAccommodation(specificDeparture.prices.accommodations, travelersCount.value);
	  const vibeTourUnitPrice = selectedAccommodation?.price_tiers?.[0]?.value_promotion ??
	  selectedAccommodation?.[0]?.price_tiers?.[0]?.value ?? 0;

    const totalPriceAdult = vibeTourUnitPrice * (adultsCount.value ?? 0);
	  console.log("totalPriceAdult",totalPriceAdult);
    const totalPriceChild = 0;
    if ((childrenCount?.value ?? 0) > 0) {
      const vibeTourChildPrice =
        selectedAccommodation?.price_tiers?.[1]?.value_promotion ??
        selectedAccommodation?.price_tiers?.[1]?.value ??
        selectedAccommodation?.price_tiers?.[0]?.value_promotion ??
        selectedAccommodation?.price_tiers?.[0]?.value ?? 0;
      totalPriceChild = vibeTourChildPrice * childrenCount.value;
    }
	  console.log("totalPriceChild",totalPriceChild);
    var departureInfo = {};
    departureInfo['departure_day'] = departureDateFlight.departure_day;
    departureInfo['departure_date_formatted'] = departureDateFlight.departure_date_formatted;
    departureInfo['departure_return_day'] = departureDateFlight.departure_return_day;
    departureInfo['departure_return_date_formatted'] = departureDateFlight.departure_return_date_formatted;
    //departureInfo['passengers'] = await getDeparturePassengers(departure.id);
	  departureInfo['passengers'] =  travelersCount.value;
    departureInfo['totalTravelers'] = travelersCount.value;
 	  departureInfo['flight_price'] = Number(getDeparturePrices(departure));
	  console.log("departure.prices.price_total",specificDeparture.prices.price_total);
	  console.log("departureInfo['flight_price']",departureInfo['flight_price']);
    departureInfo['final_price'] = Math.ceil((totalPriceAdult + totalPriceChild + departureInfo['flight_price'])*1.15);
	  console.log("departureInfo['final_price']",departureInfo['final_price']);
		if(specificDeparture.prices?.promotion != null){
		  console.log("promotion",specificDeparture.prices.promotion);
		  departureInfo['promotion'] = Number(specificDeparture.prices.promotion.discount);
		  departureInfo['promo'] = Math.ceil(Math.abs(departureInfo['promotion']));
		}
		departure.formattedInfo = departureInfo;
		allDeparturesArray.push(departure);
		console.log("localSearchBar.value.departuresDates",localSearchBar.value.departuresDates); 
		console.log("departure.value",departure.value); 
		const idx = localSearchBar.value.departuresDates.findIndex(opt => opt.value === departure.value);
		if (idx !== -1) {
		  // Build the new label
		  const dateStr = departure.formattedInfo.departure_date_formatted;
		  const priceStr = Number(departure.formattedInfo.final_price).toLocaleString("en-US")
		  const newLabel = `${dateStr} – $ ${priceStr} USD`;
		  localSearchBar.value.departuresDates[idx].label = newLabel;
	   }
    }
  }
	console.log("allDeparturesArray",allDeparturesArray);
}

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
	
onMounted(async () => {
  nextTick(() => {
    console.log("onMounted");
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const search = params.get('search');
      adultsCount.value = getAdultsCount(params, "adultsCount");
      console.log("adultsCount.value", adultsCount.value );
      childrenCount.value = getChildrenCount(params, 'childrenCount');
      console.log("childrenCount.value", childrenCount.value);
      travelersCount.value = Number(adultsCount.value) + Number(childrenCount.value);
	  console.log("travelersCount.value", travelersCount.value);
	  
  });
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