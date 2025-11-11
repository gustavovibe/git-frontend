<style scoped>
  .p-breadcrumb{
      padding: unset;
      border: none;
  }
  :deep(svg.p-icon){
      color: black!important;
  }
  :deep(.p-menuitem-link .text-color){
      color: black !important;;
  }
  .order-header{
      justify-content: space-between;
      align-items: center;
  }
  .line-flights{
    border-left: 2px solid var(--bluegray-200);
    height: 78.5%;
    position: absolute;
    left: 6.3rem;
    top: 11%;
    z-index: -1;

  }
  .hr-lined{
    border-color: var(--bluegray-100);
    border-top: 1px;
  }
  .nights-in{
    position:absolute;
    top: -0.9rem;
    left:30%;
    border-color: #ff6c0e;
    color: #ff6c0e;
  }
  .download_btn {
    background-color: #FF6C0E;
    color: #fff;
    cursor: pointer;
  }
  .btn-cover {
    width: -webkit-fill-available;
    border: 1px solid #FF6C0E;
    border-radius: 5px;
    font-weight: 700;
    font-family: 'Interstate';
    font-size: 1.1rem;
  }
  .service-card{
    width: calc((100%) - 20px);
    margin: 0 10px;
  }
  .service-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  :deep(.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link){
    border-radius: 30px;
    padding: 1rem;
  }
  :deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link){
    transition: none;
  }
  @media only screen and (max-width:767px){
      .main-spacing{
          padding: 0.5rem 2rem;
      }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px){
      .main-spacing{
          padding: 0.5rem 2rem;
      }
      .nights-in{
        position:absolute;
        top: -0.9rem;
        left:40%;
      }
      .service-card{
        width: calc((100% / 2) - 20px);
        margin: 0 10px;
      }
  }
  @media only screen and (min-width:1200px){
      .main-spacing{
          padding: 2rem 7rem;
      }
      .nights-in{
        position:absolute;
        top: -0.9rem;
        left:38%;
      }
      .service-card{
        width: calc((100% / 3) - 20px);
        margin: 0 10px;
      }
  }
.cat {
  color: black;
  background-color: #F3F3F3;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
}
.text-justify {
  text-align: justify;
}

.itinerary .p-accordion-content {
  margin-left: 15px !important;
}

.itinerary .p-accordion-header a {
  padding: 20px 0px !important;
}

.inclusionss .p-accordion-header a {
  padding: 20px 0px !important;
}

.inclusionss,
.inclusions,
.exclusionss {
  display: block
}

.p-avatar.p-avatar-image {
  background: #82cf45;
  border-radius: 50%;
  padding: 5px;
  margin-right: 5px;
}

.exclusions-desc br {
  display: none !important;
}

.exclusions-desc p {
  margin: 0 !important;
}

.inclusions-header {
  display: flex;
  color: #82cf45;
  font-family: Canaro;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  /* 138.889% */
}

.inclusions-desc,
.exclusions-desc {
  margin-left: 15px
}

.inclusions-desc ul {
  list-style-image: url(~/assets/icons/inclussion.svg);
}
.content h2 {
  color: #82cf45;
  font-size: 1.3rem;
  font-family: 'Canaro', sans-serif;
}

.content p,
.content li {
  font-family: 'Interstate', sans-serif;
  font-size: 1.1rem;
  line-height: 1.5rem;
}

.content ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>

<template>
		<div class="col-12" v-if="tour">
          <div class="mx-3">
            <div class="mobile-inverted">
              <div class="grid">
                <div class="col-12 lg:col-9">
                  <h1 class="tour-heading my-0" style="font-size: 40px;"><a :href="`/tour?tourId=${tour?.tourId}`" class="no-underline text-black-alpha-90 font-semibold">{{ tour?.tourName }}</a></h1>
                </div>
                <div class="col-12 lg:col-3 flex justify-content-end flex-wrap" style="max-height: fit-content;">
                  <TourRating :ratings="tour?.ratings" :reviewsCount="tour?.reviewsCount" />
                </div>
              </div>
              <Carousel :showIndicators="false" v-if="images?.length > 0" :value="images" :numVisible="1"
                :numScroll="1" circular style="height: 300px;width: 100%;">
                <template #item="slotProps" style="height: 300px;width: 100%;">
                  <div class="bg-cover bg-center bg-no-repeat tour-inf-img border-round-sm"
                    :style="{ 'background-image': `url(${slotProps.data})` }" style="height: 300px;width: 100%;"></div>
                </template>
              </Carousel>
            </div>
            <div class="my-4">
              <div>
                <span v-for="(type, index) in tour?.tourTypes" :key="index" class="cat mr-3">{{ type }}</span>
              </div>
              <section id="overview" class="mobile-inverted">
                <div class="grid my-5">
                  <div class="col-12 lg:col-7">
                    <div class="grid">
                      <div class="col-12 lg:col-6">
                        <div class="grid">
                          <div class="col-5 lg:col-12">
                            <h3 class="specs">Duration</h3>
                          </div>
                          <div class="col-7 lg:col-12">
                            <span class="details"
                            >{{ tour?.tourLengthDays }} days</span
                            >
                          </div>
                          <div class="col-5 lg:col-12">
                            <h3 class="specs">Max Group Size</h3>
                          </div>
                          <div class="col-7 lg:col-12">
                            <span class="details">{{
                                tour?.maxGroupSize
                              }}</span>
                          </div>
                          <div class="col-5 lg:col-12">
                            <h3 class="specs">Tour Type</h3>
                          </div>
                          <div class="col-7 lg:col-12">
                            <span class="details">{{ tour?.groupType }}</span>
                          </div>
                          <div v-if="moreDetails">
                            <div class="col-5 lg:col-12">
                              <h3 class="specs">Operator</h3>
                            </div>
                            <div class="col-7 lg:col-12">
                              <span class="details">{{ tour?.operator?.name }}</span>
                            </div>
                          </div>
                          <div class="col-5 lg:col-12">
                            <a href="javascript:void(0);" class="details"><h3 v-on:click="moreDetailsToggle" id="moreDetailsH2">{{ !moreDetails ? "More Details" : "Less Details" }}<i class="ml-3" :class="{ 'pi pi-angle-down': moreDetails, 'pi pi-angle-up': !moreDetails }"></i></h3> </a>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 lg:col-6">
                        <div class="grid">
                          <div class="col-5 lg:col-12">
                            <h3 class="specs">Age Requirement</h3>
                          </div>
                          <div class="col-7 lg:col-12">
                            <span class="details"
                            >{{ tour?.ageRangeFormatted }} yrs</span
                            >
                          </div>
                          <div class="col-5 lg:col-12">
                            <h3 class="specs">Guiding Method</h3>
                          </div>
                          <div class="col-7 lg:col-12">
                            <span class="details">{{
                                tour?.guidingMethod
                              }}</span>
                          </div>
                          <div class="col-5 lg:col-12">
                            <h3 class="specs">Languages</h3>
                          </div>
                          <div class="col-7 lg:col-12">
                            <span>
                              <img src="/filter-icons/language.svg" alt="" />
                              <span class="details">English</span>
                            </span>
                          </div>
                          <div v-if="moreDetails">
                            <div class="col-5 lg:col-12">
                              <h3 class="specs">Physical Rating</h3>
                            </div>
                            <div class="col-7 lg:col-12">
                              <span class="details">Medium</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 lg:col-5 map-container">
                    <div class="grid flex justify-content-center flex-wrap">
                      <span class="col-12" style="color: #82cf45;font-size: 0.9rem;text-align: center;"><a href="#itinerary" class="text-green-vibe">See Itinerary</a></span>
                      <span class="col-12 flex justify-content-center flex-wrap text-gray-500">Starts <img
                          style="width: 70%;height:70%" src="/tour-individual/startFinish.png" alt=""> Ends </span>
                      <div class="col-12 flex justify-content-between flex-wrap">
                        <span>{{ tour?.start_city?.city_name }}</span>
                        <span>{{ tour?.end_city?.city_name }}</span>
                      </div>
                      <img style="width: 85%;" v-if="tour?.lastImage" :src="tour?.lastImage" alt="">
                    </div>
                  </div>
                </div>
                <div class="content">
                  <h2>Overview</h2>
                  <p class="text-justify">{{ tour?.overview }}</p>
                </div>
              </section>
              <hr class="tour-hr">
              <section id="itinerary" class="content">
                <h2>Itinerary</h2>
                <div class="lg-highlights">
                  <div class="itinerary">
                    <Accordion :activeIndex="0">
                      <AccordionTab v-for="(item, index) in tour?.itinerary" :key="index">
                        <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                              style="width: 23px; height: 23px;"
                              class="p-avatar p-avatar-image"
                              src="~/assets/icons/itinerary-locations.svg"
                              alt="itinerary-icon"
                          />
                          <span class=" white-space-nowrap" style="font-weight: 500;">
                            {{ item.title.split(":")[0] }} :
                          </span>
                          <span style="font-weight: normal;">
                            {{ item.title.split(":")[1] }}
                          </span>
                        </span>
                        </template>
                        <p class="m-0" v-html="item.description"></p>
                      </AccordionTab>
                    </Accordion>
                  </div>
                </div>
              </section>
              <hr class="tour-hr">
              <section id="includes" class="content">
                <h2>What's Included</h2>
                <div class="lg-highlights inclusionss">
                  <Accordion :activeIndex="0" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebabfb3a49f1d6c84730b3a98a0999776c5cc945b433d6fc09018f893f7dc9b4?"
                            alt="Accommodation" />
                          <span class="font-bold white-space-nowrap">Accommodation</span>
                        </span>
                      </template>
                      <div class="inclusions-desc" v-html="tour.accommodationDesc"></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d394db847347837197ca75d64d6d2ef28337f84d3b22b982a7cae105e0ef5bd?"
                            alt="Meals" />
                          <span class="font-bold white-space-nowrap">Meals</span>
                        </span>
                      </template>
                      <div class="inclusions-desc" v-html="tour.mealsDesc"></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e114de81e5e33e0b71f08b734408468a163a4c761dd33e2d04aab98f162bf422?"
                            alt="Transport" />
                          <span class="font-bold white-space-nowrap">Transport</span>
                        </span>
                      </template>
                      <div class="inclusions-desc" v-html="tour.transportDesc"></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d683e128ccf70224ebca51c3193efd7a7a44aa061dcd31bf109e531adcec403?"
                            alt="Guide" />
                          <span class="font-bold white-space-nowrap">Guide</span>
                        </span>
                      </template>
                      <div class="inclusions-desc" v-html="tour.guideDesc"></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?"
                            alt="Others" />
                          <span class="font-bold white-space-nowrap">Others</span>
                        </span>
                      </template>
                      <div class="inclusions-desc" v-html="tour.othersDesc"></div>
                    </AccordionTab>
                  </Accordion>
                </div>
              </section>
              <hr class="tour-hr">
              <div class="content">
                <h2>What's Excluded</h2>
                <div class="lg-highlights">
                  <div class="exclusionss">
                    <div class="flex" v-if="tour?.flightsDesc">
                      <img src="~/assets/icons/exclussion.svg">
                      <div class="exclusions-desc" v-html="tour?.flightsDesc"></div>
                    </div>
                    <div class="flex" v-if="tour?.OptionalDesc">
                      <img src="~/assets/icons/exclussion.svg">
                      <div class="exclusions-desc" v-html="tour?.OptionalDesc"></div>
                    </div>
                    <div class="flex" v-if="tour?.insuranceDesc">
                      <img src="~/assets/icons/exclussion.svg">
                      <div class="exclusions-desc" v-html="tour?.insuranceDesc"></div>
                    </div>
                    <div class="flex" v-if="tour?.ethersDesc">
                      <img src="~/assets/icons/exclussion.svg">
                      <div class="exclusions-desc" v-html="tour?.ethersDesc"></div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="tour-hr">
              <section class="content">
                <h2 class="div-145">Things to Know</h2>
                <h2 class="div-148"> Payment</h2>
                <div class="div-147">
                  <p>For any tour departures, full payment is required.</p>
                </div>
                <h2 class="div-148">Cancellation</h2>
                <div class="div-149">
                  <p> Tour: Cancel this tour up to 35 days before departure (Day 1 of the tour; does not include flight
                    days) without extra fees, no refund is available after this date. The deposit paid, however, is
                    non-refundable. <br> Flights: Cancellation policy depends on the particular flight option and
                    carrier
                    you choose. </p>
                </div>
                <h2 class="div-150">Travel Insurance</h2>
                <div class="div-151">
                  <p> This tour requires you to have a valid travel insurance, covering medical and personal accidents,
                    including repatriation costs and emergency evacuation. You can either add it to your tour in the
                    next
                    step or obtain it independently, for example, through <a
                      href="https://www.visitorscoverage.com/why-visitorscoverage/?affid=4781cb5729334"
                      target="_blank">VisitorsCoverage</a>
                  </p>
                </div>
                <h2 class="div-152">Visa</h2>
                <div class="div-153">
                  <p> Each traveler is responsible for obtaining the necessary visa(s) for this tour, as visa
                    requirements
                    differ based on nationality. It's advisable to check with the local embassies representing the
                    countries
                    in your itinerary. </p>
                </div>
                <h2 class="div-154">COVID-19 Safety</h2>
                <div class="div-155">
                  <p>This tour features the following COVID-19 measures:</p>
                  <div class="flex">
                    <img loading="lazy" src="/filter-icons/tick.svg" />
                    <p>This tour features reduced group sizes to ensure more personal space on vehicles, at sights, and
                      in
                      accommodations and restaurants.</p>
                  </div>
                  <div class="flex">
                    <img loading="lazy" src="/filter-icons/tick.svg" />
                    <p>This tour follows hygiene protocols, including the use of masks, regular handwashing, and general
                      sanitization.</p>
                  </div>
                  <div class="flex">
                    <img loading="lazy" src="/filter-icons/tick.svg" />
                    <p>Distancing measures have been put in place to ensure safety against COVID-19.</p>
                  </div>
                </div>
                <h2 class="div-159">Important</h2>
                <div class="div-160">
                  <p> Ensure you download your e-ticket for flight details and complete online check-in via the
                    airline’s
                    website or at the airport check-in desk. <br> Hotel accommodation is as specified and may change
                    within
                    the same or higher category. Hotel categories vary by country. <br> Excursion order and duration may
                    change or cancel due to weather, safety, or other reasons, without notice. <br> Upon arrival,
                    travelers
                    may need to directly pay a municipal tax to some hotels. </p>
                </div>
              </section>
            </div>
          </div>
        </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Carousel from 'primevue/carousel';
const props = defineProps(['tour', 'images']);
console.log("props.images",props.images);
</script>
