<template>
	<div class="overflow-hidden mb-8 main-spacing" style="max-width:1240px; padding-left: 0px; padding-right: 0px;">
				<div class="grid" v-if="userId">
					<div class="col-12 lg:col-9">
						<ProgressBar v-if="visible" mode="indeterminate" style="height: 6px"></ProgressBar>
						<div v-if="!visible_message" style="display: inline-flex;">
							<WishlistIndex  />
							<WishlistContent @loading="handleLoading"  @message="messageVisible"/>
						</div>
						<div v-if="visible_message && userId">
									<WishlistNoitems />
						</div>
					</div>
				</div>
				<div v-if="!userId">
					<WishlistNologin />
				</div>
	</div>
</template>
<style scoped>
@media only screen and (max-width: 767px) {
  .main-spacing {
    padding: 0.5rem 2rem;
    margin-top: 5rem;
  }
}
</style>

<script setup>
/* 	definePageMeta({
	middleware: 'auth',
	}); */


import WishlistContent from '~/components/WishlistContent.vue';
import WishlistIndex from "~/components/WishlistIndex.vue";
import ProgressBar from 'primevue/progressbar';
import WishlistNoitems from '~/components/WishlistNoitems.vue';
import WishlistNologin from '~/components/WishlistNologin.vue';

const visible= ref(true);
const visible_message= ref(false);
const userId = ref(null);

function handleLoading(newValue){
	visible.value=newValue;
}

function messageVisible(newValue){
	console.log('valor que recibio',newValue);
	visible_message.value=newValue;
}
onMounted(async () => {
  userId.value = localStorage.getItem('user_id');
 		
});
</script>
