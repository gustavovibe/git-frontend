<template>
  <div class="hero-image mb-4 main-container">
    <div class="hero-content">
      <p class="title font-semibold mx-5 lg:mx-0">Adventures. Booked. Easy.</p>
      <p class="subtitle mobile-hidden interstate-font font-light text-2xl">
        Choose among 30,000+ multi-day trips around the world.
      </p>
    </div>
    <div class="tab-content">
      <div class="tabs-menu">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index" 
          @click="activeTab = tab"
          :class="{ 'active': activeTab === tab }"
        >
          {{ tab }}
        </button>
      </div>
      <div :class="{ 'd-none': activeTab !== 'Organized Adventures' }">
        <div class="search-form">
          <div class="travelers">
            <button class="travelers-button">
              2 Travelers <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div class="input-fields interstate-font">
            <div class="input-field interstate-font">
              <label for="departure" class>Departure Place</label>
              <input type="text" id="departure" placeholder="Where are you traveling from?" class="interstate-font">
            </div>
            <div class="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </div>
            <div class="input-field">
              <label for="destination">Destination(s)</label>
              <input type="text" id="destination" placeholder="Where are you going?" class="interstate-font">
            </div>
            <div class="input-field">
              <label for="dates">Travel Dates</label>
              <input type="text" id="dates" placeholder="When are you going?" class="interstate-font">
            </div>
            <button class="search-button interstate-font" >Search</button>
          </div>
        </div>
      </div>

      <div :class="{ 'd-none': activeTab !== 'Independent Adventures' }">
        <div id="nz-planner" onload="nz.init()"></div>
      </div>
		
	  <div :class="{ 'd-none': activeTab !== 'Vibe Adventures' }" style="text-align:center">
         <WordpresSearch/>
      </div>	
		
    </div>
  </div>
 
  <whyvibeadventures />
  <topdestinations />
  <popularadventures />
  <storiestipsguides />
</template>

<script setup>
import { ref } from 'vue';
import OrganizedAdventures from "~/components/OrganizedAdvSearch.vue";
import { useHead } from "#app"; // The recommended way in Nuxt 3
import whyvibeadventures from "~/components/WhyVibeAdventures.vue";
import topdestinations from "~/components/TopDestinations.vue";
import popularadventures from "~/components/PopularAdventures.vue";
import storiestipsguides from "~/components/StoriesTipsGuides.vue";
import WordpresSearch from "~/components/WordpresSearch.vue";	
	
const activeTab = ref('Organized Adventures');
const tabs = ref(['Organized Adventures', 'Independent Adventures', 'Vibe Adventures']);
const searchData = ref({
  adventureType: 'organized',
  travelers: 2,
  departurePlace: '',
  destination: '',
  travelDates: ''
});

const onSearch = ()=>{
	console.log("search");
}
useHead({
  script: [
    {
      src: "https://trips.vibeadventures.com/integration/v2/vibeadventures/embed.js",
      type: "text/javascript",
      async: true,
    },
  ],
});
</script>

<style scoped>

.input-label .border-gray {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.hero-image {
  background-image: url("/images/vibeNobackground.jpg");
  width: 100%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 100vh;
  position: relative;
  padding-bottom: 20px;
}

.hero-content {
  text-align: center;
  color: white;
  width: 100%;
  padding: 1%;
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
}


.icon-name {
  display: flex;
  align-items: center;
}

.hero-content{
  font-family: 'Canaro';
}

.hero-content .subtitle {
  font-family: 'Interstate';
}


@media only screen and (max-width:767px) {
  .hero-content .title {
    font-size: 36px;
    text-align: left;
    width: 90%;
    margin: 0 auto;
  }

  .hero-content .subtitle {
    font-size: 16px;
    text-align: center
  }

  .mobile-hidden {
    display: none;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .howItWorks-card{
    width: calc((100%) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .hero-content .title {
    font-size: 40px;
  }

  .hero-content .subtitle {
    font-size: 20px;
    text-align: center
  }

  .mobile-hidden {
    display: block;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .howItWorks-card{
    width: calc((100% / 3) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

@media only screen and (min-width:1200px) {
  .hero-content .title {
    font-size: 60px;
  }

  .hero-content .subtitle {
    font-size: 26px;
    text-align: center
  }

  .mobile-hidden {
    display: block;
  }

  .input-box {
    border-inline-end-width: 2px;
  }
  .howItWorks-content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .howItWorks-card{
    width: calc((100% / 3) - 20px);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  .howItWorks-card img{
    width: 70%;
  }
}

.inputTextDateInSearchClass {
  width: 100%;
  outline: none;
  box-shadow: none;
  border: none;
}
.d-none{
  display: none;
}

.tabs-menu {
  justify-content: center;
  width: 80%;
  text-align: center;
  margin: 0 auto;
}

.tabs-menu button {
  padding: 10px 20px;
  margin: 0px;
  border: none;
  background: #fff;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
}

.tabs-menu button.active {
  border-bottom: 2px solid #ff9800;
  background-color: #82cf45;
  color: #fff;
  font-weight: bold;
}

.tab-content {
  background: rgba(255, 255, 255, 0.8);
  margin:0 auto;
  width: 80%;
  border-radius: 8px;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0px 20px 20px 20px;
}

.travelers {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.travelers-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.travelers-button svg {
  margin-left: 5px;
}

.input-fields {
  display: flex;
  align-items: center;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  flex: 1;
}

.input-field label {
  font-size: 12px;
  margin-bottom: 5px;
}

.input-field input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.arrow {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.search-button {
  background-color: #ff9800;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
