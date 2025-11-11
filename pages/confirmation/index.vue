<template>
  <Toast/>
  <div class="overflow-hidden" style="background-color: #fff;" id="breadcrumb-container">
    <div class="my-5 grid col-12 justify-content-center">
      <div class="grid col-9">
        <CustomStepper :activeStep="2" :goTourPage="goTourPage"/>
      </div>
    </div>
  </div>

  <div v-if="orderId" class="grid container-page">
    <div class="col-8" >
      <div class="text-green-vibe border-1 border-round-sm py-2 px-2"
           style="border-color: #82cf45; background-color: #f3faed; max-width: fit-content"
           v-if="orderStatus === 'completed'">
        Your trip has been booked successfully! Your confirmation number is #{{ orderId }}.
      </div>
      <div class="text-green-vibe border-1 border-round-sm py-2 px-2"
           style="border-color: #82cf45; background-color: #f3faed; max-width: fit-content"
           v-if="orderStatus === 'pending'">
        Your trip booking is being processed. Your booking number is #{{ orderId }}.
      </div>
      <div class="text-green-vibe border-1 border-round-sm py-2 px-2"
           style="border-color: #82cf45; background-color: #f3faed; max-width: fit-content"
           v-if="orderStatus === 'cancelled'">
        Your trip was not booked.
      </div>
      <h2 class="text-2xl font-semibold my-4">
        Bon voyage, <span class="text-green-vibe">{{lead}}!</span>
      </h2>
      <div class="font-semibold text-gray-700">Confirmation number: <span v-if="orderId">#{{orderId}}</span></div>
      <p class="my-3">
        Thank you for booking your travel with Vibe Adventures! Below is a summary of your trip.
        We've sent a copy of your booking confirmation to your
        <span class="font-semibold">email address</span> as well.
      </p>
      <p class="font-semibold">You can also find this page again in.</p>
      <h2 class="text-3xl font-semibold my-4 flex align-items-center" style="border-radius: 10px">
        <span class="green-dot-sm mr-2"></span>Flights summary
      </h2>

      <div class="my-4"
           :style="!isDuffelOrderSelectedLoading ? { border: 'solid #82CF45 1px', borderRadius: '5px' } : {}">
        <template v-if="isDuffelOrderSelectedLoading">
          <Skeleton height="15rem" class="mb-3"></Skeleton>
        </template>
        <template v-else>
          <FlightOrder :duffelOrderSelected="duffelOrderSelected"/>
        </template>
      </div>


      <h2 class="text-3xl font-semibold my-4 flex align-items-center">
        <span class="green-dot-sm mr-2"></span>Adventure summary
      </h2>

      <template v-if="tour && duffelOfferSelected && !isPageLoading">
        <div class="border-1 border-round-sm py-2 px-2 grid" style="border-color: #82cf45">
          <div class="col-12 lg:col-4">
            <div id="" class="bg-cover bg-center h-13rem border-round-2xl">
              <Carousel :showIndicators="false" v-if="tour.images" :value="tour.images"
                        :numVisible="1" :numScroll="1" circular>
                <template #item="slotProps">
                  <div class="bg-cover bg-center h-10rem border-round-2xl"
                       :style="{ 'background-image': `url(${slotProps?.data})` }"></div>
                </template>
              </Carousel>
            </div>
          </div>
          <div class="col-12 lg:col-6">
            <h1 class="text-lg font-semibold my-2">{{ tour?.tourName }}</h1>
            <div class="flex justify-content-center lg:justify-content-start font-light">
              <span><img class="h-1rem" src="~/assets/icons/star-symbol-icon.svg"/></span>
              <span><img class="h-1rem" src="~/assets/icons/star-symbol-icon.svg"/></span>
              <span><img class="h-1rem" src="~/assets/icons/star-symbol-icon.svg"/></span>
              <span><img class="h-1rem" src="~/assets/icons/star-symbol-icon.svg"/></span>
              <span><img class="h-1rem" src="~/assets/icons/star-symbol-icon.svg"/></span>
              <span class="text-sm lg:text-sm mx-2">{{tour?.ratings}}</span>
              <span class="text-sm lg:text-sm">({{tour?.reviews_count}} reviews)</span>
            </div>
            <div class="grid">
              <div class="col-6">
                <img class="h-1rem mr-2 ml-1" src="~/assets/icons/plane-leaving.svg" alt="airplane icon"/>
                Flying from {{ duffelOfferSelected.slices[0].segments[0].origin.city_name }}
                ({{ duffelOfferSelected.slices[0].segments[0].origin.iata_code }})
              </div>
              <div class="col-6">
                <img class="h-1rem mr-2 ml-1" src="~/assets/icons/plane-landing-icon.svg" alt="airplane icon"/>
                Flying back to {{ duffelOfferSelected.slices.at(-1).segments.at(-1).destination.city_name }}
                ({{ duffelOfferSelected.slices.at(-1).segments.at(-1).destination.iata_code }})
              </div>
              <div class="col-12">
                <img class="h-1rem mr-2 ml-1" src="~/assets/icons/calendar-blank-icon.svg" alt=""/>
                <span class="font-semibold">From: </span>
                <span>{{ order.departure }} </span>
                <span class="font-semibold mx-2">To: </span>
                <span>{{ order.end }} </span>
              </div>
              <div class="col-8">
                <img class="h-1rem mr-1" src="~/assets/icons/couple-icon.svg" alt=""/>
                <span class="mx-2"><span class="text-green-vibe">{{ passengers }}</span> travelers</span>
              </div>
              <div class="col-4 lg:col-2 flex align-content-end flex-wrap">
                <button class="font-interstate back-orange-vibe text-white mx-auto border-round"
                        style="padding: 0.7rem 3rem" @click="test(order.tour_id)">
                  View Adventure
                </button>
              </div>
            </div>
          </div>

        </div>

      </template>
      <template v-else>
        <Skeleton height="40rem"></Skeleton>
      </template>

      <div class="my-5" style="background-color: #f3faed">
        <p class="text-2xl font-medium text-center pt-5">Recommended</p>
        <p class="font-interstate text-gray-700 text-center my-4">
          Adding this services to your trip now can save you money compared to purchasing them later
          or in the destination
        </p>
        <div class="grid my-4 mx-8">
          <div class="col-12 lg:col-3 bg-white surface-border border-1 border-round-sm shadow-3">
            <img class="h-6rem flex mx-auto my-3" src="~/assets/icons/transfer.svg" alt=""/>
            <p class="font-semibold text-center">Airport transfer</p>
            <p class="font-interstate text-sm text-gray-700 text-center my-2" style="padding: 0 1.5rem">
              Airport transfers not included in adventure?
            </p>
            <div class="flex justify-content-center flex-wrap">
              <a class="font-interstate back-orange-vibe text-white mx-auto border-round text-base"
                 style="padding: 0.7rem 2rem">
                Get transfers
                <img class="h-1rem ml-2" src="~/assets/icons/export-share-icon.svg" alt=""/>
              </a>
            </div>
          </div>
          <div class="col-12 lg:col-3 bg-white surface-border border-1 border-round-sm shadow-3">
            <img class="h-6rem flex mx-auto my-3" src="~/assets/icons/insurance.svg" alt=""/>
            <p class="font-semibold text-center">Insurance</p>
            <p class="font-interstate text-sm text-gray-700 text-center my-2" style="padding: 0 2rem">
              Available up to 24h before departure
            </p>
            <div class="flex justify-content-center flex-wrap">
              <button class="font-interstate back-orange-vibe text-white mx-auto border-round text-base"
                      style="padding: 0.7rem 2rem">
                Manage Insurance
                <img class="h-1rem ml-2" src="~/assets/icons/export-share-icon.svg" alt=""/>
              </button>
            </div>
          </div>
          <div class="col-12 lg:col-3 bg-white surface-border border-1 border-round-sm shadow-3">
            <img class="h-6rem flex mx-auto my-3" src="~/assets/icons/hotel.svg" alt=""/>
            <p class="font-semibold text-center">Accommodation</p>
            <p class="font-interstate text-sm text-gray-700 text-center my-2" style="padding: 0 2rem">
              Nedd pre- or post-tour accommodation?
            </p>
            <div class="flex justify-content-center flex-wrap">
              <button class="font-interstate back-orange-vibe text-white mx-auto border-round text-base"
                      style="padding: 0.7rem 1rem">
                Book Accommodation
                <img class="h-1rem ml-2" src="~/assets/icons/export-share-icon.svg" alt=""/>
              </button>
            </div>
          </div>
          <div class="col-12 lg:col-3 bg-white surface-border border-1 border-round-sm shadow-3">
            <img class="h-6rem flex mx-auto my-3" src="~/assets/icons/activities.svg" alt=""/>
            <p class="font-semibold text-center">Activities</p>
            <p class="font-interstate text-sm text-gray-700 text-center my-2">
              Got extra days in the destination before or after the adventure?
            </p>
            <div class="flex justify-content-center flex-wrap">
              <button class="font-interstate back-orange-vibe text-white mx-auto border-round text-base"
                      style="padding: 0.7rem 2rem">
                Get transfers
                <img class="h-1rem ml-2" src="~/assets/icons/export-share-icon.svg" alt=""/>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-content-center flex-wrap pb-5">
          <button class="font-interstate back-green-vibe text-white mx-auto border-round text-base"
                  style="padding: 0.7rem 3rem">
            View all services
          </button>
        </div>
      </div>
    </div>

    <div class="col-4">
      <template v-if="tour && duffelOfferSelected && !isPageLoading">
        <div class="col-12 lg:col-12 border-1 border-gray-300 border-round-sm" style="height: fit-content;">
          <h1 class="text-lg font-semibold my-2">{{ tour?.tourName }}</h1>
          <Carousel :showIndicators="false" v-if="tour.images" :value="tour.images"
                    :numVisible="1" :numScroll="1" circular>
            <template #item="slotProps">
              <div class="bg-cover bg-center h-10rem border-round-2xl"
                   :style="{ 'background-image': `url(${slotProps?.data})` }"></div>
            </template>
          </Carousel>

          <div class="text-sm my-3 ml-3">
            <div class="my-2" v-if="duffelOfferSelected?.slices?.at(0)?.segments?.at(0)?.origin?.city_name">
              <img class="h-1rem mr-2 ml-1" src="~/assets/icons/plane-leaving.svg" alt="airplane icon"/>
              Flying from {{ duffelOfferSelected.slices[0].segments[0].origin.city_name }}
              ({{ duffelOfferSelected.slices[0].segments[0].origin.iata_code }})
            </div>
            <div class="my-2" v-if="duffelOfferSelected?.slices?.at(-1)?.segments?.at(-1)?.destination?.city_name">
              <img class="h-1rem mr-2 ml-1" src="~/assets/icons/plane-landing-icon.svg" alt="airplane icon"/>
              Flying back to {{ duffelOfferSelected.slices.at(-1).segments.at(-1).destination.city_name }}
              ({{ duffelOfferSelected.slices.at(-1).segments.at(-1).destination.iata_code }})
            </div>
            <div class="my-2">
              <img class="h-1rem mr-1" src="~/assets/icons/couple-icon.svg" alt=""/>
              <span class="mx-2"><span class="text-green-vibe">{{ passengers }}</span> travelers</span>
            </div>
            <div class="my-2">
              <img class="h-1rem mr-2 ml-1" src="~/assets/icons/calendar-blank-icon.svg" alt=""/>
              <span class="font-semibold">From: </span>
              <span>{{ order.departure }} </span>
              <span class="font-semibold mx-2">To: </span>
              <span>{{ order.end }} </span>
            </div>
          </div>
          <div class="text-xs" style="margin: 10px; padding: 10px; border: 2px solid #82cf45; border-radius: 10px;">
            <div class="flex justify-content-between align-items-center">
              <div>
                <p class="font-medium text-lg" style="margin: 0;">Total</p>
                <span class="text-xs text-gray-700">Includes all taxes and fees</span>
                <p style="margin-left: 10px;" class="font-medium text-md">Flights</p>
                <p style="margin-left: 10px;" class="font-medium text-md">Organized Adventure</p>
              </div>
              <div>
                <p class="font-medium text-lg" style="margin: 0;">{{ formatAsCurrency(priceBreakdown.totalPrice, 'USD') }} USD</p>
                <span class="discount-button" v-if="promo > 0">${{ promo }} USD OFF</span><span v-else><br /></span>
                <p class="text-green-vibe">Included</p>
                <p class="text-green-vibe">Included</p>
              </div>
            </div>
            <p style="margin: 0 0 0 15px;">{{ getTourDepartureDate() }}</p>
            <!-- only show this section if there are any priceSummaryDetails -->
            <div class="priceSummaryDetailsComputed" style="margin-left: 15px;">
              <!-- loop through each accommodation -->
              <div v-for="acc in accommodatedItemsComputed" class="flex my-2 align-items-center"><span class="text-green-vibe">{{ acc.passengers }} </span> x {{ acc.name }}</div>
            </div>
          </div>
          <!--
                    <div class="text-xs mt-6 mx-2">
                      <p class="font-medium text-lg">Price summary</p>
                <template v-if="priceBreakdown.tourradarAdults > 0" style="display:none">
                    <div class="flex justify-content-between my-2 align-items-center">
                    <div class="col-5 p-0">
                      <span>Trip </span>
                      <span class="text-green-vibe font-semibold">
                      {{ formatAsCurrency(priceBreakdown.PriceAdult, 'USD') }}
                      </span>
                      <span> USD</span>
                    </div>
                    <div class="col-3 p-0">
                      <span>x </span>
                      <span class="text-green-vibe font-semibold">{{ priceBreakdown.tourradarAdults }}</span>&nbsp;
                      <span> {{ priceBreakdown.tourradarAdults < 2 ? 'adult' : 'adults' }}</span>
                    </div>
                    <div class="col-4 p-0 text-right">
                      <span>{{ formatAsCurrency((priceBreakdown.PriceAdult * priceBreakdown.tourradarAdults), 'USD') }} USD</span>
                    </div>
                    </div>
                    <hr class="surface-300 my-2" style="height: 1px; border: none" />
                    </template>
                    <template v-if="priceBreakdown.tourradarChildren > 0" style="display:none">
                          <div class="flex justify-content-between my-2 align-items-center">
                    <div class="col-5 p-0">
                      <span>Trip </span>
                      <span class="text-green-vibe font-semibold"> {{ formatAsCurrency(priceBreakdown.PriceChildren, 'USD')
                      }}</span>
                      <span> USD</span>
                    </div>
                    <div class="col-3 p-0">
                      <span>x </span>
                      <span class="text-green-vibe font-semibold">{{ priceBreakdown.tourradarChildren }}</span>&nbsp;
                      <span>{{ priceBreakdown.tourradarChildren < 2 ? 'child' : 'children' }}</span>
                    </div>
                    <div class="col-4 p-0 text-right">
                      <span>{{ formatAsCurrency((priceBreakdown.PriceChildren * priceBreakdown.tourradarChildren), 'USD') }} USD</span>
                    </div>
                    </div>
                    <hr class="surface-300 my-2" style="height: 1px; border: none" />
                    </template>

                  <div class="flex justify-content-between my-2 align-items-center" v-if="extras>0">
                   <hr class="surface-300 my-2" style="height: 1px; border: none" />
                  <div class="col-5 p-0">
                    <span>Extras  </span>
                    <span class="text-green-vibe font-semibold">
                    $ {{ (extras/passengers).toFixed(2) }}
                    </span>
                    <span> USD</span>
                  </div>
                  <div class="col-3 p-0">
                    <span>x </span>
                    <span class="text-green-vibe font-semibold">{{ passengers }}</span>&nbsp;
                    <span> {{ passengers < 2 ? 'traveler' : 'travelers' }}</span>
                  </div>
                  <div class="col-4 p-0 text-right">
                    <span>{{ extras }} USD</span>
                  </div>
                  </div>
                    </div>

                    <div class="my-4">
                      <div class="flex justify-content-between align-items-center">
                        <div>
                          <p class="font-medium text-lg">Total price</p>
                          <span class="text-xs text-gray-700">Includes all taxes and fees</span>
                        </div>
                        <div class="font-medium">{{ formatAsCurrency(priceBreakdown.totalPrice, 'USD') }} USD</div>
                      </div>
                    </div>
          -->
          <div class="flex flex-wrap">
            <div class="mx-auto flex align-items-center">
              <img class="h-1rem" src="~/assets/icons/tick-mark-icon.svg" alt=""/>
              <span class="font-medium text-sm">Best Price Guaranteed</span>
            </div>
            <div class="text-sm mx-auto my-3">Save this trip for later</div>
            <button class="font-interstate back-orange-vibe text-white mx-auto border-round"
                    style="padding: 0.7rem 4.5rem">
              Download as PDF
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <Skeleton height="40rem"></Skeleton>
      </template>
    </div>
  </div>
  <template v-else>
    <div class="flex align-items-center flex-column justify-content-center">
      <DotLottieVue class="animation-airplane" autoplay loop src="https://lottie.host/6d57cb1e-3790-4dd6-9e86-2eaad9430e6e/cdBLGv9UNo.lottie" />
      <div class="canaro-font text-xl pb-5 text-center">We are processing your booking, almost there! ✈️😎</div>
    </div>
  </template>
  <div class="grid container-page" v-if="support">
    <div class="text-green-vibe border-1 border-round-sm py-2 px-2"
         style="border-color: #82cf45; background-color: #f3faed; max-width: fit-content" >
      Sorry, our server has an error trying to book your tour, we have not charged the payment to your card. Customer support is gonna contact you ASAP but if you have any doubt you can send a mail to reservations@vibeadventures.com including the attemptId: {{attemptid}} or call the next number: 55 5555 5555.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import Breadcrumb from 'primevue/breadcrumb';
import Skeleton from 'primevue/skeleton';
import { useToast } from "primevue/usetoast";
import dayjs from 'dayjs';
import Carousel from 'primevue/carousel';
import FlightOrder from '~/components/BookPage/FlightOrder.vue';
import { useRouter } from 'vue-router';
import 'primeicons/primeicons.css';
import Timeline from 'primevue/timeline';
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";

const isDuffelOrderSelectedLoading = ref(true);
const duffelOrderSelected = ref(null);
const router = useRouter();
const config = useRuntimeConfig();
const adultsCountURL = ref(0);
const childrenCount = ref(0);
const infantsCount = ref(0);
const datesRange = ref();
const tourId = ref();
const departureIdURL = ref();
const duffelRequestIdURL = ref(null);
const duffelOfferIdURL = ref(null);
const duffelOfferSelected = ref(null);
const duffelRequest = ref(null);
const isDuffelRequestLoading = ref(true);
const isPageLoading = ref(true);
const departure_fly_from = ref("");
const tour = ref({});
const order = ref({});
const passengers = ref([]);
const accommodations = ref([]);
const optional_extras = ref([]);
const isLoadingPayment = ref(false);
const toast = useToast();
const duffelSectionRef = ref();
const lead = ref();
const extras = ref();
const attempt = ref();
const attemptid = ref();
const support = ref(false);
const orderId = ref(null);  // Initialize orderId as a ref
const accommodatedItemsComputed = ref([]);
const tourradarRes = ref([]);

function dayFormatted(input){ const formatted = dayjs(input, 'DD/MM/YYYY').format('MMMM D, YYYY'); return formatted; }

function getTourDepartureDate() {
  console.log("tourradarRes.value",tourradarRes.value);
  const date = new Date(tourradarRes.value.departure_date);
  const departureDate = dayFormatted(dayjs(date));
  const endDate = dayFormatted(dayjs(date).add(tour.value.tourLengthDays, 'days'));
  return `${departureDate} - ${endDate}`;
}

function formatAsCurrency(price, currency) {
  let number = Math.ceil(price); // Remove the extra dot before Math.ceil
  if (!number) {
    return "-";
  }
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0, // No decimals
  });
}

async function fetchOrderData(order) {
  const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/orders/${order}?travelers=true`);
  if (error?.value) {
    console.error('Error fetching order data:', error.value.message);
    return null;
  }
  return data.value;
}

async function fetchDuffelorder(orderId) {
  if (!orderId) {
    console.info('Missing duffelorderId. It’s something like: "off_xxxx"');
    return null;
  }

  const params = new URLSearchParams();
  params.append('orderId', orderId);

  const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/duffel/get-order-by-id?${params.toString()}`);

  if (error?.value?.data?.message) {
    for (const key in error.value.data.message) {
      console.error(`${key}: ${error.value.data.message[key]}`);
    }
    return null;
  }

  return data.value.data;
}

async function fetchTour(tourId) {
  const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/tour/${tourId}`);
  if (error?.value) {
    console.info('Error fetching tour: ', error?.value?.message);
  }
  return data?.value?.data ?? null;
}

const orderStatus = ref();

function getTimeStay(params) {
  if (!params.get('timeStay')) {
    return ["2", "65"] // default value
  }
  return params.get('timeStay').split(',')
}

function getDatesSelected(params, name) {
  if (!params.get(name)) {
    const firstDayNextMonth = dayjs().add(2, 'month').startOf('month').format('YYYY/MM/DD');
    const lastDayNextMonth = dayjs().add(2, 'month').endOf('month').format('YYYY/MM/DD');
    return `${firstDayNextMonth}-${lastDayNextMonth}`;
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

const priceBreakdown = ref();

async function pollBookingStatus(attemptId) {
  const response = await fetch(`${config.public.BACKEND_URL}/api/status?attempt_id=${attemptId}`);
  const data = await response.json();
  console.log("status", data);
  attempt.value = true;
  if(data.status == "failed"){
    const params = new URLSearchParams(window.location.search);
    const timeStay = getTimeStay(params);
    const dateSelected = getDatesSelected(params, 'dateRange');
    const formattedRange = dateSelected
        .split("-")
        .map(date => dayjs(date, "YYYY/MM/DD").format("DD/MM/YYYY"))
        .join("-");
    const adultsCount = getAdultsCount(params, "adultsCount");
    const childrenCount = getChildrenCount(params, 'childrenCount');
    const infantsCount = getChildrenCount(params, 'infantsCount');
    const totalTravelers = Number(adultsCount.value + childrenCount.value + infantsCount.value);
    const route = {
      path: "/tours",
      query: {
        error: true,
        search: true,
        type: "city",
        t_id: tour.value.startCity.location_id,
        timeStay : timeStay,
        dateRange : formattedRange,
        adultsCount : adultsCount,
        childrenCount : childrenCount,
        infantsCount : infantsCount,
        totalTravelers : totalTravelers
      },
    };
    router.push(route);
  } else{
    const duffel_res = data.duffel_res;
    const tourradar_res = data.tourradar_res;
    tourradarRes.value = tourradar_res;
    const tourradarAdults =	tourradar_res.adultsNumber;
    const tourradarChildren =	tourradar_res.childrenNumber;
    const tourradarPriceAdults =	tourradar_res.totalPriceAdults;
    const tourradarPriceChildren =	tourradar_res.totalPriceChildren;
    const totalFlight = Number(duffel_res.data.total_amount);
    const totalTour = Number(tourradarPriceAdults + tourradarPriceChildren);
    console.log("totalFlight",totalFlight);
    console.log("totalTour",totalTour);
    accommodatedItemsComputed.value = data.passengers;
    console.log("accommodatedItemsComputed.value",accommodatedItemsComputed.value);
    const flightPp = totalFlight/(tourradarAdults + tourradarChildren);
    const flightPAdult = flightPp * tourradarAdults;
    const flightPChildren = null;
    if(tourradarChildren > 0){
      flightPChildren = flightPp * tourradarChildren;
    }

    priceBreakdown.value = 	{
      tourradarAdults: tourradarAdults,
      tourradarChildren: tourradarChildren,
      tourradarPriceAdults: tourradarPriceAdults,
      tourradarPriceChildren: tourradarPriceChildren,
      PriceChildren: Math.ceil((flightPp + (tourradarPriceChildren / tourradarChildren)) * 1.15),
      PriceAdult: Math.ceil((flightPp + (tourradarPriceAdults / tourradarAdults)) * 1.15),
      totalPrice: Math.ceil((totalFlight + totalTour) * 1.15),
    }
    console.log("priceBreakdown.value",priceBreakdown.value);
    orderId.value = data.booking_id;  // Update orderId when status is completed
    console.log("orderId.value",orderId.value);
    if (orderId.value) {
      const orderData = await fetchOrderData(orderId.value);
      order.value = orderData;
      console.log("order.value", order.value);
      if (orderData) {
        passengers.value = orderData.travelers_number;
        console.log("passengers.value", passengers.value);
        lead.value = `${orderData.travelers[0].name} ${orderData.travelers[0].last}`;
        duffelOfferSelected.value = await fetchDuffelorder(orderData.duffel_id);
        duffelOrderSelected.value = await fetchDuffelorder(orderData.duffel_id);
        isDuffelOrderSelectedLoading.value = false;
      } else {
        console.error('no order Data');
      }
      extras.value = Number(orderData.paid) - (Number(orderData.p_tour) + Number(orderData.p_flight));
      console.log("extras.value", extras.value);
      isPageLoading.value = false;
    } else {
      console.error('no order Id');
    }
    if (data.status === 'completed') {
      console.log("status completed", data.status);
      orderStatus.value = "completed";
    }
    else if (data.status === 'pending') {
      console.log("status pending", data.status);
      orderStatus.value = "pending";
    }
    else {
      console.log("status cancelled", data.status);
      orderStatus.value = "cancelled";
    }
  }
}

// Computed property to watch and reactively respond when orderId is set
const hasOrderId = computed(() => !!orderId.value);

function startPollingUntilOrderFound(attemptId) {
  const poll = async () => {
    const response = await fetch(`${config.public.BACKEND_URL}/api/status?attempt_id=${attemptId}`);
    const data = await response.json();
    console.log("status", data);

    if (data.status === "failed") {
      attempt.value = true;
      // Manejo de redirección en caso de fallo
      const params = new URLSearchParams(window.location.search);
      const timeStay = getTimeStay(params);
      const dateSelected = getDatesSelected(params, 'dateRange');
      const formattedRange = dateSelected
          .split("-")
          .map(date => dayjs(date, "YYYY/MM/DD").format("DD/MM/YYYY"))
          .join("-");
      const adultsCount = getAdultsCount(params, "adultsCount");
      const childrenCount = getChildrenCount(params, 'childrenCount');
      const infantsCount = getChildrenCount(params, 'infantsCount');
      const totalTravelers = Number(adultsCount + childrenCount + infantsCount);
      const route = {
        path: "/tours",
        query: {
          error: true,
          search: true,
          type: "city",
          t_id: tour.value.startCity.location_id,
          timeStay,
          dateRange: formattedRange,
          adultsCount,
          childrenCount,
          infantsCount,
          totalTravelers,
        },
      };
      router.push(route);
      return;
    }

    if (data.booking_id) {
      orderId.value = data.booking_id;
      // Lógica de éxito: obtener datos del pedido
      tourradarRes.value = data.tourradar_res;
      const orderData = await fetchOrderData(orderId.value);
      const duffel_res = data.duffel_res;
      const tourradar_res = data.tourradar_res;
      tourradarRes.value = tourradar_res;
      const tourradarAdults =	tourradar_res.adultsNumber;
      const tourradarChildren =	tourradar_res.childrenNumber;
      const tourradarPriceAdults =	tourradar_res.totalPriceAdults;
      const tourradarPriceChildren =	tourradar_res.totalPriceChildren;
      const totalFlight = Number(duffel_res.data.total_amount);
      const totalTour = Number(tourradarPriceAdults + tourradarPriceChildren);
      console.log("totalFlight",totalFlight);
      console.log("totalTour",totalTour);
      accommodatedItemsComputed.value = data.passengers;
      console.log("accommodatedItemsComputed.value",accommodatedItemsComputed.value);
      const flightPp = totalFlight/(tourradarAdults + tourradarChildren);
      const flightPAdult = flightPp * tourradarAdults;
      const flightPChildren = null;
      if(tourradarChildren > 0){
        flightPChildren = flightPp * tourradarChildren;
      }

      priceBreakdown.value = 	{
        tourradarAdults: tourradarAdults,
        tourradarChildren: tourradarChildren,
        tourradarPriceAdults: tourradarPriceAdults,
        tourradarPriceChildren: tourradarPriceChildren,
        PriceChildren: Math.ceil((flightPp + (tourradarPriceChildren / tourradarChildren)) * 1.15),
        PriceAdult: Math.ceil((flightPp + (tourradarPriceAdults / tourradarAdults)) * 1.15),
        totalPrice: Math.ceil((totalFlight + totalTour) * 1.15),
      }
      console.log("priceBreakdown.value",priceBreakdown.value);
      orderId.value = data.booking_id;  // Update orderId when status is completed
      console.log("orderId.value",orderId.value);
      if (orderData) {
        order.value = orderData;
        passengers.value = orderData.travelers_number;
        lead.value = `${orderData.travelers[0].name} ${orderData.travelers[0].last}`;
        duffelOfferSelected.value = await fetchDuffelorder(orderData.duffel_id);
        duffelOrderSelected.value = await fetchDuffelorder(orderData.duffel_id);
        isDuffelOrderSelectedLoading.value = false;
        extras.value = Number(orderData.paid) - (Number(orderData.p_tour) + Number(orderData.p_flight));
        isPageLoading.value = false;
        orderStatus.value = data.status;
      }
    } else {
      console.log("No orderId yet, retrying in 5 seconds...");
      setTimeout(poll, 5000); // Retry after 5s
    }
  };

  poll(); // Start polling
}




onMounted(() => {
  nextTick(async () => {
    const params = new URLSearchParams(window.location.search);
    tourId.value = params.get("tourId");
    console.log("tourId.value", tourId.value);
    tour.value = await fetchTour(tourId.value);
    const attemptId = params.get("attempt_id");
    attemptid.value = attemptId;

    startPollingUntilOrderFound(attemptId);

  });
});
</script>

<style scoped>
.container-page {
  max-width: 1200px;
  margin: auto
}

a {
  color: inherit;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
}

.font-canaro {
  font-family: 'Canaro';
}

.font-canaro-book {
  font-family: 'Canaro Book';
}

.font-interstate {
  font-family: 'Interstate' !important;
}

.text-green-vibe {
  color: #82cf45;
}

.back-green-vibe {
  background-color: #82cf45;
}

.text-orange-vibe {
  color: #ff6c0e;
}

.back-orange-vibe {
  background-color: #ff6c0e;
}

/* Shapes */

.green-dot-sm {
  height: 0.8rem;
  background-color: #82cf45;
  display: block;
  width: 0.8rem;
  border-radius: 50%;
}

.gray-dot-xs {
  height: 0.4rem;
  background-color: var(--gray-700);
  display: block;
  width: 0.4rem;
  border-radius: 50%;
}

.h-02rem {
  height: 0.2rem;
}

.interstate {
  font-family: 'Interstate';
}

.green-vibe {
  color: #82cf45;
}

.green-vibe-back {
  background-color: #82cf45;
}

.light-green-vibe-back {
  background-color: #ecf8e2;
}

.orange-vibe {
  color: #ff6c0e;
}

.timestamps-line {
  float: left;
}

.timestamps-line img {
  height: 4.7rem;
  margin-top: 0.5rem;
  position: relative;
  left: 4.8rem;
}

.hr-lined {
  border-top: 1.2px dashed var(--gray-400);
  border-bottom: none;
  border-right: none;
  border-left: none;
}

.pi-arrow-right:before {
  font-weight: 600;
  font-size: small;
}

.circle-button {
  padding: 0rem 0.25rem;
  background-color: var(--gray-300);
  border-radius: 50%;
  margin: 0 0.2rem;
}

div.col-6.flex.align-items-center {
  padding: 4px;
}

@media only screen and (max-width: 767px) {
  .line-flights {
    border-left: 2px solid var(--gray-500);
    height: 14.5rem;
    float: left;
    left: 5.8rem;
    margin-top: 1.6rem;
    z-index: -1;
  }
  #breadcrumb-container{padding:0 2%}
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .line-flights {
    border-left: 2px solid var(--gray-500);
    height: 14.5rem;
    float: left;
    left: 6.2rem;
    margin-top: 1.6rem;
    z-index: -1;
  }
  #breadcrumb-container{padding:0 3%}
}

@media only screen and (min-width: 1200px) {
  .line-flights {
    border-left: 2px solid var(--gray-500);
    height: 14.5rem;
    float: left;
    left: 6.25rem;
    margin-top: 1.6rem;
    z-index: -1;
  }
  #breadcrumb-container{padding:0 5%}
}

.pay_now_padding {
  padding: 0.7rem 4rem;
}

.flights_big_title {
  color: #333;
  font-family: Canaro;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  position: relative;
}

.display_none {
  display: none !important;
}
</style>
