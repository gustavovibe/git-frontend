<template>
		<div>
			<template v-for="(traveler, index) in totalTravelers" :key="traveler.id" v-if="props.totalTravelers.length">
				<LeadTraveler v-model="passengers[index]" v-if="traveler.isLeadTraveler" :traveler="traveler" :index="index+1" />
				<AdultTraveler v-model="passengers[index]" v-else-if="traveler.type === 'adult'" :traveler="traveler" :index="index+1" />
				<ChildTraveler v-model="passengers[index]" v-else-if="traveler.type === 'child'" :traveler="traveler" :rangeAge="rangeAge" :index="index+1" />
			</template>
		</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  totalTravelers: Array,
  modelValue: Array,
  rangeAge: Object
});
console.log("rangeAge",props.rangeAge);

const emit = defineEmits(['update:modelValue']);

const passengers = ref([...props.modelValue]); 


watch(passengers, (newVal) => {
  emit('update:modelValue', newVal);
}, { deep: true });


watch(() => props.totalTravelers, (newVal) => {
  if (newVal.length > passengers.value.length) {
    for (let i = passengers.value.length; i < newVal.length; i++) {
      passengers.value[i] = {}; 
    }
  }
}, { immediate: true });

</script>