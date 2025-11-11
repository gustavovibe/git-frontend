<template>
<section id="includes" class="content">
    <h3>Included</h3>
    <div class="lg-highlights inclusionss">
        <Accordion :activeIndex="0">
			<AccordionTab>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?" alt="Others" />
                        <span class="font-bold white-space-nowrap">Flights</span>
                    </span>
                </template>
                <div class="inclusions-desc">Return Flights</div>
            </AccordionTab>
            <AccordionTab>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?" alt="Others" />
                        <span class="font-bold white-space-nowrap">Accommodation</span>
                    </span>
                </template>
                <div class="inclusions-desc" v-html="tour.accommodationDesc"></div>
            </AccordionTab>
            <AccordionTab>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?" alt="Others" />
                        <span class="font-bold white-space-nowrap">Meals</span>
                    </span>
                </template>
                <div class="inclusions-desc" v-html="tour.mealsDesc"></div>
            </AccordionTab>
            <AccordionTab>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?" alt="Others" />
                        <span class="font-bold white-space-nowrap">Transport</span>
                    </span>
                </template>
                <div class="inclusions-desc" v-html="tour.transportDesc"></div>
            </AccordionTab>
            <AccordionTab>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?" alt="Others" />
                        <span class="font-bold white-space-nowrap">Guide</span>
                    </span>
                </template>
                <div class="inclusions-desc" v-html="tour.guideDesc"></div>
            </AccordionTab>
            <AccordionTab>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?" alt="Others" />
                        <span class="font-bold white-space-nowrap">Others</span>
                    </span>
                </template>
                <div class="inclusions-desc" v-html="tour.othersDesc"></div>
            </AccordionTab>
        </Accordion>
    </div>
</section>
<hr class="tour-hr" />
<div class="content">
    <h3>Not Included</h3>
	<Accordion :activeIndex="0">
            <AccordionTab v-if="tour?.insuranceDesc">
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="~/assets/icons/exclussion.svg" />
                        <span class="font-bold white-space-nowrap">Insurance</span>
                    </span>
                </template>
                <div class="exclusions-desc" v-html="tour?.insuranceDesc"></div>
            </AccordionTab>
		    <AccordionTab v-if="tour?.OptionalDesc">
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="~/assets/icons/exclussion.svg" />
                        <span class="font-bold white-space-nowrap">Insurance</span>
                    </span>
                </template>
                <div class="exclusions-desc" v-html="tour?.OptionalDesc"></div>
            </AccordionTab>
		    <AccordionTab v-if="tour?.ethersDesc">
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <img src="~/assets/icons/exclussion.svg" />
                        <span class="font-bold white-space-nowrap">Others</span>
                    </span>
                </template>
                <div class="exclusions-desc" v-html="tour?.ethersDesc"></div>
            </AccordionTab>
		</Accordion>
</div>
</template>
<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';	
const props = defineProps(['tour']);

console.log("tour.value on included component ",props.tour);	
	
const tour = ref([]);
tour.value = props.tour;
	
const accordionTabPToptions = ref({
  root: {
    class: 'mb-0',
  },
  headerAction: {
    class: 'pl-3 pr-2 justify-content-center background_green py-0'
  },
  content: {
    class: 'pl-2 pr-2 pt-0 background_color_green'
  },
})
</script>