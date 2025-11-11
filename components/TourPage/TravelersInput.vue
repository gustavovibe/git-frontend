<template>
  <ConfirmPopup group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="border-round p-3 bg-white w-full h-full">
        <!-- <p class="font-semibold text-xs leading-5 flex-shrink-0 text-black select-none">Travelers</p> -->
        <!-- Adults -->
        <div class="controllers-container">
          <div class="flex traveler-controll">
            <div class="filter-label">
              <p class="text-sm text-black select-none"><b>Adults</b></p>
              <p class="text-sm text-gray-400 select-none">18+</p>
            </div>
            <div class="controllers">
              <span @click="removeTraveler('adults')">
                <i class="pi pi-minus" style="color: white" :class="travelersSelected.adults == 1 ? 'color-btn-gray' : 'color-btn-green'"></i>
              </span>
              <span class="text-black flex justify-center select-none" style="min-width: 10px; justify-content: center;">
                <b>{{ travelersSelected.adults }}</b>
              </span>
              <span @click="addTraveler('adults')">
                <i class="pi pi-plus" style="color: white"></i>
              </span>
            </div>
          </div>
          <hr style="color: gray; opacity: 0.2;" />
          <!-- Children -->
          <div class="flex traveler-controll">
            <div class="filter-label">
              <p class="text-sm text-black select-none"><b>Children</b></p>
              <p class="text-sm text-gray-400 select-none">0 - 17</p>
            </div>

            <span class="controllers">
              <span @click="removeTraveler('children')">
                <i class="pi pi-minus" :class="travelersSelected.children == 0 ? 'color-btn-gray' : 'color-btn-green'" style="color: white"></i>
              </span>
              <span class="text-black flex justify-center select-none" style="min-width: 10px; justify-content: center;">
                <b>{{ travelersSelected.children }}</b>
              </span>
              <span @click="addTraveler('children')">
                <i class="pi pi-plus" style="color: white"></i>
              </span>
            </span>
          </div>
          <div v-tooltip.top="`A child's age must be valid for the entire journey. If a child has a birthday during the trip, use their age on the return flight date.`" class="flex traveler-controll" v-for="(childrenAge, index) in travelersSelected.childrenAges" :key="index">
            <div class="filter-label dropdown-container" style="width: 100%;" @mousedown.stop>
              <p class="text-sm text-black select-none">Age of child {{ index + 1 }}</p>
              <Dropdown v-model="childrenAge.age" v-if="ages" :options="ages" optionLabel="label" optionValue="value" prevent.default placeholder="Select age (years)" class="w-full md:w-56" >
              </Dropdown>
              <span v-if="childrenAge.age === null" class="text-sm" style="color: red; display: table-row; margin-top: 5px;"><i class="pi pi-info-circle"></i> Please select the traveler's age</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ConfirmPopup>

  <div class="card flex justify-content-center w-full h-full">
    <div class="w-full">
      <InputText v-model="travelersString" readonly @click="requireConfirmation($event)" placeholder="How many are you?"
        :pt="{ root: { class: 'travelersInputTextClass' } }" />
    </div>
  </div>
</template>

<script setup>
import { watchEffect, onMounted, onBeforeUnmount } from 'vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from 'pinia'
import ConfirmPopup from "primevue/confirmpopup";
import { useRoute } from 'vue-router'

const props = defineProps(['prices']);	
console.log("prices on travelersinput: ",props.prices);	
	
const emit = defineEmits();
const config = useRuntimeConfig();
		
const homeFormStore = useHomeFormStore()
const { travelersSelected } = storeToRefs(homeFormStore)
const { totalTravelers } = storeToRefs(homeFormStore);
const confirm = useConfirm();
const toast = useToast();
const travelers = ref(null);
	
watch(
  travelersSelected,
  (newValue) => {
    console.log("travelersSelected on travelersInput", newValue);
    travelers.value = newValue;
    // emit a plain snapshot (non-reactive) so parent receives a stable object
    emit("update:travelersSelected", JSON.parse(JSON.stringify(newValue)));
    // or if environment supports it: emit("update:travelersUpdated", structuredClone(newValue));
  },
  { deep: true }
);
	

const travelersString = computed(() => {
  const adults = travelersSelected.value.adults;
  const children = travelersSelected.value.children;
  const adultsText = adults > 1 ? 'adults' : 'adult';
  const childrenText = children > 1 ? 'children' : 'child';
  const childFullText = children > 0 ? `and ${children} ${childrenText}` : "";  
  return `${adults} ${adultsText} ${childFullText}`;
});

const requireConfirmation = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Save your current process?',
    accept: () => null,
    reject: () => null
  });
};

const addTraveler = (category) => {
  homeFormStore.addTraveler(category);
};
const removeTraveler = (category) => {
  if(category == "adults"){
    homeFormStore.removeTraveler(category, 1);
  }else{
    homeFormStore.removeTraveler(category);
  }
};
const resetTotalTravelers = () => {
  homeFormStore.resetTotalTravelers();
};

function getAdultsCount(params, name) {
  if (!params.get(name)) {
    return 1 // default value when there is no param in url?
  }
  return parseInt(params.get(name));
}
function getChildrenCount(params, name) {
  if (!params.get(name)) {
    return 0 // default value when there is no param in url?
  }
  return parseInt(params.get(name));
}

watch(travelersSelected, (newValue) => {
  console.log("travelersSelected on travelersInput", travelersSelected.value);
  travelers.value = newValue;
  console.log("newValue on travelersInput",newValue);	
  emit("update:travelersUpdated",travelersSelected.value);	
});

watchEffect(totalTravelers, (newValue) => { 
  console.log("totalTravelers", totalTravelers); 
  travelers.value = newValue.value.toString(); 
});	

const route = useRoute();

const MAX_AGE_CAP = 17;
function range(a, b) {
  const start = Math.min(a, b)
  const end = Math.max(a, b)
  const arr = []
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
}

const ages = computed(() => {
  // same logic you already have
  const resp = props.prices;
  if (!resp) return []
  const { price_categories = [], tour_ages } = resp

  const childCat = price_categories.find(
    c => c?.external_reference?.toLowerCase() === 'child'
  )

  let minAge = null
  let maxAge = null

  if (childCat && childCat.age_min != null && childCat.age_max != null) {
    minAge = Number(childCat.age_min)
    maxAge = Math.min(Number(childCat.age_max), MAX_AGE_CAP)
  } else if (tour_ages && tour_ages.min_age != null) {
    minAge = Number(tour_ages.min_age)
    maxAge = MAX_AGE_CAP
  } else {
    return []
  }

  if (!Number.isFinite(minAge) || !Number.isFinite(maxAge) || minAge > maxAge) return []

  return range(minAge, maxAge).map(age => ({ label: `${age} years`, value: age }))
});

// disabled when no options available
const isDisabled = computed(() => ages.value.length === 0);	
	
onMounted(async () => {
    console.log("onMounted");
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const search = params.get('search');
    if (search == "true") {
      travelersSelected.adults = getAdultsCount(params, "adultsCount");
      //console.log("travelersSelected.adults", travelersSelected.adults);
      if (travelersSelected.adults > 1) { addTraveler('adults'); }
      travelersSelected.children = getChildrenCount(params, 'childrenCount');
      //console.log("travelersSelected.children", travelersSelected.children);
      if (travelersSelected.children > 0) { addTraveler('children'); }
      travelersSelected.infants = getChildrenCount(params, 'infantsCount');
      //console.log("travelersSelected.infants", travelersSelected.infants);
      if (travelersSelected.infants > 0) { addTraveler('infants'); }
      //console.log("totalTravelers.value", totalTravelers.value);
      travelers.value = totalTravelers.value.toString();
    } else { console.log("not search"); }
	const tourId = params.get('tourId');
	if(tourId){
	  console.log("tourId onMounted travelersinput", tourId);	
	}	
    travelersSelected.value.children = getChildrenCount(params, 'childrenCount');
    travelersSelected.value.adults = getAdultsCount(params, "adultsCount");
});

</script>
<style scoped>
.traveler-controll {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
}

.traveler-icon img {
  width: 20px;
  height: auto;
}

.controllers {
  display: flex;
  margin-left: auto;
  align-items: center; /* Centra horizontalmente */
}

.color-btn-green {
  background: #82CF45 !important;
  opacity: .7;

}

.color-btn-gray {
  background: #E0E0E0 !important;
  opacity: 1;
}

.controllers .pi {
  padding: 5px;
  background: #82CF45;
  border-radius: 8px;
  cursor: pointer;
}

.filter-label {
  display: block;
}

.select-none {
  margin: 0 5px;
}

.controllers-container {
  display: block;
  min-width: 180px;
}
</style>

<style>
.travelersInputTextClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  font-family: interstate !important;
  border: none !important;
}
</style>