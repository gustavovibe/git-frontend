<template>
  <div class="field col-12 md:col-6">
    <label>Nationality <span class="text-red-600">*</span></label>
    <select v-model="selectedNationality"
      class="w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary"
      style="appearance: auto; font-weight: 300">
      <option disabled value="">-- Select nationality --</option>
      <option v-for="nationality in nationalities" :key="nationality">
        {{ nationality }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { GLOBAL_NATIONALITIES } from '~/utils/globalNationalities';
const props = defineProps(['modelValue'])

const nationalities = ref(GLOBAL_NATIONALITIES);
const selectedNationality = ref('');

const emit = defineEmits();

watch(selectedNationality, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>