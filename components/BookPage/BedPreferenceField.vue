<template>
  <div class="field col-12 md:col-12">
    <label>Bed Preference <span class="text-red-600">*</span></label>
    <select v-model="valueSelected"
      class="w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary"
      style="appearance: auto; font-weight: 300">
      <option disabled value="">-- Select --</option>
      <option value="Single Bed">Single Bed</option>
      <option value="Twin Bed">Twin Bed</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits();

const valueSelected = ref('');

watch(valueSelected, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>