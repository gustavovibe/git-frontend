<template>
	<ProgressBar
		 v-if="loading"
		 mode="indeterminate"
		 style="height: 6px"
	   ></ProgressBar>
	   <p style="font-weight: bold;">Please enter your new password below to update your account's security.</p>
	   <p style="color:#82CF45">Password must have 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.</p>

 <div  style="margin-top: 5%; text-align: center;">
	 <table style="width:80%;">
		 <tr>
			 <td style="width: 20%;"><label style="margin-right: 1%; font-weight: bold;">New password</label></td>
			 <td style="width: 80%;"> <div class="flex">
	 <InputText
	   placeholder="Enter your password"
	   :type="passwordVisible ? 'text' : 'password'"
	   v-model="newPassword"
	 />
	 <Button
	   :icon="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
	   class="ml-2"
	   @click="togglePasswordVisibility"
	 />
   </div></td>
			</tr>
			<tr>
				<td> <label style="margin-right: 1%; font-weight: bold;">Confirm password</label></td>
				<td><div class="flex">
	 <InputText
	   placeholder="Confirm your password"
	   :type="confirmPasswordVisible ? 'text' : 'password'"
	   v-model="confirmPassword"
	 />
	 <Button
	   :icon="confirmPasswordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
	   class="ml-2"
	   @click="toggleConfirmPasswordVisibility"
	 />
   </div></td>
			</tr>
		</table>
	   <p v-if="passwordsMismatch" style="margin-left: 1%; " class="text-red-500">Passwords do not match.</p>
 </div>
   <br>
   <hr>
   <Button
	   v-if="!passwordsMismatch"
	   label="change password"
	   outlined 
	   @click="confirm_m"
	   style="margin-left: 75%"
   />

	<Toast />

   <ConfirmDialog>
   <template #icon>
	 <i class="pi pi-exclamation-triangle red-icon"></i>
   </template>
 </ConfirmDialog>

</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const config = useRuntimeConfig();
const loading = ref(false);
const toast = useToast();

const props = defineProps({
   userId: {
	   type: Number,
	   required: true 
   }
});

const emit= defineEmits();
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const newPassword = ref("");
const confirmPassword = ref("");
const passwordsMismatch = ref(false);
const confirm = useConfirm();

const confirm_m = () => {
 confirm.require({
   message:"Are you sure you want to SAVE NEW PASSWORD?",
   header: "Confirmation",
   iconProps: {
	 class: "red-icon",
   },
   accept: () => {
	   savePassword()
   },
   reject: () => {},
 });
};

const togglePasswordVisibility = () => {
 passwordVisible.value = !passwordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
 confirmPasswordVisible.value = !confirmPasswordVisible.value;
};

const comparePasswords = () => {
 if (newPassword.value && confirmPassword.value) {
   passwordsMismatch.value = newPassword.value !== confirmPassword.value;
 } else {
   passwordsMismatch.value = false;
 }
};

const savePassword= async ()=>{
   try{
	   loading.value = true;
	   const payload = {
		   id:props.userId,
		   password:confirmPassword.value,
	   };
	   const res = await fetch(`${config.public.BACKEND_URL}/api/users-pass`,{
		   method:'POST',
		   headers: { 'Content-Type': 'application/json' },
		   body: JSON.stringify(payload)
	   });
	   const data = await res.json();
		 console.log("Response from server:", data);
	   if (data.success) {
			setTimeout(()=>{
				emit('passwordChanged',{success:true})
			},1000);
		  toast.add({ severity: 'success', summary: 'Success!!', detail: 'Save Success!!', life: 3000 });
	   } else {
		  toast.add({ severity: 'error', summary: 'Oppss!!', detail: data.message, life: 3000 });
	   }
   }catch(error){
	   console.error("Error fetching data:", error);
   }finally{
	   loading.value = false;
   }
};

watch([newPassword, confirmPassword], comparePasswords);

onMounted(() => {
   console.log('contenido de id cambio de contraseña:',props.userId);
});
</script>