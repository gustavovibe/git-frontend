<template>
  <div class="my-4">
    <h2>Orders</h2>
    <div class="my-4 canaro-font">
      <DataTable :value="dataT" showGridlines tableStyle="min-width: 50rem">
        <Column field="created_at" header="Booking date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.created_at) }}
          </template>
        </Column>
        <Column field="booking_id" header="Order#"></Column>
        <Column field="booking_status" header="Booking_status"></Column>
        <Column field="start" header="Travel date"></Column>
        <Column field="start_city" header="Departure place"></Column>
        <Column field="duration" header="Trip duration"></Column>
        <Column field="end_city" header="Destination(s)"></Column>
        <Column field="travelers_number" header="Group size"></Column>
        <!-- <Column header="Traveler's name">
          <template #body="slotprops">
            <p>{{ slotprops.data.name + " " + slotprops.data.last }}</p>
          </template>
        </Column> -->
        <Column header="Paid by traveler">
          <template #body="slotprops">
            <p>{{ "$" + slotprops.data.paid }}</p>
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

const config = useRuntimeConfig();

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const paramsOrders = ref({
  user_id:props.userId
});

const dataT = ref([]);

const getOrders = async () => {
  try {
    const queryString = new URLSearchParams(paramsOrders.value).toString();
    const res = await fetch(
      `${config.public.BACKEND_URL}/api/orders?${queryString}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
	console.log('contenido de data order',data);
    if (data.status) {
      dataT.value = data.before_today.data;
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
  () => props.userId,
  (newVal) => {
    paramsOrders.value.user_id = newVal;
    getOrders();
  }
);

onMounted(() => {
  getOrders();
});
</script>
