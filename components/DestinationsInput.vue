<template>
  <div class="autocomplete-container">

    <AutoComplete v-model="userInput" :suggestions="filteredDestinations"  optionLabel="label" @complete="search"
      placeholder="Where are you going?" @item-select="handleSelection"
      :delay=1000 :pt="autocompleteCustomClasses">
      <template #option="slotProps">
        <div class="flex align-options-center">
          <div>{{ slotProps.option.label }}</div>
        </div>
      </template>
    </AutoComplete>

    <button
      v-if="userInput"
      @click="userInput = null"
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
.destinationsContainerClass {
  width: 90% !important;
  outline: none;
  box-shadow: none;
  border: none;
}

.destinationsRootClass {
  width: 100%;
}

.destinationsInputClass {
  margin-left: 2px;
  font-family: interstate !important;
}

.destinationsTokenClass {
  margin-left: 2px;
  margin-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
::v-deep .interstate-placeholder .p-dropdown-label.p-placeholder {
  font-family: 'Interstate', sans-serif !important;
}
</style>

<script setup>
//@ts-nocheck
import { ref, watch, onMounted, nextTick } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import { FilterMatchMode, FilterService } from 'primevue/api';
const emit = defineEmits(['update:modelValue', 'update:selectedDestination']);
const props = defineProps(['selectedDestination']);
const config = useRuntimeConfig();
const filteredDestinations = ref();
const autocompleteCustomClasses = ref({
  input: {
    class: 'departureInputClass gray_text'
  },
  root: {
    class: 'departureRootClass'
  }
});

const locationsSuggested = ref([]);
const userInput = ref("");
const localSelectedLocation = ref(null);

watch(localSelectedLocation, (newValue) => {
	console.log("destinations emit: ",newValue);
  emit('update:selectedDestination', newValue);
}, { deep: true });

// update when props change
watch(() => props.selectedLocation, async (newValue) => {
  localSelectedDestination.value = newValue
  userInput.value = newValue?.city ?? ""
});

const search = async (event) => {
  let query = event.query.toLowerCase().trim();

  try {
    const response = await useFetch(`${config.public.BACKEND_URL}/api/destinations?q=${query}`);
    const data = response.data.value.data;
    let suggestions = [];

    if (data?.country?.data?.length) {
      suggestions.push(
        ...data.country.data.map(country => ({
          label: country.name,
          t_id: country.t_country_id,
          type: "country",
          k_id: country.kiwi_id,
        }))
      );
    }

    if (data?.city?.data?.length) {
      suggestions.push(
        ...data.city.data.map(city => ({
          label: `${city.city_name}${city.country_name ? ", " + city.country_name : ""}`,
          t_id: city.t_city_id,
          type: "city",
        }))
      );
    }

    if (data?.natural_destinations?.data?.length) {
      suggestions.push(
        ...data.natural_destinations.data.map(natural => ({
          label: natural.name,
          t_id: natural.t_natural_id,
          type: "natural",
        }))
      );
    }

    // Apply filtering based on query
    filteredDestinations.value = FilterService.filter(suggestions, ['label'], query, FilterMatchMode.CONTAINS);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


function handleSelection(userSelection) {
  localSelectedLocation.value = userSelection.value
};

function resetAutocomplete() {
  if (localSelectedLocation.value) {
    localSelectedLocation.value = null;
    userInput.value = "";
  }
};

function getDestinationsSelected(params) {
  const idsParam = params.get('t_id');

  if (!idsParam) {
    return [84]; // Default value (Italy)
  }

  return idsParam.split(',').map(id => parseInt(id, 10)).filter(Number.isInteger);
}

const searchDestinations = async (codes) => {
  if (!Array.isArray(codes)) {
    codes = [codes]; // Ensure it's an array
  }

  let destinations = [];

  for (const code of codes) {
    console.log("Fetching for code:", code);
    try {
      const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/codes?q=${code}`);

      if (error.value) {
        console.error(`Error fetching data for code ${code}:`, error.value);
        continue; // Skip this code and continue
      }

      const responseData = data.value?.data;
      if (!responseData) continue;

      if (responseData?.natural) {
        destinations.push(...responseData.natural.map(item => ({
          t_id: item.t_natural_id ?? null,
          label: item.destination_name ?? item.name,
          type: "natural_destination",
        })));
      }

      if (responseData?.country) {
        destinations.push(...responseData.country.map(item => ({
          t_id: item.t_country_id,
          label: item.name,
          type: "country",
        })));
      }

      if (responseData?.city) {
        destinations.push(...responseData.city.map(item => ({
          t_id: item.t_city_id,
          label: `${item.city_name}${item.country ? `, ${item.country}` : ""}`,
          type: "city",
        })));
      }

      if (destinations.length === 0) {
        console.warn(`No valid destination type found for code ${code}`);
      }
    } catch (error) {
      console.error(`Error processing code ${code}:`, error);
    }
  }

  console.log("Final destinations list:", destinations);
  if (destinations.length === 1) {
    destinations = destinations[0];
	console.log("destinations cond",destinations);
	userInput.value = destinations;
  }	else if (destinations.length > 1) {
	  userInput.value = destinations.map(dest => dest.label).join(', ');
  } else{
	  console.log("no destinations");
  }
  localSelectedLocation.value = destinations;
  console.log("localSelectedLocation.value",localSelectedLocation.value);
};

const selectedDestinationsref = ref();

onMounted(async () => {
  nextTick(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const type = params.get('type');

    if (search === "true" && type !== "tour_type") {
      const codes = getDestinationsSelected(params);
      searchDestinations(codes);
    } else {
      console.log("Not performing search");
    }

    if (type === "tour_type") {
      const code = params.get('t_id');
      selectedDestinationsref.value = [{
        "t_id": code,
        "label": "Anywhere",
        "type": "tour_type"
      }];
      localSelectedLocation.value = selectedDestinationsref.value
    }
  });
});

</script>

<style>
.departureRootClass {
  width: 100%;
}

.departureInputClass {
  width: 100%;
  border: none;
}

.departureInputClass:focus {
  outline: none;
  box-shadow: none;
}

.gray_text {
  color: #505050;
}
</style>
