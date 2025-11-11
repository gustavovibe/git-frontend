<template>
  <div class="container">
    <div class="main-content">
    </div>
  </div>

  <div class="flex-container">
    <div class="iframe-container">
      <iframe
        src="https://chat.cxgenie.ai"
        width="60%"
        height="600px"
        style="border: none;"
        allow="fullscreen"
      ></iframe>
    </div>
  <!--   <SugestAdventure :travelD="travelData" /> -->
  </div>
</template>

<script setup>
import Breadcrumb from 'primevue/breadcrumb';
import SugestAdventure from './SugestAdventure.vue';
const items = [
  { label: 'Home', url: '/',class: 'underline' },
  { label: 'Account', url: '/admin',class: 'underline' },
  { label: 'Inbox', url: '/admin/reports',class: 'last-item'}
];
const travelData = ref({
	adults: 2,
	kids: 2,
	infants: 0,
	operator: "TruTravels",
	starts: "18/01/2024",
	ends: "18/01/2024",
	qualification: 4.8,
	reviews: 54,
});
</script>

<style scoped>
svg {
	margin-right: 15px;
}
a {
		color: #82CF45;
}

.underline a {
  text-decoration: underline;
  text-decoration-color: black;
  color: inherit;
}

.last-item span {
  color: #82CF45; 
  font-weight: bold;
}

.container {
  width: 100%;
  margin: 0 auto;
}

.flex-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.iframe-container {
  flex: 1;
  padding-right: 1rem;
  margin-bottom: 1rem;
}

iframe {
  width: 47%;
	margin-left: 25%;
}


@media (max-width: 768px) {
  .iframe-container {
    width: 100%;
    padding-right: 0;
  }

  .flex-container {
    flex-direction: column; 
  }

  iframe {
    height: 400px; 
  }
}
</style>
