<template>
	<div class="overflow-hidden mb-8 main-spacing">
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
					</div>
			</div>
	</div>
</template>

<script setup>

</script>