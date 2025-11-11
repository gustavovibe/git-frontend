<template>
	<div>
    <img style="width: 100%;" src="/public/filter-icons/Background.png" alt="">
	</div>
	
	<div style="display: inline-flex; width: 100%;">
		<div  style="width: 70%;">
			<!-- <Breadcrumb :model="items"> 
				<template #item="{ item, props }">
					<router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
						<a :href="href" v-bind="props.action" @click="navigate">
							<span :style="{ color: item.label === 'Home' ? '#808080' : '#82cf45' }" class="font-semibold">{{ item.label }}</span>
						</a>
					</router-link>
				</template>
			</Breadcrumb> -->
			<ContactUsv2 />
		</div>
		<CompanyAddress style="width: 50%; margin-right: 10%;" />
	</div>

	<!-- <CarruselReview /> -->
	<br>
	<br>
</template>

<script setup>
import ContactUsv2 from '~/components/ContactUsv2.vue';
import CompanyAddress from '~/components/CompanyAddress.vue';
import CarruselReview from '~/components/CarruselReview.vue';


const items = ref([
	{route:'/',label:'Home'},
	{route:'/contact-us', label:'Contact Us'},
])

</script>

<style>
	.index #im1{
		width: 25%;
		height: auto;
	}
	.index #im2{
		width: 18%;
		height: auto;
	}


</style>