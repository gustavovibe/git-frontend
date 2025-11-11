<template>
  <div class="flex align-items-center">
    <svg width="100%" height="4" viewBox="0 0 1000 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0.5" width="100%" height="10" :fill="active ? '#82CF45' : '#A0A0A0'" />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps(['active'])
</script>