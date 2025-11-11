<template>
	<div class="overflow-hidden mb-8 main-spacing">
	  <div class="grid">
		<div class="col-12 lg:col-2">
		  <PanelMenuCMS />
		</div>
		<div class="col-12 lg:col-10">
		  <div style="background-color: #f2faec">
			<h1 class="mt-0 mb-1 ml-1 text-2xl">Filters</h1>
			<p class="mt-1 ml-1 pb-2" style="color: #9ca3af">
			  Filter results by:
			</p>
		  </div>
		  <div class="my-3 border-1 border-round border-bluegray-200 bg-bluegray-50">
			<div class="my-2 filter-padding flex flex-row flex-wrap align-items-center">
			  <div class="text-xl">Dates<span style="color: red">*</span></div>
			  <div style="color: #9ca3af">Booking:</div>
			  <div class="card">
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-calendar"></i>
				  </InputGroupAddon>
				  <Dropdown
					v-model="selectedBookingDates"
					:options="bookingDates"
					optionLabel="name"
					placeholder="Choose dates"
					class="w-full md:w-12rem"
				  />
				</InputGroup>
			  </div>
			  <div>or</div>
			  <div style="color: #9ca3af">Travel:</div>
			  <div class="card">
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-calendar"></i>
				  </InputGroupAddon>
				  <Dropdown
					v-model="selectedTravelDates"
					:options="travelDates"
					optionLabel="name"
					placeholder="Choose dates"
					class="w-full md:w-12rem"
				  />
				</InputGroup>
			  </div>
			</div>
			<div
			  class="my-3 filter-padding flex flex-row flex-wrap align-items-center"
			>
			  <div class="text-xl">Travel preferences</div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-car"></i>
				  </InputGroupAddon>
				  <MultiSelect
					v-model="selectedAdventures"
					:options="adventures"
					filter
					optionLabel="tour_name"
					optionValue="tour_id"
					display="chip"
					placeholder="Adventure(s)"
					:maxSelectedLabels="3"
					class="w-full md:w-12rem"
				  />
				</InputGroup>
			  </div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-flag"></i>
				  </InputGroupAddon>
				  <MultiSelect
					v-model="selectedNaturals"
					:options="destinations"
					filter
					optionValue="t_natural_id" 
					optionLabel="destination_name"
					display="chip"
					placeholder="Natural Destination(s)"
					:maxSelectedLabels="3"
					class="w-full md:w-16rem"
				  />
				</InputGroup>
			  </div>
			  <br /><br />
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-compass"></i>
				  </InputGroupAddon>
				  <MultiSelect
					v-model="selectedTravelStyles"
					:options="travelStyles"
					filter
					display="chip"
					placeholder="Travel style(s)"
					optionLabel="tourtype_name" 
					optionValue="tour_type_id"
					:maxSelectedLabels="3"
					class="w-full md:w-12rem"
				  />
				</InputGroup>
			  </div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-user"></i>
				  </InputGroupAddon>
				  <MultiSelect
					v-model="selectedOperators"
					:options="operators"
					filter
				  optionLabel="name" 
				  optionValue="operator_id"
					display="chip"
					placeholder="Operator(s)"
					:maxSelectedLabels="3"
					class="w-full md:w-11rem"
				  />
				</InputGroup>
			  </div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-clock"></i>
				  </InputGroupAddon>
				  <Dropdown
					v-model="selectedAdventureDuration"
					:options="adventureDuration"
					optionLabel="name"
					placeholder="Duration: adventure"
					class="w-full md:w-15rem"
				  />
				</InputGroup>
			  </div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<InputGroup>
				  <InputGroupAddon
					style="color: #82cf45; background-color: white"
				  >
					<i class="pi pi-clock"></i>
				  </InputGroupAddon>
				  <Dropdown
					v-model="selectedTripDuration"
					:options="tripDuration"
					optionLabel="name"
					placeholder="Duration: whole trip"
					class="w-full md:w-15rem"
				  />
				</InputGroup>
			  </div>
			</div>
			<div
			  class="my-3 filter-padding flex flex-row flex-wrap align-items-center"
			>
			  <div class="text-xl">Flight Preferences</div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<div
				  class="input-container"
				  style="
					text-align: center;
					margin: 0 auto;
					width: 300px !important;
					display: flex;
					align-items: self-end;">
					
				  <InputGroup style="height: 35px;">
					<InputGroupAddon style="color: #82cf45; background-color: white">
					  <i class="pi pi-arrow-right-arrow-left"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Stop/flight (average)"
					  style="width: 100%; background-color: white; color: gray; border-color:gainsboro;"
					  @click="toggleSlider(1)" />
				  </InputGroup>
				  <OverlayPanel ref="overlay1">
					<Slider
					  v-model="fdurationSlider"
					  @slideend="fdurationSelected"
					  min="1"
					  max="12"
					  range
					  style="width: 200px !important; margin: 0px auto 20px auto"
					/>
					<p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ fdurationSlider[0] }} - {{ fdurationSlider[1] }}
					</p>
				  </OverlayPanel>
				</div>
			  </div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<div
				  class="input-container"
				  style="
					text-align: center;
					width: 300px !important;
					display: flex;
					align-items: self-end;
				  "
				>
				  <InputGroup style="height: 35px;">
					<InputGroupAddon
					  style="color: #82cf45; background-color: white"
					>
					  <i class="pi pi-clock"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Flight duration (average)"
					  style="width: 100%; background-color: white; color: gray;border-color:gainsboro;"
					  @click="toggleSlider(2)"
					/>
				  </InputGroup>
				  <OverlayPanel ref="overlay2">
					<Slider
					  v-model="fDurationavgSlider"
					  @slideend="stopsSelected"
					  min="1"
					  max="10"
					  range
					  style="width: 200px !important; margin: 0px auto 20px auto"
					/>
					<p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ fDurationavgSlider[0] }} - {{ fDurationavgSlider[1] }}
					</p>
				  </OverlayPanel>
				</div>
			  </div>
			</div>
			<div class="my-1 filter-padding flex flex-row flex-wrap align-items-center">
			  <div class="text-xl">Booking</div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
		  
				<div
				  class="input-container"
				  style="
					text-align: center;
					width: 300px !important;
					display: flex;
					align-items: self-end;">
							  <InputGroup style="height: 35px;">
					<InputGroupAddon
					  style="color: #82cf45; background-color: white"
					>
					  <i class="pi pi-images"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Total trips"
					  style="width: 50%; background-color: white; color: gray;border-color:gainsboro;"
					  @click="toggleSlider(3)"/>
				  </InputGroup>
				  <OverlayPanel ref="overlay3">
				  <Slider
					v-model="tripsSlider"
					@slideend="tripsSelected"
					min="1"
					max="10"
					range
					style="width: 200px !important; margin: 0px auto 20px auto"/>
								  <p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ tripsSlider[0] }} - {{ tripsSlider[1] }}
					</p>
							  </OverlayPanel>
				
				</div>
			  </div>
			  <div
				class="card flex justify-content-left"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px; "
			  >
			   
				<div
				  class="input-container"
				  style="
					text-align: left;
					width: 300px !important;
					display: flex;
					align-items: self-end;
			  	margin-left: -20%;
					">
							  <InputGroup style="height: 35px;">
					<InputGroupAddon
					  style="color: #82cf45; background-color: white">
					  <i class="pi pi-dollar"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Total paid"
					  style="width: 50%; background-color: white; color: gray;border-color:gainsboro;"
					  @click="toggleSlider(4)"
					/>
				  </InputGroup>
				  <OverlayPanel ref="overlay4">
									  <Slider
										  v-model="paidSlider"
										  @slideend="paidSelected"
										  min="1000"
										  max="100000"
										  range
										  step="1000"
										  style="width: 200px !important; margin: 0px auto 20px auto"
									  />
									  <p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ paidSlider[0] }} - {{ paidSlider[1] }}
					</p>
								  </OverlayPanel>
				</div>
			  </div>
  
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<div
				  class="input-container"
				  style="
					text-align: center;
					width: 300px !important;
					display: flex;
					align-items: self-end;
			
				  "
				>
							  <InputGroup style="height: 35px;">
					<InputGroupAddon
					  style="color: #82cf45; background-color: white"
					>
					  <i class="pi pi-clock"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Travel Frecuency (trips/year)"
					  style="width: 80%; background-color: white; color: gray;border-color:gainsboro;"
					  @click="toggleSlider(5)"
					/>
				  </InputGroup>
				  <OverlayPanel ref="overlay5">
									  <Slider
										  v-model="params.frequencySlider"
										  :min="1"
										  :max="10"
										  :range="true"
										  :step="1"
										  style="width: 200px !important; margin: 0px auto 20px auto"
										  @slideend="frequencySelected"
									  />
									  <p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ params.frequencySlider[0] }} - {{ params.frequencySlider[1] }}
					</p>
				</OverlayPanel>
				</div>
			  </div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px"
			  >
				<div
				  class="input-container"
				  style="
					text-align: center;
					width: 300px !important;
					display: flex;
					align-items: self-end;
					margin-left: -20%;
				  "
				>
							  <InputGroup style="height: 35px;">
					<InputGroupAddon
					  style="color: #82cf45; background-color: white"
					>
					  <i class="pi pi-dollar"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Total Gross Profit"
					  style="width: 60%; background-color: white; color: gray;border-color:gainsboro;"
					  @click="toggleSlider(6)"
					/>
				  </InputGroup>
				  <OverlayPanel ref="overlay6">
										<Slider
										  v-model="params.profitSlider"
										  @slideend="profitSelected"
										  min="100"
										  max="10000"
										  range
										  step="100"
										  style="width: 200px !important; margin: 0px auto 20px auto"
									  />
									  <p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ params.profitSlider[0] }} - {{ params.profitSlider[1] }}
					</p>
				</OverlayPanel>
  
				</div>
			  </div>
			</div>
			<div
			  class="my-3 filter-padding flex flex-row flex-wrap align-items-center"
			>
			  <div class="text-xl">Customer info</div>
			  <div
				class="card flex justify-content-center"
				style="align-items: center; margin-top: 10px; margin-bottom: 10px;"
			  >
				<div
				  class="input-container"
				  style="
					text-align: center;
					width: 200px !important;
					display: flex;
					align-items: self-end;
				  "
				>
							  <InputGroup style="height: 35px;">
					<InputGroupAddon
					  style="color: #82cf45; background-color: white"
					>
					  <i class="pi pi-angle-double-right"></i>
					</InputGroupAddon>
					<Button
					  raised
					  label="Age"
					  style="width: 40%; background-color: white; color: gray;border-color:gainsboro;"
					  @click="toggleSlider(7)"
					/>
				  </InputGroup>
				  <OverlayPanel ref="overlay7">
									  <Slider
										  v-model="params.ageSlider"
										  @slideend="ageSelected"
										  min="1"
										  max="100"
										  range
										  step="1"
										  style="width: 200px !important; margin: 0px auto 20px auto"
									  />
									  <p
					  style="
						display: flex;
						flex-wrap: wrap;
						gap: 10px;
						justify-content: center;
					  "
					>
					  {{ params.ageSlider[0] }} - {{ params.ageSlider[1] }}
					</p>
								  </OverlayPanel>
				</div>
							  <div
								  class="card flex justify-content-center"
								  style="align-items: center; margin-top: 10px; margin-bottom: 10px"
							  >
							  <InputGroup style="width: 100%">
										  <InputGroupAddon
											  style="color: #82cf45; background-color: white"
										  >
											  <i class="pi pi-users"></i>
										  </InputGroupAddon>
										  <MultiSelect
											  v-model="selectedGender"
											  display="chip"
											  :options="gender"
											  optionLabel="name"
											  placeholder="Gender"
											  :maxSelectedLabels="3"
											  class="w-full md:w-10rem"
										  />
									  </InputGroup>
							  </div>
							  <div
								  class="card flex justify-content-center"
								  style="align-items: center; margin-top: 10px; margin-bottom: 10px"
							  >
							  <InputGroup style="width: 100%">
										  <InputGroupAddon
											  style="color: #82cf45; background-color: white"
										  >
											  <i class="pi pi-globe"></i>
										  </InputGroupAddon>
										  <MultiSelect
											  v-model="selectedTravelerCountry"
											  :options="travelerCountry"
											  filter
											  optionLabel="name" 
											  optionValue="t_country_id"
											  display="chip"
											  placeholder="Country"
											  :maxSelectedLabels="3"
											  class="w-full md:w-12rem"
										  />
									  </InputGroup>
							  </div>
			  </div>
  
			</div>
		  </div>
		  <div class="card my-3">
			<SelectButton
			  v-model="value"
			  :options="filterOptions"
			  aria-labelledby="basic"
			/>
		  </div>
		  <div
			class="flex align-items-center justify-content-between back-green-vibe-light px-5"
		  >
			<div style="display: flex;flex-direction: column;">
			  <h2 class="canaro-font font-semibold my-1">Orders</h2>
			  <p class="my-1">Filter Results by:</p>
			</div>
					  <div style=" flex: 0 0 auto; margin-right: auto; margin-left: 5%;">
						  <InputGroup style="width: 150%">
										  <InputGroupAddon
											  style="color: #82cf45; background-color: white"
										  >
											  <i class="pi pi-search"></i>
										  </InputGroupAddon>
										  <InputText v-model="Search" placeholder="Search for name,email or phone number" />
									  </InputGroup>
					  </div>
			<div class="flex">
			  <div class="mx-1">
				<a class="text_decoration_none" @click="getCSV"  >
				  <button   
					class="px-3 download_btn_green flex mx-auto"
					style="padding-top: 0.7rem; padding-bottom: 0.7rem; background-color: white; font-weight: bold; border-radius: 5px;border-color: #9ca3af;"
				>
					Export to CSV
				  </button>
				</a>
			  </div>
			  <div class="mx-1">
		
				  <button
					class="px-3 download_btn_green flex mx-auto"
					style="padding-top: 0.7rem; padding-bottom: 0.7rem; background-color: white; font-weight: bold; border-radius: 5px;border-color: #9ca3af;" @click="toggleSlider(8)"
				  >
					Show/hide columns
				  </button>
				  <OverlayPanel ref="overlay8">
									<table width="100%" v-if="list">
											<tr v-for="col in columns" :key="col.field" class="column-toggle">
												<td style="width: 80%;">{{ col.header }}</td>
												<td><InputSwitch v-model="col.active" @change="onColumnToggle(col)" /></td>
											</tr>
										</table>
								</OverlayPanel>
			  </div>
			  <div class="mx-1">
				<Dropdown v-model="orderBy" placeholder="Sort bys" :options="sort_by" optionLabel="name" optionValue="code" style="height: 100%;" />
			  </div>
			</div>
		  </div>
				  <ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
		  <div class="my-4">
			<div class="card">
			  <DataTable
				:value="orders"
				tableStyle="min-width: 50rem"
				@row-click="onRowClick"
			  >
			  <div v-if="list">
					<Column
						v-for="col of columns"
						:key="col.field"
						:field="col.field"
						:hidden="!col.active"
						:header="col.header"
					></Column>
			  </div>
			  </DataTable>
				<div class="card">
            <Paginator :rows="10" :totalRecords="totalActionLogs" :rowsPerPageOptions="[10, 20, 30]"
                       @page="onPageChange"
            ></Paginator>
          </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  	definePageMeta({
		middleware: ['auth','profile'],
	});
  import { ref, onMounted, nextTick, watch } from "vue";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import SelectButton from "primevue/selectbutton";
  import Dropdown from "primevue/dropdown";
  import MultiSelect from "primevue/multiselect";
  import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
  import dayjs from "dayjs";
  import { useRouter } from "vue-router";
  import InputGroup from "primevue/inputgroup";
  import InputGroupAddon from "primevue/inputgroupaddon";
  import Button from "primevue/button";
  import OverlayPanel from "primevue/overlaypanel";
  import ProgressBar from "primevue/progressbar";
  import InputText from "primevue/inputtext";
  import Paginator from "primevue/paginator";
  import { UsersStore } from "~/store/usersStore";
  import Slider from "primevue/slider";
  import {tourStore} from "~/store/tourStore";
  import { useDestinationStore } from '~/store/destinationStore';
  import InputSwitch from "primevue/inputswitch";

  const params = ref({
	frequencySlider: [0, 10],
	profitSlider: [100, 10000],
	ageSlider: [2, 99],
	tripsParam:[1,10],
	paidParam:[1000,100000],
	durationavgParam:[100, 3000],
	stopsavgParam:[1,12],
	csv:0,
  });
  const userStore= UsersStore();
  const router = useRouter();
  const config = useRuntimeConfig();
  const value = ref("Value of orders");
  const filterOptions = ref(["Filter", "Reset"]);
  const loading= ref(false);
  const Search=ref('');
  const delay = ref(null);
  const totalActionLogs = ref(null);
  const url= ref(config.public.BACKEND_URL);
 /*  const url= ref('http://127.0.0.1:8000'); */

  const tour_Store = tourStore();
  const destinationStore = useDestinationStore();

  const overlay1 = ref(null);
  const overlay2 = ref(null);
  const overlay3 = ref(null);
  const overlay4 = ref(null);
  const overlay5 = ref(null);
  const overlay6 = ref(null);
  const overlay7 = ref(null);
  const overlay8 = ref(null);
  
  const overlays = { overlay1, overlay2, overlay3, overlay4, overlay5, overlay6, overlay7,overlay8 };
  
  const toggleSlider = (index) => {
	const overlayKey = `overlay${index}`;
	const overlayRef = overlays[overlayKey];
	overlayRef.value.toggle(event);
  };
  
  const orderBy = ref(0);
  const list= ref(true);
  const onColumnToggle = (col) => {
	list.value=false;
  console.log(`${col.header} column is now ${col.active ? 'visible' : 'hidden'}`);
  	list.value=true;
};

  const selectedBookingDates = ref();

  const sort_by = ref([
	{name:'All', code:0},
	{name:'Last booking date: newest first', code:1},
	{name:'Last booking date: oldest first', code:2},
	{name:'First booking date: newest first', code:3},
	{name:'First booking date: oldest first', code:4},
	{name:'Total paid by traveler: lowest first', code:6},
	{name:'Total paid by traveler: highest first', code:5},
	{name:'Trip price/pp/day: lowest first', code:8},
	{name:'Trip price/pp/day: highest first', code:7},
	{name:'Total gross profit: lowest first', code:10},
	{name:'Total gross profit: highest first', code:9},
	{name:'Traveler name: Z to A', code:11},
	{name:'Traveler name: A to Z', code:12},
  ]);
  
  const bookingDates = ref([
	{
	  name: "Last 7 days",
	  code: () =>
		`${dayjs().subtract(7, "day").format("YYYY-MM-DD")},${dayjs().format(
		  "YYYY-MM-DD"
		)}`,
	},
	{ name: "All times", code: () => "" }, // No date filter for all times
	{
	  name: "Today",
	  code: () =>
		`${dayjs().format("YYYY-MM-DD")},${dayjs().format("YYYY-MM-DD")}`,
	},
	{
	  name: "Yesterday",
	  code: () =>
		`${dayjs().subtract(1, "day").format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "day")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "This week",
	  code: () =>
		`${dayjs().startOf("week").format("YYYY-MM-DD")},${dayjs()
		  .endOf("week")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last week",
	  code: () =>
		`${dayjs()
		  .subtract(1, "week")
		  .startOf("week")
		  .format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "week")
		  .endOf("week")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "This month",
	  code: () =>
		`${dayjs().startOf("month").format("YYYY-MM-DD")},${dayjs()
		  .endOf("month")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last month",
	  code: () =>
		`${dayjs()
		  .subtract(1, "month")
		  .startOf("month")
		  .format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "month")
		  .endOf("month")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last 30 days",
	  code: () =>
		`${dayjs().subtract(30, "day").format("YYYY-MM-DD")},${dayjs().format(
		  "YYYY-MM-DD"
		)}`,
	},
	{
	  name: "This year",
	  code: () =>
		`${dayjs().startOf("year").format("YYYY-MM-DD")},${dayjs()
		  .endOf("year")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last year",
	  code: () =>
		`${dayjs()
		  .subtract(1, "year")
		  .startOf("year")
		  .format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "year")
		  .endOf("year")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Custom date range",
	  code: (startDate, endDate) =>
		`${dayjs(startDate).format("YYYY-MM-DD")},${dayjs(endDate).format(
		  "YYYY-MM-DD"
		)}`,
	},
  ]);
  
  watch(selectedBookingDates, (value) => {
	console.log(`selectedBookingDates is ${value.code()}`);
	const codeValue = value.code();
	if (codeValue) {
	  const bookingParam = `created_at=${codeValue}`;
	  params.value.bookingParam = bookingParam;
	} else {
	  delete params.value.departureParam; // Remove the key if the value is empty
	}
	console.log("params.value", params.value);
	fetchOrders();
  });
  
  const selectedTravelDates = ref();
  const travelDates = ref([
	{
	  name: "Last 7 days",
	  code: () =>
		`${dayjs().subtract(7, "day").format("YYYY-MM-DD")},${dayjs().format(
		  "YYYY-MM-DD"
		)}`,
	},
	{ name: "All times", code: () => "" }, // No date filter for all times
	{
	  name: "Today",
	  code: () =>
		`${dayjs().format("YYYY-MM-DD")},${dayjs().format("YYYY-MM-DD")}`,
	},
	{
	  name: "Yesterday",
	  code: () =>
		`${dayjs().subtract(1, "day").format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "day")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "This week",
	  code: () =>
		`${dayjs().startOf("week").format("YYYY-MM-DD")},${dayjs()
		  .endOf("week")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last week",
	  code: () =>
		`${dayjs()
		  .subtract(1, "week")
		  .startOf("week")
		  .format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "week")
		  .endOf("week")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "This month",
	  code: () =>
		`${dayjs().startOf("month").format("YYYY-MM-DD")},${dayjs()
		  .endOf("month")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last month",
	  code: () =>
		`${dayjs()
		  .subtract(1, "month")
		  .startOf("month")
		  .format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "month")
		  .endOf("month")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last 30 days",
	  code: () =>
		`${dayjs().subtract(30, "day").format("YYYY-MM-DD")},${dayjs().format(
		  "YYYY-MM-DD"
		)}`,
	},
	{
	  name: "This year",
	  code: () =>
		`${dayjs().startOf("year").format("YYYY-MM-DD")},${dayjs()
		  .endOf("year")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Last year",
	  code: () =>
		`${dayjs()
		  .subtract(1, "year")
		  .startOf("year")
		  .format("YYYY-MM-DD")},${dayjs()
		  .subtract(1, "year")
		  .endOf("year")
		  .format("YYYY-MM-DD")}`,
	},
	{
	  name: "Custom date range",
	  code: (startDate, endDate) =>
		`${dayjs(startDate).format("YYYY-MM-DD")},${dayjs(endDate).format(
		  "YYYY-MM-DD"
		)}`,
	},
  ]);
  
  watch(selectedTravelDates, (value) => {
	console.log(`selectedTravelDates is ${value.code()}`);
	const codeValue = value.code();
	if (codeValue) {
	  const departureParam = `departure=${codeValue}`;
	  params.value.departureParam = departureParam;
	} else {
	  delete params.value.departureParam; // Remove the key if the value is empty
	}
	console.log("params.value", params.value);
	fetchOrders();
  });
  
  const onPageChange = (event) => {
  params.value.perPage = event.rows;
  params.value.page = event.page + 1;
 };

  const selectedAdventures = ref();
  const adventures = ref([]);
  const selectedCountries = ref([]);
  const selectedNaturals = ref([]);
  const destinations = ref([]);
  const selectedTravelStyles = ref([]);
  const travelStyles = ref([]);
  
  const selectedOperators = ref();
  const operators = ref([
	{ name: "Authentic Trails", code: "13355" },
	{ name: "Avalon Waterways", code: "1531" },
	{ name: "Do the North", code: "936" },
	{ name: "G Adventures", code: "754" },
	{ name: "Globus", code: "1907" },
	{ name: "Intrepid Travel", code: "204" },
	{ name: "Liberty Holidays", code: "9425" },
	{ name: "Timeless Tours", code: "1806" },
	{ name: "Trafalgar", code: "406" },
  ]);
  

  watch(selectedNaturals, () =>{
	params.value.natural_destinations=selectedNaturals.value;
	fetchOrders();
  });

  watch(selectedCountries, () =>{
	  params.value.countries=selectedCountries.value;
	  fetchOrders();
	});

  watch(selectedTravelStyles, () =>{
	params.value.types= selectedTravelStyles.value;
	fetchOrders();
  });

  watch(selectedAdventures, () =>{
	params.value.tours= selectedAdventures.value;
	console.log('variable de tour:',params.value.tours);
	fetchOrders();
  });

  watch(selectedOperators, () =>{
	params.value.operators=selectedOperators.value;
	fetchOrders();
	});
  	
  
  const selectedAdventureDuration = ref();
  const adventureDuration = ref([
	{ name: "1-2 days", code: "1-2" },
	{ name: "3-5 days", code: "3-5" },
	{ name: "6-10 days", code: "6-10" },
	{ name: "11-15 days", code: "11-15" },
	{ name: "16-20 days", code: "16-20" },
	{ name: "21+ days", code: "21-50" },
  ]);
  
  watch(selectedAdventureDuration, (value) => {
	console.log(`selectedAdventureDuration is ${value.code}`);
	const codeValue = value.code;
	if (codeValue) {
	  const durationParam = `duration=${codeValue}`;
	  params.value.durationParam = durationParam;
	} else {
	  delete params.value.durationParam; 
	}
	console.log("params.value", params.value);
	fetchOrders();
  });
  
  const selectedTripDuration = ref();
  const tripDuration = ref([
	{ name: "1-3 days", code: "1-3" },
	{ name: "4-10 days", code: "4-10" },
	{ name: "11-15 days", code: "11-15" },
	{ name: "16-20 days", code: "16-20" },
	{ name: "21-25 days", code: "21-25" },
	{ name: "26-30 days", code: "26-30" },
	{ name: "31+ days", code: "31-60" },
  ]);
  
  watch(selectedTripDuration, (value) => {
	console.log(`selectedTripDuration is ${value.code}`);
	const codeValue = value.code;
	if (codeValue) {
	  const durationParam = `duration=${codeValue}`;
	  params.value.durationParam = durationParam;
	} else {
	  delete params.value.durationParam; 
	}
	console.log("params.value", params.value);
	fetchOrders();
  });
  
  const fdurationSlider = ref([1, 12]);
  const fdurationSelected = () => {
	params.value.stopsavgParam = fdurationSlider.value;
	fetchOrders();
  };
  const fDurationavgSlider = ref([100, 3000]);
  const stopsSelected = () => {
	params.value.durationavgParam = fDurationavgSlider.value;
	fetchOrders();
  };
  const tripsSlider = ref([1, 10]);
  const tripsSelected = () => {
	params.value.tripsParam = tripsSlider.value;
	fetchOrders();
  };
  
  const paidSlider = ref([1000, 100000]);
  const paidSelected = () => {
	params.value.paidParam = paidSlider.value;
	fetchOrders();
  };
  
  const frequencySlider = ref([0, 10]);
  const frequencySelected = () => {
	console.log("frequencySlider.value", frequencySlider.value);
	fetchOrders();
  };
  
  const profitSlider = ref([100, 10000]);
  const profitSelected = () => {
	console.log("profitSlider.value", profitSlider.value);
	fetchOrders();
  };
  
  const ageSlider = ref([2, 99]);
  const ageSelected = () => {
	console.log("ageSlider.value", params.value.ageSlider);
	fetchOrders();
  };
  
  const selectedGender = ref();
  const gender = ref([
	{ name: "Female", code: "female" },
	{ name: "Male", code: "male" },
	{ name: "Other", code: "other" },
  ]);
  
  watch(selectedGender, (newValue) => {
	const genderCodes = newValue.map((g) => g.code).join(",");
	params.value.gender = genderCodes ? `gender=${genderCodes}` : "";
	fetchOrders();
  });
  
  const selectedTravelerCountry = ref();
  const travelerCountry = ref([]);
  
  watch(selectedTravelerCountry, (newValue) => {
	  params.value.countries=selectedTravelerCountry.value;
	fetchOrders();
  });
  
  const columns = [
	{ field: "last_booking_date", header: "Last booking date" ,active:true},
	{ field: "name", header: "Name" ,active:true},
	{ field: "country", header: "Country" ,active:true},
	{ field: "age", header: "Age" ,active:true},
	{ field: "last_booking_start_city", header: "Last/Next country" ,active:true},
	{ field: "group_size_average", header: "Average group size" ,active:true},
	{ field: "frequency", header: "Travel frequency" ,active:true},
	{ field: "total_orders", header: "Total trips" ,active:true},
	{ field: "total_paid", header: "Total paid" ,active:true},
	{ field: "gross_profit", header: "Total gross profit" ,active:true},
  ];
  
  const orders = ref([]);

  
  async function fetchOrders() {
	loading.value=true;

	params.value.csv=0;
	params.value.search=Search.value;
	try {
		const parsedParams = new URLSearchParams(params.value).toString();
		console.log('contenido de params:',params.value);
		let config = {  method: 'GET', headers: { 'Content-Type': 'application/json'}}
		let  local_url= `${url.value}/api/users-with-orders?${parsedParams}`;
	  
	  const response = await fetch(local_url,config);
	  let result = await response.json();
  
	  if (result.success) {
		orders.value = result.data.data.map((order) => ({
		  last_booking_date: order.last_booking_date,
		  name: order.name,
		  country: order.country,
		  age: order.age,
		  last_booking_start_city: order.last_booking_start_city,
		  group_size_average: order.group_size_average,
		  frequency: order.frequency,
		  total_orders: order.total_orders,
		  total_paid: `$${order.total_paid}`,
		  gross_profit: `$${order.gross_profit}`,
		}));
		totalActionLogs.value=result.data.total;
	  }
	} catch (error) {
	  console.error("Failed to fetch orders:", error);
	}finally{
	  loading.value=false;
	}
  }
  
  
  const onRowClick = (event) => {
	console.log("contenido de evento", event);
	const userId = event.data.user_id;
	router.push(`/admin/travelers/detail?userId=${userId}`);
  };
  
  const resetFilters=()=>{
	params.value ={
	frequencySlider: [0, 10],
	profitSlider: [100, 10000],
	ageSlider: [2, 99],
	tripsParam:[1,10],
	paidParam:[1000,100000],
	durationavgParam:[100, 3000],
	stopsavgParam:[1,12],
	csv:0,
  };
  fetchOrders();
  }
  watch(value, (newValue) => {
	  if (newValue === 'Reset') {
		  resetFilters();      
		  value.value = 'Filter';
	  }
  });
  
  watch(Search,(newValue)=>{
	if (delay.value) clearTimeout(delay.value);

delay.value = setTimeout(() => {
  fetchOrders(); 
   }, 1000); 
  });

	watch(orderBy,()=>{
		params.value.order_by=orderBy.value;
		fetchOrders();
	}); 

  const getCSV= async ()=>{
	  try{
		params.value.csv=1;
		loading.value=true;
		const response = await  userStore.GetUserOrdersCsv(url.value,params.value);
	}catch(error){
		console.error('Error downloading CSV:', error);
	}finally{
		params.value.csv=0;
		loading.value=false;
	}
}


const destinationsList = async ()=>{
	try{
		const response = await tour_Store.getTourList({},url.value);
		console.log('contenido de tourlist:',response);
		if(response.success){
			adventures.value= response.data;
		}
	}catch(error){
		console.log(error);
	}
}

const travelStylesList = async ()=>{
	try{
		const response = await tour_Store.getTourTypes({},url.value);
		if(response.success){
			travelStyles.value= response.data;
		}
	}catch(error){
		console.log(error);
	}
}

const operatorsList = async ()=>{
	try{
     const response= await tour_Store.getOperators({},url.value); 
		 if(response.success){
			operators.value=response.data;
		 }
	}catch(error){
		console.log(error);
	}
}

const naturaldestinationList = async ()=>{
	try{
     const response= await destinationStore.GetNaturalDestinations({},url.value); 
		 if(response.success){
			destinations.value=response.data;
		 }
	}catch(error){
		console.log(error);
	}
}

const countryList = async ()=>{
	try{
     const response= await destinationStore.GetCountries({},url.value); 
	 console.log('contenido de countries:',response.data);
		 if(response.success){
			travelerCountry.value=response.data;
		 }
	}catch(error){
		console.log(error);
	}
}

  onMounted(() => {
	  destinationsList();
	  travelStylesList();
	  operatorsList();
	  naturaldestinationList();
	  countryList();
	  fetchOrders();
  });
  </script>
  
  <style scoped>
  .slider-left input {
	text-align: left;
	width: 50px;
  }
  
  .slider-right input {
	text-align: right;
	width: 50px;
  }
  .days-indicator,
  .price-indicator {
	display: flex;
	justify-content: space-between;
  }
  :deep(.p-button.p-component) {
	padding: 0.4rem;
	font-size: smaller;
  }
  :deep(span.p-dropdown-label.p-inputtext.p-placeholder) {
	padding: 0.4rem;
  }
  :deep(span.p-dropdown-label.p-inputtext) {
	padding: 0.4rem;
  }
  :deep(.p-multiselect-label.p-placeholder) {
	padding: 0.4rem;
  }
  :deep(.p-multiselect.p-multiselect-chip .p-multiselect-token) {
	padding: 0.2rem 0.75rem;
  }
  .sales {
	border: solid 1.3px #ff6c0e;
	border-radius: 5px;
  }
  .suppliers {
	border: solid 1.3px #82cf35;
	border-radius: 5px;
  }
  .filter-padding div {
	padding: 0 0.5rem;
  }
  .text_decoration_none {
	text-decoration: none;
  }
  :deep(.p-datatable .p-datatable-thead > tr > th) {
	background-color: #f3faed;
  }
  @media only screen and (max-width: 767px) {
	.main-spacing {
	  padding: 0.5rem 2rem;
	}
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
	.main-spacing {
	  padding: 0.5rem 2rem;
	}
  }
  @media only screen and (min-width: 1200px) {
	.main-spacing {
	  padding: 2rem 2rem;
	}
  }
  </style>
  