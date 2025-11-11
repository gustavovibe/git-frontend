import { defineStore, skipHydrate } from "pinia";
import { ref } from "vue";
export const useHomeFormStore = defineStore("HomeFormStore", {
  id: "home-form-store",

  state: () => {
    return {
      departure: [],
      destinations: [],
      travelersSelected: {
        adults: 1,
        children: 0,
        childrenAges: [],
        infants: 0,
      },
      travelDates: [],
      filterDone: false,
      timeStay: [],
      priceRange: [],
      ageRange: [],
      groupSize: [],
      physicalRatings: [],
      travelStyles: [],
      guides: [],
      cities: [],
      filteredCities: [],
      tourTypes: [],
      prices: [],
      reset: false,
	  	apply: false,	
			durationSliderRange: [2, 65]
    };
  },

  getters: {
    departureSelected: (state) => state.departure,
    destinationsSelected: (state) => state.destinations,
    totalTravelers: (state) =>
      state.travelersSelected.adults +
      state.travelersSelected.children +
      state.travelersSelected.infants,
    adultsCount: (state) => state.travelersSelected.adults,
    childrenCount: (state) => state.travelersSelected.children,
    infantsCount: (state) => state.travelersSelected.infants,
    datesSelected: (state) => state.travelDates,
    doneClicked: (state) => state.filterDone,
    timeSelected: (state) => state.timeStay,
    priceSelected: (state) => state.priceRange,
    agesSelected: (state) => state.ageRange,
    groupSelected: (state) => state.groupSize,
    guidesSelected: (state) => state.guides,
    ratingsSelected: (state) => state.physicalRatings,
    stylesSelected: (state) => state.travelStyles,
    citiesSelected: (state) => state.cities,
    citiesFiltered: (state) => state.filteredCities,
    typesSelected: (state) => state.tourTypes,
    pricesSelected: (state) => state.prices,
    resetSelected: (state) => state.reset,
		applySelected: (state) => state.apply,  
  },

  actions: {
    changeDeparture(departure) {
      this.departure = departure;
    },
    changeDestinations(destinations) {
      this.destinations = destinations;
		console.log("global change destinations",destinations);
    },
    resetDeparture() {
      this.departure = null;
    },
    resetDestinations() {
      this.destinations = null;
		console.log("global reset destinations");
    },
    addTraveler(category) {
      if (this.totalTravelers >= 9) {
        return;
      }
      if (category == "children") {
        this.travelersSelected[category]++;
        this.travelersSelected.childrenAges.push({ age: null });
      } else {
        this.travelersSelected[category]++;
      }
    },
    removeTraveler(category, min = 0) {
      this.travelersSelected[category]--;
      if (category == "children") {
        if (this.travelersSelected.childrenAges.length > 0) {
          this.travelersSelected.childrenAges.pop();
        }
      }
      if (this.travelersSelected[category] < min) {
        this.travelersSelected[category] = min;
      }
    },
    resetTotalTravelers() {
      this.travelersSelected.adults = 0;
      this.travelersSelected.children = 0;
      this.travelersSelected.infants = 0;
    },
    changeDates(dates) {
      this.travelDates = dates;
    },
    changeDone(value) {
      this.filterDone = value;
    },
    changeStay(value) {
      this.timeStay = value;
    },
    changePrice(value) {
      this.priceRange = value;
    },
    changeAges(value) {
      this.ageRange = value;
    },
    changeGroup(min, max) {
			this.groupSize = [Number(min), Number(max)];
    },
    changeRatings(value) {
      this.physicalRatings = value;
    },
    changeStyles(value) {
      this.travelStyles = value;
    },
    changeGuides(value) {
      this.guides = value;
    },
    changeCities(value) {
      this.cities = value;
    },
    changeFcities(value) {
      this.filteredCities = [...value];
    },
    changePrices(value) {
      this.prices = value;
    },
    changeCurrency(newCurrency) {
      this.currencySelected = newCurrency;
    },
    changeTypes(value) {
      this.tourTypes = value;
    },
    changeReset(value) {
      this.reset = value;
    },
		changeApply(value) {
      this.apply = value;
    },  
		updateDurationFilter(min, max) {
			this.durationSliderRange = [Number(min), Number(max)];
		},
		updateAgeFilter(min, max) {
			this.ageRange = [Number(min), Number(max)];
		}
  },
});
