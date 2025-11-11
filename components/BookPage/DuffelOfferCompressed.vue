<style>
.red {
  background-color: red;
}

.background_color_green {
  background-color: rgba(130, 207, 69, 0.10);
}

.background_green {
  background: rgba(130, 207, 69, 0.10) !important;
}

.included_word {
  color: #4F5E71;
  font-family: "Segoe UI";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.gray-box{
		background-color: #dcdcdc;
		padding: 10px 20px;
	}
</style>

<template>
  <template v-if="duffelOfferSelected">
    <div class="flex flex-wrap mb-3">
      <!-- first column -->
      <div class="col-12 p-0">
          <template v-if="duffelOfferSelected?.slices?.length" v-for="(slice, index) in duffelOfferSelected.slices">
            <!-- slice --> 
            <div class="mb-4 mt-2 border-1 border-gray-300 border-round-sm">
			  <span style="margin-left: auto;margin-right: 0px;color: #82cf4530;display: block;width: fit-content;padding: 5px;">
				  <img src="~/public/filter-icons/duration.svg" />
				  {{calculateTimeBetweenDepartureAndArrivalSegment(slice)}}
			  </span>	
              <!-- segments -->
              <template v-if="slice.segments.length" class="selectedOfferSlice">
			  <div v-for="(segment, idx) in slice.segments" :key="segment.id || idx">
                <div class="timestamps-line" style="width: 10px;position: absolute;">
                  <img src="~/assets/icons/timeline.svg" alt="timeline" style="margin-top:20px" />
                </div>

                <div class="ml-3">
                  <div v-if="showDeparture(idx, slice)" class="flex align-items-center my-2">
                    <span class="text-gray-700 text-right text-xs" style="width: 55px">
                      <div class="departing time">{{ formatOutboundDate(segment.departing_at).time }}</div>
      				  <div class="departing date" style="font-size: 8px !important;">
						  {{ formatOutboundDate(segment.departing_at).date }}
					  </div>
                    </span>
                    <h3 v-tooltip.top="segment.origin.city_name" class="mb-0 text-sm font-medium ml-5"
                      style="margin-top: 0.25rem">
						<strong class="green-vibe mx-2">
							{{ segment.origin.city_name }} - {{ segment.origin.iata_city_code }}
						</strong><br>
                      {{ segment.origin.name }}
                    </h3>
                  </div>
                  <div class="flex align-items-center">
                    <span class="text-xs" style="width: fit-content;background: #82cf4530;text-align: center;border-radius: 5px;color: #82cf45;border: 1px solid;padding: 0px 5px;margin-left: 5px;">
                      {{ calculateTimeBetweenDepartureAndArrivalSegment(segment) }}
                    </span>
                    <img class="ml-5 h-1rem mr-2"
                      :src="segment?.marketing_carrier?.logo_symbol_url" alt="carrier icon" />
                    <span class="light-green-vibe-back text-xs py-1 px-2 border-round-xl">
						{{segment?.marketing_carrier?.name}}
					</span>
                  </div>
                  <div class="flex my-2 align-items-center">
                    <span class="text-gray-700 text-right text-xs" style="width: 50px">
                      <div class="departing time">{{ formatOutboundDate(segment.arriving_at).time }}</div>
      				  <div class="departing date" style="font-size: 10px !important;">
					  	{{ formatOutboundDate(segment.arriving_at).date }}
					  </div>
                    </span>
                    <h3 v-tooltip.top="segment.destination.city_name" class="mb-0 text-sm font-medium ml-5"
                      style="margin-top: 0.25rem">
                      <strong class="green-vibe mx-2">
							{{ segment.destination.city_name }} - {{ segment.destination.iata_city_code }}
						</strong><br>
                      {{ segment.destination.name }}
                    </h3>
                  </div>
				  <div v-if="hasContinuousNext(idx, slice)" class="block w-full">
						<div class="layover-badge">
						  {{ calculateLayover(segment.arriving_at, slice.segments[idx + 1].departing_at) }} layover
						</div>
				  </div>	
                </div>
			  </div>	  
              </template> <!-- end segments -->

				<div style="text-align: center;">
                    1
                    <IconsBaggagePersonalItemIcon />
					|
					{{ baggageCarryOnAllowedComputed }}
                      <IconsBaggageCabinIcon />
					|
					{{ baggageCheckedAllowedComputed }}
                    <IconsBaggageCabinIcon />
                 </div>
            </div> <!-- end slice -->

            <!-- nights of travel -->
            <template v-if="index !== duffelOfferSelected.slices.length - 1">
                <span class="text-sm border-solid border-round-lg border-gray-300 px-2 relative bg-white"
                  style="display: block;margin: 0 auto;width: fit-content;">
                  {{ tourDays }} nights in destination</span>
            </template> <!-- end nights of travel -->

          </template>
      </div>
    </div>
  </template>
  
  <template v-else>
    <p>No flight selected</p>
  </template>
  <div class="gray-box">Please review the terms and conditions of each airline before checking in, as baggage policies may differ between airlines.</div>
</template>

<script setup>
//@ts-nocheck
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';	
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { VIBE_REVENUE_FLIGHT } from '~/utils/VibeRevenueFlight';
import SeatMap from '~/components/BookPage/SeatMap'

dayjs.extend(duration);	
	
const props = defineProps(['duffelOfferSelected', 'totalPriceProps', 'tourDays']);	
//console.log("totalPriceProps on DuffelOfferSelected: ",props.totalPriceProps);	

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
	
const tourDays = ref();
	
tourDays.value = props.tourDays;	
	
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
  const isAllowed = props.duffelOfferSelected?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(baggage => baggage?.type === 'carry_on') ?? null
  if (isAllowed) {
    return isAllowed.quantity
  }
  return 0
})

const baggageCheckedAllowedComputed = computed(() => {
  const isAllowed = props.duffelOfferSelected?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(baggage => baggage?.type === 'checked') ?? null
  if (isAllowed) {
    return isAllowed.quantity
  }
  return 0
})

function formatDateToHour(date) {
  return dayjs(date).format('HH:mm')
}

const formatOutboundDate = (dateString) => {
  const date = dayjs(dateString);
  return {
    time: date.format("HH:mm"),
    date: date.format('MMM D, YYYY'),
  };
};

function calculateTimeBetweenDepartureAndArrivalSegment(segment) {
  //console.log("segment duration",segment.duration);
  const duration = dayjs.duration(segment.duration);
  //console.log("segment dayjs duration",duration);	
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


const totalPriceComputed = computed(() => {
  const rawPriceFlightAllPerson = parseFloat(props.duffelOfferSelected?.total_amount)
  const additionalFlightCost = rawPriceFlightAllPerson * VIBE_REVENUE_FLIGHT
  const VibeFlightsPriceAllPerson = rawPriceFlightAllPerson + additionalFlightCost
  return VibeFlightsPriceAllPerson
});


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


</script>
