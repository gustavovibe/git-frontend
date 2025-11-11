<template>
  <div v-if="bookingError" class="mt-8 mb-8 main-spacing">
    <span style="color:red;font-size:18px">Error, uppsss!</span><br>
    <span>Unfortunately, we encountered an error while booking your trip. It seems this trip is no longer available on the specified departure. No worries <strong>-your card hasn't been charged</strong>. Feel free to book a similar tour instead.</span>
  </div>
<div v-if="isLoading==false">  
  <div v-if="activeBar == 0" style="text-align:right">
    <searchbar />
  </div>
  <Accordion v-else :activeIndex="null" class="mt-8">
    <AccordionTab>
      <template #header><div class="filter-title">Modify Search</div></template>
        <div style="text-align:right">
        <searchbar />
        </div>
    </AccordionTab>
  </Accordion>
</div>  
  <div class="grid" style="max-width:1240px;margin:0 auto;">
    <div class="col-12 md:col-5 lg:col-4 xl:col-3 ">
      <Accordion :activeIndex="activeIndex" @tab-close="onTabClose" @tab-open="onTabOpen">
        <AccordionTab>
          <template #header><div class="filter-title">Filter by</div></template>
          <div id="filters" v-if="progress == false && tours.length > 1">
		   <filtersV2 :types="types" :duration="duration" :ages="ages" :group="group" :cities="cities" @apply="onFiltersApply" @reset="onFiltersReset" />
		  </div>
          <div id="skeleton" v-if="isLoading">
            <Skeleton class="mb-2"></Skeleton><Skeleton width="2rem" class="mb-2"></Skeleton><Skeleton width="1rem" class="mb-2"> </Skeleton><Skeleton height="2rem" class="mb-2"></Skeleton><Skeleton width="1rem" height="4rem"></Skeleton>
          </div>
        </AccordionTab>
      </Accordion>
		
    </div>
    <div class="col-12 md:col-7 lg:col-8 xl:col-9 ">
		<div class="lg:max-w-[75rem]">
			<div class="mx-6" id="adventures">
				
				<!--<div class="card mb-4">
					<TabMenu :model="navigation">
						<template #item="{ item, props }">
							<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
								<a v-ripple :href="href" v-bind="props.action" @click="navigate">
									<span v-bind="props.icon" />
									<span v-bind="props.label">{{ item.label }}</span>
								</a>
							</router-link>
							<a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
								<span v-bind="props.icon" />
								<span v-bind="props.label">{{ item.label }}</span>
							</a>
						</template>
					</TabMenu>
				</div>!-->
				<div class="" id="adventures">
					<h1 style="font-size: 45px;">
						<span style="color: #82cf45;">{{ travelGuide.name ? travelGuide.name : nameActivity }}:</span> Adventures, Tours & Trips
					</h1>
					<p class="interstate text-sm lg:text-base text-justify" v-if="travelGuide.destination">
						{{ travelGuide.destination?.overview }}
					</p>
				</div>
				<div class="card flex justify-content-end align-items-center" style="align-items: center;" id="sorts" v-if="progress == false">
					Sort by:&nbsp;&nbsp;&nbsp;
					<Dropdown v-model="selectedSort" :options="sortedBy" optionLabel="name" placeholder="Sort by:" class="w-full md:w-14rem" />
				</div>
			</div>
		</div>
    <div v-if="isLoading" > 
    <div v-if="showMainMessage" class="m-3 lg:m-5">Please hold, we are loading the results. ✈️🌎 It can take 10–20 seconds.⏳</div>
    <div v-else class="m-3 lg:m-5">💡 <b>Travel Tip:</b> {{ currentTip }}</div>
    <ProgressBar mode="indeterminate" />
    </div>    
      <div class="col m-3 lg:m-5" v-if="userDatesFoundTours === 0 && !progress">
        We couldn't find results for your dates based on your parameters, so we're showing results for future dates instead.
      </div>
      <div class="overflow-x-hidden m-3 lg:m-5" v-if="tours !== null">
        <hr class="surface-300" style="height: 1px;border:none">
        <div v-for="(tour, index) in tours" :key="index">
          <div class="border-1 border-300 border-round-md my-3" v-if="tour.startFlight !== null">
            <div class="grid m-0">
              <div class="col-12 lg:col-4 p-0 m-0">
                <div class="h-13rem md:h-15rem lg:h-15rem bg-cover bg-center border-round-top-md" :style="{ backgroundImage: 'url(' + tour.main_image + ')' }">
                    <div class="text-right pt-3">
                    <i @click="checkWishlistTour(tour.tour_id)" pi pi-heart :class="getHeartIconClass(tour.tour_id)"></i>
                  </div>
                </div>
                <div class="hidden lg:block cursor-pointer" @click="loadEnlargedMap(tour.map_image)">
                  <div class="grid m-0">
                    <div class="col-12 h-10rem bg-cover bg-center image-container" :style="{ backgroundImage: 'url(' + tour.map_thumbnail + ')' }">
                      <button @click="loadEnlargedMap(tour.map_image)" class="view-map-btn">View map</button>
                    </div>
                  </div>
                </div>
              </div>
              <div  class="col-12 lg:col-5 pl-3" style="padding: 1%;">
                <div v-if="bestSellerTourId || greatValueTourId" class="flex gap-2">
                  <div v-if="bestSellerTourId === tour.tour_id"
                    class="p-1 px-3 border-round-xl badge-bs text-green-800 text-sm font-medium" v-tooltip="'This package is more popular and has received better reviews compared to other trips on this page.'">
                      Best Seller
                  </div>
                  <div v-if="greatValueTourId === tour.tour_id" class="p-1 px-3 border-round-xl badge-gv text-orange-800 text-sm font-medium" v-tooltip="'This package offers lower price per day compared to other trips listed on this page.'">
                      Great value
                  </div>
                </div>
                <h1 class="text-base lg:text-xl my-1 font-semibold lg:text-left">{{ tour.tour_name }}</h1>
        <div v-if="tour.reviews_count >0" class="flex lg:justify-content-start">
          <span><img src="/filter-icons/star.svg" /></span>
          <span class="text-sm lg:text-sm mx-2">{{ tour.ratings_operator }}</span>
          <span class="text-sm lg:text-sm">({{ tour.reviews_count }} reviews)</span>
        </div>
                <div class="description-container">
          <p class="text-xs lg:text-sm description-text mb-0">{{ tour.description }}</p>
                  <span class="read-more-trigger mb-3">
                    <a href="#" class="text-green-vibe" @click="handleSeeTrip(tour)">Read more</a>
                  </span>
                </div>
                <div class="grid text-sm mt-2">
                  <div class="col-6 flex align-items-center">
                    <span class="font-semibold">Adventure Style</span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span>{{tour?.type[0].type.tourtype_name}}</span>
                  </div>
                  <!--<div class="col-6 flex align-items-center">
                    <span class="font-semibold">Physical Rating</span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span>{{tour?.physicalRating}}</span>
                  </div>!-->
                  <div class="col-6 flex align-items-center">
                    <span class="font-semibold">Operated in:</span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span>English</span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span class="font-semibold">Departure:</span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span v-if="tour?.Flight?.departure">
                      {{dayjs(tour.Flight.departure).format('MMM D, YYYY') }} 
                      ({{tour.cities[0].city.city_name}})
                    </span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span class="font-semibold">Return:</span>
                  </div>
                  <div class="col-6 flex align-items-center">
                    <span v-if="tour?.Flight?.arrival">
                      {{dayjs(tour.Flight.arrival).format('MMM D, YYYY') }}
                      ({{tour.cities.at(-1).city.city_name}})</span>
                  </div>
                </div>
              </div>
              <div class="col-12 lg:col-3 lg:flex align-content-between flex-wrap justify-content-center p-0">
                <!-- <span class="discount-button" v-if="tour?.discount != null">${{ tour.discount }} USD OFF</span>   -->
        <div v-tooltip="'A discount applied by the tour operator comparade to the standard price of the adventure component of the package.'"  v-if="tour?.discount > 0" style="border: 2px dotted red; border-radius: 20px; padding: 5px; width: 45%; display: flex; align-items: center; justify-content: center; margin-top: 10%;">
                  <p  style="color: red; margin: 0; font-size: 10px;text-align: center;">
                    ${{ tour.discount }} USD OFF
                  </p>
                </div>
                <div class="flex justify-content-around lg:justify-content-center flex-wrap lg:my-2">
                  <div class="mx-1 flex flex-column">
                    <span class="text-base lg:text-lg">Days</span>
                    <span class="text-xl lg:text-2xl font-bold">{{ tour.tour_length_days }}</span>
                  </div>
                  <div class="mx-1 flex flex-column pl-3">
          <span>From</span>
                    <span v-if="tour.totalPrice" class="text-sl lg:text-2xl font-bold green-vibe">
            {{ $currencyDecimal(Math.ceil(tour.totalPrice)) }}
            </span>
          <span v-else class="text-sl lg:text-2xl font-bold gray">Loading price...</span>
          <span v-if="tour.totalPrice" class="text-gray-600">
            Per Day: {{
              tour?.tour_length_days && tour.totalPrice
              ? $currencyDecimal(Math.ceil(tour.totalPrice / tour.tour_length_days))
              : '—'
            }}
          </span>
                  </div>
                </div>
                <div>
                  <div class="flex lg:justify-content-center lg:flex-column justify-content-around lg:text-base text-sm mt-3">
                    <div class="flex my-1">
                      <span><img src="/filter-icons/tick.svg" /></span>
                      <span class=" mx-2">No booking fees</span>
                    </div>
                    <div class="flex my-1">
                      <span><img src="/filter-icons/tick.svg" /></span>
                      <span class="mx-2">Guaranteed departure</span>
                    </div>
                    <div class="flex my-1">
                      <span><img src="/filter-icons/tick.svg" /></span>
                      <span class="mx-2">Best price guaranteed</span>
                    </div>
                  </div>
                  <div style="cursor: pointer; margin-bottom: 10%;" @click="handleSeeTrip(tour)"
                       class="interstate orange-vibe text-center mx-auto w-10 rem py-3 mt-3 border-round-md text-gray-50">
                    See trip
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading">
        <Skeleton class="mb-2"></Skeleton><Skeleton width="10rem" class="mb-2"></Skeleton><Skeleton width="5rem" class="mb-2"></Skeleton><Skeleton height="2rem" class="mb-2"></Skeleton><Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
      <!-- <h4> {{tours.length}} Trips out of {{loadedTours}}</h4> -->
      <Button
        v-if="progress == false && pages > loader+1"
        id="loadButton"
        label="Load more"
				class="mx-5"
        @click="loadMore"
        :style="{
          pointerEvents: pointerEventsEnabled ? 'auto' : 'none',
          backgroundColor: '#82CF45',
          border: 'none'
        }"/>
    </div>

		<!-- Travel Guide -->
		<TravelGuide 
			ref="travelGuideRef"
			:travelGuide="travelGuide" 
			:nameActivity="nameActivity"
			@update:travelGuide="travelGuide = $event"
			class="mt-4"
		/>
		<!-- End Travel Guide -->
  </div>
  <Dialog v-model:visible="showMap" :modal="true" :closable="true" :dismissable-mask="true" :style="{ width: '50rem' }">
    <img
      v-if="enlargedMap"
      :src="enlargedMap"
      class="enlarged-map"
      alt="Enlarged Tour Map"
    />
  </Dialog>

  <Dialog
    v-model:visible="localProfileVisible"
    dismissableMask
    :showHeader="false"
    modal
    :closable="true"
    :style="{ width: '400px' }"
    :pt="{ content: { class: 'p-0' } }"
    class="login-dialog"
  >
  <profilelink />
  </Dialog>
</template>

<script setup>
import {ref, onMounted, computed, onBeforeUnmount} from "vue";  
import filtersV2 from "~/components/FiltersV2.vue";
import searchbar from "~/components/Searchbar.vue";
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';
import dayjs from 'dayjs';
import Skeleton from 'primevue/skeleton';
import { useToast } from "primevue/usetoast";
import ProgressBar from 'primevue/progressbar';
import TabMenu from 'primevue/tabmenu';
import Dropdown from 'primevue/dropdown';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Breadcrumb from "primevue/breadcrumb";
import Dialog from "primevue/dialog";
import profilelink from "~/components/ProfileLink.vue";
import { useProfileStore } from "~/store/profileStore";
import { useTravelTips } from 'public/composables/useTravelTips.js';
import { useTravelerStore } from "~/store/travelerStore";
import TravelGuide from "~/components/TravelGuide.vue";


const { showMainMessage, currentTip, startTips, stopTips } = useTravelTips();
const profileStore = useProfileStore();
const localProfileVisible = ref(profileStore.profile);
const activeIndex = ref(null); // Default: first tab is closed
const activeBar = ref(null); // Default: first tab is closed
const bookingError = ref(false);
const currentSliderIndex = ref(0);
const userId = ref(null);
const travelerId = ref(null);
const windowMobile = ref(false);
const travelGuideRef = ref(null);
const travelGuide = ref({});
const nameActivity = computed(() => {
  let destino = '';
  destinationsSelected.value.forEach(destination => {
    destino = destination.label;
  });
  return destino;
});

const setAccordionState = () => {
  const isMobile = window.innerWidth <= 768; // Define your mobile breakpoint
  windowMobile.value = window.innerWidth <= 768;
  if (isMobile) {
    activeIndex.value = null; // Close all tabs on mobile
    activeBar.value = null;
  } else {
    activeIndex.value = 0; // Open the first tab on desktop
    activeBar.value = 0;
  }

};

const showMap = ref(false);
const enlargedMap = ref('');
function loadEnlargedMap(map){
  enlargedMap.value = `${map}`;
  showMap.value = true;
}

const onTabClose = () => {
  activeIndex.value = null; // Set activeIndex to null when the tab is closed
};

const onTabOpen = (e) => {
  activeIndex.value = e.index; // Update the activeIndex when a tab is opened
};

const toast = useToast();
const showToast = (msg) => {
  toast.add({ severity: 'Secondary', detail: msg, life: 3000 });
}

const best_sellers=ref([]);
const bestSellerTourId = ref(null);
const greatValueTourId = ref(null);
const router = useRouter();
const config = useRuntimeConfig();
const departureSelected = ref('');
const destinationsSelected = ref([]);
const totalTravelers = ref(0);
const dateSelected = ref([]);
const adultsCount = ref(0);
const childrenCount = ref(0);
const infantsCount = ref(0);
const tours = ref([]);
const isLoading = ref(true);
const progress = ref(true);
const formattedDates = ref([]);
const formattedPrevDates = ref('');
const formattedNextDates = ref('');
const timeStay = ref([]);
const priceRange = ref([]);
const guides = ref([]);
const combinedTours = ref([]);
const initial = ref([]);
const things_to_do = ref([]);
const travel_tips = ref([]);
const best_time_to_visit = ref([]);
const total_flag=ref(true);
const total_before=ref(0);
const pages = ref(0);
const navigation = ref([
  { label: 'Adventures', route: '#adventures' },
  { label: 'Travel guide', route: '#guide' }
]);
const selectedSort = ref({ name: 'Price/day: Lowest first', code: '3' });
const sortedBy = ref([
  { name: 'Total Price: Lowest first', code: '1' },
  { name: 'Total Price: Highest first', code: '2' },
  { name: 'Price/day: Lowest first', code: '3' },
  { name: 'Price/day: Highest first', code: '4' },
  { name: 'Duration: Shortest first', code: '5' },
  { name: 'Duration: Longest first', code: '6' },
  { name: 'Popularity: Most popular first', code: '7' },
  { name: 'Reviews: Most reviewed ', code: '8' }
]);

const loadedTours = ref(0);
const wishlistItems = ref([]);
const childrenAges = ref ('');
const userDatesFoundTours = ref(0);

watch(selectedSort, async () => {
  total_flag.value = false;
  tours.value = initial.value;
  console.log("selectedSort.value: ",selectedSort.value);
  tours.value = sortTours();
  console.log("tours.value before sort",tours.value);
});
function sortTours() {
  return [...tours.value].sort((a, b) => {
    switch (selectedSort.value.code) {
      case '1': // Total Price: Lowest to Highest
        return a.totalPrice - b.totalPrice;
      case '2': // Total Price: Highest to Lowest
        return b.totalPrice - a.totalPrice;
      case '3': // Price/Day: Lowest to Highest
        return a.totalPrice / a.tour_length_days - b.totalPrice / b.tour_length_days;
      case '4': // Price/Day: Highest to Lowest
        return b.totalPrice / b.tour_length_days - a.totalPrice / a.tour_length_days;
      case '5': // Duration: Shortest to Longest
        return a.tour_length_days - b.tour_length_days;
      case '6': // Duration: Longest to Shortest
        return b.tour_length_days - a.tour_length_days;
      case '7': // Ratings: Highest to Lowest
        return (parseFloat(b.ratings_overall) || 0) - (parseFloat(a.ratings_overall) || 0);
      case '8': // Reviews: Most Reviewed
        return (b.reviews_count || 0) - (a.reviews_count || 0);
      default:
        return 0;
    }
  });
}
const selectedSortBy = computed(() => {
  const code = selectedSort.value?.code;
  switch(code) {
    case '1':
      return "sort_by=price_total&sort_order=asc";
    case '2':
      return "sort_by=price_total&sort_order=desc";
    case '3':
      return "sort_by=price_day&sort_order=asc";
    case '4':
      return "sort_by=price_day&sort_order=desc";
    case '5':
      return "sort_by=tour_length_days&sort_order=asc";
    case '6':
      return "sort_by=tour_length_days&sort_order=desc";
    case '7':
      return "sort_by=reviews_overall&sort_order=desc";
    case '8':
      return "sort_by=reviews_count&sort_order=desc";
    default:
      return "sort_by=price_total&sort_order=asc";
  }
});

if (progress.value) {
  startTips();
}

watch(progress, (newVal) => {
  if (newVal) {
    startTips();
  } else {
    stopTips();
  }
});

const responsiveOptions = ref([
  {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
  }
]);

function onFiltersReset() {
  console.log("onFiltersReset");	
  // Directly reset client-side:
  tours.value = initial.value;
}

async function onFiltersApply(payload) {
  console.log('apply with payload', payload);
  isLoading.value = true;

  let filteredTours = initial.value;

  // Time
  if (payload.selectedTime && payload.selectedTime.length) {
    const [minT, maxT] = payload.selectedTime;
    filteredTours = filteredTours.filter(t =>
      Number(t.tour_length_days) >= Number(minT) && Number(t.tour_length_days) <= Number(maxT)
    );
  }

  // Price (payload.selectedPrice may include a flag: [min, max, mode] ; adapt as needed)
  if (payload.selectedPrice && payload.selectedPrice.length === 3) {
    const [minP, maxP, mode] = payload.selectedPrice;
    filteredTours = filteredTours.filter(t => {
      const price = Number(t.totalPrice || 0);
      if (mode === 1 && Number(t.tour_length_days) > 0) {
        const perDay = price / Number(t.tour_length_days);
        return perDay >= Number(minP) && perDay <= Number(maxP);
      } else {
        return price >= Number(minP) && price <= Number(maxP);
      }
    });
  }

  // Age
  if (payload.selectedAges && payload.selectedAges.length) {
    const [minA, maxA] = payload.selectedAges;
    filteredTours = filteredTours.filter(t =>
      Number(t.min_age) >= Number(minA) && Number(t.max_age) <= Number(maxA)
    );
  }

  // Group size
  if (payload.selectedGroup && payload.selectedGroup.length) {
    const [minG, maxG] = payload.selectedGroup;
    filteredTours = filteredTours.filter(t =>
      Number(t.max_group_size) >= Number(minG) && Number(t.max_group_size) <= Number(maxG)
    );
  }

  // Guides (categories)
  if (payload.selectedCategories && payload.selectedCategories.length) {
    const cats = payload.selectedCategories;
    filteredTours = filteredTours.filter(t =>
      cats.some(typeID => t.type.some(type => Number(type.tour_type_id) === Number(typeID)))
    );
  }

  // Ratings
  if (payload.selectedRatings && payload.selectedRatings.length) {
    const newCombined = [];
    for (const ratingId of payload.selectedRatings) {
      for (const tour of filteredTours) {
        if (tour.type.find(type => Number(type.tour_type_id) === Number(ratingId))) {
          newCombined.push(tour);
        }
      }
    }
    filteredTours = newCombined;
  }

  // Styles
  if (payload.selectedStyles && payload.selectedStyles.length) {
    const newCombined = [];
    for (const styleId of payload.selectedStyles) {
      for (const tour of filteredTours) {
        if (tour.type.find(type => Number(type.tour_type_id) === Number(styleId))) {
          newCombined.push(tour);
        }
      }
    }
    filteredTours = newCombined;
  }

  // selectedCities (if payload.selectedCities is an array of {id})
  if (payload.selectedCities && payload.selectedCities.length) {
    const added = new Set();
    const cityFiltered = [];
    payload.selectedCities.forEach(city => {
      filteredTours.forEach(tour => {
        if (tour.selectedCities && tour.selectedCities.some(c => Number(c.t_city_id) === Number(city.id)) && !added.has(tour.tour_id)) {
          cityFiltered.push(tour);
          added.add(tour.tour_id);
        }
      });
    });
    filteredTours = cityFiltered;
  }

  // ensure unique tours
  tours.value = filteredTours.filter((tour, idx, self) =>
    idx === self.findIndex(t => t.tour_id === tour.tour_id)
  );

  isLoading.value = false;
}

function checkTourType(type, typeID) {
  console.log("typeID", typeID);
  console.log("type", type);
  if (Number(type.tour_type_id) == Number(typeID)) {
    return true;
  }
}

function checkTourcities(cities, cityId) {
  if (cities.t_city_id == cityId) {
    return true;
  }
}
const startEndCache = ref(null);
const fetchStartEnd = async () => {
  // If we've already loaded the JSON, just return the cached array
  if (startEndCache.value) {
    return startEndCache.value;
  }
  try {
    const response = await useFetch(
      `${config.public.FRONTEND_URL}/start-end.json`
    );
    startEndCache.value = response.data.value
    return startEndCache.value;
  } catch (e) {
    console.error('Error loading start-end.json:', e);
    throw e;
  }
}
const getKiwiIDFromTourradarID = async (tourradarID) => {
  const data = await fetchStartEnd();
  console.log("getKiwiIDFromTourradarID",data);
  const citiesData = data;
  const city = citiesData.find((city) => city.t_city == tourradarID);
  if (!city?.code) {
    console.error(`city.kiwiId not found for tourradarID: ${tourradarID}`)
    return null
  }
  return city.code.toLowerCase();
};

const constructTourRadarAPI = (page, toursIdsParam, travelers, ranges, childrenAges) => {
  const formattedRanges = formatDateRangeToCommaSeparated(ranges);
  console.log("formattedRanges before filterdepartures", formattedRanges);

  const destinationParams = destinationsSelected.value
    .map(destination => `${destination.type}=${destination.t_id}`)
    .join('&');

  const childrenParam = childrenAges !== '' ? '&childrenAges=' + childrenAges : '';
  const url = `${config.public.BACKEND_URL}/api/filterdepartures?date_range=${formattedRanges}&tourIds=${toursIdsParam}&travelers=${travelers}&user_country=185&currency=USD${childrenParam}`;

  console.log('Constructed URL:', url);
  return url;
};


function formatDateRangeToCommaSeparated(ranges) {
  console.log("ranges constructTourRadarAPI", ranges);
  // Split the input date range by the '-' character
  const dateParts = ranges.split('-');
  const startDate = dateParts[0];
  const endDate = dateParts[1];
  // Return the formatted string with a comma separator
  return `${startDate},${endDate}`;
}

const constructIdsRequest = (destinationsSelected) => {
  console.log("constructIdsRequest destinations", destinationsSelected);
  const destinationParams = destinationsSelected
      .map(destination => `${destination.type}=${destination.t_id}`)
      .join('&');
  return `${config.public.BACKEND_URL}/api/tour-ids?${destinationParams}&${selectedSortBy.value}`;
};

function checkIfIsPossibleDeparture(tour, departure) {
  const startDate = new Date(departure.date);
  // console.log("startDate", startDate);
  const dateSelected0 = new Date(dateSelected.value[0]);
  // console.log("dateSelected0", dateSelected0);
  const dateSelected1 = new Date(dateSelected.value[1]);
  // console.log("dateSelected1", dateSelected1);
  const tourLength = Number(tour.tour_length_days);
  // console.log("tourLength", tourLength);
  const timeStay0 = Number(timeStay.value[0]);
  // console.log("timeStay0", timeStay0);
  const timeStay1 = Number(timeStay.value[1]);
  // console.log("timeStay1", timeStay1);
  const availability = Number(departure.availability);
  // console.log("availability", availability);
  const travelers = Number(totalTravelers.value);
  // console.log("travelers", travelers);
  // if (startDate >= dateSelected0 && startDate <= dateSelected1 && tourLength >= timeStay0 && tourLength <= timeStay1 && availability >= travelers && departure.departure_type == "guaranteed") {
    if (startDate >= dateSelected0 && startDate <= dateSelected1 && tourLength >= timeStay0 && tourLength <= timeStay1 && availability >= travelers) {
    // console.log("true");
    return true;
  }
}

const getPossibleDepartures = (tour) => {
  const possibleDepartures = [];
  for (const departure of tour.availableDepartures) {
    const isPossibleDeparture = checkIfIsPossibleDeparture(tour, departure);
    if (isPossibleDeparture) {
      possibleDepartures.push(departure);
      // console.log("got Possible Departure: ", departure);
      break;
    } else {
      // console.log("It's not a possible departure: ", departure);
    }
  }
  // console.log('got possible departures:', possibleDepartures);
  return possibleDepartures;
}

const destinationsCache = ref(null)

const fetchDestinations = async () => {
  // If we've already loaded the JSON, just return the cached array
  if (destinationsCache.value) {
    return destinationsCache.value;
  }

  try {
    const response = await useFetch(
      `${config.public.FRONTEND_URL}/destinations.json`
    );
    destinationsCache.value = response.data.value
    return destinationsCache.value;
  } catch (e) {
    console.error('Error loading destinations.json:', e);
    throw e;
  }
};

// safe helper: update one tour in reactive array
function applyFlightToTour(tourId, flight, origin, startIata, endIata) {
  const idx = tours.value.findIndex(t => t.tour_id === tourId);
  if (idx === -1) return;

  const target = tours.value[idx];

  if (!flight) {
    target.Flight = null;
    target.totalPrice = null;
    return;
  }

  // set flight
  target.Flight = flight;
  target.origin =  origin;
  target.startIata = startIata;
  target.endIata = endIata;
	
  const flightprice = Number(flight.price || 0);
  console.log("flightprice",tourId,":",flightprice,"target:",target.tour_id);
  console.log("target.departures",target.departures);	
  const cheapestAcc = Number(target.departures?.[0]?.cheapestAccommodation?.value || 0);
  console.log("cheapestAcc",tourId,":",cheapestAcc,"target:",target.tour_id);
  const totTrav = Number(totalTravelers.value || 1);

  if (flightprice > 0) {
    target.totalPrice = 1.15 * (flightprice + (cheapestAcc * totTrav));
  } else {
    target.totalPrice = null;
  }

  // compute discount safely
  const dep0 = target.departures?.[0];
  if (dep0 && dep0.departures && dep0.departures.prices) {
    const pb = Number(dep0.departures.prices.price_base || 0);
    const pp = Number(dep0.departures.prices.price_promotion || 0);
    if (pb > pp) target.discount = Math.ceil(Math.abs(pb - pp));
  }
}


// safe sort function (handles nulls)
function resortTours(code) {
  const safeNum = (v, fallback = Infinity) => (typeof v === 'number' && !isNaN(v) ? v : fallback);

  switch (code) {
    case '1':
      tours.value.sort((a, b) => safeNum(a.totalPrice) - safeNum(b.totalPrice));
      break;
    case '2':
      tours.value.sort((a, b) => safeNum(b.totalPrice, -Infinity) - safeNum(a.totalPrice, -Infinity));
      break;
    case '3':
      tours.value.sort((a, b) => (safeNum(a.totalPrice) / safeNum(a.tour_length_days, 1)) - (safeNum(b.totalPrice) / safeNum(b.tour_length_days, 1)));
      break;
    case '4':
      tours.value.sort((a, b) => (safeNum(b.totalPrice) / safeNum(b.tour_length_days, 1)) - (safeNum(a.totalPrice) / safeNum(a.tour_length_days, 1)));
      break;
    case '5':
      tours.value.sort((a, b) => safeNum(a.tour_length_days, 0) - safeNum(b.tour_length_days, 0));
      break;
    case '6':
      tours.value.sort((a, b) => safeNum(b.tour_length_days, 0) - safeNum(a.tour_length_days, 0));
      break;
    case '7':
      tours.value.sort((a, b) => safeNum(b.ratings_operator, 0) - safeNum(a.ratings_operator, 0));
      break;
    case '8':
      tours.value.sort((a, b) => safeNum(b.reviews_count, 0) - safeNum(a.reviews_count, 0));
      break;
    default:
      tours.value.sort((a, b) => safeNum(a.totalPrice) - safeNum(b.totalPrice));
  }
}

async function fetchFlights(paramsObj) {
  setTimeout(() => {
      console.log('1 second has passed');
  }, 1000); // 1000 milliseconds = 1 second	
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
  tourDate,
  tourEndDate,  
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
  console.log("tourDate ",tourDate);  
  params.append('arrivalTimeTo','06:00');
  const tourdate = dayjs(tourDate).format('DD-MM-YYYY');  
  console.log("tourdate formated",tourdate);
  params.append("tourDate",tourdate); 
  //params.append('departureTimeFromInbound','21:00');
  params.append("tourEndDate",tourEndDate); 
  const url = `${
    config.public.BACKEND_URL
  }/api/duffel/create-request-get-offers?${params.toString()}`;
  const { data, error } = await useFetch(url);
  if (error?.value?.data?.message) {
    for (const key in error?.value?.data?.message) {
      console.error(`${key}: ${error?.value?.data?.message[key]}`);
    }
    return [];
  }
  return data?.value?.data ?? [];
}

// configurable
const REQUIRED_SUCCESS = 5;
const FLIGHT_CONCURRENCY = 4; // adjust to avoid rate limits

// updated getFlights function: accepts pre-resolved IATA (avoid double calls)
const getFlightsForPossibleDepartures = async (tour, startIATA, endIATA, origin) => {
  if (!startIATA || !endIATA) return null;
  const departure = tour.departures[0];
  if (!departure) return null;
  const tourLengthDays = tour.tour_length_days;
  try {
    const destination = startIATA;
    const originInbound = endIATA;
    const destinationInbound = origin;
    const departureDate = dayjs(departure.date).subtract(1,'day').format('YYYY-MM-DD');
    const tourEndDate = dayjs(departure.date).add(tourLengthDays, 'day').format('YYYYMMDD');
    const departureDateInbound = dayjs(tourEndDate).add(1,'day').format('YYYY-MM-DD');
    const tourDate = departure?.date;

    const startFlightResponse = await fetchFlights({
      origin,
      destination,
      departureDate,
      originInbound,
      destinationInbound,
      departureDateInbound,
      adultsCount: adultsCount.value,
      childrenCount: childrenCount.value,
      tourDate,
      tourEndDate
    });

    console.log("startFlightResponse", startFlightResponse);
    const offers = startFlightResponse?.offers;
    console.log("offers", offers);

    if (!offers || !offers.length) {
      console.log("no offers");
      removeTourById(tour.tour_id);
      return null;
    }

    const best = offers[0];
    const price = best.total_amount || 0;
    if (!price) return null;

    // Use an object, not an array — so JSON/stringify/localStorage preserves it
    departure.duffel = {
      requestId: startFlightResponse?.id ?? null,
      offers
    };

    // find departure & arrival timestamps (safe guards)
    const departingAtFirstSegment = best.slices?.[0]?.segments?.[0]?.departing_at || null;
    const lastSliceIndex = best.slices?.length ? best.slices.length - 1 : 0;
    const lastSegmentIndex = best.slices?.[lastSliceIndex]?.segments?.length
      ? best.slices[lastSliceIndex].segments.length - 1
      : 0;
    const arrivingAtLastSegment = best.slices?.[lastSliceIndex]?.segments?.[lastSegmentIndex]?.arriving_at || null;
    const departureId = best.id;

    // if you want to pause, await the delay
    if (typeof delay === 'function') await delay(1000);

    return {
      price,
      departure: departingAtFirstSegment,
      arrival: arrivingAtLastSegment,
      id: departureId,
    };
  } catch (err) {
    console.error("getFlightsForPossibleDepartures error", err);
    return null;
  }
};


// helper to remove a tour from reactive array by tour_id
function removeTourById(tourId) {
  const idx = tours.value.findIndex(t => t.tour_id === tourId);
  console.log("idx",idx); 
  if (idx !== -1) tours.value.splice(idx, 1);
  console.log("removeTourById tours.value",tours.value);  
  // keep initial.value in sync if you use it
  //initial.value = tours.value;
}

function markTourInvalid(tourId) {
  const idx = tours.value.findIndex(t => t.tour_id === tourId);
  if (idx !== -1) {
    tours.value[idx]._invalid = true; // do not remove immediately
  }
  console.log("markTourInvalid tours.value",tours.value); 
}

function filterInvalidTours() {
  console.log("filterInvalidTours tours.value",tours.value);
  tours.value = tours.value.filter(t => !t._invalid);
  initial.value = tours.value;
}
    
function setMergedToursUnique(newTours) {
  const map = new Map();
  // keep existing tours by id (preserve reactive objects)
  (tours.value || []).forEach(t => map.set(t.tour_id, t));
  // add/update from newTours
  newTours.forEach(nt => {
    if (map.has(nt.tour_id)) {
      // merge properties into existing object to keep reactivity
      const existing = map.get(nt.tour_id);
      Object.assign(existing, nt);
      // ensure placeholders exist
      existing.Flight = existing.Flight ?? null;
      existing.totalPrice = existing.totalPrice ?? null;
      existing.discount = existing.discount ?? null;
    } else {
      // store a new reactive object
      map.set(nt.tour_id, { ...nt, Flight: null, totalPrice: null, discount: null });
    }
  });
  // write back as array
  tours.value = Array.from(map.values()); 
  initial.value = tours.value;  
} 
  
const types = ref([]); 
const duration = ref();
const ages = ref();    
const group = ref();   	
const cities = ref(); 	
	
// Main iterator (revised)
const tourradarIterator = async (items) => {
  console.log("items",items);	
  const toursArray = items.map(item => item.tourId);
  const tourIds = toursArray.join(',');
  if (!tourIds.length) {
    console.log("no tour ids on iterator");  
    await loadMore();
    return;
  }
  console.log("tourIds on iterator",tourIds);
  const toursData = await fetchTours(tourIds);
  if (!Array.isArray(toursData) || !toursData.length) {
    console.log("no fetched tours");  
    showToast('Try with another destination');
    return;
  }

  //getTourTags(toursData);

  // Build mergedTours quickly and render (users see items immediately)
  const mergedTours = toursData.map(tour => {
    const matchingItems = items.filter(item => item.tourId == tour.tour_id);
	console.log("matchingItems",matchingItems);  
    return {
      ...tour,
      departures: matchingItems,
      Flight: null,
      totalPrice: null,
      discount: null
    };
  });
  console.log("mergedTours",mergedTours);
  // Render immediately (replace to avoid duplicates)
  setMergedToursUnique(mergedTours);

  // prepare a queue of tours to process (copy so we can mutate tours.value separately)
  const queue = [...mergedTours];
  console.log("queue",queue);
  // shared success counter
  let successCount = 0;
  let stoppedEarly = false;

  // worker function
  const worker = async () => {
    
    while (queue.length > 0) {
      // stop early if hit required number
      if (successCount >= REQUIRED_SUCCESS) {
        stoppedEarly = true;
        break;
      }

      const t = queue.shift();
    console.log("queue shift",t); 
      if (!t) continue;

      try {
        // Resolve IATA codes for this tour (do this here so you can remove tours with no IATA)
        const [startIATA, endIATA] = await Promise.all([getKiwiIDFromTourradarID(t.start_city),getKiwiIDFromTourradarID(t.end_city)]);
        console.log("startIATA",startIATA);
        console.log("endIATA",endIATA);
		const origin = departureSelected.value;  
        if (!startIATA || !endIATA) {
          // remove from UI and continue
          console.log("removing tour:",t.tour_id);  
          markTourInvalid(t.tour_id);
          continue;
        }
        // fetch flight using pre-resolved IATA
        const flight = await getFlightsForPossibleDepartures(t, startIATA, endIATA, origin);
		
        if (flight && Number(flight.price) > 0) {
		  console.log("getFlightsForPossibleDepartures flight",flight);	
          // apply flight data reactively (reuse your applyFlightToTour helper)
          applyFlightToTour(t.tour_id, flight, origin, startIATA, endIATA);
          successCount++;

        } else {
          console.log("no  price for tour:",t.tour_id); 
          removeTourById(t.tour_id);
        }

      } catch (err) {
        console.error("worker error for tour", t.tour_id, err);
        // On error, remove to avoid showing broken tour
        removeTourById(t.tour_id);
      }
    }
  };

  // start N workers but don't await if you want the function to return faster.
  const workers = Array.from({ length: FLIGHT_CONCURRENCY }, () => worker());
  await Promise.all(workers);
  // cleanup invalids and finalize
  filterInvalidTours();
  resortTours(selectedSort.value?.code);
  if (tours.value.length < 5 && Number(pages.value) > Number(loader.value + 1)) {
      console.log("tours.value.length",tours.value.length);
      console.log("pages.value",pages.value);
      console.log("loader.value",loader.value);
      await loadMore();
    } else {
      total_flag.value = false;
      console.log("pagination stopped");
    }
	types.value = await getTypes(tours.value);
	console.log("types.value",types.value);
   	await getToursDuration(tours.value);
	await getToursMinMaxAge(tours.value);
	await getToursGroupSizes(tours.value);
	cities.value = getCities(tours.value);
	console.log("cities.value",cities);
};
	
//filters helpers	
// returns [{ t_city_id, city: { city_name, ... }, count }, ...]
function getCities(tours) {
  if (!Array.isArray(tours) || tours.length === 0) return [];

  const map = new Map();

  for (const tour of tours) {
    if (!Array.isArray(tour.cities)) continue;

    // ensure each tour contributes at most +1 per city
    const seenThisTour = new Set();

    for (const c of tour.cities) {
      // pick t_city_id from possible locations
      const t_city_id = c.t_city_id ?? c.city?.t_city_id ?? c.city?.id;
      if (t_city_id == null) continue;

      if (seenThisTour.has(t_city_id)) continue;
      seenThisTour.add(t_city_id);

      const cityObj = c.city ?? {};
      const cityName = cityObj.city_name ?? cityObj.name ?? '';

      if (map.has(t_city_id)) {
        map.get(t_city_id).count += 1;
      } else {
        map.set(t_city_id, {
          t_city_id,
          city: { ...cityObj, city_name: cityName },
          count: 1
        });
      }
    }
  }

  // convert to array and sort alphabetically by city_name (change to sort by count if you prefer)
  return Array.from(map.values()).sort((a, b) =>
    (a.city.city_name || '').localeCompare(b.city.city_name || '')
  );
}

	
const getTypes = async (tours) => {
  if (!tours || tours.length === 0) return [];

  const map = new Map();

  for (const tour of tours) {
    if (!Array.isArray(tour.type)) continue;

    // ensure each tour counts once per type
    const seenInThisTour = new Set();

    for (const t of tour.type) {
      // normalize id and name from either the top-level or nested "type" object
      const id = String(t.tour_type_id ?? t.type?.tour_type_id ?? '').trim();
      if (!id) continue;

      if (seenInThisTour.has(id)) continue;
      seenInThisTour.add(id);

      const name = (t.type && t.type.tourtype_name) ?? t.tourtype_name ?? String(id);

      if (map.has(id)) {
        map.get(id).count += 1;
      } else {
        map.set(id, { name, key: id, count: 1 });
      }
    }
  }

  // convert to array and sort by count descending
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
};	
	
const getToursDuration = async (tours) => {
  if (!tours || tours.length === 0) return;
  const durations = tours.map(tour => Number(tour.tour_length_days));
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  duration.value = [minDuration, maxDuration];
};

const getToursMinMaxAge = async (tours) => {
	if (!tours || tours.length === 0) return;
	const minAges = tours.map(tour => Number(tour.min_age));
	const maxAges = tours.map(tour => Number(tour.max_age));
	const minAge = Math.min(...minAges);
	const maxAge = Math.max(...maxAges);
	ages.value = [minAge, maxAge];
};
	
const getToursGroupSizes = async (tours) => {
	if (!tours || tours.length === 0) return;
	const groupSize = tours.map(tour => Number(tour.max_group_size));
	const minGroupSize = Math.min(...groupSize);
	const maxGroupSize = Math.max(...groupSize);
	group.value = [minGroupSize, maxGroupSize];
	
};	
	
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const findTourStyle = (types) => {
  const idsToMatch = [4, 32, 56, 73, 77, 178, 189, 209, 330, 381, 383];
  const firstMatchingType = types.find(type => idsToMatch.includes(type.type.tourtype_id));
  return firstMatchingType ? firstMatchingType.type.tourtype_name : null;
};

// ---- CACHE CONFIG ----
const IDS_CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours (adjust as needed)
const IDS_CACHE_LOCALSTORAGE_KEY = 'tourIdsCache_v1';

// in-memory cache: Map<key, { value: any, ts: number }>
const toursIdsCache = new Map();

// attempt to hydrate in-memory cache from localStorage (client-side only)
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const raw = localStorage.getItem(IDS_CACHE_LOCALSTORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // parsed is expected to be an object: { [key]: { value, ts } }
      Object.entries(parsed).forEach(([k, v]) => {
        // keep only valid entries (basic safety)
        if (v && v.ts && v.value !== undefined) toursIdsCache.set(k, v);
      });
    }
  } catch (e) {
    console.warn('Could not restore tourIds cache from localStorage', e);
  }
}

// helper: persist in-memory cache to localStorage (client-only)
function persistIdsCacheToLocalStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const obj = {};
    for (const [k, v] of toursIdsCache.entries()) {
      obj[k] = v;
    }
    // keep size smaller by stringifying
    localStorage.setItem(IDS_CACHE_LOCALSTORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn('Could not persist tourIds cache', e);
  }
}

// helper: get cached entry (returns `value` or null if expired/missing)
function getCachedIds(key) {
  const entry = toursIdsCache.get(key);
  if (!entry) return null;
  const now = Date.now();
  if (entry.ts + IDS_CACHE_TTL < now) {
    // expired
    toursIdsCache.delete(key);
    persistIdsCacheToLocalStorage();
    return null;
  }
  return entry.value;
}

// helper: set cache
function setCachedIds(key, value) {
  const entry = { value, ts: Date.now() };
  toursIdsCache.set(key, entry);
  // try to persist
  persistIdsCacheToLocalStorage();
}

// helper: clear cache (useful for debug, or when destinations change drastically)
function clearIdsCache() {
  toursIdsCache.clear();
  if (typeof window !== 'undefined' && window.localStorage) {
    try { localStorage.removeItem(IDS_CACHE_LOCALSTORAGE_KEY); } catch(e) { /* ignore */ }
  }
}

const destinationBC = ref(null);  
const searchDestinations = async (codes) => {
  console.log("codes", codes);
  const destinationsNames = [];
  const destinations = [];
  let foundDestination = null;
  for (const code of codes) {
    console.log("destination code", code);
    try {
      const response = await fetchDestinations();
    console.log("destinations response", response);
      const destinations = response;
      console.log("destinations", destinations);
      foundDestination = destinations.find((destination) => {
        return destination.t_id === code;
      });
    } catch (error) {
      console.error('Error in searchCity method:', error);
    }
    finally {
      console.log("foundDestination", foundDestination);
      destinationsNames.push(foundDestination.label);
      destinations.push(foundDestination);
      destinationBC.value = foundDestination;
    }
  }
  title.value = destinationsNames.join(" & ");
  destinationsSelected.value = destinations;
  console.log("destinationsSelected.value", destinationsSelected.value);
  //await searchTours2();
};  
  
// ---- REFACTORED fetchToursIds ----
async function fetchToursIds() {
  try {
    // build the URL exactly like before
    const url = constructIdsRequest(destinationsSelected.value);

    // Use the URL as the cache key (simple and effective)
    const cacheKey = url;

    // 1) try get cached response
    const cached = getCachedIds(cacheKey);
    if (cached) {
      console.log('fetchToursIds: returning cached ids for', cacheKey, cached);
      return cached; // cached should already be the same shape you return (data.value.data)
    }

    // 2) make the first request
    let { data, error } = await useFetch(url, {
      headers: { 'accept': 'application/json' }
    });

    if (error?.value) {
      console.error('Error fetching IDs (first attempt):', error.value);
      // return empty result so caller can handle
      return { tour_ids: [] };
    }

    console.log("fetchToursIds data", data.value.data);

    // If the data is empty and there is a city in destinationsSelected => expand to country
    if (data.value.data.total == 0) {
      console.log("cities no results");
      showToast('No tours found for city');

      const cityDestination = destinationsSelected.value.find(destination => destination.type === 'city');
      if (cityDestination) {
        console.log("cityDestination", cityDestination);

        // fetch expanded-cities json (as before)
        const cities = await useFetch(`${config.public.FRONTEND_URL}/expanded-cities.json`);
        const citiesData = cities?.data?.value || [];

        const cityInfo = (Array.isArray(citiesData) && citiesData.find(city => city.TourradarID == cityDestination.t_id)) || null;
        if (cityInfo) {
          showToast('Expanding search to country');
          console.log("cityInfo", cityInfo);

          // Update destinationsSelected to a single country
          destinationsSelected.value = [{
            t_id: cityInfo.t_country_id,
            label: cityInfo.country_name,
            type: 'country'
          }];

          // Construct new URL and try again
          const newUrl = await constructIdsRequest(destinationsSelected.value);
          // Try to use cache for newUrl too
          const cached2 = getCachedIds(newUrl);
          if (cached2) {
            console.log('fetchToursIds: returning cached ids for expanded country', newUrl);
            return cached2;
          }

          let secondResponse = await useFetch(newUrl, {
            headers: { 'accept': 'application/json' }
          });

          // use the returned shape consistently
          if (secondResponse?.data?.value) {
            console.log("Data after second request:", secondResponse.data.value.data);
            // cache and return
            setCachedIds(newUrl, secondResponse.data.value.data);
            return secondResponse.data.value.data;
          } else {
            console.log("no cityInfo response");
            showToast('Try with another destination');
            return { tour_ids: [] };
          }
        } else {
          console.log("no cityInfo");
          showToast('Try with another destination');
          return { tour_ids: [] };
        }
      } else {
        console.log("no cities");
        showToast('Try with another destination');
        return { tour_ids: [] };
      }
    } else {
      // successful first request — cache and return
      const payload = data.value.data;
      setCachedIds(cacheKey, payload);
      return payload;
    }
  } catch (error) {
    console.error('Error fetching data from APIs', error);
    return { tour_ids: [] };
  }
}

const CHUNK_SIZE = 10;

async function fetchToursData(page, toursIds, travelers, ranges, childrenAges) {
  console.log("fetchToursData with data", page, toursIds, travelers, ranges, childrenAges);

  try {
    // ensure toursIds is an array (it might be passed as a string sometimes)
    let idsArray = Array.isArray(toursIds)
      ? toursIds
      : (typeof toursIds === 'string' ? toursIds.split(',').map(s => s.trim()).filter(Boolean) : []);

    // compute slice for this page
    const start = (Number(page) - 1) * CHUNK_SIZE;
    const idsForPageArr = idsArray.slice(start, start + CHUNK_SIZE);

    // nothing to request for this page
    if (!idsForPageArr.length) {
      console.log(`No tour ids for page ${page} (slice empty).`);
      return [];
    }

    const tourIdsParam = idsForPageArr.join(',');

    // construct URL using sliced ids (pass as string)
    const url = constructTourRadarAPI(page, tourIdsParam, travelers, ranges, childrenAges);
    console.log('Fetching data from URL:', url);

    const startTime = Date.now();
    const { data, error } = await useFetch(url, {
      headers: { 'accept': 'application/json' },
    });
    const endTime = Date.now();
    console.log(`Fetch duration: ${endTime - startTime}ms`);

    if (error?.value) {
      console.error('Error fetching data from API:', error.value);
      return [];
    }

    const items = data?.value?.items || [];
    console.log('Response data value (items):', items);
    console.log('total de registros encontrados', items.length);

    loadedTours.value = items.length;
    if (total_before.value < items.length) {
      total_flag.value = items.length;
    } else {
      total_flag.value = false;
    }

    return items;
  } catch (err) {
    console.error('Error fetching data from APIs:', err);
    return [];
  }
}

async function fetchTours(tourIds) {
  try {
    const url = `${config.public.BACKEND_URL}/api/tours?tour_ids=${tourIds}&${selectedSortBy.value}`;
    const { data } = await useFetch(url, {
      headers: {
        'accept': 'application/json',
      },
    });
    const toursList = data.value?.data ?? [];
    for(var tour in toursList){
      console.log('tourList',toursList[tour]);
    }
    //updateBestsellers(toursList);
    return toursList;
  } catch (error) {
    console.error('Error fetching data from APIs', error);
  }
}

function extractTourRadarItems(tourradarData) {
  // console.log("tourradarData", tourradarData);
  // console.log("tourradarData.city", tourradarData.city);
  const items = [];
  if (tourradarData?.country) {
    items.push(...tourradarData.country.data);
    // console.log("items", items);
  }

  if (tourradarData?.city) {
    items.push(...tourradarData.city.data);
    // console.log("items", items);
  }

  if (tourradarData?.natural_destinations) {
    items.push(...tourradarData.natural_destinations.data);
    // console.log("items", items);
  }
  return items;
};

let filterShow = ref(false);

const loader = ref(1);
const toursValue = computed(() => tours.value);
const pointerEventsEnabled = ref(false);

const searchTours2 = async () => {
  isLoading.value = true;
  progress.value = true;
  filterShow.value = false;
  pointerEventsEnabled.value = false;
  console.log("loader.value on searchTours2",loader.value);
  try {
    if (!departureSelected.value || !destinationsSelected.value) {
      console.error('Please check departureSelected or destinationsSelected');
      return false;
    }
    const toursIds = await fetchToursIds();
    const totalIds = (toursIds?.tour_ids?.length) || 0;
    pages.value = Math.ceil(totalIds / 10) || 0;
    console.log("fetching tours with",loader.value, toursIds.tour_ids, totalTravelers.value, formattedDates.value, childrenAges.value); 
    let fetchedItems = await fetchToursData(loader.value, toursIds.tour_ids, totalTravelers.value, formattedDates.value, childrenAges.value);
  console.log("fetchedItems",fetchedItems);  
    userDatesFoundTours.value = (fetchedItems?.length) || 0;
    await tourradarIterator(fetchedItems);
    const VISIBLE_THRESHOLD = 5;
    const needMore = (tours.value.length < VISIBLE_THRESHOLD) && (Number(pages.value) > Number(loader.value));
    if (needMore){console.log("more tours needed:",5 - tours.value.length);loadMore();}

  } catch (err) {
    console.error("searchTours2 error:", err);
    return false;
  } finally {
	console.log("tours.value",tours.value);  
    isLoading.value = false;
    progress.value = false;
    pointerEventsEnabled.value = true;
  }
};

const isLoadingMore = ref(false);

const loadMore = async () => {
  if (isLoadingMore.value) return;        // guard concurrent calls
  isLoadingMore.value = true;
  console.log("pages.value",pages.value);
  try {
    const MAX_CHAIN = 3; // don't chain more than 3 consecutive loadMore
    let chain = 0;
    while (chain < MAX_CHAIN && Number(pages.value) > Number(loader.value)) {
    console.log("while chain",chain); 
      chain++;
    loader.value += 1;
    console.log("loader.value", loader.value);
    isLoading.value = true;
    progress.value = true;
      await searchTours2();
    }
  } catch (err) {
    console.error("loadMore error:", err);
  } finally {
    isLoadingMore.value = false;
    isLoading.value = false;
    progress.value = false;
  }
};

dayjs.extend(customParseFormat);

function getDepartureSelected(params) {
  if (!params.get('departureSelected')) {
    return "NYC" // default value
  }

  return params.get('departureSelected')
}

function getTimeStay(params) {
  if (!params.get('timeStay')) {
    return ["2", "65"] // default value
  }
  return params.get('timeStay').split(',')
}

function getDestinationsSelected(params) {
  if (!params.get('t_id')) {
    return 84; // default value italy
  }
  const tIds = params.get('t_id').split(',').map(id => parseInt(id)); // Converts string to array of integers
  console.log("tIds", tIds); // This will log [94, 95, 96]
  return tIds;
}

function getDatesSelected(params, name) {
  if (!params.get(name)) {
    const firstDayNextMonth = dayjs().add(1, 'day').format('DD/MM/YYYY');
    const lastDayNextMonth = dayjs().add(2, 'month').format('DD/MM/YYYY');
    return [firstDayNextMonth, lastDayNextMonth];
  }
  return params.get(name).split('-');
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

const title = ref();
const map = ref(null);
const mapRef = ref(null);
const locationName = ref('');

const tourTypes = ref([
  {
    "code": 4,
    "type": "Overland Truck"
  },
  {
    "code": 32,
    "type": "Bicycle"
  },
  {
    "code": 56,
    "type": "Sailing"
  },
  {
    "code": 73,
    "type": "Hiking & Trekking"
  },
  {
    "code": 77,
    "type": "In-depth Cultural"
  },
  {
    "code": 178,
    "type": "Food & Culinary"
  },
  {
    "code": 189,
    "type": "Safari"
  },
  {
    "code": 209,
    "type": "River Cruise"
  },
  {
    "code": 330,
    "type": "Health"
  },
  {
    "code": 381,
    "type": "Festival & Events"
  },
  {
    "code": 383,
    "type": "Explorer"
  },
  {
    "code": 385,
    "type": "Active"
  }
]);

const getTourTags = async (tours) => {

  const toursWithPricePerDay = tours.map(tour => ({
    ...tour,
    price_total: parseFloat(tour.price_total),
    price_per_day: tour.tour_length_days > 0 ? parseFloat(tour.price_total) / tour.tour_length_days : Infinity
  }));

  const sortedByReviews = [...toursWithPricePerDay].sort((a, b) => b.reviews_count - a.reviews_count);
  const top3Reviews = sortedByReviews.slice(0, 3);

  if (top3Reviews.length > 0){

    top3Reviews.sort((a, b) => {
      const ratingA = parseFloat(a.ratings_overall);
      const ratingB = parseFloat(b.ratings_overall);
      if (ratingB !== ratingA) {
        return ratingB - ratingA;
      }
      return b.reviews_count - a.reviews_count;
    });
    bestSellerTourId.value = top3Reviews[0].tour_id;

  }

  if (toursWithPricePerDay.length > 0) {

    const bestDealTour = toursWithPricePerDay.reduce((minTour, currentTour) => {
      return currentTour.price_per_day < minTour.price_per_day ? currentTour : minTour;
    }, toursWithPricePerDay[0]);
    greatValueTourId.value = bestDealTour.tour_id;

  }

};

function searchType(code) {
  const matchedItem = tourTypes.value.find(item => item.code == code);
  console.log("matchedItem", matchedItem);
  return matchedItem.type;
}

const timeLeft = ref(30 * 60); // 30 minutes in seconds
const {user_travelerId, toggleWishlist, fetchWishlist, updateWishCountNumber } = useTravelerStore();

const checkUser = async () => {
  
  let storedTravelerId = travelerId.value || localStorage.getItem('travelerId');
  if (storedTravelerId) {
    travelerId.value = storedTravelerId;
    const wishListResponse = await fetchWishlist(travelerId.value, `${config.public.BACKEND_URL}`);
    if (wishListResponse && wishListResponse.success && wishListResponse.data.length > 0) {
      wishlistItems.value = wishListResponse.data.map(item => item.tour_id);
      console.log("wishlistItems.value",wishlistItems.value);
    }
    return;
  }

  if (userId.value) {
    const response = await user_travelerId({ id: userId.value }, `${config.public.BACKEND_URL}`);
    if (response.success) {
      travelerId.value = response.data;
      localStorage.setItem('travelerId', response.data);
      const wishListResponse = await fetchWishlist(travelerId.value, `${config.public.BACKEND_URL}`);
      if (wishListResponse && wishListResponse.success && wishListResponse.data.length > 0) {
        wishlistItems.value = wishListResponse.data.map(item => item.tour_id);
        console.log("wishlistItems.value",wishlistItems.value);
      }
    }
  }
};

onMounted(async () => {
  setAccordionState();
  window.addEventListener('resize', setAccordionState);
  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      location.reload();
    }
  }, 1000);
  nextTick(async () => {
    const params = new URLSearchParams(window.location.search);
    departureSelected.value = getDepartureSelected(params);
    timeStay.value = getTimeStay(params);
    dateSelected.value = getDatesSelected(params, 'dateRange');
    formattedDates.value = formatDates(dateSelected.value);
    console.log("formattedDates.value",formattedDates.value);
    console.log("prev DATES",formattedPrevDates.value);
    console.log("next DATES",formattedNextDates.value);
    adultsCount.value = getAdultsCount(params, "adultsCount");
    childrenCount.value = getChildrenCount(params, 'childrenCount');
    infantsCount.value = getChildrenCount(params, 'infantsCount');
    totalTravelers.value = parseInt(adultsCount.value + childrenCount.value + infantsCount.value);
    const search = params.get('search');
    bookingError.value = params.get('error');
    if(params.get('childrenAges') && params.get('childrenAges') !== ''){
      childrenAges.value = params.get('childrenAges');
    }
    const type = params.get('type');
  console.log("type param",type);  
    const category = params.get('type');
    const value_id = params.get('t_id');
    if (search == "true" && type != "tour_type") {
    console.log("type is country, city or natural destination");  
      const codes = getDestinationsSelected(params);
    await searchDestinations(codes);
    } 
    else if(type == "tour_type") {
    console.log("type is tour_type"); 
      const code = params.get('t_id')
      title.value = searchType(code);
      destinationsSelected.value = [
        {
          "t_id": code,
          "label": title.value,
          "type": "tour_type"
        }
      ];
      console.log("destinationsSelected.value", destinationsSelected.value);
    }
  await searchTours2(); 
    
    userId.value = localStorage.getItem('user_id');
    //checkUser();
		if(travelGuideRef.value && category && value_id) {
      travelGuideRef.value.searchTravelGuide(category, value_id);
    }
  });
});

const formatDates = (dates) => {
  const startDate = dayjs(dates[0], "DD/MM/YYYY");
  const endDate = dayjs(dates[1], "DD/MM/YYYY");
  if (!startDate.isValid() || !endDate.isValid()) {
    console.error("Invalid date format detected. Please use DD/MM/YYYY.");
  }
  const formattedStartDate = startDate.format("YYYY/MM/DD");
  const formattedEndDate = endDate.format("YYYY/MM/DD");

  // Calculate formattedPrevDates (90 days before startDate)
  const prevEndDate = startDate.subtract(1, 'day'); // Day before the selected start date
  const prevStartDate = prevEndDate.subtract(89, 'day'); // 90 days before prevEndDate (inclusive)
  formattedPrevDates.value = `${prevStartDate.format("YYYY/MM/DD")}-${prevEndDate.format("YYYY/MM/DD")}`;

  // Calculate formattedNextDates (90 days after endDate)
  const nextStartDate = endDate.add(1, 'day'); // Day after the selected end date
  const nextEndDate = nextStartDate.add(89, 'day'); // 90 days after nextStartDate (inclusive)
  formattedNextDates.value = `${nextStartDate.format("YYYY/MM/DD")}-${nextEndDate.format("YYYY/MM/DD")}`

  return `${formattedStartDate}-${formattedEndDate}`;
};

const formatDatesv2 = (dates) => {
  console.log("dates", dates);

  // Now dayjs will use the provided format correctly
  const startDate = dayjs(dates[0], "DD/MM/YYYY");
  const endDate = dayjs(dates[1], "DD/MM/YYYY");

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  const formattedStartDate = startDate.format("YYYY/MM/DD");
  const formattedEndDate = endDate.format("YYYY/MM/DD");

  return `${formattedStartDate}-${formattedEndDate}`;
};

const handleSeeTrip = (tour) => {
  //const departure_range = formattedDates.value;
  //const options = { day: '2-digit', month: 'long', year: 'numeric' };
  console.log("handleSeeTrip tour",tour);	
  const formattedRange = formatDatesv2(dateSelected.value);
  console.log("formattedRange",formattedRange);	
  const key = `${tour.tour_id}-${formattedRange}`;
  const payload = {
      savedAt: dayjs().valueOf(),
      value: tour
    }
  localStorage.setItem(key,JSON.stringify(payload));	
  const route = {
    path: "/tourv2",
    query: {
      tourId: tour.tour_id,
	  //departureId: tour.departures[0].id,
	  //offerId: tour.Flight.id,	
      //departure_range: departure_range,
      //departure_fly_from: departureSelected.value,
      //departure_fly_to: tour.start_city,
      adultsCount: adultsCount.value,
      childrenCount: childrenCount.value,
      //infantsCount: infantsCount.value,
      //dateSelected: dateSelected.value,
      dateRange: formattedRange,
      //totalTravelers: totalTravelers.value,
    }
  };

  // Construct the URL with query parameters
  const queryString = new URLSearchParams(route.query).toString();
  const url = `${route.path}?${queryString}`;

  // Open the URL in a new tab
  window.open(url, '_blank');
};

const checkWishlistTour = async (tourId) => {

  if(!userId.value){
    localProfileVisible.value = true;
    return;
  }

  const isInWishlist = isTourInWishlist(tourId);
  let method = 'POST';
  let actionUrl = `${config.public.BACKEND_URL}/api/wishlists-add`;
  if(isInWishlist){
    actionUrl = `${config.public.BACKEND_URL}/api/wishlist-delete-by-tour`;
  }
  const wishListResponse = await toggleWishlist(tourId, userId.value, actionUrl, method);
  console.log("wishListResponse",wishListResponse);
  showToast(wishListResponse.message);
  if(wishListResponse.success){
    
    const newWishListResponse = await fetchWishlist(travelerId.value, `${config.public.BACKEND_URL}`);
    if (newWishListResponse && newWishListResponse.success && newWishListResponse.data.length > 0) {
      wishlistItems.value = newWishListResponse.data.map(item => item.tour_id);
      console.log("wishlistItems NEW",wishlistItems.value);
      updateWishCountNumber(newWishListResponse.data.length);
    }
  }
};

const isTourInWishlist = (tourId) => {
  return wishlistItems.value.includes(tourId);
};

const getHeartIconClass = (tourId) => {
  return isTourInWishlist(tourId)
    ? 'pi pi-heart-fill mr-3'
    : 'pi pi-heart mr-3 ';
};
</script>
<style scoped src="~/pages/toursv2/toursv2.css"></style>