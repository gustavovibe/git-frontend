<template>
    <div class="overflow-hidden mb-8 main-spacing" style="max-width:1240px; padding-left: 0px; padding-right: 0px;">
        <div class="grid">
            <div class="col-12 lg:col-9">
                <div class="card">
                    <Breadcrumb :model="items">
                        <template #item="{ item, props }">
                            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                <a :href="href" v-bind="props.action" @click="navigate">
                                    <span :class="[item.icon, 'text-color']" />
                                    <span class="text-green-vibe font-semibold">{{ item.label }}</span>
                                </a>
                            </router-link>
                            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                                <span class="text-color font-semibold">{{ item.label }}</span>
                            </a>
                        </template>
                    </Breadcrumb>
                </div>
                <h2 class="canaro-font font-semibold ml-3">Next <span class="text-green-vibe font-italic">Trips</span></h2>
                <div v-if="nextTrips.length > 0" class="trip-cards flex" style="margin-bottom: 2rem;">
                    <div class="card border-round shadow-3" v-for="(trip, index) in nextTrips" :key="index" style="margin-bottom: 15px">
                        <a class="container relative no-underline text-900" :href="`/my-trips/order?order_id=${trip.booking_id}&user_id=${userId}`" style="color:black!important">
                            <div class="gradient"></div>
                            <div class="tour-img border-round-top" :style="{ backgroundImage: 'url(' + trip.main_image + ')' }">
                                <div class="p-2 absolute" style="margin-top: 5px;"><span class="bg-gray-100 border-round-2xl mt-1 py-2 px-3 text-green-vibe font-semibold"
                                  style="font-size: smaller;"
                                :class="{ 'text-red-600': trip.booking_status === 'cancelled', 'text-orange-500': trip.booking_status === 'pending', 'text-green-vibe': trip.booking_status === 'confirmed' }"
                                  >{{ capitalizar(trip.booking_status) }}</span></div>
                                <!-- <div class="absolute destination text-white font-bold text-2xl">{{ trip.country }}</div> -->
                            </div>
                            <div class="mx-3 canaro-font p-2">
                                <!-- <div class="absolute people-number font-medium bg-gray-100 border-round-2xl px-2" style="top:7.5rem;"><img class="h-1rem mr-2" src="public/icons/group.svg" alt="">2</div> -->
                                <div class="mb-2 mt-3 font-semibold">{{ trip.country ? trip.country+": " : "" }}{{ trip.tour_name }}</div>
                                <div class="my-2 interstate-font font-light">
                                  <!-- <img class="h-1rem ml-1 mr-2" src="public/icons/green-calendar.svg"> -->
                                  <i class="pi pi-calendar mr-2" style="color: #82cf35"></i>
                                  <span class="">{{ trip.start_tour }}</span>
                                  -
                                  <span class="">{{ trip.end_tour }}</span>
                                </div>
                                <div class="my-2 interstate-font font-light">
                                  <i class="pi pi-send mr-2" style="color: #82cf35"></i>
                                  <span>{{ trip.origin_iata }}</span>
                                  -
                                  <span>{{ trip.destination_iata }}</span>
                                  (<span class="text-orange-500">{{ trip.departure }}</span>)
                                  <i class="pi pi-arrow-right-arrow-left mx-2" style="color: #82cf35"></i>
                                  <span>{{ trip.return_origin_iata }}</span>
                                  -
                                  <span>{{ trip.return_destination_iata }}</span>
                                  <!-- (<span class="text-orange-500">{{ trip.arrival }}</span>) -->
                                </div>
                                <div class="my-2 interstate-font font-light" v-if="trip.travelers">
                                  <i class="pi pi-user mr-2" style="color: #82cf35"></i>
                                  <span class="">{{ trip.travelers }} adults</span>
                                </div>
                                <div class="mt-3 mb-2 font-medium text-right">Order # <span>{{ trip.booking_id }}</span></div>
                            </div>
                        </a>
                    </div>
                </div>
              <div v-else-if="nextTrips.length == 0 && !nextLoading" class="interstate-font font-light text-2xl text-center text-gray-600 ml-3 mb-4">
                You don't have any trips yet.
              </div>
              <div class="flex justify-content-center">
                <Button v-if="canMoreNext" :disabled="nextLoading" id="nextButton" label="Load more" @click="loadNext"/>
              </div>
							<div v-if="nextLoading">
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

                <div class="services pb-3" style="background-color: #f3faed">
                    <h2 class="canaro-font font-semibold ml-3 pt-4">Additional <span class="text-green-vibe font-italic">Services</span></h2>
                    <div>
                        <p class="interstate-font font-light text-gray-700 ml-3 text-lg">
                          Adding this services to your trip now can save you money compared to purchasing them later
                          or in the destination
                        </p>
                        <div class="flex service-cards my-4 mx-3">
                          <div class="service-card bg-white surface-border border-1 border-round shadow-3">
                            <img class="h-6rem flex mx-auto my-3" src="/public/icons/transfer.svg" alt="" />
                            <p class="canaro-font text-lg font-semibold text-center mb-0">Airport transfer</p>
                            <p class="interstate-font text-sm text-gray-700 text-center mb-2 mt-1" style="padding: 0 1.5rem">
                              Airport transfers not included in adventure?
                            </p>
                            <div class="flex justify-content-center flex-wrap">
                              <a class="interstate-font back-orange-vibe border-transparent border-round text-white mx-auto text-base"
                                style="padding: 0.7rem 2rem; text-decoration: none;" href="https://www.welcomepickups.com/mexico-city/airport-transfer-book/?tap_a=134179-01b992&tap_s=4069286-0e3fe9" target="_blank">
                                Get transfers
                                <i class="pi pi-external-link pl-1" style="color: #fff;font-size:0.8rem;"></i>
                              </a>
                            </div>
                          </div>
                          <div class="service-card bg-white surface-border border-1 border-round shadow-3">
                            <img class="h-6rem flex mx-auto my-3" src="/public/icons/insurance.svg" alt="" />
                            <p class="canaro-font text-lg font-semibold text-center mb-0">Insurance</p>
                            <p class="interstate-font text-sm text-gray-700 text-center mb-2 mt-1" style="padding: 0 2rem">
                              Available up to 24h before departure
                            </p>
                            <div class="flex justify-content-center flex-wrap">
                              <a class="interstate-font back-orange-vibe text-white mx-auto border-round border-transparent text-base"
                                style="padding: 0.7rem 1rem; text-decoration: none;" href="https://visitorscoverage.com/?affid=ffe108ac09ad6&sub_id=b8f7c599386143409bc43f56a-436729" target="_blank">
                                Manage Insurance
                                <i class="pi pi-external-link pl-1" style="color: #fff;font-size:0.8rem;"></i>
                              </a>
                            </div>
                          </div>
                          <div class="service-card bg-white surface-border border-1 border-round shadow-3">
                            <img class="h-6rem flex mx-auto my-3" src="/public/icons/hotel.svg" alt="" />
                            <p class="canaro-font text-lg font-semibold text-center mb-0">Accommodation</p>
                            <p class="interstate-font text-sm text-gray-700 text-center mb-2 mt-1" style="padding: 0 2rem">
                              Need pre- or post-tour accommodation?
                            </p>
                            <div class="flex justify-content-center flex-wrap">
                              <a class="interstate-font back-orange-vibe text-white mx-auto border-round border-transparent text-base"
                                style="padding: 0.7rem 1rem; text-decoration: none;" href="https://trip.tp.st/CGLH4d7u" target="_blank">
                                Book Accommodation
                                <i class="pi pi-external-link pl-1" style="color: #fff;font-size:0.8rem;"></i>
                              </a>
                            </div>
                          </div>
                          <div class="service-card bg-white surface-border border-1 border-round shadow-3">
                            <img class="h-6rem flex mx-auto my-3" src="/public/icons/activities.svg" alt="" />
                            <p class="canaro-font text-lg font-semibold text-center mb-0">Activities</p>
                            <p class="interstate-font text-sm text-gray-700 text-center mb-2 mt-1">
                              Got extra days in the destination before or after the adventure?
                            </p>
                            <div class="flex justify-content-center flex-wrap">
                              <a class="interstate-font back-orange-vibe text-white mx-auto border-round border-transparent text-base"
                                style="padding: 0.7rem 1rem; text-decoration: none;" href="https://www.viator.com/?pid=P00154312&uid=U00262192&mcid=58086&currency=EUR" target="_blank">
                                Find Activities
                                <i class="pi pi-external-link pl-1" style="color: #fff;font-size:0.8rem;"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                </div>
                <h2 class="canaro-font font-semibold ml-3">Past <span class="text-green-vibe font-italic">Trips</span></h2>

				<div v-if="pastTrips !== null" class="trip-cards flex" style="margin-bottom: 2rem;">
                    <div class="card border-round shadow-3" v-for="(trip, index) in pastTrips" :key="index">
                        <div class="container relative">
                            <div class="tour-img border-round-top past-trip" :style="{ backgroundImage: 'url(' + trip.main_image + ')' }">
                                <div class="p-2 absolute" style="margin-top: 5px;"><span class="bg-gray-100 border-round-2xl mt-1 py-2 px-3 text-green-vibe font-semibold"
                                  style="font-size: smaller;"
                                :class="{ 'text-red-600': trip.booking_status === 'cancelled', 'text-orange-500': trip.booking_status === 'pending', 'text-green-vibe': trip.booking_status === 'confirmed' }"
                                  >{{ capitalizar(trip.booking_status) }}</span></div>
                                <div class="absolute destination text-white font-bold text-2xl">{{ trip.country }}</div>
                            </div>
                            
                            <div class="mx-3 canaro-font p-2">
                                <!-- <div class="absolute people-number font-medium bg-gray-100 border-round-2xl px-2" style="top:7.5rem;"><img class="h-1rem mr-2" src="public/icons/group.svg" alt="">2</div> -->
                                <div class="mb-2 mt-3 font-semibold">{{ trip.country ? trip.country+": " : "" }}{{ trip.tour_name }}</div>
                                <div class="my-2 interstate-font font-light">
                                  <!-- <img class="h-1rem ml-1 mr-2" src="public/icons/green-calendar.svg"> -->
                                  <i class="pi pi-calendar mr-2" style="color: #82cf35"></i>
                                  <span class="">{{ trip.start_tour }}</span>
                                  -
                                  <span class="">{{ trip.end_tour }}</span>
                                </div>
                                <div class="my-2 interstate-font font-light">
                                  <i class="pi pi-send mr-2" style="color: #82cf35"></i>
                                  <span>{{ trip.origin_iata }}</span>
                                  -
                                  <span>{{ trip.destination_iata }}</span>
                                  (<span class="text-orange-500">{{ trip.departure }}</span>)
                                  <i class="pi pi-arrow-right-arrow-left mx-2" style="color: #82cf35"></i>
                                  <span>{{ trip.return_origin_iata }}</span>
                                  -
                                  <span>{{ trip.return_destination_iata }}</span>
                                  <!-- (<span class="text-orange-500">{{ trip.arrival }}</span>) -->
                                </div>
                                <div class="my-2 interstate-font font-light" v-if="trip.travelers">
                                  <i class="pi pi-user mr-2" style="color: #82cf35"></i>
                                  <span class="">{{ trip.travelers }} adults</span>
                                </div>
                                <div class="mt-3 mb-2 font-medium text-right">Order # <span>{{ trip.booking_id }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="flex justify-content-center">
          <Button v-if="canMorePast" :disabled="pastLoading" id="pastButton" label="Load more" @click="loadPast" :style="{ pointerEvents: pointerPastEnabled ? 'auto' : 'none' }" />
        </div>
				<div v-if="pastLoading">
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
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Breadcrumb from 'primevue/breadcrumb';
import Skeleton from 'primevue/skeleton';
import Button from 'primevue/button';

const router = useRouter();
const config = useRuntimeConfig();
/* const url =ref('http://127.0.0.1:8000'); */
const url =ref(config.public.BACKEND_URL);
const userId = ref();
const pastTrips = ref([]);
const nextTrips = ref([]);
const nextLoader = ref(1);
const pastLoader = ref(1);
const nextLoading = ref(false);
const pastLoading = ref(false);
const canMoreNext = ref(false);
const canMorePast = ref(false);
const windowMobile = ref(false);
const checkMobile = () => {
  windowMobile.value = window.innerWidth <= 768;
};
const items = ref([
    { 
			label: windowMobile.value ? '' : 'Home',
    	icon: windowMobile.value ? 'pi pi-home' : '',
			route: '/' 
		},
    { label: 'Account' },
    { label: 'My Trips', route: '/my-trips' }
]);
const pointerEventsEnabled = ref(false);
const pointerPastEnabled = ref(false);
const loadNext = async () => {
  nextLoader.value += 1;
  // console.log("nextLoader.value", nextLoader.value);
  searchTrips();
};

const loadPast = async () => {
  pastLoader.value += 1;
  // console.log("pastLoader.value", pastLoader.value);
  searchPast();
};

const capitalizar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fetchTour(tourId) {
	console.log('contenido de url',url.value);
  const { data, error } = await useFetch(`${url.value}/api/tour/${tourId}`);
  if (error?.value) {
    console.info('Error fetching tour: ', error?.value?.message);
  }
  return data?.value?.data.images[0] ?? null;
}

async function searchCity(code) {
  let CityName = null;
  try {
    const response = await useFetch(`${config.public.FRONTEND_URL}/start-end.json`);
    const destinations = response.data.value;
    CityName = destinations.find(destination => destination.t_city == code);
  } catch (error) {
    console.error('Error in searchCity method:', error);
  }
  return CityName?.city || null;
}

async function searchIata(code) {
  let CityName = null;
  try {
    const response = await useFetch(`${config.public.FRONTEND_URL}/start-end.json`);
    const destinations = response.data.value;
    CityName = destinations.find(destination => destination.code == code);
  } catch (error) {
    console.error('Error in searchCity method:', error);
  }
  return CityName?.city || null;
}

async function searchPast() {
  pastLoading.value = true;
  // document.getElementById("pastButton").style = "opacity:0.5";
  pointerPastEnabled.value = false;
  try {
    const data = await useFetch(`${url.value}/api/orders?user_id=${userId.value}&after_page=${pastLoader.value}`);
     console.log("tripsData", data.data.value);
    const tripsData = data.data.value;
	if(tripsData.before_today.data != ""){
		const beforeTrips = tripsData.before_today.data.map(item => ({
      booking_status: item.booking_status,
      departure: formatDate(item.flights[0][0].segments[0].departing_at.split("T")[0]),
      arrival: formatDate(item.flights[0][1].segments[0].arriving_at.split("T")[0]),
      start_tour: formatDate(item.start),
      end_tour: formatDate(item.end),
      origin_iata: item.origin,
      destination_iata: item.f_destination,
      return_destination_iata: item.f_return,
      return_origin_iata: item.flights[0][1].origin.iata_code,
      start_city: item.start_city,
      booking_id: item.booking_id,
      tour_name: item.tour_name,
      tour_id: item.tour_id,
      main_image: null,
      origin: null,
      destination: null,
      country: null,
      travelers: item.travelers_number
		}));
    canMorePast.value = tripsData.before_today.current_page < tripsData.before_today.last_page;

		const oldTrips = await Promise.all(
		  beforeTrips.map(async trip => {
			const main_image = await fetchTour(trip.tour_id);
			const destination = await searchCity(trip.start_city);
			const origin = await searchIata(trip.origin_iata);
			return { ...trip, main_image, origin, destination };
		  })
		);
		pastTrips.value.push(...oldTrips);
	} else {
    // document.getElementById("pastButton").style = "display:none";
  }
	pastLoading.value = false;
	if(tripsData.before_today.next_page_url == null){
		//console.log("notrips");
		// document.getElementById("pastButton").style = "display:none";
	}else {
		// document.getElementById("pastButton").style = "opacity:1";
	    pointerPastEnabled.value = true;
	}
  } catch (error) {
    console.error('Error fetching trips:', error);
  }
}



const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // mes inicia en 0
};

function formatDate(dateString) {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

async function searchTrips() {
  nextLoading.value = true;
  // document.getElementById("nextButton").style = "opacity:0.5";
  pointerEventsEnabled.value = false;
  try {
    const data = await useFetch(`${url.value}/api/orders?user_id=${userId.value}&after_page=${nextLoader.value}`);
     //console.log("tripsData", data.data.value);
    const tripsData = data.data.value;
	   //console.log("tripsData.after_today.next_page_url",tripsData.after_today.next_page_url);
	if(tripsData.after_today.next_page_url == null){//console.log("notrips");
		//document.getElementById("nextButton").style = "display:none";
  }
	if(tripsData.after_today.data != ""){
		const afterTrips = tripsData.after_today.data.map(item => {
      console.log("item", item);
      return {
        booking_status: item.booking_status,
        departure: formatDate(item.flights[0][0].segments[0].departing_at.split("T")[0]),
        arrival: formatDate(item.flights[0][1].segments[0].arriving_at.split("T")[0]),
        start_tour: formatDate(item.start),
        end_tour: formatDate(item.end),
        origin_iata: item.origin,
        destination_iata: item.f_destination,
        return_destination_iata: item.f_return,
        return_origin_iata: item.flights[0][1].origin.iata_code,
        start_city: item.start_city,
        booking_id: item.booking_id,
        tour_name: item.tour_name,
        tour_id: item.tour_id,
        main_image: null,
        origin: null,
        destination: null,
        country: null,
        travelers: item.travelers_number
      };
    });

    canMoreNext.value = tripsData.after_today.current_page < tripsData.after_today.last_page;

		const newTrips = await Promise.all(
		  afterTrips.map(async trip => {
			const main_image = await fetchTour(trip.tour_id);
			const destination = await searchCity(trip.start_city);
			const origin = await searchIata(trip.origin_iata);
			return { ...trip, main_image, origin, destination };
		  })
		);
		nextTrips.value.push(...newTrips);
	}else {
    // document.getElementById("pastButton").style = "display:none";
  }
	nextLoading.value = false;
	if(tripsData.after_today.next_page_url == null){
		//console.log("notrips");
		// document.getElementById("nextButton").style = "display:none";
	}else {
		// document.getElementById("nextButton").style = "opacity:1";
	    pointerEventsEnabled.value = true;
	}

  } catch (error) {
    console.error('Error fetching trips:', error);
  }
}


definePageMeta({
  middleware: 'auth',
});

onMounted(() => {
	checkMobile();
  window.addEventListener('resize', checkMobile);
  nextTick(async () => {
    const params = new URLSearchParams(window.location.search);
    userId.value = localStorage.getItem('user_id');
    nextLoader.value = 1;
	pastLoader.value = 1;
    if (userId.value) {
      console.log("userId", userId.value);
      await searchTrips();
	  await searchPast();
    }
  });
});
</script>

<style scoped>
    :deep(li#pv_id_8_0){
        background-color: #82cf45;
    }
    :deep(li#pv_id_8_0 span){
        color: #fff;
    }
    .p-breadcrumb{
        padding: unset;
        border: none;
    }
    :deep(svg.p-icon){
        color: black!important;
    }
    :deep(.p-menuitem-link .text-color){
        color: black !important;;
    }
    .tour-img{
        height: 10rem;
        background-position: center;
        background-size: cover;
    }
    .trip-cards{
        flex-direction: row;
        flex-wrap: wrap;
    }
    .card {
        width: 100%;
        margin: 10px;
    }
    .gradient{
        height: 10rem;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        background-image: linear-gradient(to top, black 0%, transparent 18rem);
        opacity: 0.3;
        border-radius: 10px;
    }
    .people-number{
        right: 1rem;
    }
    .destination{
        top: 5rem;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .service-cards{
        flex-direction: row;
        flex-wrap: wrap;
    }
    .service-card{
        width: 100%;
        margin-bottom: 10px;
        padding-bottom: 1.3rem;
    }
    .past-trip{
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
    @media only screen and (max-width:767px){
        .main-spacing{
            padding: 0.5rem 2rem;
        }

    }
    @media only screen and (min-width: 768px) and (max-width: 1199px){
        .main-spacing{
            padding: 0.5rem 2rem;
        }
        .card {
            width: calc((100% / 2) - 20px);
            margin: 10px;
        }
        .service-card{
            width: calc((100% / 2) - 20px);
            margin: 10px;
        }
    }
    @media only screen and (min-width:1200px){
        .main-spacing{
            padding: 2rem 7rem;
        }
        .card {
            width: calc((100% / 3) - 20px);
            margin: 0 10px;
        }
        .service-card{
            width: calc((100% / 4) - 20px);
            margin: 0 10px;
        }
    }
</style>
