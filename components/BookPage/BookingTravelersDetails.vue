<template>
  <template v-for="(traveler, index) in totalTravelers" :key="traveler.id" v-if="totalTravelers.length">
    <BookPageLeadTravelerDetail v-model="passengers[index]" v-if="traveler.isLeadTraveler" :traveler="traveler" />
    <BookPageAdultTravelerDetail v-model="passengers[index]" v-else-if="traveler.type === 'adult'" :traveler="traveler" />
    <BookPageChildTravelerDetail v-model="passengers[index]" v-else-if="traveler.type === 'child'" :traveler="traveler" />
  </template>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['totalTravelers', 'modelValue']);
const emit = defineEmits();

console.log("totalTravelers",props.totalTravelers);	
	
const passengers = ref([]);


watch(passengers, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

</script>
