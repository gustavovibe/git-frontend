<template>
	<br />
  <div class="form-container">
		<div style="display:inline-flex; gap: 200px; align-items: center;">
      <h3>Traveler {{ props.index }} (child)</h3>
    </div>
    
	  <div class="formgrid grid my-2 border-1 border-gray-300 border-round-sm m-0" style="padding: 15px;">
      <div class="field col-12 md:col-5">
        <label class="mt-3 mb-2"
          ><b>Given Names</b>
          <span class="text-red-600" v-if="!passengerDetails.fields.first_name"
            >*</span
          ></label
        >
        <input
          v-model="passengerDetails.fields.first_name"
          type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="Type your first name..."
        />
      </div>

      <div class="field col-12 md:col-5">
        <label class="mt-3 mb-2">
          <b>Surname</b>
          <span class="text-red-600" v-if="!passengerDetails.fields.last_name"
            >*</span
          ></label
        >
        <input
          v-model="passengerDetails.fields.last_name"
          type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="Type your last name..."
        />
      </div>
      <div class="col-12 mb-3">
        <small class="text-gray-600">Same as in your passport.</small>
      </div>
      <DateOfBirthdayField v-model="passengerDetails.fields['date_of_birth']" :initialDate="traveler_b" :isChild="true" :maxBirthDate="maxDate" :minBirthDate="minDate" :ageRange="rangeAge"/>
      <GenderField
        v-model="passengerDetails.fields['gender']"
        :initialGender="traveler_gender"
        :key="'gender'"
      />
      <div class="field col-12 md:col-12">
        <label class="my-1">Nationality <span class="text-red-600">*</span></label>
        <Dropdown 
          v-model="passengerDetails.fields['nationality']"
          :options="countriesL"
          optionLabel="name" 
          optionValue="t_country_id" 
          placeholder="Select your nationality"
          class="w-full"
        />
      </div>

      <Toast />
      <div class="field col-12 md:col-6">
        <label
          ><b>Passport</b>
          <span
            class="text-red-600"
            v-if="!passengerDetails.fields.passport_number"
            >*</span
          ></label
        >
        <input
          v-model="passengerDetails.fields.passport_number"
          type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          placeholder="123456789"
        />
      </div>

      <div class="field col-12 md:col-6">
        <label
          ><b>Country of issue</b>
          <span
            class="text-red-600"
            v-if="!passengerDetails.fields.place_of_issue"
            >*</span
          ></label
        >
        <Dropdown
          v-model="passengerDetails.fields.place_of_issue"
          :options="countriesL"
          placeholder="Country of issue"
          optionLabel="name"
          optionValue="t_country_id"
          style="width: 100%; height: 2.5rem"
        ></Dropdown>
      </div>

      <IssueDatePassportField
        v-model="passengerDetails.fields.issue_date"
        :initialDate="traveler_issue"
      />

      <ExpirationDatePassportField
        v-model="passengerDetails.fields.expiration_date"
        :initialDate="traveler_expire"
        :today="dateTour"
      />

      <div class="field col-12 md:col-12">
        <label class="mt-3 mb-2"
          ><b>Phone Number</b>
          <span class="text-red-600" v-if="!phoneNumber">*</span></label
        >
        <div class="flex">
          <Dropdown 
            v-model="selectedCountryCode" 
            :options="phoneCodes" 
            placeholder="Country of issue"  
            optionLabel="code" 
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

          <input
            v-model="phoneNumber"
            type="tel"
            class="ml-2 text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary flex-grow"
            placeholder="987654321"
            @input="restrictToNumbers"
            @blur="validatePhoneNumber"
          />
        </div>
        <span v-if="validationError" class="text-red-600 text-sm">{{
          validationError
        }}</span>
      </div>

      <p>
        This allows the tour operator or airlines (e.g. to send you flight
        updates via SMS) to contact you if necesary
      </p>
      <EmailAddressField
        v-model="passengerDetails.fields.email"
        :modelValue="email"
      />
      <template v-for="field in traveler.bookingFields" :key="field.name">
        <template v-if="isNotADefaultField(field.name)">
          <template v-if="field.name === 'bed_preference'">
            <BedPreferenceField
              v-model="passengerDetails.fields['bed_preference']"
              :key="field.name"
            />
          </template>
        </template>
      </template>

			<template v-for="field in traveler.bookingFields" :key="field.name">
  <template v-if="isNotADefaultField(field.name)">
    <!-- Campos específicos -->
    <template v-if="field.name === 'gender'">
      <BookPageGenderField v-model="passengerDetails.fields['gender']" />
    </template>
    <template v-else-if="field.name === 'bed_preference'">
      <BookPageBedPreferenceField v-model="passengerDetails.fields['bed_preference']" />
    </template>
    <!-- Campos genéricos -->
    <template v-else>
      <div class="field col-12 md:col-12" v-if="field.name !== 'nationality'">
        <label class="my-1">{{ field.label }} <span class="text-red-600">*</span></label>
        <input 
          v-model="passengerDetails.fields[field.name]" 
          type="text"
          class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
        />
      </div>
    </template>
  </template>
</template>

    </div>
  </div>
</template>

<script setup>
import { ref, watch,onMounted, } from 'vue';
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
	import { phoneLADA } from "~/models/General";


const child = ref(true)
const config = useRuntimeConfig();
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


const url = ref(config.public.BACKEND_URL);
const countries_list = useDestinationStore();
const countriesL = ref([]);

const nationalities = ref(GLOBAL_NATIONALITIES);
const countries = ref(GLOBAL_COUNTRIES);

const traveler_b = ref('');
const traveler_issue = ref('');
const traveler_expire = ref('');
const traveler_gender = ref('');
/* const traveler_place = ref('');
const traveler_country = ref('');

const travelerStore= useTravelerStore();
const userStore= UsersStore();
const url = ref(config.public.BACKEND_URL); */
//const url = ref('http://127.0.0.1:8000');
const user_id = ref(localStorage.getItem('user_id'));
const emit = defineEmits(['update:modelValue']);

const email= ref('');

const props = defineProps(['traveler', 'modelValue', 'rangeAge', 'index']);


const today = new Date()

const maxDate = new Date(today.getFullYear() - props.rangeAge.strict.min_age, today.getMonth(), today.getDate())
const minDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
const dateTour = new Date(localStorage.getItem('tour_departure_end_date'));

const fixedFields = ref([
   'first_name', 'last_name', 'phone_number', 'email', 'date_of_birth', 'passport_number', 'place_of_issue', 'issue_date', 'expiration_date','title','address','city','postal_code','state','country'
]);

const passengerDetails = ref({
  pax_number: props?.traveler?.id,
  price_category_id: props?.traveler?.priceCategory?.id,
  fields: {
	title:'Mr',
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
	country:''
  },
});


///////////////////////////////////////

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const restrictToNumbers = (event) => {
  const input = event.target.value;
  const numericInput = input.replace(/\D/g, '');
  phoneNumber.value = numericInput;
};

const validatePhoneNumber = () => {
  const fullPhoneNumber = selectedCountryCode.value + phoneNumber.value;
  try {
    const phoneNumberObj = parsePhoneNumberFromString(fullPhoneNumber);
    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
      validationError.value = 'Invalid phone number.';
	  phoneNumber.value= '';		
	  selectedCountryCode.value = '+1';
	  toast.add({ severity: 'error', summary: 'Error!!', detail: 'Invalid phone format', life: 3000 });
    } else {
      validationError.value = null;

    }
  } catch (error) {
    validationError.value = 'Invalid phone number format.';
	phoneNumber.value= '';
	selectedCountryCode.value = '+1';	
  }
};

watch([phoneNumber, selectedCountryCode], ([newPhoneNumber, newCountryCode]) => {
  const fullPhoneNumber = newCountryCode + newPhoneNumber;
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

const printContent = ()=>{
	console.log('imprime contenido:',passengerDetails.value);
}

const getCountries = async ()=>{
	 const res= await countries_list.GetCountries('',url.value);
	 countriesL.value= res.data;
	 console.log('contenido de country:',countriesL.data);
}




watch(
  passengerDetails,
  (newValue) => {
    newValue.fields.title = newValue.fields.gender == 'male' ? 'Mr.' : 'Ms.';
    newValue.fields.country_of_issue = countriesL.value.find(country => country.t_country_id == newValue.fields.place_of_issue)?.name;
    newValue.fields.country_nationality = countriesL.value.find(country => country.t_country_id == newValue.fields.nationality)?.name;
    setPriceCategoryId();
    emit("update:modelValue", newValue);
  }, { deep: true });

onMounted(() => {
	getCountries();
});
</script>

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
</style>
