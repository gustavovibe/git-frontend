<template>
  <div class="col-12 md:col-7 lg:col-8 xl:col-9 lg:col-offset-3 grid " id="guide" v-if="travelGuide && Object.keys(travelGuide).length">
      <div class="col-12 md:col-6 lg:col-6 xl:col-6 mb-5 lg:ml-4 md:ml-4">
        <h2 class="text-5xl font-semibold mt-0">{{ displayName }}: <span class="text-green-vibe">Travel Guide</span></h2>
        <div class="w-full lg:w-10">
          <h5 class="font-semibold text-xl">Quick facts</h5>
          <div>
            <div class="flex justify-content-between my-2">
              <div class="">Capital:</div>
              <div class="">{{ travelGuide.destination?.qf_capital }}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Population:</div>
              <div class="">{{ travelGuide.destination?.qf_population }}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Area:</div>
              <div class="">{{ travelGuide.destination?.qf_area }}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Currency:</div>
              <div class="">{{ travelGuide.destination?.qf_currency }}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Population:</div>
              <div class="">{{ travelGuide.destination?.qf_population }}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Official Language:</div>
              <div class="">{{ travelGuide.destination?.qf_official_language}}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Country Code:</div>
              <div class="">{{ travelGuide.destination?.qf_country_code}}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Time Zone:</div>
              <div class="">{{ travelGuide.destination?.qf_time_zone}}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">Plug Type:</div>
              <div class="">{{ travelGuide.destination?.qf_plug_type}}</div>
            </div>
            <hr>
            <div class="flex justify-content-between my-2">
              <div class="">High Season:</div>
              <div class="">{{ travelGuide.destination?.qf_high_season}}</div>
            </div>
            <hr>
          </div>
        </div>
        <div class="mt-3">
          <h5 class="font-semibold text-2xl mt-0">Travel tips</h5>
          <ul class="checklist px-3 text-justify"> <!-- Added pl-5 for some default padding -->
            <li v-for="(tip, index) in travel_tips" :key="'tip-' + index" class="my-2">
              {{ tip }}
            </li>
          </ul>

          <h5 class="font-semibold text-2xl mb-4">Things to do</h5>
          <ul class="checklist px-3 text-justify">
            <li v-for="(item, index) in things_to_do" :key="'todo-' + index" class="my-2">
              {{ item }}
            </li>
          </ul>
          <h5 class="font-semibold text-2xl">Best Time to Visit</h5>
          <ul class="checklist px-3 text-justify">
            <li v-for="(item, index) in best_time_to_visit" :key="'visit-' + index" class="my-2">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 lg:col-5 xl:col-5 mb-5 lg:ml-4 md:ml-4 px-0">

        <div class="mb-4 map-card">
          <div ref="mapRef" class="map rounded-3xl mt-6"></div>
        </div>


        <div class="mt-4 mb-4 map-card" v-if="unsplashGallery?.length > 0">
          <div class="image-slider-container relative border-round overflow-hidden" v-if="unsplashGallery.length > 0">

            <div
              class="overflow-hidden border-round travel-guide-img"
              :key="unsplashGallery[currentSliderIndex].url"
              :style="{ backgroundImage: `url(${unsplashGallery[currentSliderIndex].url})` }"
            >
              <div class="info-area absolute bottom-0 right-0 mb-3 mr-3 z-1">
                  <div class="info-content align-items-center p-2">

                      <span class="author-link"><i class="pi pi-map-marker"></i> Location: {{ locationName }}</span><br>
                      <a
                          :href="unsplashGallery[currentSliderIndex].author_url"
                          target="_blank"
                          class="author-link text-white no-underline white-space-nowrap mt-1"
                      >
                      <i class="pi pi-camera"></i> Photo by {{ unsplashGallery[currentSliderIndex].author }}
                      </a>

                      <i class="pi pi-info-circle text-white text-xl cursor-pointer"></i>
                  </div>
              </div>
            </div>

            <!-- Previous Button -->
            <button
                v-if="currentSliderIndex > 0"
                @click="prevImage"
                aria-label="Previous image"
                class="p-button p-button-rounded p-button-secondary p-button-text absolute top-40 prev-button ml-3 transform -translate-y-50 z-1 nav-button"
            >
                <i class="pi pi-angle-left"></i>
            </button>

            <!-- Next Button -->
            <button
                v-if="currentSliderIndex < unsplashGallery.length - 1"
                @click="nextImage"
                aria-label="Next image"
                class="p-button p-button-rounded p-button-secondary p-button-text absolute top-40 next-button mr-3 transform -translate-y-50 z-1 nav-button"
            >
                <i class="pi pi-angle-right"></i>
            </button>

          </div>
        </div>

        <div class="mt-6 text-center map-card" v-if="tg_video != null && tg_video !== ''">
            <iframe
              width="100%"
              height="315"
              :src="tg_video"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              class="border-round d-block tg_video_iframe">
            </iframe>
        </div>

      </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useFetch, useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

// Props
const props = defineProps({
  travelGuide: {
    type: Object,
    default: () => ({})
  },
  nameActivity: {
    type: String,
    default: ''
  }
});

// Reactive variables
const things_to_do = ref([]);
const travel_tips = ref([]);
const best_time_to_visit = ref([]);
const unsplashGallery = ref([]);
const currentSliderIndex = ref(0);
const tg_video = ref('');
const locationName = ref('');
const googleMapsDestination = ref('');
const mapRef = ref(null);
const map = ref(null);

// Computed properties
const displayName = computed(() => {
  return props.travelGuide?.name ? props.travelGuide.name : props.nameActivity;
});

// Functions
async function searchTravelGuide(category, t_id) {
  try {
    const { data, error } = await useFetch(`${config.public.BACKEND_URL}/api/get_destination_guide?category=${category}&id=${t_id}`);
    const travelGuideData = data?.value?.data ?? {};
    
    // Update reactive variables
    locationName.value = category === 'country' ? travelGuideData.name : (category === 'city' ? travelGuideData.city_name : travelGuideData.name || '');
    if (locationName.value) {
      googleMapsDestination.value = locationName.value;
      // Async load images
      getUnsplashGallery(travelGuideData.name || locationName.value, t_id);
    }
    things_to_do.value = travelGuideData.things_to_do ?? [];
    travel_tips.value = travelGuideData.travel_tips ?? [];
    best_time_to_visit.value = travelGuideData.best_time_to_visit ?? [];
    tg_video.value = travelGuideData.video_url ?? '';
    
    // Emit the updated travel guide data to parent
    emit('update:travelGuide', travelGuideData);
  } catch (e) {
    console.error('searchTravelGuide error', e);
  }
}

async function getUnsplashGallery(destination, t_id) {
  try {
    const { data } = await useFetch(`${config.public.BACKEND_URL}/api/get_unsplash_gallery?destination=${encodeURIComponent(destination)}&id=${t_id}`);
    unsplashGallery.value = data?.value?.data ?? [];
    currentSliderIndex.value = 0;
  } catch (e) {
    console.error('getUnsplashGallery error', e);
  }
}

const prevImage = () => {
  if (currentSliderIndex.value > 0) currentSliderIndex.value--;
};

const nextImage = () => {
  if (currentSliderIndex.value < unsplashGallery.value.length - 1) currentSliderIndex.value++;
};

// Watch for Google Maps destination changes
watch(googleMapsDestination, (destination) => {
  if (!destination) return;
  if (!window.google || !mapRef.value) {
    // Google script not loaded; consumer should ensure script is present
    console.warn('Google Maps script not loaded or mapRef missing');
    return;
  }
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: destination }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const loc = results[0].geometry.location;
      map.value = new google.maps.Map(mapRef.value, { center: loc, zoom: 5 });
      new google.maps.Marker({ position: loc, map: map.value });
    } else {
      console.error('Geocode failed:', status);
    }
  });
});

// Watch for travelGuide prop changes
watch(() => props.travelGuide, (newTravelGuide) => {
  if (newTravelGuide && Object.keys(newTravelGuide).length > 0) {
    // Parse JSON strings if they come as strings
    things_to_do.value = parseJsonArray(newTravelGuide.things_to_do) ?? [];
    travel_tips.value = parseJsonArray(newTravelGuide.travel_tips) ?? [];
    best_time_to_visit.value = parseJsonArray(newTravelGuide.best_time_to_visit) ?? [];
    tg_video.value = newTravelGuide.video_url ?? '';
    
    // Update location name based on travel guide data
    if (newTravelGuide.name) {
      locationName.value = newTravelGuide.name;
      googleMapsDestination.value = newTravelGuide.name;
    } else if (newTravelGuide.city_name) {
      locationName.value = newTravelGuide.city_name;
      googleMapsDestination.value = newTravelGuide.city_name;
    }
  }
}, { immediate: true });

// Helper function to parse JSON strings or return arrays
function parseJsonArray(data) {
  if (!data) return [];
  
  // If it's already an array, return it
  if (Array.isArray(data)) {
    return data;
  }
  
  // If it's a string, try to parse it as JSON
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Failed to parse JSON string:', error);
      return [];
    }
  }
  
  return [];
}

// Emits
const emit = defineEmits(['update:travelGuide']);

// Expose methods to parent (index.vue can call via ref)
defineExpose({
  load: async (category, id) => {
    await searchTravelGuide(category, id);
  },
  searchTravelGuide,
  getUnsplashGallery,
  prevImage,
  nextImage
});
</script>

<style scoped>
.map{
  height: 400px;
  width: 100%;
  border-radius: 1rem !important;
  min-height: 300px;
}

.map-card{
  width: 100%;
  margin: 0 auto;
}

.image-slider-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin:0 auto;
}

.travel-guide-img{
  background-size:cover;
  background-position: center;
  height: 100%;
  margin: 0 auto 10px auto;
  position: relative;
}

.nav-button {
  background-color: rgba(0, 0, 0, 0.4) !important;
  color: white !important;
  border: none !important;
  transition: background-color 0.2s ease;
}
.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.6) !important;
}

.info-area {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
}

.info-content {
  background-color: transparent;
  padding: 0.5rem;
  display: block;
  align-items: center;
  transition: background-color 0.3s ease;
  border-radius: 15px;
}

.info-content .author-link {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-width 0.4s ease-out, opacity 0.3s ease-out 0.1s;
  white-space: nowrap;
  color: white;
  text-decoration: none;
  margin-right: 0;
}

.info-content:hover .author-link {
  max-width: 200px;
  opacity: 1;
  margin-right: 0.5rem;
}

.info-content:hover {
  background-color: rgba(0, 0, 0, 0.75);
}

.info-content .pi-info-circle {
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
}

.next-button{
  right:30px!important;
}
.prev-button{
  left:30px!important;
}

.tg_video_iframe{
  margin:0 auto;
}

.image-container {
  position: relative;
  display: inline-block;
}

.map-image {
  width: 100%;
  display: block;
  border-radius: 16px;
}

.view-map-btn {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #fff;
  color: #82cf45;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
}

.enlarged-map {
  max-width: 90%;
  display: block;
  margin: auto;
}

.top-40{
	top:40%;
}

/* Additional styles for Travel Guide */
.green-vibe {
  color: #82cf45;
}

@media only screen and (max-width:767px) {
  .map-card{
    width: 85%;
  }
}
</style>
