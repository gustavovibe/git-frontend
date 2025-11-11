<style scoped>
.red {
  background-color: red;
}
.border-green-vibe{
  border: 2px solid #82cf45;
  padding: 10px;
  border-radius: 10px;
}
</style>

<template>
  <div class="flex justify-content-between my-2 align-items-center">
    <div class="" v-tooltip.top="'Optional Extra'">
      <span>{{ detail.details }} </span>&nbsp; -  <span class="text-green-vibe font-semibold">{{ detail.passengers }}</span>
      <span> people</span>
    </div>
  </div>
  <hr class="surface-300 my-2" style="height: 1px; border: none" />
</template>

<script setup>
//@ts-nocheck
const props = defineProps(['detail'])

function formatAsCurrency(price, currency) {
  let number = Math.ceil(price); // Remove the extra dot before Math.ceil
  if (!number) {
    return "-";
  }
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // No decimals
    maximumFractionDigits: 0, // No decimals
  });
}

</script>