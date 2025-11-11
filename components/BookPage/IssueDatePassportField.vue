<template>
	<div class="field col-12 md:col-6">
	  <label><b>Passport Issue Date</b> <span class="text-red-600" v-if="!selectedDate">*</span></label>
	  <div class="flex">
		<div class="col-12">
		  <Calendar
      v-bind="attrs" v-model="selectedDate" :pt="calendarClasses" showButtonBar 	showIcon dateFormat="M d, yy" :maxDate="today"/>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import Calendar from 'primevue/calendar';
  import dayjs from 'dayjs';
  
  // ✅ Recibimos initialDate desde el padre
  const props = defineProps({
	modelValue: String,
	initialDate: String || null,
	today: Date
  });
  
const attrs = useAttrs()
  const emit = defineEmits();
  
  const selectedDate = ref(null);
  
  const calendarClasses = ref({
	root: {
	  class: 'text-base font-light text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full'
	},
	input: {
	  class: 'text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border  appearance-none outline-none focus:border-primary w-full'
	}
  });
  
  // ✅ Formatear fecha para enviar al padre
  function formatDate(date) {
	const parsedDate = dayjs(date);
	return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : '';
  }
  
  // ✅ Emitimos fecha formateada cuando cambia
  watch(selectedDate, (newValue) => {
	emit('update:modelValue', formatDate(newValue));
  });
  
  // ✅ Si recibimos una fecha inicial desde el padre, la aplicamos al calendario
  watch(
	() => props.initialDate,
	(newVal) => {
	  if (newVal) {
		const parsed = dayjs(newVal);
		if (parsed.isValid()) {
		  selectedDate.value = parsed.toDate();
		}
	  }
	},
	{ immediate: true }
  );
  </script>


<style scoped>
	.input-error-sub {
		border: 1px solid red !important;
		background-color: #ffe6e6;
	}
</style>
  