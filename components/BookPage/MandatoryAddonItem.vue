<style scoped>
.fee-card {
  background: white;
  border-radius: 8px;
	border: 1px solid #e5e7eb;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fee-title {
  font-weight: bold;
  color: #374151;
  font-size: 16px;
  margin: 0;
}

.fee-description {
  color: #6b7280;
  font-size: 14px;
  margin: 4px 0 0 0;
  font-weight: normal;
}

.fee-price {
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}

.fee-per-traveler {
  color: #6b7280;
  font-size: 14px;
  margin: 4px 0 0 0;
  font-weight: normal;
}

.red-asterisk {
  color: #ef4444;
  font-size: 12px;
  vertical-align: super;
  margin-left: 2px;
}

.font-interstate {
  font-family: 'Interstate' !important;
}
</style>

<template>
  <div class="fee-card">
    <div class="left-section">
      <div class="fee-title font-interstate">
        {{ detail.details }}<span class="red-asterisk">*</span>
      </div>
      <div class="fee-description font-interstate">
        
      </div>
    </div>
    <div class="right-section">
      <div class="fee-price font-interstate text-green-vibe">
        + {{ formatAsCurrency(detail.unitPrice, 'USD') }}
      </div>
      <div class="fee-per-traveler font-interstate">
        per Traveler
      </div>
    </div>
  </div>
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