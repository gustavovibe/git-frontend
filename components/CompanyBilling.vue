<template>
  <div class="p-fluid">
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label>Company name <span  v-if="!billing_details.company_name" style="color: red;">*</span></label>
        <InputText v-model="billing_details.company_name" />
      </div>
      <div class="field col-12 md:col-6">
        <label>Company ID <span  v-if="!billing_details.company_id" style="color: red;">*</span></label>
        <InputText v-model="billing_details.company_id" />
      </div>
    </div>

    <div class="field">
      <label>Tax ID <span  v-if="!billing_details.tax_id" style="color: red;">*</span></label>
      <InputText v-model="billing_details.tax_id" style="width: 100%;" />
    </div>

		<div class="field">
      <label>Country <span  v-if="!billing_details.country" style="color: red;">*</span> </label>
      <Dropdown v-model="billing_details.country" :options="props.countryOptions" placeholder="Select country" optionLabel="name" optionValue="t_country_id" style="width: 100%;" />
    </div>

	  <div class="field">
      <label>Street address <span  v-if="!billing_details.street" style="color: red;">*</span></label>
      <InputText v-model="billing_details.street" style="width: 100%;" />
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label>City <span  v-if="!billing_details.city" style="color: red;">*</span></label>
        <InputText v-model="billing_details.city" />
      </div>
      <div class="field col-12 md:col-6">
        <label>Postal code  <span  v-if="!billing_details.postal_code" style="color: red;">*</span></label>
        <InputText v-model="billing_details.postal_code" type="number" />
      </div>
    </div>
  </div>
</template>


<script setup>

import InputText from 'primevue/inputtext';
import Dropdown from "primevue/dropdown";
import { ref, watch } from 'vue';



const props = defineProps({
  countryOptions: {
    type: Array,
    required: true
  }
});

const billing_details= ref({
	company_name:'',
	company_id:'',
	country:'',
	tax_id:'',
	city:'',
	postal_code:'',
	street:''
})


const isFormComplete = () => {
  return billing_details.value.company_name &&
         billing_details.value.company_id &&
         billing_details.value.country &&
         billing_details.value.tax_id &&
         billing_details.value.city &&
         billing_details.value.postal_code &&
		 billing_details.value.street;
};

const emit = defineEmits(['update:modelValue']);


watch(billing_details, () => {
  const formStatus = isFormComplete() ? 1 : 2; 
  emit('update:companyFlag', formStatus); 
}, { deep: true });

watch(billing_details, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

</script>