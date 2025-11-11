<template>
  <div class="main">
    <AppHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="mb-8">
      <Newsletter style="padding-top: 10px;" />
    </div>
    <div class="mb-8">
      <Partners style="padding-top: 10px;"/>
    </div>
    <AppFooter style="padding-top: 10px;"/>
  </div>
</template>
<script>
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
import Newsletter from "~/components/Newsletter.vue";
import Partners from "~/components/Partners.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
    Newsletter,
    Partners,
	
  },

};

</script>
<script setup>
  var Gravitec = Gravitec || [];
  Gravitec.push(["init", {"autoRegister":false}]);
</script>
<style>
.pi-heart:before{
    content: "♡" !important;
	font-size:30px !important;
}
.pi-heart-fill:before{
    content: "♥" !important;
	font-size:30px !important;
}			
.main {
  max-width: 2580px;
  margin: auto;
}

.p-togglebutton.p-highlight .p-button {
  background: #82CF45 !important;
}

.p-datepicker table td>span.p-highlight {
  color: white !important;
  background: #82CF45 !important;
	padding-top: 4px;
}

.p-autocomplete-multiple-container {
  overflow: hidden !important;
  white-space: nowrap !important;
  display: block !important;
}

.p-inputtext:disabled {
  opacity: 1;
  background-color: white;
  color: black;
  border: 0;
  box-shadow: none;
  max-width: 100%;
}



.p-checkbox .p-checkbox-box.p-highlight {
  border-color: #82CF45 !important;
  background: #82CF45 !important;
}

.p-checkbox .p-checkbox-box {
  border-color: #82CF45 !important;
}

.checkbox-filter {
  margin: 20px 0;
}

.p-accordion-header {
  background: white;
}

.p-accordion {
  border: none;
  background: white;
}

.p-accordion-content {
  border: none;
  background: white;
}

.p-accordion-header a {
  background: white;
  border: none;
  flex-direction: row-reverse;
  width: 100%;
  justify-content: space-between;
}

.view-more .p-accordion-header-link {
  padding: 0;
  color: #82CF45;
  text-decoration: underline;
}

.p-menubar {
  background: none;
}

.p-menubar .p-dropdown .p-dropdown-trigger {
  display: none;
}

.p-carousel-prev {
  border: 1px solid orange !important;
  background: white !important;
  border-radius: 0 !important;
}

.p-carousel-prev path {
  fill: orange !important;
}

.p-carousel-next {
  border: 1px solid orange !important;
  background: white !important;
  border-radius: 0 !important;
}

.p-carousel-next path {
  fill: orange !important;
}

@media(max-width:992px) {
  .p-carousel-container {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media(min-width:992px) {
  .p-carousel.p-component.p-carousel-horizontal {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
  }
}
.custom-progress-bar .p-progress-bar-value {
  background-color: #82CF45 !important;
}

@media only screen and (max-width:768px){

	.p-carousel-next{
		position:absolute !important;
		right: 0;
	}

}
</style>