<template>
  <template v-for="accommodation in filteredAccommodations" :key="accommodation.id">
    <div class="grid m-0 border-1 border-gray-300 border-round-sm my-2">
      <!-- Left Column -->
      <div class="col-5">
        <div class="font-medium my-2">{{ accommodation.name }} - {{ accommodation.id }}</div>
        <p class="text-gray-700">Per person in a room for {{ accommodation.beds_number }} people</p>
        <small v-if="!accommodation.is_shared">(A minimum of {{ accommodation.beds_number }} persons)</small>
      </div>

      <!-- Right Column -->
      <div class="col-7 flex flex-wrap">
        <div class="col-7 text-center">
          <div class="font-medium">
            $ {{ formatAsCurrency(accommodation.value, 'USD') }} USD / traveler
          </div>
        </div>
        <div class="col-5 text-center">
          <select ref="selectsRef" @change="handleOptionSelected($event, accommodation)"
                  class="appearance_auto_font_weight w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary py-3">
            <option value="0">0 travelers</option>
            <option v-for="n in accommodation.beds_number" :key="n" :value="n">
              {{ n }} traveler{{ n > 1 ? 's' : '' }}
            </option>
          </select>
        </div>
      </div> <!-- End Right Column -->
    </div>
  </template>
</template>
<script setup>
// @ts-nocheck
import { ref, computed, watch, onMounted } from 'vue';

const emit = defineEmits(['update:modelValue', 'update:onAccommodationsWithTravelersChange']);
const props = defineProps(['availableAccommodations', 'travelersProp', 'tour', 'modelValue']);

const localAccommodations = ref([]);
const localTravelers = ref([...props.travelersProp]);
const selectsRef = ref([]); // To track all select elements

onMounted(() => {
  console.log("availableAccommodations", props.availableAccommodations);
});

const totalTravelers = computed(() => localTravelers.value.length);

function handleOptionSelected(event, accommodation) {
  console.log("accommodation.value",accommodation.value);	
  const optionSelected = parseInt(event.target.value);

  // Reset all travelers to the pool before updating
  resetAllTravelers();

  if (optionSelected > 0) {
    // Add new accommodation with selected travelers
    const newAccommodation = {
      id: accommodation.id,
      passengers: localTravelers.value.splice(0, optionSelected),
	  value: accommodation.value	
    };
    localAccommodations.value = [newAccommodation]; // Replace with the new accommodation
  } else {
    localAccommodations.value = []; // No travelers selected
  }

  // Emit the updated state
  emitUpdates();

  // Reset other selects
  resetOtherSelects(event.target);
}

function resetOtherSelects(currentSelect) {
  // Reset all select elements except the one that triggered the change
  selectsRef.value.forEach(select => {
    if (select !== currentSelect) {
      select.value = '0';
    }
  });
}

function resetAllTravelers() {
  // Return all travelers to the pool and clear local accommodations
  localAccommodations.value.forEach(accommodation => {
    localTravelers.value.push(...accommodation.passengers);
    accommodation.passengers = [];
  });
  localAccommodations.value = [];
}

function emitUpdates() {
  emit('update:modelValue', localAccommodations.value);
  emit('update:onAccommodationsWithTravelersChange', localAccommodations.value);
	console.log("emit",localAccommodations.value);	
}

const filteredAccommodations = computed(() => {
  // Only include accommodations that can accommodate the travelers
  return props.availableAccommodations.filter(accommodation => canAccommodateTravelers(accommodation));	
});

function canAccommodateTravelers(accommodation) {	
  const minRequired = accommodation.is_shared ? 1 : accommodation.beds_number;
  return totalTravelers.value >= minRequired;
}

// Watch for changes in travelersProp to reset states
watch(() => props.travelersProp, (newValue) => {
  localTravelers.value = [...newValue];
  resetAllTravelers();
  resetAllSelects();
}, { deep: true });

const resetAllSelects = () => {
  selectsRef.value.forEach(select => {
    select.value = '0';
  });
};
	
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