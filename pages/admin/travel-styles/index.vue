<template>
    <div class="overflow-hidden mb-8 main-spacing-cms">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
						<div class="col-12 lg:col-10">
							<div class="flex align-items-center justify-content-between back-green-vibe-light px-5">
                    <div>
                        <h1 class="canaro-font font-semibold my-1">Travel Styles</h1>
                        <p class="my-1">Showing {{ counter }}  travel styles</p>
                    </div>
                    <div>
												<button class="btn-c" @click="ExportCSV" ><b>Export to CSV</b></button>
												<Dropdown v-model="paramsSent.order"  class="btn-d"  optionLabel="text" optionValue="code" :options="sort_list" placeholder="Sort by" />
                    </div>
                </div>


								<div class="my-4">
									<div class="card p-4">
													<InputGroup class="flex flex-col md:flex-row md:items-center gap-4">
														<div >
															<IconField iconPosition="left">
																	<InputIcon class="pi pi-search"> </InputIcon>
																	<InputText v-model="paramsSent.name" editable optionLabel="name" placeholder="Search by name" class="w-full md:w-16rem w-16rem mr-3" />
															</IconField>
														</div>

															<div  style="margin-right: 15px;">
																<div>
																	<Button label="Any Commission" severity="secondary" outlined class="dropdown-button w-14rem" @click="tgp" />
																</div>
																<div v-if="dVp"  class="dropdown_s" >
																	<Slider v-model="paramsSent.commission" :options="comission_list" :min="minCommission" :max="maxCommission" :step="0.01" range class="w-13rem"  />
																	<p>
																		{{ getCommissionText(paramsSent.commission[0]) }} - {{ getCommissionText(paramsSent.commission[1]) }}
																	</p>
																</div>
															</div>

															<div  >
																<div>
																	<Button label="Total Paid" severity="secondary" outlined  class="dropdown-button w-14rem" @click="tbc" />
																</div>
																<div   v-if="dVc" class="dropdown_s">
																	<Slider v-model="paramsSent.range" :options="paid_list"  :min="minPaid" :max="maxPaid"  :step="500" range class="w-13rem" />
																	<p > {{ paramsSent.range[0] }} - {{ paramsSent.range[1] }}</p>						
																</div>	
															</div>
															
														<!-- 	<div class="flex">
															<Dropdown  v-model="paramsSent.limit" :options="limits" optionLabel="text" optionValue="code" placeholder="0" checkmark :highlightOnSelect="false" class="w-full md:w-7rem drops" />
														</div> -->
															<div class="flex-1">
															<a class="text_decoration_none md:mx-2">
																<button class="btn-custom md:px-6 cover-mobile" style="padding-top: 0.7rem;padding-bottom: 0.7rem;" @click="getTravels" >
																Search
															</button>
														</a>	
														</div> 
													</InputGroup>
													<br>	
															
										</div>						
								</div>

								<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
								<div v-for="city in selectedCitiesIds" :key="city.id" style="display: flex; align-items: center;">
									<span>{{ city.name }}</span>
									<Button style="color: gray; background-color: white; border-radius: 15px; border-color: gray; margin-left: 5px;" >
										<i class="pi pi-times"></i>
									</Button>
								</div>
							</div>

								<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <div class="my-4">
                    <div class="card">
                        <DataTable :value="dataT.data"   tableStyle="min-width: 50rem">
                            <Column field="tourtype_name" header="Destination" ></Column>
                            <Column field="type_t_count" header="Adventures" ></Column>
                            <Column field="comission_range" header="Commission(%)" ></Column>
                            <Column field="comission_total" header="Total Commission" >
																<template #body="slotProps">
																	<a>{{ '$'+slotProps.data.comission_total }}</a>
																</template>
														</Column>
                            <Column field="total_paid" header="Total paid" >
															<template #body="slotProps">
																	<a>{{ '$'+Math.ceil(slotProps.data.total_paid) }}</a>
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
	import Slider from 'primevue/slider';
	import Button from 'primevue/button';
	import Paginator from "primevue/paginator";
	/* import _ from 'lodash'; */

    const config = useRuntimeConfig();
	const counter=ref(0);
	const dataT=ref([]);
	const visible=ref(false);
	const loading = ref(false);
	const toast = useToast();

	const dVc = ref(false);
	const dVp = ref(false);

	const rowsPerPage=ref(15);
	const totalDestination = ref(0);

	const limits=ref([
		{code:15,text:'15'},
		{code:30,text:'30'},
		{code:50,text:'50'},
		{code:100,text:'100'},
		{code:0,text:'All'},
	])
	const sort_list=ref([
		{code:1,text:'Name: A to Z'},
		{code:2,text:'Name: Z to A'},
		{code:8,text:'Adventures #: max first'},
		{code:7,text:'Adventures #: min first'},
		{code:4,text:'Total paid: max first'},
		{code:3,text:'Total paid: min first'},
	]);

	const comission_list=ref([
		{code:0.00,text:'0%'},
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

	const paid_list=ref([0,15000]); 

	const minPaid = Math.min(...paid_list.value);
    const maxPaid = Math.max(...paid_list.value);


	const paramsSent=ref({
		limit:15,
		order:0,
		commission:[minCommission, maxCommission],
		range:[minPaid,maxPaid],
		name:'',
		page:1
	});
	
	const getTravels=async(url)=>{
		visible.value=true;

		console.log('parametro enviado',url);
		try {
			loading.value=true;
			const queryString = new URLSearchParams(paramsSent.value).toString()
			const res = await fetch(`${config.public.BACKEND_URL}/api/show-type?${queryString}`,{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
			});
			const data = await res.json();
			if(data.status){
				dataT.value=data.response;
				counter.value=data.count;
				totalDestination.value=data.response.total;
				toast.add({ severity: 'success', summary: 'Success!!', detail: 'Data Loaded', life: 3000 });
			}
		
			
		} catch (error) {
		 console.error('Error fetching data:', error);
		}finally {
        loading.value = false; 
         }
	} 

	const tgp = () => {
	dVp.value = !dVp.value;
	};

	const tbc = () => {
	dVc.value = !dVc.value;
	};

	const getCommissionText = (code) => {
	const commission = comission_list.value.find(item => item.code === code);
	return  commission.text;
	};

	const ExportCSV=()=>{
		const headers = ['Destination', 'Adventures', 'Commission(%)', 'Total Commission', 'Total paid'];
		const rows = dataT.value.map(row => [
			row.tourtype_name,
			row.type_t_count,
			row.comission_range,
			row.comission_total,
			row.total_paid,
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
      getTravels();
    };

	onMounted(() => {
		getTravels();
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