<template>
  <AutoComplete v-model="selectedDestinationsref" :suggestions="filteredDestinations" @complete="search"
    optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Where are you going?" multiple
    :delay=1000 style="text-align: left;" :pt="autocompleteCustomClasses" :inputStyle="{ display: selectedDestinationsref.length >= 2 ? 'none' : 'block' }">
    <template #optiongroup="slotProps">
      <div class="flex align-items-center country-item">
        <div>{{ slotProps.option.label }}</div>
      </div>
    </template>
  </AutoComplete>
</template>

<style>
.destinationsContainerClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}

.destinationsRootClass {
  width: 100%;
}

.destinationsInputClass {
  margin-left: 2px;
}

.destinationsTokenClass {
  margin-left: 2px;
  margin-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>

<script setup>

import { ref, watch, computed } from "vue";
import AutoComplete from 'primevue/autocomplete';
import { FilterMatchMode, FilterService } from 'primevue/api';
import { storeToRefs } from 'pinia'
const config = useRuntimeConfig();

const homeFormStore = useHomeFormStore();
const { destinationsSelected } = storeToRefs(homeFormStore);

const selectedDestinationsref = ref('');
const filteredDestinations = ref();
const autocompleteCustomClasses = ref({
  root: {
    class: 'destinationsRootClass'
  },
  input: {
    class: 'destinationsInputClass'
  },
  container: {
    class: 'destinationsContainerClass'
  },
  token: {
    class: 'destinationsTokenClass'
  }
});

const placeholder = computed(() => {
  return selectedDestinationsref.value.length < 2 ? "Where are you going?" : ""
})

const search = async (event) => {
  let query = event.query.toLowerCase().trim();

  try {
    const response = await useFetch(`${config.public.BACKEND_URL}/api/destinations?q=${query}`);
    const data = response.data.value.data;
    const suggestions = [];

    // Filtering for countries
    if (data?.country?.data?.length) {
      // validating data
      const firstCountry = data.country.data[0]
      if (!firstCountry?.name) {
        console.error(`backend problem: There is no 'name' for country: '${JSON.stringify(firstCountry)}'`)
      }
      if (!firstCountry?.t_country_id) {
        console.error(`backend problem: There is no 't_country_id' for country: '${JSON.stringify(firstCountry)}'`)
      }
      // adding data
      suggestions.push({
        label: "Countries",
        destinations: data.country.data.map(country => ({
          label: country.name,
          t_id: country.t_country_id,
          type: "country",
          k_id: country.kiwi_id,
        }))
      });
    }

    // Filtering for cities
    if (data?.city?.data?.length) {
      // validating data
      const firstCity = data.city.data[0]
      if (!firstCity?.city_name) {
        console.error(`backend problem: There is no 'city_name' for city: '${JSON.stringify(firstCity)}'`)
      }
      if (!firstCity?.t_city_id) {
        console.error(`backend problem: There is no 't_city_id' for city: '${JSON.stringify(firstCity)}'`)
      }
      // adding data
      suggestions.push({
        label: "Cities",
        destinations: data.city.data.map(city => ({
          label: `${city.city_name}${city.country_name ? ", " + city.country_name : ""}`,
          t_id: city.t_city_id,
          type: "city"
        }))
      });
    }

    // Filtering for natural attractions
    if (data?.natural_destinations?.data?.length) {
      // validating data
      const firstNat = data.natural_destinations.data[0]
      if (!firstNat?.name) {
        console.error(`backend problem: There is no 'name' for natural_destination: '${JSON.stringify(firstNat)}'`)
      }
      if (!firstNat?.t_natural_id) {
        console.error(`backend problem: There is no 't_natural_id' for natural_destination: '${JSON.stringify(firstNat)}'`)
      }
      // adding data
      suggestions.push({
        label: "Natural Attractions",
        destinations: data.natural_destinations.data.map(natural => ({
          label: natural.name,
          t_id: natural.t_natural_id,
          type: "natural"
        }))
      });
    }

    let newFilteredDestinations = [];
    for (let groupname of suggestions) {
      let filteredItems = FilterService.filter(groupname.destinations, ['label'], query, FilterMatchMode.CONTAINS);
      if (filteredItems && filteredItems.length) {
        newFilteredDestinations.push({ ...groupname, ...{ items: filteredItems } });
      }
    }
    filteredDestinations.value = newFilteredDestinations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

watch(selectedDestinationsref, () => {
  console.log(`selectedDestinationsref: ${JSON.stringify(selectedDestinationsref.value)}`)
  homeFormStore.changeDestinations(selectedDestinationsref.value);
});

watch(destinationsSelected, (newDestinations) => {
  destinationsSelected.value = newDestinations.toString();
});

const formatDestinations = (t_id, type) => {
  return [
    {
      t_id: parseInt(t_id),
      type: type || 'unknown'
    }
  ]
}

function getDestinationsSelected(params) {
  if (!params.get('t_id')) {
    return 84; // default value italy
  }
  const tIds = params.get('t_id').split(',').map(id => parseInt(id)); // Converts string to array of integers
  console.log("tIds", tIds); // This will log [94, 95, 96]	
  return tIds;
}
const selectedPdestination = (destinations) => {
  console.log("destinations input", destinations);
  homeFormStore.changeDestinations(destinations);
}

const searchDestinations = async (codes) => {
  const destinations = [];

  for (const code of codes) {
    console.log("code", code);
    try {
      // Make an API call to fetch data for the current code
      const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/codes?q=${code}`);

      if (error.value) {
        console.error(`Error fetching data for code ${code}:`, error.value);
        continue;
      }

      // Extract the response data
      const responseData = data.value?.data;

      // Process the response data based on the type
      if (responseData?.natural) {
        responseData.natural.forEach((item) => {
          destinations.push({
            t_id: item.t_natural_id ?? null,
            label: item.destination_name ?? item.name,
            type: "natural_destination",
          });
        });
      } else if (responseData?.country) {
        responseData.country.forEach((item) => {
          destinations.push({
            t_id: item.t_country_id,
            label: item.name,
            type: "country",
          });
        });
      } else if (responseData?.city) {
        responseData.city.forEach((item) => {
          destinations.push({
            t_id: item.t_city_id,
            label: `${item.city_name}${item.country ? `, ${item.country}` : ""}`,
            type: "city",
          });
        });
      } else {
        console.warn(`No valid destination type found for code ${code}`);
      }
    } catch (error) {
      console.error(`Error processing code ${code}:`, error);
    }
  }

  console.log("destinationsNames", destinations);

  // Update the reactive references or call the required functions
  selectedDestinationsref.value = destinations;
  selectedPdestination(destinations);
};


onMounted(async () => {
  nextTick(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    const type = params.get('type');
    if (search == "true" && type != "tour_type") {
      const codes = getDestinationsSelected(params);
      searchDestinations(codes);
    } else {
      console.log("not search");

    }
    if (type == "tour_type") {
      const code = params.get('t_id');
      selectedDestinationsref.value = [
        {
          "t_id": code,
          "label": "Anywhere",
          "type": "tour_type"
        }
      ];
      homeFormStore.changeDestinations(selectedDestinationsref.value);
    }
  });
});		
</script>
