// plugins/currency.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('currency', (value) => {
    // Verificamos que el valor sea un número
    if (isNaN(value)) {
      return value;
    }
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  });

  nuxtApp.provide('currencyDecimal', (value) => {
    if (isNaN(value)) return '-'
    const ceiledValue = Math.ceil(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(ceiledValue) + ' USD'
  });
});
