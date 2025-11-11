// plugins/cxgenie.client.js
export default defineNuxtPlugin(() => {
  return {
    provide: {
      cxgenie: {
        open: () => window.CXGenie?.open(),
        close: () => window.CXGenie?.close(),
        show: () => window.CXGenie?.show(),
        hide: () => window.CXGenie?.hide(),
      }
    }
  };
});