<template>
  <div class="my-4">
    <h2>Recent Emails</h2>
    <div class="my-4 canaro-font">
      <DataTable
        :value="dataE"
        showGridlines
        tableStyle="min-width: 50rem"
        class="table_s"
      >
        <Column
          field="created_at"
          header="Sent"
          headerClass="custom-header"
          style="width: 15%"
        >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.sent) }}
          </template>
        </Column>
        <Column
          field="mail_from"
          header="Email Address"
          headerClass="custom-header"
          style="width: 15%"
        ></Column>
        <Column
          field="order"
          header="Order Number"
          headerClass="custom-header"
          style="width: 10%"
        ></Column>
        <Column
          header="Email Type"
          headerClass="custom-header"
          style="width: 15%"
        >
          <template #body="slotProps">
            <p>{{ asign_name(slotProps.data.mail_type) }}</p>
          </template>
        </Column>
        <Column field="status" header="Status" headerClass="custom-header">
          <template #body="slotProps">
            <div v-if="[35].includes(slotProps.data.status)">
              <ProgressBar :value="slotProps.data.status" class="mx-2 red">
                <div>
                  <span>{{ asign_status(slotProps.data.status) }}</span>
                </div>
              </ProgressBar>
            </div>
            <div v-if="[40, 50].includes(slotProps.data.status)">
              <ProgressBar :value="slotProps.data.status" class="mx-2 green">
                <div>
                  <span>{{ asign_status(slotProps.data.status) }}</span>
                </div>
              </ProgressBar>
            </div>
            <div v-if="[75, 100].includes(slotProps.data.status)">
              <ProgressBar :value="slotProps.data.status" class="mx-2 blue">
                <div>
                  <span>{{ asign_status(slotProps.data.status) }}</span>
                </div>
              </ProgressBar>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressBar from "primevue/progressbar";

const config = useRuntimeConfig();
const dataE = ref([]);
const visible = ref(false);
const props = defineProps({
  Email: {
    type: String,
    required: true,
  },
});

const subject_list = ref([
  { id: 1, text: "Booking confirmation" },
  { id: 2, text: "Booking cancellation" },
  { id: 3, text: "Reminder" },
  { id: 4, text: "Payment request" },
]);

const status_list = ref([
  { text: "Sent", id: 40 },
  { text: "Delivered", id: 50 },
  { text: "Opened", id: 75 },
  { text: "Clicked", id: 100 },
  { text: "Bounced", id: 35 },
]);

const asign_name = (id) => {
  let value = subject_list.value.find((item) => item.id == id);
  return value.text;
};

const asign_status = (id) => {
  let value = status_list.value.find((item) => item.id == id);
  return value.text;
};


const paramsEmail = ref({
  email:props.Email 
});

const getEmails = async () => {
  try {
    const queryParams = new URLSearchParams(paramsEmail.value).toString();
    const res = await fetch(
      `${config.public.BACKEND_URL}/api/show-contact?${queryParams}`
    );
    const data = await res.json();
	console.log('contenido de correos:',data);
    if (data.success) {
      dataE.value = data.data.data;
    } else {
      console.log("No se obtuvieron los datos");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

watch(
  () => props.Email,
  (newVal) => {
    paramsEmail.value.email = newVal;
    getEmails();
  }
);

onMounted(() => {
  getEmails();
});
</script>
