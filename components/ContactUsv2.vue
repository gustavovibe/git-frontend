<template>
    <div class="container canaro-font">
      <h2 class="text-3xl">Online <span class="text-green-vibe">Form</span></h2>
      <Card class="card_style">
        <template #content>
           <p style="text-align: center; color: black;">
              Have questions before booking?
            </p>
            <p style="text-align: center; color: black;">
              Just send your message below, and we will get back to you.
            </p>
            <div style="padding: 30px;">
            <!-- NAME SECTION -->
            <div class="p-fluid grid pb-5 pt-5">
              <div class="col-12 md:col-2 flex align-items-center">
                <b>Your name: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="data_m.name" placeholder="First name" :invalid="errorsForm.name"/>
                </div>
              </div>
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="data_m.last_name" placeholder="Last name" :invalid="errorsForm.last_name"/>
                </div>
              </div>
            </div>
            <!-- END NAME SECTION -->
            <!-- EMAIL SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center">
                <b>Your email: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="data_m.email" placeholder="Email address" :invalid="errorsForm.email"/>
                </div>
              </div>
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="confirm_email" placeholder="Confirm email address" :invalid="errorsForm.confirm_email"/>
                </div>
              </div>
            </div>
            <!-- END EMAIL SECTION -->
            <!-- TOPIC SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center">
                <b>Topic: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <!-- <Dropdown v-model="data_m.topic" :options="groupedTopics"  optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Select the topic" class="w-full md:w-56"/> -->

                  <Dropdown v-model="data_m.topic" :options="groupedTopics" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Select the topic" :invalid="errorsForm.topic">
                    <template #optiongroup="slotProps" >
                        <div class="flex align-items-center">
                            <b class="text-gray-500">{{ slotProps.option.label }}</b>
                        </div>
                    </template>

                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div style="margin-left:15px;">{{ slotProps.option.label }}</div>
                        </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <!-- END TOPIC SECTION -->

            <!-- BOOKING SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center">
                <b>Booking #:</b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <InputText v-model="data_m.booking" placeholder="Enter booking # (optional)" />
                </div>
              </div>
            </div>
            <!-- END BOOKING SECTION -->

            <!-- BOOKING SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center">
                <b>Adventure Link:</b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <InputText v-model="data_m.link" placeholder="Enter trip (if available)"/>
                </div>
              </div>
            </div>
            <!-- END BOOKING SECTION -->

            <!-- MESSAGE SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center">
                <b>Message: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <Textarea v-model="data_m.message" placeholder="Enter your message" rows="5" :invalid="errorsForm.message"/>
                </div>
              </div>
            </div>
            <!-- END MESSAGE SECTION -->
            </div>
            
          <!-- <div class="form-group">
            <label>Full Name <a v-if="!data_m.name" style="color:red" >*</a> </label>
            <InputText v-model="data_m.name" placeholder="First name"  class="input"  />
            <span style="width: 5%; text-align: center;">	<a v-if="!data_m.last" style="color:red" >*</a></span>			
            <InputText v-model="data_m.last" placeholder="Last name" class="input"  />
          </div>
          <div class="form-group">
            <label>Email Address <a v-if="!data_m.email" style="color:red" >*</a> </label>
            <InputText v-model="data_m.email" placeholder="Email address" class="input" />
            <span style="width: 5%;text-align: center;"><a v-if="email_flag" style="color:red" >*</a></span>
            <InputText  v-model="confirm_email" placeholder="Confirm email address" class="input" />
          </div>
          <div class="form-group">
            <label>Topic 	<a v-if="!data_m.topic" style="color:red" >*</a></label>
            <Dropdown v-model="data_m.topic" :options="option_list"  optionLabel="label" optionValue="code" optionGroupLabel="label" optionGroupChildren="options" placeholder="Select the topic" class="w-full md:w-56"/>
          </div>
          <div class="form-group">
            <label>Booking #</label>
            <InputText v-model="data_m.booking" placeholder="Enter booking (if available)" class="input"/>
          </div>
          <div class="form-group">
            <label>Adventure Link</label>
            <InputText v-model="data_m.link" placeholder="Enter trip (if available)" class="input"/>
          </div>
          <div class="form-group">
            <label>Message <a v-if="!data_m.message" style="color:red" >*</a></label>
            <Textarea v-model="data_m.message" placeholder="Enter your message" class="input" rows="4" cols="30"/>
          </div> -->
        </template>
        <template #footer>
          <!-- FOOTER SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 flex justify-content-between align-items-center">
                <div class="flex align-items-center">
                  <Checkbox v-model="checked" :binary="true"/>&nbsp;
                  <span>
                    By proceeding, you accept our
                    <!-- <span class="text-green-vibe">Terms of Use</span> and -->
                    <a class="text-green-vibe" href="https://vibeadventures.com/privacy-policy/" target="_blank">Data Policy</a>.
                  </span>
                </div>

                <Button class="w-auto" label="Send" @click="Send" :loading="loading" />
              </div>
            </div>
          <!-- END FOOTER SECTION -->
        
          <!-- <div style="display: inline-flex; align-items: center; justify-content: space-between;  width: 100%;" >
            <p class="interstate-font">
              <Checkbox v-model="checked" :binary="true" /> 
              By proceding, you accept our <a href="https://vibeadventures.com/booking-terms-conditions/" target="_blank" rel="noopener"
           class="green">Terms of Use</a> & <a href="https://vibeadventures.com/privacy-policy-2/" target="_blank" rel="noopener"
           class="green">Data Policy</a>
            </p>
          
            <Button 
              :disabled="!checked" 
              style="margin-bottom: 15px;" 
              class="back-green-vibe"  
              label="Send" 
              @click="Send" 
            />

        </div> -->
          
        </template>
      </Card>
    </div>  
    <Toast />
  </template>
  
  
  <script setup>
  import { ref,onMounted , watch  } from 'vue';
  import InputText from 'primevue/inputtext';
  import Card from 'primevue/card';
  import Textarea from 'primevue/textarea';
  import Button from 'primevue/button';
  import Dropdown from 'primevue/dropdown';
  import Checkbox from 'primevue/checkbox';
  import { UsersStore } from "~/store/usersStore";
  import { generalFunctions } from '#imports';
  import Toast from 'primevue/toast';	
import { tourStore } from "~/store/tourStore";
  import { useToast } from "primevue/usetoast";

  const tour_Store= tourStore();
  const userStore = UsersStore();
  const generalFunction= generalFunctions();
  const confirm_email=ref('');	
  const email_flag=ref(true);
  const toast = useToast();	
  const data_m= ref({
    name:'',
    last_name:'',
    email:'',
    topic:'',
    booking:'',
    link:'',
    message:'',
    captchaToken: null
	});
  const config = useRuntimeConfig();
  const url = ref(config.public.BACKEND_URL);
 /*  const url = ref('http://127.0.0.1:8000'); */
  const data_c= ref({});
  
  const groupedTopics = ref([
      {
          label: 'Pre-booking inquiries',
          items: [
              { label: 'Itinerary & Inclusions', value: 'Pre-booking inquiries|Itinerary & Inclusions' },
              { label: 'Flights', value: 'Pre-booking inquiries|Flights' },
              { label: 'Payment', value: 'Pre-booking inquiries|Payment' },
              { label: 'Other', value: 'Pre-booking inquiries|Munich' }
          ]
      },
      {
          label: 'Bookings',
          items: [
              { label: 'Request More Information About the Trip', value: 'Bookings|Request More Information About the Trip' },
              { label: 'Book Extra Services (Accommodation, Insurance, Activities)', value: 'Bookings|Book Extra Services (Accommodation, Insurance, Activities)' },
              { label: 'Change or Modify My Booking', value: 'Bookings|Change or Modify My Booking' },
              { label: 'Cancel My Booking', value: 'Bookings|Cancel My Booking' },
              { label: 'Other', value: 'Bookings|Other' }
          ]
      },
      {
          label: 'On or after the trip',
          items: [
              { label: 'I want to provide feedback', value: 'On or after the trip|I want to provide feedback' },
              { label: 'I need help', value: 'On or after the trip|I need help' },
              { label: 'Other', value: 'On or after the trip|Other' },
          ]
      },
      {
          label: 'Other',
          items: [
              { label: 'Cooperation', value: 'Other|Cooperation' },
              { label: 'Media', value: 'Other|Media' },
              { label: 'Work with us', value: 'Other|Work with us' },
              { label: 'Other', value: 'Other|Other' }
          ]
      }
  ]);

  const checked = ref(false);
  const siteKey = '6Lfoj4sqAAAAAHLT71BIUo5OwjQOU-nYfcKkHdqr';
  const captchaResponse = ref(null);


const reset=()=>{
	data_m.value={
	name:'',
	last:'',
	email:'',
	topic:'',
	booking:'',
	link:'',
	message:'',
  captchaToken: null
	}
	confirm_email.value='';
}



const requiredFields = ['name', 'email', 'message', 'topic', 'last_name'];
const errorsForm = ref({})

const errors=()=>{
	const errors = [];
  errorsForm.value = {};
  requiredFields.forEach((field) => {
    if (!data_m.value[field]) {
      errors.push(`${field} is required.`);
      errorsForm.value[field] = true;
    }
  });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data_m.value.email)) {
      errors.push('Email is not valid.');
      errorsForm.value['email'] = true;
    }
    if (confirm_email.value !== data_m.value.email) {
      errors.push('Emails do not match.');
      errorsForm.value['confirm_email'] = true;
    }
    console.log(errorsForm.value);
  return errors;
}

const captchaToken = ref(null);
const loading = ref(false);
const Send = async () => {
  loading.value = true;
  if (typeof window.grecaptcha === 'undefined' || !window.grecaptcha.enterprise || !window.grecaptcha.enterprise.execute) {
    console.error('reCAPTCHA Enterprise is not available. Please ensure the script loaded correctly.');
    toast.add({ severity: 'error', summary: 'Error', detail: 'reCAPTCHA service is not available. Please try again later.', life: 3000 });
    return;
  }
  const error= errors();
	if(error.length>0){
		toast.add({ severity: 'error', summary: 'Looks like there are some errors', detail: 'To proceed, please fill in the fields in red.', life: 3000 });
	}else if(!checked.value){
		toast.add({ severity: 'error', summary: 'Looks like there are some errors', detail: 'To proceed, please accept our privacy policy.', life: 3000 });
  }
  else{
    try {
      
      await new Promise(resolve => window.grecaptcha.enterprise.ready(resolve));

      const token = await grecaptcha.enterprise.execute(siteKey, { action: 'LOGIN' });
      captchaToken.value = token;

      console.log('reCAPTCHA Token:', captchaToken.value);

      if (!captchaToken.value) {
        console.error('reCAPTCHA token was not generated.');
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Failed to generate reCAPTCHA token. Please try again.', life: 3000 });
        return; 
      }
      data_m.value.captchaToken = captchaToken;
      if(!email_flag.value) {
        console.log(data_m.value);
        const response = await tour_Store.sendEnquiry(data_m.value, `${config.public.BACKEND_URL}`);

        if (response.success) {
          reset();
          toast.add({ severity: 'success', summary: 'We got your enquiry!', detail: 'We will get back to you soon.', life: 3000 });
        } else {
          toast.add({ severity: 'error', summary: 'Oppss!', detail: response.data[0], life: 3000 });
        }
        console.log(response);
      } else {
        toast.add({ severity: 'error', summary: 'Oppss!', detail: 'Please fill in the required fields.', life: 3000 });
      }
    } catch (error) {
      console.error('Error during reCAPTCHA execution or form submission:', error);
      toast.add({ severity: 'error', summary: 'Submission Error', detail: 'An error occurred during submission. Please try again.', life: 3000 });
    }
  }
  loading.value = false;
};

watch(()=>confirm_email.value,()=>{
	console.log('contenido de watcher')
if( generalFunction.emailValidate(confirm_email.value) && (data_m.value.email == confirm_email.value ) ){
	email_flag.value=false;
}else{
	email_flag.value=true;
}
});

onMounted(async () => {
});

  </script>
  
  <style scoped>
  /* Contenedor principal */
  .container {
    padding: 1rem 0;
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
  }
  
  /* Card */
  .card_style {
    margin: 1rem 0;
    padding: 1rem 0;
    width: 100%;
  }
  
  /* Grupos de formulario */
  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
  }
  
  /* Labels */
  .form-group label {
    flex: 0 0 120px;
    text-align: right;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    padding: 0.5rem 0;
  }
  
  /* Inputs y controles */
  .input,
  .p-dropdown,
  .p-textarea {
    flex: 1;
    min-width: 0;
    margin: 0.5rem 0;
    width: 100%;
  }
  
  /* Sobreescritura necesaria para PrimeVue */
  .p-dropdown.p-component {
    width: 100% !important;
  }
  
  .p-inputtext {
    width: 100% !important;
  }
  
  /* Grupos de inputs en línea */
  .form-group:has(> .input + span + .input) {
    flex-wrap: nowrap;
  }
  
  /* Espaciado entre inputs */
  .form-group span {
    width: auto;
    padding: 0 0.5rem;
    margin: 0 0.25rem;
    text-align: center;
  }
  
  /* Footer - MODIFICADO PARA BOTÓN ABAJO */
  .card-footer-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
  }
  
  .card-footer-content p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    order: 1; /* Texto primero */
  }
  
  .card-footer-content .p-button {
    width: 100%;
    margin: 0;
    padding: 0.75rem;
    order: 2; /* Botón segundo */
    align-self: flex-start; /* Alineado a la izquierda */
  }
  
  /* reCAPTCHA */
  #recaptcha-container {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  /* Versión móvil */
  @media (max-width: 767px) {
    .form-group {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .form-group label {
      flex: 0 0 auto;
      text-align: left;
      margin-right: 0;
      width: 100%;
    }
    
    .form-group:has(> .input + span + .input) {
      flex-wrap: wrap;
    }
  }
  
  /* Estilos específicos para PrimeVue */
  .p-card {
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 1rem 0;
    padding: 0;
    border: none;
  }
  
  .p-checkbox {
    margin-right: 0.5rem;
  }
  
  /* Asteriscos rojos */
  a[style*="color:red"] {
    color: red !important;
    margin-left: 0.25rem;
  }

  /* Optional: Add some styling for your container if needed */
  #recaptcha-container {
    margin-top: 20px;
  }
  </style>