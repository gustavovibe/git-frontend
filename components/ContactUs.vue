<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal" >
    <div class="modal-content">
      <button @click="closeModal" class="modal-close-button">
        <span class="pi pi-times"></span>
      </button>

      <div class="container">
        <h1 style="color: #82CF45;">Contact Us</h1>
        <h4>Please let us know how we can help</h4>
        <Card class="card_style">
          <template #content>
            <div class="form-group">
              <label>Booking Reference</label>
              <InputText v-model="data_m.order" placeholder="Enter booking reference (if available)" class="input" size="large"/>
            </div>
            <div class="form-group">
              <label>Trip Link</label>
              <InputText v-model="data_m.link" placeholder="Enter trip link (if available)" class="input" size="large"/>
            </div>
            <div class="form-group">
              <label>Subject</label>
              <span v-if="submitted.value && !data_m.mail_type" class="error-message">Subject cannot be empty.</span>
              <Dropdown v-model="data_m.mail_type" :options="subject_list" optionLabel="text" optionValue="id" placeholder="Select an option" class="w-full md:w-56"/>
            </div>
            <div class="form-group">
              <label>Message</label>
              <Textarea v-model="data_m.message" placeholder="Enter your message" class="input" rows="4" cols="30"/>
              <span v-if="submitted.value && !data_m.message" class="error-message">Message cannot be empty.</span>
            </div>
          </template>
          <template #footer>
            <Button style="float: right; margin-bottom: 15px;" severity="success" @click="sendData" label="Submit" />
          </template>
        </Card>
        <Toast />
      </div>  
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Dropdown from 'primevue/dropdown';

export default defineComponent({
  name: 'ContactUs',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    InputText,
    Card,
    Textarea,
    Button,
    Toast,
    Dropdown
  },
  setup(props, { emit }) {
    const toast = useToast();
    const data_m = ref({
      order: '',
      link: '',
      mail_type: '',
      message: '',
      mail_from: ''
    });

    const subject_list = ref([
      { id: 1, text: 'Booking confirmation' },
      { id: 2, text: 'Booking cancellation' },
      { id: 3, text: 'Reminder' },
      { id: 4, text: 'Payment request' }
    ]);

    const submitted = ref(false);

    const closeModal = () => {
      emit('update:visible', false);
    };

    const sendData = async () => {
      submitted.value = true;
      data_m.value.mail_from = 'adam.g.e@outlook.com';

      const validations = [
        { field: 'subject', error: 'Subject cannot be empty.', isValid: data_m.value.mail_type !== '' },
        { field: 'message', error: 'Message cannot be empty.', isValid: data_m.value.message !== '' }
      ];

      const invalidValidation = validations.find(({ isValid }) => !isValid);
      if (invalidValidation) {
        toast.add({ severity: 'error', summary: 'Error', detail: invalidValidation.error, life: 3000 });
        return;
      }

      try {
        const response = await fetch(`${config.public.BACKEND_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data_m.value)
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const result = await response.json();
        toast.add({ severity: 'success', summary: 'Success', detail: 'Message sent successfully', life: 3000 });
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to send message', life: 3000 });
      }
    };

    return {
      data_m,
      sendData,
      submitted,
      subject_list,
      closeModal
    };
  }
});
</script>

<style scoped>
.card_style {
  align-content: center;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin: 50px auto; /* Centra el componente horizontalmente */
  max-width: 600px; /* Limita el ancho máximo del componente */
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  flex: 0 0 120px; /* Ancho del label */
  text-align: right;
  margin-right: 15px;
  font-weight: bold;
  color: black;
}

.form-group .input,
.form-group .textarea {
  flex: 1; /* Ocupa todo el espacio restante */
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px; /* Espacio arriba del mensaje de error */
}

.btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}

@media screen and (max-width: 768px) {
  .form-group label {
    flex: 1; /* Ancho completo en dispositivos pequeños */
    text-align: left;
    margin-right: 0;
    margin-bottom: 5px; /* Espacio entre labels y inputs */
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
  width: 35%;
  height: 68%;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
