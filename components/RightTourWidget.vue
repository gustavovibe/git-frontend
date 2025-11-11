<style scoped>
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
<template>   
<!-- PRICE DETAILS -->
    <template v-if="order && duffelOrderSelected">
      <div class="col-12 lg:col-3 border-1 border-gray-300 border-round-sm" style="height: fit-content;">
        <h1 class="text-lg font-semibold my-2">{{ order.tour_name }}</h1>
        <Carousel :showIndicators="false" v-if="carouselImagesComputed?.length" :value="carouselImagesComputed"
                  :numVisible="1" :numScroll="1" circular>
          <template #item="slotProps">
            <div class="bg-cover bg-center h-10rem border-round-2xl"
                 :style="{ 'background-image': `url(${slotProps?.data?.imageUrl})` }"></div>
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
            <span class="mx-2"><span class="text-green-vibe">{{ order.travelers_number }}</span> travelers</span>
          </div>
          <div class="my-2">
            <img class="h-1rem mr-2 ml-1" src="~/assets/icons/calendar-blank-icon.svg" alt=""/>
            <span class="font-semibold">From: </span>
            <span>{{ formatOutboundDate(order.departure) }} </span>
            <span class="font-semibold mx-2">To: </span>
            <span>{{ formatOutboundDate(order.end) }} </span>
          </div>
        </div>
        <div class="text-xs mt-6 mx-2">
          <p class="font-medium text-lg">Price summary</p>
			<hr class="surface-300 my-2" style="height: 1px; border: none" />
			  <div class="flex justify-content-between my-2">
				<div>
				  <span>Trip </span>
				  <span class="text-green-vibe font-semibold">${{order.p_tour/order.travelers_number}}</span>
				  <span>USD x </span>
				  <span class="text-green-vibe font-semibold">2 </span>
				  <span>travelers</span>
				</div>
				<div>
				  <span>${{order.p_tour}} USD</span>
				</div>
			  </div>
        </div>
        <div class="my-4">
          <div class="flex justify-content-between align-items-center">
            <div>
              <p class="font-medium text-lg">Total price</p>
              <span class="text-xs text-gray-700">Includes all taxes and fees</span>
            </div>
            <div class="font-medium">{{ formatAsCurrency(order.paid, 'USD') }} USD</div>
          </div>
        </div>
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
      </div> <!-- END PRICE DETAILS -->
    </template>
</template>
<script setup>
//@ts-nocheck
import dayjs from 'dayjs';

const order = ref();			
const tour = ref([]);		

function formatOutboundDate(date) {
  return dayjs(date).format('ddd D MMM')
}

function formatAsCurrency(price, currency) {
  let number = price
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });
}

onMounted(() => {
  nextTick(async () => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id'); 
    if (orderId) {  
      order.value = await getOrder(orderId);
	  const tourId = order.value.tour_id;
	  const duffelId = order.value.duffel_id;
      if (duffelId) {
        duffelOrderSelected.value = await fetchDuffelorder(duffelId);
      }
	  if (tourId) {
		 tour.value = await fetchTour(tourId);	
	  }
    }
  });
}); 	

async function getOrder(orderId) {
  const { data } = await useFetch(`${config.public.BACKEND_URL}/api/orders/${orderId}`);
	console.log('contenido de order:',data.value);
  return data.value;
}	
	
async function fetchDuffelorder(duffelId) {
  if (!orderId) {
    console.info('Missing duffelorderId. Its something like: "ord_xxxx"');
    return null;
  }

  const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/duffel/get-order-by-id?${duffelId}`);

  if (error?.value?.data?.message) {
    for (const key in error.value.data.message) {
      console.error(`${key}: ${error.value.data.message[key]}`);
    }
    return null;
  }
  
  return data.value.data;
}	

async function fetchTour(tourId) {
  const {data} = await useFetch(`${config.public.BACKEND_URL}/api/tour/${tourId}`);
  return data.value?.data ?? {};
}
	
const carouselImagesComputed = computed(() => {
  const images = tour?.value?.images ?? []
  const formattedImages = images.map(imageUrl => ({imageUrl}));
  return formattedImages
});		
</script>