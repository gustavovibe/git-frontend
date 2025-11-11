<template>
  <div class="sm:py-3 " id="mobile-menu-container" >
    <Menubar :model="items" style="border: none">
      
      <template #start>
        <a href="/">
          <img src="/vibe-logo.png" style="max-width: 160px; width: 100%" />
        </a>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a
            :href="item.url"
            target="new_blank"
            v-ripple
            class="flex align-items-center"
            v-bind="props.action"
        >
          <span class="ml-2 font-semibold canaro-font">{{ item.label }}</span>
          <i
              v-if="hasSubmenu"
              :class="[
              'pi pi-angle-down',
              { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <!-- <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select a City"
            class="font-semibold"
            disabled
            style="border: none; margin: 0 8px"
        /> -->
        <span
          v-tooltip.bottom="{
                  value: 'You can choose to pay in a different currency (see the list of 135 supported currencies) at checkout.',

                  pt: {
                    text: { class: 'font-small' }
                  }
              }"
        style="font-size: 1rem;"><b>USD</b></span>

				<a href="/wishlist">
						<i
								v-if="wishCount"
								class="pi pi-heart mt-1 wish-badge-icon"
								v-badge.danger="wishCount"
						></i>
						<i
								v-else
								class="pi pi-heart mt-1 wish-badge-icon"
						></i>
				</a>

				<div class="custom-split" v-if="login">
					<div class="split-left" @click="toggleDropdown">
						<div class="avatar">{{ initial }}</div>
					</div>

					<OverlayPanel ref="menuPanel" v-if="profile_id == 1" class="custom-menu" style="padding: 0px; width: 250px;">
						<li style="list-style: none;"><b>Hi {{ name }}!</b></li>
						<ul class="menu-list">
							<li v-for="item in menuItems" :key="item.label" @click="item.command">
								<div class="flex" style="width: 100%;">
									<div class="mr-2">
										<i :class="item.icon"></i>
									</div>
									<div class="flex-1">
										<span>{{ item.label }}</span>
									</div>
									<div>
										<Badge :value="wishCount" v-if="item.label === 'Wishlist' && wishCount" />
									</div>
								</div>
							</li>
						</ul>
						<ProgressBar v-if="loading" mode="indeterminate" style="height: 6px" />
					</OverlayPanel>
				</div>

        <a v-if="!login" @click="toggleProfile()" class="custom-split">
          <!-- <Avatar label="U" class="mr-2" size="large" shape="circle" /> -->
          <div

          >
            <img  v-if="!login"
                style="height: 1.3rem; margin: 5px 7px"
                src="~/assets/icons/account-avatar.svg"
                alt=""
            />
          </div>
        </a>
      </template>
    </Menubar>
  </div>
  <Dialog
    v-model:visible="localProfileVisible"
    dismissableMask
    :showHeader="false"
    modal
    :closable="true"
    :style="{ width: '400px' }"
    :pt="{ content: { class: 'p-0' } }"
    class="login-dialog"
  >
    <profilelink />
  </Dialog>
  <Dialog v-model:visible="contact" dismissableMask modal>
    <template #header>
      <div class="contact-title">
        Get In <span style="color: #82cf45; font-style: italic">Touch</span>
      </div>
    </template>
    <contactlink />
  </Dialog>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { useRouter } from 'vue-router';
import "primeicons/primeicons.css";
import Dropdown from "primevue/dropdown";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import profilelink from "~/components/ProfileLink.vue";
import contactlink from "~/components/ContactLink.vue";
import { useProfileStore } from "~/store/profileStore";
import OverlayPanel from "primevue/overlaypanel";
import ProgressBar from "primevue/progressbar";
import destinationsHeader from '@/public/destinations-header.json';
import { useTravelerStore } from "~/store/travelerStore";
import { storeToRefs } from "pinia";

const travelerStore = useTravelerStore();
const { wishCount } = storeToRefs(travelerStore);

const loading = ref(false);
const login= ref('');

const router = useRouter();
const config = useRuntimeConfig();

const profileStore = useProfileStore();
const name = ref('');
const initial=ref('');
const profile_id = ref(0);
const menuPanel = ref(null)

const option1 =ref([
	{ label:'Admin', icon: 'pi pi-user-edit', command: () => reDirect('/admin/reports')},
  { label:'My Trips', icon: 'pi pi-send', command: () => reDirect('/my-trips')},
	{ label:'Inbox',icon: 'pi pi-inbox', command: () => reDirect('/inbox')},
	{ label:'Wishlist',icon: 'pi pi-heart', command: () => reDirect('/wishlist')},
	{ label:'Personal details',icon: 'pi pi-user', command: () => reDirect('/personal-details')},
	{ label:'Log out', icon: 'pi pi-sign-out', command: () => toggleProfile()},
]);
const option2 =ref([
  { label:'My Trips',icon: 'pi pi-send', command: () => reDirect('/my-trips')},
	{ label:'Inbox',icon: 'pi pi-inbox', command: () => reDirect('/inbox')},
	{ label:'Wishlist',icon: 'pi pi-heart', command: () => reDirect('/wishlist')},
	{ label:'Personal details',icon: 'pi pi-user', command: () => reDirect('/personal-details')},
	{ label:'Log out', icon: 'pi pi-sign-out', command: () => toggleProfile()},
]);

const menuItems = ref([]);

const selectedCity = ref({ name: "USD", code: "NY" });

const cities = ref([
  { name: "USD", code: "NY" },
  { name: "CAD", code: "RM" },
  { name: "EUR", code: "LDN" },
  { name: "GBP", code: "IST" },
  { name: "MXN", code: "PRS" },
  { name: "AUD", code: "NY" },
  { name: "BRL", code: "RM" },
  { name: "JPY", code: "LDN" },
  { name: "INR", code: "IST" },
  { name: "CNY", code: "PRS" },
  { name: "CHF", code: "NY" },
]);

const showContact = () => {
  contact.value = true;
};


const url = ref(config.public.BACKEND_URL);
const traveler_id = ref(0);


const checkUser = async () => {
  // let storedTravelerId = traveler_id.value || localStorage.getItem('travelerId');
  // if (storedTravelerId) {
  //   traveler_id.value = storedTravelerId;
  //   await travelerStore.getWishCount(traveler_id.value, config.public.BACKEND_URL);
  //   console.log("wishCount in header", wishCount.value);
  //   return;
  // }

  // If not set, get it using user_id
  const userId = localStorage.getItem('user_id');
  if (userId) {
    const response = await travelerStore.user_travelerId({ id: userId }, url.value);
    if (response.success) {
      traveler_id.value = response.data;
      localStorage.setItem('user_travelerId', response.data);
      localStorage.setItem('travelerId', response.data);
      await travelerStore.getWishCount(userId, config.public.BACKEND_URL);
      console.log("wishCount in header", wishCount.value);
    }
  }

};

onMounted(async () => {
  await checkUser();
});

const contact = ref(false);

const localProfileVisible = ref(profileStore.profile);

const toggleDropdown = (event) => {
	menuPanel.value.toggle(event)
};

watch(profileStore, (newValue) => {
  console.log("watch profileStore.profile",profileStore.profile);
	if(profileStore.profile == true){
  		localProfileVisible.value = false;
	}else {
		localProfileVisible.value = true;
	}
  console.log("localProfileVisible.value",localProfileVisible.value);
});

const toggleProfile = () => {
  console.log("profileStore.profile",profileStore.profile);
localProfileVisible.value = true;
};

const reDirect=(value)=>{
  menuPanel.value?.hide();
  router.push(value);
}
const Home=()=>{
	loading.value=true;
	setTimeout(() => {
      profileStore.closeModalProfile();
	  window.location.href = `/`;
	  loading.value=false;
    }, 3000);
}

const filteredItems = ref([]);

const items = computed(() => [
  {
    label: "Destinations",
    items: filteredItems.value,
  },
/*		
  {
    label: "Adventures styles",  
    items: [
      {
        label: "Active Adventures",
        url: "/tours/?search=true&type=tour_type&t_id=385",
      },
      {
        label: "Festival & Events",
        url: "/tours/?search=true&type=tour_type&t_id=381",
      },
      {
        label: "Hiking & Trekking",
        url: "/tours/?search=true&type=tour_type&t_id=73",
      },
      {
        label: "River Cruises",
        url: "/tours/?search=true&type=tour_type&t_id=209",
      },
      {
        label: "Bicycle Tours",
        url: "/tours/?search=true&type=tour_type&t_id=32",
      },
      {
        label: "Food & Culinary",
        url: "/tours/?search=true&type=tour_type&t_id=178",
      },
      {
        label: "In depth Cultural",
        url: "/tours/?search=true&type=tour_type&t_id=77",
      },
      { label: "Safari", url: "/tours/?search=true&type=tour_type&t_id=189" },
      { label: "Explorer", url: "/tours/?search=true&type=tour_type&t_id=383" },
      {
        label: "Health & Spa",
        url: "/tours/?search=true&type=tour_type&t_id=330",
      },
      {
        label: "Overland Truck",
        url: "/tours/?search=true&type=tour_type&t_id=4",
      },
      { label: "Sailing", url: "/tours/?search=true&type=tour_type&t_id=56" },
    ],
  },
*/  
  {
    label: "Contact",
    url: "/contact"
  },
]);


const destinations = ref(destinationsHeader);

let validCountrySet = new Set();

// Function to filter items by country
function filterItemsByCountry(items) {
  return items.map(group => {
    // console.log("Group:", group);
    if (group.items && Array.isArray(group.items)) {
      // console.log("Group items:", group.items);
          // Filter countries by checking against the validCountrySet
          const filteredCountries = group.items.filter(item => {
            const normalizedLabel = item.label.trim().toLowerCase();
            const isValid = validCountrySet.has(normalizedLabel);
            // console.log(`Checking item: ${item.label}, normalized: ${normalizedLabel}, isValid: ${isValid}`);
            return isValid; // Only return if the item is in the set
          });
      return { ...group, items: filteredCountries };
    }
    return group;
  });
}

onMounted(() => {
	login.value= localStorage.getItem('user_id');
	profile_id.value= localStorage.getItem('profile_id');
	name.value= localStorage.getItem('name');
	if (name.value && name.value.trim() !== '') {
  initial.value = name.value.trim().charAt(0).toUpperCase();
}
	menuItems.value=profile_id.value==1? option1.value:option2.value;
	console.log('contenido de login',login.value);
  nextTick(async () => {
    const result = await useFetch(`${config.public.BACKEND_URL}/api/destinationsV2?categoryFilter=country&perPage=200`);
    // console.log("API result:", result);

    if (result && result.data.value && result.data.value.data) {
      const apiCountries = result.data.value.data.data;
     // console.log("API countries data:", apiCountries);

      // Normalize and update validCountrySet with names from the API
      validCountrySet = new Set(apiCountries.map(country => country.name.trim().toLowerCase()));
      // console.log("Valid Country Set:", validCountrySet);

      const filtered = filterItemsByCountry(destinations.value);
      filteredItems.value = filtered;

      // console.log("Filtered Items:", filtered);
    }
  });
});



</script>
<style>
.p-tooltip .p-tooltip-text.font-small {
  font-size: 0.75rem;
}
.p-menubar-root-list {
  margin-left: auto;
}

.p-menubar-end {
  display: flex;
  align-items: center;
  margin-left: 0;
  gap: 1.5rem;
	margin-left: 10px;
}

.p-menubar {
  justify-content: space-between;
}

.p-menubar-button {
	color: #82cf45;
	border: none;
}
.p-menubar-button> .p-icon{
	width: 1.5rem;
	height: 1.5rem;
	margin-top: 0.5rem;
}

.wish-badge-icon{
	font-size: 1.5rem; 
	color: #82cf45; 
	margin-right: 1.0rem;
}
@media only screen and (max-width: 967px) {

  .p-menubar-button {
    position: absolute;
    top: 1.15rem;
    background: none;
		right: 4rem;
  }

	.wish-badge-icon{
		margin-right: 2rem !important
	}
	
}

@media all and (max-width:768px){
	.destinations-menu .p-submenu-list {
  	column-count: 2 !important;
	}

  #mobile-menu-container {
    position: fixed;
    top: 0;
    z-index: 10;
		width: 100%;
		background: #fff;
  }

  .p-menubar:not(.p-menubar-mobile) {
    position: relative;
  }

	html, body, .main{
		overflow-y: scroll;
	}
}
#mobile-menu-container{

	max-width: 1240px;
	margin: 0 auto;

}

.destinations-menu .p-submenu-list {
  column-count: 3;
}

.p-tabview .p-tabview-nav {
  border: 0;
  border-width: 0;
  border-radius: 0;
}

.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #82cf45;
  color: white;
  border-radius: 0;
}

.login-dialog .p-tabview-header {
  width: 50%;
  text-align: center;
}

.login-dialog .p-tabview-header a {
  text-align: center;
  width: 100%;
  display: block;
}

.p-dialog {
  border-radius: 0;
  box-shadow: none;
}

.white-icon {
  color: white;
}


.custom-split {
  display: flex;
  align-items: center;
  border: 2px  #82cf45;
  border-radius: 8px;
  padding: 5px;
  cursor: pointer;
  position: relative;
	right: 0;
}

.split-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name {
  font-weight: bold;
  color: black;
}

.avatar {
  height: 2.5rem;
  width: 2.5rem;
  border: 1.5px solid #82cf45;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #82cf45;
  color: white;
  font-weight: bold;
}

.dropdown-icon {
  font-size: 1.2rem;
  color: #82cf45;
  margin-left: auto;
}

.custom-menu {
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-list li:hover {
  background: #82CF45;
  color: white;
}

</style>

<style scoped>
.p-inputtext,
.p-checkbox-input {
  border: unset !important;
}
</style>