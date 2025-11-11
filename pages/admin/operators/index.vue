<template>
     <div class="overflow-hidden mb-8 main-spacing-cms">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
						<div class="col-12 lg:col-10">
							<div class="flex align-items-center justify-content-between back-green-vibe-light px-5">
                    <div>
                        <h1 class="canaro-font font-semibold my-1">Operators</h1>
                        <p class="my-1">Showing {{ count }} operators</p>
                    </div>
                    <div>
												<button class="btn-c" @click="ExportCSV"><b>Export to CSV</b></button>
												<!-- <button class="btn-c"><b>Sort by</b></button> -->
												<Dropdown  v-model="paramsSent.order" class="btn-d" :options="sort_list" optionLabel="text" optionValue="code" placeholder="Sort by" />
                    </div>
                </div>

									<div class="my-4 md:flex">
											<div class="card">
													<InputGroup>
														<IconField iconPosition="left">
															<InputIcon class="pi pi-search"> </InputIcon>
															<InputText v-model="paramsSent.name"  editable optionLabel="name" placeholder="Search by name" class="w-full md:w-20rem w-8rem mr-3" />
													</IconField>
													</InputGroup>
											</div>
													<div>
														<MultiSelect v-model="selectedCityIds"  :options="dataC" optionLabel="city_name" optionValue="t_city_id" placeholder="Destinations" class="w-full md:w-12rem drops" :filter="true" @filter="onCityInput"  @change="updateSelectedCities" />
													</div>	
											
													<div >
														<div>
															<Button label="Any Commission" severity="secondary" outlined  class="dropdown-button w-14rem" @click="tgp" />
														</div>
														<div v-if="dVp" class="dropdown_s" style="padding-top: 30px;padding-bottom: -1px;">
															<Slider v-model="paramsSent.commission" :options="comission_list"  :min="minCommission" :max="maxCommission"  :step="0.01" range class="w-13rem" />
															<p style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">{{getCommissionText(paramsSent.commission[0]) }} - {{ getCommissionText(paramsSent.commission[1]) }}</p>						
														</div>
													</div>
													
													<div >
														<div>
															<Button label="Total Paid" severity="secondary" outlined  class="dropdown-button w-14rem" @click="tbc" />
														</div>
														<div   v-if="dVc" class="dropdown_s"  style="padding-top: 30px;padding-bottom: -1px;">
															<Slider v-model="paramsSent.range" :options="paid_list"  :min="minPaid" :max="maxPaid"  :step="500" range class="w-13rem" />
															<p style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;"> {{ paramsSent.range[0] }} - {{ paramsSent.range[1] }}</p>						
														</div>						
													</div>								
						
											<div class="my-4 md:my-0">
                        <a class="text_decoration_none md:mx-2">
                            <button class="btn-custom md:px-6 cover-mobile" style="padding-top: 0.7rem;padding-bottom: 0.7rem;" @click="getOperators">
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
                        <DataTable  :value="dataT"  tableStyle="min-width: 50rem">
                            <Column field="name" header="Name" ></Column>
                            <Column field="tours_count" header="#adventures" bodyClass="center-align" headerClass="center-align"></Column>
                            <Column  header="#countries" bodyClass="center-align" headerClass="center-align">
															<template #body="slotProps">
																	<a  v-tooltip="getTravelStyleTooltip(slotProps.data.countries_name)">{{ slotProps.data.countries_t }}</a>
															</template>
														</Column>
                            <Column field="average_size_group" header="#average group size" bodyClass="center-align" headerClass="p-text-center"></Column>
                            <Column header="Terms" >
															<template #body="slotProps">
																	 <a @click="Terms(slotProps.data.operator_id)"><u>Sent</u></a>
																</template>
														</Column>
                            <Column field="orders_count" header="Total trips" bodyClass="center-align"></Column>
                            <Column field="comission_r" header="Commission (%)" bodyClass="center-align"></Column>
                            <Column  header="Total paid" bodyClass="center-align">
														<template #body="slotProps">
																<a>{{ '$'+Math.ceil(slotProps.data.total_paid) }}</a>
														</template></Column>
                            <Column field="total_paid_commission" header="Total commission" bodyClass="center-align" >
															<template #body="slotProps">
																<a>{{ '$'+Math.ceil(slotProps.data.total_paid_commission) }}</a>
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
	

	const count=ref(0);
	const config = useRuntimeConfig();
	const toast = useToast();
	const spinner=ref(false);
	const loading = ref(false);
	const visible=ref(false);

	const dVc = ref(false);
	const dVp = ref(false);

	const rowsPerPage=ref(15);
	const totalDestination = ref(0);

	const paid_list=ref([0,50000]); 

	const minPaid = Math.min(...paid_list.value);
    const maxPaid = Math.max(...paid_list.value);

	const selectedCityIds = ref([]);
	const selectedCities = ref([]);
	const selectedUrl=ref('');
	const text_message = ref('');
	const errormessage = ref('');
	const dataT=ref([]);
	const dataC=ref([]);

	const comission_list=ref([
		{code:0.0,text:'0%'},
		{code:0.01,text:'1%'},
		{code:0.02,text:'2%'},
		{code:0.03,text:'3%'},
		{code:0.04,text:'4%'},
		{code:0.05,text:'5%'},
		{code:0.06,text:'6%'},
		{code:0.07,text:'7%'},
		{code:0.08,text:'8%'},
	]);

	const sort_list=ref([
		{code:1,text:'Name: A to Z'},
		{code:2,text:'Name: Z to A'},
		{code:3,text:'Sales: min first'},
		{code:4,text:'Sales: max first'},
		{code:5,text:'Commission (%): min first'},
		{code:6,text:'Commission (%): max first'},
		{code:7,text:'Adventures #: min first'},
		{code:8,text:'Adventures #: max first'},
	]);

	const minCommission = Math.min(...comission_list.value.map(item => item.code));
    const maxCommission = Math.max(...comission_list.value.map(item => item.code));

	const paramsSent=ref({
		name:'',
		limit:15,
		commission:[minCommission, maxCommission],
		range:[minPaid,maxPaid],
		city:[],
		tour_type:0,
		order:0,	
	});
	const paramsCities=ref({
		city_name:'',
		limit:15
	})
	/* import _ from 'lodash'; */
	const tgp = () => {
	dVp.value = !dVp.value;
	};

	const tbc = () => {
	dVc.value = !dVc.value;
	};

	const getTravelStyleTooltip = (travelStyles) => {
		const lista=ref('');
		lista.value=travelStyles.join(', ')
		return lista;
	};

	const getCommissionText = (code) => {
	const commission = comission_list.value.find(item => item.code === code);
	return  commission.text;
	};

	const getOperators = async () => {
        try {
            loading.value = true;
			paramsSent.value.city=selectedCityIds.value;
			const queryString = new URLSearchParams(paramsSent.value).toString();
            const res = await fetch(`${config.public.BACKEND_URL}/api/operators?${queryString}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        	});
            const data = await res.json();
			console.log('respuesta de servidor',data);
            if (data.status) {
				dataT.value = data.response.data;
				count.value=data.response.total;
				totalDestination.value=data.response.total;
            toast.add({ severity: 'success', summary: 'Success!!', detail: 'Data Loaded', life: 3000 });
            data_count.value=data.count;
            } else {
                dataT.value = [];
            }
        } catch (error) {
        }finally {
        loading.value = false; 
         }
    };


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
		/* 	console.log('contenido respuesta',data) */
			if (data.status) {
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

	const getCities = async () => {
        try {
			loading.value = true;
			const queryString = new URLSearchParams(paramsCities.value).toString();
				const res = await fetch(`${config.public.BACKEND_URL}/api/cities-c?${queryString}`,{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				console.log('entro despues de peticion:',data.response)
				if (data.status) {
				dataC.value = data.response;
				console.log('datos de cities:',dataC.value);
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
	
	const updateSelectedCities = () => {
	selectedCities.value = selectedCityIds.value.map(id => {
		const city = dataC.value.find(option => option.t_city_id === id);
		return city ? { id: city.t_city_id, text: city.city_name } : null;
	}).filter(city => city !== null); 
	};

	const onCityInput = (event) => {
		paramsCities.value.city_name = event.value;
		getCities();
	};

	const removeCity = (id) => {
	selectedCityIds.value = selectedCityIds.value.filter(cityId => cityId !== id);
	selectedCities.value = selectedCities.value.filter(city => city.id !== id);
	};

	const ExportCSV=()=>{
		const headers = ['Name', 'Adventures', 'Countries', 'Average group size', 'Commission(%)', 'Total paid', 'Total commission'];
		const rows = dataT.value.map(row => [
			row.name,
			row.tours_count,
			row.countries_t,
			row.max_group_size,
			row.commission,
			row.total_paid_2,
			row.total_paid_commission
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
      paramsSent.value.page = event.page + 1; // PrimeVue's page index is 0-based
	  paramsSent.value.limit=rowsPerPage.value,
      getOperators();
    };

	onMounted(() => {
		getCities();
		getOperators();
    });
</script>

<style>
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
				.center-align {
			text-align: center;
		}
.btn-d{
			margin-left:10px  !important;
			border-radius: 5px;
			border-color: rgb(201, 195, 195)  !important;
			background-color: white  !important;
			font-style: bold  !important;
		}
		.dropdown_s {
			padding-top: 30px; 
			position: absolute; 
			z-index: 10; 
			background: white; 
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
			border-radius: 4px;
			padding-left: 5px;
			padding-right: 5px;
		}
		.dropdown_s p{
			display: flex; 
			flex-wrap: wrap; 
			gap: 10px; 
			justify-content: center;
		}
</style>