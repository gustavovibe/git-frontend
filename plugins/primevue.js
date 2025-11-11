import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import Dialog from 'primevue/dialog';
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(ConfirmationService);
    nuxtApp.vueApp.component('Dialog',Dialog);
    nuxtApp.vueApp.component('ConfirmDialog',ConfirmDialog);
    nuxtApp.vueApp.component('Toast',Toast);
});
