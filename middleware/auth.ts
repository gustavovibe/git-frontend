export default defineNuxtRouteMiddleware(() => {
    if (process.client) {
      const accessToken = localStorage.getItem('access_token');
      console.log('Middleware ejecutado en el cliente', accessToken);
  
      if (!accessToken) {
        return navigateTo('/');
      }
    }
  });