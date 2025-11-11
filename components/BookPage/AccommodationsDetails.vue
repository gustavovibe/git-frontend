<template>
<div v-if="filteredAccommodations.length > 0">
  <template v-for="accommodation in filteredAccommodations" :key="accommodation.id">
    <div class="grid m-0 border-1 border-gray-300 border-round-sm my-2" v-if="showAccommodations(accommodation)">
      <!-- left -->
      <div class="col-5">
        <div class="font-medium my-2">{{ accommodation.name }}</div>
        <p class="text-gray-700">Per person in a room for {{ accommodation.beds_number }} people</p>
        <small v-if="accommodation.is_shared === false">(A minimum of {{ accommodation.beds_number }} persons)</small>
      </div> <!-- end left -->

      <!-- right -->
      <div class="col-7 flex flex-wrap" v-if="priceCategoriesMapped.length > 0">
        <template v-for="priceTier in accommodation.price_tiers">
          <!-- second column -->
          <!-- ADULT -->
          <template v-if="priceTier?.price_category_id === priceCategoryAdultComputed?.id">
            <div class="col-7 text-center">
              <div class="font-medium">+ {{ $currencyDecimal(priceTier.value - minPrices.adult) }}</div>
              <p class="text-gray-700 m-0 ">(per Adult)</p>
            </div>
            <!-- third column -->
            <div class="col-5 text-center">
              <!-- Selector -->
              <template v-if="accommodation.beds_number > 0">
                <select ref="selectsRef" @change="handleOptionSelected($event, accommodation, 'adult')"
                  class="appearance_auto_font_weight w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary py-3">
                  <!-- Options -->
                  <option value="0"> - Select an Option - </option>
                  <option :disabled="disabledOption(accommodation, option, 'adult')" :value="option"
                    v-for="option in accommodation.beds_number">
                    <template v-if="option === 1">
                      {{ option }} adult
                    </template>
                    <template v-else>
                      {{ option }} adults
                    </template>
                  </option>
                </select>
              </template>
              <template v-else>
                <span>Unavailable</span>
              </template>
            </div>
          </template> <!-- end ADULT -->

          <!-- CHILDREN category -->
          <template v-else-if="priceTier?.price_category_id === priceCategoryChildComputed?.id">
            <div class="col-7 text-center">
              <div class="font-medium">+ {{ $currencyDecimal(priceTier.value - minPrices.child) }}</div>
              <p class="text-gray-700 m-0 ">(per Child)</p>
            </div>
            <!-- third column -->
            <div class="col-5 text-center">
              <!-- Selector -->
              <template v-if="accommodation.beds_number > 0">
                <select ref="selectsRef" @change="handleOptionSelected($event, accommodation, 'child')"
                  class="appearance_auto_font_weight w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary py-3">
                  <!-- Options -->
                  <option value="0"> - Select an Option - </option>
                  <option :disabled="disabledOption(accommodation, option, 'child')" :value="option"
                    v-for="option in accommodation.beds_number">
                    <template v-if="option === 1">
                      {{ option }} child
                    </template>
                    <template v-else>
                      {{ option }} children
                    </template>
                  </option>
                </select>
              </template>
              <template v-else>
                <span>Unavailable</span>
              </template>
            </div>
          </template> <!-- end CHILDREN category -->
        </template>
      </div> <!-- end right -->
    </div>
  </template>
</div>
</template>

<script setup>
//@ts-nocheck
import { ref, computed, watch, watchEffect, onMounted } from 'vue';
const emit = defineEmits();
const props = defineProps(['availableAccommodations', 'travelersProp', 'tour', 'modelValue'])

const accommodations = ref([])
const localAccommodations = ref([])
const localTravelers = ref([...props.travelersProp])
const selectsRef = ref([]);
const totalTravelers = computed(() => (props.travelersProp || []).length);
const config = useRuntimeConfig();
const availableAccommodations = ref();

console.log("props.availableAccommodations", props.availableAccommodations);	
availableAccommodations.value = props.availableAccommodations;	

// --- priceCategoriesMapped: keep as an array in .value for .find usage ---
const priceCategoriesMapped = ref([]);

// helper: accept either array or object for mappings
function getMappingId(refName) {
  const list = Array.isArray(priceCategoriesMapped.value)
    ? priceCategoriesMapped.value
    : (priceCategoriesMapped.value ? Object.values(priceCategoriesMapped.value) : [])

  const m = (list || []).find(x =>
    x && (x.external_reference === refName || String(x.title ?? '').toLowerCase() === refName)
  )

  return m?.price_category_id ?? m?.id ?? m?.priceCategoryId ?? null
}

function isTierForRef(tier, refName) {
  // 1) if we have a mapping id, compare by id fields
  const mappingId = getMappingId(refName)
  if (mappingId != null) {
    const tierId = tier.price_category_id ?? tier.id ?? tier.priceCategoryId
    if (tierId != null && String(tierId) === String(mappingId)) return true
  }

  // 2) fallback to external_reference on the tier itself (old behaviour)
  if (tier.external_reference) {
    if (String(tier.external_reference) === refName) return true
  }

  // 3) fallback to title/name matching if present
  if (tier.title) {
    if (String(tier.title).toLowerCase() === refName) return true
  }

  return false
}

const filteredAccommodations = computed(() => {
	  console.log("availableAccommodations.value",availableAccommodations.value);
	  return (availableAccommodations.value || []).filter(accommodation => {
		  if (!accommodation) return false;
		  // if beds_number is missing, keep visible by default (change to `return false` to hide instead)
		  if (accommodation.beds_number == null) return false;
		  const beds = Number(accommodation.beds_number) || 0;
		  const odd = (totalTravelers.value % 2) != 1 || totalTravelers.value == 1;
		  console.log("odd",odd);
		  const shared =  accommodation.is_shared == true;
		  console.log("shared",shared);	
		  if (odd && shared) {
			console.log("odd && shared == true");  
			return true;
		  }else {
			return totalTravelers.value >= beds;
		  }
	  });
});	
	
const minPrices = computed(() => {
  const childPrices = [];
  const adultPrices = [];

  (filteredAccommodations.value || []).forEach(accommodation => {
    (accommodation.price_tiers || []).forEach(tier => {
      const val = Number(tier.value)
      if (!Number.isFinite(val)) return

      if (isTierForRef(tier, 'child')) {
        childPrices.push(val)
      } else if (isTierForRef(tier, 'adult')) {
        adultPrices.push(val)
      }
    })
  })
  console.log("childPrices",childPrices);
  console.log("adultPrices",adultPrices);
  return {
    child: childPrices.length ? Math.min(...childPrices) : null,
    adult: adultPrices.length ? Math.min(...adultPrices) : null
  }
});

const totalAdultsAccommodatedCount = computed(() => {
  let totalAdultsAccommodated = 0
  for (const localAcc of localAccommodations.value) {
    if (localAcc) {
      const adultsAccommodated = (localAcc.passengers || []).filter(pa => pa.type === 'adult')
      totalAdultsAccommodated += adultsAccommodated.length
    }
  }
  return totalAdultsAccommodated
})

const maxAdultsCount = computed(() => {
  return (props.travelersProp || []).filter(tra => tra.type === 'adult').length
})

const totalChildrenAccommodatedCount = computed(() => {
  let totalChildren = 0
  for (const localAcc of localAccommodations.value) {
    if (localAcc) {
      const childrenAccommodated = (localAcc.passengers || []).filter(pa => pa.type === 'child')
      totalChildren += childrenAccommodated.length
    }
  }
  return totalChildren
})

const maxChildrenCount = computed(() => {
  return (props.travelersProp || []).filter(tra => tra.type === 'child').length
})

function disabledOption(accommodation, option, passengerType) {
  const accommodationWillBeFull = willAccommodationBeFull(accommodation, option)
  const aboveAdultLimit = passengerType === 'adult' && (option + totalAdultsAccommodatedCount.value) > maxAdultsCount.value
  const aboveChildLimit = passengerType === 'child' && (option + totalChildrenAccommodatedCount.value) > maxChildrenCount.value
  return accommodationWillBeFull || aboveAdultLimit || aboveChildLimit
}

function willAccommodationBeFull(accommodation, option) {
  const foundAccommodation = (localAccommodations.value || []).find(ac => ac.id === accommodation.id)
  if (!foundAccommodation) {
    return false
  }
  return false
}

function showAccommodations(accommodation) {
  if (!accommodation) return false;
  // if beds_number is missing, keep visible by default (change to `return false` to hide instead)
  if (accommodation.beds_number == null) return false;
  const beds = Number(accommodation.beds_number) || 0;
  const odd = (totalTravelers.value % 2) != 1 || totalTravelers.value == 1;
  const shared =  accommodation.is_shared == true;
  if (odd && shared) {
  	return true;
  }else {
  	return totalTravelers.value >= beds;
  }
}
	
function removeAccomodation(accommodation, passengerType) {
  const accommodationId = accommodation.id
  if (!localAccommodations.value.length) {
    return;
  }

  const foundAcco = localAccommodations.value.find(ac => ac.id === accommodationId);

  if (!foundAcco) {
    console.error('Accommodation not found');
    return;
  }

  const removedPassengers = foundAcco.passengers.filter(pa => pa.type === passengerType);

  foundAcco.passengers = foundAcco.passengers.filter(pa => pa.type !== passengerType);

  const removedPassengersWithoutPriceTiers = removedPassengers.map(pa => {
    delete pa.accommodationPriceTier;
    return pa;
  });

  localTravelers.value.push(...removedPassengersWithoutPriceTiers);

  if (foundAcco.passengers.length) {
    localAccommodations.value = localAccommodations.value.map(ac => {
      if (ac.id === foundAcco.id) {
        return { ...foundAcco };
      }
      return ac;
    });
  } else {
    localAccommodations.value = localAccommodations.value.filter(ac => ac.id !== foundAcco.id);
  }
}

function addNewAccomodation(optionSelected, accommodation, passengerType) {
  const accommodationId = accommodation.id
  const newAcc = {
    name: accommodation.name,
    id: accommodationId,
    passengers: [],
  }

  for (let i = 0; i < optionSelected; i++) {
    const travelerIndex = localTravelers.value.findIndex(tra => tra.type === passengerType)
    if (travelerIndex === -1) {
      console.error('Error trying to add passengers. No more passengers available to add as new')
      break;
    }
    const foundTraveler = localTravelers.value[travelerIndex];
    newAcc.passengers.push({
      ...foundTraveler,
      accommodationPriceTier: getAccommodationPriceTier(foundTraveler.priceCategory_id, accommodation)
    })
    localTravelers.value.splice(travelerIndex, 1);
  }

  localAccommodations.value.push(newAcc);
}

function getAccommodationPriceTier(priceCategoryId, accommodation) {
  const defaultPriceTier = (accommodation.price_tiers || [])[0] 
  let priceTier = { ...defaultPriceTier }
  for (const currentPriceTier of (accommodation.price_tiers || [])) {
    if (currentPriceTier?.price_category_id === priceCategoryId) {
      priceTier = { ...currentPriceTier }
    }
  }
  return priceTier
}

function editAccommodation(optionSelected, accommodation, passengerType) {
  const accommodationId = accommodation.id
  const foundAccomo = (localAccommodations.value || []).find(ac => ac.id === accommodationId);

  if (foundAccomo) {
    const removedPassengers = foundAccomo.passengers.filter(pa => pa.type === passengerType);
    foundAccomo.passengers = foundAccomo.passengers.filter(pa => pa.type !== passengerType);

    removedPassengers.forEach(removedPassenger => {
      const index = localTravelers.value.findIndex(traveler => traveler.id === removedPassenger.id);
      if (index !== -1) {
        localTravelers.value.splice(index, 1);
      }
    });

    for (let i = 0; i < optionSelected; i++) {
      const travelerIndex = localTravelers.value.findIndex(tra => tra.type === passengerType);
      if (travelerIndex === -1) {
        console.error('Error trying to add passengers. No more passengers available to add');
        break;
      }
      const foundTraveler = localTravelers.value[travelerIndex];
      foundAccomo.passengers.push({
        ...foundTraveler,
        accommodationPriceTier: getAccommodationPriceTier(foundTraveler.priceCategory?.id ?? foundTraveler.priceCategory_id, accommodation)
      });
      localTravelers.value.splice(travelerIndex, 1);
    }

  } else {
    addNewAccomodation(optionSelected, accommodation, passengerType);
  }
}

function addAccommodation(optionSelected, accommodation, passengerType) {
  if (!accommodations.value.length) {
    addNewAccomodation(optionSelected, accommodation, passengerType)
    return
  }
  editAccommodation(optionSelected, accommodation, passengerType)
}

function handleOptionSelected(event, accommodation, passengerType) {
  const optionSelected = parseInt(event.target.value)
  if (optionSelected === 0) {
    removeAccomodation(accommodation, passengerType)
    return
  }
  addAccommodation(optionSelected, accommodation, passengerType)
}

const priceCategoryAdultComputed = computed(() => {
  const adult = props.tour?.priceCategories?.find(pCategory => pCategory.external_reference === "adult")
  return adult ?? null
})

const adultCategory = ref(null)

/**
 * Minimal helper: returns the matching price category object (or null)
 * - fast local check for external_reference === 'adult'
 * - otherwise fetches /api/prices and matches by price_category_id -> local category
 */
async function fetchAdultCategory(tour) {
  if (!tour) return null

  if (Array.isArray(tour.priceCategories)) {
    const local = tour.priceCategories.find(p => p.external_reference === 'adult')
    if (local) return local
  }

  const tourId = tour.tour_id ?? tour.id
  if (!tourId) return null

  try {
    const res = await $fetch(`${config.public.BACKEND_URL}/api/prices?tourId=${tourId}`)
    const pcs =
      Array.isArray(res) ? res
      : res?.price_categories ? res.price_categories
      : Array.isArray(res?.data) ? res.data
      : res?.data?.price_categories ? res.data.price_categories
      : []

    const mapping = pcs.find(pc =>
      pc.external_reference === 'adult' ||
      pc.code === 'adult' ||
      String(pc.name ?? '').toLowerCase() === 'adult' ||
      pc.type === 'adult'
    )

    const mappingId = mapping?.price_category_id ?? mapping?.id ?? mapping?.priceCategoryId
    if (!mappingId) return null

    if (Array.isArray(tour.priceCategories)) {
      return tour.priceCategories.find(pc =>
        String(pc.price_category_id ?? pc.id ?? pc.priceCategoryId) === String(mappingId)
      ) ?? null
    }

    return null
  } catch (e) {
    console.error('fetchAdultCategory error', e)
    return null
  }
}

// returns { adult: Object|null, child: Object|null }
async function fetchPriceCategoryMappings(tour) {
  if (!tour) return { adult: null, child: null }

  const local = Array.isArray(tour.priceCategories) ? tour.priceCategories : []
  const localAdult = local.find(p => p.external_reference === 'adult') ?? null
  const localChild = local.find(p => p.external_reference === 'child') ?? null
  if (localAdult || localChild) return { adult: localAdult, child: localChild }

  const tourId = tour.tour_id ?? tour.id
  if (!tourId) return { adult: null, child: null }

  try {
    const res = await $fetch(`${config.public.BACKEND_URL}/api/prices?tourId=${tourId}`)
    const pcs =
      Array.isArray(res) ? res
      : res?.price_categories ? res.price_categories
      : Array.isArray(res?.data) ? res.data
      : res?.data?.price_categories ? res.data.price_categories
      : []

    const findRef = (ref) =>
      pcs.find(pc =>
        pc.external_reference === ref ||
        pc.code === ref ||
        String(pc.title ?? '').toLowerCase() === ref
      ) ?? null

    return {
      adult: findRef('adult'),
      child: findRef('child')
    }
  } catch (err) {
    console.error('fetchPriceCategoryMappings error', err)
    return { adult: null, child: null }
  }
}

// reactive update: keep priceCategoriesMapped in a usable array form
watchEffect(async () => {
  const priceTiers = await fetchPriceCategoryMappings(props.tour);
  console.log("priceTiers", priceTiers);

  // --- KEY FIX: store as array, filter out nulls so .find works later ---
  priceCategoriesMapped.value = [priceTiers.adult, priceTiers.child].filter(Boolean);
})

const priceCategoryChildComputed = computed(() => {
  const child = props.tour?.priceCategories?.find(pCategory => pCategory.external_reference === "child")
  return child ?? null
})

function formatAsCurrency(price, currency) {
  let number = Math.ceil(price);
  if (!number) {
    return "-";
  }
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function getVibePrice(rawPrice) {
  const aditionalCost = rawPrice * 1;
  const vibePrice = rawPrice
  return formatAsCurrency(vibePrice, 'USD')
}

function reorderPassengers() {
  const newAccomodations = []

  for (const accomodation of localAccommodations.value) {
    const newAccomodation = {
      id: accomodation.id,
      passengers: []
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

watch(localAccommodations, (newValue) => {
  reorderPassengers()
  emit('update:modelValue', localAccommodations.value);
  emit('update:accommodationsUpdate', localAccommodations.value);
}, { deep: true });

watch(() => props.travelersProp, (newValue) => {
  localTravelers.value = [...newValue]
  localAccommodations.value = []
  resetAllSelects()
}, { deep: true });

onMounted(() => {
	const filteredAcc = filteredAccommodations.value;
	console.log("filteredAcc",filteredAcc);
});	
</script>


<style scoped>
.appearance_auto_font_weight {
  appearance: auto;
  font-weight: 300;
}
</style>