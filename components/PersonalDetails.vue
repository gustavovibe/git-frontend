<template>
  <div class="account-settings">
    <!-- Personal Details -->
    <h2 class="section-title">Personal <span class="highlight">Details</span></h2>
    <p class="description">
      Your personal details are shared only with transportation and adventure providers. Please ensure they are accurate, as they will be used for booking flights and tours. Once filled out, you can use this data for your next adventure booking.
    </p>

    <div class="container-form">
      <div class="grid mobile-grid">
        <div class="col-6 mobile-col-12">
          <div class="form-group">
            <label>Given Names</label>
            <InputText v-model="form.name" />
          </div>
        </div>
        <div class="col-6 mobile-col-12">
          <div class="form-group">
            <label>Surname</label>
            <InputText v-model="form.last" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Date Of Birth</label>
        <Calendar class="mobile-calendar" v-model="form.birth" showIcon dateFormat="M d, yy" :maxDate="maxBirthDate"/>
        <span class="text-gray-500">The Lead Traveler should be 18+ years old.</span>
      </div>

      <div class="form-group">
        <label>Gender</label>
        <div class="gender-options">
          <RadioButton v-model="form.gender" inputId="male" name="gender" value="male" />
          <label for="male">Male</label>

          <RadioButton v-model="form.gender" inputId="female" name="gender" value="female" />
          <label for="female">Female</label>
        </div>
      </div>

      <div class="form-group">
        <label>Passport</label>
        <div class="p-fluid grid">
          <div class="col-3">
            <InputText v-model="form.passport" placeholder="Passport number" />
          </div>
          <div class="col-4">
            <Dropdown v-model="form.country" :options="countries_list" optionLabel="name" optionValue="t_country_id" placeholder="Country of issue" class="mobile-dropdown" />
          </div>
        </div>
      </div>

      <div class="grid mobile-grid">
        <div class="col-6 mobile-col-12">
          <div class="form-group">
            <label>Passport Issue Date</label>
            <Calendar v-model="form.issue" showIcon dateFormat="M d, yy" class="mobile-calendar" :maxDate="today"/>
          </div>
        </div>
        <div class="col-6 mobile-col-12">
          <div class="form-group">
            <label>Passport Expiration Date</label>
            <Calendar v-model="form.expire" showIcon dateFormat="M d, yy" class="mobile-calendar" :minDate="today"/>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Contact Number</label>
        <div class="p-fluid grid">
          <div class="col-4">
            <Dropdown v-model="form.phone_country" :options="phoneLADA" placeholder="Lada" optionValue="name" class="mobile-dropdown">
              <template #option="slotProps">
                <span>{{ slotProps.option.code }} ({{ slotProps.option.name }})</span>
              </template>
              <template #value="slotProps">
                <span v-if="slotProps.value">
                  {{ slotProps.value }}
                </span>
                <span v-else>Lada</span>
              </template>
            </Dropdown>
          </div>
          <div class="col-6">
            <InputNumber v-model="form.phone" class="mobile-input" :useGrouping="false" maxlength="10" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Email Address</label>
        <InputText v-model="form.mail"/>
      </div>

      <div class="grid" style="justify-self: right;">
        <Button label="Save changes" class="save-button" @click="saveDataUser" 
          :loading="isLoading" 
          :disabled="isLoading" />
      </div>
    </div>

    <!-- Email Preferences -->
    <h2 class="section-title">Email <span class="highlight">Preferences</span></h2>
    <div class="container-form">

      <div class="description email-note grid mobile-grid">
          <i class="pi pi-info-circle" style="font-size: 1.5rem; color: #82cf45;"></i> &nbsp;
          Note: You'll always receive essential communication about your bookings and inquiries, regardless of your preferences.
      </div>
      <div class="grid mobile-grid">
        <div class="col-10 mobile-col-8">
          <p>
            Get inspired for your next trip with handpicked travel stories and tips from our magazine—delivered straight to your inbox.
          </p>
        </div>
        <div class="col-2 mobile-col-4" style="text-align: right;">
          <!-- <ToggleButton :class="form.inspiredTravelPreference ? 'checked' : ''" v-model="form.inspiredTravelPreference" onLabel="Yes" offLabel="No " offIcon="pi pi-times" onIcon="pi pi-check" class="mobile-toggle" @click="updateMailPreferences('inspired_travel_preference')"/> -->
          <ToggleButton
            class="mobile-toggle"
            v-model="form.inspiredTravelPreference"
            onLabel="Yes"
            offLabel="No"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            @click="updateMailPreferences('inspired_travel_preference')"
            :class="form.inspiredTravelPreference ? 'toggle-green' : 'toggle-red'"
          />
        </div>
      </div>

      <div class="grid mobile-grid">
        <div class="col-10 mobile-col-8">
          <p>
            Discover tours tailored to your preferences. Stay updated on new departure dates and itineraries.
          </p>
        </div>
        <div class="col-2 mobile-col-4" style="text-align: right;">
          <ToggleButton :class="form.newDeparturesPreference ? 'checked' : ''" v-model="form.newDeparturesPreference" onLabel="Yes" offLabel="No " offIcon="pi pi-times" onIcon="pi pi-check" class="mobile-toggle" @click="updateMailPreferences('new_departures_preference')"/>
        </div>
      </div>
    </div>

    <!-- Login & Security -->
    <h2 class="section-title">Login & <span class="highlight">Security</span></h2>

    <div class="container-form">
      <div class="p-fluid grid">
        <div class="col-12 md:col-12 lg:col-4">
          <label>Old Password</label>
          <Password v-model="form.oldPassword" toggleMask :feedback="false" class="mobile-password" />
        </div>
  
        <div class="col-12 md:col-12 lg:col-4">
          <label>New Password</label>
          <Password v-model="form.newPassword" toggleMask class="mobile-password" />
        </div>
  
        <div class="col-12 md:col-12 lg:col-12 xl:col-4">
          <label>Confirm New Password</label>
          <Password v-model="form.confirmPassword" toggleMask class="mobile-password" />
        </div>
      </div>

      <div class="grid" style="justify-self: right;">
        <Button label="Save changes" class="save-button" @click="updatePassword" :loading="isLoading" 
        :disabled="isLoading" />
      </div>
    </div>

    <!-- Delete Account -->
    <h2 class="section-title delete">Delete <span class="highlight">Account</span></h2>
    <div class="container-form">
      <p class="font-semibold">
        Permanently delete your account and data.
      </p>
      <div class="grid" style="justify-self: right;">
        <Button icon="pi pi-trash" label="Delete Your Account" severity="danger" @click="confirmDelete" :loading="isLoading" 
        :disabled="isLoading" />
      </div>
    </div>

    <ConfirmDialog>
      <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-column align-items-left p-5 surface-overlay border-round" style="max-width: 600px;">
              <span class="font-bold text-2xl block mb-2 mt-4">Delete your account</span>
                <p class="mb-0">Deleting your account will <b>remove access</b> to your enquiries and wishlist. 
                  Are you sure you want to proceed? If so, please contact us.</p>
                <div class="flex align-items-right gap-2 mt-4" style="justify-content: right;">
                  <Button label="Cancel" severity="warning" rounded  outlined @click="rejectCallback"></Button>
                    <Button label="Contact us to delete account" severity="success" rounded outlined @click="acceptCallback"></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>
    <Toast />
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import ToggleButton from "primevue/togglebutton";
import Password from "primevue/password";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useTravelerStore } from "~/store/travelerStore";
import { phoneLADA } from "~/models/General";
import { useDestinationStore } from "#imports";
import { useAuthStore } from "~/store/autStore";
import Dialog from "primevue/dialog";
import contactlink from "~/components/ContactLink.vue";
import { useRouter } from 'vue-router';

const travelerStore = useTravelerStore();
const DestinationStore= useDestinationStore();
const authStore = useAuthStore();
const route = useRouter();

// Variables reactivas
const form = ref({
  name: "",
  last: "",
  birth: null,
  gender: null,
  passport: "",
  country: null,
  phone_country: null, 
  issue: null,
  expire: null,
  phone: "",
  mail: "info@example.com",
  inspiredTravelPreference: false,
  newDeparturesPreference: false,
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const userData = ref({
  travelers: 1,
  birth: null,
  issue: null,
  expire: null,
});

const today = new Date()
const maxBirthDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
)

// Toast y Confirmación
const toast = useToast();
const confirm = useConfirm();

const isLoading = ref(false);

const getUser = async () => {
  try {
    const res = await travelerStore.travelerId(
      { id: localStorage.getItem("user_id") }
    );
    console.log(res)
    if (res.success) {
      try {
        const result = await apiFetch('/travelers',{
          query: {
            traveler_id: res.data
          }
        })
        form.value = {...result.data.value};
        form.value.country = Number(form.value.country);
        form.value.issue = parseDate(form.value.issue);
        form.value.expire = parseDate(form.value.expire);
        form.value.birth = parseDate(form.value.birth);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }
  } catch (error) {
    const result = await apiFetch('/users',{
      query: {
        id: localStorage.getItem("user_id")
      }
    })
    form.value.mail = result.data.value.user.email
    form.value.name = result.data.value.user.name
  }
};

const updateMailPreferences = async (preference) => {
  try {
    const response = await apiFetch(`/travelers/update-mail-preferences/${localStorage.getItem("user_id")}`,{
      method: 'POST',
      body: {
        preference: preference,
      }
    })
    if(response.data.value){
      console.log(response.data.value);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day); // mes inicia en 0
};

const countries_list = ref([]);

const getCountries = async () => {
  try {
    const res = await DestinationStore.GetCountries('');
	  countries_list.value = res.data;	
    console.log(res.data);
  } catch (error) {
    console.error("Error fetching data:", "no entro");
  } 
};

const confirmDelete = () => {
  confirm.require({
    message: "",
    header: "Delete your account",
    accept: () => {
      // deleteUser();
      route.push('/contact');
    },
  });
};

const deleteUser = async () => {
  isLoading.value = true;
  const response = await apiFetch(`/user/${localStorage.getItem("user_id")}`,{
      method: 'DELETE'
    })
  try {
    if (response.data.value.success) {
			await authStore.LogOut()
      localStorage.clear();
      window.location.href = "/";
    }
  } catch (error) {
    toast.add({ severity: "error", summary: "Error", detail: response.error.value.data.message, life: 3000 });
  } finally {
    isLoading.value = false;
  }
};

const saveDataUser = async () => {
  isLoading.value = true;
  const response = await apiFetch(`/write-travelers`,{
      method: 'POST',
      body: {
        ...form.value,
        country: form.value.country?.toString(),
        user_log: localStorage.getItem("user_id"),
      }
    })
  try {
    if (response.data.value.success) {
      toast.add({ severity: "success", summary: "User updated", detail: "User data updated successfully", life: 3000 });
    }else{
      toast.add({ severity: "error", summary: "Error", detail: response.data.value.message[0], life: 3000 });
    }
  } catch (error) {
    console.log(error)
    toast.add({ severity: "error", summary: "Error", detail: response.error.value.data.message, life: 3000 });
  } finally {
    isLoading.value = false;
  }
};

const updatePassword = async () => {
  isLoading.value = true;
  const response = await apiFetch(`/change-password`,{
      method: 'POST',
      body: {
        user_id: localStorage.getItem("user_id"),
        old_password: form.value.oldPassword,
        password: form.value.newPassword,
        password_confirmation: form.value.confirmPassword,
      }
    })
  try {
    if (response.data.value.success) {
      toast.add({ severity: "success", summary: "Password updated", detail: response.data.value.data, life: 3000 });
      form.value.oldPassword = "";
      form.value.newPassword = "";
      form.value.confirmPassword = "";
    }
  } catch (error) {
    toast.add({ severity: "error", summary: "Error", detail: response.error.value.data.message, life: 3000 });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
	 await getUser();
	 await getCountries();
});
</script>

<style>
.p-radiobutton.p-highlight .p-radiobutton-box {
  background-color: #82cf45 !important;
  background: #82cf45 !important;
}

.p-icon-field-right svg.p-icon {
  color: #82cf45 !important;
}

.p-togglebutton.p-highlight .p-button .p-button-icon-left, .p-togglebutton.p-highlight .p-button .p-button-icon-right {
  color: #82cf45 !important;
}
.p-togglebutton .p-button .p-button-icon-left, .p-togglebutton .p-button .p-button-icon-right {
  color: red !important;
}

.checked.p-button {
  color: #82cf45 !important;
  background-color: #fff !important;
  border-color: #82cf45 !important;
}

.p-togglebutton.p-highlight .p-button {
  color: #82cf45 !important;
  background-color: #fff !important;
  border-color: #82cf45 !important;
}

.p-highlight {
    background-color: #fff !important; 
}

.p-togglebutton .p-button {
  color: red !important;
  background-color: #fff !important;
  border-color: red !important;
}

.account-settings {
  padding: 20px;
  font-family: Arial, sans-serif;
}
@media (min-width: 1601px) {
  .account-settings {
    max-width: 85%;
  }
}

@media (max-width: 1600px) {
  .account-settings {
    max-width: 100%;
  }
}

.section-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.highlight {
  color: #82cf45;
}

.description {
  color: #666;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.gender-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.save-button {
  border: 1px solid #FF6C0E;
  background-color: #FF6C0E;
  color: white;
  margin-top: 15px;
}

.delete {
  margin-top: 30px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  width: 100%;
}
.p-inputtext {
  box-shadow: none !important;
  border-color: #ccc !important;
}

.p-datepicker-trigger {
  background: #82cf45 !important;
  border: 1px solid #82cf45 !important;
}

.p-datepicker-trigger svg.p-icon {
  color: #fff !important;
}

.p-password-input svg.p-icon {
  color: #82cf45 !important;
}

.email-note {
  border-radius: 5px; 
  border: 1px solid #D3D3D3; 
  padding: 15px; 
  background:rgba(130, 207, 69, 0.1);
}

.container-form{
  border-radius: 5px; 
  border: 1px solid #D3D3D3; 
  padding: 30px; 
}

/* Estilos para móvil */
@media (max-width: 768px) {
  .mobile-grid {
    display: flex;
    flex-direction: column;
  }
  
  .mobile-col-12 {
    width: 100% !important;
  }
  
  .mobile-col-8 {
    width: 70% !important;
  }
  
  .mobile-col-4 {
    width: 30% !important;
  }
  
  .mobile-calendar {
    width: 100% !important;
  }
  
  .mobile-dropdown {
    width: 100% !important;
  }
  
  .mobile-input {
    width: 100% !important;
  }
  
  .mobile-password {
    width: 100% !important;
  }
  
  .mobile-toggle {
    transform: scale(0.8);
  }
  
  .form-group .grid {
    display: flex;
    flex-direction: column;
  }
  
  .form-group .col-2,
  .form-group .col-3,
  .form-group .col-4,
  .form-group .col-6 {
    width: 100% !important;
    margin-bottom: 15px;
  }
  
  .form-group .col-6:last-child {
    margin-bottom: 0;
  }
  
  .gender-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .p-dropdown,
  .p-inputtext,
  .p-calendar {
    width: 100% !important;
  }
  
  .email-note {
    padding: 10px;
  }
  
  .container-form {
    padding: 15px;
  }
  
  /* Ajustes para los toggle buttons */
  .grid .col-10 {
    width: 70% !important;
  }
  
  .grid .col-2 {
    width: 50% !important;
    text-align: right !important;
  }
  
  /* Ajustes para el formulario de contraseña */
  .section-title + .container-form .grid {
    flex-direction: column;
  }
  
  .section-title + .container-form .col-4 {
    width: 100% !important;
    margin-bottom: 15px;
  }
}


.toggle-green .p-button {
  border-color: #82cf45 !important;
  color: #82cf45 !important;
}
.toggle-red .p-button {
  border-color: red !important;
  color: red !important;
}
.toggle-green .p-button .p-button-icon {
  color: #82cf45 !important;
}
.toggle-red .p-button .p-button-icon {
  color: red !important;
}
</style>