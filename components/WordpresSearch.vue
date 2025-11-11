<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const searchQuery = ref('');

const isButtonDisabled = computed(() => searchQuery.value.trim().length === 0);

const performSearch = () => {
  const url = `https://vibeadventures.com/?s=${encodeURIComponent(searchQuery.value)}&post_type=product&dgwt_wcas=1`;
  window.open(url, '_blank');
};
</script>

<template>
  <div class="flex gap-2">
    <InputText v-model="searchQuery" placeholder="Search..." />
    <Button label="Search" :disabled="isButtonDisabled" @click="performSearch" />
  </div>
</template>