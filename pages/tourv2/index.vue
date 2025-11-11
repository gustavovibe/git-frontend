
<template>
  <Toast />
  <div class="overflow-hidden" style="background-color: #fff" id="main-container">

    <div class="mt-5 grid col-12 justify-content-center">
      <div class="grid col-12 lg:col-9">
        <CustomStepper :activeStep="0"  />
      </div>
    </div>

    <TabMenu id="tour-nav" :model="tournavs" v-if="!isTourLoading">
      <template #tournav="{ tournav, props }">
        <a v-if="tournav.url" v-ripple :href="tournav.url" v-bind="props.action">
          <span v-bind="props.label">{{ tournav.label }}</span>
        </a>
      </template>
    </TabMenu>
    <!-- content -->
    <div v-show="!isTourLoading" class="mt-3" style="max-width:1240px;margin:0 auto;">
      <div class="grid">
        <div class="col-12 lg:col-9">
          <div class="mx-3">
            <div class="mobile-inverted">
              <div class="grid">
                <div class="col-12 lg:col-9">
                  <h1 class="tour-heading">{{ tour?.tourName }}</h1>
                </div>
                <div class="col-12 lg:col-3 flex justify-content-end flex-wrap">
                  <TourRating :ratings="tour?.ratings" :reviewsCount="tour?.reviewsCount" />
                </div>
              </div>
              <Carousel :showIndicators="false" v-if="tour?.images?.length > 0" :value="tour?.images" :numVisible="1" :numScroll="1" circular>
                <template #item="slotProps">
                  <div class="bg-cover bg-center bg-no-repeat tour-inf-img" :style="{ 'background-image': `url(${slotProps.data})`, 'border-radius': '16px', 'overflow': 'hidden' }"></div>
                </template>
              </Carousel>
            </div>
            <div class="my-4">
              <div>
                <span
                  v-for="(type, index) in tour?.tourTypes"
                  :key="index"
                  class="cat mr-3"
                  >{{ type }}</span
                >
              </div>
              <section id="overview" class="mobile-inverted">
                <div class="grid my-5">
                  <div class="col-12 lg:col-7">
                    <div class="grid">
                      <div class="col-12">
                        <div class="grid">
                          <!-- Columna 1 -->
                          <div class="col-6">
                            <h3 class="specs">Duration</h3>
                            <span class="details">{{ tour?.tourLengthDays }} days</span>
                          </div>

                          <div class="col-6">
                            <h3 class="specs">Age Requirement</h3>
                            <span class="details">{{ tour?.ageRangeFormatted }} yrs</span>
                          </div>

                          <!-- Columna 2 -->
                          <div class="col-6">
                            <h3 class="specs">Max Group Size</h3>
                            <span class="details">{{ tour?.maxGroupSize }}</span>
                          </div>

                          <div class="col-6">
                            <h3 class="specs">Guiding Method</h3>
                            <span class="details">{{ tour?.guidingMethod }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">

                        <Transition name="expand">
                          <div class="grid" v-if="moreDetails">
                            <!-- Columna 1 -->
                            <div class="col-6">
                              <h3 class="specs">Travel Style</h3>
                              <span class="details">{{ tour?.groupType }}</span>
                            </div>

                            <div class="col-6">
                              <h3 class="specs">Languages</h3>
                              <span>
                                <span class="details">English</span>
                              </span>
                            </div>

                            <!-- Columna 2 -->
                            <div class="col-6">
                              <h3 class="specs">Operator</h3>
                              <span class="details">{{ tour?.operator?.name }}</span>
                            </div>

                            <div class="col-6">
                              <h3 class="specs">Physical Rating</h3>
                              <span class="details">Medium</span>
                            </div>
                          </div>
                        </Transition>
                      </div>
                      <div class="col-12 lg:col-12">
                        <a href="javascript:void(0);" class="details"><h3 v-on:click="moreDetailsToggle" id="moreDetailsH2">{{ !moreDetails ? "More Details" : "Less Details" }}<i class="ml-3" :class="{ 'pi pi-angle-up': moreDetails, 'pi pi-angle-down': !moreDetails }"></i></h3> </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 lg:col-5 map-container">
                    <div class="grid flex justify-content-center flex-wrap">
                      <a
                        href="#itinerary"
                        class="col-12"
                        style="
                          color: #82cf45;
                          font-size: 0.9rem;
                          text-align: center;
                        "
                        >See Itinerary</a>
                        <div class="col-12">
                          <div class="grid text-gray-600 text-center">
                            <!-- Fila 1: títulos -->
                            <div class="col-4 flex justify-content-center">
                              <span class="font-semibold">Starts</span>
                            </div>
                            <div class="col-4"></div>
                            <div class="col-4 flex justify-content-center">
                              <span class="font-semibold">Ends</span>
                            </div>

                            <!-- Fila 2: línea con puntos -->
                            <div class="col-12 flex justify-content-center align-items-center">
                              <img src="/tour-individual/startFinish.png" alt="" style="width: calc(100% - 15%); height: auto;" />
                            </div>

                            <!-- Fila 3: nombres de ciudades -->
                            <div class="col-4 flex justify-content-center">
                              <span>{{ tour?.start_city?.city_name || '-' }}</span>
                            </div>
                            <div class="col-4"></div>
                            <div class="col-4 flex justify-content-center">
                              <span>{{ tour?.end_city?.city_name || '-' }}</span>
                            </div>
                          </div>
                        </div>

                      <!-- <span class="col-12 flex justify-content-center flex-wrap text-gray-500">
                          Starts
                          <br>
                          {{ tour?.start_city?.city_name }}
                        <img
                          style="width: 70%; height: 30%"
                          src="/tour-individual/startFinish.png"
                          alt=""
                        />
                        Ends
                        <br>
                        {{ tour?.end_city?.city_name }}
                      </span> -->
                      <!-- <div
                        class="col-12 flex justify-content-between flex-wrap"
                      >
                        <span>{{ tour?.start_city?.city_name }}</span>
                        <span>{{ tour?.end_city?.city_name }}</span>
                      </div> -->
                      <div class="image-container">
                        <!-- View Map Button (top-left over the image) -->
                        <button @click="showMap = true" class="view-map-btn">View map</button>

                        <img
                          class="map-image"
                          v-if="tour?.lastImage"
                          :src="tour?.lastImage"
                          alt="Tour Map"
                        />
                      </div>

                      <!-- Popup Modal -->
                      <Dialog v-model:visible="showMap" :modal="true" :closable="true" :dismissable-mask="true">
                        <img
                          v-if="tour?.lastImage"
                          :src="tour?.lastImage"
                          class="enlarged-map"
                          alt="Enlarged Tour Map"
                        />
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div class="content">
                  <h2>Overview</h2>
                  <p class="text-justify">{{ tour?.overview }}</p>
                </div>
              </section>
              <hr class="tour-hr" />
              <section id="itinerary" class="content">
                <div class="itinerary-header">
                  <h2 class="itinerary-title">Itinerary</h2>
                  <a @click="toggleAccordion" class="expand-btn">
                    {{ allExpanded ? "Hide All" : "Expand All" }}
                  </a>
                </div>
                <div class="lg-highlights">
                  <div class="itinerary">
                    <Accordion :activeIndex="activeIndexes" multiple>
                      <AccordionTab
                        v-for="(item, index) in tour?.itinerary"
                        :key="index"
                      >
                        <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            style="width: 23px; height: 23px;"
                            class="p-avatar p-avatar-image"
                            src="~/assets/icons/itinerary-locations.svg"
                            alt="itinerary-icon"
                          />
                          <span class=" white-space-nowrap font-bold">
                            {{ item.title.split(":")[0] }} :
                          </span>
                          <span style="font-weight: normal;">
                            {{ item.title.split(":")[1] }}
                          </span>
                        </span>
                        </template>
                        <p class="m-0 font-normal" v-html="item.description"></p>
                      </AccordionTab>
                    </Accordion>
                  </div>
                </div>
              </section>
              <hr class="tour-hr" />
              <section id="includes" class="content">
                <h2>What's Included</h2>
                <div class="lg-highlights inclusionss">
                  <Accordion
                    :activeIndex="0"
                    expandIcon="pi pi-plus"
                    collapseIcon="pi pi-minus"
                  >
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ebabfb3a49f1d6c84730b3a98a0999776c5cc945b433d6fc09018f893f7dc9b4?"
                            alt="Accommodation"
                          />
                          <span class=" white-space-nowrap tab-header-text"
                            >Accommodation</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour.accommodationDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d394db847347837197ca75d64d6d2ef28337f84d3b22b982a7cae105e0ef5bd?"
                            alt="Meals"
                          />
                          <span class="tab-header-text white-space-nowrap"
                            >Meals</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour.mealsDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e114de81e5e33e0b71f08b734408468a163a4c761dd33e2d04aab98f162bf422?"
                            alt="Transport"
                          />
                          <span class="tab-header-text white-space-nowrap"
                            >Transport</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour.transportDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d683e128ccf70224ebca51c3193efd7a7a44aa061dcd31bf109e531adcec403?"
                            alt="Guide"
                          />
                          <span class="tab-header-text white-space-nowrap"
                            >Guide</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour.guideDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab>
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/002f010054a80bab37f7745c8e7c85e564d550432e42e2c1140e93d85f28d1a3?"
                            alt="Others"
                          />
                          <span class="tab-header-text white-space-nowrap"
                            >Others</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour.othersDesc"
                      ></div>
                    </AccordionTab>
                  </Accordion>
                </div>
              </section>
              <hr class="tour-hr" />
              <div class="content">
                <h2>What's Excluded</h2>
                <div class="lg-highlights">

                  <Accordion
                    :activeIndex="0"
                    expandIcon="pi pi-plus"
                    collapseIcon="pi pi-minus"
                  >
                    <AccordionTab v-if="tour?.flightsDesc">
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img src="~/assets/icons/exclussion.svg" v-tooltip.top="'Flights are not part of the adventure itself; however, flights from your departure location to the tour’s starting point and from the endpoint back to your original location are included in the final package price. Please contact us if you have any questions about what’s included.'"/>
                          <span class="tab-header-text white-space-nowrap" 
                            >Flights</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour?.flightsDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab v-if="tour?.OptionalDesc">
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img src="~/assets/icons/exclussion.svg" />
                          <span class="font-bold white-space-nowrap"
                            >Optional</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour?.OptionalDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab v-if="tour?.insuranceDesc">
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img src="~/assets/icons/exclussion.svg" />
                          <span class="tab-header-text white-space-nowrap"
                            >Insurance</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour?.insuranceDesc"
                      ></div>
                    </AccordionTab>
                    <AccordionTab v-if="tour?.ethersDesc">
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">
                          <img src="~/assets/icons/exclussion.svg" />
                          <span class="tab-header-text white-space-nowrap"
                            >Others</span
                          >
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="tour?.ethersDesc"
                      ></div>
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
              <hr class="tour-hr" />
              <section class="content">
                <h2 class="div-145">Things to Know</h2>
                <div class="lg-highlights">

                  <Accordion
                    :activeIndex="0"
                    expandIcon="pi pi-plus"
                    collapseIcon="pi pi-minus"
                  >
                    <AccordionTab v-for="(item, index) in thingsToKnow" :key="index">
                      <template #header>
                        <span class="flex align-items-center gap-2 w-full">

                          <h2><i :class="item.icon"></i> &nbsp; {{ item.label }}</h2>
                        </span>
                      </template>
                      <div
                        class="inclusions-desc"
                        v-html="item.desc"
                      ></div>
                    </AccordionTab>
                  </Accordion>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div class="col-12 lg:col-3 font_family_canaro">
          <div class="" style="border: 0.8px solid #e0e0e0; border-radius: 16px">
            <div class="grid m-3">
              <div class="col-3">
                Days
                <div>
                  <span class="length_days_class">{{
                    tour?.tourLengthDays
                  }}</span>
                </div>
              </div>
              <div class="col-9" style="display: flex;flex-direction: column;flex-wrap: wrap;align-content: flex-end;">
                <span style="font-weight: 500; font-family: 'Canaro'">
                  <img src="/filter-icons/flash.svg" alt="" />From
                </span>
                <ProgressBar mode="indeterminate" style="height: 6px" v-if="formatAsCurrency(lowestPrice, 'USD') == '-'"></ProgressBar>
                <div v-else>
                  <span class="price" style="font-size: 22px;"> {{
                    $currencyDecimal(lowestPrice)
                  }}</span>
                </div>
                <div>
                  <span class="per-day"
                    >Per day:
                    {{ $currencyDecimal(lowestPrice/tour?.tourLengthDays) }}</span
                  >
                </div>
                <div>
                  <span class="discount-button" v-if="promo != null" >${{ promo }} USD OFF</span>
                </div>
              </div>
            </div>
            <div class="grid m-3">
              <div class="col-10">
                <div class="mt-2">
                  <img src="/filter-icons/tick.svg" alt="check icon">&nbsp;
                  <span>Best price guaranteed</span>
                </div>
                <div class="mt-2">
                  <img src="/filter-icons/tick.svg" alt="check icon">&nbsp;
                  <span>Guaranteed departure</span>
                </div>
                <div class="mt-2">
                  <img src="/filter-icons/tick.svg" alt="check icon">&nbsp;
                  <span>No booking fees</span>
                </div>
              </div>
              <div class="col-2 flex justify-content-end flex-wrap align-items-end">
                <img
                  src="/filter-icons/heart.svg"
                  alt="heart_image"
                  style="cursor: pointer; height: 60%; width: 20px"
                  @click="toggleWishlist"
                  :class="{ 'active-heart': isInWishlist }"
                />
              </div>
            </div>
            <div class="grid m-3">
              <div class="col-12">
                <a class="text_decoration_none" href="#calendarSection">
                  <button class="btn-cover py-3 see_dates_and_prices">
                    See Dates And Prices
                  </button>
                </a>
              </div>
              <div class="col-12" style="display:none">
                <button class="btn-cover py-3 make_an_enquiry" @click="visible = true">Make An Enquiry</button>
              </div>
              <div
                class="col-12 flex justify-content-center align-items-center flex-wrap mt-3"
                style="font-size: 0.9rem"
              >
                <span class="mx-1">Footprint: </span>
                <span class="mx-1" style="font-weight: bold; color: #82cf45">
                 {{ Math.ceil(footprint) }}</span
                >
                <span class="mx-1" style="text-decoration: underline;">
                  <a class="text-black-alpha-90" href="https://blog.vibeadventures.com/vibe-adventures-partners-with-onetreeplanted-to-plant-trees-for-a-greener-future/">trees planted</a>
                </span>
                <img src="~/assets/trees.svg" alt="airplane icon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
               <!-- Availability & pricing -->
        <section id="calendarSection" class="col-12" ref="stopElement">
          <h3 class="availability_pricing mx-3">Availability & pricing</h3>
          <p class="note_prices_in_calendar interstate-font mx-3">
            NOTE: Prices for travel packages are
            <span class="text-green">dynamic</span>, subject to real-time changes
            based on the availability and pricing of individuals components,
            primarily flights. Please review the tour itinerary for information
            about the start and end of the tour
            <span class="text-green">before choosing your flights</span>.
          </p>

          <!-- CALENDAR -->
          <div class="card_calendar col-12">
            <div class="departure-container w-full">
              <!-- Content Section -->
              <div>
                <!-- Month Selection -->
                <div v-if="showMonths" class="col-4 p-0">
                  <h3 class="my-0">Select a departure Month</h3>
                </div>
                <div v-if="showMonths" class="month-selection col-12 p-0">
                  <template v-for="(month, index) in months" >
                    <Button
                      :key="month.value"
                      v-if="month.departures.length > 0"
                      :label="month.label"
                      :class="['month-departure', { 'selected': selectedMonth === month.value}]"
                      @click="selectMonth(month.value)"
                    />
                  </template>
                  <h3 class="text-center px-2" v-if="!selectedMonth">Sorry we couldn't find any upcoming departure for this tour.</h3>
                </div>

                <!-- Search Bar -->

                <div class="row p-0">
                  <h3 class="my-0">Select a Departure</h3>
                </div>
                <!--<div v-if="showMonths" class=" mb-5 w-full mt-4">
                  <div class="row p-0">
                    <TourPageTourDetailSearchBar v-if="showMonths" :datesRange="datesRange" :searchBar="localSearchBar"
                      @update:searchBar="onSearchBarChange"/>
                  </div>
                </div>

                <!-- Departure Dates Section -->
                <div class="departure-dates col-12 col-lg-8 p-0 mt-5" >
                    <div class="flex text-sm text-black p-3 border-round-top" style="border-bottom:1px solid #ddd;background-color: rgb(252, 233, 220); ">
						<div class="col-5 departure-text p-0"><strong>Travel Dates</strong></div>
                      <div class="col-5 departure-text p-0"><strong>Price per group (USD)</strong></div>
                      <div class="col-2 departure-text p-0"></div>
                    </div>
                    <div v-if="showMonths" v-for="month in months" :key="month.value"  >
                      <div v-if="selectedMonth === month.value && month.departures.length > 0">
                        <div
                          class="flex align-items-center py-2 pl-3 border-200 border-bottom-1"
                          v-for="(offer, index) in month.departures"
                          :key="index"
                        >
                          <!-- Departure Information -->
                          <div class="departure-info col-5 text-left p-0" >
                            <div class="departure-date mr-1" >
                              <span>
								  <strong>{{ offer.formattedInfo.departure_date_formatted }} -
								  {{offer.formattedInfo.departure_return_date_formatted }}</strong>
							  </span>
                            </div>
                          </div>

                          <!-- Price Information -->
                          <div class="departure-price col-5 text-left p-0" style="display:block">
                            <span class="departure-text">
                              <strong>from {{ $currencyDecimal(offer.formattedInfo.final_price) }}</strong>
                            </span>
                            <span class="discount-button" v-if="offer.formattedInfo.promo != null" style="font-size: 10px;">
                              {{ $currencyDecimal(offer.formattedInfo.promo) }} OFF
                            </span>
                          </div>

                          <div class="departure-price col-2 text-center p-0">
                            <Button
                              class="confirm-dates-btn"
                              aria-label="Confirm Dates"
                              @click="confirmDepartureDate(offer)"
                              label="See Details"
                            >
                            </Button>
                          </div>
                        </div>
                        <Button
						  v-show="isCalendarLoading == false && showMoreButton == true"	
                          class="confirm-dates-btn mt-3 float-right"
                          aria-label="Load More"
                          @click="loadMoreDepartures"
                          label="Show more results"
                        >
                        </Button>
                      </div>
                    </div>
                </div>
              </div>
			  <div v-show="isCalendarLoading == true">
                <Skeleton height="20rem"></Skeleton>
                <div class="canaro-font text-xl font-semibold pb-5 text-center">
                  <template v-if="showMainMessage">
                    Please hold, we are loading the results. ✈️🌎 It can take 10–20 seconds. ⏳
                  </template>
                  <template v-else>
                    💡 Travel Tip: {{ currentTip }}
                  </template>
                </div>
              </div>
            </div>
          </div>


          <Dialog
            v-model:visible="visible"
            modal
            header="Make an Enquiry"
            :pt="{
              root: {
                class: 'w-10 md:w-6' 
              }
            }"
          >
            <template #header>
                <div class="flex justify-content-center w-full">
                  <h2 class="text-3xl">Tour <span class="text-green-vibe">Enquiry</span></h2>
                </div>
            </template>
            <p style="text-align: center; color: black;">
              Have questions before booking?
            </p>
            <p style="text-align: center; color: black;">
              Just send your message below, and we will get back to you.
            </p>
            <div :pt="{
              root: {
                class: 'p-0 md:p-3' 
              }
            }">
            <!-- NAME SECTION -->
            <div class="p-fluid grid pb-5 pt-5">
              <!-- Etiqueta -->
              <div class="col-12 md:col-2 flex align-items-center mb-2 md:mb-0">
                <b>Your name: <span class="text-red-500">*</span></b>
              </div>

              <!-- Campo nombre -->
              <div class="col-6 md:col-5 mb-2 md:mb-0">
                <div class="form-group">
                  <InputText v-model="params_enquiry.name" placeholder="First name" :invalid="errorsForm.name" />
                </div>
              </div>

              <!-- Campo apellido -->
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="params_enquiry.last_name" placeholder="Last name" :invalid="errorsForm.last_name" />
                </div>
              </div>
            </div>
            <!-- END NAME SECTION -->
            <!-- EMAIL SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center mb-2 md:mb-0">
                <b>Your email: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="params_enquiry.email" placeholder="Email address" :invalid="errorsForm.email"/>
                </div>
              </div>
              <div class="col-6 md:col-5">
                <div class="form-group">
                  <InputText v-model="params_enquiry.confirm_email" placeholder="Confirm email address" :invalid="errorsForm.confirm_email"/>
                </div>
              </div>
            </div>
            <!-- END EMAIL SECTION -->
            <!-- TOPIC SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center mb-2 md:mb-0">
                <b>Topic: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <Dropdown v-model="params_enquiry.topic" :options="groupedTopics" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Select the topic" :invalid="errorsForm.topic">
                    <template #optiongroup="slotProps">
                        <div class="flex align-items-center">
                            <b class="text-gray-500">{{ slotProps.option.label }}</b>
                        </div>
                    </template>

                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div style="margin-left:15px;">{{ slotProps.option.label }}</div>
                        </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <!-- END TOPIC SECTION -->

            <!-- BOOKING SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center mb-2 md:mb-0">
                <b>Booking #:</b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <InputText v-model="params_enquiry.booking" placeholder="Enter booking # (optional)" />
                </div>
              </div>
            </div>
            <!-- END BOOKING SECTION -->

            <!-- MESSAGE SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 md:col-2 flex align-items-center mb-2 md:mb-0">
                <b>Message: <span class="text-red-500">*</span></b>
              </div>
              <div class="col-12 md:col-10">
                <div class="form-group">
                  <Textarea v-model="params_enquiry.message" placeholder="Enter your message" rows="5" :invalid="errorsForm.message"/>
                </div>
              </div>
            </div>
            <!-- END MESSAGE SECTION -->

            <!-- FOOTER SECTION -->
            <div class="p-fluid grid pb-5">
              <div class="col-12 flex justify-content-between align-items-center">
                <div class="flex align-items-center">
                  <Checkbox v-model="checked" :binary="true" />&nbsp;
                  <span>
                    By proceeding, you accept our
                    <a class="text-green-vibe" href="https://vibeadventures.com/privacy-policy/" target="_blank">Data Policy</a>.
                  </span>
                </div>

                <Button class="w-auto" label="Send" @click="submitForm" :loading="loading" />
              </div>
            </div>
            <!-- END FOOTER SECTION -->
            </div>
          </Dialog>
          <Dialog
          v-model:visible="profile"
          dismissableMask
          :showHeader="false"
          modal
          :closable="true"
          :style="{ width: '400px' }"
          :pt="{ content: { class: 'p-0' } }"
          class="login-dialog">
            <ProfileLink  />
          </Dialog>
        </section>
    </div>

    <div v-show="isTourLoading">
      <Skeleton height="40rem" class="p-1"></Skeleton>
    </div>
  </div>
  <whyvibeadventures />
  <Toast />
</template>

<script setup>
import { ref, onMounted, computed, watch, toRaw, unref } from "vue";
import Breadcrumb from "primevue/breadcrumb";
import Accordion from "primevue/accordion";
import Skeleton from "primevue/skeleton";
import AccordionTab from "primevue/accordiontab";
import Carousel from "primevue/carousel";
import whyvibeadventures from "~/components/WhyVibeAdventures.vue";
import TabMenu from "primevue/tabmenu";
import Calendar from "primevue/calendar";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'	
import { useToast } from "primevue/usetoast";
import { GLOBAL_LOCATIONS } from "~/utils/globalLocations";
import { VIBE_REVENUE_TOUR } from "~/utils/VibeRevenueTour";
import { VIBE_REVENUE_FLIGHT } from "~/utils/VibeRevenueFlight";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Checkbox from 'primevue/checkbox';
import ProgressBar from 'primevue/progressbar';
import { tourStore } from "~/store/tourStore";
import ProfileLink from "~/components/ProfileLink.vue";
import Dropdown from "primevue/dropdown";
import TourRating from "~/components/TourRating.vue";
dayjs.extend(isBetween);
import { useTravelTips } from 'public/composables/useTravelTips.js';
const { showMainMessage, currentTip, startTips, stopTips } = useTravelTips(5000);
const profile= ref(false);
const userId = ref(null);
const tourID = ref(null);
const userName = ref(null);
const userEmail = ref(null);
const tour_Store= tourStore();
const checked = ref(false);
const visible = ref(false);
const config = useRuntimeConfig();
const dateSelectedInCalendar = ref();
const datesRange = ref();
const departure_fly_from = ref("");
const totalTravelers = ref(0);
const adultsCount = ref(0);
const childrenCount = ref(0);
const infantsCount = ref(0);
const isCalendarLoading = ref(true);
const isTourLoading = ref(true);
const departureSelectedInCalendar = ref({});
const datesInThePast = ref([]);
const toast = useToast();
const router = useRouter();
const allDepartures = ref();
const visibleDepartures = ref(10);
const lowestPrice = ref();
const lowestPricePerDay = ref();
const showMoreButton = ref(true);	

const list_range = ref([
  { condition: (price) => price <= 300, val: 1 },
  { condition: (price) => price <= 600, val: 2 },
  { condition: (price) => price <= 1000, val: 3 },
  { condition: (price) => price <= 1800, val: 4 },
  { condition: (price) => price > 1800, val: 5 },
]);

const footprint = computed(() => {
  const range = list_range.value.find((range) =>
    range.condition(totalPackagePriceComputed.value)
  );
  return range ? range.val : 0;
});

const generateMonths = (numMonths = 12, dateStart = null) => {
  const result = {
    upcoming: {
      label: "Upcoming departures",
      value: "upcoming",
      departures: []
    },
  };
  const today = dateStart === null ? new Date() : new Date(dateStart);
  for (let i = 0; i < numMonths; i++) {

    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const year = date.getFullYear();
    const month = date.toLocaleString("en", { month: "long" });
    const key = `${year}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;

    result[key] = {
      label: `${month} ${year}`,
      value: key,
      departures: [],
    };
  }

  return result;
};

const months = ref(generateMonths(12));
const possibleDepartures = ref(0);
const selectedMonth = ref("");
const moreDetails = ref(false);

const errorsForm = ref({})

const acceptTermsAndConditions = ref(false);

const showMap = ref(false);
const activeIndexes = ref([0]);
const allExpanded = computed(() => {
  return tour.value.itinerary && activeIndexes.value.length === tour.value.itinerary.length;
});
const toggleAccordion = () => {
  if (allExpanded.value) {
    activeIndexes.value = [];
  } else {
    activeIndexes.value = tour.value.itinerary.map((_, index) => index);
  }
};
const moreDetailsToggle = () => {
  moreDetails.value = moreDetails.value ? false : true;
}

const loading = ref(false);

const priceSummaryItemsNames = ref({
  default: "default",
  accommodation: "accommodation",
  mandatoryAddons: "mandatoryAddons",
  flight: "flight",
  optionalExtra: "optionalExtra",
});
	
const passengerTypes = ref({
  adult: "adult",
  child: "child",
  infant: "infant",
});

const tournavs = ref([
  { label: "Overview", url: "#overview" },
  { label: "Itinerary", url: "#itinerary" },
  { label: "Includes", url: "#includes" },
  { label: "Availability", url: "#calendarSection" },
]);

const tour = ref([]);
const datesListInView = ref([]);
const datesWithDeparture = ref({});

const showToast = (msg) => {
  toast.add({ severity: "Secondary", detail: msg, life: 3000 });
};

//navigate to next page helpers	
function calculateRange(departureDate) {
  let startOfMonth = dayjs(departureDate).startOf("month");
  const today = dayjs();
  if (startOfMonth.isBefore(today, "day")) {
    startOfMonth = today;
  }

  startOfMonth = startOfMonth.format("YYYYMMDD");
  const endOfMonth = dayjs(departureDate).endOf("month").format("YYYYMMDD");

  return `${startOfMonth}-${endOfMonth}`;
}

function navigateToNextPage() {
  const route = {
    path: "/book",
    query: {
      tourId: tour.value.tour_id,
      departureId: departureSelectedInCalendar.value.id,
      adultsCount: localSearchBar.value.travelersSelected.adults,
      childrenCount: localSearchBar.value.travelersSelected.children,
      duffelRequestId: departureSelectedInCalendar.value.duffel.id,
      duffelOfferId: departureSelectedInCalendar.value.duffel.offers[0].id,
      datesRange: calculateRange(departureSelectedInCalendar.value.date),
    },
  };
  router.push(route);
}


const totalTravelersComputed = computed(() => {
  const total =
    adultsCount.value + childrenCount.value + infantsCount.value ?? 0;
  return total;
});

const totalTravelersLabelComputed = computed(() => {
  const adults = adultsCount.value > 1 ? "adults" : "adult";
  const children = childrenCount.value > 1 ? "children" : "child";
  const stringChildren = childrenCount.value == 0 ? "" : `, ${childrenCount.value} ${children}`;
  return `${adultsCount.value} ${adults}${stringChildren}`;
});

const mandatoryAddonsComputed = computed(() => {
  const firstDeparture = tour?.value?.availableDepartures?.[0];
  if (!firstDeparture) {
    return [];
  }
  if (!firstDeparture?.prices?.mandatory_addons?.length) {
    return [];
  }

  let items = [];
  for (const mandatoryAddon of firstDeparture.prices.mandatory_addons) {
    const unitprice = mandatoryAddon.value;
    const totalPrice = unitprice * parseInt(totalTravelersComputed.value);
    const addon = {
      itemName: priceSummaryItemsNames.value.mandatoryAddons,
      unitPrice: unitprice,
      totalPrice: totalPrice,
      passengers: parseInt(totalTravelersComputed.value),
      passengerType: passengerTypes.value.adult,
      details: `${mandatoryAddon.name} (${mandatoryAddon.payment_type})`,
    };
    items.push(addon);
  }
  return items;
});

const defaultItemsComputed = computed(() => {
  const firstDeparture = tour?.value.availableDepartures?.[0];
  if (!firstDeparture) {
    return [];
  }
  if (!firstDeparture?.prices?.price_total) {
    return [];
  }

  let items = [];

  const rawUnitPrice = firstDeparture.prices.price_base;
  const aditionalCost = rawUnitPrice * VIBE_REVENUE_TOUR;
  const vibeTourUnitPrice = rawUnitPrice + aditionalCost;
  const totalPriceAdult = vibeTourUnitPrice * adultsCount.value;

  const newItemAdults = {
    itemName: priceSummaryItemsNames.value.default,
    unitPrice: vibeTourUnitPrice,
    totalPrice: totalPriceAdult,
    passengers: parseInt(adultsCount.value),
    passengerType: passengerTypes.value.adult,
    details: null,
  };
  items.push(newItemAdults);

  if (childrenCount.value > 0) {
    const totalPriceChild = vibeTourUnitPrice * childrenCount.value;
    const newItemChildren = {
      itemName: priceSummaryItemsNames.value.default,
      unitPrice: vibeTourUnitPrice,
      totalPrice: totalPriceChild,
      passengers: parseInt(childrenCount.value),
      passengerType: passengerTypes.value.child,
      details: null,
    };
    items.push(newItemChildren);
  }

  return items;
});

const duffelOfferSelectedInCalendarComputed = computed(() => {
  if (!dateSelectedInCalendar?.value) {
    return null;
  }

  const formattedDate = dayjs(dateSelectedInCalendar.value).format(
    "DD/MM/YYYY"
  );
  const departureToSelect = datesWithDeparture.value?.[formattedDate];
  if (!departureToSelect) {
    return null;
  }
  return departureToSelect?.duffel?.offers?.[0] ?? null;
});

const vibeFlightsPriceAllPersonComputed = computed(() => {
  // default departure
  let firstPossibleDeparture = tour?.value?.possibleDepartures?.[0];
  let firstPossibleOffer = firstPossibleDeparture?.duffel?.offers?.[0];

  let offer = duffelOfferSelectedInCalendarComputed.value ?? firstPossibleOffer;
  if (!offer) {
    return null;
  }
  if (!offer?.total_amount) {
    return null;
  }

  // RAW PRICES
  const rawPriceFlightAllPerson = parseFloat(offer.total_amount);

  // ADDITIONAL COSTS
  //const additionalFlightCost = rawPriceFlightAllPerson * VIBE_REVENUE_FLIGHT;
  const additionalFlightCost = rawPriceFlightAllPerson * 1.15;

  // VIBE FLIGHT PRICE = RAW PRICE + ADDITIONAL COST
  const vibeFlightsPriceAllPerson =
    rawPriceFlightAllPerson + additionalFlightCost;

  // rounded
  return vibeFlightsPriceAllPerson ?? 0;
});

const flightItemComputed = computed(() => {
  const unitPrice =
    vibeFlightsPriceAllPersonComputed.value /
    parseInt(totalTravelersComputed.value);

  const item = {
    itemName: priceSummaryItemsNames.value.flight,
    unitPrice: unitPrice,
    totalPrice: vibeFlightsPriceAllPersonComputed.value,
    passengers: parseInt(totalTravelersComputed.value),
    passengerType: passengerTypes.value.adult,
    details: null,
  };
  return item;
});

const priceSummaryDetailsComputed = computed(() => {
  let items = [];

  // default
  if (defaultItemsComputed.value.length > 0) {
    console.log("defaultItemsComputed.value", defaultItemsComputed.value);
    items = [...defaultItemsComputed.value];
  } else {
    console.log("tourTotalPriceComputed.value", tourTotalPriceComputed.value);
    // Ensure you're adding the totalPrice directly at the top level
    items = [...items, { totalPrice: tourTotalPriceComputed.value }];
  }

  // mandatory addons
  if (mandatoryAddonsComputed.value.length) {
    items = [...items, ...mandatoryAddonsComputed.value];
  }

  // selected flight
  if (flightItemComputed.value) {
    items.push(flightItemComputed.value);
  }

  return items;
});

const totalPackagePriceComputed = computed(() => {
  let total = 0;
  for (const item of priceSummaryDetailsComputed.value) {
  console.log("priceSummaryDetailsComputed.value.item",item);
    total += item.totalPrice;
  }
  return total;
});

function formatSelectedDateToRoute(dateString){
  console.log('DATE FORMATT FOR', dateString);
  var date = dateString.split("-");
	
  if(!date[0]){
    return null;
  }
  const year = parseInt(date[0].substring(0, 4), 10);
  const month = parseInt(date[0].substring(4, 6), 10);
  const moth_formatted = month.toString().padStart(2, '0');;
  const day = parseInt(date[0].substring(6, 8), 10);
  return year + "-" + moth_formatted + "-" + day.toString().padStart(2, '0');
}

async function startBooking() {
  if (!departureSelectedInCalendar.value?.id) {
    showToast("Please select a departure");
    return false;
  }
  navigateToNextPage();
  return true;
}

const getDateAsObject = (date) => {
  return new Date(date.year, date.month, date.day);
};

function formatAsCurrency(price, currency) {
  let number = Math.ceil(price); // Remove the extra dot before Math.ceil
  console.log("price before formatAsCurrency", number);
  if (!number) {
    return "-";
  }
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // No decimals
    maximumFractionDigits: 0, // No decimals
  });
}


async function fetchTour(tourId) {
  const { data, error } = await useFetch(
    `${config.public.BACKEND_URL}/api/tour/${tourId}`
  );
  if (error?.value) {
    console.info("Error fetching tour: ", error?.value?.message);
  }
  return data?.value?.data ?? null;
}

const windowMobile = ref(false);
const checkMobile = () => {
  windowMobile.value = window.innerWidth <= 768;
};

// get params helpers	

function formatTourTypes(tourTypes) {
  if (!tourTypes?.length) {
    return [];
  }

  const explorerType = 11;
  const familyType = 26;

  const filteredTourTypes = tourTypes.filter((type) =>
    [explorerType, 14, familyType].includes(type.group_id)
  );
  return filteredTourTypes.map((type) => type.type_name);
}
	
function getAdultsCount(params, name) {
  const defaultValue = 1;
  if (!params.get(name)) {
    return defaultValue;
  }
  return parseInt(params.get(name));
}

function getChildrenCount(params, name) {
  const defaultValue = 0;
  if (!params.get(name)) {
    return defaultValue;
  }
  return parseInt(params.get(name));
}

function getInfantsCount(params, name) {
  const defaultValue = 0;
  if (!params.get(name)) {
    return defaultValue;
  }
  return parseInt(params.get(name));
}

function getDefaultDepartureRange() {
  const starts = dayjs().add(1, "day").format("YYYYMMDD");
  const ends = dayjs().add(1, "month").format("YYYYMMDD");
  return `${starts}-${ends}`;
}	
	
// Dates formatting helpers	
const unformattedDate = ref();
	
function getDepartureRange(params, name) {
  const unformatted = params.get(name);
  unformattedDate.value = unformatted;
  console.log("unformatted: ",unformatted);
  if (!unformatted) {
  console.log("no dateselected");
  const defaultValue = getDefaultDepartureRange();
    return defaultValue;
  }else{
    const formatted = formatDateRange(unformatted);
    console.log("formatted ",formatted);
    return formatted;
  }
}

function formatDateRange(dateRange) {
  const [start, end] = dateRange.split('-'); // Split the range into start and end dates
  console.log("start, end",start, end);
  const formattedStart = dayjs(start, 'YYYY/MM/DD').format('YYYYMMDD');
  const formattedEnd = dayjs(end, 'YYYY/MM/DD').format('YYYYMMDD');
  return `${formattedStart}-${formattedEnd}`;
}	
// Dates formatting helpers	
	
// Main flow functions

const storageTour = ref();		
	
async function handleTourData(tour, departure_range, origin) {
  isCalendarLoading.value = true;
  tour.availableDepartures = [];

  const key = `${tour.tour_id}-${unformattedDate.value}`;
  const localTour = JSON.parse(localStorage.getItem(key));
  console.log("localTour",localTour);
  if(localTour?.value){
	  storageTour.value = localTour.value;
  	  const rawList = localTour.value.departures;
  	  tour.availableDepartures.push(...rawList);
	  // split — "ready" means duffel exists with offers (non-empty)
	  const readyWithDuffel = [];
	  const withoutDuffel = [];

	  for (const d of rawList) { 
		if (d.duffel.offers.length) {
		  console.log("d rawList",d);
		  readyWithDuffel.push(d);
		} else {
		  withoutDuffel.push(d);
		}
	  }

	  // process ready ones first (concurrently, but safe)
	  if (readyWithDuffel.length) {
		await Promise.allSettled(readyWithDuffel.map(d => processDepartureIntoMonths(d)));
	  }

	  // process the rest: fetch flights -> process each
	  if (withoutDuffel.length) {
		await getFlightsForPossibleDepartures(withoutDuffel);
	  }
  } else {
	  const availableDepartures = await fetchDepartures(tour.tour_id,departure_range,20);
	  tour.availableDepartures.push(...availableDepartures);	
	  if (availableDepartures.length) {
		  
   const flightDepartures = await getFlightsForPossibleDepartures(availableDepartures,tour);
	  }
  }
  isCalendarLoading.value = false;
  return tour;
}

async function fetchDepartures(tourId, dateRange, limit = null) {
  console.log("dateRange",dateRange);
  const url = `${config.public.BACKEND_URL}/api/departures/?tourId=${tourId}&date_range=${dateRange}`;
  const options = {
    headers: {
      accept: "application/json",
    },
  };
  const { data } = await useFetch(url, options);

  let departures = data?.value?.data?.items ?? [];

  // departures = departures.filter((dep) => dep?.departure_type === "guaranteed");

  if (!departures.length) {
    showToast(`Try advancing the calendar month`);
    console.info(
      "There are no available departures. Let's try by changing the dateRange..."
    );
    return await fetchWithDefaultDateRange(tourId,dateRange);
  }
  if (limit) {
    const onlyAFewDepartures = departures.slice(0, limit);
    return onlyAFewDepartures;
  }
  return departures;
}	

async function getIataCodeByCityName(cityName) {
  const location = GLOBAL_LOCATIONS.find(
    (location) => location.city == cityName
  );
  if (!location?.code) {
    console.error(`There's no IATA code for city ${cityName}`);
    return "";
  }
  return location.code;
}	
	
async function getFlightsForPossibleDepartures(departures,tour) {
  	  let origin; 
	  let destination;
	  let originInbound; 
	  let destinationInbound; 
	  let tourLengthDays; 	
  if(storageTour?.value){
	  origin = storageTour.value.origin;
	  destination = storageTour.value.startIata;	
	  originInbound = storageTour.value.endIata;
	  destinationInbound = storageTour.value.origin;
	  tourLengthDays = storageTour.value.tour_length_days;	
  }else{
	  origin = departure_fly_from.value;
	  destination = await getIataCodeByCityName(tour?.start_city?.city_name);		
	  originInbound = await getIataCodeByCityName(tour?.end_city?.city_name);
	  destinationInbound = departure_fly_from.value;
	  tourLengthDays = tour.tour_length_days;
  }
  
  for (const departure of departures) {
    // 1) fetch flight info
    departure.duffel = await getFlights(departure,origin,destination,originInbound,destinationInbound,tourLengthDays);
    // 2) immediately stick it into "months" (and your allDepartures)
    await processDepartureIntoMonths(departure);
  }
}	

async function getFlights(departure,origin,destination,originInbound,destinationInbound,tourLengthDays) {
  const departureDate = dayjs(departure.date).subtract(1, "day").format('YYYY-MM-DD');	
  const tourEndDate = dayjs(departure.date).add(tourLengthDays, "day").format("YYYY-MM-DD"); 
  const tourDate = dayjs(departure.date).format('YYYY-MM-DD');
  const departureDateInbound = dayjs(tourEndDate).add(1, 'day').format('YYYY-MM-DD');	
  return await fetchFlights({
    origin,
    destination,
	originInbound,
    destinationInbound,  
    departureDate,
    departureDateInbound,
	tourDate,
	tourEndDate  
  });
}	
	
async function fetchFlights(paramsObj) {
  const {
  origin,
  destination,
  originInbound,
  destinationInbound,	  
  departureDate,
  departureDateInbound,
  tourDate,
  tourEndDate  
  } = paramsObj;
  
  const params = new URLSearchParams();
	
  params.append("origin", origin);
  params.append("destination", destination);
  params.append("departureDate", departureDate);
  params.append("originInbound", originInbound);
  params.append("destinationInbound", destinationInbound);
  params.append("departureDateInbound", departureDateInbound);
  params.append("tourDate", tourDate);
  params.append("tourEndDate", tourEndDate); 
  
  params.append("adultsCount", adultsCount.value);
  params.append("childrenCount", childrenCount.value);
  params.append('departureTimeFromInbound','21:00');
  params.append('arrivalTimeTo','06:00');
  params.append("limit", 3);
  params.append("sortByLeastExpensive", "sortByLeastExpensive");
  //params.append('payment','false');
  //params.append('airlines','AA');

  const url = `${config.public.BACKEND_URL}/api/duffel/create-request-get-offers?${params.toString()}`;
  const { data, error } = await useFetch(url);
  if (error?.value?.data?.message) {
    for (const key in error?.value?.data?.message) {
      console.error(`${key}: ${error?.value?.data?.message[key]}`);
    }
    return [];
  }
  return data?.value?.data ?? [];
}	
	
const showMonths = ref(false);		
	
async function processDepartureIntoMonths(departure) {
  selectedMonth.value = 'upcoming';	
	console.log("processDepartureIntoMonths",departure);
  // skip ones with no offers, etc.
  if (!departure.duffel?.offers?.length) return;
  
  // compute your formattedInfo, prices, promotion, etc.
  const info = await buildFormattedInfo(departure);
	console.log("buildFormattedInfo info",info);
  departure.formattedInfo = info;
  
  // assign into the right month bin
  const { departure_month, departure_year } = info;
  console.log("departure_month=",departure_month,", departure_year=",departure_year);
  for (var key in months.value) {
      var pieces = key.split('-');
      var key_month = parseInt(pieces[1]);
      var key_year = parseInt(pieces[0]);
	  console.log("key_month=",key_month,",key_year=",key_year);
      if (key_month === departure_month && key_year === departure_year){
          months.value[key].departures.push(departure);
		  months.value.upcoming.departures.push(departure);
		  showMonths.value = true;
	  console.log("matching key_month: ",key_month, " = departure_month:",departure_month);
      }else{console.log("departures are not matching flights");}
    }
  console.log("months.value:",months.value);
  const upcomingDepartures = months.value.upcoming.departures;
	// find the one with the smallest final_price
	const lowestDeparture = upcomingDepartures.reduce((min, dep) => {
	  // if min is null (first iteration) or this dep is cheaper, pick it
	  return !min || dep.formattedInfo.final_price < min.formattedInfo.final_price
		? dep
		: min;
	}, null);

	lowestPrice.value = lowestDeparture.formattedInfo.final_price;
	lowestPricePerDay.value = Math.ceil(
	  lowestPrice.value / tour.tour_length_days
	);	
  // also keep a master list for “lowest price” logic
  //months.value.push(...departure);
  //recalcLowestPrice();
}	

async function buildFormattedInfo(departure) {
	console.log("buildFormattedInfo ceparture ",departure);
	console.log("buildFormattedInfo tour.value ",tour.value);
	console.log("buildFormattedInfo adultsCount.value ",adultsCount.value);
	console.log("buildFormattedInfo childrenCount.value ",childrenCount.value);
	
  const totalTravelers = adultsCount.value + childrenCount.value;
  // 1) date parts
  const {
    departure_day,
    departure_date_formatted,
    departure_return_day,
    departure_return_date_formatted,
    departure_month,
    departure_year
  } = await getDepartureFormattedDates(departure);

  // 3) pick the right accommodation tier
  const accommodations = departure.departures.prices.accommodations;	
  const selectedAccommodation = selectAccommodation(accommodations,totalTravelers);

  // 4) unit prices
  const unitAdult = selectedAccommodation?.price_tiers?.[0]?.value_promotion
    ?? selectedAccommodation?.price_tiers?.[0]?.value
    ?? 0;
  const totalPriceAdult = unitAdult * adultsCount.value;

  let totalPriceChild = 0;
  let unitChild = null;	
  if (childrenCount > 0) {
  unitChild = selectedAccommodation?.price_tiers?.[1]?.value_promotion
      ?? selectedAccommodation?.price_tiers?.[1]?.value
      ?? unitAdult;
    totalPriceChild = unitChild * childrenCount.value;
  }

  // 5) flight price from your DUFFEL response on departure
  const flight_price = Number(departure?.duffel?.offers?.[0].total_amount);

  // 6) final costs with your 15% markup
  const final_price = (totalPriceAdult + totalPriceChild + flight_price) * 1.15;
  const final_price_pp = final_price / totalTravelers;

  // 7) promotion info (if any)
  let promotion, promo;
  if (departure.prices?.promotion) {
    promotion = Number(departure.prices.promotion.discount);
    promo = Math.ceil(Math.abs(promotion));
  }

  // 8) return the assembled object
  return {
    departure_day,
    departure_date_formatted,
    departure_return_day,
    departure_return_date_formatted,
    departure_month,
    departure_year,
    passengers: totalTravelers,
    totalTravelers,
    flight_price,
    final_price,
    final_price_pp,
	selectedAccommodation, 
	childrenCount,
	unitChild,  
    // only include if there was a discount
    ...(promotion != null ? { promotion, promo } : {})
  }
}		
	
	
	
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  nextTick(async () => {
    const params = new URLSearchParams(window.location.search);
    const tourId = params.get("tourId") ?? "200039";
    tourID.value = tourId;
    adultsCount.value = getAdultsCount(params, "adultsCount");
    childrenCount.value = getChildrenCount(params, "childrenCount");
    datesRange.value = getDepartureRange(params, "dateRange");
	console.log("on mounted datesRange.value",datesRange.value);  
    totalTravelers.value = adultsCount.value+childrenCount.value;
	departure_fly_from.value = params.get('departureSelected') ?? 'NYC';  
    if (tourId) {
      isTourLoading.value = true;
      tour.value = await fetchTour(tourId);
      tour.value.tourTypes = formatTourTypes(tour?.value?.tour_types);
      isTourLoading.value = false;
      tour.value = await handleTourData(tour.value, datesRange.value, 'MOUNTED');
      return;
    } else {
      console.error("ID parameter not found in the URL.");
    }
  });
});

const tourTotalPriceComputed = computed(() => {
  if (!tour?.value?.prices?.price_total) {
    return 0;
  }
  console.log("tour.value",tour.value);
  const rawTourPrice = tour.value.prices.price_total;
  const aditionalCost = rawTourPrice * VIBE_REVENUE_TOUR;
  const vibeTotalPrice = rawTourPrice + aditionalCost;
  return Math.round(vibeTotalPrice);
});

const tourPricePerDay = computed(() => {
  if (!totalPackagePriceComputed?.value || !tour?.value?.tourLengthDays) {
    return 0;
  }

  const vibePricePerDay =
    totalPackagePriceComputed.value / tour.value.tourLengthDays;
  return vibePricePerDay;
});

const promo = ref();


function selectMonth(month){
  isCalendarLoading.value = true;
  console.log("monthChanged", month);
  selectedMonth.value = month;
  isCalendarLoading.value = false;
}

async function getDepartureFormattedDates(departure) {
  console.log("getDepartureFormattedDates departure: ",departure);
  var dates = {};

  if (departure?.duffel?.offers?.length) {

    var dpFlight = new Date(departure.duffel.offers[0].slices[0].segments[0]?.departing_at);
    var departureMonth = dpFlight.getMonth() + 1;
    var departureYear = dpFlight.getFullYear();
    var formattedDay = dpFlight.toLocaleDateString('en-US', { weekday: 'long' });
    var formattedDate = dpFlight.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    var dpReturnFlight = new Date(departure.duffel.offers[0].slices[1].segments[0]?.departing_at);
    var departureReturnMonth = dpReturnFlight.getMonth() + 1;
    var departureReturnYear = dpReturnFlight.getFullYear();
    var formattedReturnDay = dpReturnFlight.toLocaleDateString('en-US', { weekday: 'long' });
    var formattedReturnDate = dpReturnFlight.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    dates['departure_month'] = departureMonth;
    dates['departure_year'] = departureYear;
    dates['departure_date_mdy'] = dayjs(departure.duffel.offers[0].slices[0].segments[0]?.departing_at).format("MM/DD/YYYY");
    dates['departure_day'] = formattedDay;
    dates['departure_date_formatted'] = formattedDate;

    dates['departure_return_month'] = departureReturnMonth;
    dates['departure_return_year'] = departureReturnYear;
    dates['departure_return_date_mdy'] = dayjs(departure.duffel.offers[0].slices[1].segments[0]?.departing_at).format("MM/DD/YYYY");
    dates['departure_return_day'] = formattedReturnDay;
    dates['departure_return_date_formatted'] = formattedReturnDate;
  console.log("getDepartureFormattedDates", departure);
  }else {console.log("no duffel offers on this departure");}

  return dates;
}

function formatPassengerCount(passengers) {

  if (!passengers || passengers.length === 0) {
    return "No passengers";
  }

  const counts = passengers.reduce(
    (acc, passenger) => {
      if (passenger.type === "adult") {
        acc.adults++;
      } else if (passenger.type === "kid") {
        acc.kids++;
      }
      return acc;
    },
    { adults: 0, kids: 0 }
  );

  const formatted = [
    counts.adults > 0 ? `${counts.adults} adult${counts.adults > 1 ? "s" : ""}` : null,
    counts.kids > 0 ? `${counts.kids} kid${counts.kids > 1 ? "s" : ""}` : null,
  ]
  .filter(Boolean) // Remove null values
  .join(", ");

  return formatted;
}

function confirmDepartureDate(offer){
  console.log(offer);
  departureSelectedInCalendar.value = offer;
  localStorage.setItem("selectedDepartureId", offer.id);
  buildBookRoute();
}

const homeFormStore = useHomeFormStore();
	
function buildBookRoute() {
  const { travelersSelected } = storeToRefs(homeFormStore)
  const selected_dates_input = formatSelectedDateToRoute(datesRange.value);
  console.log("months.value.upcoming",months.value.upcoming);
  const payload = {
      savedAt: dayjs().valueOf(),
      value: months.value.upcoming
    }
  localStorage.setItem('departuresStored', JSON.stringify(payload));
  const url = `${config.public.FRONTEND_URL}/book`;
  const params = {
      tourId: tour.value.tour_id,
      departureId: departureSelectedInCalendar.value.id,
      adultsCount: travelersSelected.value.adults,
      childrenCount: travelersSelected.value.children,
      duffelRequestId: departureSelectedInCalendar.value.duffel.requestId,
      duffelOfferId: departureSelectedInCalendar.value.duffel.offers[0].id,
      departure_fly_from: storageTour.value.origin,
      datesRange: datesRange.value
  };
   const queryString = new URLSearchParams(params).toString();
   const href = `${url}?${queryString}`;
   window.open(href, '_blank');
}


const selectAccommodation = (accommodations, totalTravelers) => {
  if (!Array.isArray(accommodations) || accommodations.length === 0) return null;

  // coerce totalTravelers to a number (handle strings etc)
  const total = Number(totalTravelers) || 0;

  const getEffectiveValue = (acc) => {
    const tierValues = (acc.price_tiers || [])
      .map(t => Number.isFinite(t.value) ? t.value : Infinity)
      .filter(v => Number.isFinite(v));
    const base = Number.isFinite(acc.value) ? acc.value : Infinity;
    return tierValues.length ? Math.min(base, ...tierValues) : base;
  };

  // flexible check for "shared" (handles true, "true", 1, etc)
  const isShared = (acc) => {
    if (!acc) return false;
    return acc.is_shared === true || acc.is_shared === 'true' || acc.is_shared === 1;
  };

  // annotate
  const annotated = accommodations.map(acc => ({
    ...acc,
    effectiveValue: getEffectiveValue(acc),
    _isShared: isShared(acc)
  }));

  // --- 1) If odd total, prefer shared (explicitly) ---
  if (total % 2 === 1) {
    const sharedOptions = annotated.filter(a => a._isShared);
    if (sharedOptions.length) {
      // choose the cheapest shared (by effectiveValue) — but we **prefer shared regardless of price**
      sharedOptions.sort((a, b) => a.effectiveValue - b.effectiveValue);
      console.debug('selectAccommodation: odd group -> choosing shared option', sharedOptions[0]);
      return sharedOptions[0];
    }
    // if no shared options exist, continue to normal logic
  }

  // --- 2) Try to find an accommodation that fits the entire group in one unit ---
  const fitOptions = annotated.filter(a => Number.isFinite(a.beds_number) && a.beds_number >= total);
  if (fitOptions.length) {
    fitOptions.sort((a, b) => a.effectiveValue - b.effectiveValue);
    console.debug('selectAccommodation: fit option chosen', fitOptions[0]);
    return fitOptions[0];
  }

  // --- 3) Fallback: cheapest overall ---
  annotated.sort((a, b) => a.effectiveValue - b.effectiveValue);
  console.debug('selectAccommodation: fallback cheapest chosen', annotated[0]);
  return annotated[0];
};

const formatAccomodationData = async (info) => {

  const accommodations = info;
  const lowestPriceAccommodation = accommodations.reduce((lowest, current) =>
    current.value < lowest.value ? current : lowest
  );
  let adults = 0;
  let children = 0;

  accommodations.forEach((accommodation) => {
    accommodation.price_tiers.forEach((tier) => {
      if (tier.external_reference === "adult") {
        adults += 1;
      } else if (tier.external_reference === "child") {

        children += 1;
      }
    });
  });

  const result = [
    adults > 0 ? `${adults} adult${adults > 1 ? "s" : ""}` : null,
    children > 0 ? `${children} child${children > 1 ? "ren" : ""}` : null,
  ]
  .filter(Boolean)
  .join(", ");

  return {
    summary: result,
    lowestPriceAccommodation,
  };

}

const isInWishlist = ref(false); // Track if the tour is already in the wishlist

// Function to toggle the wishlist status
const toggleWishlist = async () => {
  isInWishlist.value = !isInWishlist.value;
  userId.value = localStorage.getItem('user_id');
  if(!userId.value){
    console.log("login first");
    profile.value = true;
  }
  if (isInWishlist.value && userId.value && tourID.value) {
    try {
      const response = await fetch(`${config.public.BACKEND_URL}/api/wishlists-add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tour_id: tourID.value, // Assuming you have the tour ID in your component
          user_id: userId.value // Replace with the actual user ID
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to wishlist");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
      isInWishlist.value = false; // Revert the change in case of an error
    }
  } else {
    // Implement the logic to remove the tour from the wishlist
  }
  return {
    isInWishlist,
    toggleWishlist,
  };
};
if (isCalendarLoading) {
  startTips();
}

watch(isCalendarLoading, (newVal) => {
  if (newVal) {
    startTips();
  } else {
    stopTips();
  }
});

const thingsToKnow = ref([
  {label: "Payment", icon: "pi pi-wallet", desc: 'For any tour departures, full payment is required.'},
  {label: "Travel Insurance", icon: "pi pi-heart-fill", desc: '<p> Most of the adventures on our platform require you to have valid travel insurance, covering medical and personal accidents, including repatriation costs and emergency evacuation (please check the description of each adventure for more details). We suggest you obtain it independently through any of your preferred insurance providers, or online through our <a href="https://www.visitorscoverage.com/?irclickid=RkeRlDWlMxycWhMV64yrzU0IUkpRTkSu9Vq21I0&sharedid=&irpid=5991189&utm_campaign=affiliate&utm_source=impact&irgwc=1&afsrc=1" target="_blank" >partner</a>. </p>'},
  {label: "Visa", icon: "pi pi-id-card", desc: '<p>  Each traveler is responsible for obtaining the necessary  visa(s) for this tour, as visa requirements differ based on  nationality. It\'s advisable to check with the local  embassies representing the countries in your itinerary.  </p>'},
  {label: "Important", icon: "pi pi-exclamation-circle", desc: '<p>  Ensure you download your e-ticket for flight details and  complete online check-in via the airline’s website or at the  airport check-in desk. <br />  Hotel accommodation is as specified and may change within  the same or higher category. Hotel categories vary by  country. <br />  Excursion order and duration may change or cancel due to  weather, safety, or other reasons, without notice. <br />  Upon arrival, travelers may need to directly pay a municipal  tax to some hotels.  </p>'},
]);	
	
async function fetchWithDefaultDateRange(tourId,dateRange) {
  if(!dateRange){
    //console.log("no date range");
      const dateRange = getDefaultDepartureRange();
  }
  const url = `${config.public.BACKEND_URL}/api/departures/?tourId=${tourId}&date_range=${dateRange}`;
  const options = {
    headers: {
      accept: "application/json",
    },
  };
  const { data } = await useFetch(url, options);

  let departures = data?.value?.data?.items ?? [];

  // departures = departures.filter((dep) => dep?.departure_type === "guaranteed");

  if (!departures.length) {
    showToast(`We coudln't find any available departures in this month`);
    console.info("We coudln't find any available departures");
    return [];
  }
  console.info("we found some available departures in different dateRange");
  const onlyAFewDepartures = departures.slice(0, 5);
  return onlyAFewDepartures;
}	
</script>
<style scoped src="~/pages/tourv2/style.css"></style>