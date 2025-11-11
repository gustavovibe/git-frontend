<template>
  <div class="field col-12 md:col-6">
    <label>Issue Place <span class="text-red-600">*</span></label>
    <select v-model="place"
      class="w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary"
      style="appearance: auto; font-weight: 300">
      <option disabled value="">-- Select Passport Issue Place --</option>
      <option v-for="country in countries" :key="country">{{ country }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { GLOBAL_COUNTRIES } from '~/utils/globalCountries';

const props = defineProps(['modelValue'])

const countries = ref(GLOBAL_COUNTRIES);
const place = ref('');

const emit = defineEmits();

watch(place, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>