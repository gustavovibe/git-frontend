<template>
    <div class="overflow-hidden mb-8 main-spacing-cms">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
            <div class="col-12 lg:col-10">
                <div class="flex align-items-center justify-content-between back-green-vibe-light px-5">
                    <div>
                        <h1 class="canaro-font font-semibold my-1">Adventures</h1>
                        <p class="my-1">Showing {{ data_count }} adventures (net prices from Tour Radar in USD)</p>
                    </div>
                    <div>
												<button class="btn-c" @click="ExportCSV" ><b>Export to CSV</b></button>
												<!-- <button class="btn-c"><b>Sort by</b></button> -->
												<Dropdown  v-model="paramsSent.order" class="btn-d" :options="sort_list" optionLabel="text" optionValue="code" placeholder="Sort by" />
                    </div>
                </div>
                <div class="my-4 md:flex">
                    <div class="card">
												<InputGroup>
												
													<IconField iconPosition="left">
															<InputIcon class="pi pi-search"> </InputIcon>
															<InputText  v-model="paramsSent.tour_name" editable optionLabel="name" placeholder="Search by name" class="w-full md:w-20rem w-8rem mr-3" />
													</IconField>
													<!-- <Dropdown  v-model="paramsSent.city" :options="dataC" editable  optionLabel="city_name" optionValue="t_city_id" placeholder="Destinations" checkmark :highlightOnSelect="false" class="w-full md:w-12rem drops"   @change="onCityInput"/> -->
													<div>
														<MultiSelect v-model="selectedCityIds"  :options="dataC" optionLabel="city_name" optionValue="t_city_id" placeholder="Select Cities" class="w-full md:w-12rem drops" :filter="true" @filter="onCityInput"  @change="updateSelectedCities"/>
													</div>						
													
													<Dropdown  v-model="paramsSent.tour_type" :options="travel_list" optionLabel="text" optionValue="code" placeholder="All Travel Styles" checkmark :highlightOnSelect="false" class="w-full md:w-14rem drops w-8rem mr-3" showClear />
													
													<div style="margin-right: 10px;">
														<div>
															<Button label="Any Commission" severity="secondary" outlined  class="dropdown-button w-14rem" @click="tgp" />
														</div>
														<div v-if="dVp" class="dropdown-content" style="padding-top: 30px;padding-bottom: -1px;">
															<Slider v-model="paramsSent.commission" :options="comission_list"  :min="minCommission" :max="maxCommission"  :step="0.01" range class="w-12rem" />
															<p style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">{{getCommissionText(paramsSent.commission[0]) }} - {{ getCommissionText(paramsSent.commission[1]) }}</p>						
														</div>
													</div>
													
													<div style="margin-right: 10px;">
														<div>
															<Button label="Total Paid" severity="secondary" outlined  class="dropdown-button w-14rem" @click="tbc" />
														</div>
														<div   v-if="dVc" class="dropdown-content" style="padding-top: 30px;padding-bottom: -1px;">
															<Slider v-model="paramsSent.range" :options="paid_list"  :min="minPaid" :max="maxPaid"  :step="1000" range class="w-12rem" />
															<p style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;"> {{ paramsSent.range[0] }} - {{ paramsSent.range[1] }}</p>						
														</div>						
													</div>

													<!-- <Dropdown  v-model="paramsSent.limit" :options="limits" optionLabel="text" optionValue="code" placeholder="0" checkmark :highlightOnSelect="false" class="w-full md:w-7rem drops" /> -->
												</InputGroup>
                    </div>
                    <div class="my-4 md:my-0">
                        <a class="text_decoration_none md:mx-2">
                            <button class="btn-custom md:px-6 cover-mobile" style="padding-top: 0.7rem;padding-bottom: 0.7rem;" @click="getTours">
                            Search
                            </button>
                        </a>
                    </div>
                </div>
								<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
								<div v-for="city in selectedCities" :key="city.id" style="display: flex; align-items: center;">
									<span>{{ city.text }}</span>
									<Button 
										style="color: gray; background-color: white; border-radius: 15px; border-color: gray; margin-left: 5px;" 
										@click="removeCity(city.id)"
									>
										<i class="pi pi-times"></i>
									</Button>
								</div>
							</div>
                <ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <div class="my-4">
                    <div class="card">
                        <DataTable :value="dataT.data"   tableStyle="min-width: 50rem">
                            <!-- <Column selectionMode="single"></Column> --> 
                            <Column field="tour_name" header="Name" ></Column>
                            <Column header="Destination(s)">
															<template #body="slotProps">
																	<a  v-tooltip="getTravelStyleTooltip(slotProps.data.cities_tour)">{{ slotProps.data.cities_tour[0] }}</a>
															</template>
														</Column>
                            <Column  header="Travel style">
															<template #body="slotProps">
																<a  v-tooltip="getTravelStyleTooltip(slotProps.data.travel_style)" >{{ slotProps.data.travel_style[0] }}</a>
															</template>
														</Column>
                            <Column field="max_group_size" header="Max group size"></Column>
                            <Column header="Terms">
															<template #body="slotProps">
																<a @click="Terms(slotProps.data.operator_id)"><u>Sent</u></a>
															</template>
														</Column>
														<Column field="orders_count" header="Bookings"></Column>
                            <Column field="commission" header="Commission(%)"></Column>
                            <Column field="total_commision" header="Total Commission">
															<template #body="slotProps">
																	 <p>{{'$'+Math.ceil( slotProps.data.total_commision) }}</p>
																</template>
															</Column>
                            <Column field="price_total" header="Total paid">
															<template #body="slotProps">
																	 <p>{{ '$'+Math.ceil(slotProps.data.price_total) }}</p>
																</template>
														</Column>
                        </DataTable>
												<div class="card">
													<Paginator 
															:rows="rowsPerPage" 
															:totalRecords="totalDestination" 
															:rowsPerPageOptions="[10, 20, 30]"
															@page="onPageChange">
														</Paginator>
												</div>
                    </div>
                </div>
								<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
            </div>
        </div>
    </div>


		<Dialog v-model:visible="visible" modal header="Terms & Conditions" :style="{ width: '40rem' }">
			<div style="text-align: center;">
				<ProgressSpinner v-if="spinner" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
			animationDuration=".5s" aria-label="Custom ProgressSpinner" />
			</div>
		<div v-if="errormessage!=''">
				<label>{{ errormessage }}</label>
		</div>			
	<div v-html="text_message" v-if="!spinner"></div>
		</Dialog>
		<Toast />
</template>


<script setup>
	definePageMeta({
		middleware: ['auth','profile'],
	});
    import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
    import { ref, onMounted, watch  } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import InputText from 'primevue/inputtext';
    import ProgressBar from 'primevue/progressbar';
    import { useToast } from "primevue/usetoast";
    import IconField from 'primevue/iconfield';
    import InputIcon from 'primevue/inputicon';
	import Dropdown from 'primevue/dropdown';
	import InputGroup from 'primevue/inputgroup';
	import Dialog from 'primevue/dialog';
	import ProgressSpinner from 'primevue/progressspinner';
	import Slider from 'primevue/slider';
	import MultiSelect from 'primevue/multiselect';
	import Button from 'primevue/button';
	import Paginator from "primevue/paginator";
	
	
	const config = useRuntimeConfig();
	const toast = useToast();
	const loading = ref(false);
	const spinner=ref(false);
	const data_count = ref(0);

	const dataT=ref([]);
	const dataC=ref([]);

	const visible=ref(false);
	const selectedUrl=ref('');

	const text_message = ref('');
	const errormessage = ref('');

	const selectedCityIds = ref([]);
	const selectedCities = ref([]);

	const rowsPerPage=ref(15);
	const totalDestination = ref(0);

	const dVc = ref(false);
	const dVp = ref(false);

	const paramsCities=ref({
		city_name:'',
		limit:15
	})

	const tgp = () => {
	dVp.value = !dVp.value;
	};

	const tbc = () => {
	dVc.value = !dVc.value;
	};

	const sort_list=ref([
		{code:[1,1] ,text:'Name: A to Z'},
		{code:[1,2],text:'Name: Z to A'},
		{code:[2,2],text:'Max group size: max first'},
		{code:[2,1],text:'Max group size: min first'},
		{code:[3,2],text:'Bookings (#): max first'},
		{code:[3,1],text:'Bookings (#): min first'},
		{code:[4,2],text:'Commission (%): max first'},
		{code:[4,1],text:'Commission (%): min first'},
		{code:[5,2],text:'Total commission ($): max first'},
		{code:[5,1],text:'Total commission ($): min first'},
		{code:[6,2],text:'Total paid ($): max first'},
		{code:[6,1],text:'Total paid ($): min first'},
	]);

	const comission_list=ref([
		{code:0,text:'0%'},
		{code:0.01,text:'1%'},
		{code:0.02,text:'2%'},
		{code:0.03,text:'3%'},
		{code:0.04,text:'4%'},
		{code:0.05,text:'5%'},
		{code:0.06,text:'6%'},
		{code:0.07,text:'7%'},
		{code:0.08,text:'8%'},
	]);

	const minCommission = Math.min(...comission_list.value.map(item => item.code));
    const maxCommission = Math.max(...comission_list.value.map(item => item.code));

	const getCommissionText = (code) => {
	const commission = comission_list.value.find(item => item.code === code);
	return  commission.text;
	};

	const paid_list=ref([0,15000]); 

	const minPaid = Math.min(...paid_list.value);
    const maxPaid = Math.max(...paid_list.value);

	const paramsSent=ref({
		tour_name:'',
		limit:15,
		admin:1,
		commission:[minCommission, maxCommission],
		range:[minPaid,maxPaid],
		city:[],
		tour_type:0	,
		name:'',
		page:1,
		order:[1,1]
	});

	const limits=ref([
		{code:15,text:'15'},
		{code:30,text:'30'},
		{code:50,text:'50'},
		{code:100,text:'100'},
		{code:0,text:'All'},
	])


	const travel_list=ref([
		{code:4, text:'Overland Truck'},
		{code:32, text:'Bicycle'},
		{code:56, text:'Sailing'},
		{code:73, text:'Hiking & Treeking'},
		{code:77, text:'In-depth Cultural'},
		{code:178, text:'Food & Culinary'},
		{code:189, text:'Safari'},
		{code:209, text:'River Cruise'},
		{code:330, text:'Health, Spa & Wellness'},
		{code:381, text:'Festival & Events'},
		{code:383, text:'Explorer'},
		{code:385, text:'Active'},
	]);

	const Terms=async(url)=>{
		visible.value=true;
		selectedUrl.value=url;
		console.log('parametro enviado',url);
		try {
			spinner.value = true;
			const res = await fetch(`${config.public.BACKEND_URL}/api/tours-text?operator_id=${selectedUrl.value}`,{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();
			console.log('contenido de respuesta:',data.response)
			if (data.status) {
				console.log( 'contenido de adventures',data);
				text_message.value=data.response.terms_text;
			}else{
				console.error('Error fetching data:',data.response);
				text_message.value=data.response.message;
			} 
			spinner.value = false;
		} catch (error) {
		 console.error('Error fetching data:', error);
		}finally {
        loading.value = false; 
         }
	} 


	const getTravelStyleTooltip = (travelStyles) => {
		const lista=ref('');
		lista.value=travelStyles.join(', ')
		return lista;
	};

	const getTours = async () => {
        try {
            loading.value = true;
			paramsSent.value.city=selectedCityIds.value;
			const queryString = new URLSearchParams(paramsSent.value).toString();
	/* 		paramsSent.value.range=paramsSent.value.range.join(','); */
            const res = await fetch(`${config.public.BACKEND_URL}/api/show-tours?${queryString}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        	});
            const data = await res.json();
            if (res.status) {
				dataT.value = data.response;
				data_count.value=data.response.total;
				totalDestination.value=data.response.total;
				toast.add({ severity: 'success', summary: 'Success!!', detail: 'Data Loaded', life: 3000 });
			if(Number.isInteger(paramsSent.value.city)){
			 paramsSent.value.city = paramsSent.value.city
			}
            } else {
                dataT.value = [];
            }
        } catch (error) {
           /*  console.error('Error fetching data:', error); */
        }finally {
        loading.value = false; 
         }
    };


	const getCities = async () => {
        try {
				loading.value = true;
				const queryString = new URLSearchParams(paramsCities.value).toString();
				const res = await fetch(`${config.public.BACKEND_URL}/api/cities-c?${queryString}`,{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				if (data.status) {
				console.log
				dataC.value = data.response;
				
				selectedCityIds.value.forEach(id => {
					const city = selectedCities.value.find(city => city.id === id);
					if (city && !dataC.value.some(option => option.t_city_id === city.id)) {
					dataC.value.push({ t_city_id: city.id, city_name: city.text });
					}
				});
				} 
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally {
        loading.value = false; 
         }
    };

	const onCityInput =(event) => {
		paramsCities.value.city_name = event.value;
		getCities();
	};

	const updateSelectedCities = () => {
	selectedCities.value = selectedCityIds.value.map(id => {
		const city = dataC.value.find(option => option.t_city_id === id);
		return city ? { id: city.t_city_id, text: city.city_name } : null;
	}).filter(city => city !== null);
	};

	const removeCity = (id) => {
	selectedCityIds.value = selectedCityIds.value.filter(cityId => cityId !== id);
	selectedCities.value = selectedCities.value.filter(city => city.id !== id);
	};

	const ExportCSV=()=>{
		const headers = ['Name', 'Destination(s)', 'Travel style', 'Max group size', 'Commission(%)', 'Total Commission', 'Total paid'];
		const rows = dataT.value.map(row => [
			row.tour_name,
			row.city_name,
			row.travel_style,
			row.max_group_size,
			row.commission,
			row.total_commision,
			row.price_total
		]);

		let csvContent = "data:text/csv;charset=utf-8," 
			+ headers.join(",") 
			+ "\n" 
			+ rows.map(e => e.join(",")).join("\n");

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "data.csv");
		document.body.appendChild(link);

		link.click(); 
		document.body.removeChild(link);
	}

	const onPageChange = (event) => {
      paramsSent.value.page = event.page + 1; 
	  paramsSent.value.limit=rowsPerPage.value,
      getTours();
    };

	onMounted(() => {
		getCities();
        getTours(); 
    });
	</script>

	<style scoped>
		.drops {
			border-radius: 8px;
			margin-right: 6px;
			height: 3rem;
		}
		.btn-c{
			padding:13px;
			margin-left:10px;
			border-radius: 5px;
			border-color: rgb(201, 195, 195);
			background-color: white;
			font-style: bold;
		}
		.horizontal-list {
		display: flex;
		flex-wrap: wrap; /* Permite que los elementos se ajusten en nuevas líneas si es necesario */
		justify-content: center; /* Centra los elementos horizontalmente */
		align-items: center; /* Alinea los elementos verticalmente */
		gap: 10px; /* Espacio entre los elementos */
		}

	.horizontal-list-item {
		display: flex;
		align-items: center;
		padding: 5px 10px; /* Espacio dentro de cada elemento */
		border: 1px solid #ddd; /* Opcional: borde alrededor de cada elemento */
		border-radius: 5px; /* Opcional: bordes redondeados */
	}
	.dropdown-button {
  display: inline-block;
  position: relative;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
  </style>