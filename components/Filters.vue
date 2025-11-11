<style >
@font-face {
  font-family: 'Canaro';
  src: url("/fonts/canaro-l.ttf");
  font-weight: normal;
}

@font-face {
  font-family: 'Interstate';
  src: url("/fonts/Interstate-regular.ttf");
  font-weight: 100 !important;
}

label {
  color: #505050;
  font-family: Canaro;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.28px;
  margin-left: 15px;
}

.filter {
  display: block;
  width: 100%;
  padding: 8px;
  align-items: center;
  gap: 10px;
  border-radius: 6px 6px 0px 0px;
  border: 1px solid var(--Gray-5, #E0E0E0);
  background: #FFF;
}



.filter-name {
  color: #000;
  font-family: Canaro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
}

.p-avatar-image {
  width: 20px;
  height: 20px
}

.p-calendar {
  width: 100%
}

.days-indicator,
.price-indicator {
  display: flex;
  justify-content: space-between;
}

.days-indicator input {
  color: black;
  border: none;
}

.price-indicator input {
  color: black;
  border: none;
}

.slider-left input {
  text-align: left;
  width: 30px;
}

.slider-right input {
  text-align: right;
  width: 30px;
}

.days-indicator .p-inputnumber {
  padding: 20px 0;
  width: 45px;
}

.price-indicator .p-inputnumber {
  padding: 20px 0;
  width: 72px;
}

.p-chips-multiple-container {
  border: none !important
}

.p-button-label {
  font-family: interstate !important;
}
</style>

<template>
  <div id="filters">
   <div class="flex" style="justify-content: space-between;margin-bottom: 10px;">
        <Button @click="applyFilters" label="Apply Filters" />
        <Button @click="resetFilters" label="Reset Filters" />
    </div>	  
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/duration.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Duration</span>
            </span>
          </template>
          <div class="input-container" style="text-align:center">
            <Slider :min="durationSliderRange[0]" :max="durationSliderRange[1]" v-model="timeSlider" @slideend="sliderFilter" range
               style="width: 100%;margin: 0px auto 10px auto;" />
            <div class="days-indicator">
              <div class="slider-left">
                <InputNumber disabled v-model.number="timeSlider[0]" />Days
              </div>
              <div class="slider-right">
                <InputNumber disabled v-model.number="timeSlider[1]" />Days
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/price.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Price</span>
            </span>
          </template>
          <div class="input-container" style="text-align:center;">
            <SelectButton v-model="priceValue" :options="priceOptions" aria-labelledby="basic"
              style=" margin: 0px auto 20px auto; font-family: interstate !important;" />
            <Slider v-model="sliderPrice" @slideend="filterPrice" :min="sliderMin" :max="sliderMax" :step="sliderStep"
              range style="width: 90%;margin: 0px auto 20px auto;" />
            <div class="price-indicator">
              <div class="slider-left">
                <span>{{ $currencyDecimal(sliderPrice[0]) }}</span>
              </div>
              <div class="slider-right">
                <span>{{ $currencyDecimal(sliderPrice[1]) }}</span>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/language.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Tour Language</span>
            </span>
          </template>
          <div class="input-container">
            <div class="flex flex-column gap-3">
              <div v-for="language of languages" :key="language.id" class="flex align-items-center">
                <Checkbox v-model="selectedlanguages" :inputId="language.id" name="language" :value="language.id" />
                <label :for="language.id">{{ language.name }}</label>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/destinations.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Destinations</span>
            </span>
          </template>
          <div class="input-container">
            <div class="flex flex-column gap-3">
              
              <AutoComplete @complete="searchItems" @item-select="citiesFilter" v-model="selectedItem"
                :suggestions="filteredItems" :virtualScrollerOptions="{ itemSize: 30 }" optionLabel="label" dropdown
							@focus="onDestinationsFocus" ref="destinationsAuto"/>
							<Chips v-if="selectingCities.length" v-model="selectingCities">
                <template #chip="slotProps" style="margin-bottom:5px;">
                  <span style="display:flex;justify-text:space-between">
                    {{ slotProps.value.label }}
                  </span>
                </template>
              </Chips>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/guide.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Guide Type</span>
            </span>
          </template>
          <div class="input-container">
            <div class="flex flex-column gap-3">
              <div v-for="category of categories" :key="category.key" class="flex align-items-center">
                <Checkbox v-model="selectedCategories" @update:modelValue="filterGuides" :inputId="category.key"
                  name="category" :value="category.key" />
                <label :for="category.key">{{ category.name }} ({{ category.count }})</label>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/age.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Group Age</span>
            </span>
          </template>
          <div class="input-container" style="text-align:center">
            <Slider v-model="ageSlider" @slideend="ageFilter" :min="ageSlider[0]" :max="ageSlider[1]" range
              style="width: 90%;margin: 0px auto 20px auto;" />
            <div class="days-indicator">
              <div class="slider-left">
                <InputNumber disabled v-model.number="ageSlider[0]" />
              </div>
              <div class="slider-right">
                <InputNumber disabled v-model.number="ageSlider[1]" />
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/size.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Maximum Group Size</span>
            </span>
          </template>
          <div class="input-container" style="text-align:center">
            <Slider v-model="groupSlider" range @slideend="groupFilter" style="width: 90%;margin: 0px auto 20px auto;"
              :min="groupSlider[0]" :max="groupSlider[1]" />
            <div class="days-indicator">
              <div class="slider-left">
                <InputNumber disabled v-model.number="groupSlider[0]" />
              </div>
              <div class="slider-right">
                <InputNumber disabled v-model.number="groupSlider[1]" />
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/style.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Travel Style</span>
            </span>
          </template>
          <div class="input-container">
            <div class="flex flex-column gap-3">
              <div v-for="style of styles" :key="style.id" class="flex align-items-center">
                <Checkbox v-model="selectedStyles" :inputId="style.id" name="style" @update:modelValue="filterStyles"
                  :value="style.id" />
                <label :for="style.id">{{ style.name }} ({{ style.count }})</label>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="filter">
      <Accordion :activeIndex="0">
        <AccordionTab :class="filter - tab">
          <template #header>
            <span>
              <Avatar image="/filter-icons/physical.svg" />
              <span class="font-semibold white-space-nowrap filter-name">Physical Rating</span>
            </span>
          </template>
          <div class="input-container">
            <div class="flex flex-column gap-3">
              <div v-for="rating of ratings" :key="rating.id" class="flex align-items-center">
                <Checkbox v-model="selectedratings" :inputId="rating.id" name="rating"
                  @update:modelValue="filterRatings" :value="rating.id" />
                <label :for="rating.id">{{ rating.name }} ({{ rating.count }})</label>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="flex" style="justify-content: space-between;margin-top: 10px;">
		<Button @click="applyFilters" label="Apply Filters" />
		<Button @click="resetFilters" label="Reset Filters" />
	</div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
//primevue components
import InputText from 'primevue/inputtext';
import Accordion from 'primevue/accordion';
import Checkbox from 'primevue/checkbox';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import SelectButton from 'primevue/selectbutton';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import AutoComplete from 'primevue/autocomplete';
import Chips from 'primevue/chips';
import { FilterMatchMode, FilterService } from 'primevue/api';
import { storeToRefs } from 'pinia'

// Define global reactive references
const homeFormStore = useHomeFormStore();
const { datesSelected, citiesSelected, typesSelected, pricesSelected, durationSliderRange, ageRange, groupSize} = storeToRefs(homeFormStore);

// Reset all filters
const resetFilters = () => {
  timeSlider.value = [1, 66];
  selectedStyles.value = [];
  selectedratings.value = [];
  selectingCities.value = [];
  ageSlider.value =[2, 99];
  groupSlider.value =[4, 50];
  selectedlanguages.value = [];
  selectedCategories.value = [];
  console.log("dynamicPrices.value", dynamicPrices.value);
  if (priceValue.value === 'Per Day') {
    sliderMin.value = (Math.round(dynamicPrices.value.minPrice) / 10) - 200;
    sliderMax.value = (Math.round(dynamicPrices.value.maxPrice) / 10) + 200;
    sliderStep.value = 20;
    sliderPrice.value = [Math.round(dynamicPrices.value.minPrice) / 10, Math.round(dynamicPrices.value.maxPrice) / 10];
  } else {
    sliderMin.value = Number(dynamicPrices.value.minPrice) - 200;
    sliderMax.value = Number(dynamicPrices.value.maxPrice) + 200;
    sliderStep.value = 200;
    sliderPrice.value = [Number(dynamicPrices.value.minPrice), Number(dynamicPrices.value.maxPrice)];
  }
  homeFormStore.changeReset("true");
  // priceValue.value = 'Per Person';
  // sliderPrice.value = [3000, 30000];
  // sliderMin.value = 3000;
  // sliderMax.value = 10000;
  // sliderStep.value = 300;
};

const applyFilters = () => {
	homeFormStore.changeApply("true");
}
	
watch(citiesSelected, (cities) => {
  console.log("global cities", cities);
});

const categories = ref([]);
//travel styles filter
const styles = ref([]);
const selectedStyles = ref([]);

//Physical rating filters
const ratings = ref([]);
const selectedratings = ref([]);

watch(typesSelected, (types) => {
  console.log("global types", types);
  categories.value = [];
  ratings.value = [];
  styles.value = [];
  types.forEach(type => {
    switch (type.tour_type_id) {
      case 373:
        categories.value.push({ name: "Fully Guided", key: "373", count: type.count });
        break;
      case 374:
        categories.value.push({ name: "Partially Guided", key: "374", count: type.count });
        break;
      case 376:
        ratings.value.push({ name: "Relaxing", id: "376", count: type.count });
        break;
      case 377:
        ratings.value.push({ name: "Easy", id: "377", count: type.count });
        break;
      case 378:
        ratings.value.push({ name: "Moderate", id: "378", count: type.count });
        break;
      case 379:
        ratings.value.push({ name: "Serious", id: "379", count: type.count });
        break;
      case 381:
        styles.value.push({ name: "Festival & Events", id: "381", count: type.count });
        break;
      case 381:
        styles.value.push({ name: "Hiking & Trekking", id: "73", count: type.count });
        break;
      case 309:
        styles.value.push({ name: "River Cruises", id: "209", count: type.count });
        break;
      case 32:
        styles.value.push({ name: "Bicycle Tours", id: "32", count: type.count });
        break;
      case 178:
        styles.value.push({ name: "Food & Culinary", id: "178", count: type.count });
        break;
      case 77:
        styles.value.push({ name: "In depth Cultural", id: "77", count: type.count });
        break;
      case 189:
        styles.value.push({ name: "Safari", id: "189", count: type.count });
        break;
      case 383:
        styles.value.push({ name: "Explorer", id: "383", count: type.count });
        break;
      case 330:
        styles.value.push({ name: "Health & Spa", id: "330", count: type.count });
        break;
      case 4:
        styles.value.push({ name: "Overland Truck", id: "4", count: type.count });
        break;
      case 14:
        styles.value.push({ name: "Active Adventure", id: "14", count: type.count });
        break;
      case 56:
        styles.value.push({ name: "Sailing", id: "56", count: type.count });
        break;
      default:
        break;
    }
  });
  console.log("categories", categories.value);
  console.log("styles", styles.value);
  console.log("ratings", ratings.value);
});

const selectedItem = ref();
const filteredItems = ref([]);
const selectingCities = ref([]);
const destinationsAuto = ref(null);

const searchItems = (event) => {
  let query = event.query.toLowerCase();

	if(query === 'all') {
		filteredItems.value = citiesSelected.value
		.map(tour => ({
			label: `${tour.city.city_name} (${tour.count})`,
			id: tour.t_city_id,
		}))
		.sort((a, b) => a.label.localeCompare(b.label));
		return;
		
	}
  // Filter city names from uniqueTours array and map to objects with concatenated label and count string
  filteredItems.value = citiesSelected.value
    .filter(tour => tour.city.city_name.toLowerCase().startsWith(query))
    .map(tour => ({
      label: `${tour.city.city_name} (${tour.count})`,
      id: tour.t_city_id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
  console.log("filteredItems.value", filteredItems.value);
};


const citiesFilter = (value) => {
  console.log("value", value);
  selectingCities.value.push(value.value);
  console.log("selectingCities.value", selectingCities.value);
  homeFormStore.changeFcities(selectingCities.value);
};

const config = useRuntimeConfig();

//calendar filter
const showToast = (msg) => {
  toast.add({ severity: 'Secondary', detail: msg, life: 3000 });
}

const startString = ref(null);

watch(startString, (dates) => {
  homeFormStore.changeDates(dates);
});

// Local slider state must be a ref. Initialize from store range (or fallback).
const timeSlider = ref(Array.isArray(durationSliderRange.value) && durationSliderRange.value.length
  ? [...durationSliderRange.value]
  : [2, 65]
);

watch(durationSliderRange, (newRange) => {
  if (!newRange || !newRange.length) return;
  timeSlider.value = [...newRange];
});

function onDestinationsFocus(event) {
  searchItems({ query: 'all' });
	setTimeout(() => {
    destinationsAuto.value && destinationsAuto.value.show && destinationsAuto.value.show();
  }, 0);
}

const sliderFilter = () => {
	console.log("timeSlide", timeSlider.value);
	homeFormStore.changeStay([...timeSlider.value]);
}
 
const ageFilter = () => {
  console.log("ageFilter.value", ageSlider.value);
  homeFormStore.changeAges(ageSlider.value);
}

const groupFilter = () => {
  console.log("groupFilter.value", groupSlider.value);
  homeFormStore.changeGroup(groupSlider.value);
}

const priceRange = ref([]);

const filterPrice = () => {
  if (priceValue.value == 'Per Day') {
    priceRange.value = sliderPrice.value.concat(1);
  } else { priceRange.value = sliderPrice.value.concat(0); }
  console.log("priceRange.value", priceRange.value);
  homeFormStore.changePrice(priceRange.value);
}

const visible = ref(false);
const handleButtonClick = () => {
  homeFormStore.changeDone("true");
  visible.value = false;
}

//price filter
const priceOptions = ref(['Per Person', 'Per Day']);
const priceValue = ref('Per Person');
const sliderPrice = ref([300, 30000]);
const sliderMin = ref(300);
const sliderMax = ref(30000);
const sliderStep = ref(300);

const dynamicPrices = ref([]);

watch(pricesSelected, (newPrices) => {
  console.log("newPrices ", newPrices);
  dynamicPrices.value = newPrices;
  changingPrices('Per Person');
});

watch(priceValue, (newValue) => {
  console.log("changing prices");
  changingPrices(newValue);
});

function changingPrices(newValue) {
  console.log("dynamicPrices.value", dynamicPrices.value);
  if (newValue === 'Per Day') {
    // sliderMin.value = (Math.round(dynamicPrices.value.minPrice) / 25) - 100;
    // sliderMax.value = (Math.round(dynamicPrices.value.maxPrice) / 25) + 100;
    sliderMin.value = 100;
    sliderMax.value = 900;  
    sliderStep.value = 20;
    sliderPrice.value = [Math.round(dynamicPrices.value.minPrice) / 10, Math.round(dynamicPrices.value.maxPrice) / 10];
  } else {
    sliderMin.value = Number(dynamicPrices.value.minPrice) - 200;
    sliderMax.value = Number(dynamicPrices.value.maxPrice) + 200;
    sliderStep.value = 200;
    sliderPrice.value = [Number(dynamicPrices.value.minPrice), Number(dynamicPrices.value.maxPrice)];
  }
}

//languages filter
const languages = ref([
  { name: "English", id: "1" },
  //  { name: "German", id: "2" },
  //  { name: "Italian", id: "3" },
]);
const selectedlanguages = ref([]);
const selectedCategories = ref([]);

const filterGuides = () => {
  console.log("selectedguides.value", selectedCategories.value);
  homeFormStore.changeGuides(selectedCategories.value);
}

const filterStyles = () => {
  console.log("selectedStyles.value", selectedStyles.value);
  homeFormStore.changeStyles(selectedStyles.value);
}

const filterRatings = () => {
  console.log("selectedratings.value", selectedratings.value);
  homeFormStore.changeRatings(selectedratings.value);
}

//age filter
const ageSlider = ref( ageRange.value ? ageRange.value : [2, 99]);
console.log("ageRange.value", ageRange.value);

//age filter
const groupSlider = ref(groupSize.value ? groupSize.value : [4, 50]);
console.log("grouoSizes.value", groupSlider.value);
//destinations

const { destinationsSelected } = storeToRefs(homeFormStore);

const selectedDestinationsref = ref('');
const filteredDestinations = ref();

const search = async (event) => {
  let query = event.query.toLowerCase().trim();

  try {
    const response = await useFetch(`${config.public.BACKEND_URL}/api/destinations?q=${query}`);
    const data = response.data.value.data;
    const suggestions = [];

    // Filtering for countries
    if (data.country && data.country.data && data.country.data.length > 0) {
      suggestions.push({
        label: "Countries",
        destinations: data.country.data.map(country => ({
          label: country.name,
          t_id: country.t_country_id,
          type: "country",
          k_id: country.kiwi_id,
        }))
      });
    }

    // Filtering for cities
    if (data.city && data.city.data && data.city.data.length > 0) {
      suggestions.push({
        label: "Cities",
        destinations: data.city.data.map(city => ({
          label: city.city_name,
          t_id: city.t_city_id,
          type: "city"
        }))
      });
    }

    // Filtering for natural attractions
    if (data.natural_destinations && data.data && data.natural_destinations.data.length > 0) {
      suggestions.push({
        label: "Natural Attractions",
        destinations: data.natural_destinations.data.map(natural => ({
          label: natural.name,
          t_id: natural.t_natural_id,
          type: "natural"
        }))
      });
    }

    let newFilteredDestinations = [];
    for (let groupname of suggestions) {
      let filteredItems = FilterService.filter(groupname.destinations, ['label'], query, FilterMatchMode.CONTAINS);
      if (filteredItems && filteredItems.length) {
        newFilteredDestinations.push({ ...groupname, ...{ items: filteredItems } });
      }
    }
    filteredDestinations.value = newFilteredDestinations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

watch(selectedDestinationsref, () => {
  homeFormStore.changeDestinations(selectedDestinationsref.value);
});

watch(destinationsSelected, (newDestinations) => {
  destinationsSelected.value = newDestinations.toString();
});

</script>
