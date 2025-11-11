<style scoped>
  .block-spans span{
	  display:block!important;
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
  .order-header{
      justify-content: space-between;
      align-items: center;
  }
  .line-flights{
    border-left: 2px solid var(--bluegray-200);
    height: 78.5%;
    position: absolute;
    left: 6.3rem;
    top: 11%;
    z-index: -1;

  }
  .hr-lined{
    border-color: var(--bluegray-100);
    border-top: 1px;
  }
  .nights-in{
    position:absolute;
    top: -0.9rem;
    left:30%;
    border-color: #ff6c0e;
    color: #ff6c0e;
  }
  .download_btn {
    background-color: #FF6C0E;
    color: #fff;
    cursor: pointer;
  }
  .btn-cover {
    width: -webkit-fill-available;
    border: 1px solid #FF6C0E;
    border-radius: 5px;
    font-weight: 700;
    font-family: 'Interstate';
    font-size: 1.1rem;
  }
  .service-card{
    width: calc((100%) - 20px);
    margin: 0 10px;
  }
  .service-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  :deep(.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link){
    border-radius: 30px;
    padding: 1rem;
  }
  :deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link){
    transition: none;
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
      .nights-in{
        position:absolute;
        top: -0.9rem;
        left:40%;
      }
      .service-card{
        width: calc((100% / 2) - 20px);
        margin: 0 10px;
      }
  }
  @media only screen and (min-width:1200px){
      .main-spacing{
          padding: 2rem 7rem;
      }
      .nights-in{
        position:absolute;
        top: -0.9rem;
        left:38%;
      }
      .service-card{
        width: calc((100% / 3) - 20px);
        margin: 0 10px;
      }
  }
</style>


<template>
  <template v-if="duffelOrderSelected">
	<template v-if="duffelOrderSelected?.slices?.length" v-for="(slice, index) in duffelOrderSelected.slices">
		<div class="mb-4 mt-2" style="display: flex;">
		<!-- segments -->
              <template v-if="slice.segments.length" v-for="segment in slice.segments">
                <div class="timestamps-line">
                  <img src="~/assets/icons/timeline.svg" alt="timeline" />
                </div>

                <div class="ml-3">
                  <div class="flex align-items-center my-2">
                    <span class="text-gray-700 text-right text-xs" style="width: 50px">
                      {{ formatDateToHour(segment.departing_at) }}
                    </span>
                    <h3 v-tooltip.top="segment.origin.city_name" class="mb-0 text-sm font-medium ml-5"
                      style="margin-top: 0.25rem">
                      {{ segment.origin.name }}
                    </h3>
                    <span class="green-vibe mx-2">
                      {{ segment.origin.iata_code }}
                    </span>
                  </div>
                  <div class="flex align-items-center">
                    <span class="text-gray-700 text-right text-xs" style="width: 50px">
                      {{ calculateTimeBetweenDepartureAndArrivalSegment(segment) }}
                    </span>
                    <img v-tooltip.top="segment?.marketing_carrier?.name" class="ml-5 h-1rem mr-2"
                      :src="segment?.marketing_carrier?.logo_symbol_url" alt="carrier icon" />
                    <!-- <img class="mx-3 surface-200 py-1 px-2 border-round-xl" style="height: 1.3rem"
                      src="~/assets/icons/plane-icon.svg" alt="plane icon" /> -->
                    <span v-if="slice?.segments?.length < 2"
                      class="light-green-vibe-back text-xs py-1 px-2 border-round-xl">Direct</span>
                  </div>
                  <div class="flex my-2 align-items-center">
                    <span class="text-gray-700 text-right text-xs" style="width: 50px">
                      {{ formatDateToHour(segment.arriving_at) }}
                    </span>
                    <h3 v-tooltip.top="segment.destination.city_name" class="mb-0 text-sm font-medium ml-5"
                      style="margin-top: 0.25rem">
                      {{ segment.destination.name }}
                    </h3>
                    <span class="green-vibe mx-2">
                      {{ segment.destination.iata_code }}
                    </span>
                  </div>
			<Accordion collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
              <AccordionTab :pt="accordionTabPToptions">
                <!-- accordion button -->
                <template #header>
                  <div class="flex text-sm mx-auto my-2">
                    <span class="mr-2 included_word">Connection Info </span>
                  </div>
                </template>

                <!-- accordion content -->
                <div class="grid">
					<div class="col md:6 block-spans">
						<span>Carrier</span>
						<span>Connection Number</span>
						<p></p>
						<span>Departure Info</span>
						<span>Terminal Gate</span>
						<span style="display:none">Gate</span>
						<p></p>
						<span>Arrival Info</span>
						<span>Terminal Gate</span>
						<span style="display:none">Gate</span>
					</div>
					<div class="col md:6 block-spans">
						<span>{{ segment.operating_carrier.name }}</span>
						<span>{{segment.operating_carrier.iata_code}} - {{segment.operating_carrier_flight_number}}</span>
						&nbsp;&nbsp;
						<span>{{segment.origin_terminal}}</span>
						<span style="display:none">Gate</span>
						&nbsp;&nbsp;
						<span>{{segment.destination_terminal}}</span>
						<span style="display:none">Gate</span>
					</div>
				</div>
              </AccordionTab>
            </Accordion>
                </div>
              </template> <!-- end segments -->
		</div>	
		<!-- nights of travel -->
            <template v-if="index !== duffelOrderSelected.slices.length - 1">
              <div class="" style="max-height: 1px">
                <hr class="hr-lined" />
                <span class="text-sm border-solid border-round-lg border-gray-300 px-2 relative bg-white"
                  style="bottom: 1.5rem; display: table; margin: 0 auto">
                  {{ calculateNightsOfTravel(slice, duffelOrderSelected.slices[index + 1]) }}
                  nights in destination
                </span>
              </div>
            </template> <!-- end nights of travel -->
	</template>  
  </template>
  <template v-else>
    <p>No flight selected</p>
  </template>
</template>

<script setup>
//@ts-nocheck
import dayjs from 'dayjs';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { VIBE_REVENUE_FLIGHT } from '~/utils/VibeRevenueFlight';

const props = defineProps(['duffelOrderSelected'])

const accordionTabPToptions = ref({
  root: {
    class: 'mb-0',
  },
  headerAction: {
    class: 'pl-3 pr-2 justify-content-center background_green py-0'
  },
  content: {
    class: 'pl-2 pr-2 pt-0 background_color_green'
  },
})

const baggageCarryOnAllowedComputed = computed(() => {
  const isAllowed = props.duffelOrderSelected?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(baggage => baggage?.type === 'carry_on') ?? null
  if (isAllowed) {
    return isAllowed.quantity
  }
  return 0
})

const baggageCheckedAllowedComputed = computed(() => {
  const isAllowed = props.duffelOrderSelected?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(baggage => baggage?.type === 'checked') ?? null
  if (isAllowed) {
    return isAllowed.quantity
  }
  return 0
})

function formatDateToHour(date) {
  return dayjs(date).format('HH:mm')
}

function formatOutboundDate(date) {
  return dayjs(date).format('ddd D MMM')
}

function calculateTimeBetweenDepartureAndArrivalSegment(segment) {
  const departure = dayjs(segment.departing_at);
  const arrival = dayjs(segment.arriving_at);
  const diffMinutes = arrival.diff(departure, 'minute');
  const horas = Math.floor(diffMinutes / 60);
  const minutos = diffMinutes % 60;
  return `${horas}h ${minutos}m`;
}

function calculateNightsOfTravel(oldSlice, newSlice) {

  const lastSliceFlight = dayjs(oldSlice.segments.at(-1).arriving_at);
  const newSliceFlight = dayjs(newSlice.segments.at(0).departing_at);
  const departure = dayjs(lastSliceFlight);
  const arrival = dayjs(newSliceFlight);
  const nightsOfTravel = arrival.diff(departure, 'day');

  return nightsOfTravel;
}


const totalPriceComputed = computed(() => {
  const rawPriceFlightAllPerson = parseFloat(props.duffelOrderSelected?.total_amount)
  const additionalFlightCost = rawPriceFlightAllPerson * VIBE_REVENUE_FLIGHT
  const VibeFlightsPriceAllPerson = rawPriceFlightAllPerson + additionalFlightCost
  return VibeFlightsPriceAllPerson
});


function formatAsCurrency(price, currency) {
  let number = price
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });
}

</script>
