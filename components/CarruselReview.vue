<template>
    <div class="partners-slider" style="max-width: 1240px; margin: 0 auto" ref="trustIndexContainer">
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const trustIndexContainer = ref(null);

onMounted(() => {
  const script = document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = 'https://cdn.trustindex.io/loader.js?d7e15ca2633984384b569471e4c';
  trustIndexContainer.value.appendChild(script);
});
</script>


<style>
.ti-widget{
	max-width: 100%;
}
.partners-slider {
  border-radius: 12px;
  border: 1px solid #82CF45;
  background: #F8FCF6;
  padding-top: 35px;
}

</style>