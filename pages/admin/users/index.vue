<template>
    <div class="overflow-hidden mb-8 main-spacing-cms">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
            <div class="col-12 lg:col-10">
                <div class="flex align-items-center justify-content-between back-green-vibe-light px-5">
                    <div>
                        <h1 class="canaro-font font-semibold my-1">Users</h1>
                        <p class="my-1">Showing {{ data_count }} users</p>
                    </div>
                    <div>
                        <a class="text_decoration_none" >
                            <button class="btn-custom-green px-6 download_btn_green flex mx-auto" style="padding-top: 0.7rem;padding-bottom: 0.7rem;" @click="navigateToAddUser(0)">
                              Add user
                            </button>
                        </a>
                    </div>
                </div>
                <div class="my-4 md:flex">
                    <div class="card">
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-search"> </InputIcon>
                            <InputText v-model="paramsSent.filter" editable optionLabel="name" placeholder="Enter name or email..." class="w-full md:w-20rem" />
                        </IconField>
                    </div>
                    <div class="my-4 md:my-0">
                        <a class="text_decoration_none md:mx-2">
                            <button class="btn-custom md:px-6 cover-mobile" style="padding-top: 0.7rem;padding-bottom: 0.7rem;" @click="getUsers(selectedUser)">
                            Search
                            </button>
                        </a>
                    </div>
                </div>
                <ProgressBar  v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
                <div class="my-4">
                    <div class="card">
                        <DataTable :value="products" :selection="currentUser"  @row-click="onRowSelect"  tableStyle="min-width: 50rem">
                            <!-- <Column selectionMode="single"></Column> --> 
                            <Column field="name" header="Name" ></Column>
                            <Column field="email" header="Email"></Column>
                            <Column field="user_type" header="User Type">
                                <template #body="slotProps">
                                    {{ slotProps.data.profile_id == 1 ? 'Team' : 'Customer' }}
                                </template>
                            </Column>
                            <!-- <Column field="job_title" header="Job Title"></Column> -->
                            <Column field="permissions" header="Permission"></Column>
                            <Column field="last_login" header="Last login">
                                <template #body="slotProps">
                                    {{ formatDate(slotProps.data.last_login) }}
                                </template>
                            </Column>
                            <Column field="status" header="Account Status">
                                <template #body="slotProps">
                                    <span v-if="slotProps.data.deleted_at == null" :class="slotProps.data.active == 0 ? 'text-orange-500' : 'text-green-vibe'">{{ slotProps.data.active == 0 ? 'Inactive' : 'Active' }}</span>
                                    <Tag v-else value="Deleted" severity="danger" />
                                </template>
                            </Column>
                            <Column field="actions" header="Actions">
                                <template #body="slotProps">
                                    <Button 
                                        type="button" 
                                        severity="success" 
                                        outlined 
                                        icon="pi pi-bars" 
                                        label="Choose action" 
                                        @click="toggle(slotProps.index, $event)" 
                                        aria-haspopup="true" 
                                        :aria-controls="`overlay_tmenu_${slotProps.index}`" 
                                    />
                                    <TieredMenu 
                                        :ref="el => setMenuRef(el, slotProps.index)" 
                                        :id="`overlay_tmenu_${slotProps.index}`" 
                                        :model="items(slotProps.data)" 
                                        popup 
                                    />
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
            </div>
        </div>
    </div>

    <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-column align-items-left p-5 surface-overlay border-round" style="max-width: 600px;">
            <span class="font-bold text-2xl block mb-2 mt-4">Delete user account</span>
                <p class="mb-0">Deleting user account will <b>remove access</b> to enquiries and wishlist. 
                Are you sure you want to proceed?</p>
                <div class="flex align-items-right gap-2 mt-4" style="justify-content: right;">
                <Button label="Cancel" severity="warning" rounded  outlined @click="rejectCallback"></Button>
                    <Button label="Delete user account" severity="danger" rounded outlined @click="acceptCallback"></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>
</template>


<script setup>
	definePageMeta({
		middleware: ['auth','profile'],
	});
    import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
    import { ref, onMounted } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ColumnGroup from 'primevue/columngroup';   // optional
    import Row from 'primevue/row';                   // optional
    import InputText from 'primevue/inputtext';
    import ProgressBar from 'primevue/progressbar';
    import { useToast } from "primevue/usetoast";
    import IconField from 'primevue/iconfield';
    import InputIcon from 'primevue/inputicon';
    import { useRouter } from 'vue-router';
	import Paginator from "primevue/paginator";
    import Button from 'primevue/button';
    import TieredMenu from 'primevue/tieredmenu';
    import ConfirmDialog from "primevue/confirmdialog";
    import { useConfirm } from "primevue/useconfirm";
    import Tag from "primevue/tag";


	const rowsPerPage=ref(15);
	const totalDestination = ref(0);

	const config = useRuntimeConfig();
    const selectedUser = ref('');
    const data_count = ref(0);
    const loading = ref(false);
    const toast = useToast();
    const products = ref([]);

	const jobTitle=ref([]);

    const currentUser =ref(null);

    const router = useRouter();

	const paramsSent= ref({
		name:'',
		limit:0,
		page:0
	});



    const menus = ref([]);
    const confirm = useConfirm();

    const setMenuRef = (el, index) => {
        if (el) menus.value[index] = el;
    };

    const toggle = (index, event) => {
        if (menus.value[index]) {
            menus.value[index].toggle(event);
        }
    };

    const confirmDelete = (element) => {
    confirm.require({
        message: "",
        header: "Delete your account",
        accept: () => {
            deleteUser(element);
        },
    });
    };

    const deleteUser = async (element) => {
        const response = await apiFetch(`/delete-users`,{
            method: 'DELETE',
            body: {
                user_id: element.id,
            }
            })
        try {
            if (response.data.value.success) {
                toast.add({ severity: "success", summary: "User deleted", life: 3000 });
            }
        } catch (error) {
            toast.add({ severity: "error", summary: "Error", life: 3000 });
        } finally {
            getUsers();
        }
    }

    const activeDesactiveAccount = async (element) => {
        const response = await apiFetch(`/active-desactive-user`,{
            method: 'PATCH',
            body: {
                user_id: element.id,
                active: !element.active,
            }
            })
        try {
            if (response.data.value.success) {
                toast.add({ severity: "success", summary: "User updated", life: 3000 });
            }
        } catch (error) {
            toast.add({ severity: "error", summary: "Error", life: 3000 });
        } finally {
            getUsers();
        }
    }

    const recoverPassword = async (element) => {
        const response = await apiFetch(`/recover-pass`,{
            query: {
                email: element.email,
            }
        })
        try {
            if (response.data.value.success) {
                toast.add({ severity: "success", summary: "Email Sended", life: 3000 });
            }
        } catch (error) {
            toast.add({ severity: "error", summary: "Error", life: 3000 });
        }
    }

    const items = (element) => {
        let items = [];
        if(element.deleted_at != null){
            items.push(
                {
                    label: 'User Deleted',
                    icon: 'pi pi-trash',
                })
            return items;
        }
        if(element.active == 0){
            items.push(
                {
                    label: 'Reactive account',
                    icon: 'pi pi-replay',
                    command: () => activeDesactiveAccount(element)
                })
        } else {
            items.push(
                {
                    label: 'Disactivate account',
                    icon: 'pi pi-times',
                    command: () => activeDesactiveAccount(element)
                })
        }
        items.push(
            {
                label: 'Reset account password',
                icon: 'pi pi-send',
                command: () => recoverPassword(element)
            },
            {
                label: 'Delete account',
                icon: 'pi pi-trash',
                command: () => confirmDelete(element)
            }
        );
        return items;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    const getUsers = async () => {
        try {
            loading.value = true;
			console.log('parametros de envio ',paramsSent.value);
			const queryString = new URLSearchParams(paramsSent.value).toString();
            const res = await fetch(`${config.public.BACKEND_URL}/api/get-users?${queryString}`);
            const data = await res.json();
            if (res.status === 200) {
            toast.add({ severity: 'success', summary: 'Success!!', detail: 'Data Loaded', life: 3000 });
            products.value = data.response.data;
            console.log('datos de peticion:',products.value);
            data_count.value=data.response.total;
			totalDestination.value=data.response.total;
            } else {
                products.value = [];
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally {
        loading.value = false; 
         }
    };

    const onRowSelect = (event) => {
        currentUser.value = event.data;
        console.log('Selected Product:', currentUser.value);
        navigateToEditUser(currentUser.value,1);
    };

    const navigateToEditUser = (user,indicador) => {
        router.push({ 
            path:'/admin/users/add-user',
            query:{
                user:JSON.stringify(user),
                indicador:indicador.toString()
            }
         });
    };

    const navigateToAddUser = (indicador) => {
        router.push({ 
            path:'/admin/users/add-user',
            query:{
                indicador:indicador.toString()
            }
         });
    };

	const onPageChange = (event) => {
      paramsSent.value.page = event.page + 1; // PrimeVue's page index is 0-based
	  paramsSent.value.limit=rowsPerPage.value,
      getUsers();
    };

    onMounted(() => {
        getUsers(''); 
    });
</script>



<style>
    .text_decoration_none {
        text-decoration: none;
    }
    .download_btn_green {
        background-color: #82cf45;
        color: #fff;
        cursor: pointer;
    }
    .btn-custom-green {
        border: 1px solid #82cf45;
        border-radius: 5px;
        font-weight: 700;
        font-family: 'Interstate';
        font-size: 1.1rem;
    }
	
    .btn-custom {
        background-color: #FF6C0F;
        border: 1px solid #FF6C0E;
        color: #fff;
        border-radius: 5px;
        font-weight: 700;
        font-family: 'Interstate';
        font-size: 1.1rem;
    }
    :deep(.p-datatable .p-datatable-thead > tr > th){
        background-color: #f3faed;
    }

    @media only screen and (max-width:767px){
        .cover-mobile{
            width: -webkit-fill-available
        }
      }
      @media only screen and (min-width: 768px) and (max-width: 1199px){
      }
      @media only screen and (min-width:1200px){
      }
      .pi-trash{
          color: red;
      }
</style>