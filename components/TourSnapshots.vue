<style scoped>
.section {
  max-width: 1440px;
  margin: 100px auto;
}

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

.section-title {
  margin-top: 0px;
  font-family: Canaro;
  font-weight: 700;
  line-height: 70px;
}

.section-p {
  max-width: 730px;
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
  border-radius:8px !important;
  font-family: interstate !important;
}

.p-dropdown .p-dropdown-trigger {
  color: #FF6C0E !important;
}

.p-dropdown {
  border: 1px solid #FF6C0E !important;
  border-radius:8px !important;
}

.tour-card {
  background: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  max-width: 95%;
  margin: auto;
  height: 569px;
}

.tour-img {
  width: 100%;
  border-radius: 12px 12px 0px 0px;
  background-size: cover;
  background-position: center;
}

.tour-name {
  color: #000;
  font-family: Canaro;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  /* 150% */
}

.reviews {
  display: flex;
  margin-top: 20px;
}

.location {
  color: #000;
  text-align: center;
  font-family: 'Interstate';
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.8px;
  display: flex;
}

.price {
  color: #82CF45;
  font-family: Alef;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.border-bottom {
  border-top: 1px solid #818181;
  padding-top: 20px;
}

.time {
  display: flex;
  color: #000;
  text-align: center;
  font-family: 'Interstate';
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.8px;
}

.tour-detail {
  padding: 28px 19px 32px 19px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
}

@media only screen and (max-width:767px) {
  .tour-name {
    height: 60px;
  }

  .tour-img {
    height: 200px;
  }

  .location,
  .time,
  .tour-name {
    font-size: 16px;
  }

  .price {
    font-size: 18px
  }

  .green-section {
    padding: 16px;
  }

  .section-title {
    font-size: 26px;
  }
  .animation-airplane{
    height: 350px;
    width: 350px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .tour-name {
    height: 80px;
  }

  .tour-img {
    height: 250px;
  }

  .location,
  .time,
  .tour-name {
    font-size: 20px;
  }

  .price {
    font-size: 22px
  }

  .green-section {
    padding: 70px 1%;
  }

  .section-title {
    font-size: 36px;
  }
  .animation-airplane{
    height: 300px;
    width: 300px;
  }
}

@media only screen and (min-width:1200px) {
  .page-margin {
    padding: 5rem 10rem;
  }

  .tour-name {
    height: 90px;
  }

  .tour-img {
    height: 300px;
  }

  .location,
  .time,
  .tour-name {
    font-size: 22px;
  }

  .price {
    font-size: 24px
  }

  .layout-content {
    padding: 0 !important;
  }

  .green-section {
    padding: 100px 0;
  }

  .section-title {
    font-size: 46px;
  }
  .animation-airplane{
    height: 400px;
    width: 400px;
  }
}

.p-carousel-prev {
  position: absolute !important;
  left: 0px !important;
  z-index: 2 !important;
  border: 1px solid orange !important;
  background: white !important;
  border-radius: 0 !important;
}

.p-carousel-prev path {
  fill: orange !important;
}

.p-carousel-next {
  position: absolute !important;
  right: 0px !important;
  z-index: 2 !important;
  border: 1px solid orange !important;
  background: white !important;
  border-radius: 0 !important;
}

.p-carousel-next path {
  fill: orange !important;
}

.green-section {
  width: 100%;
  background-color: #f8fcf6;
}
.pi.pi-heart{
  color: #82cf45;
}
.pi-heart-fill{
  color:#EF4444;
}
</style>

<template>
  <div class="green-section page-margin">
    <div style="max-width:1240px;margin:0 auto; auto">
      <div class="grid">
        <div class="col-12 md:col-9">
          <h2 class="section-title text-5xl">Popular <span style="color: #82cf45; font-style: italic;">Adventures</span>
          </h2>
          <p class="section-p font-light">Embark on extraordinary adventures handpicked just for you. Dive into our
            selection of
            featured tours, carefully curated to offer the pinnacle of exploration and discovery.</p>
        </div>
        <div class="col-12 md:col-3 card flex" style="justify-content: end; margin-bottom: 10px;">
          <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="By travel style"
            class="w-full md:w-14rem home-filter" @change="handleCategoryChange($event)" />
        </div>
      </div>
      <div v-if="tours.length >= 3">
       <Carousel v-if="tours.length >= 3" :value="tours" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
        <template #item="slotProps" class="tour-slide">
          <div class="tour-card">

              <div class="tour-img" :style="{ backgroundImage: 'url(' + slotProps.data.main_image + ')' }">
				  <div class="text-right pt-3">
                    <i v-tooltip="'Save this adventure to a Wishlist to see it later.'"
                      @click="toggleWishlist(slotProps.data.tour_id)"
                      :class="{
                        'pi pi-heart mr-3': !isTourInWishlist(slotProps.data.tour_id),
                        'pi pi-heart-fill mr-3': isTourInWishlist(slotProps.data.tour_id)
                      }" style="font-size: 25px;z-index: 9;
    display: block;
    position: relative;
    pointer-events: all;
    cursor: pointer;"
                    ></i>
                  </div>
              </div>

            <div class="tour-detail"><a :href="'/tour?search=true&tourId=' + slotProps.data.tour_id" target="_blank" style="text-decoration: none;">
              <span class="location text-base" style ="color: #82cf45;">
                <img src="/filter-icons/destinations.svg" />
				  &nbsp;&nbsp;{{ slotProps.data?.countries[0]?.country.name }} <div v-tooltip="slotProps.data?.RestOfCountries" v-if="slotProps.data?.LengthOfCountries > 0" > + {{slotProps.data?.LengthOfCountries}} countrie(s)</div></span>
              <span class="reviews text-sm"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 0L10.202 5.658L16 6.11145L11.5629 10.0617L12.9443 16L8 12.7835L3.05573 16L4.43724 10.0617L0 6.11145L5.79805 5.658L8 0Z"
                    fill="#FFD600" />
                </svg>&nbsp;&nbsp;
                <div v-if="slotProps.data.reviews_count > 0" style="color: gray;">({{ slotProps.data.reviews_count }}+ Review)</div>
              </span>
              <h3 class="tour-name text-lg font-medium">{{ slotProps.data.tour_name }}</h3>
              <div class="border-bottom flex justify-content-between">
                <span style="color: #82cf45; font-weight: 600;" v-tooltip="'The price is approximate, based on the historic average, including economy-class flights for one adult from New York City. The actual booking price may vary depending on the departure location, number and age of travel dates, airline, and other factors.'">
					        from ${{ Math.ceil(slotProps.data.totalPrice || 0) }}
				        </span>
                <span class="time text-sm">
                  <img src="/filter-icons/duration.svg" />
                  {{ slotProps.data.tour_length_days }} days
                </span>
			</div></a>
            </div>
          </div>
        </template>
        </Carousel>
	    </div>
      <div v-if="isLoading" class="loading-container">
        <DotLottieVue class="animation-airplane" autoplay loop src="https://lottie.host/6d57cb1e-3790-4dd6-9e86-2eaad9430e6e/cdBLGv9UNo.lottie" />
        <div class="canaro-font text-xl font-semibold pb-5 text-center" style="max-width: 700px;">
          <template v-if="showMainMessage">
            We are loading the best trips for you! ✈️ It can take 10–20 seconds ⏳
          </template>
          <template v-else>
            💡 Travel Tip: {{ currentTip }}
          </template>
        </div>
      </div>
      <!-- END GRID -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive} from 'vue';
import Dropdown from 'primevue/dropdown';
import Carousel from 'primevue/carousel';
import dayjs from 'dayjs';
import { generalFunctions } from '@/store/general';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import TravelTips from "public/data/travelTips";
import Tooltip from 'primevue/tooltip';
import { onUnmounted } from 'vue';

const showMainMessage = ref(true);
const currentTip = ref('');
let tipInterval = null;

const setRandomTip = () => {
  const index = Math.floor(Math.random() * TravelTips.length);
  currentTip.value = TravelTips[index];
  //console.log("New tip:", currentTip.value);
};


const config = useRuntimeConfig();
const generalStore = generalFunctions();
const isLoading = ref(true);
const selectedCategory = ref({ name: 'Show all', code: 'all' });

const categories = ref([
  { name: 'Show all', code: 'all' },
  { name: 'Overland Truck', code: '4' },
  { name: 'Bicycle', code: '32' },
  { name: 'Sailing', code: '56' },
  { name: 'Hiking & Trekking', code: '73' },
  { name: 'Food & Culinary', code: '178' },
  { name: 'Safari', code: '189' },
  { name: 'River Cruise', code: '209' },
  { name: 'Festival & Events', code: '381' },
  { name: 'Explorer', code: '383' },
]);

const firstDayNextMonth = dayjs().add(2, 'month').startOf('month').format('YYYY/MM/DD');
const lastDayNextMonth = dayjs().add(2, 'month').endOf('month').format('YYYY/MM/DD');
const ranges = ref([firstDayNextMonth, lastDayNextMonth]);

const tours = ref([]);
const toursCache = reactive({});

async function loadToursForCategory(code) {
  // 1) If we’ve already fetched this category before, just pull from cache
  if (toursCache[code]) {
    tours.value = toursCache[code]
    isLoading.value = false
    console.log(`Loaded tours for ${code} from cache`)
    return
  }

  // 2) Otherwise, do the API loop exactly as you have it now
  isLoading.value = true
  tours.value = []
  let page = 1

  // fetch tour IDs…
  const idsUrl = await constructIdsRequest(selectedCategory.value);
  const idsData = await useFetch(idsUrl, {
    headers: { 'accept': 'application/json' },
  });

  if (!idsData.data.value || !idsData.data.value.data) {
    console.log("No tour IDs found.");
    return;
  }

  let tourIds = idsData.data;
  console.log("tourIds",tourIds);
  tours.value = tourIds.value;
  // 3) Save into cache and flip loading off
  toursCache[code] = [...tourIds.value]
  isLoading.value = false
  console.log(`Fetched and cached tours for ${code}`)
}

const constructIdsRequest = (selectedCategory) => {
  console.log("constructIdsRequest selectedCategory", selectedCategory);
  let destinationParams;
  if (selectedCategory.code === 'all') {
    const allCodes = categories.value
      .filter(category => category.code !== 'all')
      .map(category => category.code)
      .join(',');
    destinationParams = `categories=${allCodes}`;
  } else {
	console.log("selectedCategory.code",selectedCategory.code)
    destinationParams = `categories=${selectedCategory.code}`;
  }
	console.log(`https://vibeadventures.be/api/snapshots?${destinationParams}`);
  return `${config.public.BACKEND_URL}/api/snapshots?${destinationParams}`;
};

onMounted(async () => {
  setTimeout(() => {
    showMainMessage.value = false;
    setRandomTip();
    tipInterval = setInterval(setRandomTip, 5000);
  }, 5000);
  loadToursForCategory(selectedCategory.value.code);
});
onUnmounted(() => {
  if (tipInterval) clearInterval(tipInterval);
});
const handleCategoryChange = (event) => {
  console.log("event.value: ",event.value);
  isLoading.value = true;
  const selectedValue = event.value;
  selectedCategory.value = event.value;
  //tours.value = [];
  loadToursForCategory(event.value.code)
};

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const wishlistItems = ref([]);

const toggleWishlist = async (tourId) => {

  if(!userId.value){
    localProfileVisible.value = true;
    return;
  }

  var actionUrl = isTourInWishlist(tourId) ? `${config.public.BACKEND_URL}/api/wishlist-delete-by-tour` : `${config.public.BACKEND_URL}/api/wishlists-add`;
  try {
    const userIdValue = localStorage.getItem('user_id');
    const response = await fetch(actionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tour_id: tourId,
        user_id: userIdValue
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add item to wishlist");
    }

    const data = await response.json();
    if (data.tour_id) {
      if (!wishlistItems.value.includes(data.tour_id)) {
        wishlistItems.value = [...wishlistItems.value, data.tour_id];
      }
    }

    showToast(data.message);

  } catch (error) {
    console.error("Failed to add item to wishlist:", error);
  }
};
const fetchWishlist = async () => {

  if(user_travelerId.value){

    var items = [];
    const url_wishlist = `${config.public.BACKEND_URL}/api/wishlists?id=${user_travelerId.value}`;
    const response = await fetch(url_wishlist);
    const data = await response.json();
    items = data.data;
    wishlistItems.value =  items.map(item => item.tour_id);

  }

};

function isTourInWishlist(tourId){
  return wishlistItems.value.includes(tourId);
};
</script>
