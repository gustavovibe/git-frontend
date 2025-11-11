<template>
  <div class="field col-12 md:col-12">
    <label class="mt-3 mb-2">Phone Number <span class="text-red-600">*</span></label>
    <div class="flex">
      <!-- Country code dropdown -->
      <select v-model="selectedCountryCode"
        class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary text-center">
        <option v-for="(country, index) in countryCodes" :key="index" :value="country.code">
          {{ truncate(country.name, 15) }} ({{ country.code }})
        </option>
      </select>
      <!-- Phone number input -->
      <input v-model="phoneNumber" type="tel"
        class="ml-2 text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary flex-grow"
        placeholder="987654321" @input="restrictToNumbers" @blur="validatePhoneNumber" />
    </div>
    <span v-if="validationError" class="text-red-600 text-sm">{{ validationError }}</span>
  </div>
  <Toast />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { GLOBAL_PHONE_CODES } from '~/utils/globalPhoneCodes';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

const props = defineProps(['modelValue', 'phoneCode']);
const emit = defineEmits();

const phoneNumber = ref('');
const selectedCountryCode = ref('+1'); 
const validationError = ref(null);
const toast = useToast();
const countryCodes = GLOBAL_PHONE_CODES;

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const restrictToNumbers = (event) => {
  const input = event.target.value;
  const numericInput = input.replace(/\D/g, ''); 
  phoneNumber.value = numericInput;
};


const validatePhoneNumber = () => {
  const fullPhoneNumber = selectedCountryCode.value + phoneNumber.value;
  try {
    const phoneNumberObj = parsePhoneNumberFromString(fullPhoneNumber);
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      validationError.value = 'Invalid phone number.';
      toast.add({ severity: 'error', summary: 'Error!!', detail: 'Invalid phone format', life: 3000 });
    } else {
      validationError.value = null;
    }
  } catch (error) {
    validationError.value = 'Invalid phone number format.';
  }
};


onMounted(() => {
  if (props.modelValue && props.phoneCode) {
   /*  const [countryCode, number] = props.modelValue.split(' '); */
    selectedCountryCode.value = props.phoneCode || '+1';
    phoneNumber.value = props.modelValue || '';
  }
});


watch([phoneNumber, selectedCountryCode], ([newPhoneNumber, newCountryCode]) => {
  const fullPhoneNumber = newCountryCode + newPhoneNumber;
  emit('update:modelValue', fullPhoneNumber); 
});
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.text-red-600 {
  color: #e3342f;
}
.text-sm {
  font-size: 0.875rem;
}
</style>
