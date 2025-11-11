<style scoped>
.section {
  max-width: 1440px;
  margin: 100px auto;
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

.section-title {
  margin-top: 0px;
  font-family: Canaro;
  font-weight: 700;
  line-height: 70px;
}

.section-p {
  max-width: 730px;
}

p {
  font-family: 'Interstate';
  color: rgba(0, 0, 0, 0.70);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  /* 144.444% */
  letter-spacing: 0.72px;
}

.home-filter {
  height: fit-content;
  align-self: center;
}

.p-dropdown .p-dropdown-label.p-placeholder {
  color: #FF6C0E !important;
  border-radius:8px !important;
  font-family: interstate !important;
}

.p-dropdown .p-dropdown-trigger {
  color: #FF6C0E !important;
}

.p-dropdown {
  border: 1px solid #FF6C0E !important;
  border-radius:8px !important;
}

.tour-card {
  background: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  max-width: 95%;
  margin: auto;
  height: 569px;
}

.tour-img {
  width: 100%;
  border-radius: 12px 12px 0px 0px;
  background-size: cover;
  background-position: center;
}

.tour-name {
  color: #000;
  font-family: Canaro;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  /* 150% */
}

.reviews {
  display: flex;
  margin-top: 20px;
}

.location {
  color: #000;
  text-align: center;
  font-family: 'Interstate';
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.8px;
  display: flex;
}

.price {
  color: #82CF45;
  font-family: Alef;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.border-bottom {
  border-top: 1px solid #818181;
  padding-top: 20px;
}

.time {
  display: flex;
  color: #000;
  text-align: center;
  font-family: 'Interstate';
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.8px;
}

.tour-detail {
  padding: 28px 19px 32px 19px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
}

@media only screen and (max-width:767px) {
  .tour-name {
    height: 60px;
  }

  .tour-img {
    height: 200px;
  }

  .location,
  .time,
  .tour-name {
    font-size: 16px;
  }

  .price {
    font-size: 18px
  }

  .green-section {
    padding: 16px;
  }

  .section-title {
    font-size: 26px;
  }
  .animation-airplane{
    height: 350px;
    width: 350px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .tour-name {
    height: 80px;
  }

  .tour-img {
    height: 250px;
  }

  .location,
  .time,
  .tour-name {
    font-size: 20px;
  }

  .price {
    font-size: 22px
  }

  .green-section {
    padding: 70px 1%;
  }

  .section-title {
    font-size: 36px;
  }
  .animation-airplane{
    height: 300px;
    width: 300px;
  }
}

@media only screen and (min-width:1200px) {
  .page-margin {
    padding: 5rem 10rem;
  }

  .tour-name {
    height: 90px;
  }

  .tour-img {
    height: 300px;
  }

  .location,
  .time,
  .tour-name {
    font-size: 22px;
  }

  .price {
    font-size: 24px
  }

  .layout-content {
    padding: 0 !important;
  }

  .green-section {
    padding: 100px 0;
  }

  .section-title {
    font-size: 46px;
  }
  .animation-airplane{
    height: 400px;
    width: 400px;
  }
}

.p-carousel-prev {
  position: absolute !important;
  left: 0px !important;
  z-index: 2 !important;
  border: 1px solid orange !important;
  background: white !important;
  border-radius: 0 !important;
}

.p-carousel-prev path {
  fill: orange !important;
}

.p-carousel-next {
  position: absolute !important;
  right: 0px !important;
  z-index: 2 !important;
  border: 1px solid orange !important;
  background: white !important;
  border-radius: 0 !important;
}

.p-carousel-next path {
  fill: orange !important;
}

.green-section {
  width: 100%;
  background-color: #f8fcf6;
}
.pi.pi-heart{
  color: #82cf45;
}
.pi-heart-fill{
  color:#EF4444;
}
</style>

<template>
  <div class="green-section page-margin">
    <div style="max-width:1240px;margin:0 auto; auto">
      <div class="grid">
        <div class="col-12 md:col-9">
          <h2 class="section-title text-5xl">Popular <span style="color: #82cf45; font-style: italic;">Adventures</span>
          </h2>
          <p class="section-p font-light">Embark on extraordinary adventures handpicked just for you. Dive into our
            selection of
            featured tours, carefully curated to offer the pinnacle of exploration and discovery.</p>
        </div>
        <div class="col-12 md:col-3 card flex" style="justify-content: end; margin-bottom: 10px;">
          <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="By travel style"
            class="w-full md:w-14rem home-filter" @change="handleCategoryChange($event)" />
        </div>
      </div>
      <div v-if="tours.length >= 3">
       <Carousel v-if="tours.length >= 3" :value="tours" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
        <template #item="slotProps" class="tour-slide">
          <div class="tour-card">

              <div class="tour-img" :style="{ backgroundImage: 'url(' + slotProps.data.main_image + ')' }">
				  <div class="text-right pt-3">
                    <i v-tooltip="'Save this adventure to a Wishlist to see it later.'"
                      @click="toggleWishlist(slotProps.data.tour_id)"
                      :class="{
                        'pi pi-heart mr-3': !isTourInWishlist(slotProps.data.tour_id),
                        'pi pi-heart-fill mr-3': isTourInWishlist(slotProps.data.tour_id)
                      }" style="font-size: 25px;z-index: 9;
    display: block;
    position: relative;
    pointer-events: all;
    cursor: pointer;"
                    ></i>
                  </div>
              </div>

            <div class="tour-detail"><a :href="'/tour?search=true&tourId=' + slotProps.data.tour_id" target="_blank" style="text-decoration: none;">
              <span class="location text-base" style ="color: #82cf45;">
                <img src="/filter-icons/destinations.svg" />
				  &nbsp;&nbsp;{{ slotProps.data?.countries[0]?.country.name }} <div v-tooltip="slotProps.data?.RestOfCountries" v-if="slotProps.data?.LengthOfCountries > 0" > + {{slotProps.data?.LengthOfCountries}} countrie(s)</div></span>
              <span class="reviews text-sm"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg>&nbsp;&nbsp;
                <div v-if="slotProps.data.reviews_count > 0" style="color: gray;">({{ slotProps.data.reviews_count }}+ Review)</div>
              </span>
              <h3 class="tour-name text-lg font-medium">{{ slotProps.data.tour_name }}</h3>
              <div class="border-bottom flex justify-content-between">
                <span style="color: #82cf45; font-weight: 600;" v-tooltip="'The price is approximate, based on the historic average, including economy-class flights for one adult from New York City. The actual booking price may vary depending on the departure location, number and age of travel dates, airline, and other factors.'">
					        from ${{ Math.ceil(slotProps.data.totalPrice || 0) }}
				        </span>
                <span class="time text-sm">
                  <img src="/filter-icons/duration.svg" />
                  {{ slotProps.data.tour_length_days }} days
                </span>
			</div></a>
            </div>
          </div>
        </template>
        </Carousel>
	    </div>
      <div v-if="isLoading" class="loading-container">
        <DotLottieVue class="animation-airplane" autoplay loop src="https://lottie.host/6d57cb1e-3790-4dd6-9e86-2eaad9430e6e/cdBLGv9UNo.lottie" />
        <div class="canaro-font text-xl font-semibold pb-5 text-center" style="max-width: 700px;">
          <template v-if="showMainMessage">
            We are loading the best trips for you! ✈️ It can take 10–20 seconds ⏳
          </template>
          <template v-else>
            💡 Travel Tip: {{ currentTip }}
          </template>
        </div>
      </div>
      <!-- END GRID -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive} from 'vue';
import Dropdown from 'primevue/dropdown';
import Carousel from 'primevue/carousel';
import dayjs from 'dayjs';
import { generalFunctions } from '@/store/general';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import TravelTips from "public/data/travelTips";
import Tooltip from 'primevue/tooltip';
import { onUnmounted } from 'vue';

const showMainMessage = ref(true);
const currentTip = ref('');
let tipInterval = null;

const setRandomTip = () => {
  const index = Math.floor(Math.random() * TravelTips.length);
  currentTip.value = TravelTips[index];
  //console.log("New tip:", currentTip.value);
};


const config = useRuntimeConfig();
const generalStore = generalFunctions();
const isLoading = ref(true);
const selectedCategory = ref({ name: 'Show all', code: 'all' });

const categories = ref([
  { name: 'Show all', code: 'all' },
  { name: 'Overland Truck', code: '4' },
  { name: 'Bicycle', code: '32' },
  { name: 'Sailing', code: '56' },
  { name: 'Hiking & Trekking', code: '73' },
  { name: 'Food & Culinary', code: '178' },
  { name: 'Safari', code: '189' },
  { name: 'River Cruise', code: '209' },
  { name: 'Festival & Events', code: '381' },
  { name: 'Explorer', code: '383' },
]);

const firstDayNextMonth = dayjs().add(2, 'month').startOf('month').format('YYYY/MM/DD');
const lastDayNextMonth = dayjs().add(2, 'month').endOf('month').format('YYYY/MM/DD');
const ranges = ref([firstDayNextMonth, lastDayNextMonth]);

const searchCity = async (code) => {
  let endCityName = null;
  try {
    const response = await useFetch(`${config.public.FRONTEND_URL}/destinations.json`);
    const destinations = response.data.value;
    endCityName = destinations.find((destination) => {
      return destination.t_id === code;
    });
  } catch (error) {
    console.error('Error in searchCity method:', error);
  }
  // console.log("endCityName", endCityName);
  if (endCityName){
  	return endCityName.label;
  }else{
	  return "endcitynotfound";
  }
};

const tours = ref([]);
const toursCache = reactive({});

async function loadToursForCategory(code) {
  // 1) If we’ve already fetched this category before, just pull from cache
  if (toursCache[code]) {
    tours.value = toursCache[code]
    isLoading.value = false
    console.log(`Loaded tours for ${code} from cache`)
    return
  }

  // 2) Otherwise, do the API loop exactly as you have it now
  isLoading.value = true
  tours.value = []
  let page = 1

  // fetch tour IDs…
  const idsUrl = await constructIdsRequest(selectedCategory.value);
  const idsData = await useFetch(idsUrl, {
    headers: { 'accept': 'application/json' },
  });

  if (!idsData.data.value || !idsData.data.value.data) {
    console.log("No tour IDs found.");
    return;
  }

  let tourIds = idsData.data.value.data.tour_ids;
  console.log("tourIds",tourIds);
  // loop pages until you have 8 tours
  while (tours.value.length < 8) {
    const filterUrl = constructTourRadarAPI(tourIds, page)
    const filterData = await useFetch(filterUrl, { headers: { accept: 'application/json' } })
    const items = filterData.data.value?.items || []
    if (!items.length) break

    await tourradarIterator(items)
    page++
  }
  if (tours.length >= 3) {
    setTimeout(() => {
      isLoading.value = false;
    }, 15000);
  }

  // 3) Save into cache and flip loading off
  toursCache[code] = [...tours.value]
  isLoading.value = false
  console.log(`Fetched and cached tours for ${code}`)
}

const tourradarIterator = async (items) => {
  //tours.value = [];
  const dateRange = ranges.value;
  const toursArray = items.map(item => item.tourId);
  const tourIds = toursArray.join(',');
 //  console.log("tourIds",tourIds);
  if(tourIds){
	  const toursData = await fetchTours(tourIds);
	  if(toursData){
	 // console.log("tours", toursData);
	  const mergedTours = toursData.map(tour => {
		const matchingItems = items.filter(item => item.tourId == tour.tour_id);
			return {
				...tour,
				departure: matchingItems
			};
		});
	//  console.log("mergedTours",mergedTours);
	for (const tour of mergedTours) {

		try {
			// console.log("merged tour", tour);
			tour.endCityName = await searchCity(tour.end_city);
			tour.startCityName = await searchCity(tour.start_city);

			// Await the asynchronous function call
			const flightData = await getFlightsForPossibleDepartures(tour);

			// Process the flight data
			tour.Flight = flightData;
			console.log("countries",tour.countries);
			const countryNames = tour.countries.slice(1)
			  .map(item => item.country.name)
			  .join(', ');

			console.log(countryNames);
			tour.RestOfCountries = countryNames;
			console.log("tour.RestOfCountries",tour.RestOfCountries);
			tour.LengthOfCountries = Number(tour.countries.length) - 1;
			console.log("tour.LengthOfCountries",tour.LengthOfCountries);
			let flightprice = Number(tour.Flight.price);
			  let cheapeastAcc = Number(tour.departure[0].cheapestAccommodation.value);
			  let totTrav = 1;
			  if (tour.Flight.price > 0) {
				tour.totalPrice = (1.15 * (flightprice + cheapeastAcc)) / totTrav;
				console.log("tour.totalPrice", tour.totalPrice);
				console.log("numbers", flightprice, cheapeastAcc, totTrav);

			  // Add the processed tour to the tours array
			  tours.value.push(tour);
			//  console.log("tours.value", tours.value);
			} else {
			  console.log("No flights for tour:", tour.tour_id);
			}
		} catch (error) {
		  console.error("Error processing tour:", error);
		}
	  }
	  const initial = tours.value;
	 console.log("initial",initial);
	  }else {console.log("either country or city have tours"); showToast('Try with another destination');}
  }else {console.log("no tour ids");}
};

const getDateInKiwiFormat = (endDate) => {
  return dayjs(endDate).format('YYYY-MM-DD');
}

const calculateTourEndDate = async (departureDate, tourLengthDays) => {
  const date = new Date(departureDate);
  // Ensure the date is treated in local time by converting to a local time equivalent
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  localDate.setDate(localDate.getDate() + Number(tourLengthDays));
  return localDate;
};

const getKiwiDateFrom = (departureDate) => {
  const date = new Date(departureDate);
  // Ensure the date is treated in local time by converting to a local time equivalent
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const days = 1;
  localDate.setDate(localDate.getDate() - days);
  return getDateInKiwiFormat(localDate);
};

const getKiwiIDFromTourradarID = async (tourradarID) => {
  const { data } = await useFetch(`${config.public.FRONTEND_URL}/start-end.json`);
  // console.log({ GLOBAL_LOCATIONS }) // instead of citiesData you could use this variable
  const citiesData = data.value;
  const city = citiesData.find((city) => city.t_city == tourradarID);
  if (!city?.code) {
    console.error(`city.kiwiId not found for tourradarID: ${tourradarID}`)
    return null
  }
  return city.code.toLowerCase();
};

const getFlightsForPossibleDepartures = async (tour) => {

  const tourLengthDays = tour.tour_length_days;
  // console.log("tour.probableDepartures", tour.probableDepartures);
  let Flight = [];
  let startPrice = null; // Declare startPrice outside of the loop
  let departingAtFirstSegment = null;
  let arrivingAtLastSegment = null;
  // for (let i = 0; i < tour.probableDepartures.length; i++) {
  const departure = tour.departure[0];
  // console.log("departure loop", departure);

  try {
    const tourEndDate = await calculateTourEndDate(departure.date, tourLengthDays);
    // console.log("tourEndDate:", tourEndDate);

    const firstDateFrom = await getKiwiDateFrom(departure.date);
    // console.log("firstDateFrom:", firstDateFrom);

    const firstDateTo = await getDateInKiwiFormat(departure.date);
    // console.log("firstDateTo:", firstDateTo);

    const lastDateFrom = await getDateInKiwiFormat(tourEndDate);
    // console.log("lastDateFrom:", lastDateFrom);

    const firstFlightTo = await getKiwiIDFromTourradarID(tour.start_city);
    // console.log("firstFlightTo:", firstFlightTo);

    const lastFlightFrom = await getKiwiIDFromTourradarID(tour.end_city);
    // console.log("lastFlightFrom:", lastFlightFrom);

    if (firstFlightTo && lastFlightFrom) {
      const startFlightResponse = await useFetch(`https://vibeadventures.be/api/duffel-api/offer-requests?origin=NYC&startCity=${firstFlightTo}&endCity=${lastFlightFrom}&departure=${firstDateFrom}&arrival=${lastDateFrom}&adultsCount=1&childrenCount=0`);

      // console.log("startFlightResponse:", startFlightResponse);
      if (startFlightResponse.data.value.offers[0]) {
        startPrice = startFlightResponse.data.value.offers[0].total_amount; // Assign value to startPrice
        departingAtFirstSegment = startFlightResponse.data.value.offers[0].slices[0].segments[0].departing_at;
        // Extracting arriving_at from the last segment of the last slice
        const lastSliceIndex = startFlightResponse.data.value.offers[0].slices.length - 1;
        const lastSegmentIndex = startFlightResponse.data.value.offers[0].slices[lastSliceIndex].segments.length - 1;
        arrivingAtLastSegment = startFlightResponse.data.value.offers[0].slices[lastSliceIndex].segments[lastSegmentIndex].arriving_at;
        Flight = {
          "price": startPrice,
          "departure": departingAtFirstSegment,
          "arrival": arrivingAtLastSegment
        };
      } else {
        console.log("no flights found");
        startPrice = null;
        departingAtFirstSegment = null;
        arrivingAtLastSegment = null;
        Flight = null;
      }
    } else {
      console.log("no IATA match");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle the error gracefully
  }
  //}

  return Flight; // Return startPrice
}

const constructTourData = (tourIds) => {
  return `${config.public.BACKEND_URL}/api/tours?tour_ids=${tourIds}&sort_by=price_total&sort_order=asc&limit=120`;
};

async function fetchTours(tourIds) {
  try {
    const url = constructTourData(tourIds);
    const { data } = await useFetch(url, {
      headers: {
        'accept': 'application/json',
      },
    });
    return data.value?.data ?? [];
  } catch (error) {
    console.error('Error fetching data from APIs', error);
  }
}

const constructTourRadarAPI = (toursIds, page) => {
  const url = `${config.public.BACKEND_URL}/api/filterdepartures?date_range=${ranges.value}&page=${page}&tourIds=${toursIds}&travelers=1&user_country=185&currency=USD`;
  console.log('Constructed URL:', url);
  return url;
};


const constructIdsRequest = (selectedCategory) => {
  console.log("constructIdsRequest selectedCategory", selectedCategory);
  let destinationParams;
  if (selectedCategory.code === 'all') {
    const allCodes = categories.value
      .filter(category => category.code !== 'all')
      .map(category => category.code)
      .join(',');
    destinationParams = `tour_type=${allCodes}`;
  } else {
	console.log("selectedCategory.code",selectedCategory.code)
    destinationParams = `tour_type=${selectedCategory.code}`;
  }
	console.log(`/api/tour-ids?${destinationParams}&sort_by=price_total&sort_order=asc&limit=120`);
  return `${config.public.BACKEND_URL}/api/tour-ids?${destinationParams}&sort_by=price_total&sort_order=asc&limit=120`;
};

async function iterator() {
  let page = 1;
  let tourIds = [];
  // Construct the IDs request
  const idsUrl = await constructIdsRequest(selectedCategory.value);
  const idsData = await useFetch(idsUrl, {
    headers: { 'accept': 'application/json' },
  });

  if (!idsData.data.value || !idsData.data.value.data) {
    console.log("No tour IDs found.");
    return;
  }

  tourIds = idsData.data.value.data.tour_ids;

  while (tours.value.length < 8) {
    const filterUrl = constructTourRadarAPI(tourIds, page); // Pass page
    const filterData = await useFetch(filterUrl, {
      headers: { 'accept': 'application/json' },
    });

    if (!filterData.data.value && page >= 40 || !filterData.data.value.items.length && page >= 40) {
      console.log("No more tours available.");
      break; // Stop fetching if no more tours are available
    }

    const filteredIds = filterData.data.value.items;
    await tourradarIterator(filteredIds); // Process tours
	console.log("tours.value",tours.value);
    page++; // Increment page for the next request
  }
  isLoading.value = false;
}



onMounted(async () => {
  setTimeout(() => {
    showMainMessage.value = false;
    setRandomTip();
    tipInterval = setInterval(setRandomTip, 5000);
  }, 5000);
  loadToursForCategory(selectedCategory.value.code);
});
onUnmounted(() => {
  if (tipInterval) clearInterval(tipInterval);
});
const handleCategoryChange = (event) => {
  console.log("event.value: ",event.value);
  isLoading.value = true;
  const selectedValue = event.value;
  selectedCategory.value = event.value;
  //tours.value = [];
  loadToursForCategory(event.value.code)
};

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const wishlistItems = ref([]);

const toggleWishlist = async (tourId) => {

  if(!userId.value){
    localProfileVisible.value = true;
    return;
  }

  var actionUrl = isTourInWishlist(tourId) ? `${config.public.BACKEND_URL}/api/wishlist-delete-by-tour` : `${config.public.BACKEND_URL}/api/wishlists-add`;
  try {
    const response = await fetch(actionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tour_id: tourId,
        user_id: userId.value
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to wishlist");
    }

    const data = await response.json();
    if (data.tour_id) {
      if (!wishlistItems.value.includes(data.tour_id)) {
        wishlistItems.value = [...wishlistItems.value, data.tour_id];
      }
    }

    showToast(data.message);

  } catch (error) {
    console.error("Failed to add item to wishlist:", error);
  }
};
const fetchWishlist = async () => {

  if(user_travelerId.value){

    const userId = localStorage.getItem('user_id');
    var items = [];
    const url_wishlist = `${config.public.BACKEND_URL}/api/wishlists?id=${userId}`;
    const response = await fetch(url_wishlist);
    const data = await response.json();
    items = data.data;
    wishlistItems.value =  items.map(item => item.tour_id);

  }

};

function isTourInWishlist(tourId){
  return wishlistItems.value.includes(tourId);
};
</script>
