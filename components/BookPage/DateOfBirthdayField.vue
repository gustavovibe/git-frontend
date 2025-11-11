<template>
	<div class="field col-12 md:col-6">
	  <label><b>Date of birth</b> <i class="pi pi-info-circle" v-if="isChild && ageRange" v-tooltip.top="`The age range is ${ageRange.strict.min_age} to 17 years.`"></i><span class="text-red-600" v-if="!selectedDate">*</span></label>
	  <div class="flex">
		<div class="col-12">
		  <Calendar 
      v-bind="attrs"
			v-model="selectedDate" 
			:pt="calendarClasses" 
      dateFormat="M d, yy" :maxDate="maxBirthDate" :minDate="minBirthDate"
			showButtonBar 
			showIcon 
			@date-select="handleDateSelect($event)" 
		  />
		</div>
	  </div>
	  <small v-if="!isChild && travelerProp?.type !== 'child'" class="text-gray-600">
		The Lead Traveler should be 18+ years old.
	  </small>
    <Toast />
	</div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import Calendar from 'primevue/calendar';
  import dayjs from 'dayjs';
  import { useToast } from 'primevue/usetoast';
  
  const props = defineProps({
	travelerProp: Object,
	modelValue: String,
	initialDate: String || null,
	isChild: Boolean,
  maxBirthDate: Date, 
  minBirthDate: Date || null, 
  ageRange: Object || null
  });

const attrs = useAttrs()
  
  const emit = defineEmits();
  const toast = useToast();
  
  const lead = ref(props.travelerProp?.isLeadTraveler ?? false);
  const selectedDate = ref(null);
  
  const calendarClasses = ref({
  root: {
    class: 'w-full'
  },
  input: {
    class: 'text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border  appearance-none outline-none focus:border-primary w-full'
  },
  dropdownButton: {
    class: 'bg-green-400 border-none text-white px-3 py-2 border-round-right'
  },
  trigger: {
    class: 'p-0 m-0 border-0 bg-green-400 text-white border-round-right'
  },
  panel: {
    class: 'z-50' // para asegurar que el panel de fechas no se esconda detrás de otros elementos
  }
});

  
  function calculateAge(dateOfBirth) {
	const today = dayjs();
	const birthDate = dayjs(dateOfBirth);
	return today.diff(birthDate, 'year');
  }
  
  function handleDateSelect(event) {
  const age = calculateAge(event);

  if (props.isChild) {
    selectedDate.value = event; 
    return;
  }

  let ageMin = 0;

if (lead.value) {
  ageMin = 18;
} else if (props.travelerProp?.priceCategory?.age_min != null) {
  ageMin = props.travelerProp.priceCategory.age_min;
} else {
  ageMin = 18; // fallback si no viene ninguna config (adulto por defecto)
}

  const ageMax = props?.travelerProp?.priceCategory?.age_max ?? 150;
  console.log("Edad:", age, "Min:", ageMin, "Max:", ageMax);
  console.log('event:', event, 'typeof:', typeof event);
  if (age < ageMin || age > ageMax) {
    selectedDate.value = null;
    toast.add({ 
      severity: 'error', 
      summary: 'Error!!', 
      detail: `Age ${age} is outside the allowed range of ${ageMin}-${ageMax}.`, 
      life: 8000 
    });
    return;
  }
  selectedDate.value = event;
}

  
  function formatDate(date) {
	const parsedDate = dayjs(date);
	return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : '';
  }
  
  watch(selectedDate, (newValue) => {
	if (!newValue) {
	  emit('update:modelValue', '');
	  return;
	}
	emit('update:modelValue', formatDate(newValue));
  });
  
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
  