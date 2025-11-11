<template>
  <div class="p-fluid">
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label>Given names  <span  v-if="!billing_details.given_name" style="color: red;">*</span></label>
        <InputText v-model="billing_details.given_name" />
      </div>
      <div class="field col-12 md:col-6">
        <label>Surnames <span  v-if="!billing_details.last_name" style="color: red;">*</span></label>
        <InputText v-model="billing_details.last_name" />
      </div>
    </div>

    <div class="field">
      <label>Country <span  v-if="!billing_details.country" style="color: red;">*</span> </label>
      <Dropdown v-model="billing_details.country" :options="props.countryOptions" placeholder="Select country" optionLabel="name" optionValue="name" style="width: 100%;" />
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-8">
      <label>Street address <span  v-if="!billing_details.address" style="color: red;">*</span></label>
      <InputText v-model="billing_details.address" style="width: 100%;" />
      </div>
      <div class="field col-12 md:col-4">
        <label>Postal code  <span  v-if="!billing_details.postal_code" style="color: red;">*</span></label>
        <InputText v-model="billing_details.postal_code" type="number" />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label>City <span  v-if="!billing_details.city" style="color: red;">*</span></label>
        <InputText v-model="billing_details.city" />
      </div>
      <div class="field col-12 md:col-6">
        <label>State  <span  v-if="!billing_details.state" style="color: red;">*</span></label>
        <InputText v-model="billing_details.state" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const props = defineProps({
  countryOptions: {
    type: Array,
    required: true
  }
});


const billing_details = ref({
  given_name: '',
  last_name: '',
  country: '',
  street: '',
  city: '',
  postal_code: ''
});

const isFormComplete = () => {
  return billing_details.value.given_name &&
         billing_details.value.last_name &&
         billing_details.value.country &&
         billing_details.value.street &&
         billing_details.value.city &&
         billing_details.value.postal_code;
};


const emit = defineEmits(['update:modelValue']);

watch(billing_details, () => {
  const formStatus = isFormComplete() ? 1 : 2; 
  emit('update:personalFlag', formStatus); 
	console.log('contenido dentro de componente',formStatus);
}, { deep: true });


watch(billing_details, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

</script>