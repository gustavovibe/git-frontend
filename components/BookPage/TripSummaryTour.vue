<style scoped>
.red {
  background-color: red;
}

.trip_summary_title {
  color: #333;
  font-family: Canaro;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  position: relative;
}

.custom_gray_box {
  border-radius: 10px;
  border: 1px solid #E0E0E0;
}
</style>

<template>
  <div>
    <!-- <div class="flex align-items-center">
      <span class="green-dot-sm mr-2"></span>
      <span class="trip_summary_title">
        Trip summary
      </span>
    </div> -->

    <div class="custom_gray_box py-2 mt-2">
      <div class="mx-2 flex align-items-center">
        <ExtraDaysTour v-model="items" @update:modelValue="updateItems" />
      </div>
    </div>

    <div class="py-2 mt-2">
      <div class="flex justify-content-center gap-2">
        <div class="mx-2 flex align-items-center">
          <IconsSunIcon />
          <span class="mx-2 font-bold">{{ tour?.tourLengthDays + 2 }}</span>
          <span>
            days including flights
          </span>
        </div>
        <div class="mx-2 flex align-items-center">
          <IconsHikingIcon />
          <span class="mx-2 font-bold">{{ tour?.tourLengthDays }}</span>
          <span>days in destination on the adventure</span>
        </div>
      </div>
    </div>

    <div class="mb-5">
      <div class="flex align-items-center">
        <Itinerary :items="itinerary" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExtraDaysTour from './ExtraDaysTour.vue';
import Itinerary from './Itinerary.vue';
import dayjs from 'dayjs';

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps(['tour', 'duffelSelected'])

function dayFormatted(input) {
  if (!input) return '-'
  return dayjs(input, 'DD/MM/YYYY').format('MMM D, YYYY')
}

const departureDateFromFirstSelectedFlightComputed = computed(() => {	
  const departure = props.duffelSelected?.slices?.at(0)?.segments?.at(0)?.departing_at;
  console.log("departureDateFromFirstSelectedFlightComputed",departure);	
  if (departure) {
    const departureDate = dayjs(departure);
    return departureDate.format("DD/MM/YYYY");
  }
  return "-"
});

const arrivalDateFromLastSelectedFlightComputed = computed(() => {
  const arrival = props.duffelSelected?.slices?.at(-1)?.segments?.at(-1)?.arriving_at;
   console.log("arrivalDateFromFirstSelectedFlightComputed",arrival);	
  if (arrival) {
	const arrivalDate = dayjs(arrival);
    return arrivalDate.format("DD/MM/YYYY");
  }
  return "-"
});

const tourDatesComputed = computed(() => {
  const date = props.tour?.departure?.date
  if (!date) return '-'
  const departureDate = dayFormatted(dayjs(date))
  const endDate = dayFormatted(dayjs(date).add(props.tour.tourLengthDays, 'days'))
  return `${departureDate} - ${endDate}`
});

// Make itinerary computed so it updates when any dependency changes
const itinerary = computed(() => [
  {
    title: "Travel to Destination",
    icon: "pi pi-send",
    date: dayFormatted(departureDateFromFirstSelectedFlightComputed.value),
    details: [
      { label: "Flights", status: "Included" },
      { label: "Accommodation", status: "Not Included" }
    ]
  },
  {
    title: `Tour (Days 1-${props.tour?.tourLengthDays ?? '?'})`,
    icon: "pi pi-map",
    date: tourDatesComputed.value,
    highlight: true,
    details: [
      { label: "Accommodations", status: "Included" }
    ]
  },
  {
    title: "Return Travel",
    icon: "pi pi-send",
    date: dayFormatted(arrivalDateFromLastSelectedFlightComputed.value),
    details: [
      { label: "Flights", status: "Included" },
      { label: "Accommodation", status: "Not Included" }
    ]
  }
]);

const startCity = computed(() => {
  const startCity = props.tour?.start_city?.city_name ?? ''
  const countryCode = props.tour?.start_city?.country_code ?? ''
  return `${startCity}, ${countryCode}`
})

const endCity = computed(() => {
  const endCity = props.tour?.end_city?.city_name ?? ''
  const countryCode = props.tour?.end_city?.country_code ?? ''
  return `${endCity}, ${countryCode}`
})

// If you want items to react to tour changes, make them computed as well:
const items = computed(() => ([
  {
    id: 1,
    title: 'Pre-Tour Nights',
    location: startCity.value,
    image: props.tour?.images?.at(0) ?? null,
    quantity: 1,
    min: 0,
    max: 10,
    step: 1
  },
  {
    id: 2,
    title: 'Post-Tour Nights',
    location: endCity.value,
    image: props.tour?.images?.at(-1) ?? null,
    quantity: 1,
    min: 0,
    max: 10,
    step: 1
  }
]))

function updateItems(payload){
  emit('update:modelValue', payload);
}
</script>
