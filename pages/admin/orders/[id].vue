<script>
import FlightOrder from "~/components/BookPage/FlightOrder.vue";
import CustomerPayments from "~/components/BookPage/CustomerPayments.vue";
import AdventureSummary from "~/components/AdventureSummary.vue";
import ActionLogs from '~/components/ActionLogs.vue';

export default {
  components: {
    FlightOrder,
    AdventureSummary,
    CustomerPayments
  },
};
</script>

<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
      <div class="col-12 lg:col-2">
        <PanelMenuCMS/>
      </div>
      <div class="col-12 lg:col-10">
        <div class="grid">
          <div class="col-1" style="text-align: center" @click="returnToOrders">
            <div style="background-color: #82cf35;">
              <h3 class="mt-0 mb-1 ml-1 text-2xl" style="color: white">
                <i class="pi pi-arrow-left" style="font-size: 1.5rem">
                </i>
              </h3>
            </div>
          </div>
          <div class="col-11">
            <div style="background-color: black;">
              <h3 class="mt-0 mb-1 ml-1 text-2xl" style="color: white">Order {{ orderId }}</h3>
            </div>
          </div>
        </div>
        <div class="grid" style="height: 70px; margin-bottom: 20px">
          <div class="col-2 card flex justify-content-start align-items-center">
            <Button label="Save order" style="background: #82cf35; color:white"/>
          </div>
          <div class="col-6 card flex justify-content-between flex-wrap">
            <div style="border: solid 1px #E0E0E0; border-radius:10px; text-align: center" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold ">{{ order.departure }}</div>
              <div>Booing date</div>
            </div>
            <div style="border: solid 1px #E0E0E0; border-radius:10px; text-align: center" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold ">{{ order.channel }}</div>
              <div>Channel</div>
            </div>
            <div style="border: solid 1px #E0E0E0; border-radius:10px; text-align: center" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold ">${{ order.paid }}</div>
              <div>Paid</div>
            </div>
            <div style="border: solid 1px #E0E0E0; border-radius:10px; text-align: center" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold;color:#82cf35">{{ order.tourradar_status }}
              </div>
              <div>Order Status</div>
            </div>
          </div>
          <div class="col-4 card flex justify-content-end align-items-center flex-wrap gap-5">
            <div style="border: solid 1px #E0E0E0; border-radius:10px" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold ">Log Note</div>
            </div>
            <div style="border: solid 1px #E0E0E0; border-radius:10px" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold ">Email</div>
            </div>
            <div style="border: solid 1px #E0E0E0; border-radius:10px" class="p-2">
              <div style="text-transform: capitalize; font-weight: bold ">Print</div>
            </div>
          </div>
        </div>
        <Accordion :multiple="true" :activeIndex="[0, 1, 2, 3]" expandIcon="pi pi-angle-down" collapseIcon="pi pi-angle-up">
          <AccordionTab>
            <template #headericon>
              <div class="col-1 flex justify-content-start align-items-center mb-2 px-2"
                  style="background-color: rgba(130, 207, 53, 0.5); height: 50px; flex-direction: row-reverse;">
                  <i class="pi pi-angle-down" style="color: #FFF"></i>
              </div>
            </template>
            <template #header>
              <div class="col-11 flex justify-content-start align-items-center mb-2"
                  style="background-color: rgba(130, 207, 53, 0.5); height: 50px;">
                <h3 class="mt-0 mb-1 ml-1 text-2xl" style="color: white">Travelers</h3>
              </div>
            </template>
            <div class="col-12 flex justify-content-start align-items-center">
              <h3 class="mt-0 mb-1 ml-1 text-2xl">Lead traveler</h3>
            </div>
            <div class="col-6 flex justify-content-start align-items-center">
              <div style="text-transform: capitalize; font-weight: bold;">
                <span style="color:#82cf35">{{ user.name }}</span>
                | {{ user.phone }} | {{ user.email }} | {{ user.country }}
              </div>
            </div>
            <div class="col-12 flex justify-content-start align-items-center">
              <h3 class="mt-0 mb-1 ml-1 text-2xl">All travelers</h3>
            </div>
            <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-3">
              <div class="col-3" v-for="(traveler, index) in travelers" :key="index"
                  style="border: solid 1px gray;  border-radius: 10px;">
                <div class="col-12 flex" style="">
                  <div class="col-6  flex justify-content-start" style="">
                    Traveler {{ index + 1 }}
                  </div>
                  <div class="col-6 flex justify-content-end align-items-center flex-wrap gap-1"
                      style="">
                    <Button label="-" style="background: #82cf35; color:white" disabled @click="deleteTraveler(traveler)"
                            class="p-2"/>
                    <Button label="+" style="background: #82cf35; color:white" disabled
                            @click="modifyTraveler(traveler,index)"
                            class="p-2"/>
                  </div>
                </div>
                <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-1"
                    style="">
                  <label for="username">Title</label>
                  <InputText id="username" v-model="traveler.title" aria-describedby="username-help" class="w-full"
                            disabled/>
                </div>
                <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-1"
                    style="">
                  <label for="username">First Name</label>
                  <InputText id="username" v-model="traveler.name" aria-describedby="username-help" class="w-full"
                            disabled/>
                </div>
                <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-1"
                    style="">
                  <label for="username">Last Name</label>
                  <InputText id="username" v-model="traveler.last" aria-describedby="username-help" class="w-full"
                            disabled/>
                </div>
                <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-1"
                    style="">
                  <label for="username">Date of birth</label>
                  <InputText id="username" v-model="traveler.birth" aria-describedby="username-help" class="w-full"
                            disabled/>
                </div>
                <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-1"
                    style="">
                  <label for="username">Country</label>
                  <InputText id="username" v-model="traveler.country" aria-describedby="username-help" class="w-full"
                            disabled/>
                </div>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab>
            <template #headericon>
              <div class="col-1 flex justify-content-start align-items-center mb-2 px-2"
                  style="background-color: #000; height: 50px; flex-direction: row-reverse;">
                  <i class="pi pi-angle-down" style="color: #FFF"></i>
              </div>
            </template>
            <template #header>
              <div class="col-11 flex justify-content-start align-items-center mb-2"
                  style="background-color: #000; height: 50px;">
                <h3 class="mt-0 mb-1 ml-1 text-2xl" style="color: white">Trip</h3>
              </div>
            </template>
            <div class="col-12 flex justify-content-start align-items-center" style="background-color: rgba(130, 207, 53, 0.5);">
              <h3 class="mt-0 mb-1 ml-1 text-2xl">Flights</h3>
				<a
				  v-if="order?.flight_tour?.flight?.data?.id"
				  :href="`https://app.duffel.com/b983c37474984a5cd4012d3/test/orders/${order.flight_tour.flight.data.id}`"
				  target="_blank" rel="noopener"
				>
				  {{ order.flight_tour.flight.data.id }}
				</a>
            </div>
            <div class="col-4 flex justify-content-start align-items-center flex-wrap gap-3">
              <FlightOrder :duffelOrderSelected="flights" />
            </div>
            <div v-if="order" class="col-12 flex justify-content-start align-items-center" style="background-color: rgba(130, 207, 53, 0.5);">
				<h3 class="mt-0 mb-1 ml-1 text-2xl">Adventure </h3>
				<a v-if="flightTourLink" :href="flightTourLink">{{ order?.flight_tour?.tour?.id }}</a>
            </div>
            <div class="col-12 flex justify-content-start align-items-center flex-wrap gap-3">
              <AdventureSummary
                v-if="tour && images.length > 0"
                :tour="tour"
                :images="images"
              />
            </div>
          </AccordionTab>
          <AccordionTab>
            <template #headericon>
              <div class="col-1 flex justify-content-start align-items-center mb-2 px-2"
                  style="background-color: #000; height: 50px; flex-direction: row-reverse;">
                  <i class="pi pi-angle-down" style="color: #FFF"></i>
              </div>
            </template>
            <template #header>
              <div class="col-11 flex justify-content-start align-items-center mb-2"
                  style="background-color: #000; height: 50px;">
                <h3 class="mt-0 mb-1 ml-1 text-2xl" style="color: white">Customer Payments</h3>
              </div>
            </template>
              <CustomerPayments v-if="balance" :orderPayment="orderPayment" :p_flight="order.p_flight" :p_tour="order.p_tour" :paid="order.paid" :commission_value_tour="order.commission_value_tour" />
			  <div v-if="refunded > 0"><h4>Amount refunded: {{USDollar.format(refunded/100)}} USD</h4></div>
          </AccordionTab>
          <AccordionTab>
            <template #headericon>
              <div class="col-1 flex justify-content-start align-items-center mb-2 px-2"
                  style="background-color: #000; height: 50px; flex-direction: row-reverse;">
                  <i class="pi pi-angle-down" style="color: #FFF"></i>
              </div>
            </template>
            <template #header>
              <div class="col-11 flex justify-content-start align-items-center mb-2"
                  style="background-color: #000; height: 50px;">
                <h3 class="mt-0 mb-1 ml-1 text-2xl" style="color: white">Recent Actions</h3>
              </div>
            </template>
			  <div v-if="autoStripe"><h4>Stripe has cancelled the payment due to expiration on holding flight.</h4></div>
              <ActionLogs :user-id="user.id" :order-id="order.booking_id" />
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
import 'primeicons/primeicons.css'
import {useRouter} from 'vue-router';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import {useOrderStore} from "@/store/orderStore";
import {onMounted, ref, watch} from "vue";
import InputText from 'primevue/inputtext';
import {useTravelerStore} from "@/store/travelerStore";

const config = useRuntimeConfig();
const user_log=ref(null);
const url = ref(config.public.BACKEND_URL)
const travelerStore = useTravelerStore();
const orderStore = useOrderStore();
const router = useRouter();
const route = useRoute();
const orderId = ref('')
const tour = ref('')
const images = ref('')
const returnToOrders = () => {
  router.push(`/admin/orders`);
}
const order = computed(() => orderStore.order);
const user = computed(() => orderStore.user);
const travelers = computed(() => orderStore.travelers);
const flights = computed(() => orderStore.flights);
const initialTravelers = ref([]);
const orderPayment = ref(null);
const refunded = ref(0);
const autoStripe = ref(false);	
const balance = ref(null);	
	
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});	
	
watch(() => order.value, async () => {
  getInfoTour();
  orderPayment.value = await fetchOrderPayment(order.value.payment_id);
  console.log("orderPayment.value",orderPayment.value);	
  const balance_transaction = orderPayment.value?.data?.charge_details?.balance_transaction;
  console.log("balance_transaction",balance_transaction);
  balance.value = balance_transaction;	
  if(orderPayment.value?.data?.charge_details?.amount_refunded > 0){
  	refunded.value = orderPayment.value.data.charge_details.amount_refunded;
	console.log("refunded.value",refunded.value);  
  }
  if(orderPayment.value?.data?.charge_details?.amount_captured == 0){
	autoStripe.value = true;  
  }
});

async function fetchOrderPayment(paymentId) {
  console.log("paymentId", paymentId);
  try {
    const response = await fetch(`https://vibeadventures.be/api/stripe?q=${paymentId}`);
    if (!response.ok) throw new Error(`Failed to fetch tour data for tour_id ${paymentId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tour details:", error);
    return null;
  }
}
async function getInfoTour(){
  if(order.value.tour_id){
    tour.value = await fetchTour(order.value.tour_id);
    if (tour.value) {
      tour.value.tourTypes = formatTourTypes(tour?.value?.tour_types);
      images.value = tour.value.images;
    }
  } else {
    console.error("no tourId");
  }
}

async function fetchTour(tourId) {
  const { data, error } = await useFetch(
    `${config.public.BACKEND_URL}/api/tour/${tourId}`
  );
  if (error?.value) {
    console.info("Error fetching tour: ", error?.value?.message);
  }
  return data?.value?.data ?? null;
}

function formatTourTypes(tourTypes) {
  if (!tourTypes?.length) {
    return [];
  }

  const explorerType = 11;
  const familyType = 26;

  const filteredTourTypes = tourTypes.filter((type) =>
    [explorerType, 14, familyType].includes(type.group_id)
  );
  return filteredTourTypes.map((type) => type.type_name);
}


const getModifiedFields = (currentTraveler, initialTraveler) => {
  const modifiedFields = {};
  for (const key in currentTraveler) {
    if (currentTraveler[key] !== initialTraveler[key]) {
      modifiedFields[key] = currentTraveler[key];
    }
  }
  return modifiedFields;
};

const modifyTraveler = async (traveler, index) => {
  console.log('Modify Traveler ID:', traveler.id);
  const modifiedFields = getModifiedFields(traveler, initialTravelers.value[index]);
  modifiedFields.user_log = user_log.value;
  if (Object.keys(modifiedFields).length > 0) {
    console.log(`Traveler ${index + 1} has been modified:`, modifiedFields);
    try {
      const response = await travelerStore.updateTraveler(traveler.id, modifiedFields);
      await orderStore.getOrder(orderId.value);
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Update failed:', error);
    }
  } else {
    console.log(`Traveler ${index + 1} has not been modified.`);
  }
};

const deleteTraveler = async (traveler) => {
  let id = traveler.id
  try {
    const response = await travelerStore.deleteTraveler(id, url.value,{ user_log:user_log.value});
    await orderStore.getOrder(orderId.value);
    console.log('Update successful:', response);
  } catch (error) {
    console.error('Update failed:', error);
  }
};

const flightTourLink = computed(() => {
  return order.value?.flight_tour?.tour?.links?.[0]?.url ?? null;
});	
	
onMounted(async () => {
  user_log.value = localStorage.getItem('user_id');
  orderId.value = route.params.id;
  try {
    order.value = await orderStore.getOrder(orderId.value);
	console.log("order.value",order.value);  	  
    initialTravelers.value = JSON.parse(JSON.stringify(travelers.value));
  } catch (error) {
    console.error('Error fetching order:', error);
  }
});
</script>
<style scoped>
:deep(.p-button.p-component) {
  padding: 0.4rem;
  font-size: smaller;
}

:deep(span.p-dropdown-label.p-inputtext.p-placeholder) {
  padding: 0.4rem;
}

:deep(span.p-dropdown-label.p-inputtext) {
  padding: 0.4rem;
}

:deep(.p-multiselect-label.p-placeholder) {
  padding: 0.4rem;
}

:deep(.p-multiselect.p-multiselect-chip .p-multiselect-token) {
  padding: 0.2rem 0.75rem;
}

.sales {
  border: solid 1.3px #ff6c0e;
  border-radius: 5px;
}

.suppliers {
  border: solid 1.3px #82cf35;
  border-radius: 5px;
}

.filter-padding div {
  padding: 0 0.5rem;
}

.text_decoration_none {
  text-decoration: none;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f3faed;
}

@media only screen and (max-width: 767px) {
  .main-spacing {
    padding: 0.5rem 2rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main-spacing {
    padding: 0.5rem 2rem;
  }
}

@media only screen and (min-width: 1200px) {
  .main-spacing {
    padding: 2rem 2rem;
  }
}
</style>