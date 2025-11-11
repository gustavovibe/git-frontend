<template>
  <div v-if="travelersSelected">
	<template v-if="forms?.length">
		<div
		  v-for="(form, index) in forms"
		  :key="form.traveler_id || index"
		  class="card canaro-font"
		>
			<p class="text-2xl font-semibold canaro-font mb-4">Traveler {{ index + 1 }} (Lead Traveler)</p>

			<!-- Names -->
			<div class="grid mb-4">
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Given Names<span class="text-red-500"> *</span></label>
					<InputText v-model="form.name" class="w-full" placeholder="First name" />
				</div>
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Surnames<span class="text-red-500"> *</span></label>
					<InputText v-model="form.last" class="w-full" placeholder="Last name" />
				</div>
			</div>

			<!-- DOB -->
			<div class="grid mb-4">
				<div class="col-12">
					<label class="block mb-2 font-semibold">Date Of Birth<span class="text-red-500"> *</span></label>
					<div class="flex gap-2">
						<Dropdown v-model="form.birthDay" :options="days" optionLabel="label" optionValue="value" class="w-6rem" placeholder="DD" />
						<Dropdown v-model="form.birthMonth" :options="months" optionLabel="label" optionValue="value" class="w-8rem" placeholder="MM" />
						<Dropdown v-model="form.birthYear" :options="years" optionLabel="label" optionValue="value" class="w-8rem" placeholder="YYYY" />
					</div>
				</div>
			</div>

			<!-- Gender -->
			<div class="grid mb-4">
				<div class="col-12">
					<label class="block mb-2 font-semibold">Gender<span class="text-red-500"> *</span></label>
					<div class="flex align-items-center gap-4">
						<div class="flex align-items-center gap-2">
							<RadioButton inputId="male-{{index}}" value="male" v-model="form.gender" />
							<label :for="`male-${index}`">Male</label>
						</div>
						<div class="flex align-items-center gap-2">
							<RadioButton inputId="female-{{index}}" value="female" v-model="form.gender" />
							<label :for="`female-${index}`">Female</label>
						</div>
					</div>
				</div>
			</div>

			<!-- Passport -->
			<div class="grid mb-4">
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Passport number<span class="text-red-500"> *</span></label>
					<InputText v-model="form.passport" class="w-full" />
				</div>
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Country of issue</label>
					<InputText v-model="form.place" class="w-full" placeholder="Country" />
				</div>
			</div>

			<div class="grid mb-4">
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Passport Issue Date<span class="text-red-500"> *</span></label>
					<div class="flex gap-2">
						<Dropdown v-model="form.issueDay" :options="days" optionLabel="label" optionValue="value" class="w-6rem" placeholder="DD" />
						<Dropdown v-model="form.issueMonth" :options="months" optionLabel="label" optionValue="value" class="w-8rem" placeholder="MM" />
						<Dropdown v-model="form.issueYear" :options="yearsFuture" optionLabel="label" optionValue="value" class="w-8rem" placeholder="YYYY" />
					</div>
				</div>
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Passport Expiration Date<span class="text-red-500"> *</span></label>
					<div class="flex gap-2">
						<Dropdown v-model="form.expireDay" :options="days" optionLabel="label" optionValue="value" class="w-6rem" placeholder="DD" />
						<Dropdown v-model="form.expireMonth" :options="months" optionLabel="label" optionValue="value" class="w-8rem" placeholder="MM" />
						<Dropdown v-model="form.expireYear" :options="yearsFuture" optionLabel="label" optionValue="value" class="w-8rem" placeholder="YYYY" />
					</div>
				</div>
			</div>

			<!-- Contact -->
			<div class="grid mb-4">
				<div class="col-12 md:col-12">
					<label class="block mb-2 font-semibold">Contact Number<span class="text-red-500"> *</span></label>
					<div class="flex gap-2">
						<InputText v-model="form.phone_country" class="w-6rem" placeholder="Country" />
						<InputText v-model="form.phone" class="w-full" placeholder="Phone number" />
					</div>
				</div>
				<p class="text-sm font-interstate px-2 font-bold">Providing correct contact information is essential for receiving important updates from airlines and the operator (e.g., booking confirmations, tour updates, flight updates, etc.).</p>
				<div class="col-12 md:col-612">
					<label class="block mb-2 font-semibold">Email Address</label>
					<InputText v-model="form.mail" class="w-full" placeholder="Enter email address" />
				</div>
				
			</div>

			<!-- Address -->
			<div class="grid mb-4">
				<div class="col-12">
					<label class="block mb-2 font-semibold">Street Address<span class="text-red-500"> *</span></label>
					<InputText v-model="form.address" class="w-full" />
				</div>
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">City<span class="text-red-500"> *</span></label>
					<InputText v-model="form.city" class="w-full" />
				</div>
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Postal Code<span class="text-red-500"> *</span></label>
					<InputText v-model="form.postal_code" class="w-full" />
				</div>
				<div class="col-12 md:col-6">
					<label class="block mb-2 font-semibold">Country<span class="text-red-500"> *</span></label>
					<Dropdown v-model="form.country" :options="countries_list" optionLabel="name" optionValue="id" placeholder="Select country" class="mobile-dropdown" />
				</div>
			</div>
		</div>
	</template>
	<template v-else>
		<p>No traveler details</p>
	</template>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import { useDestinationStore } from "#imports";

const props = defineProps(['travelersSelected'])
const DestinationStore= useDestinationStore();
const forms = ref([])

// dropdown sources
const days = Array.from({ length: 31 }, (_, i) => ({ label: String(i + 1).padStart(2, '0'), value: i + 1 }))
const months = Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1).padStart(2, '0'), value: i + 1 }))
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 120 }, (_, i) => {
  const y = currentYear - i
  return { label: String(y), value: y }
})
const yearsFuture = Array.from({ length: 50 }, (_, i) => {
  const y = currentYear - i
  return { label: String(y), value: y }
})

function splitDate(yyyyMmDd) {
  if (!yyyyMmDd) return { y: undefined, m: undefined, d: undefined }
  const [y, m, d] = String(yyyyMmDd).split('-').map(v => parseInt(v, 10))
  return { y, m, d }
}

function hydrateForms(list = []) {
  forms.value = list.map(t => {
    const b = splitDate(t.birth)
    const i = splitDate(t.issue)
    const e = splitDate(t.expire)
    return {
      ...t,
      birthYear: b.y, birthMonth: b.m, birthDay: b.d,
      issueYear: i.y, issueMonth: i.m, issueDay: i.d,
      expireYear: e.y, expireMonth: e.m, expireDay: e.d,
      city: t.city || '',
      postal_code: t.postal_code || '',
      phone_country: t.phone_country || '',
      country: t.country !== undefined && t.country !== null && t.country !== ''
        ? Number(t.country)
        : null
    }
  })
}

const countries_list = ref([]);

const getCountries = async () => {
  try {
    const res = await DestinationStore.GetCountries('');
	  countries_list.value = res.data;	
    console.log(res.data);
  } catch (error) {
    console.error("Error fetching data:", "no entro");
  } 
};

watch(
  () => props.travelersSelected,
  (val) => hydrateForms(val || []),
  { immediate: true }
)

onMounted(() => {
  hydrateForms(props.travelersSelected || []);
  getCountries();
})
</script>

<style scoped>
:deep(.p-inputtext),
:deep(.p-inputtext *),
:deep(.p-dropdown),
:deep(.p-dropdown *),
:deep(.p-radiobutton) + label {
  font-family: Canaro, var(--font-family), sans-serif !important;
}
</style>
