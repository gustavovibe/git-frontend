<style>
.background_color_white {
  background-color: white;
}

.background_white {
  background: white !important;
}

.included_word {
  color: #4F5E71;
  font-family: "Segoe UI";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.layover-badge {
    margin: 0 auto;
    border: 1px solid #82cf45;
    border-radius: 6px;
    font-size: .9rem;
    font-weight: 600;
    padding: 6px 12px;
    width: 200px;
    display: block;
    text-align: center;
}	
</style>

<template>
  <template v-if="duffelOfferSelected && duffelRequest" v-for="offer in duffelRequest.offers">
    <template v-if="offer.id !== duffelOfferSelected.id">
      <div class="flex flex-wrap mb-3">
        <!-- first column -->
        <div class="col-12 lg:col-8 p-0">
          <div class="border-1 border-gray-300 border-round-sm">
            <template v-if="offer?.slices?.length" v-for="(slice, index) in offer.slices">
              <!-- slice -->
              <div class="mb-4 mt-2">
                <div class="flex justify-content-between ml-3 my-3">
                  <div class="text-sm text-gray-600">
                    <span v-tooltip.top="offer.id">{{ formatOutboundDate(slice.segments[0].departing_at) }}</span>
                    <span v-if="index === 0"> • Outbound</span>
                    <span v-if="index === offer.slices.length - 1"> • Inbound</span>
                  </div>
                  <!-- <img class="mr-4" style="height: 0.7rem" src="~/assets/icons/pushpin-icon.svg" alt="" /> -->
                </div>
				<template v-if="slice.segments.length" class="selectedOfferSlice">
              <div v-for="(segment, idx) in slice.segments" :key="segment.id || idx">
              <div class="timestamps-line" style="width: 10px; position: absolute;">
                <img src="~/assets/icons/timeline.svg" alt="timeline" />
              </div>

              <div class="ml-3">
                <!-- Show departure only if first segment OR origin different from previous segment destination -->
                <div v-if="showDeparture(idx, slice)" class="flex align-items-center my-2">
                <span class="text-gray-700 text-right text-sm" style="width: 70px">
                  <span class="text-sm">{{ formatDateToHour(segment.departing_at) }}</span>
                  <br>
                  <span class="text-xs">{{ formatOutboundDate(segment.departing_at) }}</span>
                </span>

                <h3 v-tooltip.top="segment.origin.city_name"
                  class="mb-0 text-sm font-medium ml-5"
                  style="margin-top: 0.25rem">
                  {{ segment.origin.name }}
                </h3>

                <span class="green-vibe mx-2"
                    v-tooltip.top="`${segment.origin.city_name}, ${segment.origin.name} (${segment.origin.iata_code})`">
                  {{ segment.origin.iata_code }}
                </span>
                </div>
                <div class="flex align-items-center">
                          <span class="text-gray-700 text-right text-xs" style="width: 70px">
                            {{ calculateTimeBetweenDepartureAndArrivalSegment(segment) }}
                          </span>
                          <img v-tooltip.top="`${segment?.marketing_carrier?.name}, ${segment?.operating_carrier_flight_number}`" class="ml-5 h-1rem mr-2" :src="segment?.marketing_carrier?.logo_symbol_url" alt="carrier icon" />
                          <!-- <img class="mx-3 surface-200 py-1 px-2 border-round-xl" style="height: 1.3rem"
                            src="~/assets/icons/plane-icon.svg" alt="plane icon" /> -->
                          <span v-if="segment.passengers[0].cabin_class" class="capitalize light-green-vibe-back text-xs py-1 px-2 border-round-xl">
                  {{segment.passengers[0].cabin_class}}
                </span>
                        </div>	
                <!-- Arrival of current segment -->
                <div class="flex my-2 align-items-center">
                <span class="text-gray-700 text-right text-xs" style="width: 70px">
                  {{ formatDateToHour(segment.arriving_at) }}	
                  <span v-if="!sameDay(segment.departing_at, segment.arriving_at)" v-tooltip.top="'Arrives next day'" style="color:red">+1</span>
                  <br>
                  <span class="text-xs">{{ formatOutboundDate(segment.arriving_at) }}</span>	
                </span>

                <h3 v-tooltip.top="segment.destination.city_name"
                  class="mb-0 text-sm font-medium ml-5"
                  style="margin-top: 0.25rem">
                  {{ segment.destination.name }}
                </h3>

                <span class="green-vibe mx-2"
                    v-tooltip.top="`${segment.destination.city_name}, ${segment.destination.name} (${segment.destination.iata_code})`">
                  {{ segment.destination.iata_code }}
                </span>
                </div>

                <!-- If next segment exists and is same airport, show layover badge -->
                <div v-if="hasContinuousNext(idx, slice)" class="block w-full">
                <div class="layover-badge">
                  {{ calculateLayover(segment.arriving_at, slice.segments[idx + 1].departing_at) }} layover
                </div>
                </div>
              </div>
              </div>
            </template>

          		</div> <!-- end slice -->

              <!-- nights of travel -->
              <template v-if="index !== offer.slices.length - 1">
                <div class="" style="max-height: 30px">
					<hr class="hr-lined" />
					<span class="text-sm layover-badge"
					  style="bottom: 0.6rem; display: table; margin: 0 auto">
					  {{ calculateNightsOfTravel(slice, duffelOfferSelected.slices[index + 1]) }}
					  nights in the destination
					</span>
				  </div>
              </template> <!-- end nights of travel -->

            </template>

          </div>
        </div>

        <!-- second column -->
        <div class="col-12 lg:col-4 py-0 lg:pr-0 lg:pl-2 px-0 flex">
          <div class="border-1 border-gray-300 border-round-sm align-content-center"
            style="width: -webkit-fill-available">
            <div class="flex flex-column my-3 lg:my-0">
              <!-- price -->
              <p class="font-semibold text-xl green-vibe mx-auto mb-3 hidden">
                {{ $currencyDecimal(getVibeFlightsPriceAllPerson(offer)) }}
                <span class="text-sm font-light text-black-alpha-90">per group</span>
              </p>
			  <!-- button -->
              <button @click="selectNewDuffelOffer(offer)"
                class="font-interstate back-green-vibe text-white mx-auto border-round mt-3 py-2"
                style="width: 90%; cursor: pointer;">
                Select
              </button>
              <!-- accordion -->
              <Accordion collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
                <AccordionTab :pt="accordionTabPToptions">
                  <!-- accordion button -->
                  <template #header>
                    <div class="flex text-sm mx-auto my-2">
                      <span class="mr-2 included_word">Included: </span>
                      <div class="flex flex-nowrap align-items-center" style="display: contents">
                        1
                        <IconsBaggagePersonalItemIcon />
                      </div>
                      |
                      <div class="flex flex-nowrap align-items-center" style="display: contents">
                        {{ calculateCabinBaggage(offer) }}
                        <IconsBaggageCabinIcon />
                      </div>
                      |
                      <div class="flex flex-nowrap align-items-center" style="display: contents">
                        <span>
                          {{ calculateCheckedBaggage(offer) }}
                        </span>
                        <IconsBaggageToBeCheckedIcon />
                      </div>
                    </div>
                  </template>

                  <!-- accordion content -->
                  <div class="flex justify-content-between mx-2">
                    <p>Baggage breakdown</p>
                  </div>
                  <table class="text-sm mx-2">
                    <!-- personal item -->
                    <tr>
                      <td>
                        <img class="mx-1" style="height: 0.8rem" src="~/assets/icons/briefcase-icon.svg" alt="" />
                      </td>
                      <td><span>1</span>x Personal item</td>
                      <td><i class="pi pi-check mx-1 text-green-vibe"></i>Included</td>
                    </tr>
                    <!-- cabin -->
                    <tr>
                      <td>
                        <img class="mx-1" style="height: 1rem" src="~/assets/icons/travel-luggage-icon.svg" alt="" />
                      </td>
                      <td><span>{{ calculateCabinBaggage(offer) }}</span>x Cabin item</td>
                      <td><i class="pi pi-check mx-1 text-green-vibe"></i>Included</td>
                    </tr>
                    <!-- checked baggage -->
                    <tr>
                      <td>
                        <img class="mx-1" style="height: 1rem" src="~/assets/icons/travel-bag-lock-icon.svg" alt="" />
                      </td>
                      <td><span>{{ calculateCheckedBaggage(offer) }}</span>x Checked item</td>
                    </tr>
                  </table>
                </AccordionTab>
              </Accordion>
			  <button class="font-interstate mx-auto border-round mt-3 py-2" @click="visible = true" style="background: transparent;
    border-style: dotted;">
				See fare conditions <i class="pi pi-question text-orange-vibe" style="font-size:16px"></i>
			</button>
				  <Dialog v-model:visible="visible" modal header="Fare Conditions" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
				<template #header>
					<div class="inline-flex align-items-center justify-content-center">
						<span class="font-bold white-space-nowrap">Fare Conditions*</span>
					</div>
				</template>
				<div class="m-0" v-if="offer">
						<div class="flex">
							<strong>Refundability:</strong> Non-refundable except under extraordinary circumstances.
						</div><br>
						<div class="flex">
							<strong >Changes:</strong>
							<div v-if="offer.conditions?.change_before_departure?.allowed == true">	
							{{offer.conditions.change_before_departure.penalty_currency}}		
							{{offer.conditions.change_before_departure.penalty_amount}} USD Fee applies
							</div><div v-else> Not allowed</div>
						</div><br>	
						<div>
							<strong>Baggage Included:</strong>
							<ul style="margin-top: 0px;margin-bottom: 0px;">
								<li>{{ baggageCheckedAllowedComputed }} checked baggage.</li>
								<li>{{ baggageCarryOnAllowedComputed }} carry-on baggage.</li>
								<li>1 personal item.</li>
							</ul>
						</div><br>
						<div class="flex">
							<strong>Seat Selection:</strong> 
							<div v-if="offer.slices[0]?.conditions?.advance_seat_selection != null">	
							{{offer.slices[0].conditions.advance_seat_selection}}		
							</div><div v-else> Not included</div>
						</div><br>
						<div class="flex">
							<strong>Priority Boarding:</strong>
							<div v-if="offer.slices[0]?.conditions?.priority_boarding != null">	
							{{offer.slices[0].conditions.priority_boarding}}		
							</div><div v-else> Not included</div>
						</div><br>
						<div class="flex">
							<strong>Priority Check-in:</strong>
							<div v-if="offer.slices[0]?.conditions?.priority_check_in != null">	
							{{offer.slices[0].conditions.priority_check_in}}		
							</div><div v-else> Not included</div>
						</div><br>	
						<span style="color:red">*</span>Please check the airline's website for further details.
					</div>
			</Dialog> 
              
            </div>
          </div>
        </div>

      </div>
    </template>



  </template>
  <template v-else>
    <p>Something went wrong. No more flights available to show</p>
  </template>
</template>

<script setup>
//@ts-nocheck
import dayjs from 'dayjs';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { VIBE_REVENUE_FLIGHT } from '~/utils/VibeRevenueFlight';
import SeatMap from '~/components/BookPage/SeatMap'
import Dialog from 'primevue/dialog';
import { useToast } from "primevue/usetoast";	
const toast = useToast();
const visible = ref(false);
	
const props = defineProps(['duffelOfferSelected', 'duffelRequest', 'selectNewDuffelOffer', 'priceSummaryDetailsWithoutFlightProps', 'totalTravelersProps', 'departureStored'])

const duffelRequest = ref();	
//console.log("priceSummaryDetailsWithoutFlightProps",props.priceSummaryDetailsWithoutFlightProps);

if(props.departureStored){
	duffelRequest.value=props.departureStored;
	console.log("duffelRequest.value",duffelRequest.value);	
}
	
const priceProps = ref();		
	
const priceSummaryItemsNames = ref({
  default: 'default',
  accommodation: 'accommodation',
  mandatoryAddons: 'mandatoryAddons',
  flight: 'flight',
  optionalExtra: 'optionalExtra',
})

const passengerTypes = ref({
  adult: 'adult',
  child: 'child',
  infant: 'infant'
})

function sameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const accordionTabPToptions = ref({
  root: {
    class: 'mb-0',
  },
  headerAction: {
    class: 'pl-3 pr-2 justify-content-center py-0'
  },
  content: {
    class: 'pl-2 pr-2 pt-0'
  },
})

function calculateCabinBaggage(offer) {
  const isAllowed = offer?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(baggage => baggage?.type === 'carry_on') ?? null
  if (isAllowed) {
    return isAllowed.quantity
  }
  return 0
}

function calculateCheckedBaggage(offer) {
  const isAllowed = offer?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(baggage => baggage?.type === 'checked') ?? null
  if (isAllowed) {
    return isAllowed.quantity
  }
  return 0
}

function formatDateToHour(date) {
  return dayjs(date).format('HH:mm')
}

function calculateTimeBetweenDepartureAndArrivalSegment(segment) {
  //console.log("duration",segment.duration);
  const duration = dayjs.duration(segment.duration);
  //console.log("duration",duration);	
  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${hours}h ${minutes}m`;
}

function calculateNightsOfTravel(oldSlice, newSlice) {

  const lastSliceFlight = dayjs(oldSlice.segments.at(-1).arriving_at);
  const newSliceFlight = dayjs(newSlice.segments.at(0).departing_at);

  const departure = dayjs(lastSliceFlight);
  const arrival = dayjs(newSliceFlight);
  const nightsOfTravel = arrival.diff(departure, 'day');

  return nightsOfTravel;
}

function gettTotalPrice(offer) {
  // flight item
  const flightItem = getFlightItem(offer)

  // all items
  const items = [
    ...props.priceSummaryDetailsWithoutFlightProps,
    flightItem
  ]

  // calculating
  let total = 0
  for (const item of items) {
    total += item.totalPrice
  }
  return formatAsCurrency(total, 'USD')
}

function getFlightItem(offer) {
  const vibeFlightsPriceAllPerson = getVibeFlightsPriceAllPerson(offer)

  const unitPrice = vibeFlightsPriceAllPerson / parseInt(props.totalTravelersProps)

  const item = {
    itemName: priceSummaryItemsNames.value.flight,
    unitPrice: unitPrice,
    totalPrice: vibeFlightsPriceAllPerson,
    passengers: parseInt(props.totalTravelersProps),
    passengerType: passengerTypes.value.adult,
    details: null
  }
  return item
}

function getVibeFlightsPriceAllPerson(offer) {
  if (!offer?.total_amount) {
    return null
  }
  if(props.priceSummaryDetailsWithoutFlightProps){	
  	priceProps.value = props.priceSummaryDetailsWithoutFlightProps[0]?.totalPrice;	
  }
  //console.log("priceProps.value",priceProps.value);	
	
  const tourPrice = priceProps.value * props.totalTravelersProps;	
	
  // RAW PRICES
  const rawPriceFlightAllPerson = parseFloat(offer.total_amount);

  // VIBE FLIGHT PRICE = RAW PRICE + ADDITIONAL COST
  const vibeFlightsPriceAllPerson = rawPriceFlightAllPerson + tourPrice;

  // rounded
  return (vibeFlightsPriceAllPerson * 1.15).toFixed(2) ?? 0;	
}


function formatAsCurrency(price, currency) {
  let number = Math.ceil(price); // Remove the extra dot before Math.ceil
  if (!number) {
    return "-";
  }
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // No decimals
    maximumFractionDigits: 0, // No decimals
  });
}


function formatOutboundDate(date) {
  return dayjs(date).format('ddd D MMM')
}
	

  // true when next exists and next.origin == current.destination
function hasContinuousNext(idx, slice) {
  if (!slice || !Array.isArray(slice.segments)) return false;
  const curr = slice.segments[idx];
  const next = slice.segments[idx + 1];
  if (!curr || !next) return false;
  return curr.destination?.iata_code === next.origin?.iata_code;
}


  // returns "1 h 40 min" or "40 min" or "—" if negative/invalid
function  calculateLayover(arrivalAt, nextDepartureAt) {
    if (!arrivalAt || !nextDepartureAt) {return "—"};
    const a = new Date(arrivalAt);
    const b = new Date(nextDepartureAt);
    const diffMs = b - a;
    if (isNaN(diffMs) || diffMs <= 0) {return "—"};
    const minsTotal = Math.round(diffMs / 60000);
    const hours = Math.floor(minsTotal / 60);
    const mins = minsTotal % 60;
    if (hours > 0) {
      return `${hours} h${mins > 0 ? ` ${mins} min` : ""}`;
    }
    return `${mins} min`;
  };
function showDeparture(idx, slice) {
  // first segment: always show
  if (idx === 0) return true;

  // defensive checks
  if (!slice || !Array.isArray(slice.segments)) return true;
  const prev = slice.segments[idx - 1];
  const curr = slice.segments[idx];
  if (!prev || !curr) return true;

  // hide origin when previous segment destination equals current origin (direct duplicate)
  return prev.destination?.iata_code !== curr.origin?.iata_code;
}	
</script>