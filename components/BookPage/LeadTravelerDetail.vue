<template>
  <h3 class="font-normal text-base text-sm mt-2">Traveler 1 (Lead Traveler)</h3>
  <div class="formgrid grid my-2 border-1 border-gray-300 border-round-sm m-0">
    <!-- default fixed fields -->
    <BookPageTitleField v-model="passengerDetails.fields.title" />
    <BookPageFirstNameField v-model="passengerDetails.fields.first_name" />
    <BookPageLastNameField v-model="passengerDetails.fields.last_name" />
    <BookPagePhoneNumberField v-model="passengerDetails.fields.phone_number" />
    <BookPageEmailAddressField v-model="passengerDetails.fields.email" />
    <BookPageDateOfBirthdayField v-model="passengerDetails.fields.date_of_birth" :travelerProp="traveler" />
    <BookPageNationalityField v-model="passengerDetails.fields.nationality" />
    <BookPagePassportField v-model="passengerDetails.fields.passport_number" />
    <BookPageIssuePlacePassportField v-model="passengerDetails.fields.place_of_issue" />
    <BookPageIssueDatePassportField v-model="passengerDetails.fields.issue_date" />
    <BookPageExpirationDatePassportField v-model="passengerDetails.fields.expiration_date" />

    <!-- Other mandatory fields: -->
    <template v-for="field in traveler.bookingFields">
      <template v-if="isNotADefaultField(field.name)">

        <!-- Known fields -->
        <template v-if="field.name === 'gender'">
          <BookPageGenderField v-model="passengerDetails.fields['gender']" />
        </template>
        <template v-else-if="field.name === 'bed_preference'">
          <BookPageBedPreferenceField v-model="passengerDetails.fields['bed_preference']" />
        </template>
        <!-- Unknown fields -->
        <template v-else>
          <div class="field col-12 md:col-12">
            <label class="my-1">{{ field.label }} <span class="text-red-600">*</span></label>
            <input v-model="passengerDetails.fields[field.name]" type="text"
              class="text-base font-light text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
        </template>

      </template>
    </template>
  </div>
</template>


<script setup>
import { watch } from 'vue';

const emit = defineEmits();

const props = defineProps(['traveler', 'modelValue'])

const fixedFields = ref([
  'title',
  'first_name',
  'last_name',
  'phone_number',
  'email',
  'date_of_birth',
  'nationality',
  'passport_number',
  'place_of_issue',
  'issue_date',
  'expiration_date',
])

const passengerDetails = ref({
  pax_number: props?.traveler?.id,
  price_category_id: props?.traveler?.priceCategory?.id,
  fields: {
    title: 'Mr.',
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    nationality: '',
    phone_number: '',
    passport_number: '',
    issue_date: '',
    place_of_issue: '',
    expiration_date: ''
  }
});

function isNotADefaultField(fieldName) {
  return !fixedFields.value.includes(fieldName)
}

function setPriceCategoryId() {
  passengerDetails.value.price_category_id = props?.traveler?.priceCategory?.id
}

watch(passengerDetails, (newValue) => {
  setPriceCategoryId()
  emit('update:modelValue', newValue);
}, { deep: true });

</script>