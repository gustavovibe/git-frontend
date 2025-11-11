<style scoped>
@font-face {
  font-family: 'Canaro';
  src: url(/fonts/canaro-l.ttf);
  font-weight: normal;
}

@font-face {
  font-family: 'Interstate';
  src: url(/fonts/Interstate-regular.ttf);
  font-weight: 100 !important;
}

.destination-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.destination-overlay {
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%);
  border-radius: 16px;
  transition: display 0.3s ease;
}

.destination-name {
  position: absolute;
  bottom: 40px;
  left: 10px;
  color: white;
  font-size: 24px;
  font-family: 'Canaro';
  font-weight: 600;
  word-wrap: break-word;
  transition: display 0.3s ease;
}

.destination-desc {
  position: absolute;
  display: block;
  width: 200px;
  margin-top: 10px;
  font-size: 14px;
  font-family: 'Canaro';
  font-weight: 600;
  word-wrap: break-word;
	bottom: -25px;
}


.section-title {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: Canaro;
  font-weight: 700;
  line-height: 70px;
}


p {
  font-family: 'Interstate';
  color: rgba(0, 0, 0, 0.70);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  /* 144.444% */
  letter-spacing: 0.72px;
}

.home-filter {
  height: fit-content;
  align-self: center;
}

.p-dropdown .p-dropdown-label.p-placeholder {
  color: #FF6C0E !important;
  font-family: interstate !important;
}

.p-dropdown .p-dropdown-trigger {
  color: #FF6C0E !important;
}

.p-dropdown {
  border: 1px solid #FF6C0E !important;
  border-radius:8px !important;
}

.destination-container {
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 16px;
}

@media only screen and (max-width:767px) {
  .destination-container {
    height: 200px;
  }

  .section-title {
    font-size: 26px;
  }

  .section {
    margin: 50px auto;
    padding: 16px ;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .destination-container {
    height: 300px;
  }

  .section-title {
    font-size: 36px;
  }

  .section {
    padding: 0px 1%;
  }
}

@media only screen and (min-width:1200px) {
  .destination-container {
    height: 400px;
  }

  .section-title {
    font-size: 46px;
  }

  .page-mnpmargin {
    padding: 5rem 10rem;
  }
}

</style>

<template>
  <div class="section page-margin">
    <div class="grid">
      <div class="col-12 md:col-9">
        <h2 class="section-title text-5xl">Top <span style="color: #82cf45;font-style: italic;">Destinations</span></h2>
      </div>
      <div class="col-12 md:col-3 card flex" style="justify-content: end;margin-bottom: 10px;">
        <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="By Region"
          class="w-full md:w-14rem home-filter" @change="handleCategoryChange($event)" />
      </div>
    </div>
    <p class="font-light">
      Discover our handpicked top destinations, offering unique experiences crafted for your next
      unforgettable adventure.
    </p>
    <!-- Destinations Gallery Grid -->
    <div class="grid" v-if="items">
      <div v-for="item in filteredItems" :key="item.name"
        :class="['column', item.category, 'col-6', 'md:col-4', 'lg:col-3']">
        <a :href="item.url" target="new_blank" class="destination-content">
          <div class="destination-container" :style="{ backgroundImage: 'url(' + item.image + ')' }">
          </div>
          <div class="destination-overlay"></div>
          <div class="destination-name text-xl ml-3">
            {{ item.name }}
            <div class="destination-desc text-green-vibe">
							{{ item.description }}
						</div>
          </div>
        </a>
      </div>
    </div>
    <!-- END GRID -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import Dropdown from 'primevue/dropdown';
const config = useRuntimeConfig();
const selectedCategory = ref(null);
let validCountrySet = new Set();

const categories = ref([
  { name: "Show all", code: "all" },
  { name: "Africa", code: "africa" },
  { name: "Asia", code: "asia" },
  { name: "Australia & Oceania", code: "oceania" },
  { name: "Europe", code: "europe" },
  { name: "North America", code: "northamerica" },
  { name: "Latin America", code: "latinamerica" },
]);

const destinations = ref([
  {
    "name": "Canada",
    "category": "northamerica",
    "image": "images/destinations/canada.webp",
    "description": "59 tours",
    "url": "/tours/?search=true&type=country&t_id=32"
  },
  {
    "name": "Dominican Republic",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/dominicanRepublic.jpg",
    "description": "60 tours",
    "url": "/tours/?search=true&type=country&t_id=51"
  },
  {
    "name": "France",
    "category": "europe",
    "image": "images/destinations/europe/francia.jpg",
    "description": "75 tours",
    "url": "/tours/?search=true&type=country&t_id=62"
  },
  {
    "name": "Germany",
    "category": "europe",
    "image": "images/destinations/europe/alemania.jpg",
    "description": "57 tours",
    "url": "/tours/?search=true&type=country&t_id=66"
  },
  {
    "name": "Italy",
    "category": "europe",
    "image": "images/destinations/europe/italia.jpg",
    "description": "133 tours",
    "url": "/tours/?search=true&type=country&t_id=84"
  },
  {
    "name": "Mexico",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/mexico.jpg",
    "description": "49 tours",
    "url": "/tours/?search=true&type=country&t_id=113"
  },
  {
    "name": "Spain",
    "category": "europe",
    "image": "images/destinations/europe/spain.jpg",
    "description": "65 tours",
    "url": "/tours/?search=true&type=country&t_id=162"
  },
  {
    "name": "United Kingdom",
    "category": "europe",
    "image": "images/destinations/europe/unitedKingdom.jpg",
    "description": "63 tours",
    "url": "/tours/?search=true&type=country&t_id=214"
  },
  {
    "name": "Egypt",
    "category": "africa",
    "image": "images/destinations/africa/egypt.jpg",
    "description": "44 tours",
    "url": "/tours/?search=true&type=country&t_id=54"
  },
  {
    "name": "Ethiopia",
    "category": "africa",
    "image": "images/destinations/africa/ethiopia.jpg",
    "description": "100 tours",
    "url": "/tours/?search=true&type=country&t_id=59"
  },
  {
    "name": "Kenya",
    "category": "africa",
    "image": "images/destinations/kenya.webp",
    "description": "57 tours",
    "url": "/tours/?search=true&type=country&t_id=89"
  },
  {
    "name": "Morocco",
    "category": "africa",
    "image": "images/destinations/africa/moroco.jpg",
    "description": "52 tours",
    "url": "/tours/?search=true&type=country&t_id=119"
  },
  {
    "name": "South Africa",
    "category": "africa",
    "image": "images/destinations/africa/sudafrica.jpg",
    "description": "60 tours",
    "url": "/tours/?search=true&type=country&t_id=161"
  },
  {
    "name": "Tanzania",
    "category": "africa",
    "image": "images/destinations/africa/tanzania.jpg",
    "description": "72 tours",
    "url": "/tours/?search=true&type=country&t_id=172"
  },
  {
    "name": "China",
    "category": "asia",
    "image": "images/destinations/asia/china.jpg",
    "description": "12 tours",
    "url": "/tours/?search=true&type=country&t_id=37"
  },
  {
    "name": "India",
    "category": "asia",
    "image": "images/destinations/asia/india.jpg",
    "description": "68 tours",
    "url": "/tours/?search=true&type=country&t_id=78"
  },
  {
    "name": "Indonesia",
    "category": "asia",
    "image": "images/destinations/asia/indonesia.jpg",
    "description": "25 tours",
    "url": "/tours/?search=true&type=country&t_id=79"
  },
  {
    "name": "Japan",
    "category": "asia",
    "image": "images/destinations/japan.webp",
    "description": "26 tours",
    "url": "/tours/?search=true&type=country&t_id=86"
  },
  {
    "name": "Thailand",
    "category": "asia",
    "image": "images/destinations/asia/thailand.jpg",
    "description": "104 tours",
    "url": "/tours/?search=true&type=country&t_id=173"
  },
  {
    "name": "Philippines",
    "category": "asia",
    "image": "images/destinations/asia/philippines.jpg",
    "description": "80 tours",
    "url": "/tours/?search=true&type=country&t_id=138"
  },
  {
    "name": "Vietnam",
    "category": "asia",
    "image": "images/destinations/asia/vietnam.jpg",
    "description": "81 tours",
    "url": "/tours/?search=true&type=country&t_id=191"
  },
  {
    "name": "Australia",
    "category": "oceania",
    "image": "images/destinations/oceania/australia.jpg",
    "description": "106 tours",
    "url": "/tours/?search=true&type=country&t_id=10"
  },
  {
    "name": "Cook Islands",
    "category": "oceania",
    "image": "images/destinations/oceania/cook-islands.jpg",
    "description": "1 tours",
    "url": "/tours/?search=true&type=country&t_id=294"
  },
  {
    "name": "French Polynesia",
    "category": "oceania",
    "image": "images/destinations/oceania/french-polynesia.jpg",
    "description": "100 tours",
    "url": "/tours/?search=true&type=country&t_id=221"
  },
  {
    "name": "New Zealand",
    "category": "oceania",
    "image": "images/destinations/oceania/new-zealand.jpg",
    "description": "50 tours",
    "url": "/tours/?search=true&type=country&t_id=126"
  },
  {
    "name": "Papua New Guinea",
    "category": "oceania",
    "image": "images/destinations/oceania/australia.jpg",
    "description": "2 tours",
    "url": "/tours/?search=true&type=country&t_id=135"
  },
  {
    "name": "Austria",
    "category": "europe",
    "image": "images/destinations/europe/austria.jpg",
    "description": "5 tours",
    "url": "/tours/?search=true&type=country&t_id=11"
  },
  {
    "name": "Czech Republic",
    "category": "europe",
    "image": "images/destinations/europe/czechRepublic.jpg",
    "description": "15 tours",
    "url": "/tours/?search=true&type=country&t_id=47"
  },
  {
    "name": "Netherlands",
    "category": "europe",
    "image": "images/destinations/europe/netherlands.jpg",
    "description": "25 tours",
    "url": "/tours/?search=true&type=country&t_id=196"
  },
  {
    "name": "USA",
    "category": "northamerica",
    "image": "images/destinations/northamerica/usa.jpg",
    "description": "183 tours",
    "url": "/tours/?search=true&type=country&t_id=185"
  },
  {
    "name": "Argentina",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/argentina.jpg",
    "description": "66 tours",
    "url": "/tours/?search=true&type=country&t_id=8"
  },
  {
    "name": "Brazil",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/brazil.jpg",
    "description": "47 tours",
    "url": "/tours/?search=true&type=country&t_id=25"
  },
  {
    "name": "Colombia",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/colombia.jpg",
    "description": "12 tours",
    "url": "/tours/?search=true&type=country&t_id=38"
  },
  {
    "name": "Guatemala",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/guatemala.jpg",
    "description": "12 tours",
    "url": "/tours/?search=true&type=country&t_id=70"
  },
  {
    "name": "Jamaica",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/jamaica.jpg",
    "description": "2 tours",
    "url": "/tours/?search=true&type=country&t_id=85"
  },
  {
    "name": "Peru",
    "category": "latinamerica",
    "image": "images/destinations/latinamerica/peru.jpg",
    "description": "91 tours",
    "url": "/tours/?search=true&type=country&t_id=137"
  }
]);

const filteredItems = computed(() => {
  let filtered = [];
  if (selectedCategory.value === 'all') {
    filtered = items.value;
  } else {
    filtered = items.value.filter((item) => item.category === selectedCategory.value);
  }
  // Limit the number of items to 5
  return filtered.slice(0, 8);
});

const handleCategoryChange = (event) => {
  const selectedValue = event.value.code;
  selectedCategory.value = selectedValue;
};

const items = ref([]);

const filterItemsByCountry = (items, validCountrySet) => {
  return items.filter(item =>
    validCountrySet.has(item.name.trim().toLowerCase())
  );
};

const isPopular = (description) => {
	const num = parseInt(description.replace(/\D/g, ''))
	return num > 50
}

onMounted(() => {
  nextTick(async () => {
    const result = await useFetch(`${config.public.BACKEND_URL}/api/destinationsV2?categoryFilter=country&perPage=200`);
	if (result && result.data.value && result.data.value.data) {
    const apiCountries = result.data.value.data.data;
		validCountrySet = new Set(apiCountries.map(country => country.name.trim().toLowerCase()));
		const filtered = filterItemsByCountry(destinations.value, validCountrySet);
		items.value = filtered;
		console.log("top destinations",items.value);
	}
  	selectedCategory.value = 'all';
  });
});

</script>
