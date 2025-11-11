<template>
  <br>
  <div class="form-container">
    <div>
      <div class="grid">
        <div class="col-6">
          <h3>Traveler 1 (Lead Traveler)</h3>
        </div>
        <div class="col-6" style="justify-items: right;">
          <h3>
            <Button @click="travelerData" v-if="user_id" label="Fill in with info from your profile" style="background-color: #82cf45; padding: 3px 10px; color: white; border-radius: 12px; line-height: 1;"></Button>
          </h3>
        </div>
      </div>
    </div>
    
    <div class="formgrid grid my-2 border-1 border-gray-300 border-round-sm m-0" style="padding: 15px;">
      <div class="field col-12 md:col-5">
        <label class="mt-3 mb-2"><b>Given Names</b> <span class="text-red-600" v-if="!passengerDetails.fields.first_name">*</span></label>
        <input v-model="passengerDetails.fields.first_name" type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="Type your first name..." :class="{'input-error ': errors.length > 0 && errors.find(error => error.field === 'first_name')}" />
      </div>

      <div class="field col-12 md:col-5">
        <label class="mt-3 mb-2"> <b>Surname</b> <span class="text-red-600" v-if="!passengerDetails.fields.last_name">*</span></label>
        <input v-model="passengerDetails.fields.last_name" type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="Type your last name..." :class="{'input-error ': errors.length > 0 && errors.find(error => error.field === 'last_name')}" />
      </div>
      <div class="col-12 mb-3">
        <small class="text-gray-600">Same as in your passport.</small>
      </div>

      <DateOfBirthdayField v-model="passengerDetails.fields.date_of_birth" :maxBirthDate="maxBirthDate" :initialDate="traveler_b" :class="{'input-error-sub ': errors.length > 0 && errors.find(error => error.field === 'date_of_birth')}" />

      <GenderField 
        v-model="passengerDetails.fields['gender']" 
        :initialGender="traveler_gender" 
        :key="'gender'"
        :class="{'input-error-sub ': errors.length > 0 && errors.find(error => error.field === 'gender')}"
      />

      
      <Toast />
      <div class="field col-12 md:col-6">
        <label><b>Passport</b> <span class="text-red-600" v-if="!passengerDetails.fields.passport_number">*</span></label>
        <input v-model="passengerDetails.fields.passport_number" type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="123456789" :class="{'input-error ': errors.length > 0 && errors.find(error => error.field === 'passport_number')}" />
      </div>

      <div class="field col-12 md:col-6">
        <label><b>Country of issue</b> <span class="text-red-600" v-if="!passengerDetails.fields.place_of_issue">*</span></label>
        <Dropdown v-model="passengerDetails.fields.place_of_issue" :options="countriesL" placeholder="Country of issue"  optionLabel="name" optionValue="t_country_id"  style="width: 100%;height:2.5rem;" :class="{'input-error ': errors.length > 0 && errors.find(error => error.field === 'place_of_issue')}"></Dropdown>
      </div>

      <IssueDatePassportField v-model="passengerDetails.fields.issue_date" :today="today" :initialDate="traveler_issue" :class="{'input-error-sub ': errors.length > 0 && errors.find(error => error.field === 'issue_date')}" />

      <ExpirationDatePassportField v-model="passengerDetails.fields.expiration_date" :today="dateTour" :initialDate="traveler_expire" :class="{'input-error-sub ': errors.length > 0 && errors.find(error => error.field === 'expiration_date')}" />

			<div class="field col-12 md:col-12">
        <label class="mt-3 mb-2"><b>Phone Number</b> <span class="text-red-600" v-if="!phoneNumber">*</span></label>
        <div class="flex">
          <Dropdown 
            v-model="selectedCountryCode" 
            :options="phoneCodes" 
            placeholder="Country of issue"  
            optionLabel="name" 
            optionValue="code"  
            filter
            filterBy="name,code"
            filterMatchMode="contains"
          >
          <template #option="slotProps">
              <div class="flex align-items-center">
                  <div>{{ slotProps.option.name }} ({{ slotProps.option.code }})</div>
              </div>
          </template>
        </Dropdown>
          <!-- <select v-model="selectedCountryCode"
            class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary text-center">
            <option v-for="(country, index) in phoneCodes" :key="index" :value="country.code">
              {{ country.code }} ({{ country.name }})
            </option>
          </select> -->
          <input v-model="phoneNumber" type="tel"
          :class="{'input-error ': errors.length > 0 && errors.find(error => error.field === 'phone_number')}"
            class="ml-2 text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary flex-grow"
            placeholder="987654321" @input="restrictToNumbers" @blur="validatePhoneNumber" />
        </div>
        <span v-if="validationError" class="text-red-600 text-sm">{{ validationError }}</span>
      </div>

			<p>This allows the tour operator or airlines (e.g. to send you flight updates via SMS) to contact you if necesary</p>
			<EmailAddressField v-model="passengerDetails.fields.email" :modelValue="email" :class="{'input-error-sub ': errors.length > 0 && errors.find(error => error.field === 'email')}" />

      <!-- <div class="field col-12 md:col-12">
        <label class="my-1">Nationality <span class="text-red-600" v-if="!passengerDetails.fields['nationality']">*</span></label>
        <Dropdown 
          v-model="passengerDetails.fields['nationality']"
          :options="countriesL"
          optionLabel="name" 
          optionValue="t_country_id" 
          placeholder="Select your nationality"
          class="w-full"
        />
      </div> -->

			<template v-for="field in traveler.bookingFields" :key="field.name">
        <template v-if="isNotADefaultField(field.name)">
          <template v-if="field.name === 'bed_preference'">
            <BedPreferenceField v-model="passengerDetails.fields['bed_preference']" :key="field.name" />
          </template>
        </template>
      </template>




		<template v-for="field in traveler.bookingFields" :key="field.name">
      <template v-if="isNotADefaultField(field.name)">
        <!-- Excluir el campo 'gender' de los campos dinámicos -->
        <template v-if="field.name === 'bed_preference'">
          <BookPageBedPreferenceField v-model="passengerDetails.fields['bed_preference']" :key="field.name" />
        </template>

        <!-- Campo de nationality con Dropdown -->

        <!-- Campos genéricos -->
        <template v-else>
          <div class="field col-12 md:col-12" v-if="field.name !== 'nationality'">
            <label class="my-1">{{ field.label }} <span class="text-red-600" v-if="!passengerDetails.fields[field.name]">*</span></label>
            <input 
              v-model="passengerDetails.fields[field.name]" 
              type="text"
              class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
            />
          </div>
        </template>
      </template>
    </template>



      <div class="field col-12 md:col-12">
        <Accordion :activeIndex="0" expandIcon="pi pi-circle" collapseIcon="pi pi-circle-fill">
          <AccordionTab :disabled="hasMandatoryAddress">
              <template #header>
                 <h3>Billing details</h3>
              </template>
              <PersonalBilling @update:model-value="updateBillingDetails" v-model="passengerDetails.fields.personal"  :country-options="countriesL"  @update:personalFlag="updatePersonalStatus"/>
          </AccordionTab>
        </Accordion>
       
			</div>
				
				<!-- <div class="field col-12 md:col-12">
            <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
                <RadioButton v-model="passengerDetails.fields.account" inputId="personal" name="personal" value="personal" />
                <label for="personal" class="ml-2">Personal</label>
            </div>
            <div class="flex align-items-center">
                <RadioButton v-model="passengerDetails.fields.account" inputId="company" name="company" value="company" />
                <label for="company" class="ml-2">Company</label>
            </div>
          </div>
				</div> -->
				

				<!-- <div v-if="passengerDetails.fields.account =='company'">
					<CompanyBilling v-model="passengerDetails.fields.company" :country-options="countriesL"  @update:companyFlag="updateCompanyStatus" />
				</div> -->

    </div>
  </div>
	
</template>


<script setup>
import { ref, watch,onMounted, reactive, computed} from 'vue';
import Button from 'primevue/button';
import { useTravelerStore } from '#imports';
import EmailAddressField from './BookPage/EmailAddressField.vue';
import DateOfBirthdayField from './BookPage/DateOfBirthdayField.vue';
import IssueDatePassportField from './BookPage/IssueDatePassportField.vue';
import ExpirationDatePassportField from './BookPage/ExpirationDatePassportField.vue';
import GenderField from './BookPage/GenderField.vue';
import BedPreferenceField from './BookPage/BedPreferenceField.vue';
import { GLOBAL_NATIONALITIES } from '~/utils/globalNationalities';
import { GLOBAL_COUNTRIES } from '~/utils/globalCountries';
import { GLOBAL_PHONE_CODES } from '~/utils/globalPhoneCodes';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import { useDestinationStore } from '#imports';
import Dropdown from "primevue/dropdown";
import InputSwitch from 'primevue/inputswitch';
import PersonalBilling  from './PersonalBilling.vue';
import CompanyBilling from './CompanyBilling.vue';
import RadioButton from 'primevue/radiobutton';
import { phoneLADA } from "~/models/General";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const phoneNumber = ref('');
const selectedCountryCode = ref('+1'); 
const validationError = ref(null);
const toast = useToast();
const countryCodes = GLOBAL_PHONE_CODES;
const phoneCodes = computed(() =>
  phoneLADA.value.map(country => ({
    code: country.name,
    name: country.code
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
);
console.log('NEWS PHONES', phoneCodes);
console.log('OLD PHONES',countryCodes);
const config = useRuntimeConfig();



const checked= ref(false);

const nationalities = ref(GLOBAL_NATIONALITIES);


const traveler_b = ref('');
const traveler_issue = ref('');
const traveler_expire = ref('');
const traveler_gender = ref('');
const traveler_place = ref('');
const traveler_country = ref('');

const travelerStore= useTravelerStore();
const userStore= UsersStore();
const url = ref(config.public.BACKEND_URL);
/* const url = ref('http://127.0.0.1:8000'); */
const user_id = ref(localStorage.getItem('user_id'));
const emit = defineEmits(['update:modelValue']);
const countries_list = useDestinationStore();

const updatePersonalStatus = (status) => {
	passengerDetails.value.fields.personal_billingStatus = status;
	/* console.log('contenido fuera de componente:',status); */
};

const dateTour = new Date(localStorage.getItem('tour_departure_end_date'));

const today = new Date()
const maxBirthDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
)

const updateCompanyStatus = (status) => {
	passengerDetails.value.fields.company_billingStatus = status;
	/* console.log('contenido fuera de componente:',status); */
};

const keysNoInclude = ["street","account","billing","company","personal","given_name","company_billingStatus","personal_billingStatus"]

const updateBillingDetails = async (newValue) => {
  let temp = {...passengerDetails.value.fields, ...newValue, street: newValue.address, passport_number: passengerDetails.value.fields.passport_number.toString()}

  await keysNoInclude.forEach(llave => {
      delete temp[llave];
    });
  passengerDetails.value.fields = temp;
};


const email= ref('');

const props = defineProps(['traveler', 'modelValue']);

const hasMandatoryAddress = computed(() =>
  props.traveler.bookingFields.some(
    field =>
      field.group === "Address" &&
      (field.main_pax === "mandatory" || field.additional_pax === "mandatory")
  )
)

const fixedFields = ref([
   'first_name', 'last_name', 'phone_number', 'email', 'date_of_birth', 'passport_number', 'place_of_issue', 'issue_date', 'expiration_date','title','address','city','postal_code','state','country'
]);

const passengerDetails = ref({
  pax_number: props?.traveler?.id,
  price_category_id: props?.traveler?.priceCategory?.id,
  country_id: null, 
  phone: null,
  lada: null,
  fields: {
    title:'Mr.',
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    phone_number: '',
    passport_number: '',
    issue_date: '',
    place_of_issue: '',
    expiration_date: '',
    address:'',
    city:'',
    postal_code:'',
    state:'',
    country:'',
    account:'',
    billing:false,
    personal:{
      given_name:'',
      last_name:'',
      country:'',
      address:'',
      state:'',
      city:'',
      postal_code:''
    },
    company:{
      company_name:'',
      company_id:'',
      country:'',
      tax_id:'',
      city:'',
      postal_code:'',
      street:''
    },
    personal_billingStatus:0,
    company_billingStatus:0,
  },
});


///////////////////////////////////////

const imprimeDatos= ()=>{
	console.log('imprime objeto:',passengerDetails.value)
}

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const restrictToNumbers = (event) => {
  const input = event.target.value;
  const numericInput = input.replace(/\D/g, '');
  phoneNumber.value = numericInput;
};

const validatePhoneNumber = () => {
  console.log('validatePhoneNumber')
  const fullPhoneNumber = selectedCountryCode.value + phoneNumber.value;
  try {
    const phoneNumberObj = parsePhoneNumberFromString(fullPhoneNumber);
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      validationError.value = 'Invalid phone number.';
      toast.add({ severity: 'error', summary: 'Error!!', detail: 'Invalid phone format', life: 3000 });
    } else {
      validationError.value = null;

    }
  } catch (error) {
    validationError.value = 'Invalid phone number format.';
  }
};

watch([phoneNumber, selectedCountryCode], ([newPhoneNumber, newCountryCode]) => {
  const fullPhoneNumber = newCountryCode + newPhoneNumber;
  passengerDetails.value.lada = newCountryCode;
  passengerDetails.value.phone = newPhoneNumber;
  passengerDetails.value.fields.phone_number = fullPhoneNumber;
});

//////////////////////////////////////


function isNotADefaultField(fieldName) {
    const excludedFields = ['gender']; 
  return !excludedFields.includes(fieldName) && !fixedFields.value.includes(fieldName);
}

function setPriceCategoryId() {
  passengerDetails.value.price_category_id = props?.traveler?.priceCategory?.id;
}


const travelerData= async ()=>{
	const user=ref();
	const traveler=ref();
	if(user_id.value){
	
		const response_user = await userStore.getAllUsers({id:user_id.value},url.value);
		if(response_user.value){
			console.log('contenido de user', response_user)
			user.value=response_user.value[0];
			passengerDetails.value.fields.first_name = user.value.name;
			passengerDetails.value.fields.email = user.value.email;
			passengerDetails.value.fields.phone_number = user.value.phone;
			email.value= user.value.email;
		}


		const response_traveler = await travelerStore.travelerData({user_id:user_id.value},url.value);
		console.log('email de usuario',localStorage.getItem('email'))
		if(response_traveler.data){
		console.log('contenido de traveler', response_traveler.data);
		traveler.value=response_traveler.data;
		passengerDetails.value.fields.first_name = traveler.value.name;
		passengerDetails.value.fields.last_name = traveler.value.last;
		passengerDetails.value.fields.passport_number = traveler.value.passport;
		passengerDetails.value.fields.date_of_birth = traveler.value.birth;
		passengerDetails.value.fields.place_of_issue = parseInt(traveler.value.country);
		passengerDetails.value.fields.nationality = parseInt(traveler.value.country);
		traveler_b.value=traveler.value.birth;
		traveler_issue.value=traveler.value.issue;
		traveler_expire.value=traveler.value.expire;
		traveler_gender.value= traveler.value.gender;
		traveler_place.value=parseInt(traveler.value.place);
		traveler_country.value=parseInt(traveler.value.country);
		if(traveler.value.phone_country && traveler.value.phone){
			phoneNumber.value = traveler.value.phone;
			selectedCountryCode.value = traveler.value.phone_country;
		}
		}
		passengerDetails.value.fields.nationality=Number(traveler.value.country);
		console.log('contenido de nacionalida:',nationalities.value)
	}
};

const printContent = ()=>{
	console.log('imprime contenido:',passengerDetails.value);
}

const countriesL = ref([]);
const getCountries = async ()=>{
	 const res= await countries_list.GetCountries('',url.value);
	 countriesL.value= res.data;
}

const errors = ref([]);
let toastVisible = false
const validateFom = ()=>{
  if (!passengerDetails.value.fields.first_name) {
    errors.value.push({field: 'first_name', message: 'First name is required'});
  }
  if (!passengerDetails.value.fields.last_name) {
    errors.value.push({field: 'last_name', message: 'Last name is required'});
  }
  if (!passengerDetails.value.fields.phone_number) {
    errors.value.push({field: 'phone_number', message: 'Phone number is required'});
  }else{
    if(passengerDetails.value.fields.phone_number.length < 10){
      errors.value.push({field: 'phone_number', message: 'Phone number needs to be at least 10 digits'});
    }else{
      validatePhoneNumber();
    }
  }
  if (!passengerDetails.value.fields.email) {
    errors.value.push({field: 'email', message: 'Email is required'});
  }
  if (!passengerDetails.value.fields.date_of_birth) {
    errors.value.push({field: 'date_of_birth', message: 'Date of birth is required'});
  }
  if (!passengerDetails.value.fields.passport_number) {
    errors.value.push({field: 'passport_number', message: 'Passport number is required'});
  }
  if (!passengerDetails.value.fields.place_of_issue) {
    errors.value.push({field: 'place_of_issue', message: 'Place of issue is required'});
  }
  if (!passengerDetails.value.fields.issue_date) {
    errors.value.push({field: 'issue_date', message: 'Issue date is required'});
  }
  if (!passengerDetails.value.fields.expiration_date) {
    errors.value.push({field: 'expiration_date', message: 'Expiration date is required'});
  }
  if (errors.value.length) {
    console.log(toastVisible)
    if (toastVisible) return false

    toastVisible = true
    toast.add({ severity: 'error', summary: 'Error', detail: errors.value[0].message + (errors.value.length > 1 ? ' and others errors, please check the form.' : ''), life: 6000, onHide: () => toastVisible = false });
    return false;
  }
  return true;
}


function findFieldDifferences(newFields, oldFields, path = 'fields') {
  const changes = [];

  for (const key in newFields) {
    const fullPath = `${path}.${key}`;

    if (typeof newFields[key] === 'object' && newFields[key] !== null && oldFields[key] !== null) {
      if (Array.isArray(newFields[key])) {
        if (JSON.stringify(newFields[key]) !== JSON.stringify(oldFields[key])) {
          changes.push(fullPath);
        }
      } else {
        changes.push(...findFieldDifferences(newFields[key], oldFields[key], fullPath));
      }
    } else {
      if (newFields[key] !== oldFields[key]) {
        console.log(newFields[key], oldFields[key]);
        changes.push(fullPath);
      }
    }
  }

  return changes;
}


let debounceTimeout = null
watch(passengerDetails, (newValue, oldValue) => {
  // console.log('newValue:', newValue);
  // console.log('oldValue:', oldValue);

  // newValue.fields.forEach((item, index) => {
  //   if (item !== oldValue.field[index]) {
  //     console.log(`El valor del índice ${index} cambió:`);
  //   }
  // });
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }


  debounceTimeout = setTimeout(() => {
    const changes = findFieldDifferences(newValue.fields, oldValue.fields);
    console.log('Campos que cambiaron:', changes);
    console.log('validate')
    errors.value = [];
    validateFom();
    newValue.fields.title = newValue.fields.gender == 'male' ? 'Mr.' : 'Ms.';
    newValue.country_id = newValue.fields.place_of_issue;
    newValue.fields.country_of_issue = countriesL.value.find(country => country.t_country_id == newValue.fields.place_of_issue)?.name;
    emit('update:modelValue', newValue);
  }, 1500) // 3 segundos
}, { deep: true });

onMounted(() => {
	getCountries();
});
</script>

<style>
.pi-circle-fill:before {
  color: #82cf45;
}
</style>

<style scoped>
.form-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-item label {
  font-size: 14px;
  margin-bottom: 5px;
}

.form-item input,
.form-item select,
.form-item textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.required {
  color: red;
}
.full-width {
  grid-column: span 2; /* Hace que ocupe dos columnas del grid */
  width: 100%;
}

.input-error {
  border: 1px solid red !important;
  background-color: #ffe6e6;
}

.input-error-sub {
  border: none !important;
  background-color: #fff !important;
}
</style>
