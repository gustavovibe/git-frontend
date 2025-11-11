<template>
  <div class="flex justify-content-between my-2 align-items-center">
    <div class="col-5 p-0">
      <span>Flight </span>
      <span class="text-green-vibe font-semibold"> {{ formatAsCurrency(detail.unitPrice, 'USD')
        }}</span>
      <span> USD</span>
    </div>
    <div class="col-3 p-0">
      <span>x </span>
      <span class="text-green-vibe font-semibold">{{ detail.passengers }}</span>&nbsp;
      <span>people</span>
    </div>
    <div class="col-4 p-0 text-right">
      <span>{{ formatAsCurrency(detail.totalPrice, 'USD') }} USD</span>
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