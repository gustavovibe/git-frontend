<template>
    <div class="overflow-hidden mb-8 main-spacing" style="width: 85%;">
      <div class="grid">
        <div class="col-12 lg:col-9">
          <div class="card">
            <Breadcrumb :model="items" class="breadcrumb-custom">
              <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a :href="href" v-bind="props.action" @click="navigate">
                    <span :class="[item.icon, 'text-color']" />
                    <span class="text-green-vibe font-semibold">{{ item.label }}</span>
                  </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                  <span class="text-color font-semibold">{{ item.label }}</span>
                </a>
              </template>
            </Breadcrumb>
          </div>
          <div class="chat-wrapper">
            <ChatBot />
          </div>
        </div>      
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: 'auth',
  });
  import ChatBot from '~/components/ChatBot.vue';
  import Breadcrumb from 'primevue/breadcrumb';
  import { ref, onMounted } from 'vue';

	const windowMobile = ref(false);
	const checkMobile = () => {
		windowMobile.value = window.innerWidth <= 768;
	};
	onMounted(() => {
		checkMobile();
		window.addEventListener('resize', checkMobile);
	});
  
  const items = ref([
    { 
			label: windowMobile.value ? '' : 'Home',
    	icon: windowMobile.value ? 'pi pi-home' : ''
		},
    { label: 'Account' },
    { label: 'Inbox', route: '/inbox' }
  ]);
  </script>
  
  <style scoped>
  /* Estilos para breadcrumbs con padding */
  .breadcrumb-custom {
    padding-left: 16px !important;
  }
  
  .p-breadcrumb{
    padding: unset;
    border: none;
  }
  :deep(svg.p-icon){
    color: black!important;
  }
  :deep(.p-menuitem-link .text-color){
    color: black !important;;
  }
  .tour-img{
    height: 10rem;
    background-position: center;
    background-size: cover;
  }
  .trip-cards{
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card {
    width: 100%;
    margin: 10px;
  }
  .gradient{
    height: 10rem;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(to top, black 0%, transparent 18rem);
    opacity: 0.3;
    border-radius: 10px;
  }
  .people-number{
    right: 1rem;
  }
  .destination{
    top: 5rem;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .service-cards{
    flex-direction: row;
    flex-wrap: wrap;
  }
  .service-card{
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 1.3rem;
  }
  .past-trip{
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }
  
  /* Estilos para el chat */
  .chat-wrapper {
    width: 100%;
    height: 100%;
  }
  
  /* Sobreescritura de estilos del iframe */
  :deep(iframe) {
    width: 100% !important;
    height: 500px !important;
    margin-left: 0 !important;
    border: none;
    border-radius: 8px;
  }
  
  /* Media Queries */
  @media only screen and (max-width:767px){
    .main-spacing{
      width: 100% !important;
      padding: 0.5rem;
    }
  
    .grid {
      flex-direction: column;
    }
  
    #menu, .col-12.lg\:col-3, .col-12.lg\:col-9 {
      width: 100%;
      padding: 0;
    }
  
    :deep(iframe) {
      height: 400px !important;
      width: 100% !important;
      margin-left: 0 !important;
    }
  
    .card {
      margin: 10px 0;
    }
  
    /* Ajuste para breadcrumbs en móvil */
    .breadcrumb-custom {
      padding-left: 8px !important;
    }
  }
  
  @media only screen and (min-width: 768px) and (max-width: 1199px){
    .main-spacing{
      padding: 0.5rem 2rem;
    }
    .card {
      width: calc((100% / 2) - 20px);
      margin: 10px;
    }
    .service-card{
      width: calc((100% / 2) - 20px);
      margin: 10px;
    }
  }
  
  @media only screen and (min-width:1200px){
    .main-spacing{
      padding: 2rem 7rem;
    }
    .card {
      width: calc((100% / 3) - 20px);
      margin: 0 10px;
    }
    .service-card{
      width: calc((100% / 4) - 20px);
      margin: 0 10px;
    }
  }
  </style>