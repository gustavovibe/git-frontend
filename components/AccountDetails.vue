<template>
	<div class="overflow-hidden mb-8 main-spacing-cms">
			<div class="grid">
					<div class="col-12 lg:col-12">
							<div class="back-green-vibe-light px-5">
									<h1>Account</h1>
							</div>
							<div>
									<div class="card lg:flex justify-content-between max-100-lg">
											<div class="flex flex-column gap-2">
													<label  class="canaro-font font-medium text-lg">Name<span v-if="!paramsSent.name" class="ml-1" style="color: red;">*</span></label>
													<InputText id="username" v-model="paramsSent.name" aria-describedby="username-help" />
													
											</div>
										 
											<div class="flex flex-column gap-2">
													<label  class="canaro-font font-medium text-lg">Job Title</label>
													<Dropdown v-model="paramsSent.job_id" :options="jobTitle" optionLabel="name" optionValue="id"  class="w-15rem"  style="height: 40px;"/>
											</div>
											<div class="flex flex-column gap-2">
													<label  class="canaro-font font-medium text-lg">Phone</label>
													<div class="flex">
															<Dropdown v-model="paramsSent.country" :options="phoneLADA" optionLabel="name" optionValue="code" placeholder="(+52)" class="w-8rem mr-3" style="height: 40px;"/>
															<InputNumber v-model="paramsSent.phone" inputId="withoutgrouping" :useGrouping="false"/>
													</div>
											</div>
											<div class="flex flex-column gap-2">
													<label  class="canaro-font font-medium text-lg">Email<span v-if="validEmail!==true" class="ml-1" style="color: red;">*</span></label>
													<InputText disabled id="username" v-model="paramsSent.email" aria-describedby="username-help" />
												 
											</div>
									</div>
							</div>
							<ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
							<div>
									<p class="canaro-font text-xl font-semibold">Emails</p>
									<p class="interstate-font text-lg font-light">Select the emails this user will receive.</p>
				<div class="container">
										<div v-for="notification in notifications_vals" :key="notification.text" class="permission-item" >
											<div class="flex align-items-center">
												<Checkbox  v-model="notificationsSent[notification.key]"  :binary="true"  />
												<label  class="ml-2">{{ notification.text }}</label>
											</div>
										</div>
									</div>
							</div>
						<br>
	
							<div>
									<div class="flex my-5 justify-between">
											<div style="display: flex;">
												<div>
														<a class="text_decoration_none">
																<Button class="filled_btn px-8 md:px-6" style="padding-top: 0.7rem;padding-bottom: 0.7rem; border-radius: 5px 0 0 5px;" @click="confirm_m(1)">
																Save
																</Button>
														</a>
												</div>

												<div v-if="indicador">
														<a class="text_decoration_none">
																<Button class="outline_btn px-8 md:px-6" style="padding-top: 0.7rem;padding-bottom: 0.7rem; border-radius: 0 5px 5px 0;"  @click="confirm_m(2)">
																Delete
																</Button>
														</a>
												</div>
										</div>
										<div>
											<div  style="margin-left:50% ;">
													<a class="text_decoration_none">
															<Button class="outline_btn px-8 md:px-6 btn-custom-green" style="padding-top: 0.7rem;padding-bottom: 0.7rem; border-radius: 0 5px 5px 0; border-color: greenyellow;"  @click="returnPage">
																<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sign-turn-left-fill" viewBox="0 0 16 16">
																<path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM7 8.466a.25.25 0 0 1-.41.192L4.23 6.692a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V6h1.5A2.5 2.5 0 0 1 11 8.5V11h-1V8.5A1.5 1.5 0 0 0 8.5 7H7z"/>
																</svg>Return
															</Button>
													</a>
											</div>
										</div>
									</div>
									<div>
										<div class="flex align-items-center">
												<Checkbox v-model="c_password" :binary="true"  />
												<label  class="ml-2">Change Password</label>
											</div>
										<hr>
										<ChangePassword v-if="c_password" :user-id="userId" />
									</div>
							</div>
					</div>
			</div>
	</div>
	<Toast />
	<ConfirmDialog>
			<template #icon>
			<i class="pi pi-exclamation-triangle red-icon"></i>
		</template>
	</ConfirmDialog>
</template>

<script setup>
	import { ref, watch,onMounted } from 'vue';
	import InputText from 'primevue/inputtext';
	import InputNumber from 'primevue/inputnumber';
	import Dropdown from 'primevue/dropdown';
	import Checkbox from 'primevue/checkbox';
	import Button from "primevue/button";
	import { useToast } from "primevue/usetoast";
	import { phoneLADA } from "~/models/General";
	import ConfirmDialog from 'primevue/confirmdialog';
	import { useConfirm } from 'primevue/useconfirm';
	import { useRoute } from 'vue-router';
	import { useRouter } from 'vue-router';
import ProgressBar from 'primevue/progressbar';
import ChangePassword from './ChangePassword.vue';


const c_password = ref(false);
const user_log= ref(null);
	const route = useRoute();
	const toast = useToast();
	const user_list=ref([]);
	const router = useRouter();
const userId= ref(null);
const props= defineProps({
	userId:String,
});

const config = useRuntimeConfig();
const validEmail=ref(false);

const loading = ref(false);
const  passwordId= `password-${Math.random().toString(36).substr(2, 9)}`
	// obtencion de datos externos
	const user = ref(route.query.user ? JSON.parse(route.query.user) : null);
	const indicador = ref(route.query.indicador ? parseInt(route.query.indicador) : 0);

const counter=ref(0);
	//confirmacion
	const confirm = useConfirm();

const generateId=(prefix)=> {
		return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
	}

	const confirm_m=(action)=>{
			confirm.require({
			message: action==1?'Are you sure you want to SAVE?':'Are you sure you want to DELETE?',
			header: 'Confirmation',
			iconProps: {
			 class: 'red-icon'
			},
			accept: () => {
				 action==1?save():deletef();
			},
			reject: () => {
					
			}
	});
	}

	const permissions= ref({
	inventory: false,
	orders_p: false,
	travelers: false,
	reports: false,
	users: false,
	emails: false,
	actions: false
});

const notifications_vals = ref([
{ key: 'orders_n', text: 'Order notifications' },
{ key: 'cart', text: 'Abandoned cart notifications' },
{ key: 'bounced', text: 'Bounced email notifications' },
{ key: 'report', text: 'Weekly report' },
]);

	const notifications =ref({
			orders_n:false,
			cart:false,
			bounced:false,
			report:false
	});

	const params = ref({
	id:0,    
	name:'',
	email:'',
	job_id:'',
	selectedPhone:'',
	phone:0,
	country:'',
code:'',
user_log:user_log.value,    
	});

	const paramsSent = ref({...params.value});
	const permissionsSent = ref({...permissions.value});
	const notificationsSent = ref({...notifications.value});

	const jobTitle=ref([]);


const save = async ()=>{
	try{
	console.log('contenido de envio',paramsSent.value)
	if(paramsSent.value.name   && paramsSent.value.email && validEmail.value){
		loading.value = true;
			const combinedPermissions = {
					...permissionsSent.value,
					...notificationsSent.value,
			};
			const payload = {
					...paramsSent.value,
					permissions: combinedPermissions,
			};
	console.log('entra contenido::',payload);
			const res = await fetch(`${config.public.BACKEND_URL}/api/add-users`,{
					method:'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
			});
			if(res.status==200){
					toast.add({ severity: 'success', summary: 'Success!!', detail: 'Save Success!!', life: 3000 });
					
					}else{
					console.log('no entro');
			}
			}else{
					toast.add({ severity: 'error', summary: 'Oppss!!', detail: 'Please fill in the required fields.', life: 3000 });
			}
	}catch(error){
	console.error('Error fetching data:', error);
	}finally {
			loading.value = false; 
	}
}

const deletef = async()=>{
	try{
		loading.value = true;
		const res = await fetch(`${config.public.BACKEND_URL}/api/dlocalStorage.getItem('user_id')=${paramsSent.value.id}`,{
			method: 'DELETE',
		});
		const data = await res.json();
		if (res.status === 200) {
			toast.add({ severity: 'success', summary: 'Success!!', detail: 'User Deleted', life: 3000 });
			clearForm();
			returnPage();
		} else {
			console.error('Error fetching data');
		}
	}catch(error){
		console.error('Error fetching data:', error);
	}finally {
		loading.value = false; 
	}
}; 
	const getUsers = async (queryParams) => {
			try {
		loading.value = true;
					const res = await fetch(`${config.public.BACKEND_URL}/api/get-users?admin=1&id=${queryParams}`);
					const data = await res.json();
					if (res.status === 200) {
					toast.add({ severity: 'success', summary: 'Success!!', detail: 'Data Loaded', life: 3000 });
					user_list.value = data.response.data[0];
		console.log('contenido de usuario',user_list.value);
		validEmail.value=true;
		permissionsSent.value=user_list.value.permissions;
		notificationsSent.value=user_list.value.notifications;
		console.log('contenido de notificaciones:',notificationsSent.value);
		paramsSent.value=user_list.value;
					} else {
							user_list.value = [];
					}
			} catch (error) {
					console.error('Error fetching data:', error);
			}finally {
			loading.value = false; 
			 }
	};


	const EmailValidate = async (queryParams) => {
		try {
			loading.value = true;
			const res = await fetch(`${config.public.BACKEND_URL}/api/validate-email?email=${queryParams}`);
			const data = await res.json();
			if (data.status || user.value.email==paramsSent.value.email) {
				validEmail.value=true;
			}else{
				for (let key in data.response.message) {
					toast.add({ severity: 'error', summary: 'Oppss!!', detail: data.response.message[key][0], life: 3000 });
				}
				validEmail.value=false;
			} 
		} catch (error) {
			console.error('Error fetching data:', error);
		}finally {
			loading.value = false; 
			console.log('valor de variable valid Email:',validEmail.value);
		}
	};



	const EmailsVals = async ()=>{
			EmailValidate(paramsSent.value.email);
	};

	const getJobs = async () => {
			try {
		loading.value = true;
					const res = await fetch(`${config.public.BACKEND_URL}/api/jobs`);
					const data = await res.json();
					if (res.status === 200) {
			jobTitle.value = data.response;
					}
	
			} catch (error) {
					console.error('Error fetching data:', error);
			}finally {
			loading.value = false; 
			 }
	};


	watch(() => route.params.user, (newUser) => {
			console.log('entro');
	});

	const clearForm = () => {
		paramsSent.value={...params.value}; 
		permissionsSent.value={...permissions.value}; 
		notificationsSent.value={...notifications.value};
		};

	watch(indicador,()=>{
		clearForm();
	});


	const returnPage= ()=>{
		router.push({
			path:'/admin/users'
		})
	}


	watch(()=>paramsSent.value.email,EmailsVals);

	onMounted(() => {
	user_log.value = localStorage.getItem('user_id');
	userId.value=localStorage.getItem('user_id');
	paramsSent.value.id = userId.value;
	getJobs();
	clearForm();
	getUsers(userId.value);
	});
</script>

<style scoped>
	.text_decoration_none {
			text-decoration: none;
	}
	@media only screen and (max-width:767px){
		}
		@media only screen and (min-width: 768px) and (max-width: 1199px){
		}
		@media only screen and (min-width:1200px){
			.max-80-lg{
					max-width: 80%;
			}
		}
		.red-icon {
			color: red;
			}
			.container {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem; /* Espacio entre elementos, ajusta según necesidad */
		}
		.permission-item {
		display: flex;
		align-items: center;
	}
</style>