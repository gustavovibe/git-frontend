<template>
  <div class="container wishlist-titles-container">
	<div>
    <Breadcrumb :model="items" style="border-color: white;" class="breadcrumb-wishlist" >
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
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
    <div
      class="flex flex-column font-semibold wishlist-titles pl-3 lg:pl-0"
    >
      <p class="sm-text-left">Duration</p>
      <p class="back-green-vibe-light sm-text-left">Rating &amp Reviews</p>
	  	<!-- <p>Operator</p> -->
      <p class="back-green-vibe-light sm-text-left">Age Range</p>
      <p class="sm-text-left">Start City</p>
      <p class="back-green-vibe-light sm-text-left">End City</p>
      <p class="sm-text-left">Destinations</p>
      <div
        class="flex flex-column font-semibold"
      >
        <p class="back-green-vibe-light sm-text-left">Max Group Size</p>
				<p class="sm-text-left">Guide Type</p>
      </div>
    </div>
  </div>
</template>
<style>

@media only screen and (max-width:768px) {
	.sm-text-left{
		text-align: left !important;
	}
	.wishlist-titles-container{
		width: 11rem!important;
	}
	.breadcrumb-wishlist{
		position: absolute;
	}
	.wishlist-titles{
		margin-top: 27.75rem !important;
	}
}

.wishlist-titles{
	margin-top: 20.75rem;
}
</style>
<script setup>
import Breadcrumb from "primevue/breadcrumb";
import {ref, onMounted} from "vue";

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
    icon: windowMobile.value ? 'pi pi-home' : '',
    route: '/'
  },
  { label: "Account" },
  { label: "Wishlist", route: "/wishlist" },
]);
</script>
