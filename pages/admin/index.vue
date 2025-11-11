<template>
    <div class="overflow-hidden mb-8 main-spacing-cms">
        <div class="grid">
            <div class="col-12 lg:col-2">
                <PanelMenuCMS />
            </div>
            <div class="col-12 lg:col-10">
							<Breadcrumb :model="items" style="border-color: white;">
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
								<ChatBot />
            </div>
        </div>
    </div>
</template>

<script setup>
	definePageMeta({
	middleware: ['auth','profile'],
	});
import { ref, watch, onMounted } from "vue";
import PanelMenuCMS from "~/components/PanelMenuCMS.vue";
import ChatBot from "~/components/ChatBot.vue";
import Breadcrumb from "primevue/breadcrumb";

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

]);
</script>

<style scoped>
.placeholder{}
</style>

