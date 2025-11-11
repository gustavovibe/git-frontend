<template>
  <div class="m-1 flex items-center">
    <div>
      <span v-if="ratings && reviewsCount" class="font-bold">{{ ratings.toFixed(1) }}&nbsp;</span>
      <span v-else>&nbsp;</span>
      <i v-if="reviewsCount > 0" class="pi pi-star-fill text-yellow-500 mr-1"></i>
    </div>
    <span v-if="reviewsCount">
      (<span class="text-primary">{{ reviewsCount }} reviews</span>)
    </span>
  </div>
</template>

<script setup>
defineProps({
  ratings: {
    type: Number,
    required: true
  },
  reviewsCount: {
    type: Number,
    default: 0
  }
})
</script>
