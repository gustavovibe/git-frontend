<template>
  <div>
    <div class="flex align-items-center" style="padding-top: 40px;">
      <span class="green-dot-sm mr-2"></span>
      <span class="daily_itinerary_title"> Daily itinerary</span>
    </div>
    <div class="my-2">
      <ul>
        <!-- outbound flight -->
        <li class="text-gray-700 font-interstate" v-for="segment in outboundSliceComputed.segments">
          ✈️
          <span class="font-interstate font-medium text-gray-900">
            Day 1 ({{ formatDate(segment?.departing_at) }}):
          </span>
          departure from
          <span class="underline font-interstate">
            {{ segment?.origin?.city_name }} ({{ segment?.origin?.iata_code }})
          </span>
          at
          <span class="underline font-interstate">
            {{ formatTime(segment?.departing_at) }}
          </span> arriving at
          <span class="underline font-interstate">
            {{ segment?.destination?.city_name }} ({{ segment?.destination?.iata_code }})
          </span> at
          <span class="underline font-interstate">
            {{ formatTime(segment?.arriving_at) }}
          </span> (same day), free time
          <span class="font-interstate text-orange-vibe">(pre-tour accommodation not included: you can book it
            <a href="" class="underline font-interstate">here</a>)</span>
        </li>

        <!-- Tour itinerary -->
        <li class="text-gray-700 font-interstate m-3">
          📷
          <span class="font-interstate font-medium text-gray-900">
            Day 2-{{ tour.tourLengthDays + 2 }} ({{ getTourDepartureDate() }}):
          </span>
          tour (see <a href="#" class="underline font-interstate">itinerary</a>);
          <span class="font-interstate text-orange-vibe">
            (post-tour accommodation not included: you can book it
            <a href="" class="underline font-interstate">here</a>)
          </span>
        </li>

        <!-- Inbound flight -->
        <li class="text-gray-700 font-interstate" v-for="segment in inboundSliceComputed.segments">
          ✈️
          <span class="font-interstate font-medium text-gray-900">
            Day {{ tour.tourLengthDays + 3 }} ({{ formatDate(segment.departing_at) }}):
          </span>
          departing from
          <span class="underline font-interstate">
            {{ segment?.origin?.city_name }} ({{ segment?.origin?.iata_code }})
          </span> at
          <span class="underline font-interstate">
            {{ formatTime(segment?.arriving_at) }}
          </span>
          arriving at
          <span class="underline font-interstate">
            {{ segment?.destination?.city_name }}
            ({{ segment?.destination?.iata_code }})
          </span> at
          <span class="underline font-interstate">
            {{ formatTime(segment?.arriving_at) }}
          </span>
          (same day)
        </li>
      </ul>
    </div>
    <!-- table -->
    <div class="flex justify-content-center">
      <section class="flex flex-column col-11 responsive-table-container">
        <!-- header -->
        <div class="flex table-header-row">
          <div class="col-2 custom_border background_green text-center px-0">
            Day
          </div>
          <div class="col-4 custom_border background_green text-center px-0">
            Date
          </div>
          <div class="col-3 custom_border background_green text-center px-0">
            Flight
          </div>
          <div class="col-3 custom_border background_green text-center px-0 acc-header">
            Accommodation
          </div>
        </div>
        <!-- row outbound flight -->
        <div class="flex">
          <div class="col-2 custom_border pl-3">
            1
          </div>
          <div class="col-4 custom_border text-center">
            {{ formatDate(outboundSliceComputed?.segments?.[0]?.departing_at) }}
          </div>
          <div class="col-3 custom_border flex align-items-center justify-content-center">
            <IconsCheckListIcon />
          </div>
          <div class="col-3 custom_border flex align-items-center justify-content-center">
            <IconsCloseIcon />
          </div>
        </div>
        <!-- tour itinerary -->
        <template v-for="itinerary in tableComputed">
          <div class="flex">
            <div class="col-2 custom_border pl-3">
              {{ itinerary.day }}
            </div>
            <div class="col-4 custom_border text-center">
              {{ formatDate(itinerary.date) }}
            </div>
            <div class="col-3 custom_border flex align-items-center justify-content-center">
              <IconsCloseIcon />
            </div>
            <div class="col-3 custom_border flex align-items-center justify-content-center">
              <IconsCheckListIcon />
            </div>
          </div>
        </template>
        <!-- row inbound flight -->
        <div class="flex">
          <div class="col-2 custom_border pl-3">
            {{ tour.tourLengthDays + 3 }}
          </div>
          <div class="col-4 custom_border text-center">
            {{ formatDate(inboundSliceComputed?.segments?.[0]?.departing_at) }}
          </div>
          <div class="col-3 custom_border flex align-items-center justify-content-center">
            <IconsCheckListIcon />
          </div>
          <div class="col-3 custom_border flex align-items-center justify-content-center">
            <IconsCloseIcon />
          </div>
        </div>
      </section>
    </div>

    <!-- footer -->
    <div class="mt-2 custom_footer flex p-1 gap-2">
      <div class="flex justify-content-center align-items-center">
        <IconsExclamationIcon />
      </div>
      <div>
        <p class="m-0 this_calendar_is">
          This calendar is tailored to your departure city, departure date, and arrival date.
        </p>
        <p class="m-0 this_calendar_is">
          This part does not display internal transportation that might be included in the itinerary of the tour.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps(['tour', 'flightSelected']);

const outboundSliceComputed = computed(() => {
  return props.flightSelected.slices[0];
});

const inboundSliceComputed = computed(() => {
  return props.flightSelected.slices[1];
});

const tableComputed = computed(() => {
  const Itinerary = [];
  if (!props?.tour?.tourLengthDays || !props?.tour?.departure?.date) {
    return Itinerary;
  }

  let currentDay = 2;
  let currentDate = new Date(props.tour.departure.date);
  for (let i = 0; i <= props.tour.tourLengthDays; i++) {
    const newObj = {
      day: currentDay,
      date: currentDate,
    };
    Itinerary.push(newObj);
    currentDay++;
    currentDate = addOneDay(currentDate);
  }

  return Itinerary;
});

function addOneDay(date) {
  const clonedDate = dayjs(date);
  const datePlusOne = clonedDate.add(1, 'day');
  return datePlusOne;
}

function formatDate(date) {
  if (date) {
    return dayjs(date).format('MMM D, YYYY');
  }
  return '-';
}

function formatTime(date) {
  if (date) {
    return dayjs(date).format('HH:mm');
  }
  return '-';
}

function getTourDepartureDate() {
  const date = new Date(props.tour.departure.date);
  const departureDate = formatDate(date);
  const endDate = formatDate(dayjs(date).add(props.tour.tourLengthDays, 'days'));

  return `${departureDate} - ${endDate}`;
}
</script>

<style scoped>
.red {
  background-color: red;
}

.custom_border {
  border: 1px solid #9CA3AF;
}

.background_green {
  background: rgba(130, 207, 69, 0.10);
}

.custom_footer {
  border-radius: 5px;
  background: rgba(130, 207, 69, 0.10);
}

.this_calendar_is {
  color: #696969;
  font-family: Canaro;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px;
}

.daily_itinerary_title {
  color: #333;
  font-family: Canaro;
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  line-height: 30px;
  position: relative;
}

.daily_itinerary_title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 4px;
  width: 100%;
  height: 2px;
  background-color: #333;
}

/* Estilos responsive para la tabla */
.responsive-table-container {
  width: 100%;
  overflow-x: auto;
}

.table-header-row {
  min-width: 500px;
}

.acc-header {
  word-break: normal;
  white-space: normal;
}

/* Estilos para móvil */
@media (max-width: 768px) {
  .acc-header {
    font-size: 11px;
    line-height: 1.3;
    word-break: break-word;
    padding: 8px 2px;
  }
  
  .table-header-row {
    min-width: 100%;
  }
  
  .responsive-table-container {
    -webkit-overflow-scrolling: touch;
  }
  
  .flex > .col-2, 
  .flex > .col-3, 
  .flex > .col-4 {
    padding: 8px 2px;
  }
  
  .flex.align-items-center.justify-content-center svg {
    transform: scale(0.8);
  }
}

/* Estilos para desktop */
@media (min-width: 769px) {
  .acc-header {
    font-size: inherit;
    padding: inherit;
  }
}
</style>