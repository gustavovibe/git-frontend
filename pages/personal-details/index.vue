<template>
    <div
      class="overflow-hidden mb-8 main-spacing"
      :style="{ width: isMobile ? '100%' : '85%' }"
    >
      <div class="grid">  
        <div class="col-12 lg:col-9">
          <div class="card">
            <Breadcrumb :model="items">
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
          <PersonalDetails />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import Breadcrumb from 'primevue/breadcrumb';
  import PersonalDetails from "~/components/PersonalDetails.vue";
  
  
	const isMobile = ref(false);
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  const items = ref([
    { label: isMobile.value ? '' : 'Home',
    icon: isMobile.value ? 'pi pi-home' : '' },
    { label: 'Account' },
    { label: 'Account Settings', route: '/personal-details' }
  ]);
  
  
  
  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
  
  </script>
  
  <style scoped>
  :deep(li#pv_id_8_0){
    background-color: #82cf45;
  }
  :deep(li#pv_id_8_0 span){
    color: #fff;
  }
  .p-breadcrumb{
    padding: unset;
    border: none;
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
  @media only screen and (max-width: 767px) {
    .main-spacing {
      padding: 0.5rem 2rem;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main-spacing {
      padding: 0.5rem 2rem;
    }
    .card {
      width: calc((100% / 2) - 20px);
      margin: 10px;
    }
    .service-card {
      width: calc((100% / 2) - 20px);
      margin: 10px;
    }
  }
  @media only screen and (min-width: 1200px) {
    .main-spacing {
      padding: 2rem 7rem;
    }
    .card {
      margin: 0 10px;
    }
    .service-card {
      width: calc((100% / 4) - 20px);
      margin: 0 10px;
    }
  }
  </style>
  