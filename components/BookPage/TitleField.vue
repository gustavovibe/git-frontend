<template>
  <div class="field col-12 md:col-2">
    <label class="mt-3 mb-2">Title <span class="text-red-600">*</span></label>
    <select v-model="selectedTitle"
      class="w-full text-base text-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary"
      style="appearance: auto; font-weight: 300">
      <option value="Mr.">Mr.</option>
      <option value="Ms.">Ms.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Miss">Miss</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['modelValue'])

const selectedTitle = ref('Mr.');

const emit = defineEmits();

watch(selectedTitle, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
