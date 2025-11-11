<template>
  <template v-for="accommodation in filteredAccommodations" :key="accommodation.id">
    <div class="grid m-0 border-1 border-gray-300 border-round-sm my-2">
      <!-- left -->
      <div class="col-5">
        <div class="font-medium my-2">{{ accommodation.name }}</div>
        <p class="text-gray-700">Per person in a room for {{ accommodation.beds_number }} people</p>
        <small v-if="accommodation.is_shared === false">(A minimum of {{ accommodation.beds_number }} persons)</small>
      </div> <!-- end left -->

      <!-- right -->
      <div class="col-7 flex flex-wrap">
        <template v-for="priceTier in accommodation.price_tiers">
          <!-- Single traveler category -->
          <div class="col-7 text-center">
            <div class="font-medium">+ {{ Math.round(priceTier.value - defaultPriceTier) }} USD</div>
            <p class="text-gray-700 m-0 ">(per Traveler)</p>
          </div>
          <!-- third column -->
          <div class="col-5 text-center">
            <!-- Selector -->
            <template v-if="accommodation.beds_number > 0">
              <select ref="selectsRef" @change="handleOptionSelected($event, accommodation, 'traveler')"
                class="appearance_auto_font_weight w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary py-3">
                <!-- Options -->
                <option value="0"> - Select an Option - </option>
                <option :disabled="option.disabled" :value="option.index" v-for="option in getMaxSelectableOptions(accommodation)">
                  {{ option.label }}
                  <!-- <template v-if="option === 1">
                    {{ option }} traveler
                  </template>
                  <template v-else>
                    {{ option }} travelers
                  </template> -->
                </option>
              </select>
            </template>
            <template v-else>
              <span>Unavailable</span>
            </template>
          </div>
        </template>
      </div> <!-- end right -->
    </div>
  </template>
</template>

<script setup>
// Import necessary modules from Vue
import { ref, computed, defineProps, defineEmits, watch } from 'vue';

// Define props and emits for the component
const props = defineProps(['availableAccommodations', 'travelersProp', 'tour', 'modelValue', 'totalAsgined']);
const emit = defineEmits();

// Local states
const localAccommodations = ref([]);
const localTravelers = ref([...props.travelersProp]);
const selectsRef = ref([]);
const lastOptionSelected = ref(0); // Track the last selected option value
const passengerCounter = ref(1); // Initialize passenger counter starting from 1
const defaultPriceTier = ref();
// Track the total number of travelers
const maxTravelersCount = computed(() => props.travelersProp.length);
const totalAsginedTravelers = computed(() => props.totalAsgined);

// Function to handle selection changes in accommodation dropdowns
function handleOptionSelected(event, accommodation) {
  const optionSelected = parseInt(event.target.value);
  const accommodationId = accommodation.id;

  // If the selection is 0, remove the accommodation
  if (optionSelected === 0) {
    removeAccommodation(accommodationId);
    lastOptionSelected.value = 0; // Reset the last option selected
    return;
  }

  // Check if the sum of the last selected value and the current selection exceeds the max travelers
  const totalSelected = lastOptionSelected.value + optionSelected;
  if (totalSelected > maxTravelersCount.value) {
    resetOtherSelects(event.target); // Reset if the total exceeds max travelers
  }

  // Update the accommodation with the selected number of passengers
  updateAccommodation(optionSelected, accommodation);
  lastOptionSelected.value = optionSelected; // Update the last option selected
}

// Function to update accommodations by adding passengers
function updateAccommodation(optionSelected, accommodation) {
  //console.log("local acc",accommodation);	
  //console.log("localTravelers.value",localTravelers.value);	
  const accommodationId = accommodation.id;
  const newAcc = {
	name: accommodation.name,  
    id: accommodationId,
    passengers: [],
  }	
  const existingAccommodation = localAccommodations.value.find(acc => acc.id === accommodationId);
  const newPassengers = generatePassengerIds(optionSelected);
  if (existingAccommodation) {
    existingAccommodation.passengers = newPassengers;
  } else {
	  for (let i = 0; i < optionSelected; i++) {
		if (localTravelers.value === -1) {
		  console.error('Error trying to add passengers. No more passengers available to add as new')
		  break;
		}
		const foundTraveler = localTravelers.value[i];
		newAcc.passengers.push({
		  id: foundTraveler.id,
		  type: "traveler",	
		  accommodationPriceTier: accommodation.price_tiers[0]
		})
	  } 
	
	localAccommodations.value.push(newAcc);
    //console.log("localAccommodations.value", localAccommodations.value);
  }
}

// Generate passenger IDs based on the count needed
function generatePassengerIds(count) {
  const passengers = [];
  for (let i = 0; i < count; i++) { // Start from 0 up to count
    passengers.push(passengerCounter.value++); // Increment passengerCounter each time
  }
  return passengers;
}

// Reset all other selects except the current one
function resetOtherSelects(currentSelect) {
  selectsRef.value.forEach(select => {
    if (select !== currentSelect) {
      select.value = '0';
    }
  });

  // Clear all accommodations
  localAccommodations.value = [];
  lastOptionSelected.value = 0; // Reset the last selected value
  passengerCounter.value = 1; // Reset passenger counter to start from 1 again
  localTravelers.value = props.travelersProp;	
}

// Remove accommodation entirely
function removeAccommodation(accommodationId) {
  localAccommodations.value = localAccommodations.value.filter(acc => acc.id !== accommodationId);
}

// Get the maximum number of rooms that can fit the travelers
// function getMaxSelectableOptions(accommodation) {
//   console.log("getMaxSelectableOptions",accommodation);	
//   const bedsPerRoom = accommodation.beds_number;
//   console.log("bedsPerRoom",bedsPerRoom);	
//   const totalTravelers = maxTravelersCount.value;
//   console.log("totalTravelers",totalTravelers);	
//   const maxRooms = (totalTravelers / bedsPerRoom);	
//   console.log("maxRooms",maxRooms);
//   const fitRooms = maxRooms * bedsPerRoom;	
//   if (fitRooms==1 && accommodation.is_shared==true){
//     return fitRooms;	  
//   }
//   else if(Number.isInteger(fitRooms) && fitRooms>0){	
//   	return fitRooms;
//   }else {return 0;}
// }

function getMaxSelectableOptions(accommodation) {
  //console.log("assigned", totalAsginedTravelers.value);
  //console.log("Accommodation:", accommodation);

  const bedsPerRoom = accommodation.beds_number; // Número de camas por habitación
  //console.log("Beds per Room:", bedsPerRoom);

  const totalTravelers = maxTravelersCount.value; // Número total de viajeros
  //console.log("Total Travelers:", totalTravelers);

  const options = []; // Lista de opciones a devolver
  const travelersPending = totalTravelers - totalAsginedTravelers.value;

  // Calcular el número máximo de habitaciones que pueden ser usadas
  const maxRooms = Math.ceil(totalTravelers / bedsPerRoom); // Habitaciones necesarias
  //console.log("Max Rooms:", maxRooms);

  for (let rooms = 1; rooms <= maxRooms; rooms++) {
    const peopleInRooms = rooms * bedsPerRoom; // Personas acomodadas en estas habitaciones
	/*console.log("peopleInRooms, bedsPerRoom: ",bedsPerRoom); 
	console.log("peopleInRooms, rooms: ",rooms);  
	console.log("peopleInRooms: ",peopleInRooms);
	console.log("peopleInRooms totalTravelers: ",totalTravelers); 
	console.log("peopleInRooms, accommodation: ",accommodation); */
    if (peopleInRooms >= totalTravelers) {
      // Si la cantidad de personas acomodadas coincide con los viajeros
     //console.log("peopleInRooms <= totalTravelers: ",peopleInRooms,"<=",totalTravelers);  
      if (accommodation.is_shared == true) {
		//console.log("peopleInRooms accommodation.is_shared== ",accommodation.is_shared);    
        // Si es una habitación compartida y solo se necesita una habitación
        options.push({index: totalTravelers, label: `${totalTravelers} traveler(s) in 1 shared room`});
      } else {
        // Habitaciones individuales según la capacidad
        options.push(
          {index: peopleInRooms, label: `${peopleInRooms} traveler(s) in ${rooms} room(s) of ${bedsPerRoom} beds`, disabled: peopleInRooms > travelersPending}
        );
      }
    }
  }

  // Si no hay opciones viables, devolver 0
  if (options.length === 0) {
    //console.log("No viable options found.");
    return 0;
  }

  //console.log("Options:", options);
  return options;
}

// Watchers for reactivity
watch(localAccommodations, (newValue) => {
  emit('update:modelValue', localAccommodations.value);	
  emit('update:accommodationsUpdate', localAccommodations.value);	
  //console.log("emit", localAccommodations.value);
}, { deep: true });

watch(() => props.travelersProp, (newValue) => {
  localTravelers.value = [...newValue];
  localAccommodations.value = [];
  resetAllSelects();
}, { deep: true });

// Reset all selects to default state
const resetAllSelects = () => {
  selectsRef.value.forEach(select => {
    select.value = '0';
  });
};

// Filter accommodations based on traveler requirements
const filteredAccommodations = computed(() => {
  return props.availableAccommodations.filter(accommodation => {
    return canAccommodateTravelers(accommodation);
  });
});

//console.log("filteredAccommodations",filteredAccommodations.value);	
defaultPriceTier.value = filteredAccommodations.value[0].value;
//console.log("defaultPriceTier.value",defaultPriceTier.value);  	
	
function canAccommodateTravelers(accommodation) {
  const minRequired = accommodation.is_shared ? 1 : accommodation.beds_number;
  return props.travelersProp.length >= minRequired;
}
</script>