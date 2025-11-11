<template>
    <div class="overflow-hidden mb-8 main-spacing">
        <div class="grid">
            <div class="col-12 lg:col-9">
                <div class="card">
                    <Breadcrumb :model="items">
                        <template #item="{ item, props }">
                            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                <a :href="href" v-bind="props.action" @click="navigate">
                                    <span :class="[item.icon, 'text-color']" />
                                    <span class="text-green-vibe font-semibold">{{ item.label }}</span>
                                </a>
                            </router-link>
                            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                                <span class="text-color font-semibold">{{ item.label }}</span>
                            </a>
                        </template>
                    </Breadcrumb>
                </div>
                <h1 class="canaro-font font-semibold">Personal <span class="text-green-vibe">Details</span></h1>
                <div class="interstate-font font-light text-xl">Your personal details are shared solely with transportation and adventure providers. Please ensure they are accurate, as this information will be utilized when booking flights and tours.</div>
                <div>
                        <div class="border-1 border-gray-300 border-round-sm text-sm relative mt-5">
                        <div class="grid m-4 md:m-6">
                            <div class="col-12 lg:col-9">
                                <div class="grid">
                                    <div class="col-2 canaro-font font-medium text-lg flex align-items-center">Title<span class="ml-1" style="color: red;">*</span></div>
                                    <div class="col-10 lg:col-9">
                                        <div class="card flex justify-content-center">
                                            <Dropdown v-model="selectedTitle" :options="titles" optionLabel="name" placeholder="Select a Title" class="w-full py-0" />
                                        </div>
                                    </div>
                                    <div class="col-2 canaro-font font-medium text-lg flex align-items-center">First Name<span class="ml-1" style="color: red;">*</span></div>
                                    <div class="col-10 lg:col-9">
                                        <div class="card flex justify-content-center">
                                            <InputText type="text" v-model="firstName" class="w-full py-2" />
                                        </div>
                                    </div>
                                    <div class="col-2 canaro-font font-medium text-lg flex align-items-center">Last Name<span class="ml-1" style="color: red;">*</span></div>
                                    <div class="col-10 lg:col-9">
                                        <div class="card flex justify-content-center">
                                            <InputText type="text" v-model="lastName" class="w-full py-2" />
                                        </div>
                                    </div>
                                    <div class="col-2 canaro-font font-medium text-lg flex align-items-center">Birth Date</div>
                                    <div class="col-10 lg:col-9 flex justify-content-between">
                                        <div class="card justify-content-center">
                                            <Dropdown v-model="selectedDay" :options="days" optionLabel="name" placeholder="DD" class="lg:w-10rem py-0" />
                                        </div>
                                        <div class="card  justify-content-center">
                                            <Dropdown v-model="selectedMonth" :options="months" optionLabel="name" placeholder="MM" class="lg:w-10rem py-0" />
                                        </div>
                                        <div class="card justify-content-center">
                                            <Dropdown v-model="selectedYear" :options="years" optionLabel="name" placeholder="YYYY" class="lg:w-10rem py-0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 lg:col-3 border-1 border-round-sm text-sm flex align-items-center justify-content-center" style="border-color: #82cf45;border-style: dashed;">
                                <div>
                                    <div class="card">
                                        <Toast />
                                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" chooseLabel="Add profile picture" class="uploadPicture"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-1 border-gray-300 border-round-sm text-sm relative mt-5">
                        <div class="grid m-4 md:m-6">
                            <div class="col-12 lg:col-10">
                                <div class="grid">
                                    <div class="col-3 canaro-font font-medium text-lg flex align-items-center">Passport Number</div>
                                    <div class="col-9">
                                        <div class="card flex justify-content-center">
                                            <InputNumber v-model="passportNumber" inputId="withoutgrouping" :useGrouping="false" placeholder="Enter your passport number" class="w-full py-2" style="height: 3.5rem;"/>
                                        </div>
                                    </div>
                                    <div class="col-3 canaro-font font-medium text-lg flex align-items-center">Place Of Issue</div>
                                    <div class="col-9">
                                        <div class="card flex justify-content-center">
                                            <Dropdown v-model="selectedIssuePlace" :options="countries" optionLabel="name" placeholder="Select Passport Place Of Issue" class="w-full py-0" />
                                        </div>
                                    </div>
                                    <div class="col-3 canaro-font font-medium text-lg flex align-items-center">Issue Date</div>
                                    <div class="col-9 flex justify-content-between">
                                        <div class="card justify-content-center">
                                            <Dropdown v-model="selectedIssueDay" :options="days" optionLabel="name" placeholder="DD" class="lg:w-12rem py-0" />
                                        </div>
                                        <div class="card  justify-content-center">
                                            <Dropdown v-model="selectedIssueMonth" :options="months" optionLabel="name" placeholder="MM" class="lg:w-12rem py-0" />
                                        </div>
                                        <div class="card justify-content-center">
                                            <Dropdown v-model="selectedIssueYear" :options="years" optionLabel="name" placeholder="YYYY" class="lg:w-12rem py-0" />
                                        </div>
                                    </div>
                                    <div class="col-3 canaro-font font-medium text-lg flex align-items-center">Expiry Data</div>
                                    <div class="col-9 flex justify-content-between">
                                        <div class="card justify-content-center">
                                            <Dropdown v-model="selectedExpiryDay" :options="days" optionLabel="name" placeholder="DD" class="lg:w-12rem py-0" />
                                        </div>
                                        <div class="card  justify-content-center">
                                            <Dropdown v-model="selectedExpiryMonth" :options="months" optionLabel="name" placeholder="MM" class="lg:w-12rem py-0" />
                                        </div>
                                        <div class="card justify-content-center">
                                            <Dropdown v-model="selectedExpiryYear" :options="years" optionLabel="name" placeholder="YYYY" class="lg:w-12rem py-0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-1 border-gray-300 border-round-sm text-sm relative mt-5">
                        <div class="grid m-4 md:m-6">
                            <div class="col-12 lg:col-10">
                                <div class="grid">
                                    <div class="col-3 canaro-font font-medium text-lg flex align-items-center">Email Address<span class="ml-1" style="color: red;">*</span></div>
                                    <div class="col-9">
                                        <div class="card flex justify-content-center">
                                            <InputText type="text" v-model="emailAddress" class="w-full py-2" />
                                        </div>
                                    </div>
                                    <div class="col-3 canaro-font font-medium text-lg flex align-items-center">Phone Number</div>
                                    <div class="col-9 md:flex align-items-center">
                                        <div class="card justify-content-center mr-5">
                                            <Dropdown v-model="selectedPhone" :options="phoneLADA" optionLabel="name" placeholder="(+52)" class="w-8rem py-0" />
                                        </div>
                                        <div class="card justify-content-center">
                                            <InputNumber v-model="phoneNumber" inputId="withoutgrouping" :useGrouping="false" class=" py-2" style="height: 3.5rem;"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="text_decoration_none">
                        <button class="btn-custom py-2 px-3 my-4 download_btn flex mx-auto">
                          Save changes
                        </button>
                    </a>
                </div>
                <h1 class="canaro-font font-semibold">Email <span class="text-green-vibe">Subscriptions</span></h1>
                <div class="border-1 border-gray-300 border-round-sm text-sm relative mt-5">
                    <div class="flex justify-content-between align-items-center mx-6">
                        <p class="interstate-font text-lg font-light">You are subscribed to our email newsletter with travel insights, tips and deals.</p>
                        <a class="text_decoration_none">
                            <button class="btn-custom py-2 px-3 my-4 outline_btn flex mx-auto">
                              Unsubscribe
                            </button>
                        </a>
                    </div>
                </div>
                <h1 class="canaro-font font-semibold">Login &amp <span class="text-green-vibe">Security</span></h1>
                <div class="border-1 border-gray-300 border-round-sm text-sm relative mt-5">
                    <div class="m-4 md:m-6 md:flex justify-content-between align-items-end">
                        <div class="card flex justify-content-center">
                            <div class="flex flex-column gap-2">
                                <label for="username" class="canaro-font font-semibold">Old password</label>
                                <Password v-model="oldPassword" toggleMask />
                            </div>
                        </div>
                        <div class="card flex justify-content-center">
                            <div class="flex flex-column gap-2">
                                <label for="username" class="canaro-font font-semibold">New password</label>
                                <Password v-model="newPassword" toggleMask />
                            </div>
                        </div>
                        <div class="card flex justify-content-center">
                            <div class="flex flex-column gap-2">
                                <label for="username" class="canaro-font font-semibold">Confirm new password</label>
                                <Password v-model="confirmNewPassword" toggleMask />
                            </div>
                        </div>
                        <div class="mt-3 md:mt-0">
                            <a class="text_decoration_none">
                                <button class="btn-custom px-3 download_btn flex mx-auto" style="padding-top: 0.7rem;padding-bottom: 0.7rem;">
                                  Save changes
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <h1 class="canaro-font font-semibold">Delete <span class="text-green-vibe">Account</span></h1>
                <div class="border-1 border-gray-300 border-round-sm text-sm relative mt-5">
                    <div class="mx-6">
                        <p class="interstate-font text-lg font-light">Permanently delete your account and data.</p>
                        <p class="text-orange-vibe canaro-font font-semibold text-base"><i class="pi pi-trash mr-2"></i>Delete your account</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted, computed } from "vue";
import Breadcrumb from 'primevue/breadcrumb';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";

const toast = useToast();
const windowMobile = ref(false);
const checkMobile = () => {
  windowMobile.value = window.innerWidth <= 768;
};
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const items = ref([
		{
			label: windowMobile.value ? '' : 'Home',
			icon: windowMobile.value ? 'pi pi-home' : '',
			route: '/'
		},
    { label: 'Account' },
    { label: 'Personal details', route: '/my-trips/account/personal-details' }
]);

const selectedTitle = ref();
const titles = ref([
    { name: 'Mr.', code: 'male' },
    { name: 'Ms.', code: 'female' }
]);

const firstName = ref(null);
const lastName = ref(null);

const selectedDay = ref();
const selectedMonth = ref();
const selectedYear = ref();

const passportNumber = ref(null);
const selectedIssuePlace = ref(null);
const selectedIssueDay = ref();
const selectedIssueMonth = ref();
const selectedIssueYear = ref();

const selectedExpiryDay = ref();
const selectedExpiryMonth = ref();
const selectedExpiryYear = ref();

const emailAddress = ref(null);
const selectedPhone = ref();
const phoneNumber = ref(null);

const oldPassword = ref(null);
const newPassword = ref(null);
const confirmNewPassword = ref(null);

const days = ref([
    { name: '01', code: '1' },
    { name: '02', code: '2' },
    { name: '03', code: '3' },
    { name: '04', code: '4' },
    { name: '05', code: '5' },
    { name: '06', code: '6' },
    { name: '07', code: '7' },
    { name: '08', code: '8' },
    { name: '09', code: '9' },
    { name: '10', code: '10' },
    { name: '11', code: '11' },
    { name: '12', code: '12' },
    { name: '13', code: '13' },
    { name: '14', code: '14' },
    { name: '15', code: '15' },
    { name: '16', code: '16' },
    { name: '17', code: '17' },
    { name: '18', code: '18' },
    { name: '19', code: '19' },
    { name: '20', code: '20' },
    { name: '21', code: '21' },
    { name: '22', code: '22' },
    { name: '23', code: '23' },
    { name: '24', code: '24' },
    { name: '25', code: '25' },
    { name: '26', code: '26' },
    { name: '27', code: '27' },
    { name: '28', code: '28' },
    { name: '29', code: '29' },
    { name: '30', code: '30' },
    { name: '31', code: '31' }
]);

const months = ref([
    { name: '01', code: '1' },
    { name: '02', code: '2' },
    { name: '03', code: '3' },
    { name: '04', code: '4' },
    { name: '05', code: '5' },
    { name: '06', code: '6' },
    { name: '07', code: '7' },
    { name: '08', code: '8' },
    { name: '09', code: '9' },
    { name: '10', code: '10' },
    { name: '11', code: '11' },
    { name: '12', code: '12' }
]);

const years = ref([
    { name: '1950', code: '1950' },
    { name: '1951', code: '1951' },
    { name: '1952', code: '1952' },
    { name: '1953', code: '1953' },
    { name: '1954', code: '1954' },
    { name: '1955', code: '1955' },
    { name: '1956', code: '1956' },
    { name: '1957', code: '1957' },
    { name: '1958', code: '1958' },
    { name: '1959', code: '1959' },
    { name: '1960', code: '1960' },
    { name: '1961', code: '1961' },
    { name: '1962', code: '1962' },
    { name: '1963', code: '1963' },
    { name: '1964', code: '1964' },
    { name: '1965', code: '1965' },
    { name: '1966', code: '1966' },
    { name: '1967', code: '1967' },
    { name: '1968', code: '1968' },
    { name: '1969', code: '1969' },
    { name: '1970', code: '1970' },
    { name: '1971', code: '1971' },
    { name: '1972', code: '1972' },
    { name: '1973', code: '1973' },
    { name: '1974', code: '1974' },
    { name: '1975', code: '1975' },
    { name: '1976', code: '1976' },
    { name: '1977', code: '1977' },
    { name: '1978', code: '1978' },
    { name: '1979', code: '1979' },
    { name: '1980', code: '1980' },
    { name: '1981', code: '1981' },
    { name: '1982', code: '1982' },
    { name: '1983', code: '1983' },
    { name: '1984', code: '1984' },
    { name: '1985', code: '1985' },
    { name: '1986', code: '1986' },
    { name: '1987', code: '1987' },
    { name: '1988', code: '1988' },
    { name: '1989', code: '1989' },
    { name: '1990', code: '1990' },
    { name: '1991', code: '1991' },
    { name: '1992', code: '1992' },
    { name: '1993', code: '1993' },
    { name: '1994', code: '1994' },
    { name: '1995', code: '1995' },
    { name: '1996', code: '1996' },
    { name: '1997', code: '1997' },
    { name: '1998', code: '1998' },
    { name: '1999', code: '1999' },
    { name: '2000', code: '2000' },
    { name: '2001', code: '2001' },
    { name: '2002', code: '2002' },
    { name: '2003', code: '2003' },
    { name: '2004', code: '2004' },
    { name: '2005', code: '2005' },
    { name: '2006', code: '2006' }
]);

const phoneLADA = ref([
    { name: '+1', code: 'US' },
    { name: '+1', code: 'CA' },
    { name: '+7', code: 'RU' },
    { name: '+7', code: 'KZ' },
    { name: '+20', code: 'EG' },
    { name: '+27', code: 'ZA' },
    { name: '+30', code: 'GR' },
    { name: '+31', code: 'NL' },
    { name: '+32', code: 'BE' },
    { name: '+33', code: 'FR' },
    { name: '+34', code: 'ES' },
    { name: '+36', code: 'HU' },
    { name: '+39', code: 'IT' },
    { name: '+40', code: 'RO' },
    { name: '+41', code: 'CH' },
    { name: '+43', code: 'AT' },
    { name: '+44', code: 'GB' },
    { name: '+45', code: 'DK' },
    { name: '+46', code: 'SE' },
    { name: '+47', code: 'NO' },
    { name: '+48', code: 'PL' },
    { name: '+49', code: 'DE' },
    { name: '+51', code: 'PE' },
    { name: '+52', code: 'MX' },
    { name: '+53', code: 'CU' },
    { name: '+54', code: 'AR' },
    { name: '+55', code: 'BR' },
    { name: '+56', code: 'CL' },
    { name: '+57', code: 'CO' },
    { name: '+58', code: 'VE' },
    { name: '+60', code: 'MY' },
    { name: '+61', code: 'AU' },
    { name: '+62', code: 'ID' },
    { name: '+63', code: 'PH' },
    { name: '+64', code: 'NZ' },
    { name: '+65', code: 'SG' },
    { name: '+66', code: 'TH' },
    { name: '+81', code: 'JP' },
    { name: '+82', code: 'KR' },
    { name: '+84', code: 'VN' },
    { name: '+86', code: 'CN' },
    { name: '+90', code: 'TR' },
    { name: '+91', code: 'IN' },
    { name: '+92', code: 'PK' },
    { name: '+93', code: 'AF' },
    { name: '+94', code: 'LK' },
    { name: '+95', code: 'MM' },
    { name: '+98', code: 'IR' },
    { name: '+211', code: 'SS' },
    { name: '+212', code: 'MA' },
    { name: '+213', code: 'DZ' },
    { name: '+216', code: 'TN' },
    { name: '+218', code: 'LY' },
    { name: '+220', code: 'GM' },
    { name: '+221', code: 'SN' },
    { name: '+222', code: 'MR' },
    { name: '+223', code: 'ML' },
    { name: '+224', code: 'GN' },
    { name: '+225', code: 'CI' },
    { name: '+226', code: 'BF' },
    { name: '+227', code: 'NE' },
    { name: '+228', code: 'TG' },
    { name: '+229', code: 'BJ' },
    { name: '+230', code: 'MU' },
    { name: '+231', code: 'LR' },
    { name: '+232', code: 'SL' },
    { name: '+233', code: 'GH' },
    { name: '+234', code: 'NG' },
    { name: '+235', code: 'TD' },
    { name: '+236', code: 'CF' },
    { name: '+237', code: 'CM' },
    { name: '+238', code: 'CV' },
    { name: '+239', code: 'ST' },
    { name: '+240', code: 'GQ' },
    { name: '+241', code: 'GA' },
    { name: '+242', code: 'CG' },
    { name: '+243', code: 'CD' },
    { name: '+244', code: 'AO' },
    { name: '+245', code: 'GW' },
    { name: '+246', code: 'IO' },
    { name: '+248', code: 'SC' },
    { name: '+249', code: 'SD' },
    { name: '+250', code: 'RW' },
    { name: '+251', code: 'ET' },
    { name: '+252', code: 'SO' },
    { name: '+253', code: 'DJ' },
    { name: '+254', code: 'KE' },
    { name: '+255', code: 'TZ' },
    { name: '+256', code: 'UG' },
    { name: '+257', code: 'BI' },
    { name: '+258', code: 'MZ' },
    { name: '+260', code: 'ZM' },
    { name: '+261', code: 'MG' },
    { name: '+262', code: 'RE' },
    { name: '+263', code: 'ZW' },
    { name: '+264', code: 'NA' },
    { name: '+265', code: 'MW' },
    { name: '+266', code: 'LS' },
    { name: '+267', code: 'BW' },
    { name: '+268', code: 'SZ' },
    { name: '+269', code: 'KM' },
    { name: '+290', code: 'SH' },
    { name: '+291', code: 'ER' },
    { name: '+297', code: 'AW' },
    { name: '+298', code: 'FO' },
    { name: '+299', code: 'GL' },
    { name: '+350', code: 'GI' },
    { name: '+351', code: 'PT' },
    { name: '+352', code: 'LU' },
    { name: '+353', code: 'IE' },
    { name: '+354', code: 'IS' },
    { name: '+355', code: 'AL' },
    { name: '+356', code: 'MT' },
    { name: '+357', code: 'CY' },
    { name: '+358', code: 'FI' },
    { name: '+359', code: 'BG' },
    { name: '+370', code: 'LT' },
    { name: '+371', code: 'LV' },
    { name: '+372', code: 'EE' },
    { name: '+373', code: 'MD' },
    { name: '+374', code: 'AM' },
    { name: '+375', code: 'BY' },
    { name: '+376', code: 'AD' },
    { name: '+377', code: 'MC' },
    { name: '+378', code: 'SM' },
    { name: '+379', code: 'VA' },
    { name: '+380', code: 'UA' },
    { name: '+381', code: 'RS' },
    { name: '+382', code: 'ME' },
    { name: '+383', code: 'XK' },
    { name: '+385', code: 'HR' },
    { name: '+386', code: 'SI' },
    { name: '+387', code: 'BA' },
    { name: '+389', code: 'MK' },
    { name: '+420', code: 'CZ' },
    { name: '+421', code: 'SK' },
    { name: '+423', code: 'LI' },
    { name: '+500', code: 'FK' },
    { name: '+501', code: 'BZ' },
    { name: '+502', code: 'GT' },
    { name: '+503', code: 'SV' },
    { name: '+504', code: 'HN' },
    { name: '+505', code: 'NI' },
    { name: '+506', code: 'CR' },
    { name: '+507', code: 'PA' },
    { name: '+508', code: 'PM' },
    { name: '+509', code: 'HT' },
    { name: '+590', code: 'GP' },
    { name: '+591', code: 'BO' },
    { name: '+592', code: 'GY' },
    { name: '+593', code: 'EC' },
    { name: '+594', code: 'GF' },
    { name: '+595', code: 'PY' },
    { name: '+596', code: 'MQ' },
    { name: '+597', code: 'SR'}
]);

const countries = ref([
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Andorra', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cabo Verde', code: 'CV' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo (Congo-Brazzaville)', code: 'CG' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czechia (Czech Republic)', code: 'CZ' },
    { name: 'Democratic Republic of the Congo', code: 'CD' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Eswatini (fmr. "Swaziland")', code: 'SZ' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Greece', code: 'GR' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Laos', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia', code: 'FM' },
    { name: 'Moldova', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montenegro', code: 'ME' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar (formerly Burma)', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'North Korea', code: 'KP' },
    { name: 'North Macedonia', code: 'MK' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestine State', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Romania', code: 'RO' }
]);
</script>

<style scoped>
    .download_btn {
        background-color: #FF6C0E;
        color: #fff;
        cursor: pointer;
    }
    .outline_btn {
        background-color: #fff;
        color: #FF6C0E;
        cursor: pointer;
    }
    .btn-custom {
        border: 1px solid #FF6C0E;
        border-radius: 5px;
        font-weight: 700;
        font-family: 'Interstate';
        font-size: 1.1rem;
    }
    .p-breadcrumb{
        padding: unset;
        border: none;
    }
    :deep(span.p-button.p-component.p-fileupload-choose.uploadPicture){
        background-color: #82cf45;
        border-color: #82cf45;
        padding: 0.3rem 1rem;
    }
    :deep(svg.p-icon){
        color: black!important;
    }
    :deep(.p-menuitem-link .text-color){
        color: black !important;;
    }
    :deep(span.p-dropdown-label.p-inputtext.p-placeholder){
        padding: 0.4rem;
    }
    :deep(span.p-dropdown-label.p-inputtext){
        padding: 0.4rem;
    }
    @media only screen and (max-width:767px){
        .main-spacing{
            padding: 0.5rem 2rem;
        }
        :deep(input.p-inputtext.p-component.p-password-input){
            width: 22rem;
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px){
        .main-spacing{
            padding: 0.5rem 2rem;
        }
        :deep(input.p-inputtext.p-component.p-password-input){
            width: 10rem;
        }
    }
    @media only screen and (min-width:1200px){
        .main-spacing{
            padding: 2rem 7rem;
        }
    }
</style>