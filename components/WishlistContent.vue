<template>
<div class="card wishlist-content" style="max-width: 850px;">

<div style="margin: 1rem auto; max-width: auto;">

	<div class="mb-12">
		<div class="grid canaro-font">
			<div class="col-11">
				<Carousel v-if="processedWishlistItems.length>0" :value="processedWishlistItems" :numVisible="2" :numScroll="1">
          <template #item="slotProps">
            <div class="wishlist-item flex flex-column" >
              <div
                :style="{
                  height: '15rem',
                  borderRadius: '1rem',
                  backgroundImage: `url(${slotProps.data.tour.data.images && slotProps.data.tour.data.images.length ? slotProps.data.tour.data.images[0] : 'default.jpg'})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }"
                class="mb-5"
              >
                <div class="text-right pt-3">
                  <i
										@click="confirmDelete(slotProps.data)"
										class="pi pi-heart-fill mr-3"
                    ></i>
                </div>
              </div>

              <h3 v-tooltip.top="slotProps.data.tour.data.tour_name || 'Unknown Tour'" style="height: 30%;height: 60px;
      line-height: 1.2em;" class="font-semibold my-0">
                {{ slotProps.data.tour.data.tour_name || "Unknown Tour" }}
              </h3>
              <p>{{ slotProps.data.tour.data.tour_length_days || "N/A" }} days</p>
              <div style="margin-top: 14px;margin-bottom:14px;">
                  <TourRating :ratings="slotProps.data.tour.data.ratings" :reviewsCount="slotProps.data.tour.data.reviews_count" />
                <!-- <i class="pi pi-star-fill" v-if="slotProps.data.tour.data.reviews_count > 0"></i>
                <span>
                  <span v-if="slotProps.data.tour.data.reviews_count > 0">{{ slotProps.data.tour.data.ratings || "N/A" }}</span> 
                  ({{ slotProps.data.tour.data.reviews_count  || "0" }} reviews)
                </span> -->
              </div>
            
              <p>{{ slotProps.data.tour.data.age_range_formatted+" years" || "N/A" }}</p>
              <p>{{ slotProps.data.tour.data.start_city_name || "Unknown City" }}</p>
              <p>{{ slotProps.data.tour.data.end_city_name || "Unknown City" }}</p>
              <p 
        style="height: 50%;" 
        v-tooltip="slotProps.data.tour.data.destinations.cities.length > 1 
                    ? slotProps.data.tour.data.destinations.cities.map(city => city.city_name).join(', ') 
                    : ''"
      >
        <span v-if="slotProps.data.tour.data.destinations.cities.length === 1">
          {{ slotProps.data.tour.data.destinations.cities[0].city_name }}
        </span>
        <span v-else>
          {{ slotProps.data.tour.data.destinations.cities[0].city_name+', '+slotProps.data.tour.data.destinations.cities[1].city_name }} and more
        </span>
      </p>
              <p>{{ slotProps.data.tour.data.max_group_size || "N/A" }}</p>
              <p>{{ slotProps.data.tour.data.guiding_method.type_name }}</p>

              <div style="text-align: center; padding: 1%;">
                <button
                  @click="handleSeeTrip(slotProps.data.tour.data)"
                  class="btn-custom-green"
                  style="width: 100%; padding-top: 0.7rem; padding-bottom: 0.7rem; border-radius: 1.5rem; cursor: pointer;"
                >
                  View Tour
                </button>
              </div>
            </div>
          </template>
        </Carousel>
			</div>
		
		</div>
		
	</div>
</div>

    <ConfirmDialog>
      <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-column align-items-left p-5 surface-overlay border-round" style="max-width: 400px;">
              <span class="font-bold text-2xl block mb-2 mt-4">Are you sure you want to remove this adventure?</span>
                <p class="mb-0">This adventure will be removed from your wishlist.</p>
                <div class="flex align-items-right gap-2 mt-4" style="justify-content: right;">
                  <Button label="Cancel" severity="warning" rounded  outlined @click="rejectCallback"></Button>
                  <Button label="Remove" severity="success" rounded outlined @click="acceptCallback"></Button>
                </div>
            </div>
        </template>
    </ConfirmDialog>

</div>
</template>


<script setup>
import { ref, onMounted, nextTick, computed, watch } from "vue";
import { useRouter } from 'vue-router';
import { GLOBAL_LOCATIONS } from '~/utils/globalLocations';
import Carousel from 'primevue/carousel';
import { useTravelerStore } from "~/store/travelerStore";
import { useGravitecStore } from "~/store/gravitectStore";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import Button from "primevue/button";

const emit = defineEmits(['loading','message']);
const config = useRuntimeConfig();
const router = useRouter();
const wishlistItems = ref([]);
const userId = ref(null);
const user_travelerId = ref(0);
const traveler_id= useTravelerStore();
const gravitecStore = useGravitecStore();
const cards = ref(3);
const url = ref(config.public.BACKEND_URL);
/* const url = ref('http://127.0.0.1:8000'); */
// Fetch city name by code and handle cases where the city code may be undefined
async function getCityNameByCode(cityCode) {
  if (cityCode === undefined || cityCode === null) {
    console.error(`Invalid city code: ${cityCode}`);
    return "Unknown City";
  }
  const location = GLOBAL_LOCATIONS.find((location) => location.t_city == cityCode);
  return location?.city || "Unknown City";
}

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

// Fetch tour details
async function fetchTourDetails(tourId) {
  try {
    const response = await fetch(`${url.value}/api/tour/${tourId}`);
    if (!response.ok) throw new Error(`Failed to fetch tour data for tour_id ${tourId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tour details:", error);
    return null;
  }
}


const confirm = useConfirm();

const confirmDelete = (tour) => {
  confirm.require({
    message: "",
    header: "Delete your account",
    accept: () => {
      toggleWishlist(tour);
    },
  });
};


async function fetchWishlist() {
  try {
    const userId = localStorage.getItem('user_id');
    const url_wishlist = user_travelerId.value ? `${url.value}/api/wishlist?id=${userId}&count=false` : `${url.value}/api/wishlists`;
    const response = await fetch(url_wishlist);
    const data = await response.json();
    const wishlist_items = data.data;
	
		if(wishlist_items.length ==1){
			cards.value=1;
		}else if(wishlist_items.length==2){
			cards.value=2;
		}
	
    if(wishlist_items.length > 0){
			
			for (const item of wishlist_items) {
				if (item.tour_id && !item.tour_data) {
					item.tour = await fetchTourDetails(item.tour_id);
					}
					if (item.tour_data) {
						const tourData = item.tour_data || {};
						tourData.start_city_name = await getCityNameByCode(tourData.start_city?.location_id);
						console.warn("Entro a contenido de obtencion de datos");
						tourData.end_city_name = await getCityNameByCode(tourData.end_city?.location_id);
						item.isInWishlist = true;
					} else {
						console.warn("Wishlist item is missing 'tour' data and cannot fetch details:", item);
					}
				}
			  console.log("contenido de api:",wishlist_items);
      	wishlistItems.value = data.data;
				traveler_id.updateWishCountNumber(wishlistItems.value.length);
	  		console.log('contenido de wishlist',wishlistItems.value);
    }else{
		setTimeout(()=>{	
			emit('message', true);
			emit('loading', false);
		},1000);
	}
    
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }finally{
	setTimeout(()=>{
		emit('loading', false);
		
	},1000);
	}
}

watch(wishlistItems, async () => {
  // await sendPushNotificationWishlist(wishlistItems.value);
});

async function sendPushNotificationWishlist(wishlistItems) {
  await gravitecStore.sendPushNotificationWishlist(wishlistItems, user_travelerId.value);
}

// Computed property for reactive handling of nested data
const processedWishlistItems = computed(() =>
	
    wishlistItems.value.map(item => ({
      ...item,
      tour: {
        ...item.tour_data,
        data: {
          ...item.tour_data,
          start_city_name: item.tour_data.start_city_name || "Unknown City",
          end_city_name: item.tour_data.end_city_name || "Unknown City",
        },
      },
    })),
);

// Toggle wishlist status
const toggleWishlist = async (item) => {
  item.isInWishlist = !item.isInWishlist;
  if (!item.isInWishlist) {
    try {
      const response = await fetch(`${url.value}/api/wishlists/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to remove item from wishlist');
      wishlistItems.value = wishlistItems.value.filter(wishlistItem => wishlistItem.id !== item.id);
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
      item.isInWishlist = true;
    }
    finally {
      fetchWishlist();
    }
  }
};

function getFutureDateRange(format = "YYYY/MM/DD", separator = "-") {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() + 2, 1); // Primer dÃ­a del mes futuro
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Ãšltimo dÃ­a del mismo mes

  function formatDate(date, format) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return format
      .replace("YYYY", yyyy)
      .replace("MM", mm)
      .replace("DD", dd);
  }

  const start = formatDate(startDate, format);
  const end = formatDate(endDate, format);

  return `${start}${separator}${end}`;
}

// Route to trip details
	
const formattedDates = ref([]);
const handleSeeTrip = (tour) => {
  const route = {
    path: "/tour",
    query: {
      tourId: tour.tour_id,
      adultsCount: 2,
      childrenCount: 0,
    }
  };
  // Construct the URL with query parameters
  const queryString = new URLSearchParams(route.query).toString();
  const url = `${route.path}?${queryString}`;

  // Open the URL in a new tab
  window.open(url, '_blank');
};

const checkUser = async () => {
  const response = await traveler_id.user_travelerId({ id: userId.value }, url.value);
	if(response.success){
		user_travelerId.value=response.data; 
		console.log('contenido de response', response);
	}
};

// Lifecycle hooks
onMounted(async () => {
  userId.value = localStorage.getItem('user_id');
/* userId.value = 	26; */
  await checkUser();
  nextTick(fetchWishlist);
  gravitecStore.validateUserNotifications(userId.value);
	
});
</script>

<style scoped>
.wishlist-item {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.wishlist-item{
    width: 20rem;
    max-width: 25rem;
}
.pi-star-fill{
    margin: 0 0.1rem;
    color: #F2994A;
}.button {
  width: 50px;
  height: 50px;
  position: relative;
  top: 10px;
  left: 28%;
  margin-left: -10px;
  border-radius: 5px;
  background: none;
  cursor: pointer;
  transition: background 0.5s ease;
}
.active.heart::before,
.active.heart::after {
  background: red !important;
}
.heart {
  width: 40px;
  height: 40px;
  transition: background 0.5s ease;
}
.heart::before,
.heart::after {
  transition: background 0.5s ease;
  position: absolute;
  content: "";
  left: 20px;
  top: 0;
  width: 20px;
  height: 30px;
  background: dimgrey;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
.heart::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

/*ADD THIS STYLE*/
.pi{
  font-size: 2rem;
  cursor: pointer;
}
/*ADD THIS STYLE*/
.pi.pi-heart{
  color: #82cf45;
}
/*ADD THIS STYLE*/
.pi-heart-fill{
  color:#EF4444;
}

@media only screen and (max-width:767px){

	.wishlist-content{
		margin-top: 3rem!important;
	}

}
  @media only screen and (min-width: 768px) and (max-width: 1199px){

}
  @media only screen and (min-width:1200px){
}
</style>