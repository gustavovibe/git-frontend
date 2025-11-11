<template>
    <h2 v-if="!orderId">Actions</h2>
						<div class="my-4 canaro-font">
							<DataTable :value="dataA" showGridlines tableStyle="min-width: 50rem" class="table_s">
								<Column field="action" header="Action" headerClass="custom-header" style="width: 15%;"> </Column>
								<Column field="item" header="Item" headerClass="custom-header" style="width: 15%;" v-if="!orderId"> </Column>
								<Column field="action_date" header="Date" headerClass="custom-header" style="width: 15%;"> </Column>
							</DataTable>
						</div>
</template>

<script setup>
 import { ref, onMounted,watch  } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';

	const config = useRuntimeConfig();

	const props = defineProps({
		userId: {
			type: Number,
			required: true 
		},
		orderId: {
			type: Number,
			required: false 
		},
	});


	const dataA = ref([]);

	const paramsActions= ref({
		users_id:props.userId , 
		booking_id:props.orderId
	});

	const getActions=async()=>{
		try{
			const queryString = new URLSearchParams(paramsActions.value).toString();
			console.log("queryString",queryString);
			const res = await fetch(`${config.public.BACKEND_URL}/api/action-logs?${queryString}`,{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
			});
			const data=await res.json();
			if(data.success){
				dataA.value=data.data.data;
			}
		}catch(error){
			console.error('Error fetching data:', error);
		}
	}

	watch(() => props.userId, (newVal) => {
		paramsActions.value.users_id = newVal;
		getActions(); 
	});
	watch(() => props.orderId, (newVal) => {
		paramsActions.value.booking_id = newVal;
		getActions(); 
	});


	onMounted(() => {
		getActions();
    });

</script>