<template>
	<div class="field col-12 md:col-12">
	  <label class="font-semibold">Gender <span class="text-red-600" v-if="!valueSelected">*</span></label>
	  <div class="flex align-items-center gap-4 mt-2" v-bind="attrs">
		<div class="flex align-items-center gap-2">
		  <RadioButton 
			inputId="gender-male" 
			name="gender" 
			value="male" 
			v-model="valueSelected" 
			:class="radioStyles" 
		  />
		  <label for="gender-male" class="cursor-pointer">Male</label>
		</div>
		<div class="flex align-items-center gap-2">
		  <RadioButton 
			inputId="gender-female" 
			name="gender" 
			value="female" 
			v-model="valueSelected" 
			:class="radioStyles" 
		  />
		  <label for="gender-female" class="cursor-pointer">Female</label>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import RadioButton from 'primevue/radiobutton';
  
  const props = defineProps({
	modelValue: String,
	initialGender: String || null
  });
  
  const emit = defineEmits();
  
  const valueSelected = ref('');
  
  watch(valueSelected, (newVal) => {
	emit('update:modelValue', newVal);
  });
  
  watch(
	() => props.initialGender,
	(newVal) => {
	  if (newVal) valueSelected.value = newVal;
	},
	{ immediate: true }
  );
  
  // 🎨 Estilos personalizados para igualar la imagen
  const radioStyles = {
  root: ({ props, context }) => ({
    class: [
      'inline-flex justify-center items-center w-6 h-6  rounded-full transition-all duration-200',
      context.checked ? 'border-green-400' : 'border-gray-300'
    ]
  }),
  input: {
    class: 'hidden' // Ocultamos el input nativo
  },
  icon: ({ context }) => ({
    class: [
      'w-7 h-4 rounded-full block',
      context.checked ? 'bg-white  border-green-400' : 'bg-transparent'
    ]
  })
};
  </script>


<style scoped>
	.input-error-sub {
		border: 1px solid red !important;
		background-color: #ffe6e6;
	}
</style>
  