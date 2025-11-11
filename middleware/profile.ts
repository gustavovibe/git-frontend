export default defineNuxtRouteMiddleware(() => {    
    if (process.client) {
        const profileId = localStorage.getItem('profile_id');
        
        console.log('Middleware ejecutado en el cliente profile', profileId);
    
        if (profileId !== '1') {
          return navigateTo('/');
        }
      }
  });
  