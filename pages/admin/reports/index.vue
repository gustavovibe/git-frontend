<template>
    <div class="overflow-hidden mb-8 main-spacing">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
            <div class="col-12 lg:col-10">
                <div style="background-color: #F2FAEC;">
                    <h1 class="mt-0 mb-1 ml-1 text-2xl">Reports</h1>
                    <p class="mt-1 ml-1 pb-2" style="color: #9CA3AF;">To filter results, choose dates and 1+ filters:</p>
                </div>
                <div class="my-3 border-1 border-round border-bluegray-200">
                    <div class="my-2 filter-padding flex flex-row flex-wrap align-items-center">
                        <div class="text-xl">
                            Dates<span style="color:red;">*</span>
                        </div>
                        <div style="color: #9CA3AF;">Booking:</div>
                        <div class="card">
                            <CalendarPicker :type="'booking'" v-on:update:dates-value="getDates($event)" :key="`bookingDates`" />
													<!-- <InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-calendar" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.booking" :options="bookingDates" optionLabel="name" optionValue="code" placeholder="Choose dates" class="w-full md:w-14rem" />
												</InputGroup> -->
                        </div>
                        <div>or</div>
                        <div style="color: #9CA3AF;">Travel:</div>
                        <div class="card">
                            <CalendarPicker :type="'travel'" v-on:update:dates-value="getDates($event)" :key="`travelDates`" />
													<!-- <InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-calendar" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.travel" :options="travelDates" optionLabel="name" optionValue="code" placeholder="Choose dates" class="w-full md:w-14rem" />
													</InputGroup> -->
                        </div>
                    </div>
                </div>
                <div class="my-3 border-1 border-round border-bluegray-200 bg-bluegray-50">
                    <div class="my-3 filter-padding flex flex-row flex-wrap align-items-center">
                        <div class="text-xl">
                            Category
                        </div>
                        <div class="card flex justify-content-center">
												<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-flag" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.destination_city" :options="destinations_city" optionValue="t_city_id" filteroptionValue="t_city_id" filter optionLabel="city_name" display="chip" placeholder="Destination(s) city"
													:maxSelectedLabels="3" class="w-full md:w-14rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-flag" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.destination_country" :options="destinations_country" optionValue="t_country_id"  filteroptionValue="t_country_id" filter optionLabel="name" display="chip" placeholder="Destination(s) country"
													:maxSelectedLabels="3" class="w-full md:w-16rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-compass" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.travel_style" :options="travelStyles" filter optionLabel="tourtype_name" optionValue="tour_type_id" display="chip" placeholder="Travel style(s)"
													:maxSelectedLabels="3" class="w-full md:w-12rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-user" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.operator" :options="operators" filter optionLabel="name" optionValue="operator_id" display="chip" placeholder="Operator(s)"
													:maxSelectedLabels="3" class="w-full md:w-12rem" />
												</InputGroup>
                        </div>
                    </div>
                    <div class="my-3 filter-padding flex flex-row flex-wrap align-items-center">
                        <div class="text-xl">
                            Adventure
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-car" style="color: #82cf35; "></i>
													</InputGroupAddon> 
													<MultiSelect v-model="params_sent.adventure" :options="adventures" filter  optionLabel="tour_name" optionValue="tour_id" display="chip" placeholder="Adventure(s)"
													:maxSelectedLabels="3" class="w-full md:w-12rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-check" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.status" display="chip" :options="status" optionLabel="name" optionValue="code" placeholder="Status"
													:maxSelectedLabels="3" class="w-full md:w-9rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-clock" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.duration" :options="adventureDuration" optionLabel="name" optionValue="code" placeholder="Duration: adventure" class="w-full md:w-15rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-clock" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.whole_trip" :options="tripDuration" optionLabel="name" optionValue="code" placeholder="Duration: whole trip" class="w-full md:w-15rem" />
												</InputGroup>
                        </div>
                    </div>
                    <div class="my-3 filter-padding flex flex-row flex-wrap align-items-center">
                        <div class="text-xl">
                            Flights
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-send" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.carrier" :options="carriers" filter optionLabel="carrier" optionValue="carrier" display="chip" placeholder="Carrier"
													:maxSelectedLabels="3" class="w-full md:w-10rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-flag" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
                                                    <MultiSelect v-model="selectedDeparturePlace" :options="departurePlace" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" display="chip" placeholder="Departure place" class="w-full md:w-14rem">
                                                    </MultiSelect>
												</InputGroup>
                        </div>
                    </div>
                    <div class="my-3 filter-padding flex flex-row flex-wrap align-items-center">
                        <div class="text-xl">
                            Traveler
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-angle-double-right" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.age_group" display="chip" :options="ageGroup" optionLabel="name" optionValue="code" placeholder="Age group"
													 class="w-full md:w-10rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-at" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.gender" display="chip" :options="gender" optionLabel="name" optionValue="code" placeholder="Gender"
													:maxSelectedLabels="3" class="w-full md:w-10rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-users" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.group_size" display="chip" :options="groupSize" optionLabel="name" optionValue="code" placeholder="Group size"
													:maxSelectedLabels="3" class="w-full md:w-10rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-globe" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.country" :options="travelerCountry" filter optionLabel="name" optionValue="name" display="chip" placeholder="Country"
													:maxSelectedLabels="3" class="w-full md:w-10rem" />
												</InputGroup>
                        </div>
                    </div>
                    <div class="my-3 filter-padding flex flex-row flex-wrap align-items-center">
                        <div class="text-xl">
                            Booking
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-filter" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.channel" display="chip" :options="channel" optionLabel="name" optionValue="code" placeholder="Channel"
													:maxSelectedLabels="3" class="w-full md:w-10rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-credit-card" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.payment_method" display="chip" :options="paymentMethod" optionLabel="name" optionValue="code" placeholder="Payment method"
													:maxSelectedLabels="3" class="w-full md:w-14rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-desktop" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.medium" display="chip" :options="medium" optionLabel="name" optionValue="code" placeholder="Medium"
													:maxSelectedLabels="3" class="w-full md:w-9rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-clock" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<Dropdown v-model="params_sent.hour" :options="timeOfDay" optionLabel="name" optionValue="code" placeholder="Time of the day" class="w-full md:w-14rem" />
												</InputGroup>
                        </div>
                        <div class="card flex justify-content-center">
													<InputGroup>
													<InputGroupAddon style="background-color: white;">
															<i class="pi pi-calendar" style="color: #82cf35; "></i>
													</InputGroupAddon> 	
													<MultiSelect v-model="params_sent.day"  display="chip" :options="paymentDay" optionLabel="name" optionValue="code" placeholder="Day of the week"
													:maxSelectedLabels="3" class="w-full md:w-14rem" />
												</InputGroup>
                        </div>
                    </div>
                </div>
                <div class="card my-3">
                    <SelectButton v-model="value" :options="filterOptions" aria-labelledby="basic" />
                </div>
								<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <div>
                    <div class="card sales">
                        <DataTable :value="salesDetails" tableStyle="min-width: 50rem">
                            <Column field="total_sales" header="Total sales" class="total_sales"></Column>
                            <Column field="orders" header="Orders"></Column>
                            <Column field="travelers" header="Travelers"></Column>
                            <Column field="average_sales" header="Average sales/pp"></Column>
                            <Column field="average_price" header="Average price/pp/day"></Column>
                        </DataTable>
                    </div>
                    <div class="card suppliers mt-3">
                        <DataTable :value="suppliersDetails" tableStyle="min-width: 50rem">
                            <Column field="suppliers_paid" header="Total Paid to Suppliers"></Column>
                            <Column field="refunded" header="Total Refunded"></Column>
                            <Column field="discount" header="Total Discount"></Column>
                            <Column field="gross_profit" header="Total Gross Profit" class="gross_profit"></Column>
                            <Column field="profit_ratio" header="Gross Profit Ratio" class="profit_ratio"></Column>
                        </DataTable>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="card">
                        <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
                    </div>
                    <div class="card">
                        <div class="flex justify-content-center flex-wrap font-bold text-xl my-3">Value of Orders (USD)</div>
                        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
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
    import { ref, onMounted } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import SelectButton from 'primevue/selectbutton';
    import Chart from 'primevue/chart';
    import Dropdown from 'primevue/dropdown';
    import MultiSelect from 'primevue/multiselect';
    import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
	import {useOrderStore} from "~/store/orderStore";
	import {tourStore} from "~/store/tourStore";
	import { useDestinationStore } from '~/store/destinationStore';
	import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
	import ProgressBar from 'primevue/progressbar';
    import CalendarPicker from '~/components/Reports/CalendarPicker.vue';

	const destinationStore = useDestinationStore();
	const orderStore = useOrderStore();
    const tour_Store = tourStore();
	const totalDestination = ref(0);
	const data_count = ref(0);
	const loading=ref(false);
	const rowsPerPage=ref(15);
	const config = useRuntimeConfig();
	const url = ref(config.public.BACKEND_URL);

	const value = ref('Filter');
    const options = ref(['Value of orders', 'Number of orders']);
    const filterOptions = ref(['Filter', 'Reset']);
    const chartData = ref();
    const chartOptions = ref();

	const table_data=ref({});
	const params_sent =ref({
		booking: [],
		travel: [],
		operator:'',
		travel_style:'',
		destination_city:'',
		destination_country:'',
		adventure:'',
		status:'',
		whole_trip:'',
		duration:'',
		carrier:'',
		age_group:'',
		group_size:'',
		gender:'',
		country:'',
		channel:'',
		payment_method:'',
		medium:'',
		day:'',
		hour:'',
	});


 const resetFilters = () => {
    params_sent.value = {
        page: 1,
        limit: 15,
        booking: [],
        travel: [],
        operator: '',
        travel_style: '',
        destination_city: '',
        destination_country: '',
        adventure: '',
        status: '',
        whole_trip: '',
        duration: '',
        carrier: '',
        age_group: '',
        group_size: '',
        gender: '',
        country: '',
        channel: '',
        payment_method: '',
        medium: '',
        day: '',
        hour: '',
    };
};

const getDates = (date) => {
    const {dataRange, type} = date;

    console.log(type)
    if (type === 'booking') {
        params_sent.value.booking = [dataRange[0], dataRange[1]];
    } else if (type === 'travel') {
        params_sent.value.travel = [dataRange[0], dataRange[1]];
    }
};

const countryList = async ()=>{
	try{
     const response= await destinationStore.GetCountries({},url.value); 
		 if(response.success){
			travelerCountry.value=response.data;
		 }
	}catch(error){
		console.log(error);
	}
}

const countrytourList = async ()=>{
	try{
     const response= await destinationStore.GetTourCountries({list:1},url.value); 
	 console.log('contenido de countries:',response);
		 if(response.success){
			destinations_country.value=response.data;
		 }
	}catch(error){
		console.log(error);
	}
}

const destinationList = async ()=>{
	try{
     const response= await destinationStore.GetCities({},url.value); 
	 console.log('contenido de destinations:',response);
		 if(response.status){
			destinations_city.value=response.response;
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

const tourtypeList = async ()=>{
	try{
		const response = await tour_Store.getTourTypes({},url.value);
		if(response.success){
			travelStyles.value= response.data;
		}
	}catch(error){
		console.log(error);
	}
}

const tourList = async ()=>{
	try{
		const response = await tour_Store.getTourList({},url.value);
		if(response.success){
			adventures.value= response.data;
		}
	}catch(error){
		console.log(error);
	}
}

const carrierList = async ()=>{
	try{
		const response = await tour_Store.getCarrierList(url.value);
		if(response.success){
			carriers.value= response.data;
		}
	}catch(error){
		console.log(error);
	}
}

const orderReport = async ()=>{
	try{
		const response = await orderStore.GetAdminReports(params_sent.value,url.value);
		if(response.success){
			table_data.value= response.data[0];
			console.log('contenido para reportes:',table_data.value);
		}
	}catch(error){
		console.log(error);
	}
}

const OrdersView = async ()=>{
		loading.value=true;
		await orderReport();
        Sales.getDetails().then((data) => (salesDetails.value = data));
        Suppliers.getDetails().then((data)=>(suppliersDetails.value = data));
		loading.value=false;
		chartData.value = setChartData();
		chartOptions.value = setChartOptions();
}



    const salesDetails = ref();
    const Sales = {
            getSalesData() {
                return [
                    {
                        total_sales: table_data.value.total_sales,
                        orders: table_data.value.orders,
                        travelers: table_data.value.travelers,
                        average_sales: table_data.value.average_sales,
                        average_price: table_data.value.average_price
                    }
                ];
            },

            getDetails() {
                return Promise.resolve(this.getSalesData().slice(0, 10));
            }
        };
    const suppliersDetails = ref();
    const Suppliers = {
            getSuppliersData() {
                return [
                    {
                        suppliers_paid: table_data.value.suppliers_paid,
                        refunded: table_data.value.refunded,
                        discount: table_data.value.discount,
                        gross_profit: table_data.value.gross_profit,
                        profit_ratio: table_data.value.profit_ratio
                    }
                ];
            },

            getDetails() {
                return Promise.resolve(this.getSuppliersData().slice(0, 10));
            }
        };

    const setChartData = () =>  {
        const documentStyle = getComputedStyle(document.documentElement);

        return {
            labels: table_data.value.chart_data['labels'],
            datasets: table_data.value.chart_data['datasets']
        };
    };
    const setChartOptions = () =>  {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        return {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    // TODO - delete this variables when finish the new design
    const bookingDates = ref([
		{name: 'All times', code: 0},
		{name: 'Today', code: 1},
		{name: 'Yesterday', code: 2},
		{name: 'Last 7 days', code: 3},
		{name: 'Last 30 days', code: 4},
		{name: 'This week', code: 5},
		{name: 'Last week', code: 6},
		{name: 'This month', code: 7},
		{name: 'Last month', code: 8},
		{name: 'This year', code: 9},
		{name: 'Last year', code: 10},
    ]);

    const travelDates = ref([
		{name: 'All times', code: 0},
		{name: 'Today', code: 1},
		{name: 'Yesterday', code: 2},
		{name: 'Last 7 days', code: 3},
		{name: 'Last 30 days', code: 4},
		{name: 'This week', code: 5},
		{name: 'Last week', code: 6},
		{name: 'This month', code: 7},
		{name: 'Last month', code: 8},
		{name: 'This year', code: 9},
		{name: 'Last year', code: 10},
    ]);


    const destinations_city = ref();
    const destinations_country = ref();
    const travelStyles = ref();
    const operators = ref();
    const adventures = ref();
    const status = ref([
		{name: 'Confirmed', code: 'confirmed'},
		{name: 'Pending', code: 'pending'},
		{name: 'Canceled', code: 'canceled'}
    ]);
    
    const adventureDuration = ref([
		{name: '1-2 days', code: '1-2'},
		{name: '3-5 days', code: '3-5'},
		{name: '6-10 days', code: '6-10'},
		{name: '11-15 days', code: '11-15'},
		{name: '16-20 days', code: '16-20'},
		{name: '21+ days', code: '21-99'}
    ]);
    
    const tripDuration = ref([
		{name: '1-3 days', code: '1-3'},
        {name: '4-10 days', code: '4-10'},
        {name: '11-15 days', code: '11-15'},
        {name: '16-20 days', code: '16-20'},
        {name: '21-25 days', code: '21-25'},
        {name: '26-30 days', code: '26-30'},        
        {name: '31+ days', code: '31-99'}
    ]);
 
    const carriers = ref();
    const selectedDeparturePlace = ref();
    const departurePlace = ref([
        {
        label: 'Germany',
        code: 'DE',
        items: [
            { label: 'Berlin airport', value: 'Berlin' },
            { label: 'Frankfurt airport', value: 'Frankfurt' },
            { label: 'Hamburg airport', value: 'Hamburg' },
            { label: 'Munich airport', value: 'Munich' }
        ]
    },
    {
        label: 'USA',
        code: 'US',
        items: [
            { label: 'Chicago airport', value: 'Chicago' },
            { label: 'Los Angeles airport', value: 'Los Angeles' },
            { label: 'New York airport', value: 'New York' },
            { label: 'San Francisco airport', value: 'San Francisco' }
        ]
    },
    {
        label: 'Japan',
        code: 'JP',
        items: [
            { label: 'Kyoto airport', value: 'Kyoto' },
            { label: 'Osaka airport', value: 'Osaka' },
            { label: 'Tokyo airport', value: 'Tokyo' },
            { label: 'Yokohama airport', value: 'Yokohama' }
        ]
    }
    ]);
   
    const ageGroup = ref([
		{name: '18-24', code: '18-24'},
        {name: '25-34', code: '25-34'},
        {name: '35-44', code: '35-44'},
        {name: '45-54', code: '45-54'},
        {name: '55-64', code: '55-64'},
        {name: '65+',   code: '65-99'}
    ]);
 
    const gender = ref([
	{name: 'Female', code: 'female'},
	{name: 'Male', code: 'male'},
	// {name: 'Other', code: 'other'}
    ]);
   
    const groupSize = ref([
		{name: '1', code: 1},
		{name: '2', code: 2},
		{name: '3', code: 3},
		{name: '4', code: 4},
		{name: '5', code: 5},
		{name: '6', code: 6},
		{name: '7', code: 7},
		{name: '8', code: 8},
		{name: '9', code: 9},
		{name: '10', code: 10},
		{name: '11+', code: 11}
    ]);
  
    const travelerCountry = ref();
  
    const channel = ref([
        {name: 'Direct: web', code: 'web'},
        {name: 'Affiliate', code: 'affiliate'},
        {name: 'Referral', code: 'referral'}
    ]);
  
    const paymentMethod = ref([
        {name: 'Cards and wallet', code: 'card_and_wallet'},
        {name: 'Bank debits and transfers', code: 'bank_debits_and_transfers'},
        {name: 'Additional payment methods', code: 'additional_payment_methods'},
        {name: 'Buy Now Pay Later', code: 'buy_now_pay_later'}
	]);
 
		const medium = ref([
		{name: 'Desktop', code: 'desktop'},
		{name: 'Mobile', code: 'mobile'},
		{name: 'Tablet', code: 'tablet'}
		]);
   
    const timeOfDay = ref([
	{name: '0-4 hours', code: 1},
	{name: '5-8 hours', code: 2},
	{name: '9-12 hours', code: 3},
	{name: '13-16 hours', code: 4},
	{name: '17-20 hours', code: 5},
	{name: '21-24 days', code: 6}
	]);
  
    const paymentDay = ref([
        {name: 'Monday', code: 1},
        {name: 'Tuesday', code: 2},
        {name: 'Wednesday', code: 3},
        {name: 'Thursday', code: 4},
        {name: 'Friday', code: 5},
        {name: 'Saturday', code: 6},
        {name: 'Sunday', code: 7}
	]);

	watch(value, (newValue) => {
    if (newValue === 'Reset') {
        resetFilters();      
        value.value = 'Filter';
    }
});
		
watch(() => params_sent, () => {
	OrdersView();
   console.log('contenido de params;',params_sent.value);
}, { deep: true });

    onMounted(async () => {
	
		countryList();
		destinationList();
		operatorsList();
		tourtypeList();
		tourList();	
		carrierList();
		countrytourList();
		OrdersView();
	
		
    });
</script>

<style scoped>
:deep(.p-datatable .p-column-header-content){
    justify-content: center;
    font-size: smaller;
    color: #9CA3AF;
    font-weight: 400;
}
:deep(.p-datatable .p-datatable-tbody > tr > td){
    text-align: center;
    font-size: large;
}
:deep(.p-datatable .p-datatable-thead > tr > th){
    width: 100px;
    text-align: center;
}
:deep(td.total_sales){
    font-weight: bold;
}
:deep(td.gross_profit){
    font-weight: bold;
}
:deep(td.profit_ratio){
    font-weight: bold;
    color: #82cf35;
}
:deep(th){
    background-color: white;
    border: none;
    padding: 0.3rem 1rem;
}
:deep(.p-button.p-component.p-highlight){
    background-color: #82cf35;
    border-color: #82cf35;
}
:deep(.p-button.p-component){
    padding: 0.4rem;
    font-size: smaller;
}
:deep(span.p-dropdown-label.p-inputtext.p-placeholder){
    padding: 0.4rem;
}
:deep(span.p-dropdown-label.p-inputtext){
    padding: 0.4rem;
    font-family: interstate !important;
}
:deep(.p-multiselect-label.p-placeholder){
    padding: 0.4rem;
}
:deep(.p-multiselect.p-multiselect-chip .p-multiselect-token){
    padding: 0.2rem 0.75rem;
}
.sales{
    border: solid 1.3px #ff6c0e;
    border-radius: 5px;
}
.suppliers{
    border: solid 1.3px #82cf35;
    border-radius: 5px;
}
.filter-padding div{
    padding: 0 0.5rem;
}
@media only screen and (max-width:767px){
    .main-spacing{
        padding: 0.5rem 2rem;
        margin-top: 5rem;
    }
}
@media only screen and (min-width: 768px) and (max-width: 1199px){
    .main-spacing{
        padding: 0.5rem 2rem;
    }
}
@media only screen and (min-width:1200px){
    .main-spacing{
        padding: 2rem 2rem;
    }
}
</style>

