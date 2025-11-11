<template>
  <div>
    <div class="flex justify-content-center" style="width: 100%">
      <IconsBall @click="handleClick(firstStep)" :active="isStepOneComputed" :class="chooseDepartureDateComputed"/>
      <IconsLine :active="isStepTwoComputed" />
      <IconsBall @click="handleClick(secondStep)" :active="isStepTwoComputed" :class="personalizedComputed"/>
      <IconsLine :active="isStepThreeComputed" />
      <IconsBall @click="handleClick(thirdStep)" :active="isStepThreeComputed" :class="confirmBookingComputed"/>
    </div>
    <div class="grid justify-content-between">
      <div class="col-4" :class="chooseDepartureDateComputed">
        <span @click="handleClick(firstStep)">Choose departure date</span>
      </div>
      <div class="col-4 text-center" :class="personalizedComputed">
        <span @click="handleClick(secondStep)">Personalize</span>
      </div>
      <div class="col-4 text-right" :class="confirmBookingComputed">
        <span @click="handleClick(thirdStep)">Confirm Booking</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const localActiveStep = ref(0)
const firstStep = ref(0)
const secondStep = ref(1)
const thirdStep = ref(2)
const config = useRuntimeConfig();

const props = defineProps(['activeStep', 'goTourPage'])

onMounted(async () => {
  nextTick(() => {
    localActiveStep.value = props.activeStep
  });
});

const isStepOneComputed = computed(() => {
  return localActiveStep.value === 0 || localActiveStep.value === 1 || localActiveStep.value === 2
})

const isStepTwoComputed = computed(() => {
  return localActiveStep.value === 1 || localActiveStep.value === 2
})

const isStepThreeComputed = computed(() => {
  return localActiveStep.value === 2
})

const chooseDepartureDateComputed = computed(() => {
  return isStepOneComputed.value ? 'text-color-green' : ''
})

const personalizedComputed = computed(() => {
  if(isStepOneComputed.value){
    return 'text-color-gray'
  }
  return isStepTwoComputed.value ? 'text-color-green' : ''
})

const confirmBookingComputed = computed(() => {
  if(isStepOneComputed.value || isStepTwoComputed.value){
    return 'text-color-gray'
  }
  return isStepThreeComputed.value ? 'text-color-green' : ''
})

async function goFirstStep() {
  const comesFrom = localActiveStep.value

  if (comesFrom === secondStep.value) {
    localActiveStep.value = firstStep.value
    props.goTourPage()
    return
  }

  if (comesFrom === thirdStep.value) {
    localActiveStep.value = firstStep.value
    return
  }

}

async function goSecondStep() {
  const comesFrom = localActiveStep.value
  if (comesFrom === firstStep.value) {
    return
  }

  if (comesFrom === thirdStep.value) {
    localActiveStep.value = secondStep.value
    window.location.href = props.firstURL ?? `${config.public.FRONTEND_URL}/book`
    return
  }

}

async function goThirdStep() {
  const comesFrom = localActiveStep.value

  if (comesFrom === firstStep.value) {
    return
  }

  if (comesFrom === secondStep.value) {
    // localActiveStep.value = thirdStep.value
    return
  }

}

async function handleClick(step) {
  if(localActiveStep.value <= step){
    return;
  }
  switch (step) {
    case firstStep.value:
      await goFirstStep()
      break;

    case secondStep.value:
      await goSecondStep()
      break;

    case thirdStep.value:
      await goThirdStep()
      break;

    default:
      localActiveStep.value = firstStep.value
      break;
  }
}

</script>

<style scoped>
.text-color-green {
  color: #82CF45;
  cursor: pointer;
}
.text-color-gray {
  color: #4b5563;
  cursor: not-allowed !important;
}
</style>