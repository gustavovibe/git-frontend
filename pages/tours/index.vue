<script>
import filters from "~/components/Filters.vue";
import searchbar from "~/components/Searchbar.vue";
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';
import TravelGuide from "~/components/TravelGuide.vue";


export default {
  components:
  {
    filters,
    searchbar,
		TravelGuide
  },
};
</script>
<style scoped>
.filter-title {
  color: var(--Gray-1, #333);
  font-family: Canaro;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  padding: 8px;
}
.p-accordion-header a{
	    padding: 0 !important;
}
.discount-button{
	color: #FF0E0E;
    margin-top: 4px;
    padding: 4.5958px 17.979px;
    border: 1.2px dashed #FF0E0E;
    border-radius: 12px;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link{
  border-width: 0 0 5px 0;
}

.tour-card {
  padding: 0.75rem;
}

.tour-card .h-13rem {
  margin-bottom: 0.6rem;
}
.tour-card .badge-bs,
.tour-card .badge-gv {
  margin-bottom: 0.5rem;
}

.discount-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted #FF0E0E;
  border-radius: 12px;
  padding: 5px 8px;
  margin: 0.25rem 0 0.5rem 0;
  color: #FF0E0E;
  background: rgba(255, 255, 255, 0.95);
  max-width: 220px;
  text-align: center;
  align-self: flex-start;
}
.discount-tag .discount-text {
  margin: 0;
  font-size: 10px;
  line-height: 1;
}

@media only screen and (max-width: 767px) {
  .pricing-block {
    flex-direction: row;
    align-items: flex-start;
  }
  .pricing-block .mx-1.flex.flex-column.pl-5 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .pricing-block .discount-tag {
    margin-left: 0;
  }
}

.pricing-block {
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}

@media only screen and (max-width: 767px) {
  .tour-card {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .tour-card .description-container {
    margin-top: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .lg\:col-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .badge-bs, .badge-gv {
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .tour-card .flex.my-1 {
    gap: 0.5rem;
  }

  .tour-card .orange-vibe {
    width: calc(100% - 2rem);
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>

<template>
  <div v-if="bookingError" class="mt-8 mb-8 main-spacing">
    <span style="color:red;font-size:18px">Error, uppsss!</span><br>
    <span>Unfortunately, we encountered an error while booking your trip. It seems this trip is no longer available on the specified departure. No worries <strong>-your card hasn't been charged</strong>. Feel free to book a similar tour instead.</span>
  </div>
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
  <div class="grid" style="max-width:1240px;margin:0 auto;">

    <div class="col-12">
      <div class="">
        <p class="interstate text-sm lg:text-base text-justify mt-1 lg:px-0 px-4">NOTE: Prices for travel packages are dynamic and subject to real-time changes based on the availability and pricing of individual components, primarily flights. </p>
      </div>
      <Breadcrumb :model="breadCrumbsComputed" v-if="breadCrumbsComputed">
        <template v-slot:item="{ item }">
          <a
            class="p-menuitem-link"
            :href="item.url"
            target="_blank"
          >	
						<span :class="[item.icon, 'text-color']" />
            <span class="p-menuitem-text" :style="!item.url ? 'color: #82cf45; font-weight: bold;' : ''">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </div>
    <div class="col-12 md:col-5 lg:col-4 xl:col-3 ">

		  <Accordion :activeIndex="activeIndex" @tab-close="onTabClose" @tab-open="onTabOpen">
        <AccordionTab>
          <template #header><div class="filter-title">Filter by</div></template>
          <div id="filters" v-if="progress == false"><filters /></div>

          <div id="skeleton" v-if="isLoading">
            <Skeleton class="mb-2">
            </Skeleton>
            <Skeleton width="2rem" class="mb-2">
            </Skeleton>
            <Skeleton width="1rem" class="mb-2">
            </Skeleton>
            <Skeleton height="2rem" class="mb-2">
            </Skeleton>
            <Skeleton width="1rem" height="4rem">
            </Skeleton>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="col-12 md:col-7 lg:col-8 xl:col-9 ">
      <div class="lg:max-w-[75rem]">
        <div>
          <div>
            <div class="card">
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
            </div>
          </div>
        </div>
          <div class="mx-6 lg:max-w-[75rem]" id="adventures">
            <h1 style="font-size: 45px;">
              <span style="color: #82cf45;">{{ travelGuide.name ? travelGuide.name : nameActivity }}:</span> Adventures, Tours & Trips
            </h1>
            <p class="interstate text-sm lg:text-base text-justify" v-if="travelGuide.destination">
              {{ travelGuide.destination?.overview }}
            </p>
            <div class="card flex justify-content-end align-items-center" style="align-items: center;" id="sorts" v-if="progress == false">
              Sort by:&nbsp;&nbsp;&nbsp;
              <Dropdown v-model="selectedSort" :options="sortedBy" optionLabel="name" placeholder="Sort by:" class="w-full md:w-14rem" />
            </div>
          </div>
      </div>
	  <div v-if="isLoading" >	
			<div v-if="showMainMessage" class="m-3 lg:m-5">
          Please hold, we are loading the results. ✈️🌎 It can take 10–20 seconds.⏳
			</div>
			<div v-else class="m-3 lg:m-5">
				💡 <b>Travel Tip:</b> {{ currentTip }}
			</div>
			<ProgressBar mode="indeterminate" />
	  </div>	  
      <div class="col m-3 lg:m-5" v-if="userDatesFoundTours === 0 && !progress">
        We couldn't find results for your dates based on your parameters, so we're showing results for future dates instead.
      </div> 
      <div class="overflow-x-hidden m-3 lg:m-5" v-if="tours !== null">
        <hr class="surface-300" style="height: 1px;border:none">
        <div v-for="(tour, index) in tours" :key="index">
          <div class="border-1 border-300 border-round-md my-3 tour-card" v-if="tour.startFlight !== null">
             <div class="grid m-0">
               <div class="col-12 lg:col-4 p-0 m-0">
                 <div class="h-13rem md:h-15rem lg:h-15rem bg-cover bg-center border-round-top-md"
                     :style="{ backgroundImage: 'url(' + tour.main_image + ')' }">
                     <div class="text-right pt-3">
                     <i
                       @click="checkWishlistTour(tour.tour_id)"
                       :class="getHeartIconClass(tour.tour_id)"
                     ></i>
                   </div>
                 </div>
                 <div class="hidden lg:block cursor-pointer" @click="loadEnlargedMap(tour.map_image)">
                   <div class="grid m-0">
                     <div class="col-12 h-10rem bg-cover bg-center image-container"
                          :style="{ backgroundImage: 'url(' + tour.map_thumbnail + ')' }">
                       <button @click="loadEnlargedMap(tour.map_image)" class="view-map-btn">View map</button>
                     </div>
                   </div>
                 </div>
               </div>
               <div  class="col-12 lg:col-5 pl-3" style="padding: 1%;">
                 <div v-if="bestSellerTourId || greatValueTourId" class="flex gap-2">
                   <div v-if="bestSellerTourId === tour.tour_id"
                     class="p-1 px-3 border-round-xl badge-bs text-green-800 text-sm font-medium"
                     v-tooltip="'This package is more popular and has received better reviews compared to other trips on this page.'">
                       Best Seller
                   </div>
                   <div v-if="greatValueTourId === tour.tour_id"
                     class="p-1 px-3 border-round-xl badge-gv text-orange-800 text-sm font-medium"
                     v-tooltip="'This package offers lower price per day compared to other trips listed on this page.'">
                       Great value
                   </div>
                 </div>
                  <h1 class="text-base lg:text-xl my-1 font-semibold lg:text-left">
                   {{ tour.tour_name }}
                 </h1>
                                 <div v-if="tour.reviews_count >0" class="flex lg:justify-content-start">
                                     <span>
                                         <img src="/filter-icons/star.svg" />
                                     </span>
                                     <span class="text-sm lg:text-sm mx-2">
                                         {{ tour.ratings_operator }}
                                     </span>
                                     <span class="text-sm lg:text-sm">
                                         ({{ tour.reviews_count }} reviews)
                                     </span>
                                 </div>
 
                 <div class="description-container">
                   <p class="text-xs lg:text-sm description-text mb-0">
                     {{ tour.description }}
                   </p>
                   <span class="read-more-trigger mb-3" >
                     <a href="#" class="text-green-vibe" @click="handleSeeTrip(tour)">Read more</a>
                   </span>
                 </div>
                 <div class="grid text-sm mt-2">
                   <div class="col-6 flex align-items-center">
                     <span class="font-semibold">
                       Adventure Style
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span>
                        {{tour?.adventureStyle}}
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span class="font-semibold">
                       Physical Rating
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span>
                        {{tour?.physicalRating}}
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span class="font-semibold">
                       Operated in:
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span>
                       English
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span class="font-semibold">
                       Departure:
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span v-if="tour?.Flight?.departure">
                       {{formatDate(tour?.Flight?.departure) }} ({{tour.startCityName}})
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span class="font-semibold">
                       Return:
                     </span>
                   </div>
                   <div class="col-6 flex align-items-center">
                     <span v-if="tour?.Flight?.arrival">
                       {{  formatDate(tour?.Flight?.arrival) }} ({{tour.startCityName}})
                     </span>
                   </div>
                 </div>
               </div>
               <div class="col-12 lg:col-3 lg:flex align-content-between flex-wrap justify-content-center p-0">
                <!-- Discount tag (restored) -->
                <div v-tooltip="'A discount applied by the tour operator comparade to the standard price of the adventure component of the package.'" v-if="tour?.discount > 0" class="discount-tag">
                  <p class="discount-text">
                    ${{ tour.discount }} USD OFF
                  </p>
                </div>
                <div class="flex justify-content-around lg:justify-content-center flex-wrap lg:my-2 pricing-block">
 
                   <div class="mx-1 flex flex-column">
                     <span class="text-base lg:text-lg">
                       Days
                     </span>
                     <span class="text-xl lg:text-2xl font-bold">
                       {{ tour.tour_length_days }}
                     </span>
                   </div>
                   <div class="mx-1 flex flex-column pl-5">
                     <span>From</span>
                     <span class="text-sl lg:text-2xl font-bold green-vibe">
                     {{ $currencyDecimal(Math.ceil(tour.totalPrice)) }}
                     </span>
                     <span class="text-gray-600">
                     Per person/day: <br>
                     {{
                       tour?.tour_length_days
                       ? $currencyDecimal(Math.ceil(tour.totalPrice / tour.tour_length_days / totalTravelers ))
                       : 0
                     }}
                     </span>
                   </div>
                 </div>
                 <div>
                   <div
                       class="flex lg:justify-content-center lg:flex-column justify-content-around lg:text-base text-sm mt-3">
                     <div class="flex my-1">
                       <span>
                         <img src="/filter-icons/tick.svg" />
                       </span>
                       <span class=" mx-2">
                         No booking fees
                       </span>
                     </div>
                     <div class="flex my-1">
                       <span>
                         <img src="/filter-icons/tick.svg" />
                       </span>
                       <span class="mx-2">
                         Guaranteed departure
                       </span>
                     </div>
                     <div class="flex my-1">
                       <span>
                         <img src="/filter-icons/tick.svg" />
                       </span>
                       <span class="mx-2">
                         Best price guaranteed
                       </span>
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
        <Skeleton class="mb-2">
        </Skeleton>
        <Skeleton width="10rem" class="mb-2">
        </Skeleton>
        <Skeleton width="5rem" class="mb-2">
        </Skeleton>
        <Skeleton height="2rem" class="mb-2">
        </Skeleton>
        <Skeleton width="10rem" height="4rem">
        </Skeleton>
      </div>
      <!-- <h4> {{tours.length}} Trips out of {{loadedTours}}</h4> -->
      <Button
        v-if="progress == false && pages > loader+1"
        id="loadButton"
        label="Load more"
        @click="loadMore"
        :style="{
          pointerEvents: pointerEventsEnabled ? 'auto' : 'none',
          backgroundColor: '#82CF45',
          border: 'none'
        }"
      />
    </div>
    <TravelGuide 
      ref="travelGuideRef"
      :travelGuide="travelGuide" 
      :nameActivity="nameActivity"
      @update:travelGuide="travelGuide = $event"
    />

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
import {
  ref,
  onMounted,
  computed,
  onBeforeUnmount
}
  from "vue";
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

const { showMainMessage, currentTip, startTips, stopTips } = useTravelTips();


const profileStore = useProfileStore();
const localProfileVisible = ref(profileStore.profile);
const activeIndex = ref(null); // Default: first tab is closed
const activeBar = ref(null); // Default: first tab is closed
const bookingError = ref(false);
const userId = ref(null);
const travelerId = ref(null);
const windowMobile = ref(false);
const travelGuideRef = ref(null);

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

const destinationBC = ref(null);
const breadCrumbsComputed = computed(() => {

  console.log('DESTINATION SLEECT', destinationBC.value);
  const countryName = destinationBC?.value?.label ? destinationBC?.value?.label : '';
  const countryId = destinationBC?.value?.t_id ? destinationBC?.value?.t_id : 0;

  if (!countryName || !countryId) {
    return [{ 
			label: windowMobile.value ? '' : 'Home',
    	icon: windowMobile.value ? 'pi pi-home' : '', 
			url: `${config.public.FRONTEND_URL}/` }
		];
  }
  return [
    {
      label: windowMobile.value ? '' : 'Home',
    	icon: windowMobile.value ? 'pi pi-home' : '',
      url: `${config.public.FRONTEND_URL}/`
    },
    {
      label: `${countryName} Trips`,
      url: null
    }
  ];
});

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
const cities = ref([]);
const types = ref([]);
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
const travelGuide = ref({});
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

const nameActivity = computed(() => {
  let destino = '';
  destinationsSelected.value.forEach(destination => {
    destino = destination.label;
  });
  return destino;
});
const loadedTours = ref(0);
const wishlistItems = ref([]);
const childrenAges = ref ('');
const userDatesFoundTours = ref(0);
function updateBestsellers(toursList) {
  const combinedTours = [...best_sellers.value, ...toursList];
	console.log('contenido de selecciones:',best_sellers.value);
	console.log('contenido de tour:',toursList);
	console.log('contenido de combinacion:',combinedTours);
  const sortedTours = combinedTours
    .sort((a, b) => b.reviews_count - a.reviews_count || parseFloat(b.ratings_overall || 0) - parseFloat(a.ratings_overall || 0));


  const uniqueTours = [];
  const seenIds = new Set();

  for (const tour of sortedTours) {
    if (!seenIds.has(tour.tour_id)) {
      uniqueTours.push(tour);
      seenIds.add(tour.tour_id);
    }
    if (uniqueTours.length === 3) break;

    best_sellers.value = uniqueTours;
  }


  best_sellers.value = uniqueTours; // Actualizar el arreglo reactivo
}

function markTourAsBestseller(tour) {
  return {
    ...tour,
    isBestseller: best_sellers.value.some((bestseller) => bestseller.tour_id === tour.tour_id),
  };
}

function isBestseller(tourId) {
  return best_sellers.value.some((tour) => tour.tour_id === tourId);
}

watch(selectedSort, async () => {
  total_flag.value = false;
  //console.log("selected sort code", selectedSort.value?.code);
  tours.value = initial.value;
  // await searchTours2();
  console.log("selectedSort.value: ",selectedSort.value);
  tours.value = sortTours();
/* 	tours.value = markBestseller(tours.value); */
  console.log("sortedTours.value",tours.value);
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

// import { GLOBAL_LOCATIONS } from '~/utils/globalLocations';
// import {
//   storeToRefs
// }
//   from 'pinia';
// Define global reactive references

const homeFormStore = useHomeFormStore();
const {
  datesSelected,
  doneClicked,
  applySelected,
  timeSelected,
  priceSelected,
  pricesSelected,
  guidesSelected,
  agesSelected,
  groupSelected,
  ratingsSelected,
  stylesSelected,
  typesSelected,
  citiesSelected,
  citiesFiltered,
  resetSelected
} = storeToRefs(homeFormStore);


watch(resetSelected, (state) => {
  if(state == "true"){
    tours.value = initial.value;
    homeFormStore.changeReset("false");
  }
});

watch(applySelected, (state) => {
  if(state == "true"){
    applyFilters();
  }
});

const applyFilters = () => {
  console.log("applyFilters");
  console.log("doneClicked",doneClicked.value);
  isLoading.value = true;
  let filteredTours = initial.value;

  // Apply Time Filter
  if (timeSelected.value?.length) {
	  console.log("timeSelected",timeSelected.value);
	const NewcombinedTours = [];
    for (const tour of filteredTours) {
      if (Number(tour.tour_length_days) >= Number(timeSelected.value[0]) && Number(tour.tour_length_days) <= Number(timeSelected.value[1])) {NewcombinedTours.push(tour);}
    }
	console.log("NewcombinedTours", NewcombinedTours);
    filteredTours = NewcombinedTours;
  }

  // Apply Price Filter
  if (priceSelected.value?.length) {
	  console.log("priceSelected",priceSelected.value);
	  console.log("priceSelected filteredtours",filteredTours);
      filteredTours = filteredTours.filter(tour => {
      const price = Number(tour.totalPrice);
      if (priceSelected.value[2] === 1) {
        const perDay = price / Number(tour.tour_length_days);
        return perDay >= Number(priceSelected.value[0]) && perDay <= Number(priceSelected.value[1]);
      } else {
        return price >= Number(priceSelected.value[0]) && price <= Number(priceSelected.value[1]);
      }
    });
  }

  // Apply Age Filter
  if (agesSelected.value?.length) {
	  console.log("agesSelected",agesSelected.value);
    filteredTours = filteredTours.filter(tour =>
      Number(tour.min_age) >= Number(agesSelected.value[0]) &&
      Number(tour.max_age) <= Number(agesSelected.value[1])
    );
  }

  // Apply Group Size Filter
  if (groupSelected.value?.length) {
	  console.log("groupSelected",groupSelected.value);
    filteredTours = filteredTours.filter(tour =>
      Number(tour.max_group_size) >= Number(groupSelected.value[0]) &&
      Number(tour.max_group_size) <= Number(groupSelected.value[1])
    );
  }

  // Apply Guides Filter
  if (guidesSelected.value?.length) {
	  console.log("guidesSelected",guidesSelected.value);
    filteredTours = filteredTours.filter(tour =>
      guidesSelected.value.some(typeID => tour.type.some(type => checkTourType(type, typeID)))
    );
  }

  // Apply Ratings Filter
  if (ratingsSelected.value?.length) {
	console.log("ratingsSelected",ratingsSelected.value);
    const NewcombinedTours = [];
    for (const ratingId of ratingsSelected.value) {
      // console.log("ratingId", ratingId);
      for (const tour of filteredTours) {
        const hasTourType = tour.type.find(type => checkTourType(type, ratingId));
        // console.log("hasTourType", hasTourType);
        if (hasTourType) {
          // console.log("tour", tour);
          NewcombinedTours.push(tour);
        }
      }
    }
	filteredTours = NewcombinedTours;
  }

  // Apply Styles Filter
  if (stylesSelected.value?.length) {
	  console.log("stylesSelected",stylesSelected.value);
	  const NewcombinedTours = [];
		for (const styleId of stylesSelected.value) {
		  for (const tour of filteredTours) {
			const hasTourType = tour.type.find(type => checkTourType(type, styleId));
			if (hasTourType) {
			  // console.log("tour", tour);
			  NewcombinedTours.push(tour);
			}
		  }
		}
		filteredTours = NewcombinedTours;
  }

  // Apply City Filter
  if (citiesFiltered.value?.length) {
	  console.log("citiesFiltered",citiesFiltered.value);
    const addedTourIds = new Set();
    const cityFilteredTours = [];
    citiesFiltered.value.forEach(city => {
      filteredTours.forEach(tour => {
        if (tour.cities.some(c => checkTourcities(c, city.id)) && !addedTourIds.has(tour.tour_id)) {
          cityFilteredTours.push(tour);
          addedTourIds.add(tour.tour_id);
        }
      });
    });
    filteredTours = cityFilteredTours;
  }

  console.log("filteredTours", filteredTours);

  // Ensure unique tours
  tours.value = filteredTours.filter((tour, index, self) =>
    index === self.findIndex((t) => t.tour_id === tour.tour_id)
  );

  isLoading.value = false;
  homeFormStore.changeApply("false");
};


function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}



function checkTourType(type, typeID) {
  console.log("typeID", typeID);
  console.log("type", type);
  if (Number(type.tour_type_id) == Number(typeID)) {
    return true;
  }
}

function checkTourcities(cities, cityId) {
  //console.log("cityId", cityId);
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

const constructTourRadarAPI = (page, toursIds, travelers, ranges, childrenAges) => {
  const formattedRanges = formatDateRangeToCommaSeparated(ranges);
  console.log("formattedRanges before filterdepartures",formattedRanges);
  const destinationParams = destinationsSelected.value
      .map(destination => `${destination.type}=${destination.t_id}`)
      .join('&');
  var childrenParam = childrenAges !== '' ? '&childrenAges=' + childrenAges : '';
  const url = `${config.public.BACKEND_URL}/api/filterdepartures?date_range=${formattedRanges}&page=${page}&tourIds=${toursIds}&travelers=${travelers}&user_country=185&currency=USD${childrenParam}`;
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

const constructTourData = (tourIds) => {
  return `${config.public.BACKEND_URL}/api/tours?tour_ids=${tourIds}&${selectedSortBy.value}`;
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

const fetchDeparturePromise = (tourId, dateRange) => {
  const url = `${config.public.BACKEND_URL}/api/departures/?tourId=${tourId}&date_range=${dateRange}`;
  const options = {
    headers: {
      'accept': 'application/json',
    },
  }
  return useFetch(url, options);
}

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

const getFlightsForPossibleDepartures = async (tour) => {
  console.log("getFlightsForPossibleDepartures");
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
      const startFlightResponse = await useFetch(`https://vibeadventures.be/api/duffel-api/offer-requests?origin=${departureSelected.value}&startCity=${firstFlightTo}&endCity=${lastFlightFrom}&departure=${firstDateFrom}&arrival=${lastDateFrom}&adultsCount=${adultsCount.value}&childrenCount=${childrenCount.value}`);

      console.log("startFlightResponse:", startFlightResponse);
      if (startFlightResponse.data.value.offers[0].total_amount) {
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
        //console.log("no flights found");
        startPrice = null;
        departingAtFirstSegment = null;
        arrivingAtLastSegment = null;
        Flight = null;
      }
    } else {
      //console.log("no IATA match");
    }
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle the error gracefully
  }
  //}

  return Flight; // Return startPrice
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

const searchTypeValues = (type, categoryTypes) =>{

  let normalizedSearchType = type.toLowerCase();

  for (const item of categoryTypes){

    if (item.type && item.type.group_name){

      const groupName = item.type.group_name.toLowerCase();
      if (groupName === normalizedSearchType){
        return item.type.tourtype_name;
      }

    }

  }

  return 'N/A';
};

const searchCity = async (code) => {
  let endCityName = null;
  try {
	const destinations = await fetchDestinations();
    endCityName = destinations.find((destination) => {
      return destination.t_id === code;
    });
  } catch (error) {
    console.error('Error in searchCity method:', error);
  }
  console.log("endCityName", endCityName);
  return endCityName.label;
};

const tourradarIterator = async (items) => {
  const dateRange = formattedDates.value;
  const toursArray = items.map(item => item.tourId);
  const tourIds = toursArray.join(',');
  console.log("tourIds",tourIds);
  if(tourIds.length){
    const toursData = await fetchTours(tourIds);
		const updatedTours = toursData.map(markTourAsBestseller);
		console.log('Updated Tours:', updatedTours);
		console.log('Best Sellers:', best_sellers.value);
    getTourTags(toursData);
    if(toursData){
      console.log("tours", toursData);
      const mergedTours = toursData.map(tour => {
        const matchingItems = items.filter(item => item.tourId == tour.tour_id);
        return {
          ...tour,
          departure: matchingItems
        };
      });
      console.log("mergedTours",mergedTours);
      for (const tour of mergedTours) {
        try {
          console.log("merged tour", tour);

          // Assign new properties
          tour.endCityName = await searchCity(tour.end_city);
		  console.log("tour.endCityName",tour.endCityName);	
          tour.startCityName = await searchCity(tour.start_city);
		  console.log("tour.startCityName",tour.startCityName);		
          tour.style = findTourStyle(tour.type);
		  console.log("tour.style",tour.style);		
          tour.physicalRating = await searchTypeValues("physical rating type", tour.type);
		  console.log("tour.physicalRating",tour.physicalRating);		
          tour.adventureStyle = await searchTypeValues("Adventure Styles", tour.type);
		  console.log("tour.adventureStyle",tour.adventureStyle);		
          // Await the asynchronous function call
          const flightData = await getFlightsForPossibleDepartures(tour);

          // Process the flight data
          tour.Flight = flightData;
          console.log("tour.Flight",tour.Flight);
		  let flightprice = Number(tour.Flight.price);
		  let cheapeastAcc = Number(tour.departure[0].cheapestAccommodation.value);
		  let totTrav = Number(totalTravelers.value);
          if (tour.Flight.price > 0) {
			  // this line used to divide the price but now it is multiplied
            tour.totalPrice = 1.15 *(flightprice + (cheapeastAcc * totTrav)) ;
            console.log("tour.totalPrice", tour.totalPrice);
            console.log("numbers", flightprice, cheapeastAcc, totTrav);

            // Add cities and types to their respective arrays
            for (const city of tour.cities) {
              cities.value.push(city);
            }
            for (const type of tour.type) {
              types.value.push(type);
            }

            // Calculate discount if applicable

            if (tour.departure[0].promotion.length) {
							let promo = tour.departure[0].departures.prices.price_base - tour.departure[0].departures.prices.price_promotion;
				 console.log("tour.departure[0].prices.promotion",promo);
                 tour.discount = Math.ceil(Math.abs(promo));
            }else {console.log("tour ",tour.tour_id ,"does not have promotion");}

            // Add the processed tour to the tours array
            tours.value.push(tour);
            console.log("tours.value", tours.value);
          } else {
            console.log("No flights for tour:", tour.tour_id);
          }
        } catch (error) {
          console.error("Error processing tour:", error);
        }
      }
      const code = selectedSort.value?.code;
      switch(code) {
        case '1':
          tours.value = tours.value.sort((a, b) => a.totalPrice - b.totalPrice);
          console.log("sortedTours by totalPrice ASC", tours.value);
          break;
        case '2':
          tours.value = tours.value.sort((a, b) => b.totalPrice - a.totalPrice);
          console.log("sortedTours by totalPrice DESC", tours.value);
          break;
        case '3':
          tours.value = tours.value.sort((a, b) => (a.totalPrice / a.tour_length_days) - (b.totalPrice / b.tour_length_days));
          console.log("sortedTours by price_per_day ASC", tours.value);
          break;
        case '4':
          tours.value = tours.value.sort((a, b) => (b.totalPrice / b.tour_length_days) - (a.totalPrice / a.tour_length_days));
          console.log("sortedTours by price_per_day DESC", tours.value);
          break;
        case '5':
          tours.value = tours.value.sort((a, b) => a.tour_length_days - b.tour_length_days);
          console.log("sortedTours by tour_length_days ASC", tours.value);
          break;
        case '6':
          tours.value = tours.value.sort((a, b) => b.tour_length_days - a.tour_length_days);
          console.log("sortedTours by tour_length_days DESC", tours.value);
          break;
        case '7':
          tours.value = tours.value.sort((a, b) => b.ratings_operator - a.ratings_operator);
          console.log("sortedTours by ratings_operator DESC", tours.value);
          break;
        case '8':
          tours.value = tours.value.sort((a, b) => b.reviews_count - a.reviews_count);
          console.log("sortedTours by reviews_count DESC", tours.value);
          break;
        default:
          tours.value = tours.value.sort((a, b) => a.totalPrice - b.totalPrice);
          console.log("sortedTours", tours.value);
          break;
      }


	  console.log("tours contenido con best seller", initial.value);
	  if (tours.value.length < 5 && Number(pages.value) > Number(loader.value + 1)) {
		  //console.log("tours.value.length",tours.value.length);
		  //console.log("pages.value",pages.value);
		  //console.log("loader.value",loader.value);
		  await loadMore();
		} else {
		  total_flag.value = false;
			console.log("pagination stopped");
		}

      //isLoading.value = false;
	  initial.value = tours.value;
      console.log("initial.value",initial.value);
    }else {console.log("either country or city have tours"); showToast('Try with another destination');}
  }else {console.log("no tour ids");
		await loadMore();
		}
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const findTourStyle = (types) => {
  const idsToMatch = [4, 32, 56, 73, 77, 178, 189, 209, 330, 381, 383];
  const firstMatchingType = types.find(type => idsToMatch.includes(type.type.tourtype_id));
  return firstMatchingType ? firstMatchingType.type.tourtype_name : null;
};

async function fetchToursIds() {
  try {
    // First request with the initial selected destinations
    const url = constructIdsRequest(destinationsSelected.value);
    let { data } = await useFetch(url, {
      headers: {
        'accept': 'application/json',
      },
    });

    console.log("fetchToursIds data", data.value.data);
    // If the data is empty and there is a city in destinationsSelected
    if (data.value.data.total == 0) {
      console.log("cities no results");
      showToast('No tours found for city'); //`${destinationsSelected.value[0].label}`);
      const cityDestination = destinationsSelected.value.find(destination => destination.type === 'city');
      if (cityDestination) {
        console.log("cityDestination", cityDestination);
        const cities = await useFetch(`${config.public.FRONTEND_URL}/expanded-cities.json`);
        // Find the corresponding country ID from the JSON file
        const cityInfo = cities.data.value.find(city => city.TourradarID == cityDestination.t_id);
        if (cityInfo) {
          showToast('Expanding search to country');
          console.log("cityInfo", cityInfo);
          // Update destinationsSelected to country type
          destinationsSelected.value = [{
            t_id: cityInfo.t_country_id,
            label: cityInfo.country_name,
            type: 'country'
          }];
          // Make the second request with the updated destinationsSelected
          const newUrl = await constructIdsRequest(destinationsSelected.value);
          data = await useFetch(newUrl, {
            headers: {
              'accept': 'application/json',
            },
          });
          console.log("Data after second request:",  data.data.value.data);
          return data.data.value.data;
        } else {
          console.log("no cityInfo");
          showToast('Try with another destination');
        }
      } else {
        console.log("no cities");
        showToast('Try with another destination');
      }
    } else {
      return data.value.data;
    }
  } catch (error) {
    console.error('Error fetching data from APIs', error);
  }
}


async function fetchIndividualTour(tourId) {
  try {
    const url = constructIndividualTour(tourId);
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

async function fetchToursData(page, toursIds, travelers, ranges, childrenAges) {
  console.log("fetchToursData ranges",ranges);
  try {
    const url = constructTourRadarAPI(page, toursIds, travelers, ranges, childrenAges);
    console.log('Fetching data from URL:', url);

    const startTime = Date.now();
    const { data, error } = await useFetch(url, {
      headers: {
        'accept': 'application/json',
      },
    });
    const endTime = Date.now();
    console.log(`Fetch duration: ${endTime - startTime}ms`);

    if (error.value) {
      console.error('Error fetching data from API:', error.value);
      return [];
    }

    console.log('Response data value:', data.value.items);
	  	console.log('total de registros encontrados',data.value.items.length)
      loadedTours.value = data.value.items.length;
		if( total_before.value < data.value.items.length){
			total_flag.value=data.value.items.length;
		}else{
			total_flag.value=false;
		}
	const toursData = data.value.items;
	  return toursData;
	  } catch (error) {
		console.error('Error fetching data from APIs:', error);
		return [];
	  }
}

async function fetchTours(tourIds) {
  try {
    const url = constructTourData(tourIds);
    const { data } = await useFetch(url, {
      headers: {
        'accept': 'application/json',
      },
    });
	  const toursList = data.value?.data ?? [];
    for(var tour in toursList){
      console.log('TOURS?',toursList[tour]);
    }
    updateBestsellers(toursList);
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

  if (!departureSelected.value || !destinationsSelected.value) {
    console.error('Please check departureSelected or destinationsSelected');
    isLoading.value = false;
    progress.value = false;
    return;
  }

  const toursIds = await fetchToursIds();

  console.log("toursIds.tour_ids.length", toursIds.tour_ids.length);
  pages.value = toursIds.tour_ids.length / 10;
  console.log("pages.value", pages.value);
  console.log("Initial fetch with formattedDates:", formattedDates.value);

  let fetchedItems = await fetchToursData(loader.value, toursIds.tour_ids, totalTravelers.value, formattedDates.value, childrenAges.value);
  console.log('fetchTOURS data log (initial)', fetchedItems);
  userDatesFoundTours.value = fetchedItems.length;
  
/*	
  if (!fetchedItems || fetchedItems.length === 0) {
    console.log("No tours found for the current date range. Trying expanded dates (previous and next)...");

    const [prevDatesItems, nextDatesItems] = await Promise.all([
      fetchToursData(loader.value, toursIds.tour_ids, totalTravelers.value, formattedPrevDates.value, childrenAges.value),
      fetchToursData(loader.value, toursIds.tour_ids, totalTravelers.value, formattedNextDates.value, childrenAges.value)
    ]);

    console.log('fetchTOURS data log (prevDates)', prevDatesItems);
    console.log('fetchTOURS data log (nextDates)', nextDatesItems);

    let allTours = fetchedItems || [];

    if (prevDatesItems && prevDatesItems.length > 0) {
      allTours = [...allTours, ...prevDatesItems];
    }
    if (nextDatesItems && nextDatesItems.length > 0) {
      allTours = [...allTours, ...nextDatesItems];
    }

    // Update fetchedItems to contain all merged results
    fetchedItems = allTours;
  }
  // --- CHANGES---
*/

  // Update the `tours` reactive variable with the fetched items
  await tourradarIterator(fetchedItems); // Pass the potentially merged items

  const uniqueArray = cities.value.reduce((accumulator, currentValue) => {
    const existingCity = accumulator.find(city => city.city.t_city_id === currentValue.city.t_city_id);
    if (existingCity) {
      existingCity.count++;
    } else {
      accumulator.push({
        ...currentValue,
        count: 1
      });
    }
    return accumulator;
  }, []);
  homeFormStore.changeCities(uniqueArray);

  const typesMap = types.value.reduce((accumulator, currentValue) => {
    const typeId = currentValue.tour_type_id;
    if (accumulator[typeId]) {
      accumulator[typeId].count++;
    } else {
      accumulator[typeId] = {
        ...currentValue,
        count: 1
      };
    }
    return accumulator;
  }, {});

  const typesArray = Object.values(typesMap);
  console.log("typesArray", typesArray);
  homeFormStore.changeTypes(typesArray);

  let maxPrice = -Infinity;
  let minPrice = Infinity;

  // Ensure tours.value is populated before iterating
  if (tours.value && tours.value.length > 0) {
    tours.value.forEach(item => {
      const totalPrice = item.totalPrice;
      if (totalPrice > maxPrice) {
        maxPrice = totalPrice;
      }
      if (totalPrice < minPrice) {
        minPrice = totalPrice;
      }
    });
  } else {
    // Handle case where no tours are found even after expanded search
    console.warn("No tours found even after expanding date ranges.");
    minPrice = 0; // Or some default sensible value
    maxPrice = 0; // Or some default sensible value
  }

  minPrice = Math.floor(minPrice / 200) * 200;
  maxPrice = Math.ceil(maxPrice / 200) * 200;
  const pricesArray = { minPrice, maxPrice };

  console.log("Highest price:", maxPrice);
  console.log("Lowest price:", minPrice);

  homeFormStore.changePrices(pricesArray);

	await getToursDuration(tours.value);
	await getToursMinMaxAge(tours.value);
	await getToursGroupSizes(tours.value);

  filterShow.value = true;
  isLoading.value = false;
  progress.value = false;
};

const getToursDuration = async (tours) => {

  if (!tours || tours.length === 0) return;
  const durations = tours.map(tour => Number(tour.tour_length_days));
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  homeFormStore.updateDurationFilter(minDuration, maxDuration);
	
};

const getToursMinMaxAge = async (tours) => {

	if (!tours || tours.length === 0) return;
	const minAges = tours.map(tour => Number(tour.min_age));
	const maxAges = tours.map(tour => Number(tour.max_age));
	const minAge = Math.min(...minAges);
	const maxAge = Math.max(...maxAges);
	homeFormStore.updateAgeFilter(minAge, maxAge);
	
};
const getToursGroupSizes = async (tours) => {

	if (!tours || tours.length === 0) return;
	const groupSize = tours.map(tour => Number(tour.max_group_size));
	const minGroupSize = Math.min(...groupSize);
	const maxGroupSize = Math.max(...groupSize);
	homeFormStore.changeGroup(minGroupSize, maxGroupSize);
	
};

const searchTours = async () => {
  isLoading.value = true;
  progress.value = true;
  filterShow.value = false;;
  pointerEventsEnabled.value = false;
	if (!departureSelected.value || !destinationsSelected.value) {
	  console.error('Please check departureSelected or destinationsSelected');
	  // Reset loading flags before returning
	  isLoading.value = false;
	  progress.value = false;
	  return;
	}
  const toursIds = await fetchToursIds();

  console.log("toursIds.tour_ids.length", toursIds.tour_ids.length);
  pages.value = toursIds.tour_ids.length / 10;
  console.log("pages.value", pages.value);
  console.log("loder", loader.value); // Use toursValue computed property
  console.log("formattedDates.value before fetchToursData",formattedDates.value)
  const items = await fetchToursData(loader.value, toursIds.tour_ids, totalTravelers.value, formattedDates.value, childrenAges.value);
  console.log('fetchTOURS data log', items);
  await tourradarIterator(items);

  const uniqueArray = cities.value.reduce((accumulator, currentValue) => {
        const existingCity = accumulator.find(city => city.city.t_city_id === currentValue.city.t_city_id);
        if (existingCity) {
          existingCity.count++;
        } else {
          accumulator.push({
            ...currentValue,
            count: 1
          });
        }
        return accumulator;
      },
      []);
  // // console.log("uniqueArray", uniqueArray);
  homeFormStore.changeCities(uniqueArray);

  const typesMap = types.value.reduce((accumulator, currentValue) => {
        // console.log("currentValue", currentValue);
        const typeId = currentValue.tour_type_id;
        // console.log("typeId", typeId);
        if (accumulator[typeId]) {
          accumulator[typeId].count++;
        } else {
          accumulator[typeId] = {
            ...currentValue,
            count: 1
          };
        }
        return accumulator;
        // console.log("accumulator", accumulator);
      },
      {});

  // Convert the object map back to an array
  const typesArray = Object.values(typesMap);
  console.log("typesArray", typesArray);
  homeFormStore.changeTypes(typesArray);

  // Initialize variables to hold the maximum and minimum prices
  let maxPrice = -Infinity;
  let minPrice = Infinity;

  // Iterate through the array
  tours.value.forEach(item => {
    const totalPrice = item.totalPrice;
    // Update maxPrice if the current price is greater
    if (totalPrice > maxPrice) {
      maxPrice = totalPrice;
    }
    // Update minPrice if the current price is smaller
    if (totalPrice < minPrice) {
      minPrice = totalPrice;
    }
  });
  // Round minPrice down to the nearest multiple of 200
  minPrice = Math.floor(minPrice / 200) * 200;

  // Round maxPrice up to the nearest multiple of 200
  maxPrice = Math.ceil(maxPrice / 200) * 200;
  // Create pricesArray object
  const pricesArray = { minPrice, maxPrice };

  // Output the results
  console.log("Highest price:", maxPrice);
  console.log("Lowest price:", minPrice);

  // Pass pricesArray to homeFormStore.changeTypes()
  homeFormStore.changePrices(pricesArray);

  filterShow.value = true;
  // document.getElementById("filters").style = "display:block";
  // document.getElementById("skeleton").style = "display:none";
  // document.getElementById("loadButton").style = "opacity:1";
  // pointerEventsEnabled.value = true;
  isLoading.value = false;
  progress.value = false;
};

const loadMore = async () => {
  loader.value += 1;
  console.log("loader.value", loader.value);
  //document.getElementById("filters").style = "display:none";
  isLoading.value = true;
  progress.value = true;
  //await searchTours2();
}

const getNextPageUrl = (tourradarData) => {
  return tourradarData.next_page_url ?? null;
};

dayjs.extend(customParseFormat);

const formatDates = (dates) => {
  console.log("dates", dates);

  // Now dayjs will use the provided format correctly
  const startDate = dayjs(dates[0], "DD/MM/YYYY");
  const endDate = dayjs(dates[1], "DD/MM/YYYY");

  // Check if dates are valid
  if (!startDate.isValid() || !endDate.isValid()) {
    console.error("Invalid date format detected. Please use DD/MM/YYYY.");
  }

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  const formattedStartDate = startDate.add(1, 'day').format("YYYY/MM/DD");
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

const formatDestinations = (t_id, type) => {
  return [{
    t_id: parseInt(t_id),
    type: type || 'unknown'
  }]
}

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
    const lastDayNextMonth = dayjs().add(3, 'month').endOf('month').format('DD/MM/YYYY');
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

function getShouldGetTours(params, name) {
  if (!params.get(name)) {
    return true
  }
  return params.get(name) == "true"
}

const title = ref();

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
  await searchTours2();
};

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
  nextTick(() => {
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
    const category = params.get('type');
    const value_id = params.get('t_id');
    if (search == "true" && type != "tour_type") {
      const codes = getDestinationsSelected(params);
      searchDestinations(codes);
    } else {
      console.log("adventure style");
    }
    if (type == "tour_type") {
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
      searchTours2();
    }
    userId.value = localStorage.getItem('user_id');
    if (travelGuideRef.value) {
      travelGuideRef.value.searchTravelGuide(category, value_id);
    }
   	checkUser();
  });
});


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
  const departure_range = formattedDates.value;
  const options = { day: '2-digit', month: 'long', year: 'numeric' };

  const formattedRange = formatDatesv2(dateSelected.value);
  const route = {
    path: "/tour",
    query: {
      tourId: tour.tour_id,
      departure_range: departure_range,
      departure_fly_from: departureSelected.value,
      departure_fly_to: tour.start_city,
      adultsCount: adultsCount.value,
      childrenCount: childrenCount.value,
      infantsCount: infantsCount.value,
      //dateSelected: dateSelected.value,
      dateRange: formattedRange,
      totalTravelers: totalTravelers.value,
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
<style>
h1 {
  font-family: "Canaro", sans-serif;
  font-size: 3rem;
}

* {
  font-family:
      "Canaro";
}
hr{
  color: gray;
  border-width: 0.1px;
}

.interstate {
  font-family: "Interstate";
}

.green-vibe {
  color:
      #82cf45;
}

.orange-vibe {
  background-color: #FF6C0E;
}

div.col-6.flex.align-items-center {
  padding: 4px;
}
@media only screen and (max-width:767px) {#main-grid{margin: 0px 0px 20px 0px;padding: 0 2%;}}

@media only screen and (min-width:768px) and (max-width:1199px) {#main-grid{margin: 0px 0px 20px 0px;padding: 0 5%;}}

@media only screen and (min-width:1200px) {#main-grid{margin: 0px 0px 20px 0px;padding: 0 5%;}}
</style>

<style scoped>
:deep(.p-tabmenu-nav){
  justify-content: center;
}
:deep(span.p-menuitem-text){
  font-weight: 500;
}
:deep(.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link){
  color: #82cf45;
  border-color: #82cf45;
}
.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits text to 2 lines */
  line-clamp: 2; /* Standard property for compatibility */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* This adds the ellipsis if text overflows, but might not work perfectly with line-clamp in all browsers for dynamic truncation */
}

/* You might need this to initially hide the read more trigger until JS shows it */
.read-more-trigger {
  height: 0;
  overflow: hidden;
}

/* This class would be added by JavaScript if the text is truncated */
.read-more-trigger.show {
  visibility: visible;
  height: auto; /* Or whatever height you need for the trigger */
  overflow: visible;
}

.pi{
  font-size: 1.5rem;
  cursor: pointer;
}
.pi.pi-heart{
  color: #82cf45;
}
.pi-heart-fill{
  color:#EF4444;
}
.badge-bs{
  background-color: rgba(130, 207, 69, 0.2);
}

.badge-gv{
  background-color: rgba(255, 108, 14, 0.2);
}
</style>
