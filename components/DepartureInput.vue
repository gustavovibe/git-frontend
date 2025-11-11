<template>
  <div class="autocomplete-container">
    <AutoComplete v-model="selectedOriginref" :suggestions="originLocations" optionLabel="label" @complete="searchOrigin"
      placeholder="Where are you travelling from?" @item-select="selectOrigin" :delay=1000
      :pt="autocompleteCustomClasses">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <div>{{ slotProps.option.label }}</div>
        </div>
      </template>
    </AutoComplete>

    <button
      v-if="selectedOriginref"
      @click="selectedOriginref = null"
      class="autocomplete-clear-btn"
      type="button"
      aria-label="Clear"
    >
      ✕
    </button>
  </div>
</template>

<style>
.autocomplete-container {
  position: relative;
  display: inline-block;
  width: 100%; /* o ajustable si lo prefieres */
}

.autocomplete-clear-btn {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #888;
  font-size: 1rem;
  cursor: pointer;
  z-index: 2;
}

.autocomplete-clear-btn:hover {
  color: #000;
}
.departureRootClass {
  width: 90%;
}

.departureInputClass {
  padding-right: 0;
  border: none;
  font-family: interstate !important;
}

.departureInputClass:focus {
  outline: none;
  box-shadow: none;
}
</style>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import { storeToRefs } from 'pinia'
const config = useRuntimeConfig();

// Define global reactive references
const homeFormStore = useHomeFormStore();

// Define reactive references
const originLocations = ref([]);
const selectedOriginref = ref(null);

const autocompleteCustomClasses = ref({
  input: {
    class: 'departureInputClass'
  },
  root: {
    class: 'departureRootClass'
  }
});

let debounceTimeout;
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func(...args), delay);
  };
};

const searchOrigin = debounce(async (event) => {
  try {
    if (event.query.length >= 2) {
      const response = await useFetch(`${config.public.FRONTEND_URL}/airports.json`);
      console.log("cities.json response", response.data.value);

      // Filter the cities based on the destinationSearchTerm
      originLocations.value = response.data.value.filter((location) => {
        if (!location.city_name || typeof location.city_name !== 'string') {
          console.warn("Invalid city_name in location", location);
          return false;
        }

        const searchTerm = event.query.toLowerCase();
        const city = location.city_name.toLowerCase();
        return city.includes(searchTerm);
      });

      originLocations.value.forEach(location => {
        location.label = `${location.city_name}, ${location.country_name == "Unknown" ? location.iata_country_code : location.country_name}`;
      });
      console.log("originLocations.value", originLocations.value);
    } else {
      originLocations.value = [];
      console.log("no match");
    }
  } catch (error) {
    console.error('Error in searchOrigin method:', error);
  }
}, 300);



const searchCity = async (code) => {
  console.log("code", code);
  try {
    if (code) {
      const response = await useFetch(`${config.public.FRONTEND_URL}/airports.json`);
      const cities = response.data.value;
      let foundCity = null;
      for (const city of cities) {
        if (city.iata_city_code.toLowerCase() === code.toLowerCase()) {
          foundCity = city;
          break;
        }
      }
      selectedOriginref.value = foundCity.city_name;
      console.log("searchCity", selectedOriginref.value);
      selectedParam(foundCity);
    } else {
      console.log("searchCity not found");
    }
  } catch (error) {
    console.error('Error in searchCity method:', error);
  }
};

const selectedParam = (foundCity) => {
  console.log("foundCity", foundCity.iata_city_code);
  homeFormStore.changeDeparture(foundCity.iata_city_code);
}

const selectOrigin = (selectedOriginref) => {
  const selectedOrigin = selectedOriginref.value.iata_city_code;
  console.log("selectedOrigin", selectedOrigin);
  homeFormStore.changeDeparture(selectedOrigin);
};

const resetAutocomplete = () => {
  if (selectedOriginref.value) {
    selectedOriginref.value = null; // Reset Autocomplete value
    homeFormStore.resetDeparture();
  }
};

function getDepartureSelected(params) {
  if (!params.get('departureSelected')) {
    return "nyc" // default value
  }
  return params.get('departureSelected')
}

onMounted(async () => {
  nextTick(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search == "true") {
      const code = getDepartureSelected(params);
      searchCity(code);
    } else { console.log("not search"); }
  });
});
</script>
