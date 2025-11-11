<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
    </div>
  </div>
  <Toast />

</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { phoneLADA } from "~/models/General";
import Dialog from 'primevue/dialog';
import { useConfirm } from "primevue/useconfirm";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import ProgressBar from "primevue/progressbar";
import ChangePassword from "~/components/ChangePassword.vue";


const route = useRoute();
const toast = useToast();
const user_list = ref([]);
const router = useRouter();
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const newPassword = ref("");
const confirmPassword = ref("");
const passwordsMismatch = ref(false);

const passHide = ref(false);

const config = useRuntimeConfig();
const userId = route.query.user_id;
const loading = ref(false);

const permissions_vals = ref([
  { key: "inventory", text: "Inventory" },
  { key: "orders_p", text: "Orders" },
  { key: "travelers", text: "Travelers" },
  { key: "reports", text: "Reports" },
  { key: "users", text: "Settings: Users" },
  { key: "emails", text: "Settings: Emails" },
  { key: "actions", text: "Settings: Action logs" },
]);

const permissions = ref({
  inventory: false,
  orders_p: false,
  travelers: false,
  reports: false,
  users: false,
  emails: false,
  actions: false,
});

const notifications_vals = ref([
  { key: "orders_n", text: "Order notifications" },
  { key: "cart", text: "Abandoned cart notifications" },
  { key: "bounced", text: "Bounced email notifications" },
  { key: "report", text: "Weekly report" },
]);

const notifications = ref({
  orders_n: false,
  cart: false,
  bounced: false,
  report: false,
});

const params = ref({
  id: 0,
  name: "",
  email: "",
  job_id: "",
  selectedPhone: "",
  phone: 0,
  country: "",
  code: "",
});

const paramsSent = ref({ ...params.value });
const permissionsSent = ref({ ...permissions.value });
const notificationsSent = ref({ ...notifications.value });

const jobTitle = ref([]);


const getUsers = async (queryParams) => {
  try {
    loading.value = true;
    const res = await fetch(
      `${config.public.BACKEND_URL}/api/get-users?admin=1&id=${queryParams}`
    );
    const data = await res.json();
    if (res.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success!!",
        detail: "Data Loaded",
        life: 3000,
      });
      user_list.value = data.response.data[0];
      console.log("user_list", user_list.value);
      permissionsSent.value = user_list.value.permissions;
      notificationsSent.value = user_list.value.notifications;
      paramsSent.value.code = user_list.value.code;
    } else {
      user_list.value = [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};



const getJobs = async () => {
  try {
    loading.value = true;
    const res = await fetch(`${config.public.BACKEND_URL}/api/jobs`);
    const data = await res.json();
    if (res.status === 200) {
      jobTitle.value = data.response;
    } else {
      user_list.value = [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  getJobs();
  getUsers(userId);
});
</script>

<style scoped>
.text_decoration_none {
  text-decoration: none;
}
@media only screen and (max-width: 767px) {
}
@media only screen and (min-width: 768px) and (max-width: 1199px) {
}
@media only screen and (min-width: 1200px) {
  .max-80-lg {
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
