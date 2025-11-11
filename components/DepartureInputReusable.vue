<template>
  <div class="tooltip-container"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <AutoComplete 
      v-model="userInput" 
      :suggestions="locationsSuggested" 
      optionLabel="city" 
      @complete="filterSuggestions"
      placeholder="Which city are you traveling from?" 
      @item-select="handleSelection"
      :delay=1000 
      :pt="autocompleteCustomClasses" 
      disabled
      
    >
      <template #option="slotProps">
        <div class="flex align-options-center">
          <div>{{ slotProps.option.city }}</div>
        </div>
      </template>
    </AutoComplete>
    <div 
      class="custom-tooltip" 
      :class="{ 'tooltip-visible': showTooltip }"
    >
      To change the Departure Place, please start a new search on the homepage
    </div>
  </div>
</template>

<script setup>
//@ts-nocheck
import { ref, watch } from 'vue';
import AutoComplete from 'primevue/autocomplete';
const emit = defineEmits();
const props = defineProps(['selectedLocation'])
import { GLOBAL_LOCATIONS } from '~/utils/globalLocations';
const autocompleteCustomClasses = ref({
  input: {
    class: 'departureInputClass departure-disabled'
  },
  root: {
    class: 'departureRootClass'
  }
});

const locationsSuggested = ref([]);
const userInput = ref(props.selectedLocation?.city ?? "");
const localSelectedLocation = ref(null);
const showTooltip = ref(false);
// event to update parent component
watch(localSelectedLocation, (newValue) => {
  emit('update:selectedLocation', newValue);
}, { deep: true });

/*
watch(showTooltip, (newValue) => {
  console.log('Tooltip state changed:', newValue);
});
update when props change*/
watch(() => props.selectedLocation, async (newValue) => {
  localSelectedLocation.value = newValue
  userInput.value = newValue?.city ?? ""
});

async function filterSuggestions(event) {
  if (event.query.length < 2) {
    locationsSuggested.value = []
    return
  }

  const searchTerm = event.query.toLowerCase();

  // finding match
  locationsSuggested.value = GLOBAL_LOCATIONS.filter((location) => {
    return location.city.toLowerCase().includes(searchTerm);
  });
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
.departure-disabled{
  opacity: 1;
  background-color: #e2e8f0 !important;
  color: #64748b !important;
}
.tooltip-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.custom-tooltip {
  position: absolute;
  z-index: 1000;
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  width: max-content;
  max-width: 250px;
  bottom: -75px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.custom-tooltip::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 8px 8px 8px;
  border-style: solid;
  border-color: transparent transparent #333 transparent;
}

.tooltip-visible {
  opacity: 1;
  visibility: visible;
}
</style>