<style scoped>
@font-face {
  font-family: 'Canaro';
  src: url(/fonts/canaro-l.ttf);
  font-weight: normal;
}

.section-title {
  font-family: Canaro;
  font-weight: 700;
  line-height: 70px;
  margin-top: 0px;
}

@media only screen and (max-width:767px) {
  .slider-image img {
    height: 100px;
    width: auto;
  }

  .section-title {
    font-size: 26px;
  }

  .section {
    margin: 50px auto;
    padding: 0px 1%;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .slider-image img {
    height: 130px;
    width: auto;
  }

  .section-title {
    font-size: 36px;
  }

  .section {
    margin: 70px auto;
    padding: 0px 1%;
  }

}

@media only screen and (min-width:1200px) {
  .slider-image img {
    height: 150px;
    width: auto;
  }

  .section-title {
    font-size: 46px;
  }

  .section {
    margin: 100px auto;
  }

}

.section {
  max-width: 1440px;
}

.slider-desc {
  display: none
}

.partners-slider {
  border-radius: 16px;
  border: 1px solid #82CF45;
  background: #F8FCF6;
  padding-top: 35px;
}

.slider-image {
  text-align: center;
}
:deep(.partners-carousel [data-pc-section="previousbutton"]) {
  left: 8px!important;
}

:deep(.partners-carousel [data-pc-section="nextbutton"]) {
  right: 8px!important;
}
</style>

<template>
	<CarruselReview />

  <div style="max-width: 1240px; margin: 0 auto">
    <div class="col-12" style="text-align:center">
      <h2 class="section-title text-5xl">Partners & <span style="color: #82cf45;font-style: italic;">Affiliates</span>
      </h2>
    </div>
    <div class="partners-slider">
      <Carousel class="partners-carousel" :value="partners" :numVisible="6" :numScroll="1" :responsiveOptions="responsiveOptions" circular>
        <template #item="slotProps">
          <a class="image-link" :href="slotProps.data.link">
            <div class="slider-image">
              <img :src="slotProps.data.image" />
            </div>
            <div class="slider-desc">{{ slotProps.data.desc }}</div>
          </a>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import Carousel from 'primevue/carousel';
import { ref, onMounted } from "vue";

import CarruselReview from '~/components/CarruselReview.vue';
const partners = ref([
  {
    "image": "https://vibeadventures.com/wp-content/uploads/2023/12/1-1.png",
    "desc": "We are a signatory of the Future of Tourism Coalition",
    "link": "https://www.futureoftourism.org/signatories",
  },
  {
    "image": "https://vibeadventures.com/wp-content/uploads/2023/12/2-1.png",
    "desc": "We follow SafeTravels health and hygiene protocols",
    "link": "https://wttc.org/initiatives/crisis-preparedness-management-recovery/safetravels-global-protocols-stamp",
  },
  {
    "image": "https://vibeadventures.com/wp-content/uploads/2023/12/4-1.png",
    "desc": "We are a certified travel provider by SecTur",
    "link": "http://rnt.sectur.gob.mx/RNT_TipoPrestador.html",
  },
  {
    "image": "https://vibeadventures.com/wp-content/uploads/2023/12/3-5.png",
    "desc": "We support the UN Global Compact principles",
    "link": "https://unglobalcompact.org/what-is-gc/mission/principles",
  },
  {
    "image": "https://vibeadventures.com/wp-content/uploads/2023/12/5-2.png",
    "desc": "Accelerated by Startup Journey 2022 (Finland)",
    "link": "https://boostturku.com/demoday",
  },
  {
    "image": "https://vibeadventures.com/wp-content/uploads/2023/12/6-1.png",
    "desc": "Accelerated by POSIBLE 2022 (Mexico)",
    "link": "https://posible.org.mx/",
  },
]);
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 6,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 5,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 2,
    numScroll: 1
  }
]);

</script>
