<template>
  <div class="field col-12 md:col-5">
    <label class="mt-3 mb-2">Firstname <span class="text-red-600">*</span></label>
    <input v-model="firstName" type="text"
      class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
      placeholder="Type your first name..." />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['modelValue'])

const firstName = ref('');

const emit = defineEmits();

watch(firstName, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
