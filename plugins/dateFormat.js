// plugins/dateFormat.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dateFormat', (timestamp) => {
    const date = new Date(timestamp * 1000); // Convertimos de segundos a milisegundos

    // Obtenemos la fecha en el formato deseado
    const formattedDate = date.toLocaleDateString("es-MX", {
      day: '2-digit',
      month: 'short', // Esto mostrará el mes en formato abreviado, e.g., "May"
      year: 'numeric',
    });

    // Obtenemos la hora en el formato de 12 horas con a.m./p.m.
    const formattedTime = date.toLocaleTimeString("es-MX", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  });
});
