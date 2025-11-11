<template>
	<div class="grid">
		<div class="field col-12 md:col-6">
			<label><b>Email Address</b> <span class="text-red-600" v-if="!email">*</span></label>
			<input v-bind="attrs" v-model="email" @paste="preventPaste" type="email"
			class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
			placeholder="example@mail.com" />
		</div>
		<div class="field col-12 md:col-6">
			<label>Confirm Email Address <span class="text-red-600" v-if="!emailConfirmation">*</span></label>
			<textarea v-bind="attrs" v-model="emailConfirmation" @paste="preventPaste" autocomplete="off"
			class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
			placeholder="example@mail.com" style="resize: none; height: 32px; overflow: hidden;"></textarea>
			<small v-if="error" class="text-red-600">the email must match</small>
		</div>
	</div>
</template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const email = ref('');
  const emailConfirmation = ref('');
  const error = ref(false);
  
  const emit = defineEmits();
  

  const props = defineProps(['modelValue']);

const attrs = useAttrs()
  watch(() => props.modelValue, (newValue) => {
	email.value = newValue;
	emailConfirmation.value = newValue;
  });
  
  function handleEmail(newValue) {
	if (email.value !== emailConfirmation.value) {
	  error.value = true;
	  return;
	}
	error.value = false;
	emit('update:modelValue', newValue); 
  }
  
  function preventPaste(event) {
	event.preventDefault();
  }
  
  watch(email, (newValue) => {
	handleEmail(newValue);
  });
  
  watch(emailConfirmation, (newValue) => {
	handleEmail(newValue);
  });
  </script>
<style scoped>
	.input-error-sub {
		border: 1px solid red !important;
		background-color: #ffe6e6;
	}
</style>
  