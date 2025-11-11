<script setup>
import Carousel from 'primevue/carousel';
import Dropdown from 'primevue/dropdown';
import { ref, onMounted, computed } from 'vue';

const accessToken = ref('');
const selectedCategory = ref('all');

const getAccessToken = async () => {
  try {
    const clientId = 'hpg0tvme3ujrwcnd6fcyttwst8';
    const clientSecret = 'mjjqpzhg19rifw174ehlw1a56nufbvwxrcya2w4bz32dsbjf594';

    const response = await fetch('https://oauth.api.sandbox.b2b.tourradar.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'scope': 'com.tourradar.tours/read',
      }),
    });

    const data = await response.json();

    accessToken.value = data.access_token;
    console.log('TourRadar Access Token:', accessToken.value);
  } catch (error) {
    console.error('Error fetching access token', error);
    throw error;
  }
};


const constructTourRadarAPI = (...selectedStyles) => {
  return `https://api.sandbox.b2b.tourradar.com/v1/tours/search?&tour_type=${selectedStyles}&limit=10&sort_by=price&sort_order=asc&is_instant_confirmable=true&currency=USD&user_country=185`;
};

const searchTours = async () => {
  const selectedStylesList = [4, 32, 56, 73, 77, 178, 189, 209, 381, 383];

  try {
    for (const selectedStyle of selectedStylesList) {
      const tourradarAPI = constructTourRadarAPI(selectedStyle);
      const tourradarResponse = await useFetch(tourradarAPI, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken.value}`,
          'Accept-Language': 'en',
        },
      });

      const tourradarData = tourradarResponse.data;
      console.log(`Tour Radar Data for style ${selectedStyle}: `, tourradarData);
      // Process the received data and push items to the array
      for (let i = 0; i < tourradarData.value.items.length; i++) {
        const tour = tourradarData.value.items[i];
        const newItem = {
          name: tour.tour_name,
          category: String(selectedStyle),
          image: tour.images[0].url,
          location: tour.start_city.city_name,
          reviews: tour.reviews_count,
          price: tour.prices.price_total,
          duration: tour.tour_length_days,
          tourId: tour.tour_id,
          url: `/tour?id=${tour.tour_id}`
        };

        // Push the new item to the items array
        items.value.push(newItem);

        // Log the pushed item every 10 items
        if ((i + 1) % 10 === 0) {
          console.log(`Pushed ${i + 1} items to the array:`, items.value.slice(-10));
        }
      }

      // Introduce a 1-second delay between each API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Error fetching tour data', error);
    throw error;
  }
};

onMounted(async () => {
  await getAccessToken();
  await searchTours();
  console.log('Final array of items:', items.value);
});

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

const items = ref([
  {
    "name": "Delta & Falls Westbound: Natural Wonders & Wildlife",
    "category": "4",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/36232_8dcd6c.jpg",
    "location": "Victoria Falls",
    "reviews": 9,
    "price": 1011.75,
    "duration": 8
  },
  {
    "name": "Yucatan Adventure: Merida, Tulum & Jungle Swims",
    "category": "32",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/224221_ba380199.jpg",
    "location": "Merida",
    "reviews": 5,
    "price": 509.25,
    "duration": 6
  },
  {
    "name": "Halong Bay Junk Cruise",
    "category": "56",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/4469_b76b4f7a.jpg",
    "location": "Hanoi",
    "reviews": 0,
    "price": 300,
    "duration": 2
  },
  {
    "name": "Northern Thailand Hilltribes Trek",
    "category": "73",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/60444_e53da9e1.jpg",
    "location": "Chiang Mai",
    "reviews": 23,
    "price": 279.3,
    "duration": 5
  },
  {
    "name": "Mekong Delta Farmstay",
    "category": "77",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/4466_6ef8ea34.jpg",
    "location": "Ho Chi Minh City",
    "reviews": 0,
    "price": 275,
    "duration": 2
  },
  {
    "name": "Thailand Adventure: Bangkok, Chiang Mai & Street Food Crawls",
    "category": "178",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/224032_82ca19ed.jpg",
    "location": "Bangkok",
    "reviews": 4,
    "price": 449.25,
    "duration": 7
  },
  {
    "name": "Chobe National Park Short Break",
    "category": "189",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/103052_40615b49.jpg",
    "location": "Kasane",
    "reviews": 2,
    "price": 327,
    "duration": 3
  },
  {
    "name": "Nile Jewel - 5* Cruise",
    "category": "209",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/45553_5df98932e9fd9.jpg",
    "location": "Cairo",
    "reviews": 944,
    "price": 908.75,
    "duration": 9
  },
  {
    "name": "Hanoi Escape: Night Life, City Vibes & Bia Hoi Corner",
    "category": "383",
    "image": "https://cdn.tourradar.com/s3/tour/1500x800/224196_a2c2221f.jpg",
    "location": "Hanoi",
    "reviews": 0,
    "price": 169.15,
    "duration": 3
  },
]);

const filteredItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return items.value.slice(0, 9);
  } else {
    // Reset items array before applying the filter
    const filtered = items.value.filter((item) => item.category === selectedCategory.value).slice(1, 10);

    // Log the reset if needed
    console.log('Filtered items:', filtered);

    return filtered;
  }
});


const handleCategoryChange = (event) => {
  const selectedValue = event.value.code;
  selectedCategory.value = selectedValue;
  console.log('Selected Category:', selectedValue);
  console.log(filteredItems);
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
</script>
<template>
  <div style="background: #F8FCF6;">
    <div style="max-width:1440px;margin:0 auto">
      <div class="grid">
        <div class="col-12 md:col-9">
          <h2 class="section-title">Popular <span style="color: #82cf45; font-style: italic;">Adventures</span></h2>
          <p class="section-p">Embark on extraordinary adventures handpicked just for you. Dive into our selection of
            featured tours, carefully curated to offer the pinnacle of exploration and discovery.</p>
        </div>
        <div class="col-12 md:col-3 card flex" style="justify-content: end; margin-bottom: 10px;">
          <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="By travel style"
            class="w-full md:w-14rem home-filter" @change="handleCategoryChange($event)" />
        </div>
      </div>
      <!-- Destinations Gallery Grid -->
      <Carousel :value="filteredItems" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
        <template #item="slotProps" class="tour-slide">
          <div :class="['tour-card', slotProps.data.category]">
            <div class="tour-img" :style="{ backgroundImage: 'url(' + slotProps.data.image + ')' }">
            </div>
            <div class="tour-detail">
              <span class="location"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.02531 8.04883C10.3482 8.22772 11.4921 8.56954 12.3057 9.0162C13.2298 9.52324 13.7733 10.1898 13.7733 10.9532C13.7733 11.8978 12.9255 12.7022 11.556 13.2377C10.3505 13.7094 8.69944 14 6.88663 14C5.07496 14 3.4228 13.7083 2.2173 13.2377C0.847725 12.7033 0 11.8989 0 10.9543C0 10.1795 0.559453 9.50614 1.50745 8.99569C2.3415 8.54676 3.51282 8.20607 4.8653 8.03402L5.01115 9.18597C3.80337 9.33865 2.77334 9.6349 2.05778 10.02C1.49605 10.322 1.16562 10.6478 1.16562 10.9543C1.16562 11.3702 1.72963 11.7986 2.64117 12.1541C3.71677 12.5746 5.21738 12.8344 6.88663 12.8344C8.55587 12.8344 10.0565 12.5746 11.1321 12.1541C12.0436 11.7975 12.6076 11.3691 12.6076 10.9543C12.6076 10.6547 12.2886 10.3345 11.7451 10.0371C11.0512 9.65655 10.0496 9.3603 8.87035 9.20078L9.02531 8.04883ZM7.4438 5.05445V10.8507H6.27818V5.05445C5.14446 4.7901 4.30015 3.77374 4.30015 2.56027C4.30015 1.14625 5.44641 0 6.86156 0C8.27558 0 9.42183 1.14625 9.42183 2.56027C9.42183 3.77488 8.57752 4.79124 7.4438 5.05445Z"
                    fill="black" />
                </svg>&nbsp;&nbsp;{{ slotProps.data.location }}</span>
              <span class="reviews"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
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
                <div v-if="slotProps.data.reviews > 0">{{ slotProps.data.reviews }}+ Reviews</div>
              </span>
              <h3 class="tour-name">{{ slotProps.data.name }}</h3>
              <div class="border-bottom flex justify-content-between">
                <span style="color: #82cf45; font-weight: 600;">from ${{ slotProps.data.price }} + flights</span>
                <span class="time"><svg width="13" height="17" viewBox="0 0 13 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.11973 3.35659C8.40081 3.4917 9.57055 4.00463 10.5151 4.78029L11.1669 4.09971C11.2995 3.96085 11.5222 3.95835 11.6611 4.09221L12.0989 4.51757C12.2365 4.65143 12.239 4.87286 12.1064 5.01048L11.4371 5.70857C12.3316 6.81324 12.8683 8.22068 12.8683 9.75196C12.8683 13.305 9.98714 16.1861 6.43416 16.1861C2.88117 16.1874 0 13.3062 0 9.75321C0 8.14937 0.587994 6.68188 1.55881 5.55469L0.805677 4.84659C0.665559 4.71523 0.661806 4.49254 0.794418 4.35368L1.21602 3.91206C1.34863 3.77319 1.57007 3.76944 1.70894 3.9008L2.51086 4.65518C3.48793 3.90205 4.68644 3.42415 5.99254 3.33657V1.9404H4.754C4.58886 1.9404 4.45374 1.80529 4.45374 1.64015V1.11471C4.45374 0.949567 4.58886 0.814453 4.754 0.814453H8.35703C8.52216 0.814453 8.65728 0.949567 8.65728 1.11471V1.64015C8.65728 1.80529 8.52216 1.9404 8.35703 1.9404H7.11848V3.35659H7.11973ZM5.90997 7.39874H6.45918C6.55926 7.39874 6.64183 7.48131 6.64183 7.58139V9.87707H8.332C8.43209 9.87707 8.51466 9.95964 8.51466 10.0597V10.6089C8.51466 10.709 8.43209 10.7916 8.332 10.7916H5.72731V10.5226V9.87707V7.58139C5.72731 7.48006 5.80988 7.39874 5.90997 7.39874ZM6.43416 4.52882C9.31908 4.52882 11.6586 6.86829 11.6586 9.75321C11.6586 12.6381 9.31908 14.9776 6.43416 14.9776C3.54923 14.9776 1.20977 12.6381 1.20977 9.75321C1.20977 6.86829 3.54923 4.52882 6.43416 4.52882Z"
                      fill="black" />
                  </svg> {{ slotProps.data.duration }} days</span>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <!-- END GRID -->
    </div>
  </div>
</template>