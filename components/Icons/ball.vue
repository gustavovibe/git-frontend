<template>
  <span class="flex align-items-start flex-grow" style="cursor: pointer;">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="10" :fill="active ? '#82CF45' : '#A0A0A0'" />
    </svg>
  </span>
</template>

<script setup>
const props = defineProps(['active'])
</script>