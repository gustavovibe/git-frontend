<template>
  <template v-for="accommodation in availableAccommodations" :key="accommodation.id">
    <div class="grid m-0 border-1 border-gray-300 border-round-sm my-2">
      <!-- left -->
      <div class="col-5">

        <div class="font-medium my-2">{{ accommodation.name }}</div>
        <small class="line-clamp-3">
          <template v-if="isDescriptionLong(accommodation.description)">
            <span v-if="!expandedDescriptions[accommodation.id]">
              {{ getShortDescription(accommodation.description) }}
              <button @click="toggleDescription(accommodation.id)" class="read-more-btn">Read more</button>
            </span>
            <span v-else>
              {{ accommodation.description }}
              <button @click="toggleDescription(accommodation.id)" class="read-more-btn">Read less</button>
            </span>
          </template>
          <template v-else>
            {{ accommodation.description }}
          </template>
        </small>
      </div> <!-- end left -->

      <!-- right -->
      <div class="col-7 flex flex-wrap">
        <template v-for="priceTier in accommodation.price_tiers">
          <!-- second column -->
          <!-- Traveller -->
          <template v-if="priceTier?.price_category_id === priceCategoryAdultComputed?.id">
            <div class="col-7 text-center">
              <div class="font-medium extra-price">+ {{ getVibePrice(priceTier.value) }} USD</div>
              <p class="text-gray-700 m-0 ">(per Traveller)</p>
            </div>
            <!-- third column -->
            <div class="col-5 text-center">
              <!-- Selector -->
              <select ref="selectsRef" @change="handleOptionSelected($event, accommodation)"
                class="appearance_auto_font_weight w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary py-3">
                <!-- Options -->
                <option value="0">0 Traveller</option>
                <option :disabled="disabledOption(accommodation, option)" :value="option"
                  v-for="option in travelersProp.length">
                  <template v-if="option === 1">
                    {{ option }} Traveller
                  </template>
                  <template v-else>
                    {{ option }} Travellers
                  </template>
                </option>
              </select> <!-- end Selector -->
            </div>
          </template> <!-- end Traveller -->

        </template>
      </div> <!-- end right -->
    </div>
  </template>
</template>

<script setup>
//@ts-nocheck
import { watch } from 'vue';
const emit = defineEmits();
const props = defineProps(['availableAccommodations', 'travelersProp', 'tour', 'modelValue'])
const accommodations = ref([])
const localAccommodations = ref([])
const selectsRef = ref([]);

function disabledOption(accommodation, option) {
  const foundAcc = localAccommodations.value.find(ac => ac.id !== accommodation?.id);
  if (!foundAcc) {
    return false
  }

  const newPassengersCount = option + foundAcc.passengers.length
  if (newPassengersCount > props.travelersProp) {
    return true
  }

  return false
}

function removeAccomodation(accommodation) {
  const accommodationId = accommodation.id
  // remove accommodation
  localAccommodations.value = localAccommodations.value.filter(ac => ac.id !== accommodationId);
}

function addAccommodation(optionSelected, accommodation) {
  const accommodationId = accommodation.id
  // remove old accomodation
  const newAccommodations = localAccommodations.value.filter(acc => acc?.id !== accommodationId)

  // Prepare new accomodation
  const newAcc = {
    id: accommodationId,
    passengers: [],
  }

  // add passengers
  for (let i = 0; i < optionSelected; i++) {
    const currentTraveler = { ...props.travelersProp[i] }
    const traveler = {
      ...currentTraveler,
      accommodationPriceTier: getPriceTier(currentTraveler?.priceCategory?.id, accommodation)
    }

    newAcc.passengers.push(traveler)
  }

  // update localAccommodations
  localAccommodations.value = [
    ...newAccommodations,
    newAcc
  ]
}

function getPriceTier(priceCategoryId, accommodation) {
  const defaultPriceTier = accommodation.price_tiers[0]
  let priceTier = { ...defaultPriceTier }

  for (const currentPriceTier of accommodation.price_tiers) {
    if (currentPriceTier?.price_category_id === priceCategoryId) {
      priceTier = { ...currentPriceTier }
    }
  }

  return priceTier
}

function handleOptionSelected(event, accommodation) {
  const optionSelected = parseInt(event.target.value)

  if (optionSelected === 0) {
    removeAccomodation(accommodation)
    return
  }
  addAccommodation(optionSelected, accommodation)
}

const priceCategoryAdultComputed = computed(() => {
  const adult = props.tour.priceCategories.find(pCategory => pCategory.external_reference === "adult")
  if (adult) {
    return adult
  }
  return null
})

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

function getVibePrice(rawPrice) {
  const aditionalCost = rawPrice * VIBE_REVENUE_TOUR
  const vibePrice = rawPrice + aditionalCost
  return formatAsCurrency(vibePrice, 'USD')
}

function reorderPassengers() {
  const newAccomodations = []

  for (const accomodation of localAccommodations.value) {
    const newAccomodation = {
      id: accomodation.id,
      passengers: [],
    };

    newAccomodation.passengers = accomodation.passengers.map(acc => acc.id)

    newAccomodations.push(newAccomodation);
  }

  accommodations.value = newAccomodations;
}

const resetAllSelects = () => {
  selectsRef.value.forEach(select => {
    select.value = '0';
  });
};

const expandedDescriptions = ref({});

function toggleDescription(id) {
  expandedDescriptions.value[id] = !expandedDescriptions.value[id];
}

function isDescriptionLong(desc) {
  return desc && desc.length > 150;
}

function getShortDescription(desc) {
  return desc ? desc.slice(0, 150) + '...' : '';
}

watch(localAccommodations, (newValue) => {
  reorderPassengers()

  emit('update:modelValue', accommodations.value);
}, { deep: true });

watch(() => props.travelersProp, (newValue) => {
  localAccommodations.value = []
  resetAllSelects()
}, { deep: true });

</script>

<style scoped>
.appearance_auto_font_weight {
  appearance: auto;
  font-weight: 300;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.extra-price {
  color: #82cf45 !important;
  font-family: Canaro !important;
}
.read-more-btn {
  background: none;
  border: none;
  color: #82cf45;
  cursor: pointer;
  font-family: Canaro;
  font-weight: normal;
  margin-left: 4px;
  padding: 0;
  text-decoration: underline;
}
</style>