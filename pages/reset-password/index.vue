<template>
  <div class="overflow-hidden mb-8 main-spacing-cms" style="margin-top: 5%">

		
    <div class="grid" style="text-align: center">
      <div class="col-12 lg:col-2"></div>
      <div
        class="col-12 lg:col-8"
        style="border: 1px solid #dddddd; border-radius: 8px; padding: 2%"
      >
        
				<div style="text-align: center"  v-if="loading" >
				<ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
						animationDuration=".5s" aria-label="Custom ProgressSpinner"  />
			</div>
			<div v-if="!isSuccess">
        <ChangePassword @passwordChanged="handlePasswordChange" v-if="user_id" :userId="user_id" />
			</div>
		<div v-if="error">
			<h1 style="color:red">Upps!!</h1>
			<p >Your password reset link has expired. Please request a new password reset link to continue.</p>
		</div>
			<div v-if="isSuccess">
				<p style="font-weight: bold;color: #82CF45;">Password updated successfully!</p>
			</div>
      </div>
			<div class="col-12 lg:col-2"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { UsersStore } from "~/store/usersStore";
import ChangePassword from "~/components/ChangePassword.vue";
import { useRoute, useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";

const user_id = ref(null);
const token = ref(null);
const toast = useToast();
const userStore = UsersStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const config = useRuntimeConfig();
const isSuccess = ref(false);
const error= ref(false);


const handlePasswordChange = (result) => {
    isSuccess.value = result.success;
	if(isSuccess.value){
		setTimeout(() => {
            router.push('/'); 
        }, 2000);
	}
	console.log('obtiene los datos del hijo:',isSuccess.value);
};

const CheckToken = async () => {
  try {
	loading.value=true;
    token.value = route.query.token;

	const res=  await userStore.CheckTokenReset({token:token.value},`${config.public.BACKEND_URL}`);

	if(res.success){
		user_id.value=res.data;
		console.log('user_id:',user_id.value);
	}else{
		error.value=true;
	}
	loading.value=false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Oppss!!",
      detail: "Try later!!",
      life: 3000,
    });
  }
};

onMounted(() => {
  CheckToken();
});
</script>
