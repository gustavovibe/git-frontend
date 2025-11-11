<template>
  <Toast/>
  <div class="overflow-hidden" style="background-color: #fff;" id="breadcrumb-container">
    <div class="my-5 grid col-12 justify-content-center">
      <div class="grid col-9">
        <CustomStepper :activeStep="2" :goTourPage="goTourPage"/>
      </div>
    </div>
  </div>
  <div class="grid container-page">
    <div class="col-12" >
      <h1 class="text-2xl font-semibold my-4">
        Thanks for you interest, <span class="text-green-vibe">{{ traveler }}!</span>
      </h1>
      <p>
        We hope you enjoy the experience. We are currently in the <b>testing phase</b> and will be launching publicly soon. Once ready, we will send you the details via email so you can continue with your booking. 
        <br>
        <br>
        In the meantime, if you’d like to share your experience using our platform, <a class="text-green-vibe" href="https://tidycal.com/vibe-adventures/a-call-with-vibe-adventures-m5vzwr8"><b>schedule a call with us</b></a> and receive a <b>$100 USD discount</b> on your future booking!
        <br>
        <br>
        Thank you again for your support!
      </p>
    </div>
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css';
import { onMounted, ref } from 'vue';

const traveler = ref('Guest');

onMounted(() => {
  const storedName = localStorage.getItem('user_test_name');
  if (storedName) {
    traveler.value = storedName;
  }
});
</script>

<style scoped>
.container-page {
  max-width: 1200px;
  margin: auto
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
  #breadcrumb-container{padding:0 2%}
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
</style>
