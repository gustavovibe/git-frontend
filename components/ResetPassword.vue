<template>
  <div style="border: 1px solid #dddddd; border-radius: 8px; padding: 3%">
	<div v-if="!finish">
    <p style="font-weight: bold">
      Provide the email address associated with your account to recover your
      password.
    </p>

		<table style="width: 80%; text-align: center">
			<tr>
				<td>
					<b style="color: #82cf45"
						>Email <a v-if="!validate" style="color: red">*</a>
					</b>
				</td>
				<td>
					<InputText v-model="email" id="email" placeholder="Your email" />
				</td>
			</tr>
		</table>

		<br />
		<div style="text-align: right">
			<Button @click="recoverPass()" label="Reset password"></Button>
		</div>
		<br />
		<div v-if="loading">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
		</div>
	</div>

	<div v-if="finish" style="text-align: center">
		<p style="color:#82cf45; font-weight: bold">
			Please check your inbox to continue
		</p>
	</div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { generalFunctions } from "~/store/general";
import { useToast } from "primevue/usetoast";
import { UsersStore } from "~/store/usersStore";
import ProgressBar from "primevue/progressbar";


const email = ref(null);
const validate = ref(false);
const general = generalFunctions();
const toast = useToast();
const userStore = UsersStore();
const loading = ref(false);
const finish = ref(false);
const config = useRuntimeConfig();

const recoverPass = async () => {
	validate.value = general.emailValidate(email.value);
	if (validate.value && email.value) {
		try {
	  loading.value = true;
      const res = await userStore.RecoverPass({ email: email.value },`${config.public.BACKEND_URL}`);
      if (res.success) {
        toast.add({
          severity: "success",
          summary: "Success!!",
          detail: res.data,
          life: 3000,
        });
		finish.value=true;
      } else {
        toast.add({
          severity: "error",
          summary: "Oppss!!",
          detail: res.data,
          life: 3000,
        });
      }
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Oppss!!",
        detail: error,
        life: 3000,
      });
    } finally{
		loading.value=false;
	}
  } else {
    toast.add({
      severity: "error",
      summary: "Oppss!!",
      detail: "email invalid format!!",
      life: 3000,
    });
  }
};

onMounted(() => {});
</script>
