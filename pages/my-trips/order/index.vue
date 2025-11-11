<script>
import FlightOrder from "~/components/BookPage/FlightOrder.vue";
import TravelerDetails from "~/components/TravelerDetails.vue";
import AdventureSummary from "~/components/AdventureSummary.vue";
import Orders from "~/components/Orders.vue";

export default {
  components: {
    FlightOrder,
    TravelerDetails,
    AdventureSummary,
  },
};
</script>

<template>
  <div class="overflow-hidden mb-8 main-spacing">
    <div class="grid">
      
      <div class="col-12 lg:col-9">
        <div class="card">
          <Breadcrumb :model="items">
            <template #item="{ item, props }">
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
              >
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="[item.icon, 'text-color']" />
                  <span class="text-green-vibe font-semibold">{{
                    item.label
                  }}</span>
                </a>
              </router-link>
              <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
              >
                <span class="text-color font-semibold">{{ item.label }}</span>
              </a>
            </template>
          </Breadcrumb>
        </div>
        <div class="order-header flex flex-column align-items-start mb-4">
          <h1 class="canaro-font font-semibold ml-3 tour-title-singleline">
            <span class="text-green-vibe font-italic" v-if="tour">{{ tour.tour_name }}</span>
          </h1>
          <div
            class="px-4 py-1 border-round-3xl mt-2 booking-badge"
            style="background-color: #f3faed"
          >
            <span style="color: #82cf35">
              <i class="pi pi-check-circle mr-2" style="color: #82cf35"></i>
              Booking confirmed
            </span>
          </div>
        </div>
        <TabView>
          <TabPanel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar>
<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style="fill:gray;" d="M20.5046 4.49999L5.23668 4.52199L5.90876 4.93699L4.80863 2.737C4.74884 2.61738 4.65815 2.51592 4.54596 2.44313C4.43377 2.37034 4.30416 2.32886 4.17055 2.323L1.87726 2.223C0.817134 2.228 -0.00596814 3.06 3.26015e-05 4.08299C0.00203285 4.32599 0.0510389 4.56699 0.146051 4.79199L2.21831 9.47199C2.44623 9.99937 2.82336 10.4486 3.3033 10.7645C3.78323 11.0804 4.34505 11.2492 4.91964 11.25H8.96314L8.28706 10.175L5.80275 15.343C5.66124 15.6229 5.59402 15.9344 5.60751 16.2478C5.621 16.5611 5.71476 16.8657 5.8798 17.1324C6.04484 17.3991 6.27563 17.619 6.55004 17.7709C6.82445 17.9228 7.13329 18.0017 7.44695 18H9.54621C9.81695 17.9999 10.0844 17.9403 10.3296 17.8256C10.5748 17.7109 10.7918 17.5437 10.9654 17.336L16.131 10.973L15.549 11.25H20.5056C22.3258 11.34 23.905 9.90899 23.996 8.05199L24 7.91799C23.9991 7.46749 23.9093 7.02159 23.7358 6.60583C23.5624 6.19006 23.3086 5.81258 22.989 5.49501C22.6694 5.17743 22.2904 4.926 21.8735 4.75509C21.4566 4.58418 21.0101 4.49715 20.5596 4.49899L20.4856 4.49999H20.5046ZM20.5246 5.99999H20.5666C21.0767 5.9976 21.567 6.19788 21.9295 6.55679C22.292 6.91571 22.4972 7.40388 22.4998 7.91399L22.4978 7.97899C22.4735 8.47319 22.2538 8.9375 21.8872 9.2698C21.5205 9.6021 21.0368 9.77518 20.5426 9.75099L15.549 9.74999C15.4374 9.74999 15.3273 9.77486 15.2266 9.82278C15.1259 9.87069 15.0372 9.94046 14.9669 10.027L9.80624 16.382C9.77379 16.419 9.73381 16.4487 9.68897 16.469C9.64413 16.4894 9.59546 16.4999 9.54621 16.5H7.44595C7.3882 16.5002 7.33136 16.4856 7.28092 16.4574C7.23048 16.4293 7.18814 16.3887 7.15799 16.3394C7.12783 16.2902 7.11088 16.234 7.10877 16.1763C7.10665 16.1186 7.11945 16.0613 7.14592 16.01L9.63922 10.825C9.69421 10.7106 9.71928 10.5842 9.71211 10.4576C9.70493 10.3309 9.66574 10.2081 9.5982 10.1007C9.53065 9.99334 9.43696 9.90483 9.3259 9.84349C9.21484 9.78214 9.09002 9.74997 8.96314 9.74999H4.92164C4.63874 9.74912 4.36226 9.66554 4.12627 9.50954C3.89028 9.35353 3.70508 9.13192 3.59348 8.87199L1.52322 4.19599C1.50319 4.14312 1.49626 4.08617 1.50304 4.03004C1.50982 3.9739 1.5301 3.92024 1.56214 3.87366C1.59419 3.82707 1.63705 3.78893 1.68705 3.76252C1.73705 3.73611 1.79271 3.7222 1.84926 3.72199L4.10454 3.82199L3.46646 3.407L4.5666 5.60699C4.62893 5.73183 4.72485 5.8368 4.84358 5.91012C4.96231 5.98343 5.09914 6.02217 5.23868 6.02199L20.5066 5.99999H20.5246ZM16.3221 4.75999L13.3297 0.739999C13.1572 0.510159 12.9335 0.323632 12.6764 0.195191C12.4194 0.0667503 12.1359 -7.75601e-05 11.8485 6.75522e-08H9.78124C9.46665 0.000569769 9.15739 0.0813352 8.8827 0.234664C8.60802 0.387993 8.37696 0.608821 8.21138 0.87628C8.0458 1.14374 7.95116 1.449 7.9364 1.76321C7.92164 2.07741 7.98725 2.3902 8.12704 2.672L9.56621 5.58199C9.65837 5.75312 9.81337 5.88179 9.99855 5.94089C10.1837 5.99999 10.3846 5.98491 10.5589 5.89882C10.7332 5.81273 10.8672 5.66236 10.9328 5.47939C10.9983 5.29643 10.9903 5.09516 10.9104 4.91799L9.4702 2.007C9.44374 1.95367 9.43128 1.89448 9.43399 1.83501C9.4367 1.77554 9.45449 1.71773 9.4857 1.66703C9.5169 1.61633 9.56049 1.5744 9.61237 1.54518C9.66424 1.51596 9.7227 1.50041 9.78224 1.5H11.8485C11.9027 1.50015 11.9561 1.51288 12.0045 1.53717C12.0529 1.56147 12.095 1.59666 12.1275 1.64L15.1179 5.65699C15.1767 5.73598 15.2506 5.80261 15.3352 5.85307C15.4197 5.90354 15.5135 5.93685 15.6109 5.9511C15.7084 5.96535 15.8077 5.96027 15.9032 5.93615C15.9987 5.91202 16.0885 5.86932 16.1675 5.81049C16.2465 5.75166 16.3132 5.67785 16.3636 5.59326C16.4141 5.50868 16.4474 5.41499 16.4617 5.31753C16.4759 5.22008 16.4708 5.12077 16.4467 5.02528C16.4226 4.92979 16.3799 4.83998 16.3211 4.76099L16.3221 4.75999Z" fill="#505050"/>
</svg>

            </Avatar> 
          <span class="font-bold white-space-nowrap">Flights</span>
        </div>
          </template>  
            <section id="flightsSummary">
              <template v-if="isDuffelOrderSelectedLoading">
                <Skeleton height="15rem" class="mb-3"></Skeleton>
              </template>
              <template v-else>
                <div class="flex justify-content-start flex-wrap mt-4 mb-2">
                  <div class="font-semibold">
                    <i class="pi pi-clock pr-1" style="color: #82cf35"></i>
                    <span>{{
                      formatOutboundDate(
                        duffelOrderSelected.slices[0].segments[0].departing_at
                      )
                    }}</span>
                    -
                    <span>
                      {{
                        formatOutboundDate(
                          duffelOrderSelected.slices[
                            duffelOrderSelected.slices.length - 1
                          ].segments[
                            duffelOrderSelected.slices[
                              duffelOrderSelected.slices.length - 1
                            ].segments.length - 1
                          ].arriving_at
                        )
                      }}
                    </span>
                  </div>
                  <div class="font-semibold ml-4" v-if="passengers">
                    <i class="pi pi-user mr-2" style="color: #82cf35"></i
                    >{{ passengers }} passengers
                  </div>
                </div>
              </template>
              <hr style="color: var(--bluegray-200); border-top: 5px" />
              <h2
                class="text-3xl font-bold mt-1 mb-4 flex align-items-center justify-content-start"
              >
                <span class="green-dot-sm mr-2"></span>Flights summary
              </h2>
              <template v-if="isDuffelOrderSelectedLoading">
                <Skeleton height="15rem" class="mb-3"></Skeleton>
              </template>
              <template v-else>
                <FlightOrder :duffelOrderSelected="duffelOrderSelected" />
              </template>
              <div class="my-3 md:flex">
                <div class="">
                  NOTE: Save your <em class="font-semibold">e-ticket</em> and
                  keep it with you for the duration of your journey. There, you
                  can find the airline's booking reference (sometimes known as a
                  record locator or PNR) that you can use on the airline's
                  website to check in online.
                </div>
                <div class="mt-3 md:mt-0 md:w-6 md:ml-2">
                  <a class="text_decoration_none">
                    <button
                      class="btn-cover py-3 download_btn"
                      @click="getPdfOrder"
                    >
                      <i class="pi pi-download pr-2"></i>Download
                    </button>
                  </a>
                </div>
              </div>
              <hr style="color: var(--bluegray-200); border-top: 5px" />
              <h3 class="text-2xl">Baggage and seating</h3>
              <div class="my-4" style="border-style: ridge; border-radius: 8px">
                <div class="flex flex-column gap-4">
                  <div>
                    <div>
                      <div
                        class="row px-3"
                      >
                        <div class="col-6 lg:col-2">
                          <img
                            src="/images/seat-1.svg"
                            width="100"
                            height="70"
                            style="height: 100%"
                          />
                        </div>
                        <div class="col-6 lg:col-8">
                          <div class="d-flex flex-column font-interstate">
                            <p class="text-xl font-semibold my-0">Baggage</p>
                            <p class="font-semibold">
                              {{ baggageCarryOnAllowedComputed }} x Carry On item 2 kg <span class="text-green-vibe font-bold">INCLUDED</span>
                            </p>
                          </div>
                          <div class="d-flex flex-column font-interstate">
                            <p class="font-semibold">
                              {{ baggageCheckedAllowedComputed }} x Cabin item <span class="text-green-vibe font-bold">INCLUDED</span>
                            </p>
                          </div>
                        </div>
                        <Button
                          v-if="params_baggage.baggage_id"
                          label="Buy Extra Baggage"
                          severity="warning"
                          @click="visible_baggage = true"
                        />
                      </div>
                      <div
                        class="back-green-vibe-light font-semibold px-3"
                        style="display: flex; align-items: center"
                      >
                        <!-- <img src="" width="20" height="20" style="margin-right: 5px;" /> -->
                        <svg
													width="15"
													height="15"
													style="color: #82cf35; min-width: 40px; min-height: 40px; margin-right: 12px;"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
                          <path
                            fill-rule="evenodd"
                            d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p class="text-justify font-interstate" style="flex:1">
                          NOTE: You can order extra luggage directly on the
                          airline's website (you can find the booking reference
                          in your e-ticket). If you encounter any difficulties,
                          feel free to
                          <a href="/contact" class="text-green-vibe font-interstate" target="_blank"><u>reach out to us.</u></a>
                        </p>
                      </div>
                    </div>

                    <div>
                      <div class="row px-3 mt-3 font-interstate">
                        <div
                          class="col-6 lg:col-2"
                        >
                          <img
                            src="/images/seat-2.svg"
                            width="100"
                            height="70"
                            style="height: 100%"
                          />
                        </div>
                        <div class="col-6 lg:col-8">
                          <div class="flex-column">
                            <p class="text-xl font-semibold my-0">
                              Seat selection
                            </p>
                            <div style="display: flex; width: 500px; gap: 5px">
                              <p><b>Random Seats</b><br><span class="text-green-vibe font-bold">INCLUDED</span></p>
                            </div>
                          </div>
                        </div>
                        <!--  <Button label="Buy Extra Baggage" severity="warning"/> -->
                      </div>
                      <div
												class="back-green-vibe-light font-semibold px-3"
												style="display:flex;align-items:center;"
											>
												<svg
													width="15"
													height="15"
													style="color: #82cf35; min-width: 40px; min-height: 40px; margin-right: 12px;"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														fill-rule="evenodd"
														d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
														clip-rule="evenodd"
													/>
												</svg>
												<p class="text-justify font-interstate" style="flex:1;">
													NOTE: You can select seats directly on the airline's
													website (you can find the booking reference in your
													e-ticket) or when checking in at the airport.
													Selecting specific seats is often subject to an extra
													fee, which varies by airline. You might also be able
													to pick a seat during online check-in. If you want to
													sit with your fellow travelers, we advise selecting
													your seats in advance.
												</p>
											</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-4 font-interstate">
                <h3 class="text-2xl ">Fare Conditions</h3>
                <div class="card p-3" v-if="duffelOrderSelected != null && !isDuffelOrderSelectedLoading">
									<div class="flex" v-if="duffelOrderSelected?.slices[0]?.conditions?.fare_brand_name != null">
										<strong>Class:</strong> 
										<div class="text-500">	
										{{duffelOrderSelected.slices[0].conditions.fare_brand_name}}		
										</div>
									</div>
									<div class="flex" v-if="duffelOrderSelected?.slices[0]?.conditions?.advance_seat_selection != null">
										<strong>Refundability:</strong> 
										<div class="text-500" >	
										{{duffelOrderSelected.slices[0].conditions.advance_seat_selection}}		
										</div>
									</div>
									<div class="flex" v-if="duffelOrderSelected.conditions?.change_before_departure?.allowed == true">	
										<strong>Changes:</strong> 
										<div class="text-500" >	
										{{duffelOrderSelected.slices[0].conditions.change_before_departure.penalty_currency}}		
										{{duffelOrderSelected.slices[0].conditions.change_before_departure.penalty_amount}} USD Fee applies
										</div>
									</div>
									<div class="flex" v-if="duffelOrderSelected?.slices[0]?.conditions?.advance_seat_selection != null">
										<strong>Seat Selection:</strong> 
										<div class="text-500" >	
										{{duffelOrderSelected.slices[0].conditions.advance_seat_selection}}		
										</div>
									</div>
									<div class="flex" v-if="duffelOrderSelected?.slices[0]?.conditions?.priority_boarding != null">
										<strong>Priority Boarding:</strong>
										<div class="text-500" >	
										{{duffelOrderSelected.slices[0].conditions.priority_boarding}}		
										</div>
									</div>
									<div class="flex" v-if="duffelOrderSelected?.slices[0]?.conditions?.priority_check_in != null">
										<strong>Priority Check-in:</strong>
										<div class="text-500" >	
										{{duffelOrderSelected.slices[0].conditions.priority_check_in}}		
										</div>
									</div>	
                </div>
								<div v-else>
									<Skeleton height="9rem" class="mb-3"></Skeleton>
								</div>
              </div>
              <hr style="color: var(--bluegray-200); border-top: 5px" />
              <div class="my-4">
                <h3 class="text-2xl">Extra services</h3>
                <div class="interstate-font font-light text-lg">
                  Adding these services to your trip now can save you money
                  compared to purchasing them later or in the destination.
                </div>
                <div class="service-container my-4">
                  <div class="service-card mt-5">
                    <img
                      class="h-6rem flex mx-auto"
                      src="~/assets/icons/order-accommodation.svg"
                      alt=""
                    />
                    <p
                      class="text-center text-xl font-semibold my-3 canaro-font"
                    >
                      Accommodation
                    </p>
                    <a class="text_decoration_none" href="https://trip.tp.st/CGLH4d7u">
                      <button class="btn-cover py-3 download_btn mx-5">
                        Find A Room <i class="pi pi-external-link ml-2"></i>
                      </button>
                    </a>
                  </div>
                  <div class="service-card mt-5">
                    <img
                      class="h-6rem flex mx-auto"
                      src="~/assets/icons/order-lock.svg"
                      alt=""
                    />
                    <p
                      class="text-center text-xl font-semibold my-3 canaro-font"
                    >
                      Insurance
                    </p>
                    <a class="text_decoration_none" href="https://visitorscoverage.com/?affid=ffe108ac09ad6&sub_id=b8f7c599386143409bc43f56a-436729">
                      <button class="btn-cover py-3 download_btn mx-5">
                        Manage Insurance
                        <i class="pi pi-external-link ml-2"></i>
                      </button>
                    </a>
                  </div>
                  <div class="service-card mt-5">
                    <img
                      class="h-6rem flex mx-auto"
                      src="~/assets/icons/order-flights.svg"
                      alt=""
                    />
                    <p
                      class="text-center text-xl font-semibold my-3 canaro-font"
                    >
                      Flights
                    </p>
                    <a class="text_decoration_none" href="https://kiwi.tp.st/puDUxzYH">
                      <button class="btn-cover py-3 download_btn mx-5">
                        View Flights <i class="pi pi-external-link ml-2"></i>
                      </button>
                    </a>
                  </div>
                  <div class="service-card mt-5">
                    <img
                      class="h-6rem flex mx-auto"
                      src="~/assets/icons/order-activities.svg"
                      alt=""
                    />
                    <p
                      class="text-center text-xl font-semibold my-3 canaro-font"
                    >
                      Activities
                    </p>
                    <a class="text_decoration_none" href="https://www.viator.com/?pid=P00154312&uid=U00262192&mcid=58086&currency=EUR">
                      <button class="btn-cover py-3 download_btn mx-5">
                        Find Activities <i class="pi pi-external-link ml-2"></i>
                      </button>
                    </a>
                  </div>
                  <div class="service-card mt-5">
                    <img
                      class="h-6rem flex mx-auto"
                      src="~/assets/icons/order-airport-transfer.svg"
                      alt=""
                    />
                    <p
                      class="text-center text-xl font-semibold my-3 canaro-font"
                    >
                      Airport Transfer
                    </p>
                    <a class="text_decoration_none" href="https://www.welcomepickups.com/mexico-city/airport-transfer-book/?tap_a=134179-01b992&tap_s=4069286-0e3fe9">
                      <button class="btn-cover py-3 download_btn mx-5">
                        Buy Transfer <i class="pi pi-external-link ml-2"></i>
                      </button>
                    </a>
                  </div>
                  <div class="service-card mt-5">
                    <img
                      class="h-6rem flex mx-auto"
                      src="~/assets/icons/order-airport-parking.svg"
                      alt=""
                    />
                    <p
                      class="text-center text-xl font-semibold my-3 canaro-font"
                    >
                      Airport Parking
                    </p>
                    <a class="text_decoration_none">
                      <button class="btn-cover py-3 download_btn mx-5">
                        Buy Parking <i class="pi pi-external-link ml-2"></i>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <hr style="color: var(--bluegray-200); border-top: 5px" />
          </TabPanel>
          <TabPanel>
          <template #header>
          <div class="flex align-items-center gap-2">
          <Avatar>
<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style="fill:gray;" d="M2.29167 9H17.7083C18.2833 9 18.75 9.46667 18.75 10.0417V14L19.375 13.375H0.625L1.25 14V10.0417C1.25 9.46667 1.71667 9 2.29167 9ZM2.29167 7.75C1.68388 7.75 1.10098 7.99144 0.671214 8.42121C0.241443 8.85098 0 9.43388 0 10.0417L0 14C0 14.345 0.28 14.625 0.625 14.625H19.375C19.5408 14.625 19.6997 14.5592 19.8169 14.4419C19.9342 14.3247 20 14.1658 20 14V10.0417C20 9.43388 19.7586 8.85098 19.3288 8.42121C18.899 7.99144 18.3161 7.75 17.7083 7.75H2.29167ZM0 14V16.5C0 16.6658 0.065848 16.8247 0.183058 16.9419C0.300269 17.0592 0.45924 17.125 0.625 17.125C0.79076 17.125 0.949731 17.0592 1.06694 16.9419C1.18415 16.8247 1.25 16.6658 1.25 16.5V14C1.25 13.8342 1.18415 13.6753 1.06694 13.5581C0.949731 13.4408 0.79076 13.375 0.625 13.375C0.45924 13.375 0.300269 13.4408 0.183058 13.5581C0.065848 13.6753 0 13.8342 0 14ZM18.75 14V16.5C18.75 16.6658 18.8158 16.8247 18.9331 16.9419C19.0503 17.0592 19.2092 17.125 19.375 17.125C19.5408 17.125 19.6997 17.0592 19.8169 16.9419C19.9342 16.8247 20 16.6658 20 16.5V14C20 13.8342 19.9342 13.6753 19.8169 13.5581C19.6997 13.4408 19.5408 13.375 19.375 13.375C19.2092 13.375 19.0503 13.4408 18.9331 13.5581C18.8158 13.6753 18.75 13.8342 18.75 14ZM18.125 8.375V2.75C18.125 2.25272 17.9275 1.77581 17.5758 1.42417C17.2242 1.07254 16.7473 0.875 16.25 0.875H3.75C3.25272 0.875 2.77581 1.07254 2.42417 1.42417C2.07254 1.77581 1.875 2.25272 1.875 2.75V8.375C1.875 8.54076 1.94085 8.69973 2.05806 8.81694C2.17527 8.93415 2.33424 9 2.5 9C2.66576 9 2.82473 8.93415 2.94194 8.81694C3.05915 8.69973 3.125 8.54076 3.125 8.375V2.75C3.125 2.58424 3.19085 2.42527 3.30806 2.30806C3.42527 2.19085 3.58424 2.125 3.75 2.125H16.25C16.4158 2.125 16.5747 2.19085 16.6919 2.30806C16.8092 2.42527 16.875 2.58424 16.875 2.75V8.375C16.875 8.54076 16.9408 8.69973 17.0581 8.81694C17.1753 8.93415 17.3342 9 17.5 9C17.6658 9 17.8247 8.93415 17.9419 8.81694C18.0592 8.69973 18.125 8.54076 18.125 8.375ZM7.08333 5.875H12.9167C12.9719 5.875 13.0249 5.89695 13.064 5.93602C13.1031 5.97509 13.125 6.02808 13.125 6.08333V8.375L13.75 7.75H6.25L6.875 8.375V6.08333C6.875 6.02808 6.89695 5.97509 6.93602 5.93602C6.97509 5.89695 7.02808 5.875 7.08333 5.875ZM7.08333 4.625C6.69656 4.625 6.32563 4.77865 6.05214 5.05214C5.77865 5.32563 5.625 5.69656 5.625 6.08333V8.375C5.625 8.72 5.905 9 6.25 9H13.75C13.9158 9 14.0747 8.93415 14.1919 8.81694C14.3092 8.69973 14.375 8.54076 14.375 8.375V6.08333C14.375 5.69656 14.2214 5.32563 13.9479 5.05214C13.6744 4.77865 13.3034 4.625 12.9167 4.625H7.08333Z" fill="#505050"/>
</svg>


            </Avatar> 
          <span class="font-bold white-space-nowrap">Adventures</span>
        </div>
      </template> 
            <section id="adventureSummary">
			<template v-if="isDuffelOrderSelectedLoading">
                <Skeleton height="15rem" class="mb-3"></Skeleton>
              </template>
              <template v-else>
                <div class="flex justify-content-start flex-wrap mt-4 mb-2">
                  <div class="font-semibold">
                    <i class="pi pi-clock pr-1" style="color: #82cf35"></i>
                    <span>{{
                      formatOutboundDate(
                        duffelOrderSelected.slices[0].segments[0].departing_at
                      )
                    }}</span>
                    -
                    <span>
                      {{
                        formatOutboundDate(
                          duffelOrderSelected.slices[
                            duffelOrderSelected.slices.length - 1
                          ].segments[
                            duffelOrderSelected.slices[
                              duffelOrderSelected.slices.length - 1
                            ].segments.length - 1
                          ].arriving_at
                        )
                      }}
                    </span>
                  </div>
                  <div class="font-semibold ml-4" v-if="passengers">
                    <i class="pi pi-user mr-2" style="color: #82cf35"></i
                    >{{ passengers }} passengers
                  </div>
                </div>
              </template>		
              <h2
                class="text-3xl font-bold mt-1 mb-4 flex align-items-center justify-content-start"
              >
                <span class="green-dot-sm mr-2"></span>Adventure summary
              </h2>
              <div>
                <AdventureSummary
                  v-if="tour && images.length > 0"
                  :tour="tour"
                  :images="images"
                />
              </div>
            </section>
          </TabPanel>
          <TabPanel>
                <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar>
<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style="fill:gray;" fill-rule="evenodd" clip-rule="evenodd" d="M2.66237 3.81524C5.05017 0.81095 7.80407 -0.823395 9.87186 1.85C10.4142 1.87938 10.8983 2.08503 11.3051 2.52106C12.1566 3.43178 12.2854 5.13725 11.899 6.49328V7.67303C12.162 7.8694 12.3302 8.23895 12.4088 8.66106C12.459 8.9332 12.4712 9.23161 12.4481 9.51766C12.4237 9.81299 12.36 10.0975 12.2569 10.3279C12.1092 10.6603 11.8841 10.8938 11.579 10.9448C11.2807 11.3066 10.9892 11.6932 10.7275 12.0674C10.4414 12.4771 10.1959 12.8652 10.0278 13.1822C9.89763 13.428 9.9383 13.5888 9.98576 13.7713C10.0088 13.8625 10.0332 13.9568 10.0508 14.062C10.5729 14.1919 11.0461 14.2924 11.4705 14.3836C14.1647 14.9588 15 15.1366 15 19.132C15 19.3361 14.8549 19.5 14.6773 19.5H7.99932H1.32271C1.14373 19.5 1 19.3346 1 19.132C1 15.1366 1.83525 14.9572 4.52949 14.382C4.95661 14.2908 5.43254 14.1888 5.95864 14.0589C5.97627 13.98 5.99932 13.9058 6.02237 13.8316C6.07661 13.6553 6.13085 13.4791 5.9722 13.1822C5.80407 12.8652 5.55864 12.4771 5.27254 12.0674C5.0122 11.6932 4.71932 11.3066 4.42102 10.9448C4.11593 10.8938 3.89085 10.6588 3.74305 10.3279C3.64 10.0959 3.57627 9.81144 3.55186 9.51766C3.52746 9.23161 3.54102 8.9332 3.59119 8.66106C3.66847 8.24049 3.83525 7.87404 4.09559 7.67613L3.74576 7.43956C3.6522 6.25671 3.92475 4.20334 2.66237 3.81524ZM11.2536 6.17476C11.1953 5.6877 11.0841 5.2795 10.9254 4.93779C10.722 4.64865 10.4264 4.4028 10.0468 4.08582L10.0034 4.05026C9.92339 3.98223 9.84203 3.91883 9.76068 3.86008C8.48339 4.80481 7.86508 4.5837 6.83458 4.77698C5.90034 4.9517 5.14237 5.34753 4.74508 6.07116C4.74508 6.08971 4.74508 6.10982 4.74508 6.12837V7.90651C4.74508 8.08123 4.63797 8.22812 4.49424 8.26523C4.36407 8.31007 4.27051 8.53273 4.22034 8.81105C4.18373 9.0136 4.17424 9.23625 4.19186 9.44963C4.20949 9.65373 4.25017 9.84546 4.31797 9.99544C4.37763 10.13 4.45492 10.2212 4.54441 10.2227H4.56339C4.65695 10.2212 4.74237 10.2645 4.80203 10.3372C5.14373 10.7469 5.48136 11.1891 5.77695 11.6128C6.0739 12.038 6.33424 12.4524 6.52136 12.8049C6.83729 13.3987 6.73288 13.7373 6.62983 14.0759C6.6 14.1733 6.57017 14.2723 6.57017 14.365C6.57017 14.5506 6.44949 14.7037 6.29356 14.7299C5.67119 14.8892 5.12881 15.0052 4.64881 15.1072C2.44271 15.5757 1.70237 15.735 1.64949 18.764H7.99932H14.3492C14.2963 15.735 13.5559 15.5757 11.3512 15.1041C10.8658 15.0005 10.3153 14.883 9.68203 14.7207C9.53288 14.682 9.42983 14.5305 9.43119 14.3619H9.42983C9.42983 14.2181 9.39729 14.0929 9.36746 13.9754C9.27932 13.6306 9.20068 13.3244 9.47729 12.8034C9.66441 12.4508 9.92475 12.0364 10.2217 11.6112C10.5173 11.1876 10.8549 10.7454 11.1966 10.3356C11.2658 10.2537 11.3593 10.215 11.4515 10.2227H11.4529C11.5424 10.2212 11.6197 10.13 11.6793 9.99544C11.7458 9.84546 11.7878 9.65373 11.8054 9.44963C11.8231 9.23625 11.8136 9.0136 11.7769 8.81105C11.7254 8.52809 11.6292 8.30234 11.4963 8.26369C11.3498 8.22194 11.2522 8.07196 11.2522 7.90651V6.17476H11.2536Z" fill="#505050" stroke="#505050" stroke-width="0.5"/>
</svg>

            </Avatar> 
          <span class="font-bold white-space-nowrap">Traveler Details</span>
        </div>
      </template> 
            <section id="travelersDetails">
			<template v-if="isDuffelOrderSelectedLoading">
                <Skeleton height="15rem" class="mb-3"></Skeleton>
              </template>
              <template v-else>
                <div class="flex justify-content-start flex-wrap mt-4 mb-2">
                  <div class="font-semibold">
                    <i class="pi pi-clock pr-1" style="color: #82cf35"></i>
                    <span>{{
                      formatOutboundDate(
                        duffelOrderSelected.slices[0].segments[0].departing_at
                      )
                    }}</span>
                    -
                    <span>
                      {{
                        formatOutboundDate(
                          duffelOrderSelected.slices[
                            duffelOrderSelected.slices.length - 1
                          ].segments[
                            duffelOrderSelected.slices[
                              duffelOrderSelected.slices.length - 1
                            ].segments.length - 1
                          ].arriving_at
                        )
                      }}
                    </span>
                  </div>
                  <div class="font-semibold ml-4" v-if="passengers">
                    <i class="pi pi-user mr-2" style="color: #82cf35"></i
                    >{{ passengers }} passengers
                  </div>
                </div>
              </template>	
              <h2
                class="mt-1 mb-4 flex align-items-center justify-content-start canaro-font font-semibold"
              >
                <span class="green-dot-sm mr-2"></span>Fill in Personal Details
              </h2>
              <TravelerDetails :travelersSelected="travelersSelected" />
            </section>
            <hr style="color: var(--bluegray-200); border-top: 5px" />
          </TabPanel>
          <TabPanel>
                <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path style="fill:gray;" fill-rule="evenodd" clip-rule="evenodd" d="M0.407963 2.86937H5.35151L5.34497 2.7932V0.806706C5.34497 0.363311 5.85983 0 6.4925 0C7.12299 0 7.64003 0.365264 7.64003 0.806706V2.7932L7.63349 2.86937H16.0524L16.0458 2.7932V0.806706C16.0458 0.363311 16.5607 0 17.1912 0C17.8217 0 18.3387 0.365264 18.3387 0.806706V2.7932L18.3322 2.86937H23.592C23.8167 2.86937 24 3.03345 24 3.23464V7.03573C24 7.23692 23.8167 7.40099 23.592 7.40099H0.407963C0.183256 7.39904 0 7.23496 0 7.03377V3.23268C0 3.0315 0.183256 2.86937 0.407963 2.86937ZM14.0147 12.0635C14.475 11.6455 15.2255 11.6416 15.6902 12.0596C16.1527 12.4776 16.1549 13.1554 15.6946 13.5734L13.6722 15.4114L15.6989 17.2514C16.1549 17.6675 16.1505 18.3413 15.6858 18.7574C15.2212 19.1734 14.4729 19.1715 14.0169 18.7554L12.0055 16.9291L9.98964 18.7593C9.52932 19.1793 8.77884 19.1812 8.31415 18.7632C7.85165 18.3472 7.84947 17.6675 8.30979 17.2494L10.3343 15.4114L8.30761 13.5714C7.85165 13.1554 7.85601 12.4815 8.3207 12.0654C8.78538 11.6494 9.53368 11.6513 9.98964 12.0674L11.9989 13.8937L14.0147 12.0635ZM0.102536 8.2409H23.8996C23.9564 8.2409 24 8.28192 24 8.33076V23.9101C24 23.959 23.9542 24 23.8996 24H0.102536C0.0479956 24 0.00218162 23.959 0.00218162 23.9101V8.33271C0 8.28192 0.045814 8.2409 0.102536 8.2409ZM1.92855 9.87971H22.4009C22.5143 9.87971 22.6059 9.96761 22.6059 10.0633V22.3397C22.6059 22.4354 22.5078 22.5233 22.4009 22.5233H1.83038C1.72348 22.5233 1.62531 22.4413 1.62531 22.3397V10.1512C1.62531 9.95003 1.80856 9.78791 2.03109 9.78791L1.92855 9.87971ZM17.0908 5.83446C17.7213 5.83446 18.2383 5.46919 18.2383 5.02775V2.95141L18.2318 2.87133H15.9498L15.9433 2.95141V4.93595C15.9433 5.37934 16.4581 5.74265 17.0886 5.74265V5.83446H17.0908ZM6.38996 5.83446C7.02045 5.83446 7.5375 5.46919 7.5375 5.02775V2.95141L7.53095 2.87133H5.25116L5.24461 2.95141V4.93595C5.24461 5.37934 5.75948 5.74265 6.38996 5.74265V5.83446Z" fill="white"/>
</svg>


            </Avatar> 
          <span class="font-bold white-space-nowrap">Contact & Modifications</span>
        </div>
      </template> 
            <section id="contactAndModifications">
			<template v-if="isDuffelOrderSelectedLoading">
                <Skeleton height="15rem" class="mb-3"></Skeleton>
              </template>
              <template v-else>
                <div class="flex justify-content-start flex-wrap mt-4 mb-2">
                  <div class="font-semibold">
                    <i class="pi pi-clock pr-1" style="color: #82cf35"></i>
                    <span>{{
                      formatOutboundDate(
                        duffelOrderSelected.slices[0].segments[0].departing_at
                      )
                    }}</span>
                    -
                    <span>
                      {{
                        formatOutboundDate(
                          duffelOrderSelected.slices[
                            duffelOrderSelected.slices.length - 1
                          ].segments[
                            duffelOrderSelected.slices[
                              duffelOrderSelected.slices.length - 1
                            ].segments.length - 1
                          ].arriving_at
                        )
                      }}
                    </span>
                  </div>
                  <div class="font-semibold ml-4" v-if="passengers">
                    <i class="pi pi-user mr-2" style="color: #82cf35"></i
                    >{{ passengers }} passengers
                  </div>
                </div>
              </template>	
              <h3 class="text-2xl canaro-font font-semibold">Modifications</h3>
              <div class="flex flex-column">
                <div
                  class="md:flex flex-row justify-content-between align-items-center"
                >
                  <p class="interstate-font font-light text-xl">
                    <span class="mr-3">💬</span> Do you have questions about your trip or need to modify your booking?
                  </p>
                  <a class="text_decoration_none py-3 px-6 download_btn" href="/contact" target="_blank">Talk to us</a>
                </div>
              </div>
              <hr style="color: var(--bluegray-200); border-top: 5px" />
              <h3 class="text-2xl canaro-font font-semibold">Cancelations</h3>
              <div class="md:mx-5">
                <div class="interstate-font font-light text-xl">
                  You can cancel your trip with a partial refund (see our <a class="text-green-vibe underline pointer" href="https://vibeadventures.com/terms-and-conditions/">booking terms</a> ), subject to the cancellation policies of its individual components.
                </div>
                <div class="p-5 my-5" style="background-color: #f3faed;margin-bottom:20px">
                  <div class="grid">
					<div class="col-12 lg:col-9">  
                    <h4 class="canaro-font font-semibold text-xl my-1">
					  <img src="../assets/plain-green.png" style="width: 20px;">	
                      Cancel your flights
                    </h4>
                    <div class="interstate-font text-xl font-light" style="display:none">
                      If you cancel, we’ll refund you depending on the ticket
                      type you booked and cancellation policy of airline carrier
                      (see carrier’s
                      <a class="text-green-vibe underline pointer" @click="termsDialogVisible = true">booking terms</a> ):
                    </div>
					<div style="padding:20px" v-if="alternativeDuffel">
						<p class="interstate-font text-xl font-light" v-if="dataCancel" style="display:contents">Cancel your flights by <span class="text-green-vibe">{{ dataCancel.expires_at }}</span> for a <span class="text-green-vibe"> {{ "$" + dataCancel.refund_amount }} {{ dataCancel.refund_currency }}</span> refund (see airlines’ <a class="text-green-vibe underline pointer" v-if="airlineUrl" @click="openTerms(airlineUrl)" style="text-decoration: underline;">cancellation policy</a>).</p>
					</div>	
					<div style="padding:20px" v-else>
						<p class="interstate-font text-xl font-light" v-if="dataCancel" style="display:contents">Your <a class="text-green-vibe">flights</a> are <span class="text-green-vibe">non-refundable</span> at this time (see airlines’ <a class="text-green-vibe underline pointer" v-if="airlineUrl" @click="openTerms(airlineUrl)" style="text-decoration: underline;">cancellation policy</a>).
                    	</p>
					</div>	
                    
					</div>	
                    <div class="col-12 lg:col-3" style="height: 40px;align-self: center;">
                      <a class="text_decoration_none py-3 px-6 download_btn" href="/contact" target="_blank">Talk to us</a>
                        <button style="display:none"
                          class="btn-cover py-3 download_btn md:w-2"
                          @click="cancelFlightB = true"
                        >
                          Cancel Flights
                        </button>
					</div>		
                  </div>
				</div>	
                <div class="p-5 my-5" style="background-color: #f3faed">
                  <div class="grid">
					<div class="col-12 lg:col-9">
                    <h4 class="canaro-font font-semibold text-xl my-1">
					  <img src="../assets/cancel-green.png" style="width: 20px;">	
                      Cancel your adventure
                    </h4>
                    <div class="interstate-font text-xl font-light" style="padding:20px">
                      If you cancel, we’ll refund you depending when you cancell, (see
						<a class="text-green-vibe underline pointer" v-if="tour" @click="Terms(tour.operator.id)">terms & conditions</a>).
                    </div>
                    <p class="canaro-font text-lg font-medium" style="display:none">
                      <span class="black-dot-sm mr-2"></span>Since you cancel
                      <span class="text-green-vibe">61 days</span>before the
                      adventure, your refund will be
                      <span class="text-green-vibe">$ 2 080.9 USD</span>.
                    </p>
					</div>	
                    <div class="col-12 lg:col-3" style="height: 40px;align-self: center;">
                      <a
                        class="text_decoration_none md:flex justify-content-end"
                      >
                        <a class="text_decoration_none py-3 px-6 download_btn" href="/contact" target="_blank">Talk to us</a>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
        </TabView>
		<div style="display:none"> 
			<img src="../assets/calendar-green.png">
		</div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="visible_baggage"
    modal
    header="Edit Profile"
    :style="{ width: '35rem' }"
  >
    <div style="margin-bottom: 25px">
      <br />
      <div style="display: flex">
        <img
          src="/images/seat-1.svg"
          width="40"
          height="50"
          style="margin-right: 5px; margin-top: 15px"
        />
        <p style="width: 25%">Checked baggage</p>
        <InputNumber
          v-model="local_baggage.checked"
          inputId="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
          :min="details_baggage.checked"
          :max="details_baggage.checked_max"
          :step="1"
          mode="decimal"
          style="height: 20%; margin-top: 15px"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div style="text-align: right">
        <p>
          {{
            "$" +
            (
              parseFloat(params_baggage.total_amount) * local_baggage.checked
            ).toFixed(2)
          }}
        </p>
      </div>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary"></Button>
      <Button
        v-if="save_baggage"
        type="button"
        label="Save"
        @click="handleBaggagePurchase()"
      ></Button>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="cancelFlightB"
    modal
    header="Cancel Flight"
    :style="{ width: '25%' }"
    @hide="resetFlag"
  >
    <div style="text-align: center" v-if="spinnerContenido">
      <ProgressSpinner />
    </div>
    <div v-if="flag == 1">
      <p>
        If you cancel, we’ll refund you depending on the ticket type you booked
        and cancellation policy of airline carrier (see carrier’s<a class="text-green-vibe underline pointer" @click="termsDialogVisible = true">booking terms</a>
        ):
      </p>
      <table style="width: 100%">
        <tr>
          <td style="text-align: left"><p>Refund amount</p></td>
          <td style="text-align: right">
            <p>{{ "$" + dataCancel.refund_amount }}</p>
          </td>
        </tr>
        <tr>
          <td style="text-align: left"><p>Refund currency</p></td>
          <td style="text-align: right">
            <p>{{ dataCancel.refund_currency }}</p>
          </td>
        </tr>
        <tr>
          <td style="text-align: left"><p>Expire date</p></td>
          <td style="text-align: right">
            <p>{{ dataCancel.expires_at }}</p>
          </td>
        </tr>
      </table>
      <hr />
      <br />
      <div style="display: flex; text-align: right">
        <Button
          label="Confirm"
          style="margin-left: 50%; background-color: #82cf35" @click="ConfirmAction"
        ></Button>
      </div>
    </div>
    <div v-if="flag == 2">
      <p>{{ message_cancel }}</p>
    </div>
  </Dialog>

  <ConfirmDialog />

  <ContactUs
    :visible="contact_modal"
    @update:visible="contact_modal = $event"
  />

    <Dialog v-model:visible="termsDialogVisible" modal header="6. Cancellations" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <p class="mb-4 text-justify">
      If the customer wishes to cancel the booking, the cancellation policy outlined in this section will apply. We incur non-refundable costs before cancellation, and penalties will be proportional to these costs. In case of cancellation, Vibe Adventures is entitled to claim the applicable penalty for incurred expenses. 
    </p>
    <h4>6.1. Cancellation by the Customer</h4>
    <p class="mb-4 text-justify">
      Cancellations will only be accepted in writing once a partial or full payment has been made. To cancel, please submit your request via our contact form. Your cancellation will take effect upon receipt in writing. If received outside our operating hours, it will be processed on the next business day (see "Contact" section for hours).<br><br>

      Specific cancellation conditions for each trip are outlined in the "Conditions" section of the offer. You may cancel prior to departure and may be eligible for a partial refund. Cancellation fees will be determined by the policies of the service providers involved, including the tour operator and flight carriers (review their terms before booking).<br><br>

      
      Penalties and administrative fees will be deducted from payments received by Vibe Adventures. If your cancellation is covered by insurance, you may seek reimbursement from your provider.
    </p>


    <h4>6.2. Cancellation by Vibe Adventures</h4>
    <p class="mb-4 text-justify">
      We reserve the right to:

      Alter the departure date or the trip's end date;

      Change non-essential aspects of the trip;

      Cancel or modify the trip, including any specified routes or objectives in the itinerary;

      Cancel the trip if the required minimum number of participants is not achieved.

      If any of these changes, modifications, cancellations, postponements, or delays occur, you agree that you will not be entitled to a refund, either in whole or in part, and you will not seek compensation for any injury, loss, damage, or additional costs resulting from these changes.

    </p>

    <p class="mb-4 text-justify">
      Endemic and Pandemic Situations<br><br>

      If your destination requires a health test or any specific requirement, you are responsible for covering any associated costs and ensuring that the test is completed within the required timeframe. Should you experience symptoms related to endemic or pandemic diseases during your trip that require modifications to your contracted services (e.g., hotel or flight changes), any additional costs will be your responsibility. You will need to claim these costs from your insurer.<br><br>

      Other Cancellations<br><br>

      Unless specified otherwise in these booking conditions, we are not liable for disruptions caused by Force Majeure, which refers to unforeseen events beyond our or our suppliers' control. This includes, but is not limited to, war, civil unrest, terrorism, riots, governmental actions, labor disputes, natural or nuclear disasters, extreme weather, pandemics, and epidemics.<br><br>

      A pandemic or epidemic, such as COVID-19, is considered a Force Majeure event. However, due to COVID-19's unprecedented effects on the travel industry, Vibe Adventures has outlined specific conditions to support the recovery of operations, as detailed in prior sections.<br><br>

      For group trips, Vibe Adventures bases its arrangements on an expected number of participants. If the minimum required number of travelers is not met, we retain the discretion to cancel the booking, treating it as a "major change" and subject to the terms specified in the "Changes" section.

    </p>
  </Dialog>
<Dialog v-model:visible="visible" modal header="Terms & Conditions" :style="{ width: '40rem' }">
      <div style="text-align: center;">
        <ProgressSpinner v-if="spinner" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
      </div>
    <div v-if="errormessage!=''">
        <label>{{ errormessage }}</label>
    </div>      
  <div v-html="text_message" v-if="!spinner"></div>
    </Dialog>
  <Dialog
    v-model:visible="arilineDialogVisible"
    modal
    header="Airline terms & conditions"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div v-if="!conditionsUrl" class="p-4">
      <p>No terms URL available for this airline.</p>
    </div>

    <div v-else>
      <!-- iframe wrapper -->
      <div v-if="!iframeBlocked" style="height:70vh; min-height:400px;">
        <iframe
          ref="iframeRef"
          :src="conditionsUrl"
          @load="onIframeLoad"
          @error="onIframeError"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          style="width:100%; height:100%; border:0;"
        ></iframe>

        <div v-if="iframeLoading" style="padding:1rem; text-align:center;">
          Loading terms…
        </div>
      </div>

      <!-- fallback when embedding blocked -->
      <div v-else class="p-4">
        <p>
          We couldn’t display the airline terms inside the site (this site may
          block embedding). You can open them in a new tab:
        </p>
        <p>
          <a :href="conditionsUrl" target="_blank" rel="noopener noreferrer">
            Open airline terms &amp; conditions
          </a>
        </p>
      </div>
    </div>

    <template #footer>
      <Button label="Close" @click="arilineDialogVisible = false" />
      <Button v-if="conditionsUrl" label="Open in new tab" @click="openInNewTab" />
    </template>
  </Dialog>
  <Toast />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Breadcrumb from "primevue/breadcrumb";
import { useToast } from "primevue/usetoast";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Skeleton from "primevue/skeleton";
import dayjs from "dayjs";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import ContactUs from "~/components/ContactUs.vue";
import { useRuntimeConfig } from "#app";
import { useRoute, useRouter } from "vue-router";
import { UsersStore } from "#imports";
import Dialog from "primevue/dialog";
import { tourStore } from "~/store/tourStore";
import ProgressSpinner from "primevue/progressspinner";
import { useConfirm } from "primevue/useconfirm";
import Avatar from 'primevue/avatar';

const contact_modal = ref(false);

const orderStore = useOrderStore();
const confirm = useConfirm();

const cancelFlightB = ref(false);
const spinnerContenido = ref(false);
const spinner=ref(false); 
const loading = ref(false); 
const flag = ref(0);
const dataCancel = ref({});
const message_cancel = ref("");

const Tourstore = tourStore();
const toast = useToast();
const isTourLoading = ref(true);
const save_baggage = ref(false);
const visible_baggage = ref(false);
const termsDialogVisible = ref(false);
const changesFareConditions = ref('');
const user_log= ref(null);
const windowMobile = ref(false);
const checkMobile = () => {
  windowMobile.value = window.innerWidth <= 768;
};
  
const selectedUrl=ref('');  
const visible=ref(false);
const text_message = ref('');
const errormessage = ref('');
  
const Terms=async(url)=>{
    visible.value=true;
    selectedUrl.value=url;
    console.log('parametro enviado',url);
    try {
      spinner.value = true;
      const res = await fetch(`${config.public.BACKEND_URL}/api/tours-text?operator_id=${selectedUrl.value}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log('contenido de respuesta:',data.response)
      if (data.status) {
        console.log( 'contenido de adventures',data);
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
  
const items = ref([
  { label: windowMobile.value ? '' : 'Home',
    icon: windowMobile.value ? 'pi pi-home' : '', route: "/" },
  { label: "Account", route: "/personal-details" },
  { label: "My trips", route: "/my-trips" },
  { label: "Order", route: "" },
]);

watch(cancelFlightB, (newVal) => {
  if (newVal) {
    console.log("Diálogo abierto, ejecutando el servicio...");
    CancelDialog();
  }
});
	
const closeModal = () => {
  contact_modal.value = !contact_modal.value;
  console.log("contenido de modal;", contact_modal.value);
};

const getPdfOrder = () => {
  try {
    console.log("entro a contenido de descarga", route.query.order_id);
    /* orderStore.getPdf(route.query.order_id); */
    const order=route.query.order_id;
    console.log('id de orden:',order);
      const pdfUrl = `${config.public.BACKEND_URL}/api/boooking-pdf?tour_id=${order}`;
    window.open(pdfUrl, '_blank');
    console.log('contenido de url:',pdfUrl);    
  } catch (error) {
    console.log("Failed to fetch PDF:", error);
  }
};

const tabmenuItems = ref([
  {
    label: "Flights",
    icon: "pi pi-home",
    route: "#flightsSummary",
  },
  {
    label: "Adventures",
    icon: "pi pi-chart-line",
    route: "#adventureSummary",
  },
  {
    label: "Travelers details",
    icon: "pi pi-list",
    route: "#travelersDetails",
  },
  {
    label: "Contact & modifications",
    icon: "pi pi-inbox",
    route: "#contactAndModifications",
  },
]);

function formatOutboundDate(date) {
  return dayjs(date).format("MMM D, YYYY");
}

const config = useRuntimeConfig();

const travelersSelected = ref([]);
const order = ref();
const duffelOrderSelected = ref(null);
const isDuffelOrderSelectedLoading = ref(true);
const tourId = ref(null);
const tour = ref([]);
const passengers = ref();
const images = ref([]);

const route = useRoute();
const router = useRouter();

const details_baggage = ref({
  cabin: 1,
  checked: 1,
  cabin_max: 2,
  checked_max: 2,
});

const local_baggage = ref({
  cabin: 1,
  checked: 1,
  cabin_max: 2,
  checked_max: 2,
});

const params_baggage = ref({
  checked: details_baggage.value.checked,
  total_amount: "",
  order: "ord_0000Al2THqFoHmKFajvWXw",
  passenger_id: "pas_0000Al2T5tOIc8gE5WnFMP",
  baggage_id: "",
});

const params_order = ref({
  order: "ord_0000Al2THqFoHmKFajvWXw",
});

const handleBaggagePurchase = async () => {
  console.log("entro a contenido", params_baggage.value);
  try {
    params_baggage.value.cabin =
      local_baggage.value.cabin - details_baggage.value.cabin;
    params_baggage.value.checked =
      local_baggage.value.checked - details_baggage.value.checked;
    purchaseBaggage();
    console.log("contenido:", params_baggage.value);
  } catch (error) {
    console.error("Error purchasing baggage:", error);
  }
};

const priceFormat = (number, quantity) => {
  number = parseFloat(number);
  return "$" + number * quantity;
};

const purchaseBaggage = async () => {
  try {
    const res = await fetch(
      `${config.public.BACKEND_URL}/api/create-baggage-stripe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params_baggage.value),
      }
    );
    const data = await res.json();
    if (data.status) {
      console.log("consumio correctamente el servicio");
      window.location.href = data.url;
    }
  } catch (error) {
    console.log("Error durin baggage purchase:", error);
  }
};

const orderServices = async () => {
  try {
    const queryString = new URLSearchParams(params_order.value).toString();
    const res = await fetch(
      `${config.public.BACKEND_URL}/api/order-services?${queryString}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.status) {
      params_baggage.value.baggage_id = data.response[0].baggage_id;
      params_baggage.value.total_amount = data.response[0].total_amount;
      console.log("contendio de order services retorno", params_baggage.value);
    }
  } catch (error) {
    console.log("Error durin baggage purchase:", error);
  }
};

watch(
  [() => local_baggage.value.cabin, () => local_baggage.value.checked],
  () => {
    local_baggage.value.cabin !== details_baggage.value.cabin ||
    local_baggage.value.checked !== details_baggage.value.checked
      ? (save_baggage.value = true)
      : (save_baggage.value = false);
  }
);

const checkStripePayment = () => {
  const stripePay = route.query.stripe_pay;
  if (stripePay) {
    toast.add({
      severity: "success",
      summary: "Success!!",
      detail: "Buy Finished",
      life: 3000,
    });
  }
};

    async function cancelFlight(params) {
	    console.log("params",params);	
        try {
			const  response = await fetch(
			  `${config.public.BACKEND_URL}/api/duffel-cancel-v2?order_id=${params}`,
			  {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			  }
			);
			const data = await response.json();
			console.log("data.data",data.data);
			const res = data.data;
            if (data.success != true) {
                throw new Error('Failed to fetch resource');
            }
            return res;
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            throw error;
        }
    }		
	
const alternativeDuffel = ref(false);	
	
const CancelDialog = async () => {
  console.log("CancelDialog");	
  spinnerContenido.value = true;
  console.log("orderdata.value.duffel_id",orderdata.value.duffel_id);
  const rest = await cancelFlight(orderdata.value.duffel_id);
  console.log("rest",rest)	
  if (rest.refund_amount > 0) {
    flag.value = 1;
    console.log("flag.value ", flag); 
    dataCancel.value = rest;
	console.log("dataCancel.value",dataCancel.value); 
	alternativeDuffel.value = true;  
  } else {
	console.log("cancelFlight error");  
    flag.value = 2;
    message_cancel.value = rest;
  }
  spinnerContenido.value = false;
};

const ConfirmAction = () => {
  confirm.require({
    message: "Are you sure you want to confirm this action?",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
    confirmCancel();
    },
    reject: () => {
    },
  });
};


const confirmCancel=async ()=>{

  const res=await Tourstore.cancelConfirm({tour_id:order.value,cancel_id:dataCancel.value.id,user_log:user_log.value}, `${config.public.BACKEND_URL}`);
  /* console.log('contenido de funcion res:',res); */
  if(res.success){
    toast.add({
      severity: "success",
      summary: "Success!!",
      detail: res.data,
      life: 3000,
    });

  }else{
    toast.add({
      severity: "error",
      summary: "Error!!",
      detail: res.data,
      life: 3000,
    });
  }
  resetFlag();
  cancelFlightB.value=false;
}

const resetFlag = () => {
  flag.value = 0;
};


const orderdata = ref();

const airlineUrl = ref();	

const arilineDialogVisible = ref(false);
const conditionsUrl = ref('');
const iframeLoading = ref(true);
const iframeBlocked = ref(false);
const iframeRef = ref(null);
let loadTimeout = null;

function openTerms(airlineUrl) {
  console.log("airlineUrl",airlineUrl)	
  conditionsUrl.value = airlineUrl || '';
  iframeLoading.value = true;
  iframeBlocked.value = false;
  arilineDialogVisible.value = true;

  // if the iframe hasn't fired load within 3000ms consider it blocked and show fallback
  clearTimeout(loadTimeout);
  loadTimeout = setTimeout(() => {
    if (iframeLoading.value) {
      iframeBlocked.value = true;
    }
  }, 3000);
}

function onIframeLoad() {
  iframeLoading.value = false;
  clearTimeout(loadTimeout);
  // note: cross-origin prevents accessing iframe content; we only rely on the load event
}

function onIframeError() {
  iframeLoading.value = false;
  iframeBlocked.value = true;
  clearTimeout(loadTimeout);
}

function openInNewTab() {
  window.open(conditionsUrl.value, '_blank', 'noopener,noreferrer');
}	
	
onMounted(() => {
  //orderServices();
  checkStripePayment();
  checkMobile();
  window.addEventListener('resize', checkMobile);
  user_log.value = localStorage.getItem('user_id');
  nextTick(async () => {
    const params = new URLSearchParams(window.location.search);
    order.value = params.get("order_id");
    if (order.value) {
      const orderData = await fetchOrderData(order.value);
    orderdata.value = orderData;
    console.log("orderdata.value",orderdata.value); 
      if (orderData) {
        travelersSelected.value = orderData.travelers;
        passengers.value = orderData.passengers;
        console.log("passengers.value", passengers.value);
        tourId.value = orderData.tour_id;
        duffelOrderSelected.value = await fetchDuffelorder(orderData.duffel_id);
        if(duffelOrderSelected.value.owner.id){
          console.log("duffelOrderSelected.value.owner.id", duffelOrderSelected.value.owner.id);
          const airline = await fetchDuffelAirline(duffelOrderSelected.value.owner.id);
          airlineUrl.value = airline.conditions_of_carriage_url;
          console.log("airlineUrl.value",airlineUrl.value );
        }

        isDuffelOrderSelectedLoading.value = false;
        if (tourId.value) {
          console.log("tourId.value", tourId.value);
          tour.value = await fetchTour(tourId.value);
          if (tour.value) {
            tour.value.tourTypes = formatTourTypes(tour?.value?.tour_types);
            console.log("tour value", tour.value);
            images.value = tour.value.images;
            console.log("images.value", images.value);
          }
        } else {
          console.error("no tourId");
        }
        console.log("duffelOrderSelected.value.available_actions",duffelOrderSelected.value.available_actions);  
        if(duffelOrderSelected.value.available_actions.includes("cancel")){ 
          console.log("cancellation is possible");
          CancelDialog();  
        }

        if(duffelOrderSelected.value.slices[0].conditions.change_before_departure){
          if(duffelOrderSelected.value.slices[0].conditions.change_before_departure.allowed){
            changesFareConditions.value = duffelOrderSelected.value.slices[0].conditions.change_before_departure?.penalty_amount + " " + duffelOrderSelected.value.slices[0].conditions.change_before_departure?.penalty_currency;
          }
        }
      }
    }
  });
});

async function fetchTour(tourId) {
  const { data, error } = await useFetch(
    `${config.public.BACKEND_URL}/api/tour/${tourId}`
  );
  if (error?.value) {
    console.info("Error fetching tour: ", error?.value?.message);
  }
  return data?.value?.data ?? null;
}

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

async function fetchOrderData(order) {
  const { data, error } = await useFetch(
    `${config.public.BACKEND_URL}/api/orders/${order}?travelers=true`
  );
  if (error?.value) {
    console.error("Error fetching order data:", error.value.message);
    return null;
  }
  return {
    duffel_id: data.value.duffel_id,
    travelers: data.value.travelers,
    tour_id: data.value.tour_id,
    passengers: data.value.travelers_number,
  paid: data.value.paid,
    p_flight: data.value.p_flight,
    p_tour: data.value.p_tour,  
  departure: data.value.departure,
    start: data.value.start,
    arrival: data.value.arrival,
    end: data.value.end,  
  };
}

async function fetchDuffelorder(orderId) {
  if (!orderId) {
    console.info('Missing duffelorderId. Its something like: "off_xxxx"');
    return null;
  }

  const params = new URLSearchParams();
  params.append("orderId", orderId);

  const { data, error } = await useFetch(
    `${
      config.public.BACKEND_URL
    }/api/duffel/get-order-by-id?${params.toString()}`
  );

  if (error?.value?.data?.message) {
    for (const key in error.value.data.message) {
      console.error(`${key}: ${error.value.data.message[key]}`);
    }
    return null;
  }
  console.log("duffel order",data.value.data);
  return data.value.data;
}

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
  console.log("duffel airline",data.value.data);
  return data.value.data;
}	
	
const baggageCarryOnAllowedComputed = computed(() => {
  const isAllowed =
    duffelOrderSelected.value?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(
      (baggage) => baggage?.type === "carry_on"
    ) ?? null;
  if (isAllowed) {
    return isAllowed.quantity;
  }
  return 0;
});

const baggageCheckedAllowedComputed = computed(() => {
  const isAllowed =
    duffelOrderSelected.value?.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages?.find(
      (baggage) => baggage?.type === "checked"
    ) ?? null;
  if (isAllowed) {
    return isAllowed.quantity;
  }
  return 0;
});
</script>

<style scoped>

.card{
  border:1px solid #e0e0e0;
  border-radius:8px;
}
.font-interstate {
  font-family: 'Interstate' !important;
}
.p-avatar {
  background: transparent;
}

/* global CSS — overrides inline fill */
a[role="tab"][aria-selected="true"] svg path,
a[role="tab"][aria-selected="true"] svg circle,
a[role="tab"][aria-selected="true"] svg rect {
  fill: white !important; /* active color */
}

/* optional: inactive color */
a[role="tab"][aria-selected="false"] svg path,
a[role="tab"][aria-selected="false"] svg circle,
a[role="tab"][aria-selected="false"] svg rect {
  fill: gray !important; /* default color */
}

.p-breadcrumb {
  padding: unset;
  border: none;
}

::v-deep(svg.p-icon) {
  color: black !important;
}

::v-deep(.p-menuitem-link .text-color) {
  color: black !important;
}

.order-header {
  justify-content: space-between;
  align-items: center;
}

.line-flights {
  border-left: 2px solid var(--bluegray-200);
  height: 78.5%;
  position: absolute;
  left: 6.3rem;
  top: 11%;
  z-index: -1;
}

.hr-lined {
  border-top: 1px solid var(--bluegray-100);
}

.nights-in {
  position: absolute;
  top: -0.9rem;
  left: 30%;
  border-color: #ff6c0e;
  color: #ff6c0e;
}

.download_btn {
  background-color: #ff6c0e;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ff6c0e;
  border-radius: 5px;
  font-weight: 700;
  font-family: "Interstate";
  font-size: 1.1rem;
}

.btn-cover {
  width: -webkit-fill-available;
  border: 1px solid #ff6c0e;
  border-radius: 5px;
  font-weight: 700;
  font-family: "Interstate";
  font-size: 1.1rem;
}

.service-card {
  width: calc(100% - 20px);
  margin: 0 10px;
}

.service-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

ul.p-tabview-nav {
    align-items: anchor-center !important;
    height: 50px !important;
  	
}

::v-deep(.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link) {
  border-radius: 30px;
  padding: 0px 10px;
}

::v-deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link) {
  transition: none;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  padding: 0 10px !important;
  border: 0 !important;
}

.tour-title-singleline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 2.5rem;
}

.booking-badge {
  display: inline-block;
}

@media (max-width: 767px) {
  .tour-title-singleline {
    font-size: 1.5rem;
  }
  .order-header {
    margin-bottom: 1rem;
  }
}

@media only screen and (max-width: 767px) {
  .main-spacing {
    padding: 0.5rem 2rem;
    margin-top: 5rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main-spacing {
    padding: 0.5rem 2rem;
  }
  .nights-in {
    position: absolute;
    top: -0.9rem;
    left: 40%;
  }
  .service-card {
    width: calc(100% / 2 - 20px);
    margin: 0 10px;
  }
}

@media only screen and (min-width: 1200px) {
  .main-spacing {
    padding: 2rem 7rem;
  }
  .nights-in {
    position: absolute;
    top: -0.9rem;
    left: 38%;
  }
  .service-card {
    width: calc(100% / 3 - 20px);
    margin: 0 10px;
  }
}

.row {
  display: flex;
  align-items: center;
}

.image-column {
  margin-right: 10px;
}

.text-column {
  display: flex;
  flex-direction: column;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.pointer {
  cursor: pointer;
}
</style>
