<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
      <div id="menu" class="col-12 lg:col-2">
				<PanelMenuCMS />
			</div>
			<div class="col-12 lg:col-10">
				<AccountDetails :userId="userId" />
			</div>
    </div>
  </div>
  <Toast />

</template>

<script setup>
	definePageMeta({
		middleware: ['auth','profile'],
	});
import { ref, watch, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRoute,useRouter } from "vue-router";
import AccountDetails from "~/components/AccountDetails.vue";


const route = useRoute();
const router = useRouter();
const userId = ref(null);


const permissions = ref({
  inventory: false,
  orders_p: false,
  travelers: false,
  reports: false,
  users: false,
  emails: false,
  actions: false,
});


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


const getId= async (user_id)=>{
	const query ={...route.query,user_id:user_id};
	await router.replace({query});
}

onMounted(() => {

  userId.value=localStorage.getItem('user_id');
	console.log('id de usuario',userId.value);
	getId(userId.value);	



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
