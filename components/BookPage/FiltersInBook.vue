<template>
  <div class="col-12 lg:col-2 border_bottom mr-0 mb-5 pb-5" style="height: fit-content;">

    <!-- sort by -->
    <Accordion :activeIndex="isMobile ? null : 0" collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
      <AccordionTab :pt="accordionTabPToptions">
        <template #header>
          <span>
            <span class="font-semibold white-space-nowrap filter-name">Sort by</span>
          </span>
        </template>

        <div class="flex flex-column gap-2">
          <div class="flex align-items-center">
            <Checkbox v-model="localFilters.sort" value="sortByLeastExpensive" @change="uniqueCheckBoxVal($event)" />
            <label class="ml-2">Least expensive</label>
          </div>

          <div class="flex align-items-center">
            <Checkbox v-model="localFilters.sort" value="sortByLeastDuration" @change="uniqueCheckBoxVal($event)" />
            <label class="ml-2">Shortest duration</label>
          </div>
        </div>
      </AccordionTab>
    </Accordion>

    <!-- stops -->
    <Accordion :activeIndex="isMobile ? null : 0" collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
      <AccordionTab :pt="accordionTabPToptions">
        <template #header>
          <span>
            <span class="font-semibold white-space-nowrap filter-name">Stops</span>
          </span>
        </template>

        <div class="flex flex-column gap-2">
          <div class="flex align-items-center">
            <Checkbox v-model="localFilters.stops" :value="STOP_OPTIONS.any" @change="uniqueCheckBoxValue($event)" />
            <label class="ml-2">Any</label>
          </div>

          <div class="flex align-items-center">
            <Checkbox v-model="localFilters.stops" :value="STOP_OPTIONS.direct" @change="uniqueCheckBoxValue($event)" />
            <label class="ml-2">Direct</label>
          </div>

          <div class="flex align-items-center">
            <Checkbox v-model="localFilters.stops" :value="STOP_OPTIONS.upToOneStop"
              @change="uniqueCheckBoxValue($event)" />
            <label class="ml-2">Up to 1 stop</label>
          </div>

          <div class="flex align-items-center">
            <Checkbox v-model="localFilters.stops" :value="STOP_OPTIONS.upToTwoStops"
              @change="uniqueCheckBoxValue($event)" />
            <label class="ml-2">Up to 2 stops</label>
          </div>
        </div>
      </AccordionTab>
    </Accordion>

    <!-- bags -->
    <Accordion :activeIndex="isMobile ? null : 0" collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
      <AccordionTab :pt="accordionTabPToptions">
        <template #header>
          <span>
            <span class="font-semibold white-space-nowrap filter-name">Bags</span>
          </span>
        </template>

        
        <div>
          <div class="mt-1 flex align-items-center">
            <div class="col-8 flex align-items-center baggageicon">
              <IconsCabinBaggageIcon />
              <span class="ml-2 bags_typography">Cabin baggage</span>
            </div>
            <div class="col-4 flex justify-content-end  align-items-center">
              <span @click="substractCabinBaggage()" class="minus-icon">
                <!--<i class="pi pi-minus" style="font-size: 10px;padding: 0px 5px 0px 5px;vertical-align: middle;height: 15px;font-weight: 600;"></i>!--><IconsMinusIcon />
              </span>
              <span style="margin-left: 5px;margin-right: 5px;">{{ localFilters.cabinbaggage }}</span>
              <span @click="addCabinBaggage()" class="plus-icon">
                <IconsPlusIcon />
              </span>
            </div>
          </div>
          <div class="mt-1 flex align-items-center">
            <div class="col-8 flex align-items-center baggageicon">
              <IconsCheckedBaggageIcon />
              <span class="ml-2 bags_typography">Checked Baggage</span>
            </div>
            <div class="col-4 flex justify-content-end  align-items-center">
              <span @click="substractCheckedBaggage()" class="minus-icon">
                <IconsMinusIcon />
              </span>
              <span style="margin-left: 5px;margin-right: 5px;">{{ localFilters.checkedbaggage }}</span>
              <span @click="addCheckedBaggage()" class="plus-icon">
                <IconsPlusIcon />
              </span>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>

    <!-- days between arrival -->
    <div class="mt-4">
      <!-- <div class="font-semibold filter-name" v-tooltip.top="'Maximum number of days between the end of the adventure and your departure back home. By default, it\'s set to 0-1 days, meaning you can depart from the final destination on the last day of the adventure (to ensure you don\'t miss any part of the itinerary, we will only show results departing after 9 PM on that day) or the day after. If you want to stay longer at the final destination on your own (accommodations are not included; you will need to book lodging separately), and/or add more flexibility to potentially find cheaper flights, feel free to increase the range.'">
        Time between Flights & adventure 		  
        <span >
          <IconsInfoIcon />
        </span>
      </div> -->

      <!-- <div class="mt-1 flex align-items-center">
        <div class="col-9 flex align-items-center">
          <img src="https://blog.vibeadventures.com/wp-content/uploads/2025/07/flag.png" style="width:30px" />
          <span class="ml-2 bags_typography">Pre-tour nights</span>
        </div>
        <div class="col-3 flex justify-content-end">
          <span @click="substractNightsBefore()" class="minus-icon">
            <IconsMinusIcon />
          </span>
          <span style="margin-left: 5px;margin-right: 5px;">{{ localFilters.before }}</span>
          <span @click="addNightsBefore()" class="plus-icon">
            <IconsPlusIcon  />
          </span>
        </div>
      </div>
	  <div class="mt-1 flex align-items-center">
        <div class="col-9 flex align-items-center">
          <img src="https://blog.vibeadventures.com/wp-content/uploads/2025/07/flag-filled.png" style="width:30px" />
          <span class="ml-2 bags_typography">Post-tour nights</span>
        </div>
        <div class="col-3 flex justify-content-end">
          <span @click="substractNightsAfter()" class="minus-icon">
            <IconsMinusIcon />
          </span>
          <span style="margin-left: 5px;margin-right: 5px;">{{ localFilters.after }}</span>
          <span @click="addNightsAfter()" class="plus-icon">
            <IconsPlusIcon />
          </span>
        </div>
      </div> -->
    </div>

    <!-- days between departure
    <div class="mt-4">
      <div class="font-semibold filter-name" v-tooltip.top="'Maximum days between arriving at the destination and the adventure\'s first day. By default, it\'s set to 0-1 days, allowing you to arrive either 1 day before the tour starts or on the same day (to ensure you don\t miss anything, we\'ll only show flights landing by 6 AM on the adventure\'s first day). If you\'d like to arrive earlier to spend extra time at the initial destination on your own (accommodations are not included; you will need to book lodging separately), or increase flexibility for potentially cheaper flights, feel free to extend this date range.'">
        Days between departure back home and end of the adventure
        <span >
          <IconsInfoIcon />
        </span>
      </div>

      <div class="mt-1 ml-1 flex align-items-center">
        <div class="col-8 flex align-items-center">
          <img src="https://blog.vibeadventures.com/wp-content/uploads/2025/07/flag-filled.png" style="width:24px" />
          <span class="ml-3 bags_typography">Post-tour nights</span>
        </div>
        <div class="col-4 flex justify-content-end  align-items-center">
          <span @click="substractNightsAfter()">
            <IconsMinusIcon />
          </span>
          <span class="mr-2">{{ localFilters.after }}</span>
          <span @click="addNightsAfter()">
            <IconsPlusIcon />
          </span>
        </div>
      </div>
    </div>
    -->

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Checkbox from 'primevue/checkbox';
import Slider from 'primevue/slider';

const emit = defineEmits();
const props = defineProps(['filters'])
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile);
})

import { ref } from 'vue';
const STOP_OPTIONS = ref({
  any: "any",
  direct: "direct",
  upToOneStop: "upToOneStop",
  upToTwoStops: "upToTwoStops",
})

const localFilters = ref({
  checkedbaggage: 0,
  cabinbaggage: 1,
  stops: [STOP_OPTIONS.value.any],
  sort: ['sortByLeastExpensive'],
  before: 1,
  after: 1,	
});

const daysStart = ref(0);
const daysEnd = ref(0);

const sliderStartFilter = () => {
  console.log("sliderStartFilter", daysStart.value);
  localFilters.value.before = daysStart.value;
}	

const sliderEndFilter = () => {
  console.log("sliderEndFilter", daysEnd.value);
  localFilters.value.after = daysEnd.value;
}	

// update local values when props change
watch(() => props.filters, async (newValue) => {
  localFilters.value = newValue
}, { deep: true });

// event to update parent component
watch(localFilters, (newValue) => {
  emit('update:selectedFilters', newValue);
}, { deep: true });

const accordionTabPToptions = ref({
  headerAction: {
    class: 'pl-0 pr-2 background_white'
  },
  content: {
    class: 'pl-0 pr-2 pt-0'
  }
})


function substractCheckedBaggage() {
  if (localFilters.value.checkedbaggage <= 0) {
    return
  }
  localFilters.value.checkedbaggage--
}

function addCheckedBaggage() {
  if (localFilters.value.checkedbaggage >= 2) {
    return
  }
  localFilters.value.checkedbaggage++
}
	
function substractNightsBefore() {
  if (localFilters.value.before <= 0) {
    return
  }
  localFilters.value.before--
}

function addNightsBefore() {
  if (localFilters.value.before >= 10) {
    return
  }
  localFilters.value.before++
}	
	
function substractNightsAfter() {
  if (localFilters.value.after < 0) {
    return
  }
  localFilters.value.after--
}

function addNightsAfter() {
  if (localFilters.value.after >= 10) {
    return
  }
  localFilters.value.after++
} 	
	
function substractCabinBaggage() {
  if (localFilters.value.cabinbaggage <= 0) {
    return
  }
  localFilters.value.cabinbaggage--
}

function addCabinBaggage() {
  if (localFilters.value.cabinbaggage >= 2) {
    return
  }
  localFilters.value.cabinbaggage++
}

function uniqueCheckBoxValue(e) {
  localFilters.value.stops = [e.target.value]
}

function uniqueCheckBoxVal(e) {
  localFilters.value.sort = [e.target.value]
}	
</script>

<style>
.red {
  background-color: red;
}

.bags_typography {
  color: #505050;
  font-family: "Inter var", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.border_bottom {
  border-bottom: 0.889px solid #E8EDF1;
}

.background_white {
  background: white;
}
	
.plus-icon{
	background: #d3f3b8;
    height: 20px;
    border-radius: 10px;
}
	.baggageicon svg{    min-width: 20px;
    min-height: 20px;}	
.minus-icon{
	background: lightgray;
    height: 20px;
    border-radius: 10px;
    width: 20px;
}
</style>
