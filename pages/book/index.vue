
<template>
  <Toast/>
  <!-- Breadcrumbs -->
  <div class="overflow-hidden" style="background-color: #fff;" id="breadcrumb-container">
    <Breadcrumb :model="breadCrumbsComputed">
      <template #breadcrumb="{ breadcrumb, props }">
        <a v-if="breadcrumb.url" :href="breadcrumb.url" :target="new_blank" v-bind="props.action">
          <span class="text-color">{{ breadcrumb.label }}</span>
        </a>
      </template>
    </Breadcrumb>
    <div class="my-5 grid col-12 justify-content-center">
      <div class="grid col-12 lg:col-9">
        <CustomStepper :activeStep="1" :goTourPage="goTourPage"/>
      </div>
    </div>
  </div>

  <div class="hidden mt-4 mb-4 w-6 m-auto">
    <div class="flex justify-content-center align-items-center flex-wrap">
      <span class="border-circle h-1rem green-vibe-back w-1rem block"></span>
      <span class="h-02rem green-vibe-back lg:w-15rem block"></span>
      <span class="border-circle h-1rem green-vibe-back w-1rem block"></span>
      <span class="h-02rem surface-400 lg:w-15rem block"></span>
      <span class="border-circle h-1rem surface-400 w-1rem block"></span>
    </div>
    <div class="flex justify-content-center justify-content-between">
      <span class="green-vibe relative" style="right: 3.2rem">Choose Adventure & Dates</span>
      <span class="green-vibe relative" style="right: 2.2rem">Personalize</span>
      <span class="text-gray-400 relative" style="left: 1.2rem">Confirm Booking</span>
    </div>
  </div>
  <!-- <div class="flex justify-content-around w-8 m-auto mb-3">
      <div class="green-vibe text-center">
        <p class="font-medium mb-2">Cheapest</p>
        <span class="my-2">$791 · 7h 14m</span>
      </div>
      <div class="text-center">
        <p class="font-medium mb-2">Best</p>
        <span>$791 · 7h 14m</span>
      </div>
      <div class="text-center">
        <p class="font-medium mb-2">Fastest</p>
        <span>$867 · 7h 00m</span>
      </div>
    </div> -->

  <div class="flex flex-column lg:flex-row col-12 lg:col-11 mx-auto mb-3">
    <!-- FILTERS -->
    <template v-if="isDuffelRequestLoading || isPageLoading">
      <Skeleton height="40rem" class="p-1"></Skeleton>
    </template>
    <template v-show="!isDuffelRequestLoading && !isPageLoading">
      <BookPageFiltersInBook :filters="globalFilters" @update:selectedFilters="onGlobalFiltersChange"/>
    </template>
    <!-- END FILTERS -->

    <!-- CONTENT -->
    <div class="col-12 lg:col-7 px-0 py-0 lg:px-2">

      <!-- Search Bar -->

      <Accordion :activeIndex="windowMobile ? null : 0">
        <AccordionTab>
          <template #header>
            <div class="flex align-items-center" style="padding-top: 40px;">
              <span class="green-dot-sm mr-2"></span>
              <span class="flights_big_title">
                Departure Details
              </span>
            </div>
          </template>
          <div  class="flex justify-content-center mb-5" v-if="isPageLoading==false"  :class="isPageLoading ? 'display_none' : ''">
            <BookPageSearchBar v-if="globalDepartures &&tour_length && tour_start_city && tour_end_city && departure_fly_from"  :searchBar="localSearchBar" :tour_length='tour_length' :tour_start_city='tour_start_city' :tour_end_city='tour_end_city' :tour_id="tourIdURL" :departure_fly_from='departure_fly_from' :departures='formatStoreDeparturesDates' :stored='departuresStored' @update:searchBar="onSearchBarChange"  />
          </div>

        </AccordionTab>
      </Accordion>
      <template v-if="tour && duffelOfferSelected">
        <PreTourInfo :duffelSelected="duffelOfferSelected" :tour="tour" :flightSelected="duffelOfferSelected"  @update:modelValue="updateItems" :quantity-range="quantityRange"/>
      </template>
      <template v-else>
        <Skeleton height="5rem"></Skeleton>
      </template>
      <div :class="!isPageLoading ? 'display_none' : ''" class="flex justify-content-center mb-5" style="width: 100%;">
        <Skeleton height="9rem" class="mb-3"></Skeleton>
      </div> <!-- END Search Bar -->

      <!-- flights -->

      <Accordion :activeIndex="windowMobile ? null : 0">
        <AccordionTab>
          <template #header>
            <div class="flex align-items-center" style="padding-top: 40px;">
              <span class="green-dot-sm mr-2"></span>
              <span class="flights_big_title">
                Select flights
              </span>
            </div>
          </template>

          <div class="flex flex-column my-0 py-0 px-0">
            <!-- DuffelOfferSelected -->
            <template v-if="isDuffelOfferSelectedLoading || isPageLoading">
              <Skeleton height="15rem" class="mb-3"></Skeleton>
            </template>
            <template v-else>
              <BookPageDuffelOfferSelected :duffelOfferSelected="duffelOfferSelected"
                                          :totalPriceProps="totalPackagePriceComputed"/>
            </template>
            <!-- END DuffelOfferSelected -->

            <!-- MoreDuffelOffers -->
            <template v-if="isDuffelRequestLoading || isFilteringOffers || isPageLoading">
              <Skeleton height="15rem" class="mb-3"></Skeleton>
            </template>
            <template v-else>
              <BookPageMoreDuffelOffers :duffelRequest="duffelRequest" :duffelOfferSelected="duffelOfferSelected"
                                        :selectNewDuffelOffer="selectNewDuffelOffer"
                                        :priceSummaryDetailsWithoutFlightProps="priceSummaryDetailsWithoutFlightComputed"
                                        :totalTravelersProps="totalTravelersComputed.length"
                                        :departureStored="moreOffersStored"
                                        />
            </template>
            <!-- END MoreDuffelOffers -->

          </div>

          <!-- show more results -->
          <template
              v-if="duffelOfferSelected && duffelRequest && duffelRequest?.offers?.length !== duffelRequest?.offersMeta?.total">
            <div class="flex mb-3">
              <button @click="handleShowMoreResults"
                      class="font-interstate back-orange-vibe text-white mx-auto border-round"
                      style="padding: 0.7rem 4.5rem; width: 100%;">
                Show more results
              </button>
            </div>
          </template> 
          <!-- END show more results -->

          <!-- Trip Summary 
              <template v-if="duffelOfferSelected">
                 <BookPageTripSummaryTour :tour="tour"/> 
              </template>
              <template v-else>
                <Skeleton height="5rem"></Skeleton>
              </template>  
          END Trip Summary -->
            
          <!-- Daily Itinerary 
          <template v-if="tour && duffelOfferSelected">
             <BookPageDailyItinerary :tour="tour" :flightSelected="duffelOfferSelected"/> 
          </template>
          <template v-else>
            <Skeleton height="5rem"></Skeleton>
          </template>
          -->
        </AccordionTab>
      </Accordion>

      <Accordion :activeIndex="windowMobile ? null : 0">
        <AccordionTab>
          <template #header>
          <div class="flex align-items-center" style="padding-top: 40px;">
            <span class="green-dot-sm mr-2"></span>
            <span class="flights_big_title">Choose accommodation type</span>
          </div>
          </template>
          <!-- accommodations -->
          <div class="my-4">
            <p>Total travelers: {{ totalTravelersComputed.length }}</p>
            <p>Total beds selected: {{ totalBedsSelected }}</p>
            <template v-if="tour?.departure?.prices?.accommodations?.length">
                <div v-if="hasMultiplePriceTiers" class="AccommodationsDetails">
                    <BookPageAccommodationsDetails v-if="tour.departure.prices.accommodations" v-model="accommodations" :tour="tour"
                              :availableAccommodations="tour.departure.prices.accommodations"
                              :travelersProp="totalTravelersComputed"
                              @update:accommodationsUpdate="accommodationsUpdate"/>
                </div>
                <div v-else class="AccommodationsSingle">
                    <BookPageAccommodationsSingle
                      v-model="singleAccommodations" 
                      :tour="tour"
                      :availableAccommodations="tour.departure.prices.accommodations"
                      :travelersProp="totalTravelersComputed"
                      :totalAsgined="totalBedsSelected"
                      @update:accommodationsUpdate="accommodationsUpdate"
                    />
                </div>
            </template>
            <template v-else>
              <Skeleton height="3rem"></Skeleton>
            </template>

          </div> <!-- end accommodations -->
        </AccordionTab>
      </Accordion>

            <!-- mandatory addons / local fees -->
      <Accordion :activeIndex="windowMobile ? null : 0" v-if="mandatoryAddonsComputed?.length">
        <AccordionTab>
            <template #header>
              <div class="flex align-items-center">
                <span class="green-dot-sm mr-2"></span>
                <span class="flights_big_title">
                  Local Fees
                </span>
              </div>
            </template>
                        <p class="font-interstate">
              Below are mandatory local fees per person, payable at the destination to the operator and not included in the package price. This is for information only—no action is required from you at this time.
            </p>
                        <template v-for="detail in priceSummaryDetailsComputed" v-if="priceSummaryDetailsComputed?.length">
            
                            <template v-if="detail.itemName === priceSummaryItemsNames.mandatoryAddons">
                                <BookPageMandatoryAddonItem :detail="detail"/>
                            </template>

                        </template> 
        </AccordionTab>
      </Accordion>
      <Accordion :activeIndex="windowMobile ? null : 0" v-if="tour?.departure?.prices?.optional_extras?.length">
        <AccordionTab>
            <template #header>
              <div class="flex align-items-center" style="padding-top: 40px;">
                <span class="green-dot-sm mr-2"></span>
                <span class="flights_big_title">
                  Add Extras
                </span>
              </div>
            </template>

            <BookPageOptionalExtras v-model="optional_extras" :tour="tour"
                                    :availableAccommodations="tour.departure.prices.optional_extras"
                                    :travelersProp="totalTravelersComputed"/>
        </AccordionTab>
      </Accordion>
      <Accordion :activeIndex="windowMobile ? null : 0">
        <AccordionTab>
            <template #header>
              <div class="flex align-items-center" style="padding-top: 40px;">
                <span class="green-dot-sm mr-2"></span>
                <span class="flights_big_title">
                  Your Details
                </span>
              </div>
            </template>

            <template v-if="totalTravelersComputed?.length">
            <!--   <BookPageBookingTravelersDetails v-model="passengers" :totalTravelers="totalTravelersComputed"/> -->
              <PassengerSelection  v-model="passengers" :totalTravelers="totalTravelersComputed" :rangeAge="tour ? tour.ageRange : null" />
              <!-- <button @click="imprimedata">imprime datos</button>  -->
            </template>
            <template v-else>
              <Skeleton height="4rem"></Skeleton>
            </template>
        </AccordionTab>
      </Accordion>
      <Accordion :activeIndex="windowMobile ? null : 0">
        <AccordionTab>
            <template #header>
              <div class="flex align-items-center" style="padding-top: 40px;">
                <span class="green-dot-sm mr-2"></span>
                <span class="flights_big_title">
                  Know before you book
                </span>
              </div>
            </template>

        <div class="border-1 border-gray-300 border-round-sm">
          <ul class="m-3">
            <li class="font-interstate">
				<strong>Cancellations:</strong> This trip consists of several components booked together. Each component has a different cancellation policy:
                 <ul class="m-3">
                  <li class="font-interstate"><strong>Multi-Day Adventure:</strong> Get up to $ {{(totalPackagePriceComputed/1.15)-flightItemComputed.totalPrice}} USD back, depending on when you cancel (see operator’s <a class="text-green-vibe underline pointer" v-if="tour" @click="Terms(tour.operator.id)">cancellation policy</a>).</li>
                  <li class="font-interstate"><strong>Flights:</strong> Get up to $ {{flightItemComputed.totalPrice}} USD back, depending on when you cancel (see airlines’ <a class="text-green-vibe underline pointer" v-if="airlineUrl" :href="airlineUrl" target="_blank" style="text-decoration: underline;">terms & conditions</a>).</li> 
                </ul>
            </li>
            <li class="my-2 font-interstate">
              <strong>Flights:</strong> Remember to download your e-ticket and complete online check-in through the airline website or at the airport check-in counter well in advance. Prior to your trip, please review the conditions (like baggage and check-in policies) outlined by each airline carrier listed in your flight summary.
            </li>
            <li class="my-2 font-interstate">
              <strong>Accommodations:</strong> Accommodations listed in the tour description are approximate and may change based on availability, group size, or other factors. Any changes will be to similar-category options. Standards vary by country, so expectations may differ by destination. In some cases, travelers may need to pay a local tax directly to the hotel upon arrival.
            </li>
            <li class="my-2 font-interstate">
              <strong>Activities:</strong> In the event of unfavorable weather conditions or for safety considerations, or for any other valid reasons, the sequence and duration of the excursions listed in the itinerary may be modified or canceled without prior notification.
            </li>
            <li class="my-2 font-interstate">
              <strong>Visas:</strong> Make sure to check visa requirements for the country listed in the itinerary of the adventures and flights summary (in case you need a transit visa).
            </li>
         </ul>
        </div>
        </AccordionTab>
      </Accordion>
      <Accordion :activeIndex="windowMobile ? null : 0">
        <AccordionTab>
            <template #header>
              <div class="flex align-items-center" style="padding-top: 40px;">
                <span class="green-dot-sm mr-2"></span>
                <span class="flights_big_title">
                  Payment
                </span>
              </div>
            </template>
            <div class="grid">
              <div class="col-1">
                  <i class="pi pi-lock text-green-vibe" style="font-size:28px"></i>
              </div>    
              <div class="col-7">   
                  <span class="font-medium">
                      Your payment is secure and safe with SSL encryption via Stripe<br>
                      You will need to enter your card details in the next step. 
                  </span>   
              </div> 
              <div class="col-4">
                  <img src="/images/payments.png" style="width:100%" />
              </div>    
            </div>
            <div class="form grid my-2 border-1 border-gray-300 border-round-sm m-0">
              <div class="col-12 md:col-6 text-lg font-medium my-2">
                <span style="font-size:18px">To Pay:
                <strong class="text-green-vibe" style="font-size:20px"> {{ $currencyDecimal(totalPackagePriceComputed) }}</strong>                  Today you pay (100%)</span>
              </div>
              <div class="col-12 my-2">
                <div class="field-checkbox">
                  <input v-model="pay" type="checkbox"/>
                  <label style="line-height: 20px;">I accept Vibe Adventures' <a class="underline text-green-vibe" target="_blank" href="https://vibeadventures.com/booking-terms-conditions/">Terms & Conditions</a> and
                    <a class="underline text-green-vibe" href="https://vibeadventures.com/privacy-policy-2/" target="_blank">Privacy Policy</a>, and the specific cancellation and refund policies for the <a class="text-green-vibe underline pointer" v-if="tour" @click="Terms(tour.operator.id)">adventure</a> and <a class="text-green-vibe underline pointer" v-if="airlineUrl" :href="airlineUrl" target="_blank" style="text-decoration: underline;">flights</a></label>
                </div>
                <Fieldset legend="Fare conditions*" :toggleable="true">
                    <div class="m-0" v-if="duffelOfferSelected">
                        <div class="flex">
                            <strong>Refundability:</strong> Non-refundable except under extraordinary circumstances.
                        </div><br>
                        <div class="flex">
                            <strong >Changes:</strong>
                            <div v-if="duffelOfferSelected.conditions?.change_before_departure?.allowed == true">   
                            {{duffelOfferSelected.conditions.change_before_departure.penalty_currency}}     
                            {{duffelOfferSelected.conditions.change_before_departure.penalty_amount}} USD Fee applies
                            </div><div v-else> Not allowed</div>
                        </div><br>
                        <div>
                            <strong>Baggage Included:</strong>
                            <ul>
                                <li>{{globalFilters.checkedbaggage}} checked baggage.</li>
                                <li>{{globalFilters.cabinbaggage}} carry-on baggage.</li>
                                <li>1 personal item.</li>
                            </ul>
                        </div><br>
                        <div class="flex">
                            <strong>Seat Selection:</strong> 
                            <div v-if="duffelOfferSelected.slices[0]?.conditions?.advance_seat_selection != null">  
                            {{duffelOfferSelected.slices[0].conditions.advance_seat_selection}}     
                            </div><div v-else> Not included</div>
                        </div><br>
                        <div class="flex">
                            <strong>Priority Boarding:</strong>
                            <div v-if="duffelOfferSelected.slices[0]?.conditions?.priority_boarding != null">   
                            {{duffelOfferSelected.slices[0].conditions.priority_boarding}}      
                            </div><div v-else> Not included</div>
                        </div><br>
                        <div class="flex">
                            <strong>Priority Check-in:</strong>
                            <div v-if="duffelOfferSelected.slices[0]?.conditions?.priority_check_in != null">   
                            {{duffelOfferSelected.slices[0].conditions.priority_check_in}}      
                            </div><div v-else> Not included</div>
                        </div><br>  
                        <span style="color:red">*</span>Please check the airline's website for further details.
                    </div>
                </Fieldset>
              </div>
              <div class="col-12 mb-4">
                <template v-if="tour?.departure?.id">
                  <template v-if="isLoadingPayment">
                    <button class="pay_now_padding font-interstate back-orange-vibe text-white mx-auto border-round">
                      Going to payment...
                    </button>
                  </template>
                  <template v-else>
                    <Button :disabled="!pay"@click="continueTest()"
                            class="pay_now_padding font-interstate back-orange-vibe text-white mx-auto border-round">
                      Go to payment
                    </Button>
                  </template>
                </template>
                <template v-else>
                  <Skeleton width="10rem" height="4rem"></Skeleton>
                </template>
              </div>
            </div>
        </AccordionTab>
      </Accordion>
    </div> <!-- END CONTENT -->

    <!-- PRICE DETAILS -->
    <template v-if="tour && duffelOfferSelected && !isPageLoading">
      <div class="col-12 lg:col-3 border-1 border-gray-300 border-round-sm" style="height: fit-content;">
        <h1 class="text-lg font-semibold my-2">{{ tour?.tourName }}</h1>
        <Carousel :showIndicators="false" v-if="carouselImagesComputed?.length" :value="carouselImagesComputed"
                  :numVisible="1" :numScroll="1" circular>
          <template #item="slotProps">
            <div class="bg-cover bg-center h-10rem border-round-2xl"
                 :style="{ 'background-image': `url(${slotProps?.data?.imageUrl})` }"></div>
          </template>
        </Carousel>

        <div class="text-sm my-3 ml-3">
          <div class="my-2" v-if="duffelOfferSelected?.slices?.at(0)?.segments?.at(0)?.origin?.city_name">
            <img class="h-1rem mr-2 ml-1" src="~/assets/icons/plane-leaving.svg" alt="airplane icon"/>
            <strong>{{ dayFormatted(departureDateFromFirstSelectedFlightComputed) }} </strong >
              {{ duffelOfferSelected.slices[0].segments[0].origin.city_name }}
              (<span class="text-green-vibe">{{ duffelOfferSelected.slices[0].segments[0].origin.iata_code }}</span>) - 
              {{ duffelOfferSelected.slices[0].segments[0].destination.city_name }}
              (<span class="text-green-vibe">{{ duffelOfferSelected.slices[0].segments[0].destination.iata_code }}</span>)
          </div>
          <div class="my-2" v-if="duffelOfferSelected?.slices?.at(-1)?.segments?.at(-1)?.destination?.city_name">
            <img class="h-1rem mr-2 ml-1" src="~/assets/icons/plane-landing-icon.svg" alt="airplane icon"/>
            <strong>{{ dayFormatted(arrivalDateFromLastSelectedFlightComputed) }} </strong >
              {{ duffelOfferSelected.slices.at(-1).segments.at(-1).origin.city_name }}
              (<span class="text-green-vibe">{{ duffelOfferSelected.slices.at(-1).segments.at(-1).origin.iata_code }}</span>) - 
              {{ duffelOfferSelected.slices.at(-1).segments.at(-1).destination.city_name }}
              (<span class="text-green-vibe">{{ duffelOfferSelected.slices.at(-1).segments.at(-1).destination.iata_code }}</span>)
          </div>
          <div class="my-2">
            <img class="h-1rem mr-1" src="~/assets/icons/couple-icon.svg" alt=""/>
            <span class="mx-2"><span class="text-green-vibe">{{ adultsCountURL }}</span> adults</span>
            <span class="mx-2"><span class="text-green-vibe">{{ childrenCount }}</span> kids</span>
            <span class="mx-2" style="display:none"><span class="text-green-vibe">{{ infantsCount }}</span> infants</span>
          </div>
        </div>  

    <div class="text-xs" style="margin: 10px;padding: 10px;border: 2px solid #82cf45;border-radius: 10px;">
          <div class="flex justify-content-between align-items-center">
            <div>
              <p class="font-medium text-lg" style="margin:0">Total</p>
              <span class="text-xs text-gray-700">Includes all taxes and fees</span>
              <p style="margin-left:10px" class="font-medium text-md">Flights</p>
              <p style="margin-left:10px" class="font-medium text-md">Organized Adventure</p>
            </div>
            <div>
                <p class="font-medium text-lg" style="margin:0">{{ $currencyDecimal(totalPackagePriceComputed) }}</p>
                <span class="discount-button" v-if="promo > 0">{{ $currencyDecimal(promo) }} OFF</span><span v-else><br></span>
                <p class="text-green-vibe" >Included</p>
                <p class="text-green-vibe" >Included</p>
            </div>  
          </div>
          <p style="margin: 0 0 0 15px;">{{ getTourDepartureDate() }}</p>
            <!-- only show this section if there are any priceSummaryDetails -->
            <div v-if="priceSummaryDetailsComputed?.length" class="priceSummaryDetailsComputed" style="margin-left:15px">
              <!-- loop through each accommodation -->
              <div v-for="acc in accommodatedItemsComputed" class="flex my-2 align-items-center">
                  <span class="text-green-vibe" >{{ acc.passengers }} </span> x {{ acc.name }}
              </div>
            </div>
                <template v-for="detail in priceSummaryDetailsComputed" v-if="priceSummaryDetailsComputed?.length">

            <!-- Optional extras -->
            <template v-if="detail.itemName === priceSummaryItemsNames.optionalExtra">
              <BookPageOptionalExtraItem :detail="detail"/>
            </template>
          </template>   
        </div>
        
        <div class="flex flex-wrap">
          <div class="mx-auto flex align-items-center">
            <img class="h-1rem" src="~/assets/icons/tick-mark-icon.svg" alt=""/>
            <span class="font-medium text-sm">Best Price Guaranteed</span>
          </div>
          <div class="text-sm mx-auto my-3">Save this trip for later</div>
          <button class="font-interstate back-orange-vibe text-white mx-auto border-round"
                  style="padding: 0.7rem 4.5rem" @click="visible = true">
            Download as PDF
          </button>
        </div>
        <Accordion :activeIndex="1" collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
          <AccordionTab :pt="accordionTabPToptions" style="padding: 0.25rem;">
            <template #header>
              <span>
                <span class="font-semibold white-space-nowrap filter-name">Inclusions</span>
              </span>
            </template>
            <div class="flex flex-column gap-2">
              <BookPageIncluded :tour="tour"/>
            </div>
          </AccordionTab>
        </Accordion>
        <Accordion :activeIndex="1" collapseIcon="pi pi-angle-up" expandIcon="pi pi-angle-down">
          <AccordionTab :pt="accordionTabPToptions" style="padding: 0.25rem;">
            <template #header>
              <span>
                <span class="font-semibold white-space-nowrap filter-name">Flights</span>
              </span>
            </template>
            <div class="flex flex-column gap-2">
              <BookPageDuffelOfferCompressed :duffelOfferSelected="duffelOfferSelected" :totalPriceProps="totalPackagePriceComputed" :tourDays="tour?.tourLengthDays"/>
            </div>
          </AccordionTab>
        </Accordion>
      </div> <!-- END PRICE DETAILS -->
        <div v-if="timeLeft > 0" class="countdown">
            <p>
              You have: {{ formattedTime }} minutes to finish your booking
            </p>
        </div>
    </template>
    <template v-else>
      <Skeleton height="40rem"></Skeleton>
    </template>
        <Toast />
  </div>
    <Dialog v-model:visible="visible" modal header="Download Brochure" :style="{ width: '50rem' }">
        <div>
            <p>Send all details for the ‘{{ tour?.tourName }}’ adventure straight to your inbox. Where shall we send it to?</p>
            <p  style="font-weight: bold;">Email Address <a style="color: red;">*</a></p>
            <InputText v-model="params_sum.email" type="email" placeholder="Enter your email" />
            <small  v-if="!isValidEmail" style="color: red;">Invalid email format</small>
            <hr>
                <div style="text-align: right;">
                    <Button class="font-interstate back-orange-vibe text-white mx-auto border-round"
                    style="padding: 0.7rem 4.5rem; text-align: right; margin-top: 1%;" @click="SendSummary" >Download Summary </Button>
                </div>
            
        </div>
</Dialog>
<Dialog v-model:visible="visible2" modal header="Terms & Conditions" :style="{ width: '40rem' }">
  <div style="text-align: center;">
    <ProgressSpinner v-if="spinner" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
  <div v-if="errormessage!=''">
    <label>{{ errormessage }}</label>
  </div>      
  <div v-html="text_message" v-if="!spinner">
  </div>
</Dialog>
</template>

<script setup>
import {ref, watch,  computed, onMounted, nextTick, onBeforeUnmount} from 'vue';
import Breadcrumb from 'primevue/breadcrumb';
import Skeleton from 'primevue/skeleton';
import Fieldset from 'primevue/fieldset';   
import {useToast} from "primevue/usetoast";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);  
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat) 
import Carousel from 'primevue/carousel';
import {GLOBAL_LOCATIONS} from '~/utils/globalLocations';
import {VIBE_REVENUE_FLIGHT} from '~/utils/VibeRevenueFlight';
import {VIBE_REVENUE_TOUR} from '~/utils/VibeRevenueTour';
import {GLOBAL_DEFAULT_PASSENGERS_FIELDS} from '~/utils/globalDefaultPassengersFields';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useDestinationStore} from "@/store/destinationStore";
import { useGravitecStore } from "~/store/gravitectStore";
import { parsePhoneNumber } from "libphonenumber-js";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import { storeToRefs } from 'pinia'
import PreTourInfo from '~/components/BookPage/PreTourInfo.vue';
import ProgressSpinner from "primevue/progressspinner"; 
const spinner=ref(false);   
const departuresStored = ref();
const globalDepartures = ref(); 
const pay = ref(false);
const userId = ref(null);
const destinationStore = useDestinationStore();
const gravitecStore = useGravitecStore();
const homeFormStore = useHomeFormStore()
const { travelersSelected } = storeToRefs(homeFormStore)
const mail_valid=ref(false);
const  visible=ref(false);
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const adultsCountURL = ref(0);
const childrenCount = ref(0);
const infantsCount = ref(0);
const datesRange = ref();
const tourIdURL = ref();
const departureIdURL = ref();
const duffelRequestIdURL = ref(null);
const duffelOfferIdURL = ref(null);
const duffelOfferSelected = ref(null);
const isDuffelOfferSelectedLoading = ref(true);
const duffelRequest = ref(null);
const isDuffelRequestLoading = ref(true);
const isPageLoading = ref(true);
const departure_fly_from = ref("");
const tour = ref({});
const passengers = ref([]);
const accommodations = ref([]);
const singleAccommodations = ref([]);
const optional_extras = ref([]);
const isLoadingPayment = ref(false);
const toast = useToast();
const duffelSectionRef = ref();
const availableAccommodations = ref([]);    
const oldSelectedDeparture = ref(0);
const localSearchBar = ref({
  selectedLocationDeparture: null,
  selectedDepartureId: null,
  travelersSelected: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  selectedDepartureDate: null,
  departuresDates: [],
});

const selectedUrl=ref('');  
const text_message = ref('');
const errormessage = ref('');   
const visible2=ref(false); 
    
const loading = ref();	
	
const Terms=async(url)=>{
    visible2.value=true;
    selectedUrl.value=url;
    //console.log('parametro enviado',url);
    try {
      spinner.value = true;
      const res = await fetch(`${config.public.BACKEND_URL}/api/tours-text?operator_id=${selectedUrl.value}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      //console.log('contenido de respuesta:',data.response)
      if (data.status) {
        //console.log( 'contenido de adventures',data);
        text_message.value=data.response.terms_text;
      }else{
        console.error('Error fetching data:',data.response);
        text_message.value=data.response.message;
      } 
      spinner.value = false;
    } catch (error) {
     console.error('Error fetching data:', error);
    }finally {
        loading.value = false; 
         }
  }  
const airlineUrl = ref();   

const isLoading = ref(false);

async function getAirline(ownerId) {
  // prefer owner from duffelOrderSelected if that's the source of truth
  //console.log("ownerId",ownerId);    
  if (!ownerId) {  
    airlineUrl.value = '';
    return;
  }
  isLoading.value = true;
  try {
    const airline = await fetchDuffelAirline(ownerId);
    airlineUrl.value = airline?.conditions_of_carriage_url ?? '';
    //console.log('airlineUrl.value', airlineUrl.value);
  } catch (err) {
    console.error('failed to fetch airline', err);
  } finally {
    isLoading.value = false;
  }
};  
    
watch(duffelOfferSelected, async (newOffer, oldOffer) => {
  //console.log("duffelOfferSelected.value",duffelOfferSelected.value);    
  // prefer owner from duffelOrderSelected if that's the source of truth
  const ownerId = duffelOfferSelected.value?.owner?.id ?? newOffer?.owner?.id;
  //console.log("ownerId",ownerId);    
  if (!ownerId) {  
    airlineUrl.value = '';
    return;
  }
  isLoading.value = true;
  try {
    const airline = await fetchDuffelAirline(ownerId);
    airlineUrl.value = airline?.conditions_of_carriage_url ?? '';
    //console.log('airlineUrl.value', airlineUrl.value);
  } catch (err) {
    console.error('failed to fetch airline', err);
  } finally {
    isLoading.value = false;
  }
}, { immediate: false });   
    
async function fetchDuffelAirline(airlineId) {
  if (!airlineId) {
    console.info('Missing duffelairlineId');
    return null;
  }

  const params = new URLSearchParams();
  params.append("id", airlineId);
  //console.log("airline params",params);
  const { data, error } = await useFetch(
    `${
      config.public.BACKEND_URL
    }/api/airlines?${params.toString()}`
  );

  if (error?.value?.data?.message) {
    for (const key in error.value.data.message) {
      console.error(`${key}: ${error.value.data.message[key]}`);
    }
    return null;
  }
  //console.log("duffel airline",data.value.data);
  return data.value.data;
}   
    
const params_sum=ref({
    tour_id:tourIdURL,
    email:''
})

const tour_length = ref(); 
const tour_start_city = ref(); 
const tour_end_city = ref(); 

function dayFormatted(input) {
  if (!input) return '-'
  return dayjs(input, 'DD/MM/YYYY').format('MMM D, YYYY')
}


const isValidEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(params_sum.value.email);
    };

        
const SendSummary=async ()=>{
    const value= isValidEmail();
    if(value){
    const response= await destinationStore.SendSummary(params_sum.value,`${config.public.BACKEND_URL}`);
    if(response.success){
        toast.add({ severity: 'success', summary: 'Success!!', detail: 'please check your inbox!!', life: 3000 });
        visible.value=false;    
    }
    }else{
        toast.add({ severity: 'error', summary: 'Error!!', detail: 'Invalid format', life: 3000 });
        params_sum.value.email='';
    }
}

const priceSummaryItemsNames = ref({
  default: 'default',
  accommodation: 'accommodation',
  mandatoryAddons: 'mandatoryAddons',
  flight: 'flight',
  optionalExtra: 'optionalExtra',
})
const passengerTypes = ref({
  adult: 'adult',
  child: 'child',
  infant: 'infant',
  traveler: 'traveler'  
})
const STOP_OPTIONS = ref({
  any: "any",
  direct: "0",
  upToOneStop: "1",
  upToTwoStops: "2",
})
const globalFilters = ref({
  checkedbaggage: 0,
  cabinbaggage: 1,
  stops: STOP_OPTIONS.value,
  sort: 'sortByLeastExpensive',
})
const isFilteringOffers = ref(false);
const accommodationsWithTravelers = ref(null)

function updateItems(items){
  //console.log("updateItems",items);
    globalFilters.value.before = items[0].quantity;
    globalFilters.value.after = items[1].quantity;
}

// updates datesRange in url
watch(datesRange, (newValue) => {
  if (newValue) {
    const newQuery = {...route.query, datesRange: newValue};
    router.replace({query: newQuery});
  }
}, {immediate: true});

// updates adultsCountURL in url
watch(adultsCountURL, (newValue) => {
  if (newValue) {
    const newQuery = {...route.query, adultsCount: newValue};
    router.replace({query: newQuery});
  }
}, {immediate: true});

// updates childrenCount in url
watch(childrenCount, (newValue) => {
  if (newValue) {
    const newQuery = {...route.query, childrenCount: newValue};
    router.replace({query: newQuery});
  }
}, {immediate: true});

// updates duffelRequestIdURL in url
watch(duffelRequestIdURL, (newValue) => {
  if (newValue) {
    const newQuery = {...route.query, duffelRequestId: newValue};
    router.replace({query: newQuery});
  }
}, {immediate: true});

watch(globalFilters, async (newVal, oldVal) => {
  // protect against missing oldVal (first run)
  oldVal = oldVal || {};

  // find which top-level keys actually changed
  const changedKeys = Object.keys(newVal || {}).filter(key => {
    try {
      return JSON.stringify(newVal[key]) !== JSON.stringify(oldVal[key]);
    } catch (e) {
      // fallback for non-serializable values
      return newVal[key] !== oldVal[key];
    }
  });

  // remove before/after from consideration
  const nonDateChanges = changedKeys.filter(k => k !== 'before' && k !== 'after');

  // if only before/after changed (or nothing changed), skip filterFlights
  if (nonDateChanges.length === 0) {
    // nothing to do here (only before/after changed)
    return;
  }

  // otherwise run filterFlights
  //console.log("globalFilters changed (non-date keys):", nonDateChanges);
  isFilteringOffers.value = true;
  await filterFlights();
  isFilteringOffers.value = false;
}, { deep: true });


watch(
  // array of getters
  [
    () => globalFilters.value.before,
    () => globalFilters.value.after
  ],
  // callback sees new and old arrays
  async ([newBefore, newAfter], [oldBefore, oldAfter]) => {
      //console.log("watcher isPageLoading.value",isPageLoading.value);
      if (isPageLoading.value == true) return;
      //console.log("watcher newBefore",newBefore);
      //console.log("watcher newAfter",newAfter);
      //console.log("watcher oldBefore",oldBefore);
      //console.log("watcher oldAfter",oldAfter);
  const newQuery = { ...route.query }

        // 2) only touch `before` if it actually changed
        if (newBefore !== oldBefore) {
          //if (newBefore > 0) {
            newQuery.before = newBefore;
            before.value = newBefore;
          //} 
        }
        else {
            delete newQuery.before
        }

        // 3) only touch `after` if it actually changed
        if (newAfter !== oldAfter) {
          //if (newAfter > 0) {
            newQuery.after = newAfter
            after.value = newAfter;
          //} 
        }else {
            delete newQuery.after
        }

        // 4) do a named‐route replace so path, params, and ALL other queries are preserved
        router.replace({
          name:   route.name,
          params: route.params,
          query:  newQuery
        })  
    
    if (newBefore !== oldBefore) {
    //console.log('before changed from', oldBefore, 'to', newBefore);
        const searchbarDate = await getDateFromDepartures(localSearchBar.value.selectedDepartureId.value);
        //console.log("before searchbarDate",searchbarDate);  
        const date = dayjs(searchbarDate).format('YYYY-MM-DD');
        //console.log("before date", date);
        isFilteringOffers.value = true;
        const after = globalFilters.value.after;
        const trigger = "before watcher"
        filterDuffelData(date, newBefore, after, trigger);
        isFilteringOffers.value = false;
    }
    if (newAfter !== oldAfter) {
    //console.log('after changed from', oldAfter, 'to', newAfter);
        const searchbarDate = await getDateFromDepartures(localSearchBar.value.selectedDepartureId.value);
        //console.log("after searchbarDate",searchbarDate);  
        const after = newAfter;
        //console.log("after date", searchbarDate);
        isFilteringOffers.value = true;
        const params = new URLSearchParams(window.location.search);
        const before = params.get("before") ?? null;
        //console.log("before on after watcher",before);
        let date;
        if (before>0){
            date = dayjs(searchbarDate).format('YYYY-MM-DD');
        }else {
            date = searchbarDate;
        }
        const trigger = "after watcher"
        filterDuffelData(date, before, after, trigger);
        isFilteringOffers.value = false;
    }
  }
)   
    
async function filterFlights() {
  //console.log("duffelduffelRequest.value before filtering",duffelRequest.value);  
  if (!duffelRequest?.value?.id) {
    console.error('missing duffel request id:', duffelRequest?.value?.id)
    return
  }
  const params = new URLSearchParams();
  //console.log("duffelRequest.value.id: ",duffelRequest.value.id); 
  params.append('offerId', duffelRequest.value.id);
  params.append('limit', 3);
  if(globalFilters.value.stops == 'any' || globalFilters.value.stops == 'upToTwoStops'){
      params.append('maxConnections', 2);
  } else if (globalFilters.value.stops == 'direct'){
      params.append('maxConnections', 0);
  } else if (globalFilters.value.stops == 'upToOneStop'){
      params.append('maxConnections', 1);
  } 
  if (globalFilters.value.checkedbaggage > 0) {
    params.append('baggage_checked', globalFilters.value.checkedbaggage);
  }
  if (globalFilters.value.cabinbaggage > 0) {
    params.append('baggage_carry', globalFilters.value.cabinbaggage);
  }
  if (globalFilters.value.sort == 'sortByLeastExpensive') {
    params.append('sort', 'total_amount');
  }
  if (globalFilters.value.sort == 'sortByLeastDuration') {
    params.append('sort', 'total_duration');
  }
  const url = `${config.public.BACKEND_URL}/api/duffel/sort-offer?${params.toString()}`;

  const {data, error} = await useFetch(url);

  if (error.value) {
    console.error('error fetchFilteredResults()', error)
    return
  }
  
  duffelRequest.value.offers = [];
  duffelRequest.value.offers = data.value.data;
  //console.log("data.value.data",data.value.data); 
  duffelOfferSelected.value = data.value.data[0];
  //console.log("duffelOfferSelected.value",duffelOfferSelected.value); 
  //console.log("duffelduffelRequest.value after filtering", duffelRequest.value);  
}


const totalTravelersComputed = computed(() => {
  const hasPriceCategories = tour.value?.priceCategories?.length
  const hasBookingFields = tour.value?.bookingFields?.length
  const shouldContinue = hasPriceCategories && hasBookingFields
  if (!shouldContinue) {
    return []
  }

  const array = [];
  
  // default priceCategory
  let defaultPriceCategory = tour?.value?.priceCategories?.[0];
  defaultPriceCategory.external_reference = "adult";

  // Getting the price catgegories:
  let priceCategoryAdult = tour.value.priceCategories.find(p => p.external_reference === "adult") ?? defaultPriceCategory
  const priceCategoryChildren = tour.value.priceCategories.find(p => p.external_reference === "child") ?? priceCategoryAdult
  const mainPassengerBookingFields = tour.value.bookingFields.filter(f => f.main_pax === "mandatory") ?? []
  const AditionalPassengerBookingFields = tour.value.bookingFields.filter(f => f.additional_pax === "mandatory") ?? []

  for (let i = 0; i < adultsCountURL.value; i++) {
    const isLeadTraveler = i === 0;
    if (isLeadTraveler) {
      array.push({
        id: array.length + 1,
        type: "adult",
        priceCategory: priceCategoryAdult,
        bookingFields: mainPassengerBookingFields,
        isLeadTraveler: true,
        min_age: tour.value.age_range.strict.min_age,
        max_age: tour.value.age_range.strict.max_age,     
      })
      continue
    }
    array.push({
      id: array.length + 1,
      type: "adult",
      priceCategory: priceCategoryAdult,
      bookingFields: AditionalPassengerBookingFields,
      isLeadTraveler: false,
      min_age: tour.value.age_range.strict.min_age,
      max_age: tour.value.age_range.strict.max_age, 
    })
  }

  for (let i = 0; i < childrenCount.value; i++) {
    array.push({
      id: array.length + 1,
      type: "child",
      priceCategory: priceCategoryChildren,
      bookingFields: AditionalPassengerBookingFields,
      isLeadTraveler: false,
      min_age: tour.value.age_range.strict.min_age,
      max_age: tour.value.age_range.strict.max_age, 
    })
  }
  return array
});

// updates globalFilters from child
const onGlobalFiltersChange = (newFiltersFromChild) => {
    //console.log("newFiltersFromChild",newFiltersFromChild);
  globalFilters.value = newFiltersFromChild;
};

const goTourPage = () => {
  const route = {
    path: "/tour",
    query: {
      tourId: tour.value.tourId,
      adultsCount: adultsCountURL.value,
      childrenCount: childrenCount.value,
      infantsCount: infantsCount.value,
      departure_range: datesRange.value,
      departure_fly_from: departure_fly_from.value,
    }
  }
  router.push(route)
};

// updates from child
async function onSearchBarChange(newValue) {
  localSearchBar.value = newValue;
  console.log("localSearchBar.value",localSearchBar.value);
  // capturing old data
  const dateFormatted = dayjs(newValue.selectedDepartureId.date,"DD/MM/YYYY").format('YYYY-MM-DD');
  console.log("onSearchBarChange dateFormatted",dateFormatted);	
  localSearchBar.value.selectedDepartureDate = dateFormatted;	
  console.log("localSearchBar.value.selectedDepartureDate",localSearchBar.value.selectedDepartureDate);	
  const oldAdultsCount = adultsCountURL.value
  const oldChildrenCount = childrenCount.value
  // const oldInfantsCount = infantsCount.value
  const oldDeparture_fly_from = departure_fly_from.value
  const oldCurrentDepartureDate = getDateMinusOne(tour?.value?.departure?.date)

  // updating values
  adultsCountURL.value = travelersSelected.value.adults
  childrenCount.value = travelersSelected.value.children
  // childrenCount.value = localSearchBar.value.travelersSelected.children
  // infantsCount.value = localSearchBar.value.travelersSelected.infants
  departure_fly_from.value = localSearchBar.value?.selectedLocationDeparture?.code


  // checking if data should be updated
  let shouldUpdate = false
  if (
      oldAdultsCount != adultsCountURL.value
      || oldChildrenCount != childrenCount.value
      || oldDeparture_fly_from != departure_fly_from.value
      || oldCurrentDepartureDate != localSearchBar.value.selectedDepartureDate
      || oldSelectedDeparture != localSearchBar.value.selectedDepartureId
  ) {
    shouldUpdate = true
  }

  //console.log(shouldUpdate);
  //console.log("NEW DEPARTURE", localSearchBar.value.selectedDepartureId);
  //console.log("OLD DEPARTURE", oldSelectedDeparture.value);
  
  if (totalTravelersComputed?.value?.length > 0 && departure_fly_from.value && shouldUpdate) {
    isPageLoading.value = true
    await updateDataInPage()
    isPageLoading.value = false
  }
}

async function updateDataInPage() {
  // check if departure has changed
  const currentDepartureDate = dayjs(tour.value.departure.date).format('DD/MM/YYYY');
  const hasDateDepartureChanged = currentDepartureDate !== localSearchBar.value.selectedDepartureId.date;
  if (hasDateDepartureChanged) {
	console.log("departure has changed",currentDepartureDate);  
    // update departure
    await updateCurrentDeparture(localSearchBar.value.selectedDepartureDate)
  }else {console.log("departure did not changed");}

  // update duffel data
  await updateDuffelData()
}

async function getDateFromDepartures(departureId) {
  if (departureId == null) return null;
  //console.log("getDateFromDepartures id",Number(departureId));    
  for (const d of globalDepartures.value) {
    //console.log("getDateFromDepartures d",Number(d.id));
    if (d.id == departureId) {
      //console.log("getDateFromDepartures d.date",d);
      return d.date;
    }
  }
}
    
async function updateDuffelData() {
  const departure = []; 
    if(localSearchBar.value.selectedDeparture){
        console.log("updateDuffelData localSearchBar.value.selectedDeparture ",localSearchBar.value.selectedDeparture);
        const date = localSearchBar.value.selectedDeparture;
        console.log("updateDuffelData date",date);
        departure.date = date;
    }else{
        departure.date = tour?.value?.departure?.date;
    }
  console.log("updateDuffelData departure.date",departure.date);  
  duffelRequest.value = await handleDuffelRequest(null,tour.value,departure,before.value,after.value);
  const newFirstDuffelOffer = duffelRequest?.value?.offers?.[0];
  duffelOfferSelected.value = await handleDufferOffer(newFirstDuffelOffer?.id);
}

async function filterDuffelData(date, before, after, trigger = null) {
  //console.log("filteringduffeldata",trigger); 
  const departure = []; 
  //console.log("updateDuffelData date",date);
  departure.date = date;    
    if(localSearchBar.value.selectedDepartureId.value){
        //console.log("filterDuffel departureId.value",localSearchBar.value.selectedDepartureId.value);
    }
  //console.log("filterDuffelData duffelRequest.value.id",duffelRequest.value.id);  
  //console.log("after on filterduffeldata", after);
  //console.log("before on filterduffeldata", before);  
  duffelRequest.value = await handleDuffelRequest(duffelRequest?.value.id,tour?.value,departure,before,after);
  const newFirstDuffelOffer = duffelRequest?.value?.offers?.[0];
  duffelOfferSelected.value = await handleDufferOffer(newFirstDuffelOffer?.id);
}   
    
async function updateCurrentDeparture(newSelectedFlightDeparture) {
  console.log("updateCurrentDeparture",newSelectedFlightDeparture);
  //const newUserDepartureDate = dayjs(newSelectedFlightDeparture,"YYYY-DD-MM").format('YYYY-MM-DD');
  //console.log("newUserDepartureDate",newUserDepartureDate);
  // getting departures 
  const departures = globalDepartures.value;
  console.log("globalDepartures.value on updateCurrentDeparture",globalDepartures.value);	
  const selectedDeparture = departures.find(dep => dep.date === newSelectedFlightDeparture);
  console.log("selectedDeparture",selectedDeparture);
  if(selectedDeparture){	
  	const newfetchedDeparture = await fetchDeparture(tour.value.tourId, selectedDeparture?.id);
	tour.value.departure = newfetchedDeparture
    departureIdURL.value = newfetchedDeparture?.id  
  }else {console.log("departures don't match with the selected date");}
}

const vibeFlightsPriceAllPersonComputed = computed(() => {
  if (!duffelOfferSelected?.value?.total_amount) {
    return null
  }
  // RAW PRICES
  const rawPriceFlightAllPerson = parseFloat(duffelOfferSelected.value.total_amount)
  
  // rounded
  return rawPriceFlightAllPerson ?? 0
});


const totalPackagePriceComputed = computed(() => {
  let total = 0;
  for (const item of priceSummaryDetailsComputed.value) {
    if(item.payment_type == "local"){  
        //console.log("local payment not added to fronted payment");
    }else{
        total += item.totalPrice;
    }
  }
  //console.log("totalPackagePriceComputed",priceSummaryDetailsComputed.value);   
  return total * 1.15;
});

function formatAsCurrency(price, currency) {
  let number = Math.ceil(price); // Remove the extra dot before Math.ceil
  if (!number) {
    return "-";
  }
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0, // No decimals
  });
}

const flightPassengersComputed = computed(() => {
  const newFlightPassengers = []
  //console.log('passengers:',passengers.value);
  if (!passengers?.value?.length || !duffelOfferSelected?.value){ return newFlightPassengers }
  for (let i = 0; i < passengers.value.length; i++) {
    const tourPassenger = passengers.value[i];
    const flightPassengerId = duffelOfferSelected.value.passengers?.[i]?.id
    if (!flightPassengerId  ) {
      console.error(`There's something wrong with the flightPassengerId: '${flightPassengerId}'`)
      return []
    }
    const phoneNumber = passengers.value[i].fields.phone_number
    if (!phoneNumber || phoneNumber== '+1' ) {
            //console.log(passengers.value[i].fields.phone_number)
      console.error(`There's something wrong with the phone number from: '${passengers.value[i].fields.first_name}'`)
      return []
    }

      let phone_country = "";
      let phone_number = "";
        try {
            const parsedPhone = parsePhoneNumber(phoneNumber);
            if (parsedPhone) {
                phone_country = `+${parsedPhone.countryCallingCode}`;
                phone_number = parsedPhone.nationalNumber;
            }
        } catch (error) {
      const message = `Error parsing phone number for '${tourPassenger.fields.first_name}': ${phoneNumber}`
      toast.add({ severity: 'error', summary: 'Error', detail: message, life: 6000 });
            console.error(message);
            return [];
        }

    const flightpassenger = {
      phone_number: tourPassenger.fields.phone_number,
      email: tourPassenger.fields.email,
      born_on: getDateFormatted(tourPassenger.fields.date_of_birth, "YYYY-MM-DD"), // YYYY-MM-DD
      title: getDuffelTitle(tourPassenger.fields.title),
      gender: "m",
      family_name: tourPassenger.fields.last_name,
      given_name: tourPassenger.fields.first_name,
      id: flightPassengerId,
    }
    newFlightPassengers.push(flightpassenger)
  }
  return newFlightPassengers
});

function getDuffelTitle(title) {
  const dictionary = {
    "Mr": "mr",
    "Ms": "ms",
    "Mrs": "mrs",
    "Miss": "miss",
    "dr": "dr",
  }
  return dictionary[title] ?? "mr"
}

const departureDateFromFirstSelectedFlightComputed = computed(() => {
  const departure = duffelOfferSelected?.value?.slices?.at(0)?.segments?.at(0)?.departing_at
  if (departure) {
      //console.log("departureDateFromFirstSelectedFlightComputed",departure);  
    const departureDate = dayjs(departure)
    return departureDate.format("DD/MM/YYYY")
  }
  return "-"
});

function selectNewDuffelOffer(offer) {
  duffelOfferSelected.value = offer
  if (duffelSectionRef.value) {
    duffelSectionRef.value.scrollIntoView({behavior: 'smooth'});
  }
}

const arrivalDateFromLastSelectedFlightComputed = computed(() => {
  const arrival = duffelOfferSelected?.value?.slices?.at(-1)?.segments?.at(-1)?.arriving_at
  if (arrival) {
    const arrivalDate = dayjs(arrival)
    return arrivalDate.format("DD/MM/YYYY")
  }
  return "-"
});

    
const defaultItemsComputed = computed(() => {
  if (!tour?.value?.departure?.prices?.price_total_upfront) {
    return []
  }

  let items = []
  
  //const rawUnitPrice = tour.value.departure.prices.price_total_upfront;   
  const accommodations = tour.value?.departure?.prices?.accommodations; 
  //console.log("default accommodations",accommodations);   
  //console.log("default totalTravelersComputed.value.length",totalTravelersComputed.value.length); 
  const selectedAccommodation = selectAccommodation(accommodations, totalTravelersComputed.value.length);
  console.log("selectedAccommodation",selectedAccommodation);   
  const vibeTourUnitPrice = selectedAccommodation?.price_tiers?.[0]?.value_promotion ??
    selectedAccommodation?.[0]?.price_tiers?.[0]?.value ?? 0;
  
  const totalPriceAdult = vibeTourUnitPrice * (adultsCountURL?.value ?? 0);     
 
  const newItemAdults = {
    itemName: priceSummaryItemsNames.value.default,
    unitPrice: vibeTourUnitPrice,
    totalPrice: totalPriceAdult,
    passengers: parseInt(adultsCountURL?.value ?? 0),
    passengerType: passengerTypes.value.adult,
    details: null
  };
  items.push(newItemAdults);

  if ((childrenCount?.value ?? 0) > 0) {
    const vibeTourChildPrice =
  selectedAccommodation?.price_tiers?.[1]?.value_promotion ??
  selectedAccommodation?.price_tiers?.[1]?.value ??
  selectedAccommodation?.price_tiers?.[0]?.value_promotion ??
  selectedAccommodation?.price_tiers?.[0]?.value ?? 0;

    const totalPriceChild = vibeTourChildPrice * childrenCount.value;

    const newItemChildren = {
      itemName: priceSummaryItemsNames.value.default,
      unitPrice: vibeTourChildPrice,
      totalPrice: totalPriceChild,
      passengers: parseInt(childrenCount.value),
      passengerType: passengerTypes.value?.child ?? "child",
      details: null
    };

    items.push(newItemChildren);
  }

  return items;
});

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
    
const priceSummaryDetailsWithoutFlightComputed = computed(() => {
  let items = []
  
  // default
  if (!accommodatedItemsComputed?.value?.length) {
    items = [...defaultItemsComputed.value]
    if (mandatoryAddonsComputed.value.length) {
      items = [
        ...items,
        ...mandatoryAddonsComputed.value
      ]
    }
  }

  // when accommodation is selected
  else if (accommodatedItemsComputed?.value?.length) {
    items = [...accommodatedItemsComputed.value]
    // mandatory addons
    if (mandatoryAddonsComputed.value.length) {
      items = [
        ...items,
        ...mandatoryAddonsComputed.value
      ]
    }
  }
  //console.log("priceSummaryDetailsWithoutFlightComputed ",priceSummaryDetailsWithoutFlightComputed);
  return items
})

const carouselImagesComputed = computed(() => {
  const images = tour?.value?.images ?? []
  const formattedImages = images.map(imageUrl => ({imageUrl}));
  return formattedImages
});


const optionalExtrasComputed = computed(() => {
  if (!optional_extras?.value?.length || !tour?.value?.departure?.prices?.optional_extras?.length) {
    return []
  }

  let items = []

  for (const extra of optional_extras.value) {
    const extraFound = tour.value.departure.prices.optional_extras.find(ex => ex.id === extra.id)

    if (!extraFound) {
      continue
    }

    const unitprice = extraFound.value
    const totalPrice = unitprice * parseInt(totalTravelersComputed.value.length)
    const addon = {
      itemName: priceSummaryItemsNames.value.optionalExtra,
      unitPrice: unitprice,
      totalPrice: totalPrice,
      passengers: parseInt(totalTravelersComputed.value.length),
      passengerType: passengerTypes.value.adult,
      details: `${extraFound.name} (${extraFound.payment_type})`
    }
    items.push(addon)
  }
  return items
})

const accommodatedItemsComputed = computed(() => {
  if (!accommodationsWithTravelers?.value?.length) {
    return []
  }

  let items = []

  for (const accommodationWithTravelers of accommodationsWithTravelers.value) {
    console.log("accommodationsWithTravelers.value",accommodationsWithTravelers.value);  
    // accommodated adult
    const adults = accommodationWithTravelers.passengers.filter(pa => pa.type === "adult");
    if (adults.length) {    
    console.log("accommodationWithTravelers adults");  
    const adults = accommodationWithTravelers.passengers.filter(pa => pa.type === "adult");
    const rawUnitpriceTour = adults?.[0]?.accommodationPriceTier?.value_promotion ?? adults?.[0]?.accommodationPriceTier?.value;
    console.log("rawUnitpriceTour",rawUnitpriceTour); 
    console.log("flightItemComputed.value.unitPrice",flightItemComputed.value.unitPrice); 
    const vibeUnitPriceTourAdult = rawUnitpriceTour + flightItemComputed.value.unitPrice;
    console.log("vibeUnitPriceTourAdult",vibeUnitPriceTourAdult);     
    const totalPrice = rawUnitpriceTour * adults.length;
    const tripPricec = vibeUnitPriceTourAdult + flightItemComputed.value.unitPrice; 
    const accPricec = tripPricec * 1.15 * adults.length
    const adultsAccommodated = {
        name: accommodationWithTravelers.name,  
      childrenCount: null,
      unitPrice: rawUnitpriceTour,
      totalPrice: totalPrice,
      passengers: adults.length,
      passengerType: passengerTypes.value.adult,
      accPrice: accPricec
    }
    items.push(adultsAccommodated)
    }
      
    // accomodated children
    const children = accommodationWithTravelers.passengers.filter(pa => pa.type === "child")
    if (children.length) {
      console.log("accommodationWithTravelers children");   
      const rawUnitpriceTourChild = children?.[0]?.accommodationPriceTier?.value_promotion ?? children?.[0]?.accommodationPriceTier?.value; 
      const vibeUnitPriceTourChild = rawUnitpriceTourChild + flightItemComputed.value.unitPrice;
      const totalPrice = rawUnitpriceTourChild * children.length ?? 0;
      const tripPricec = vibeUnitPriceTourChild + flightItemComputed.value.unitPrice;   
      const accPricec = tripPricec * 1.15 * children.length
      const childrenAccommodated = {
            name: accommodationWithTravelers.name, 
        childrenCount: children.length,  
        unitPrice: rawUnitpriceTourChild,
        totalPrice: totalPrice,
        passengers: children.length,
        passengerType: passengerTypes.value.child,
        accPrice: accPricec
      }
      items.push(childrenAccommodated)
    }
      
    // accomodated traveler
    const travelers = accommodationWithTravelers.passengers.filter(pa => pa.type === "traveler")
    if (travelers.length) {
            //console.log("accommodationWithTravelers travelers");  
        const rawUnitpriceTour = travelers?.[0]?.accommodationPriceTier?.value_promotion ?? travelers?.[0]?.accommodationPriceTier?.value;
            //console.log("rawUnitpriceTour",rawUnitpriceTour);
        const aditionalCostTour = rawUnitpriceTour * 1;
        const vibeUnitPriceTour = rawUnitpriceTour;
        const totalPrice = vibeUnitPriceTour * travelers.length ?? 0
            //console.log("travelers.length",travelers.length);
            //console.log("childrenCount.value",childrenCount.value);
            //console.log("flightItemComputed",flightItemComputed.value);
        let childrenPricec = null;
        let totalChildrenPricec = null;
        if (childrenCount.value > 0) {
            childrenPricec = (totalPrice / travelers.length) + flightItemComputed.value.unitPrice;
            totalChildrenPricec = childrenPricec * childrenCount.value;
        }
        let adultsPricec = null;
        let totalAdultsPricec = null;
        if (adultsCountURL.value > 0) {
            adultsPricec = (totalPrice / travelers.length) + flightItemComputed.value.unitPrice;
            totalAdultsPricec = adultsPricec * adultsCountURL.value;
        }
         const tripPricec = vibeUnitPriceTour + flightItemComputed.value.unitPrice; 
       const accPricec = tripPricec * 1.15 * travelers.length
        const travelersAccommodated = {
            name: accommodationWithTravelers.name,  
        unitPrice: rawUnitpriceTour,
            childrenCount: null,    
        totalPrice: totalPrice,
        passengers: travelers.length,
        passengerType: passengerTypes.value.traveler,
            accPrice: accPricec
      }
      items.push(travelersAccommodated)
    } 
  }
  console.log("accommodatedItemsComputed", items);
  return items
})

watch(() => accommodatedItemsComputed.value,    
  (newItems, oldItems) => {
    //console.log('accommodatedItemsComputed changed',accommodatedItemsComputed.value);
    //console.log('newItems:', newItems);
    //console.log('oldItems:', oldItems);
  },
  {
    immediate: true,  
    deep:     true   
  });

const mandatoryAddonsComputed = computed(() => {
  if (!tour?.value?.departure?.prices?.mandatory_addons?.length) {
    return []
  }
  let items = []
  for (const mandatoryAddon of tour.value.departure.prices.mandatory_addons) {
    let unitprice = 0;
    let totalPrice = 0;
        unitprice = mandatoryAddon.value;
        totalPrice = unitprice * parseInt(totalTravelersComputed.value.length);
    const addon = {
      itemName: priceSummaryItemsNames.value.mandatoryAddons,
      unitPrice: unitprice,
      totalPrice: totalPrice,
      passengers: parseInt(totalTravelersComputed.value.length),
      passengerType: passengerTypes.value.adult,
      details: `${mandatoryAddon.name} (${mandatoryAddon.payment_type})`,
      payment_type: mandatoryAddon.payment_type 
    }
    items.push(addon)
  }
  return items
})

const flightItemComputed = computed(() => {
  const unitPrice = vibeFlightsPriceAllPersonComputed.value / parseInt(totalTravelersComputed.value.length)

  const item = {
    itemName: priceSummaryItemsNames.value.flight,
    unitPrice: unitPrice,
    totalPrice: vibeFlightsPriceAllPersonComputed.value,
    passengers: parseInt(totalTravelersComputed.value.length),
    passengerType: passengerTypes.value.adult,
    details: null
  }
  return item;
})

const priceSummaryDetailsComputed = computed(() => {
  let items = []

  // default
  if (!accommodatedItemsComputed?.value?.length) {
    items = [...defaultItemsComputed.value]
    if (mandatoryAddonsComputed.value.length) {
      items = [
        ...items,
        ...mandatoryAddonsComputed.value
      ]
    }
  }

  // when accommodation is selected
  else if (accommodatedItemsComputed?.value?.length) {
    items = [...accommodatedItemsComputed.value]
    // mandatory addons
    if (mandatoryAddonsComputed.value.length) {
      items = [
        ...items,
        ...mandatoryAddonsComputed.value
      ]
    }
  }

  // when optional_extras is selected
  if (optionalExtrasComputed.value.length) {
    items = [
      ...items,
      ...optionalExtrasComputed.value
    ]
  }

  //selected flight
  items.push(flightItemComputed.value)
  console.log("priceSummaryDetailsComputed: ",items);
  return items;
})

const promo = ref();

function accommodationsUpdate(newValue) {
  //console.log("accommodationsUpdate", newValue); 
  accommodations.value = newValue;
    //console.log("accommodations.value",accommodations.value);
  accommodationsWithTravelers.value = newValue;
    //console.log("accommodationsWithTravelers.value",accommodationsWithTravelers.value);
  //console.log("accommodations updated",accommodationsWithTravelers.value);   
  //console.log("priceSummaryDetailsComputed",priceSummaryDetailsComputed.value);   
  promo.value = calculateAccumulatedPromotion(accommodationsWithTravelers.value);   
}
    
function calculateAccumulatedPromotion(data) {
  // Initialize the total promotion to 0
  let totalPromotion = 0;

  // Loop through each accommodation in the array
  data.forEach((accommodation) => {
    // Loop through each traveler in the accommodation
    accommodation.passengers.forEach((traveler) => {
      // Check if the traveler has an accommodationPriceTier with a valid promotion
      const tier = traveler.accommodationPriceTier;
      if (tier && tier.value && tier.value_promotion) {
        // Calculate the promotion for this traveler and add it to the total
        const promotion = tier.value - tier.value_promotion;
        totalPromotion += promotion;
      }
    });
  });

  return totalPromotion;
}   
    
async function fetchTour(tourId) {
  const {data} = await useFetch(`${config.public.BACKEND_URL}/api/tour/${tourId}`);
  return data.value?.data ?? {};
}

async function fetchDeparture(tourId, departureId) {
  console.log("fetchDeparture",tourId,"-",departureId);   
  const options = {
    params: {
      tourId,
      departureId
    }
  }
  const {data, error} = await useFetch(`${config.public.BACKEND_URL}/api/departure`, options);

  const departure = data?.value

  if (error?.value) {
    console.error('error: ', error.value)
    return null
  }

  if (departure?.error) {
    console.info(`Error fetching single departure with departureId: '${departureId}'`, departure?.message)
    return null
  }

  return departure ?? null;
}

async function handleDeparture(tourId, departureId) {
  //console.log("handleDeparture",handleDeparture); 
  if (!tourId) {
    console.error(`tourId missing: '${tourId}'`)
    return null
  }
  if (!departureId) {
    console.info(`departureId missing: '${departureId}', finding the earliest departure...`)
    return await getEarliestDeparture(tourId)
  }

  const departure = await fetchDeparture(tourId, departureId);

  if (!departure) {
    console.info(`Error fetching single departure with departureId: '${departureId}', finding the earliest departure...`)
    return await getEarliestDeparture(tourId)
  }

  return departure;
}

function getDefaultDepartureRange() {
  const starts = dayjs().add(1, 'day').format('YYYYMMDD')
  const ends = dayjs().add(3, 'month').format('YYYYMMDD');

  return `${starts}-${ends}`
}

async function getEarliestDeparture(tourId) {
  //console.log("getEarliestDeparture");    
  const dateRange = getDefaultDepartureRange()
  const departures = await fetchMultipleDepartures(tourId, dateRange)

  const firstDeparture = departures?.[0]
  if (!firstDeparture) {
    console.error("We couldn't find an earliest departure")
    return null
  }
  console.info("we found the earliest departure. Now getting more details...")
  return await fetchDeparture(tourId, firstDeparture?.id);
}

async function fetchMultipleDepartures(tourId, dateRange) {
  const url = `${config.public.BACKEND_URL}/api/departures/?tourId=${tourId}&date_range=${dateRange}`;
  const options = {
    headers: {
      'accept': 'application/json',
    },
  }
  const {data} = await useFetch(url, options);

  let departures = data?.value?.data?.items ?? []
  //departures = departures.filter(dep => dep?.departure_type === "guaranteed")

  if (!departures.length) {
    console.info("We coudln't find any available departures")
    return [];
  }
  globalDepartures.value = departures;
  //console.log("globalDepartures.value",globalDepartures.value);   
  const onlyAFewDepartures = departures.slice(0, 5);
  departuresStored.value = onlyAFewDepartures;
  return onlyAFewDepartures;
}

async function createBooking() {
  //console.log("createBooking accommodations.value",accommodations.value);
  //console.log("createBooking totalPackagePriceComputed.value",totalPackagePriceComputed.value ); 
  //console.log("accommodatedItemsComputed", accommodatedItemsComputed.value);
    
  const tourBody = {
    departure_id: tour.value.departure.id,
    currency: 'USD',
    email: 'info@vibeadventures.com',
    user_country: 3903,
    passengers: passengers.value,
    tour_id: tourIdURL.value,
    partner_booking_code: 12345,
    store_id: "vibe_adventures",
    tour_name: tour.value.tour_name,
    description: tour.value.overview      
  }

  if (accommodations.value.length) {
    const bookingAccommodations = accommodations.value.map(item => ({
    id: item.id,
    passengers: item.passengers.map(passenger => passenger.id)
    }));  
      //console.log("bookingAccommodations",bookingAccommodations);  
    // accomodation for tour
    tourBody.accommodations = bookingAccommodations;
  }

  if (optional_extras.value.length) {
    tourBody.optional_extras = optional_extras.value
  }

  const flightBody = {
    data: {
      type: "instant",  
      selected_offers: [duffelOfferSelected.value.id],
      payments: [
        {
          type: "balance",
          currency: duffelOfferSelected.value.total_currency,
          amount: duffelOfferSelected.value.total_amount,
        }
      ],
      passengers: flightPassengersComputed.value
    }
  }
  //console.log("duffelOfferSelected.value ",duffelOfferSelected.value);   
    
  const dateString = duffelOfferSelected.value.payment_requirements.payment_required_by;
    // Generate the current timestamp + 5 days in UTC
    const plusFiveDays = dayjs().utc().add(5, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]');

    // Parse both dates into dayjs objects
    const parsedDateString = dayjs.utc(dateString);
    const parsedPlusFiveDays = dayjs.utc(plusFiveDays);

    const lowerDate = parsedPlusFiveDays.isBefore(parsedDateString)
    ? parsedPlusFiveDays
    : parsedDateString;

    // Save the lower date in UTC format
    const lowerDateUTC = lowerDate.format('YYYY-MM-DDTHH:mm:ss[Z]');

    //console.log('Original Date:', dateString);
    //console.log('Plus Five Days:', plusFiveDays);
    //console.log('Lower (Earlier) Date:', lowerDateUTC);
    const formattedDate = dayjs(lowerDateUTC).format('YYYY-MM-DD HH:mm:ss');  // MySQL-compatible format
    //console.log("formattedDate: ",formattedDate); // Output: 2024-12-07 21:22:51
    
  const {data} = await useFetch(`${config.public.BACKEND_URL}/api/book-package-v2`, {
    method: 'POST',
    body:JSON.stringify({
      tour: tourBody,   
      flight: flightBody,
      passengers: passengers.value,
      url: window.location.href,
      price_total: Math.ceil(totalPackagePriceComputed.value),
      expiration: formattedDate,
      passengers: accommodatedItemsComputed.value,  
    }),
        headers:{
            'Content-Type': 'application/json'
        }
  });

    if (data.value.success == false) {
    console.error(data.value.message)
      toast.add({ severity: 'error', summary: 'Error', detail: data.value.message, life: 6000 });
  }else{
      // Join the returned URL with the attempt_id as a query parameter
      const finalUrl = data.value.url;
      // Open the newly constructed URL
      window.open(finalUrl, '_self');
    }
}

function isPaxNumberOk(passenger, index) {
  if (passenger?.pax_number === index) {
    return true
  }
  console.error(`pax_number Should be: ${index} for passenger ${passenger?.pax_number}`)
  return false
}

function isPriceCategoryOk(passenger) {
  const priceCategoriesIds = tour?.value?.priceCategories?.map(p => p.id) ?? []
  if (!priceCategoriesIds.length) {
    console.error("we don't have price categories available to check");
  }
  if (!priceCategoriesIds.includes(passenger?.price_category_id)) {
    console.error(`price category '${passenger?.price_category_id}' doesn't exist in passenger '${passenger.pax_number}''`)
    return false
  }

  return true
}

function hasAllDefaultFields(passenger) {
  //console.log(passenger)
  const passengerFields = Object.keys(passenger.fields)
  const defaultFields = Object.keys(GLOBAL_DEFAULT_PASSENGERS_FIELDS)

  for (const defaultField of defaultFields) {
    if (!passengerFields.includes(defaultField)) {
      console.error(`field '${defaultField}' is missing for passenger '${passenger.pax_number}'`)
      return false
    }
  }
  return true
}


// añdi el brinco de los campos title y nationalitu
function hasAllMandatoryFieldsForLeadTraveler(leadTraveler) {
  const passengerFields = Object.keys(leadTraveler.fields);
  const leadMandatoryFields = tour.value.bookingFields.filter(field => {
    if (field.main_pax === "mandatory") {
      return field;
    }
  });
  const mandatoryFields = leadMandatoryFields.map(f => f.name);

  for (const mandatoryField of mandatoryFields) {
    if (['nationality', 'title','address','city','postal_code','state','country'].includes(mandatoryField)) {
      continue;
    }

    if (!passengerFields.includes(mandatoryField)) {
      showToast(`Please fill missing required fields for Lead Traveler`);
      console.error(`Mandatory field '${mandatoryField}' is missing for lead traveler: '${leadTraveler.pax_number}'`);
      return false;
    }
  }
  return true;
}

function hasAllMandatoryFieldsForOthers(passenger) {
  const passengerFields = Object.keys(passenger.fields)
  const passengerMandatoryFields = tour.value.bookingFields.filter(field => {
    if (field.additional_pax === "mandatory") {
      return field
    }
  })
  const mandatoryFields = passengerMandatoryFields.map(f => f.name)

  for (const mandatoryField of mandatoryFields) {
    if (!passengerFields.includes(mandatoryField)) {
      console.error(`Mandatory field '${mandatoryField}' is missing for passenger '${passenger.pax_number}'`)
      return false
    }
  }
  return true
}
//añaddio los campos ignorados
function areFieldsFilled(passenger) {
  const ignoredFields = ['nationality', 'title', 'address', 'city', 'postal_code', 'state', 'country','account','billing','personal_billingStatus','company_billingStatus', 'country_nationality', 'country_of_issue'];

  for (const fieldName in passenger.fields) {
    //console.log('Processing field:', fieldName);  // Ver qué campos se están procesando

    if (ignoredFields.includes(fieldName)) {
      //console.log('Ignoring field:', fieldName);  // Asegúrate de que "nationality" se ignora
      continue;
    }

    const mandatoryField = passenger.fields[fieldName];
    if (!mandatoryField) {
      const fieldLabel = GLOBAL_DEFAULT_PASSENGERS_FIELDS[fieldName] || fieldName;
      showToast(`${fieldLabel} is empty for passenger ${passenger.pax_number}`);
      return false;
    }
  }
  return true;
}

function canBookingFlight() {
  if (!duffelOfferSelected.value) {
    console.error("You haven't selected an offer flight yet")
    return false
  }

  if (flightPassengersComputed.value.length !== totalTravelersComputed.value.length) {
    console.error("the quantity of travelers is not equal to the quantity of flight passengers")
    return false
  }


  return true
}

function areAccommodationsSelected() {
  const travelersCount = totalTravelersComputed.value.length
  const bedsSelected = totalBedsSelected.value
  if (travelersCount !== bedsSelected) {
    console.info(`Travelers count: '${travelersCount}' and Beds Selected: '${bedsSelected}'`)
    const travelersWithoutBed = travelersCount - bedsSelected
    if (travelersWithoutBed === travelersCount) {
      showToast('Please select your accommodations')
      return false
    } else {
      showToast(`Please select ${travelersWithoutBed} more accommodations`)
      return false
    }
  }

  return true
}

function canBookingTour() {
  passengers.value.forEach(pax => {
    pax.fields.place_of_issue = pax.fields.country_of_issue;
    pax.fields.nationality = pax.fields.country_of_issue;
    delete pax.fields.country_of_issue;
    delete pax.fields.country_nationality;
  });

  if (passengers?.value?.length < 1) {
    showToast('Please fill in the travelers details')
    return false
  }
  if (passengers.value.length !== totalTravelersComputed.value.length) {
    showToast('Please fill in all the travalers information required')
    return false
  }

  if (!areAccommodationsSelected()) {
    return false
  }

    

  for (let i = 0; i < totalTravelersComputed.value.length; i++) {
    const passenger = passengers.value[i];
    const isLeadTraveler = i === 0

    if (!isPaxNumberOk(passenger, i + 1)) {
      return false
    }
    if (!isPriceCategoryOk(passenger)) {
      return false
    }
    if (!passenger.hasOwnProperty("fields")) {
      console.error(`passenger '${passenger.pax_number}' must have the 'fields' property`)
      return false
    }
    if (!hasAllDefaultFields(passenger)) {
      return false
    }

    if (!areFieldsFilled(passenger)) {
      return false
    }

    if (isLeadTraveler) {

      if (!hasAllMandatoryFieldsForLeadTraveler(passenger)) {
        return false
      }

    } else {
      // Is not a Lead traveler
      if (!hasAllMandatoryFieldsForOthers(passenger)) {
        return false
      }

    }

  }
  return true
}

const tourAvailable = ref([]);
const flightAvailable = ref([]);    

// Function to check the expiration time
function checkExpiration(expiresAt) {
  const expirationDate = dayjs(expiresAt);
  const now = dayjs();
  const differenceInMinutes = expirationDate.diff(now, 'minute');

  // Format the expiration date to local format
  const formattedExpirationDate = expirationDate.format('YYYY-MM-DD HH:mm:ss');

  //console.log(`Expiration date (local): ${formattedExpirationDate}`);    
    
  // Check if the expiration is within the next 3 minutes or already passed
  if (differenceInMinutes <= 3) {
    console.error('Expiration time is 3 minutes or less from now.');
      return false;
  }else{ return true;}
}
    
async function checkAvailabilityToPay() {
    console.log("checkAvailabilityToPay");
    try {
        const offerId = duffelOfferSelected.value.id;
		console.log("offerId on validation",offerId);
        
		//if (!offerId) {
        //    console.log("Duffel offerId is missing");
        //    throw new Error("Duffel offerId is missing");
        //}

        const duffelResponse = await fetchDuffelOffer(offerId);
        console.log("duffelOffer", duffelResponse);
        
        if(!duffelResponse.expires_at){
        console.log("no expiration on duffel offer");
        }
        
        const expiresAt = duffelResponse.expires_at;
        console.log("duffelResponse.expires_at", expiresAt);
        const flightAvailability = checkExpiration(expiresAt);
        //console.log("flightAvailability", flightAvailability);   
        
        const tourAvailability = await handleDeparture(tourIdURL.value, departureIdURL.value);
        //console.log("tourAvailability.availability", tourAvailability.availability);
        //console.log("totalTravelersComputed.value.length",totalTravelersComputed.value.length);

        if (flightAvailability && tourAvailability.availability >= totalTravelersComputed.value.length) {
            return true;
        } else if (flightAvailability && tourAvailability.availability < totalTravelersComputed.value.length) {
            return "tour not available";
        } else {
            return "flight not available";
        }

    } catch (error) {
        console.error("Error in checkAvailabilityTo Pay:", error);
        return false;
    }
}

const tfAvailable = ref(false); 
    
async function handlePayNow() {
  isLoadingPayment.value = true
  if (!canBookingTour()) {
    isLoadingPayment.value = false
    return
  }

  if (!canBookingFlight()) {
    isLoadingPayment.value = false
    return
  }
    
  tfAvailable.value = await checkAvailabilityToPay();   
  console.log("tfAvailable.value",tfAvailable.value); 
  if (tfAvailable.value != false){
      //console.log("tour&flight are available",tfAvailable.value);
      await createBooking();
  }else {
      //console.log("tour or flight not available",tfAvailable.value);
      showToast(`Tour or Flight are not available anymore, try to choose another date.`);
  }
    
  isLoadingPayment.value = false
}

function showToast(msg) {
  toast.add({severity: 'Secondary', detail: msg, life: 3000});
}



const windowMobile = ref(false);
const checkMobile = () => {
  windowMobile.value = window.innerWidth <= 768;
};

const breadCrumbsComputed = computed(() => {
  const countryName = tour?.value?.destinations?.countries?.[0]?.country_name;
  const countryId = tour?.value?.destinations?.countries?.[0]?.location_id;

  if (!countryName || !countryId) {
    return [{ label: windowMobile.value ? '' : 'Home',
    icon: windowMobile.value ? 'pi pi-home' : '', url: `${config.public.FRONTEND_URL}/` }];
  }

  return [
    {
      label: window.innerWidth <= 768 ? '' : 'Home',
        icon: window.innerWidth <= 768 ? 'pi pi-home' : '',
      url: `${config.public.FRONTEND_URL}/`
    },
    {
      label: `${countryName} Trips`,
      url: `${config.public.FRONTEND_URL}/tours?country=${countryId}`,
    },
    {
      label: `${tour?.value.tourName}`,
      url: null,
    },
  ];
});


const totalBedsSelected = computed(() => {
  let totalBeds = 0

  if (!accommodations?.value?.length) return totalBeds

  for (const room of accommodations.value) {
    const bedsCount = room?.passengers?.length
    if (bedsCount) {
      totalBeds += bedsCount
    }
  }

  return totalBeds
})

async function fetchDuffelRequestById(requestId) {
  if (!requestId) {
    console.error('duffelRequestId is needed. Its something like: "orq_xxxx"')
    return null
  }

  // preparing params for request
  const params = new URLSearchParams();
  params.append('requestId', requestId);
  params.append('page', 1);
  params.append('perPage', 3);
  params.append('stops', STOP_OPTIONS.value.any);
  params.append('sortByLeastExpensive', 'sortByLeastExpensive');
  params.append('time','0');
  // requesting
  const url = `${config.public.BACKEND_URL}/api/duffel/get-request-by-id?${params.toString()}`;

  const {data, error} = await useFetch(url);

  let newDuffelRequest = data?.value?.data

  // handle errors
  if (error?.value?.data?.message) {
    for (const key in error?.value?.data?.message) {
      console.error(`${key}: ${error?.value?.data?.message[key]}`)
    }
    return null
  }

  return newDuffelRequest;
}

const duffelRequestId = ref();  
    
async function handleDuffelRequest(requestId, tour, departure, before, after) {
  console.log("handleDuffelRequest departure",departure); 
  console.log("handleDuffelRequest requestId",requestId);
  console.log("handleDuffelRequest after",after); 
  isDuffelRequestLoading.value = true
  if (!tour?.tourId) {
    console.error(`tourId missing: '${tour?.tourId}'`)
    isDuffelRequestLoading.value = false
    return null
  }
  if (!departure) {
    console.error(`Departure missing:`, departure)
    isDuffelRequestLoading.value = false
    return null
  }
  // Create a new duffel request
  if (!requestId || after>0 || before>0) {
    console.info("Missing 'duffelRequestId'. Its something like: 'orq_xxxx'. Creating a new duffel request...")
    const newDuffelRequestCreated = await getNewDuffelrequest(tour, departure, after, before)
    isDuffelRequestLoading.value = false
       //console.log("newDuffelRequestCreated",newDuffelRequestCreated);
    duffelRequestId.value = newDuffelRequestCreated.id;
    isDuffelRequestLoading.value = false;   
    return newDuffelRequestCreated
  }else {
      const duffelRequest = await fetchDuffelRequestById(requestId, tour, departure);
      //console.log("duffelRequest in handleDuffelRequest",duffelRequest);
      /* handle request without offers
      const offersCount = duffelRequest?.offers?.length
      if (!offersCount) {
        console.info('There are no offers in the old duffel request, Creating a new one...')
        const newDuffelRequest = await getNewDuffelrequest(tour, departure)
        isDuffelRequestLoading.value = false
        return newDuffelRequest
      }
      */
      isDuffelRequestLoading.value = false;
      return duffelRequest;
  }
}

async function getIataCodeByCityName(cityName) {
  if (!cityName) {
    console.error(`cityName: '${cityName}'. We need a cityName for finding the iata CODE.`)
    return ""
  }

  const location = GLOBAL_LOCATIONS.find((location) => location.city == cityName);
  if (!location?.code) {
    console.error(`There's no IATA code for city: '${cityName}'`)
    return ""
  }
  return location.code;
}

function getDateFormatted(date, format) {
  const [day, month, year] = date.split('/');
  const newDate = new Date(`${year}-${month}-${day}`);
  return dayjs(newDate).format(format);
}

function getDateMinusOne(departureDate) {
  if (!departureDate) {
    return null
  }
  return dayjs(departureDate).format('DD/MM/YYYY');
}

function getFlightDepartureDateInbound(tourLengthDays, departureDate, before) {
  const tourEndDate = dayjs(departureDate).add(tourLengthDays, 'day').format('YYYY-MM-DD');
  if(before>0){return dayjs(tourEndDate).add(before, 'day').format('YYYY-MM-DD');}
      else{return dayjs(tourEndDate).format('YYYY-MM-DD');}
}

function getFlightDepartureDateOutbound(departureDate, before) {
  //console.log("getFlightDepartureDateOutbound & before",departureDate, before);
  if(before>0){
    return dayjs(departureDate).subtract(before, 'day').format('YYYY-MM-DD');
  }else{    
    return dayjs(departureDate).format('YYYY-MM-DD'); 
  }
}
    
const tourendDate = ref();  
    
function getFlightAfterDateInbound(tourLengthDays, departureDate, after) {
  const tourEndDate = dayjs(departureDate).add(tourLengthDays, 'day').format('YYYY-MM-DD');
  //console.log("tourEndDate",tourEndDate);
  tourendDate.value = tourEndDate;
  //console.log("getFlightAfterDateInbound after",after);   
  if(after>0){return dayjs(tourEndDate).add(after, 'day').format('YYYY-MM-DD');}
      else{return dayjs(tourEndDate).format('YYYY-MM-DD');}
}   
    
async function getNewDuffelrequest(tour, departure, after, before) {
  //console.log("before & after value on getNewDuffelrequest",before,after);    
  //console.log("getNewDuffelrequest departure: ",departure.date);  
  //console.log("adultsCountURL.value",adultsCountURL.value);       
  //console.log("childrenCount.value",childrenCount.value); 
  const origin = departure_fly_from.value
  const destination = await getIataCodeByCityName(tour?.start_city?.city_name)
  const departureDate = getFlightDepartureDateOutbound(departure.date, before);
  //console.log("departureDate after getFlightDepartureDateOutbound",departureDate);    
  const originInbound = await getIataCodeByCityName(tour?.end_city?.city_name)
  const destinationInbound = departure_fly_from.value;
  //console.log("after value conditional",after); 
  const departureDateInbound = getFlightAfterDateInbound(tour.tourLengthDays, departure.date, after);
  //console.log("getNewDuffelrequest departureDateInbound",departureDateInbound);
  console.log("departure.date on getNewDuffelrequest ",departure.date);	
  const tourDate = dayjs(departure.date).format('YYYY-MM-DD');
  console.log("tourDate on getNewDuffelrequest ",tourDate);       
  //console.log("departure.date, tour.tourLengthDays: ", departure.date, tour.tourLengthDays);  
  const tourEndDate = dayjs(departure.date).add(tour.tourLengthDays, 'day').format('YYYY-MM-DD');   
  //console.log("tourEndDate",tourEndDate);     
  const duffelRequest = await fetchFlights({
    origin,
    destination,
    departureDate,
    originInbound,
    destinationInbound,
    departureDateInbound,
    adultsCount: adultsCountURL.value,
    childrenCount: childrenCount.value,
    tourDate, 
    tourEndDate,  
  });
  //console.log("duffelRequest params",departureDate,departureDateInbound)
  //console.log("duffelRequest on getnewduffelrequest",duffelRequest)
  return duffelRequest
}

const quantityRange = ref({ min: 1, max: 10 })  
    
async function fetchFlights(paramsObj) {
  //console.log("fetchFlights function with params",paramsObj); 
  const {
    origin,
    destination,
    departureDate,
    originInbound,
    destinationInbound,
    departureDateInbound,
    adultsCount,
    childrenCount,
    cabinClass,
    tourDate,
    tourEndDate,  
    limit = 3,
  } = paramsObj;
  console.log("tourDateprevious",tourDate);
  const params = new URLSearchParams();
  params.append('origin', origin);
  params.append('destination', destination);

  // optional parameters
  if (originInbound !== undefined) {
    params.append('originInbound', originInbound);
  }
  if (destinationInbound !== undefined) {
    params.append('destinationInbound', destinationInbound);
  }
  if (departureDateInbound !== undefined) {
    params.append('departureDateInbound', departureDateInbound);
  }
  if (adultsCount !== undefined) {
    params.append('adultsCount', adultsCount);
  }
  if (childrenCount !== undefined) {
    params.append('childrenCount', childrenCount);
  }
  if (cabinClass !== undefined) {
    params.append('cabinClass', cabinClass);
  }
  if (limit !== undefined) {
    params.append('limit', limit);
  }
  params.append("sortByLeastExpensive", "sortByLeastExpensive");
  //params.append('payment','false');
  //params.append('airlines','AA'); 
  let tourdate;
  let departuredate;	
  console.log("before.value on params", before.value);    
  if(before.value == 0){    
    departuredate = dayjs(tourDate).format('DD-MM-YYYY');    
    console.log("departureDate before0 ",departureDate);
  }else { 
    departuredate = dayjs(tourDate).subtract(before.value, 'day').format('DD-MM-YYYY');
    console.log("departureDate minus ",departureDate);   
  }
  //console.log("after.value on params", after.value);    
  if (after.value == 0){    
    params.append('departureTimeFromInbound','21:00');  
  }  
  params.append('departureDate', departuredate);	
  params.append('arrivalTimeTo','06:00');	
  params.append("tourDate",tourDate);		
  params.append("tourEndDate",tourEndDate); 
  const url = `${config.public.BACKEND_URL}/api/duffel/create-request-get-offers?${params.toString()}`;
  //console.log("url of fetchflights",url);
  const {data, error} = await useFetch(url);

  if (error?.value?.data?.message) {
    for (const key in error?.value?.data?.message) {
      console.error(`${key}: ${error?.value?.data?.message[key]}`);
    }
    return []
  }
    const offersCount = data?.value?.data?.offers?.length;
    if (!offersCount) {
        console.error(`There are no available flights in this duffel request: '${data?.value?.data?.id}'`);
        return [];
    }
    // get last segment's arriving_at from the FIRST slice (slices[0])
    const arrivingAt = data?.value?.data?.offers?.[0].slices?.[0]?.segments?.at(-1)?.arriving_at;

    // If both values exist, compare them
    if (arrivingAt && tourdate) {
      const arriving = dayjs(arrivingAt);   
      const tourStart = dayjs(tourdate, ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'])   
      //console.log('arrivingAt:', arriving);
      //console.log('tourDate:', tourStart);
      // OPTION A: compare by day only (ignores time-of-day)
      const arrivesBeforeTourByDay = arriving.isBefore(tourStart, 'day')

      // OPTION B: compare by full datetime (considers time & timezone)
      const arrivesBeforeTourExact = arriving.isBefore(tourStart)

      //console.log('arrivesBeforeTourByDay:', arrivesBeforeTourByDay)
      //console.log('arrivesBeforeTourExact:', arrivesBeforeTourExact)

      // choose which comparison you want — here I use date-only:
      if (arrivesBeforeTourByDay) {
        //console.log(`Flight arrives before tour start date — applying fallback behavior.`)
        after.value = 1
        before.value = 1
        // change allowed range to 1..10 (same behavior as before)
        quantityRange.value.min = 1
        quantityRange.value.max = 10
      }
    }   
    
    return data?.value?.data ?? [];
}

async function fetchDuffelOffer(offerId) {
  if (!offerId) {
    console.info('Missing duffelOfferId. Its something like: "off_xxxx"')
    return null
  }

  const params = new URLSearchParams();
  params.append('offerId', offerId);

  const url = `${config.public.BACKEND_URL}/api/duffel/get-offer-by-id?${params.toString()}`;

  const {data, error} = await useFetch(url);

  if (error?.value?.data?.message) {
    for (const key in error?.value?.data?.message) {
      console.error(`${key}: ${error?.value?.data?.message[key]}`)
    }
    return null
  }

  return data?.value?.data;
}

async function fetchMoreResults(requestId, newPage) {
    
  //console.log("globalFilters in fetchMoreResults:  ",globalFilters.value);    
  const params = new URLSearchParams();
  params.append('offerId', requestId);
  params.append('page', newPage);
  params.append('limit', 3);
    
  if(globalFilters.value.stops == 'any'){
      params.append('maxConnections', 2);
  } else if (globalFilters.value.stops == 'direct'){
      params.append('maxConnections', 0);
  }
    else if (globalFilters.value.stops == 'upToOneStop'){
      params.append('maxConnections', 1);
  } else if (globalFilters.value.stops == 'upToTwoStops'){
      params.append('maxConnections', 2);
  } 
  
  if (globalFilters.value.checkedbaggage > 0) {
    params.append('baggage_checked', globalFilters.value.checkedbaggage);
  }
  if (globalFilters.value.cabinbaggage > 0) {
    params.append('baggage_carry', globalFilters.value.cabinbaggage);
  }
  if (globalFilters.value.sort == 'sortByLeastExpensive') {
    params.append('sort', 'total_amount');
  }
  if (globalFilters.value.sort == 'sortByLeastDuration') {
    params.append('sort', 'total_duration');
  }
  const url = `${config.public.BACKEND_URL}/api/duffel/sort-offer?${params.toString()}`;

  const {data} = await useFetch(url);
  return {
    offers: data.value.data,
    offersMeta: data.value.meta,
  }
}

async function handleShowMoreResults() {
  const requestId = duffelRequest?.value?.id;
  const currentPage = duffelRequest.value?.offersMeta?.page || 1;
  const nextPage = currentPage + 1;

  const {offers, offersMeta} = await fetchMoreResults(requestId, nextPage);

  duffelRequest.value.offers.push(...offers);
  //console.log("offersMeta in fetchMoreResults",offersMeta);   
  duffelRequest.value.offersMeta = offersMeta;
}

function getDuffelOfferId(duffelOfferId) {
  if (duffelOfferId) {
    return duffelOfferId
  }
  console.info('Missing duffelOfferId in url.')

  if (duffelRequest?.value?.offers?.length) {
    console.info('Assigning the first duffelOfferId found in duffelRequest offers...')
    return duffelRequest?.value?.offers?.[0]?.id
  }
  return null
}

async function handleDufferOffer(duffelOfferId) {
  console.log("handleDufferOffer executing");
  isDuffelOfferSelectedLoading.value = true
  const duffelOfferSelected = await fetchDuffelOffer(duffelOfferId)

  if (duffelOfferSelected) {
    isDuffelOfferSelectedLoading.value = false
    return duffelOfferSelected
  }

  // offer has expired
  console.info(`duffelOfferId '${duffelOfferId}' has expired.`)

  // Finding another duffelOffer
  if (duffelRequest?.value?.offers?.length) {
    console.info('Getting a new offer from duffelRequest...')
    const firstDuffelOffer = duffelRequest?.value?.offers?.[0]
    if (firstDuffelOffer) {
      const newDuffelOfferSelected = await fetchDuffelOffer(firstDuffelOffer?.id)
      isDuffelOfferSelectedLoading.value = false
      return newDuffelOfferSelected
    }
  }

  // request also expired
  console.info(`duffelRequest '${duffelRequest?.id}' has expired.`)
  duffelRequest.value = await handleDuffelRequest(null, tour.value, tour.value.departure,before.value,after.value)
  const firstOffer = duffelRequest?.value?.offers?.[0]
  if (firstOffer) {
    const offerSelected = await fetchDuffelOffer(firstOffer?.id)
    isDuffelOfferSelectedLoading.value = false
    return offerSelected
  }

  return null
}

function getDepartureFlyFrom(params, name) {
  const defaultValue = "NYC" // new york
  if (!params.get(name)) {
    return defaultValue
  }
  return params.get(name)
}

function getTourId(params, name) {
  const defaultTourId = "200039"
  if (!params.get(name)) {
    return defaultTourId
  }
  return params.get(name)
}

function getDepartureId(params, name) {
  const defaultDepartureId = null
  if (!params.get(name)) {
    return defaultDepartureId
  }
  return params.get(name)
}

function getAdultsCount(params, name) {
  const defaultCount = 1
  if (!params.get(name)) {
    return defaultCount
  }
  return parseInt(params.get(name))
}

// update <BookPageSearchBar />
async function updateTourDetailSearchBar({
                                           departure_fly_from,
                                           adultsCountURL,
                                           childrenCount,
                                           infantsCount,
                                           tour,
                                           datesRange
                                         }) {
  const location = GLOBAL_LOCATIONS.find(loc => loc.code.toLowerCase() === departure_fly_from.toLowerCase())

  if (location) {
    localSearchBar.value.selectedLocationDeparture = location
  }

  localSearchBar.value.travelersSelected = {
    adults: parseInt(adultsCountURL),
    children: parseInt(childrenCount),
    infants: parseInt(infantsCount),
  }
  
  // selected departure
  const departureFlightDateSelected = getDateMinusOne(tour?.departure?.date)
  localSearchBar.value.selectedDepartureDate = departureFlightDateSelected

  /* more departures
  if(departuresStored.value){
      //console.log("departuresStored.departures",departuresStored.value.departures);
      const departuresDates = formatAsStringDate(departuresStored.value.departures)
      localSearchBar.value.departuresDates = [
        ...departuresDates
      ]
      globalDepartures.value = departuresStored.value.departures;
  } else {
  */      
  const departures = await fetchMultipleDepartures(tour?.tourId, datesRange);
    globalDepartures.value = departures;
  const departuresDates = formatAsStringDate(departures)
  localSearchBar.value.departuresDates = [
    //...localSearchBar.value.departuresDates,
    ...departuresDates
  ]
  //}
}

function formatAsStringDate(departures) {
  if (!departures?.length) {
    return []
  }

  let newDates = []
  const dates = departures.map(dep => dep.date)
  for (const date of dates) {
    const newDate = getDateMinusOne(date)
    newDates.push(newDate)
  }
  return newDates
}

function getDatesRange(params, name) {
  if (!params.get(name)) {
    return getDefaultDepartureRange()
  }
  return params.get(name)
}

function calculateRange(departureDate) {
  let startOfMonth = dayjs(departureDate).startOf('month');
  const today = dayjs()
  if (startOfMonth.isBefore(today, 'day')) {
    startOfMonth = today
  }

  startOfMonth = startOfMonth.format('YYYYMMDD');
  const endOfMonth = dayjs(departureDate).endOf('month').format('YYYYMMDD');

  return `${startOfMonth}-${endOfMonth}`
}

function getDepartureSelectedInCalendar(params, name) {
  const defaultValue = null
  if (!params.get(name)) {
    return defaultValue
  }
  return params.get(name)
}

function getTourDepartureDate() {
  const date = dayjs(tour.value.departure.date).format("YYYY-MM-DD")
  const departureDate = dayFormatted(dayjs(date));
  const endDate = dayFormatted(dayjs(date).add(tour.value.tourLengthDays, 'days'));
  //localStorage.setItem('tour_departure_end_date', dayjs(date).add(tour.value.tourLengthDays, 'days'));
  return `${departureDate} - ${endDate}`;
}   
    
const before = ref(0);  
const after = ref(0);   
    


const formatStoreDeparturesDates = computed(() => {
  //console.log("formatStoreDeparturesDates");  
  const deps = unref(globalDepartures) || []
  return deps.map(dep => ({
    label: dayFormatted(getDateMinusOne(dep.date)),
    value: dep.id,
    date: getDateMinusOne(dep.date)
  }))
})  
// Define the computed property at the top level to ensure reactivity
const hasMultiplePriceTiers = computed(() => {
  //console.log();  
  if (tour?.value?.departure?.prices) {
    //console.log("Checking price tiers for accommodations:", tour.value.departure.prices.accommodations);
    return tour.value.departure.prices.accommodations.some(accommodation => accommodation.price_tiers.length > 1);
  }
  //console.log("Tour still without value");
  return false;
});



const timeLeft = ref(20 * 60); // 20 minutes in seconds

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

watch(timeLeft, async (newTime) => {
  if (newTime === 25 * 60) { // 5 minutes passed (25 minutes left)
    gravitecStore.checkSubscription(() => {
      gravitecStore.sendAbandonedCartNotification('push', tour.value, userId.value);
    });
  }
  if (newTime === 0) { // Timer ends
    userId.value = localStorage.getItem('user_id');
    gravitecStore.sendAbandonedCartNotification('email', tour.value, userId.value);
  }
});
    

function imprimedata(){
    //console.log('datos de formulario:',passengers.value);
}
    
const continueTest = async () => {
  const tourDetails = {
    tour_id: tour.value.tour_id,
    tour_name: tour.value.tour_name,
    tour_length_days: tour.value.tour_length_days,
    ratings: tour.value.ratings,
    reviews_count: tour.value.reviews_count,
    start_city: tour.value.start_city.city_name,
    end_city: tour.value.end_city.city_name,
    current_url: `${config.public.FRONTEND_URL}/tour?tourId=${tour.value.tour_id}`,
  }

  const enquieryData = JSON.stringify({
    departure_date: tour.value.departure.date,
    name: passengers.value[0].fields.first_name, 
    last_name: passengers.value[0].fields.last_name, 
    email: passengers.value[0].fields.email, 
    phone: passengers.value[0].fields.phone_number, 
    travelers: passengers.value.length, 
    tour_details: tourDetails, 
  });

  await useFetch(`${config.public.BACKEND_URL}/api/add-enquiery-test`, {
    method: 'POST',
    body: enquieryData,
    headers:{
        'Content-Type': 'application/json'
    }
  });
  localStorage.setItem('user_test_name', passengers.value[0].fields.first_name);
  const finalUrl = `${config.public.FRONTEND_URL}/confirmation/confirmation-temp`;
  window.open(finalUrl, '_self');
}

const validateAndContinue = () => {
  // Encontramos el LeadTraveler
  try {
    const duffelOffer = duffelOfferSelected.value;
    console.log("duffelOfferId on validation",duffelOfferSelected.value.id);
    const duffelPassengers = flightPassengersComputed.value;
    //console.log("duffelPassengers",duffelPassengers);
    const leadTraveler = passengers.value[0];
    //console.log('contenido de leadTraveler:',passengers.value);
    if (leadTraveler) {
      // Verificamos si tiene un tipo de facturación seleccionado
      if (leadTraveler.fields?.account === 'personal') {
        if (leadTraveler.fields?.personal_billingStatus === 2) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please complete all personal billing fields.',
            life: 3000
          });
          return; // Detener el flujo de pago si los datos están incompletos
        }
      } else if (leadTraveler.fields?.account === 'company') {
        if (leadTraveler.fields?.company_billingStatus === 2) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please complete all company billing fields.',
            life: 3000
          });
          return; // Detener el flujo de pago si los datos están incompletos
        }
      }
    }
  }
  catch (error) {
    console.error('Error al validar los campos de facturación:', error);

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: "Please review the form and try again.",
      life: 3000
    });
    // if (error.response) {
    //   const { data } = error.response;
    //   if (data.error) {
    //     //console.log("Error:", data.error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error',
    //       text: data.error,
    //     });
    //   }
    // }
    return;
  }

  // Si la validación pasa, continuamos con el flujo de pago
  //console.log("Validación completa. Continuando con el flujo...");
  handlePayNow(); 
};

function isDeparturesStoredFresh() {
  if (!process.client) return false
  const raw = localStorage.getItem('departuresStored')
  if (!raw) return false
  try {
    const parsed = JSON.parse(raw)
    const ts = parsed?.savedAt ?? Number(localStorage.getItem('departuresStored_ts'))
    if (!ts) return false
    return (Date.now() - Number(ts)) < EXPIRE_MS
  } catch (e) {
    return false
  }
}   
    
async function handleQueryParams() {
  const params = new URLSearchParams(window.location.search);
  before.value = params.get('before') ?? 1;
  globalFilters.value.before = before.value;    
  after.value = params.get('after') ?? 1;   
  globalFilters.value.after = after.value;  
  adultsCountURL.value = getAdultsCount(params, "adultsCount");
  childrenCount.value = params.get('childrenCount') ?? 0;   
  infantsCount.value = params.get('infantsCount') ?? 0;
  datesRange.value = getDatesRange(params, 'datesRange');
  duffelRequestIdURL.value = departuresStored?.value?.value?.duffel?.requestId ?? null;
  console.log("duffelRequestIdURL.value",duffelRequestIdURL.value);	
  departure_fly_from.value = getDepartureFlyFrom(params, 'departure_fly_from');
  tourIdURL.value = getTourId(params, "tourId");    
  tour.value = await fetchTour(tourIdURL.value);
  await updateTourDetailSearchBar({
    departure_fly_from: departure_fly_from.value,
    adultsCountURL: adultsCountURL.value,
    childrenCount: childrenCount.value,
    infantsCount: infantsCount.value,
    tour: tour.value,
    datesRange: datesRange.value,
  });       
  console.log("globalDepartures.value",globalDepartures.value);	
  const departureId = getDepartureId(params, "departureId");
  if(departureId){
        departureIdURL.value = departureId;
  }else if (globalDepartures?.value?.[0].id){      
        departureIdURL.value = globalDepartures.value[0].id;
        //console.log("departureId from api",departureIdURL.value);
  }else{
        departureIdURL.value = 0;
        console.log("no departure found");
	    return 
  }
  const EXPIRE_MS = 10 * 60 * 1000 // 10 minutes
  const notExpired = isDeparturesStoredFresh(); 
  //console.log("notExpired",notExpired);   
  const departure = await fetchDeparture(tourIdURL.value,departureIdURL.value );
  console.log("just departure",departure);    
  tour.value.departure = departure;
  tour_length.value = tour.value.tourLengthDays;
  //console.log("tour_length.value",tour_length.value); 
  tour_start_city.value = tour.value.start_city;
  //console.log("tour_start_city.value",tour_start_city.value);
  tour_end_city.value = tour.value.end_city;
  //console.log("tour_end_city.value",tour_end_city.value);
  departureIdURL.value = tour?.value?.departure?.id

  const result = await handleDuffelRequest(duffelRequestIdURL?.value,tour?.value,departure,before.value,after.value);
    //console.log("result",result);
    duffelRequest.value = {
      ...result,
      offersMeta: {
        ...(result.offersMeta || {}),
        current_page: 1
      }
    };
  duffelOfferIdURL.value = result.offers[0].id;
  duffelOfferSelected.value = await handleDufferOffer(duffelOfferIdURL.value);
  //console.log("duffelOfferSelected.value.owner.id", duffelOfferSelected.value.owner.id);
  const ownerId = duffelOfferSelected.value.owner.id;   
  await getAirline(ownerId);    
  isPageLoading.value = false;

  console.info({
    tour: tour.value,
    duffelRequest: duffelRequest.value,
    duffelOfferSelected: duffelOfferSelected.value
  });
    //const storedDepartures = localStorage.getItem("departuresStored");
  const selectedDepartureId = departure.id;
  
  localSearchBar.value.departuresDates = globalDepartures.value ? formatStoreDeparturesDates.value : [];
  localSearchBar.value.selectedDepartureId = localSearchBar.value.departuresDates.find(
    dep => dep.value === selectedDepartureId
  ) || null;
  oldSelectedDeparture.value = selectedDepartureId;
  //console.log("LOCAL SEARCH BAR", localSearchBar.value);
  //console.log("selectedDepartureId", selectedDepartureId);    
}   
    
async function handleOnMounted() {
  await handleQueryParams();
}
    
const RELOAD_AFTER_MS = ref(20 * 60 * 1000);
    
let reloadTimer = ref();    
    
const moreOffersStored = ref(); 
    
onMounted(() => {
    departuresStored.value = JSON.parse(localStorage.getItem('departuresStored') || 'null');
    if(departuresStored.value){
        //console.log("departuresStored.value",departuresStored.value.value);
        moreOffersStored.value = departuresStored.value.value.departures[0].duffel;
        //console.log("moreDeparturesStored.value",moreOffersStored.value);
    }   
    reloadTimer.value = setTimeout(() => {
    window.location.reload()
    }, RELOAD_AFTER_MS.value)
    nextTick(handleOnMounted);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const timer = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--;
        } else {
          clearInterval(timer);
          goTourPage(); // Go to tour page to look for availability
        }
    }, 1000);   
    window.addEventListener('resize', checkMobile);
});

    
    
onBeforeUnmount(() => {
  if (reloadTimer.value) clearTimeout(reloadTimer.value)
}); 
</script>
<style scoped>
.p-accordion-content{
    padding: 0.25rem !important;
    }
.countdown {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fffa;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  color: #333;
  z-index: 9999;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
a {
  color: inherit;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
}

.font-canaro {
  font-family: 'Canaro';
}

.font-canaro-book {
  font-family: 'Canaro Book';
}

.font-interstate {
  font-family: 'Interstate' !important;
}

.text-green-vibe {
  color: #82cf45;
}

.back-green-vibe {
  background-color: #82cf45;
}

.text-orange-vibe {
  color: #ff6c0e;
}

.back-orange-vibe {
  background-color: #ff6c0e;
}

/* Shapes */

.green-dot-sm {
  height: 0.8rem;
  background-color: #82cf45;
  display: block;
  width: 0.8rem;
  border-radius: 50%;
}

.gray-dot-xs {
  height: 0.4rem;
  background-color: var(--gray-700);
  display: block;
  width: 0.4rem;
  border-radius: 50%;
}

.h-02rem {
  height: 0.2rem;
}

.interstate {
  font-family: 'Interstate';
}

.green-vibe {
  color: #82cf45;
}

.green-vibe-back {
  background-color: #82cf45;
}

.light-green-vibe-back {
  background-color: #ecf8e2;
}

.orange-vibe {
  color: #ff6c0e;
}

.timestamps-line {
  float: left;
  width: 10px!important;
  position: absolute!important;
}

.timestamps-line img {
  height: 4.7rem;
  margin-top: 0.5rem;
  position: relative;
  left: 4.8rem;
}

.hr-lined {
  border-top: 1.2px dashed var(--gray-400);
  border-bottom: none;
  border-right: none;
  border-left: none;
}

.pi-arrow-right:before {
  font-weight: 600;
  font-size: small;
}

.circle-button {
  padding: 0rem 0.25rem;
  background-color: var(--gray-300);
  border-radius: 50%;
  margin: 0 0.2rem;
}

div.col-6.flex.align-items-center {
  padding: 4px;
}

@media only screen and (max-width: 767px) {

  .line-flights {
    border-left: 2px solid var(--gray-500);
    height: 14.5rem;
    float: left;
    left: 5.8rem;
    margin-top: 1.6rem;
    z-index: -1;
  }
    #breadcrumb-container{
        padding:0 2%;
        margin-top: 6em;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {

  .line-flights {
    border-left: 2px solid var(--gray-500);
    height: 14.5rem;
    float: left;
    left: 6.2rem;
    margin-top: 1.6rem;
    z-index: -1;
  }
    #breadcrumb-container{padding:0 3%}
}

@media only screen and (min-width: 1200px) {
  .line-flights {
    border-left: 2px solid var(--gray-500);
    height: 14.5rem;
    float: left;
    left: 6.25rem;
    margin-top: 1.6rem;
    z-index: -1;
  }
 #breadcrumb-container{padding:0 5%}    
}

.pay_now_padding {
  padding: 0.7rem 4rem;
}

.flights_big_title {
  color: #333;
  font-family: Canaro;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  position: relative;
}

.display_none {
  display: none !important;
}   
.discount-button{
    color: #FF0E0E;
    margin-top: 4px;
    padding: 4.5958px 17.979px;
    border: 1.2px dashed #FF0E0E;
    border-radius: 12px;
}   
.p-accordion-header{
    
}
.p-accordion-header a {
    padding: 10px !important;
}   
.inclusions-desc{
    padding-left:35px !important;
}
</style>