<style scoped>
.travelersInputTextClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  border: none !important;
}

.cursor_pointer {
  cursor: pointer;
}

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
}

.controllers .pi {
  padding: 5px;
  background: #f97316;
  border-radius: 50%;
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

.gray_text {
  color: #505050;
}
</style>

<template>
  <ConfirmPopup group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="border-round p-3 bg-white w-full h-full">
        <p class="font-semibold text-xs leading-5 flex-shrink-0 text-black select-none">Travelers</p>

        <div class="controllers-container">
          <!-- Adults -->
          <div class="flex traveler-controll">
            <span class="traveler-icon">
              <img src="/filter-icons/adults.svg" />
            </span>
            <div class="filter-label">
              <p class="text-xs text-black select-none">Adults</p>
              <p class="text-xs text-gray-400 select-none">Over 11</p>
            </div>
            <span class="controllers">
              <span class="cursor_pointer" @click="removeTraveler('adults')">
                <i class="pi pi-minus" style="color: white"></i>
              </span>
              <span class="text-black flex justify-center select-none" style="min-width: 10px;">
                {{ localTravelersSelected.adults }}
              </span>
              <span class="cursor_pointer" @click="addTraveler('adults')">
                <i class="pi pi-plus" style="color: white"></i>
              </span>
            </span>
          </div>
          <hr />
          <!-- Children -->
          <div class="flex traveler-controll">
            <span class="traveler-icon">
              <img src="/filter-icons/children.svg" />
            </span>
            <div class="filter-label">
              <p class="text-xs text-black select-none">Children</p>
              <p class="text-xs text-gray-400 select-none">2 - 11</p>
            </div>

            <span class="controllers">
              <span class="cursor_pointer" @click="removeTraveler('children')">
                <i class="pi pi-minus" style="color: white"></i>
              </span>
              <span class="text-black flex justify-center select-none" style="min-width: 10px;">
                {{ localTravelersSelected.children }}
              </span>
              <span class="cursor_pointer" @click="addTraveler('children')">
                <i class="pi pi-plus" style="color: white"></i>
              </span>
            </span>
          </div>
          <hr />
          <!-- Infants -->
          <div class="flex traveler-controll">
            <span class="traveler-icon">
              <img src="/filter-icons/babys.svg" />
            </span>
            <div class="filter-label">
              <p class="text-xs text-black select-none">Infants</p>
              <p class="text-xs text-gray-400 select-none">Under 2</p>
            </div>

            <span class="controllers">
              <span class="cursor_pointer" @click="removeTraveler('infants')">
                <i class="pi pi-minus" style="color: white"></i>
              </span>
              <span class="text-black flex justify-center select-none" style="min-width: 10px;">
                {{ localTravelersSelected.infants }}
              </span>
              <span class="cursor_pointer" @click="addTraveler('infants')">
                <i class="pi pi-plus" style="color: white"></i>
              </span>
            </span>
          </div>
          <hr />
        </div>
        <br>
        <div class="flex" style="justify-content: space-between;">
          <span @click="resetTotalTravelers()">
            <Button @click="rejectCallback" label="Cancel" severity="secondary" />
          </span>
          <span @click="updateWhenDone()">
            <Button @click="acceptCallback" label="Done" severity="warning" />
          </span>
        </div>
      </div>
    </template>
  </ConfirmPopup>

  <div class="card flex justify-content-center w-full h-full">
    <div class="w-full">
      <InputText :value="localTotalTravelersSelectedWhenDone" readonly @click="requireConfirmation($event)"
        placeholder="How many are you?" :pt="travelersCustomClasses" />
    </div>
  </div>
</template>

<script setup>
//@ts-nocheck
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from "primevue/confirmpopup";

const emit = defineEmits();
const props = defineProps(['travelersSelected'])

const travelersCustomClasses = ref({
  root: {
    class: 'travelersInputTextClass py-2 gray_text'
  },
})

const localTravelersSelected = ref({
  adults: 1,
  children: 0,
  infants: 0,
})
const localTravelersSelectedWhenDone = ref({
  adults: 1,
  children: 0,
  infants: 0,
})

const confirm = useConfirm();

const requireConfirmation = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Save your current process?',
    accept: () => null,
    reject: () => null
  });
};

function updateWhenDone() {
  console.log("localTravelersSelected.value",localTravelersSelected.value); 	
  localTravelersSelectedWhenDone.value = { ...localTravelersSelected.value }
  if (localTravelersSelectedWhenDone.value.adults < 1) {
    localTravelersSelectedWhenDone.value.adults = 1
  }
}

const localTotalTravelers = computed(() => {
  const total = localTravelersSelected.value.adults +
    localTravelersSelected.value.children +
    localTravelersSelected.value.infants ?? 0
  return total
})

const localTotalTravelersSelectedWhenDone = computed(() => {
  const total = localTravelersSelectedWhenDone.value.adults +
    localTravelersSelectedWhenDone.value.children +
    localTravelersSelectedWhenDone.value.infants ?? 0
  return total
})

const addTraveler = (category) => {
  if (localTotalTravelers.value >= 9) {
    return;
  }
  localTravelersSelected.value[category]++;
};

function removeTraveler(category) {
  localTravelersSelected.value[category]--;
  if (localTravelersSelected.value[category] < 0) {
    localTravelersSelected.value[category] = 0;
  }

  if (category === "adults" && localTravelersSelected.value["adults"] < 1) {
    localTravelersSelected.value["adults"] = 1;
  }
};

function resetTotalTravelers() {
  localTravelersSelected.value = { ...localTravelersSelectedWhenDone.value }
};


// event to update parent component
watch(localTravelersSelectedWhenDone, (newValue) => {
  emit('update:travelersSelected', newValue);
}, { deep: true });

// update when props change
watch(() => props.travelersSelected, async (newValue) => {
  localTravelersSelectedWhenDone.value = newValue
}, { deep: true });



</script>