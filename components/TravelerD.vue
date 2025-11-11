<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
      <div class="col-12 lg:col-10">
        <div
          class="header-container flex align-items-center justify-content-between bg-gray-700 px-5 py-2"
        >
          <div class="left-section flex align-items-center">
            <Button
              icon="pi pi-arrow-left"
              aria-label="Back"
              style="
                height: 100px;
                margin-top: -1%;
                margin-bottom: -1%;
                margin-left: -2%;
                background-color: #82cf45;
              "
            />
            <h1 class="canaro-font font-semibold text-white ml-3">
              Traveler Details
            </h1>
          </div>
          <div class="right-section">
            <Button
              label="Save"
              severity="warning"
              aria-label="Settings"
              @click="confirm_m(1)"
            />
          </div>
        </div>
        <br />
        <ProgressBar
          v-if="loading"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        <div class="my-4 titleh">
          <div>
            <h3>Personal information</h3>
            <table style="width: 100%">
              <tr>
                <td style="width: 25%;" ><p>Title</p></td>
                <td style="text-align: center;width: 25%;">
                  <Dropdown
                    class="w-full md:w-15rem"
                    style="margin-bottom: 2%; height: 25%"
                    v-model="personal_info.title"
                    :options="title_list"
                    optionLabel="label"
                    optionValue="value"
                  />
                </td>
                <td style="width: 25%;"><p>Email</p></td>
                <td style="text-align: center;width: 25%;">
                  <InputText type="text" v-model="personal_info.mail" />
                </td>
              </tr>

              <tr>
                <td><p>Firt Name</p></td>
                <td style="text-align: center">
                  <InputText type="text" v-model="personal_info.name" />
                </td>
                <td><p>Gender</p></td>
                <td style="text-align: center">
                  <Dropdown
                    class="w-full md:w-15rem"
                    style="margin-bottom: 2%; height: 25%"
                    v-model="personal_info.gender"
                    :options="gender_list"
                    optionLabel="label"
                    optionValue="value"
                  />
                </td>
              </tr>
              <tr>
                <td><p>Last Name</p></td>
                <td style="text-align: center">
                  <InputText type="text" v-model="personal_info.last" />
                </td>
                <td><p>Birthdate</p></td>
                <td style="text-align: center">
                  <Calendar
                    style="width: 60%"
                    showIcon
                    :showOnFocus="false"
                    v-model="personal_info.birth"
                    dateFormat="yy-mm-dd"
                    @change="() => formatDate('birth')"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div>
						<!-- <Dropdown
							v-model="personal_info.country"
							editable
							:options="countries_list"
							optionLabel="name"
							optionValue="t_country_id"
							placeholder="Select a Country"
							class="w-full md:w-15rem"
						/> -->
						
            <h3>Contact Information</h3>
            <table style="width: 100%">
              <tr>
                <td style="width: 25%;"><p>Address</p></td>
                <td style="text-align: center;width: 25%;">
                  <InputText type="text" v-model="personal_info.address" />
                </td>
                <td style="width: 25%;"><p>Country</p></td>
                <td style="text-align: center;width: 25%;">
                  <Dropdown
                    v-model="personal_info.country"
                    editable
                    :options="countries_list"
                    optionLabel="name"
                    optionValue="t_country_id"
                    placeholder="Select a Country"
                    class="w-full md:w-15rem"
                  />
                </td>
              </tr>
              <tr>
                <td><p>Mobile Number</p></td>
                <td style="text-align: right">
									<div style="display: inline-flex; margin-right: -28%;">
										<Dropdown v-model="personal_info.phone_country" :options="phoneLADA" optionLabel="name" optionValue="name" placeholder="(+)"  style="height: 40px; width: 33%;"/>
										<InputText type="text" v-model="personal_info.phone" style="width: 35%;" />
									</div>
                </td>
                <td><p>Passport</p></td>
                <td style="text-align: center">
                  <InputText
                    type="text"
                    style="margin-top: 3%"
                    v-model="personal_info.passport"
                  />
                </td>
              </tr>
              <tr>
                <td><p>Passport issue Date</p></td>
                <td style="text-align: center">
                  <div class="calendar-wrapper">
                    <Calendar
                      style="width: 60%"
                      showIcon
                      :showOnFocus="false"
                      v-model="personal_info.issue"
                      dateFormat="yy-mm-dd"
                      @change="() => formatDate('issue')"
                    />
                  </div>
                </td>
                <td><p>Passport expire date</p></td>
                <td style="text-align: center">
                  <div class="calendar-wrapper">
                    <Calendar
                      style="width: 60%"
                      showIcon
                      :showOnFocus="false"
                      v-model="personal_info.expire"
                      dateFormat="yy-mm-dd"
                      @change="() => formatDate('expire')"
                    />
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div style="padding: auto">
            <h3>Marketing Information</h3>
            <div class="flex flex-row items-center space-x-2">
              <p style="width: 15%">How did you hear about us?</p>
              <InputText
                style="margin-top: -6%; width: 60%"
                v-model="marketing_info.hear"
              />
            </div>

            <div class="flex flex-row items-center space-x-2">
              <p style="width: 15%">Internal Notes</p>
              <InputText
                style="margin-top: -6%; width: 60%"
                v-model="marketing_info.internal_notes"
              />
            </div>

            <div class="flex flex-row items-center space-x-2">
              <p style="width: 15%">Subscribed</p>
              <Dropdown
                style="margin-top: -6%; width: 5%"
                v-model="marketing_info.suscribed"
                :options="subscribed_option"
                optionLabel="text"
                optionValue="id"
                class="w-full md:w-8rem"
              />
            </div>
          </div>
          <br />
          <div>
            <Button
              label="Save"
              severity="warning"
              class="btnS"
              @click="confirm_m(1)"
            />
            <Button
              label="Delete"
              class="btnS"
              severity="secondary"
              style="
                margin-right: 15px;
                background-color: white;
                border-color: orangered;
                color: black;
              "
            />
          </div>
        </div>
        <br />
        <ProgressBar
          v-if="loading"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        <Orders :userId="personal_info.user_id" v-if="personal_info.user_id" />
        <br />
        <ProgressBar
          v-if="loading"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        <ActionLogs
          :userId="personal_info.user_id"
          v-if="isComponentReady && personal_info.user_id"
        />
        <br />
        <ProgressBar
          v-if="loading"
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        <Emails :Email="personal_info.mail" v-if="personal_info.mail" />

        <br />
        <div v-if="load" class="overlay">
          <ProgressSpinner class="custom-spinner" />
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
import { ref, onMounted } from "vue";

import Dropdown from "primevue/dropdown";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import Calendar from "primevue/calendar";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import Orders from "~/components/Orders.vue";
import Emails from "~/components/Emails.vue";
import ProgressSpinner from "primevue/progressspinner";
import { useRoute, useRouter } from "vue-router";
import { useTravelerStore } from "~/store/travelerStore";
import { useDestinationStore } from "#imports";
import { phoneLADA } from "~/models/General";

const DestinationStore= useDestinationStore();
const config = useRuntimeConfig();
const toast = useToast();
const load = ref(false);
const confirm = useConfirm();
const user_log = ref(null);
const route = useRoute();
const router = useRouter();
const useTravelerS = useTravelerStore();

const url = ref(`${config.public.BACKEND_URL}`);
/* const url = ref(`http://127.0.0.1:8000`); */

const isComponentReady = ref(false);

const visible = ref(false);
const loading = ref(false);
const spinner = ref(false);

const props = defineProps({
  isPersonalForm: {
    type: Boolean,
    default: false,
  },
});

const subscribed_option = ref([
  { text: "yes", id: 1 },
  { text: "no", id: 2 },
]);

const personal_info = ref({
  travelers: 1,
  user_log: user_log.value,
  birth: null,
  issue: null,
  expire: null,
});

const formatDate = (field) => {
  if (!personal_info.value[field]) return;

  const date = new Date(personal_info.value[field]);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  personal_info.value[field] = `${year}-${month}-${day}`;
  console.log("contenido de fecha:", personal_info.value);
};

const countries_list = ref([]);

const marketing_info = ref({
  id: 0,
  hear: "",
  suscribed: 0,
  internal_notes: "",
});

const paramsPersonal = ref({
  traveler_id: 0,
  user_id: 0,
});

const gender_list = ref([
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]);

const title_list = ref([
  { label: "Mr.", value: "Mr." },
  { label: "Ms.", value: "Ms." },
  { label: "Mrs.", value: "Mrs." },
  { label: "Miss", value: "Miss" },
]);

const getId = async (user) => {
  console.log("imprime id enviado:", user);
  const res = await useTravelerS.travelerId(
    { id: user },
    `${url.value}`
  );
  if (res.success) {
    const userId = res.data;
    paramsPersonal.value.traveler_id = userId;
    router.push({ path: "/personal-details", query: { userId: userId } });
  }
  paramsPersonal.value.user_id = localStorage.getItem("user_id");
};

const getCountries = async () => {
  visible.value = true;
  try {
    loading.value = true;
    const res = await DestinationStore.GetCountries('',url.value);
	countries_list.value = res.data;	
		
  } catch (error) {
    console.error("Error fetching data:", "no entro");
  } finally {
    loading.value = false;
  }
};

const getUser = async () => {
  const queryString = new URLSearchParams(paramsPersonal.value).toString();
  try {
    if (paramsPersonal.value.traveler_id) {
      const res = await fetch(
        `${url.value}/api/travelers?${queryString}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      personal_info.value = data;
      marketing_info.value = data.user_;
      isComponentReady.value = true;
			personal_info.value.country=  Number(personal_info.value.country);

    } else {
      personal_info.value.mail = localStorage.getItem("email");
      personal_info.value.name = localStorage.getItem("name");
      personal_info.value.user_id = localStorage.getItem("user_id");
    }
    personal_info.value.user_log = localStorage.getItem("user_id");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const confirm_m = (action) => {
  confirm.require({
    message:
      action == 1
        ? "Are you sure you want to SAVE?"
        : "Are you sure you want to DELETE?",
    header: "Confirmation",
    iconProps: {
      class: "red-icon",
    },
    accept: () => {
      envio();
    },
    reject: () => {},
  });
};

const updateTraveler = async () => {
  console.log("contenido para enviar de personal info:", personal_info.value);
  const queryString = new URLSearchParams(personal_info.value).toString();
  try {
    const res = await fetch(
      `${url.value}/api/write-travelers?${queryString}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    if (data.success) {
      console.log("contenido de respuesta", data);
      personal_info.value = data.data;
	  personal_info.value.country=  Number(personal_info.value.country);
      toast.add({
        severity: "success",
        summary: "Success!!",
        detail: "Data Updated",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Error!!",
        detail: data.message[0],
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const updateUser = async () => {
  const queryString = new URLSearchParams(marketing_info.value).toString();
  try {
    const res = await fetch(
      `${url.value}/api/users-travelers?${queryString}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log("contenido de update user traveler", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const envio = async () => {
  load.value = true;
  loadData();
  await updateUser();
  await updateTraveler();
  load.value = false;
};

const loadData = () => {
  spinner.value = true;
  setTimeout(() => {
    spinner.value = false;
  }, 5000);
};

const valasign = () => {
  const userId = route.query.userId;
  paramsPersonal.value.traveler_id = userId;
};

onMounted(async () => {
	loading.value = true;
	personal_info.value.user_log = localStorage.getItem("user_id");
	 if (props.isPersonalForm) {
	   await getId(personal_info.value.user_log);
	 } else {
	   valasign();
	 }
	 await getCountries();
	 await getUser();
	  
	loadData();
	loading.value = false;
	load.value = false;
	console.log("personal info:", personal_info.value);
	console.log("countries:", countries_list.value);
});
</script>

<style scoped>
.titleh h3 {
  background-color: #82cf45;
  color: white;
  padding: 1%;
  border-radius: 5px;
}

.titleh p {
  font-weight: bold;
  margin-bottom: 8%;
}

.column {
  flex-direction: column;
  width: 50%;
}

.row {
  display: flex;
}

.titles p,
.inputs input {
  margin-bottom: 15px;
}

.btnS {
  margin-right: 15px;
  padding: 1%;
  width: 7%;
}

.calendar-wrapper .p-inputtext {
  height: 100%;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.calendar-wrapper .p-datepicker-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.flex-row {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.5;
}
.relative {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5); /* Fondo semitransparente */
  z-index: 9999; /* Asegura que esté por encima de todo */
  pointer-events: none; /* Bloquea la interacción con los elementos debajo */
}
.custom-spinner .p-progress-spinner .p-progress-circle {
  stroke: #4caf50; /* Cambia el color del spinner a verde (#4CAF50) */
}
</style>
