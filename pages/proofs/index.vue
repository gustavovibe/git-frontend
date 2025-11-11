<template>
  <div class="seat-map-container" style="max-width:550px">
	  <TabView v-if="goingFlight.length && returnFlight.length">
            <TabPanel header="Going Flight">
                <div class="seat-group">
					{{goingId}}
				  <div v-for="(row, rowIndex) in goingFlight" :key="`row-${rowIndex}`" class="seat-row">
					<div
					  v-for="(section, sectionIndex) in row.sections"
					  :key="`section-${sectionIndex}`"
					  class="seat-section"
					>
					  <Button
						severity="contrast"		  
						v-for="(element, elementIndex) in section.elements"
						:key="element.id"
						:disabled="element.type !== 'seat' || !element.available_services.length"
						@click="requireConfirmation($event)"
						@click.native="showSeatCost(element)"
						:class="{
						  'seat-button': true,
						  'available-seat': element.type === 'seat' && element.available_services.length,
						  'unavailable-seat': element.type !== 'seat' || !element.available_services.length
						}"
					  >
						<template v-if="element.type === 'lavatory'">
						  <i class="pi pi-user"></i>
						</template>
						<template v-else-if="element.type === 'exit_row'">
						  <i class="pi pi-sign-out"></i>
						</template>
						<template v-else-if="element.type === 'galley'">
						  <i class="pi pi-apple"></i>
						</template>
						<template v-else-if="element.type === 'bassinet'">
						  <i class="pi pi-android"></i>
						</template>
						<template v-else>
						  {{ element.designator || '' }}
						</template>
					  </Button>
					</div>
				  </div>
				</div>
            </TabPanel>
            <TabPanel header="Return Flight">
                <div class="seat-group">
					{{returnId}}
				  <div v-for="(row, rowIndex) in returnFlight" :key="`row-${rowIndex}`" class="seat-row">
					<div
					  v-for="(section, sectionIndex) in row.sections"
					  :key="`section-${sectionIndex}`"
					  class="seat-section"
					>
					  <Button
						severity="contrast"		  
						v-for="(element, elementIndex) in section.elements"
						:key="element.id"
						:disabled="element.type !== 'seat' || !element.available_services.length"
						@click="requireConfirmation($event)"
						@click.native="showSeatCost(element)"
						:class="{
						  'seat-button': true,
						  'available-seat': element.type === 'seat' && element.available_services.length,
						  'unavailable-seat': element.type !== 'seat' || !element.available_services.length
						}"
					  >
						<template v-if="element.type === 'lavatory'">
						  <i class="pi pi-user"></i>
						</template>
						<template v-else-if="element.type === 'exit_row'">
						  <i class="pi pi-sign-out"></i>
						</template>
						<template v-else-if="element.type === 'galley'">
						  <i class="pi pi-apple"></i>
						</template>
						<template v-else-if="element.type === 'bassinet'">
						  <i class="pi pi-android"></i>
						</template>  
						<template v-else>
						  {{ element.designator || '' }}
						</template>
					  </Button>
					</div>
				  </div>
				</div>
            </TabPanel>
        </TabView>
  </div>
	<ConfirmPopup group="headless">
		<template #container="{ message, acceptCallback, rejectCallback }">
		  <div class="border-round p-3 bg-white w-full h-full">
			<p class="font-semibold text-xs leading-5 flex-shrink-0 text-black select-none">Choose seat</p>
				<template v-if="selectedSeatCost">
					<p>{{ selectedSeatCost }}</p>
				</template>
			<br>
			<div class="flex" style="justify-content: space-between;">
			  <span>
				<Button @click="rejectCallback" label="Cancel" severity="secondary" />
			  </span>
			  <span @click="updateWhenDone(selectedId)">
				<Button @click="acceptCallback" label="Done" severity="warning" />
			  </span>
			</div>
		  </div>
		</template>
  </ConfirmPopup>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';                
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from "primevue/confirmpopup";

const confirm = useConfirm();	
const requireConfirmation = (event) => {
  console.log("requireConfirmation");	
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Save your current process?',
    accept: () => null,
    reject: () => null
  });
};

function updateWhenDone(selectedId){
	console.log("selectedId",selectedId);
}
	
const selectedSeatCost = ref(null);
const selectedId = ref(null);	
const showSeatCost = (element, event) => {
  if (element.available_services.length) {
    selectedSeatCost.value = `${element.available_services[0].total_amount} ${element.available_services[0].total_currency}`;
	selectedId.value = element.available_services[0].id; 
  }
}

const offerId = ref();
const config = useRuntimeConfig();
const goingFlight = ref([]);	
const returnFlight = ref([]);
const goingId = ref([]);	
const returnId = ref([]);	
	
onMounted(async () => {
	nextTick(async () => {
	  const params = new URLSearchParams(window.location.search);
		offerId.value = params.get('offerId'); 
		if (offerId.value) {  
		  console.log("offerId", offerId.value);
		  const data = await useFetch(`${config.public.BACKEND_URL}/api/duffel/get-seats?offerId=${offerId.value}`);
		  console.log ("data", data);
		  console.log ("data.data", data.data);
		  console.log ("data.data.value.data[0].cabins[0]", data.data.value.data[0].cabins[0]);	
		  goingFlight.value = data.data.value.data[0].cabins[0].rows;
		  goingId.value = data.data.value.data[0].slice_id;
		  console.log("goingFlight.value",goingFlight.value);	
		  returnFlight.value = 	data.data.value.data[1].cabins[0].rows;
		  returnId.value = data.data.value.data[1].slice_id;
		  console.log("returnFlight.value",returnFlight.value);	
		}
	});
});
</script>

<style scoped>
.seat-map {
  display: grid;
  grid-template-columns: repeat(6, auto);
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.seat-row {
  display: flex;
  justify-content: space-around;
  gap: 8px;
}

.seat-section {
  display: flex;
  gap: 8px;
}

.seat-button {
  width: 40px;
  height: 40px;
  text-align: center;
  margin: 5px;
  padding: 5px;
}

.available-seat {
  background-color: #5dade2;
}

.unavailable-seat {
  background-color: #5e5e5e;
}
	
.cabin {
  margin-bottom: 40px;
}

.p-datatable-sm .p-datatable-thead > tr > th,
.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.5rem;
}

.wings {
  margin-top: 10px;
  font-style: italic;
}
</style>