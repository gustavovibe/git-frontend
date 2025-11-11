<style scoped>
@font-face {
  font-family: 'Canaro';
  src: url(/fonts/canaro-l.ttf);
  font-weight: normal;
}

@font-face {
  font-family: 'Interstate';
  src: url(/fonts/Interstate-regular.ttf);
  font-weight: 100 !important;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.grid-container-1 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.img-fluid {
  width: 100%;
  height: auto;
  padding: 16px 0px;
}

.why-desc {
  color: #000;
  font-family: "Interstate";
  font-style: normal;
  font-weight: 500;

}

.why-title {
  color: #000;
  font-family: Canaro;
  font-style: normal;
  font-weight: 700;
}

.why-subtitle {
  color: #82CF45;
  font-family: Canaro;
  font-style: normal;
  font-weight: 700;
}

.why-icon img {
  width: 70px;
  height: 70px;
}

.subtitle-desc {
  color: rgba(0, 0, 0, 0.70);
  font-family: "Interstate";
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.72px;
}

.icons-grid {
  padding: 2% 0;
}

.green-section {
  width: 100%;
  background-color: #f8fcf6;

}

@media only screen and (max-width:767px) {
  .why-desc {
    font-size: 18px;
    line-height: 20px;
  }

  .why-title {
    font-size: 26px;
    line-height: 30px;
  }

  .why-subtitle {
    font-size: 18px;
    line-height: 30px;
  }

  .subtitle-desc {
    font-size: 14px;
    line-height: 16px;
  }

  .icons-grid {
    text-align: center;
  }

  .why-title {
    text-align: center;
  }

  .why-desc {
    max-width: 100%;
  }

  .green-section {
    padding: 16px ;
  }

  .why-icon img {
    margin: 0 auto
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .why-desc {
    font-size: 22px;
    line-height: 24px;
  }

  .why-title {
    font-size: 36px;
    line-height: 40px;
  }

  .why-subtitle {
    font-size: 20px;
    line-height: 40px;
  }

  .subtitle-desc {
    font-size: 22px;
    line-height: 20px;
  }

  .why-icon img {
    margin: 0 auto
  }

  .icons-grid {
    text-align: center;
  }

  .why-title {
    text-align: center;
  }

  .green-section {
    padding: 70px 1%;
  }
}

@media only screen and (min-width:1200px) {
  .why-desc {
    font-size: 28px;
  }

  .why-title {
    font-size: 40px;
    line-height: 70px;
  }

  .why-subtitle {
    font-size: 24px;
    line-height: 70px;
  }

  .subtitle-desc {
    font-size: 18px;
    line-height: 26px;
  }

  .icons-grid {
    text-align: left;
  }

  .why-desc {
    max-width: 360px;
  }

  .green-section {
    padding: 100px 0;
  }

  .page-margin {
    padding: 5rem 10rem;
  }
}
</style>

<template>
  <div class="green-section page-margin">
    <div style="max-width: 1440px;margin: 0 auto">
      <div class="grid">
        <div class="col-12 lg:col-6" style="margin: auto 0">
          <div class="grid icons-grid">
            <div class="col-12 md:col-6 lg:col-12">
              <img src="/vibe-logo.png" alt="" class="img-fluid" style="max-width: 300px;" />
            </div>
            <div class="col-12 md:col-6 lg:col-12">
  <h1 class="why-desc text-2xl font-light">
    Your trusted travel agency for extraordinary adventures run by seasoned local tour operators.
  </h1>
</div>
          </div>
        </div>
        <div class="col-12 lg:col-6">
          <img src="/images/mountain.png" class="img-fluid" />
        </div>
      </div>
      <div class="why-title font-bold text-5xl mb-5">
        Why <span style="color: #82cf45;font-style:italic">Vibe Adventures?</span>
      </div>
      <div class="grid icons-grid">
        <div class="col-6 lg:col-3">
          <div class="why-icon">
            <img src="/images/top-tours.png" alt="" />
          </div>
          <div class="why-subtitle">Top tours</div>
          <div class="subtitle-desc font-light">
            Our rigorous screening process guarantees that you will choose among the finest tours and travel packages
            worldwide.
          </div>
        </div>
        <div class="col-6 lg:col-3">
          <div class="why-icon">
            <img src="/images/technology.png" alt="" />
          </div>
          <div class="why-subtitle">Technology</div>
          <div class="subtitle-desc font-light">
            With our advanced technology and travel expertise, get unbeatable itineraries at competitive prices with
            just a click.
          </div>
        </div>
        <div class="col-6 lg:col-3">
          <div class="why-icon">
            <img src="/images/wide-selection.png" alt="" />
          </div>
          <div class="why-subtitle">Wide selection</div>
          <div class="subtitle-desc font-light">
            With 30,000+ organized adventures aroundthe world, you can definitely find your dream trip!
          </div>
        </div>
        <div class="col-6 lg:col-3">
          <div class="why-icon">
            <img src="/images/easy-booking.png" alt="" />
          </div>
          <div class="why-subtitle">Easy booking</div>
          <div class="subtitle-desc font-light">
            Book everything you need in one place: flights, accommodations, activities, and more!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
