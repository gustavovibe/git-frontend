<template>
    <div class="overflow-hidden mb-8 main-spacing-cms">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
            <div class="col-12 lg:col-10">
                <div class="flex align-items-center justify-content-between back-green-vibe-light px-5">
                    <div>
                        <h1 class="canaro-font font-semibold my-1">Email logs</h1>
                        <p class="my-1">Showing {{ counter }} emails</p>
                    </div>
                </div>
                <div class="w-11 my-4 mx-auto lg:mx-0 lg:flex align-items-center justify-content-between">
                    <InputGroup style="margin-right: 5px;">
                        <InputGroupAddon>
                         <i class="pi pi-search"></i>
                        </InputGroupAddon>
                        <InputText id="username" v-model="params.email" placeholder="Filter by email" class="w-full lg:w-14rem"/>
                    </InputGroup>
                    <InputGroup></InputGroup>
                    <InputGroup style="margin-right: 10px;">
                        <Calendar v-model="calendarDates" showIcon  selectionMode="range" :manualInput="false"/>
                    </InputGroup>
                    <InputGroup style="margin-right: 10px;">
                        <MultiSelect v-model="params.status" :options="status" optionLabel="name" optionValue="code" placeholder="Select Status"
                        :maxSelectedLabels="3" class="w-full lg:w-14rem" />
                    </InputGroup>
                    <InputGroup style="margin-right: 10px;">
                        <MultiSelect v-model="params.mail_type" :options="mailTypes" optionLabel="name" optionValue="code" placeholder="Select Mail type"
                        :maxSelectedLabels="3" class="w-full lg:w-14rem" />
                    </InputGroup>
                    <InputGroup>
                        <Button  class="btn-custom md:px-6 cover-mobile" label="Search"  @click="getEmails()" />
                    </InputGroup>
                </div>
								<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <div class="my-4 canaro-font">
                    <DataTable :value="DataT" showGridlines tableStyle="min-width: 50rem" class="table_s">
    <Column field="sent" header="Sent" headerClass="custom-header" style="width: 15%;"></Column>
    <Column field="traveler_name" header="Lead Traveler" headerClass="custom-header" style="width: 15%;"></Column>
    <Column field="mail_from" header="Email Address" headerClass="custom-header" style="width: 15%;"></Column>
    <Column field="order" header="Order Number" headerClass="custom-header" style="width: 10%;"></Column>
    <Column field="mail_type_name" header="Email Type" headerClass="custom-header" style="width: 15%;"></Column>
    <Column field="status" header="Status" headerClass="custom-header">
        <template #body="slotProps">
            <div v-if="[35].includes(slotProps.data.status)">
                <ProgressBar :value="slotProps.data.status" class="mx-2 red">
                    <div>
                        <span>{{ slotProps.data.status_name }}</span>
                    </div>
                </ProgressBar>
            </div>
            <div v-if="[40,50].includes(slotProps.data.status)">
                <ProgressBar :value="slotProps.data.status" class="mx-2 green">
                    <div>
                        <span>{{ slotProps.data.status_name }}</span>
                    </div>
                </ProgressBar>
            </div>
            <div v-if="[75,100].includes(slotProps.data.status)">
                <ProgressBar :value="slotProps.data.status" class="mx-2 blue">
                    <div>
                        <span>{{ slotProps.data.status_name }}</span>
                    </div>
                </ProgressBar>
            </div>
        </template>
    </Column>
</DataTable>
<div class="card">
						<Paginator :rows="rowsPerPage" :totalRecords="counter" :rowsPerPageOptions="[10, 20, 30]" @page="onPageChange"> </Paginator>
					</div>
</div>
<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
<Toast></Toast>
            </div>
        </div>
    </div>
</template>



<script setup>
	definePageMeta({
		middleware: ['auth','profile'],
	});
    import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
    import { ref, onMounted ,watch } from 'vue';
    import InputText from 'primevue/inputtext';
    import Dropdown from 'primevue/dropdown';
    import MultiSelect from 'primevue/multiselect';
    import ProgressBar from 'primevue/progressbar';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column'
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import Calendar from "primevue/calendar";
    import Button from "primevue/button";
    import { useToast } from "primevue/usetoast";
	import Paginator from "primevue/paginator";


	const config = useRuntimeConfig();
    const toast = useToast();
    const DataT=ref([]);
    const counter =ref(0);
    const calendarDates= ref([])
	const rowsPerPage=ref(15);
	const totalDestination = ref(0);
	const loading = ref(true);

    const params =ref({
        email:'',
        filter:'',
        status:'',
        mail_type:'',
        start_date:'',
        ends_date:'',
		admin:1,
		limit:10,
		page:1 
    });

    const status = ref([
        { name: 'Sent', code: 40 },
        { name: 'Delivered', code: 50 },
        { name: 'Opened', code: 75 },
        { name: 'Clicked', code: 100 },
        { name: 'Bounced', code: 35 }
    ]);

    const mailTypes = ref([
        { name: 'Booking confirmation', code: '1' },
        { name: 'Booking cancellation', code: '2' },
        { name: 'Payment receipt', code: '3' },
        { name: 'Payment request', code: '4' },
        { name: 'Reminder 1', code: '5' },
        { name: 'Reminder 2', code: '6' },
        { name: 'FollowUp: review', code: '7' },
        { name: 'FollowUp: recommend', code: '8' },
        { name: 'Simple email', code: '9' }
    ]);


    const getEmails = async () => {
        try {
			loading.value=true;
            const queryParams = new URLSearchParams(params.value).toString();
            const res = await fetch(`${config.public.BACKEND_URL}/api/show-contact?${queryParams}`);
            const data = await res.json();

            if (res.status === 200) {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Data Loaded', life: 3000 });
            DataT.value = data.response.data;
			counter.value=data.response.total;
            console.log('Se obtuvieron los datos',DataT.value);
            } else {
            console.log('No se obtuvieron los datos');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally{
			loading.value=false;
		}
};
    

const onPageChange = (event) => {
      params.value.page = event.page + 1;
	  params.value.limit=rowsPerPage.value,
      getActions();
    };

watch(calendarDates,(newDates)=>{
    params.value.start_date=newDates.length>0?newDates[0]:'';
    params.value.ends_date=newDates.length>1?newDates[1]:'';
    console.log('contenido de fechas',params.value);
});

onMounted(() => {
  getEmails();
});
</script>

<style scoped>
.blue :deep(.p-progressbar-value.p-progressbar-value-animate){
    background-color: #0046D1;
}

.green :deep(.p-progressbar-value.p-progressbar-value-animate){
    background-color: #82cf45;
}

.red :deep(.p-progressbar-value.p-progressbar-value-animate){
    background-color: #F9515F;
}

.p-progressbar{
    height: 2.2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}


/* table{
    border-collapse: collapse;
}

td, th{
    border: 1px solid #dddddd;
}

tr{
    height: 3rem;
}

td{
    text-align: center;
} */

.table_s .p-datatable-thead > tr > th {
    background-color: rgba(0, 128, 0, 0.1);
}
.table_s .header-no-grid {
  border: none !important;
}

.table_s .content-grid {
  border: 1px solid #ccc;
}

    @media only screen and (max-width:767px){
        .filters{
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
    }
      @media only screen and (min-width: 768px) and (max-width: 1199px){
        .filters{
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
    }
      @media only screen and (min-width:1200px){
    }

</style>