<script setup>
import { ref, onMounted } from "vue";
import dayjs from 'dayjs';
import Skeleton from 'primevue/skeleton';
import { useGeneralFunctions } from '@/store/general';

const generalStore = useGeneralFunctions();
const config = useRuntimeConfig();
const departureSelected = ref('');
const destinationsSelected = ref([]);
const totalTravelers = ref(0);
const dateSelected = ref([]);
const adultsCount = ref(0);
const childrenCount = ref(0);
const infantsCount = ref(0);
const tours = ref([]);
const isLoading = ref(true);
const formattedDates = ref([]);
import { storeToRefs } from 'pinia'

// Define global reactive references
const homeFormStore = useHomeFormStore();
const { datesSelected } = storeToRefs(homeFormStore);

watch(datesSelected, (newDates) => {
  if (datesSelected.value) {
    datesSelected.value = newDates;
    formattedDates.value = formatDates(datesSelected.value);
    searchTours();
  }
});

const getKiwiIDFromTourradarID = async (tourradarID) => {
  try {
    const { data } = await useFetch(`${config.public.FRONTEND_URL}/cities.json`);
    const city = data.value.find((city) => city.TourradarID === tourradarID);
    return city?.kiwiId ?? null
  } catch (error) {
    console.error('Error fetching city data in getKiwiIDFromTourradarID():', error);
    throw error;
  }
};

const constructTourRadarAPI = (destinationsSelected) => {
  const destinationParams = destinationsSelected
    .map(destination => `${destination.type}=${destination.t_id}`)
    .join('&');
  return `${config.public.BACKEND_URL}/api/tours?${destinationParams}`;
};

const getPossibleDepartures = (tour) => {
  const tourLengthDays = tour.tour_length_days;
  const possibleDepartures = []

  for (const departure of tour.availableDepartures) {
    const startDate = new Date(departure.date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(tourLengthDays));
    const availability = departure.availability;
    const dateSelected1 = new Date(new Date(dateSelected.value[1]).getTime());
    const dateSelected2 = new Date(new Date(dateSelected.value[2]).getTime());
    const isPossibleDeparture = startDate >= dateSelected.value[0] &&
      startDate <= dateSelected1 &&
      endDate >= dateSelected2 &&
      endDate <= dateSelected.value[3] && availability >= totalTravelers.value

    if (isPossibleDeparture) {
      possibleDepartures.push(departure);
    }
  }
  return possibleDepartures
}

const getDeparturePromise = (tourId, dateRange) => {
  const url = `${config.public.BACKEND_URL}/api/departures/?tourId=${tourId}&date_range=${dateRange}`;
  const options = {
    headers: {
      'accept': 'application/json',
    },
  }
  return useFetch(url, options);
}

const getStartKiwiDate = (startDate) => {
  const parts = startDate.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const getDateInKiwiFormat = (endDate) => {
  return dayjs(endDate).format('DD/MM/YYYY');
}

const calculateTourEndDate = (departureDate, tourLengthDays) => {
  const endDate = new Date(departureDate);
  endDate.setDate(endDate.getDate() + Number(tourLengthDays));
  return endDate;
};

const getEndCity = (cities) => {
  return {
    city_name: cities.slice(-1)[0].city.city_name
  }
}

const getKiwiDateFrom = (dapartureDate) => {
  const date = new Date(dapartureDate);
  const newDateMinusOne = new Date(date.setDate(date.getDate() - 1));
  return getDateInKiwiFormat(newDateMinusOne)
}

const getFlightsForPossibleDepartures = async (tour) => {
  const tourLengthDays = tour.tour_length_days;

  for (let i = 0; i < tour.possibleDepartures.length; i++) {
    const departure = tour.possibleDepartures[i];
    const tourEndDate = calculateTourEndDate(departure.date, tourLengthDays)
    const firstDateFrom = getKiwiDateFrom(departure.date);
    const firstDateTo = getDateInKiwiFormat(departure.date);
    const lastDateFrom = getDateInKiwiFormat(tourEndDate);
    const firstFlightTo = await getKiwiIDFromTourradarID(tour.start_city);
    const lastFlightFrom = await getKiwiIDFromTourradarID(tour.end_city);
    const startFlight = await searchFirstFlight(firstDateFrom, firstDateTo, firstFlightTo, tour);
    const returnFlight = await searchLastFlight(lastDateFrom, lastFlightFrom, tour);
    tour.possibleDepartures[i]['kiwi'] = {
      tourEndDate,
      firstDateTo,
      lastDateFrom,
      firstFlightTo,
      lastFlightFrom,
      startFlight,
      returnFlight
    }
  }
  return tour.possibleDepartures
}

const tourradarIterator = async (items) => {
  const departurePromises = [];
  const dateRange = `${formattedDates.value[0]}-${formattedDates.value[1]}`

  for (const tour of items) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const departurePromise = getDeparturePromise(tour.tour_id, dateRange)
    departurePromises.push(departurePromise);
  }

  try {
    const departureResponses = await Promise.all(departurePromises);

    const combinedTours = [];

    for (let i = 0; i < items.length; i++) {
      const tour = items[i];
      tour.availableDepartures = departureResponses[i]?.data?.value?.data?.items ?? [];
      tour.possibleDepartures = getPossibleDepartures(tour);
      const hasPossibleDepartures = tour.possibleDepartures.length
      if (!hasPossibleDepartures) { continue }

      tour.endCity = getEndCity(tour.cities);
      tour.style = findTourStyle(tour.type);
      tour.possibleDepartures = await getFlightsForPossibleDepartures(tour)

      combinedTours.push(tour);
    }

    if (combinedTours.length > 0) {
      tours.value = combinedTours;
    }
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching departure data:', error);
  }
};

const findTourStyle = (types) => {
  const idsToMatch = [4, 32, 56, 73, 77, 178, 189, 209, 330, 381, 383];
  const firstMatchingType = types.find(type => idsToMatch.includes(type.type.tourtype_id));
  return firstMatchingType ? firstMatchingType.type.tourtype_name : null;
};

const searchFirstFlight = async (kiwiDateFrom, kiwiDateTo, kiwiFlyTo, tour) => {
  try {
    const apiUrl = `${config.public.KIWIAPI_URL}/v2/search?`;
    const params = {
      fly_from: departureSelected.value,
      fly_to: kiwiFlyTo,
      date_from: kiwiDateFrom,
      date_to: kiwiDateTo,
      ret_from_diff_city: false,
      ret_to_diff_city: false,
      only_working_days: false,
      only_weekends: false,
      partner_market: 'us',
      curr: 'USD',
      locale: 'en',
      vehicle_type: 'aircraft,bus,train',
      limit: 1,
      sort: 'price',
      max_fly_duration: 24,
      atime_to: '7:00',
      adults: adultsCount.value,
      children: childrenCount.value,
      infants: infantsCount.value,
    };
    // Set your API key in the headers
    const headers = {
      'Accept': 'application/json',
      'apikey': config.public.KIWIAPI_KEY,
    };

    const response = await useFetch(apiUrl, {
      params: params,
      headers: headers,
    });

    const flightsData = response.data;
    if (flightsData.value.data) {
      const startFlight = {
        departure: flightsData.value.data[0].local_departure,
        price: (flightsData.value.data[0].price) / totalTravelers.value,
      };
      tour.startFlight = startFlight;
      return { flightsData, startFlight };
    } else {
      console.error("no start flights found");
    }
  } catch (error) {
    console.error('Error fetching flights to tour start:', error);
    // Continue execution despite the error
  }
};



const searchLastFlight = async (dateFrom, flyFrom, tour) => {
  const apiUrl = `${config.public.KIWIAPI_URL}/v2/search?`;
  const params = {
    fly_from: flyFrom,
    fly_to: departureSelected.value,
    date_from: dateFrom,
    ret_from_diff_city: false,
    ret_to_diff_city: false,
    only_working_days: false,
    only_weekends: false,
    partner_market: 'us',
    curr: 'USD',
    locale: 'en',
    vehicle_type: 'aircraft,bus,train',
    limit: 1,
    sort: 'price',
    adults: adultsCount.value,
    children: childrenCount.value,
    infants: infantsCount.value,
    max_fly_duration: 24,
    dtime_from: '21:00',
  };
  // Set your API key in the headers
  const headers = {
    'Accept': 'application/json',
    'apikey': config.public.KIWIAPI_KEY,
  };

  try {
    const response = await useFetch(apiUrl, {
      params: params,
      headers: headers,
    });

    const flightsData = response.data;
    if (flightsData.value.data) {
      const returnFlight = {
        arrival: flightsData.value.data[0].local_arrival,
        price: (flightsData.value.data[0].price) / totalTravelers.value,
      };
      // Update the tour with startFlight information
      tour.returnFlight = returnFlight;
      return { flightsData, returnFlight };
    } else { console.error("no return flights found"); }
  } catch (error) {
    console.error('Error fetching flights to tour start:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

const searchTours = async () => {
  try {
    if (departureSelected.value && destinationsSelected.value) {
      const tourradarAPI = constructTourRadarAPI(destinationsSelected.value);
      const tourradarResponse = await useFetch(tourradarAPI, {
        headers: {
          'accept': 'application/json',
        },
      });
      const tourradarData = tourradarResponse.data.value.data;
      const items = [
        ...tourradarData.country || [],
        ...tourradarData.city || [],
        ...tourradarData.natural_destinations || []
      ];
      tourradarIterator(items);
    }
  } catch (error) {
    console.error('Error fetching data from APIs', error);
  }
};

const formatDates = (dates) => {
  // Adding 1 day to the first element
  dates[0] = new Date(dates[0]).getTime() + (24 * 60 * 60 * 1000);

  // Subtracting 1 day from the fourth element
  dates[3] = new Date(dates[3]).getTime() - (24 * 60 * 60 * 1000);

  // Formatting dates
  return dates.map(date => new Date(date).toISOString().slice(0, 10).replace(/-/g, ''));
};

const convertDatesFromStringToArray = (datesAsText) => {
  return datesAsText ? datesAsText.split(',') : [];
}

const formatDestinations = (t_id, type) => {
  return [
    {
      t_id: parseInt(t_id),
      type: type || 'unknown'
    }
  ]
}

onMounted(async () => {
  nextTick(() => {
    const queryParams = new URLSearchParams(window.location.search);
    destinationsSelected.value = formatDestinations(queryParams.get('t_id'), queryParams.get('type'))
    departureSelected.value = queryParams.get('departureSelected');
    dateSelected.value = convertDatesFromStringToArray(queryParams.get('datesSelected'));
    formattedDates.value = formatDates(dateSelected.value);
    adultsCount.value = parseInt(queryParams.get('adultsCount'));
    childrenCount.value = parseInt(queryParams.get('childrenCount'));
    infantsCount.value = parseInt(queryParams.get('infantsCount'));
    totalTravelers.value = parseInt(adultsCount.value + childrenCount.value + infantsCount.value);
    const shouldGetTours = queryParams.get('search') == "true";
    if (shouldGetTours) {
      searchTours();
    }
  });
});

const handleSeeTrip = (tour) => {
  const baseUrl = config.public.FRONTEND_URL;
  const path = "/tour";
  const params = new URLSearchParams();
  const departure_range = `${formattedDates.value[0]}-${formattedDates.value[1]}`
  params.set("tourId", tour.tour_id);
  params.set("departure_range", departure_range);
  params.set("departure_fly_from", departureSelected.value);
  params.set("departure_fly_to", tour.start_city);
  params.set("adultsCount", adultsCount.value);
  params.set("childrenCount", childrenCount.value);
  params.set("infantsCount", infantsCount.value);
  params.set("dateSelected", dateSelected.value);
  params.set("totalTravelers", totalTravelers.value);

  const url = `${baseUrl}${path}?${params.toString()}`
  window.open(url, '_blank', 'noopener');
};
</script>

<template>
  <div class="overflow-x-hidden m-3 lg:m-5" v-if="tours !== null">
    <hr class="surface-300" style="height: 1px;border:none">
    <div v-for="(tour, index) in tours" :key="index">
      <div class="border-1 border-300 border-round-md my-3" v-if="tour.startFlight !== null">
        <div class="grid m-0">
          <div class="col-12 lg:col-4 p-0 m-0">
            <div class="h-13rem md:h-15rem lg:h-15rem bg-cover bg-center border-round-top-md"
              :style="{ backgroundImage: 'url(' + tour.main_image + ')' }"></div>
            <div class="hidden lg:block">
              <div class="grid m-0">
                <div class="col-5 h-7rem bg-cover bg-center"
                  :style="{ backgroundImage: 'url(' + tour.map_thumbnail + ')' }"></div>
                <div class="col-7 h-7rem surface-300 text-sm flex align-content-center flex-wrap">
                  <p class="text-gray-500 my-2">Starts <span class="text-black-alpha-70">
                      {{ tour.cities[0].city.city_name }}, ...</span>
                  </p><br>
                  <p class="text-gray-500 my-2">Ends <span class="text-black-alpha-70">
                      {{ tour.endCity.city_name }}...</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 lg:col-5 pl-3">
            <h1 class=" text-base lg:text-xl my-1 font-semibold text-center lg:text-left">{{ tour.tour_name }}</h1>
            <div class="flex justify-content-center lg:justify-content-start">
              <span><img src="/filter-icons/star.svg" /></span>
              <span><img src="/filter-icons/star.svg" /></span>
              <span><img src="/filter-icons/star.svg" /></span>
              <span><img src="/filter-icons/star.svg" /></span>
              <span><img src="/filter-icons/half-star.svg" /></span>
              <span class="text-sm lg:text-sm mx-2">{{ tour.ratings_operator }}</span>
              <span class="text-sm lg:text-sm">({{ tour.reviews_count }} reviews)</span>
            </div>
            <p class="text-xs lg:text-sm">{{ tour.description }}</p>
            <div class="grid text-sm">
              <div class="col-6 flex align-items-center"><span>Tour type:</span></div>
              <div class="col-6 flex align-items-center"><span>Group</span></div>
              <div class="col-6 flex align-items-center"><span>Travel Style:</span></div>
              <div class="col-6 flex align-items-center"><span>{{ tour.style }}</span></div>
              <div class="col-6 flex align-items-center"><span>Age Range:</span></div>
              <div class="col-6 flex align-items-center"><span>{{ tour.min_age }} - {{ tour.max_age }} yrs</span></div>
              <div class="col-6 flex align-items-center"><span>Operated in:</span></div>
              <div class="col-6 flex align-items-center"><span>English</span></div>
              <div class="col-6 flex align-items-center"><span>Departure:</span></div>
              <div class="col-6 flex align-items-center">
                <span v-if="tour.startFlight.departure">{{ tour.startFlight.departure }}</span>
              </div>
              <div class="col-6 flex align-items-center"><span>Return:</span></div>
              <div class="col-6 flex align-items-center">
                <span v-if="tour.returnFlight.arrival">{{ tour.returnFlight.arrival }}</span>
              </div>
            </div>
          </div>

          <div class="col-12 lg:col-3 lg:flex align-content-between flex-wrap justify-content-center p-0">
            <hr class="surface-300" style="height:1px;border:none;">
            <div class="flex justify-content-around lg:justify-content-center flex-wrap lg:my-2">
              <div class="mx-1 flex flex-column">
                <span class="text-base lg:text-lg">Days</span>
                <span class="text-xl lg:text-2xl font-bold">{{ tour.tour_length_days }}</span>
              </div>
              <div class="mx-1 flex flex-column pl-5">
                <span>From</span>
                <span class="text-sl lg:text-2xl font-bold green-vibe" v-if="tour.startFlight.price">
                  $ {{  ((Number(tour.price_total) + tour.returnFlight.price + tour.startFlight.price) * 1.1).toFixed(2)
                  }}
                </span>
                <span class="text-gray-600">
                  Per Day: US${{ (Number(tour.price_total) / tour.tour_length_days).toFixed(2) }}
                </span>
                <span class="text-gray-600" style="display:none" v-if="tour.returnFlight.price">
                  returnFlight:{{ tour.returnFlight.price }}
                </span>
                <span class="text-gray-600" style="display:none" v-if="tour.startFlight.price">
                  startFlight:{{ tour.startFlight.price }}
                </span>
              </div>
            </div>
            <div>
              <div
                class="flex lg:justify-content-center lg:flex-column justify-content-around lg:text-base text-sm mt-3">
                <div class="flex my-1">
                  <span><img src="/filter-icons/tick.svg" /></span>
                  <span class=" mx-2">No booking fees</span>
                </div>
                <div class="flex my-1">
                  <span><img src="/filter-icons/tick.svg" /></span>
                  <span class="mx-2">No booking fees</span>
                </div>
                <div class="flex my-1">
                  <span><img src="/filter-icons/tick.svg" /></span>
                  <span class="mx-2">Best price guaranteed</span>
                </div>
              </div>
              <div style="cursor: pointer;" @click="handleSeeTrip(tour)"
                class="interstate orange-vibe text-center mx-auto w-10rem py-3 mt-3 border-round-md text-gray-50">
                See trip
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading">
    <Skeleton class="mb-2"></Skeleton>
    <Skeleton width="10rem" class="mb-2"></Skeleton>
    <Skeleton width="5rem" class="mb-2"></Skeleton>
    <Skeleton height="2rem" class="mb-2"></Skeleton>
    <Skeleton width="10rem" height="4rem"></Skeleton>
  </div>
</template>

<style>
h1 {
  font-family: "Canaro", sans-serif;
  font-size: 3rem;
}

* {
  font-family: "Canaro";
}

.interstate {
  font-family: "Interstate";
}

.green-vibe {
  color: #82cf45;
}

.orange-vibe {
  background-color: #FF6C0E;
}

div.col-6.flex.align-items-center {
  padding: 4px;
}

@media only screen and (max-width:767px) {}

@media only screen and (min-width:768px) and (max-width:1199px) {}

@media only screen and (min-width:1200px) {}
</style>
