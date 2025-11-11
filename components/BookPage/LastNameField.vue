<template>
  <div class="field col-12 md:col-5">
    <label class="mt-3 mb-2">Lastname <span class="text-red-600">*</span></label>
    <input v-model="lastName" type="text"
      class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
      placeholder="Type your last name..." />
  </div>
  <div class="col-12 mb-3">
    <small class="text-gray-600">Same as in your passport.</small>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['modelValue'])

const lastName = ref('');

const emit = defineEmits();

watch(lastName, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
