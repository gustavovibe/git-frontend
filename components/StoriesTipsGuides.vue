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

a{
  text-decoration: none;
}
.story-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.story-overlay {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%);
  border-radius: 16px;
  transition: display 0.3s ease;
}

.story-name {
  position: relative;
  color: white;
  margin: 20px 0;
  font-size: 24px;
  font-family: 'Canaro';
  font-weight: 600;
  word-wrap: break-word;
  transition: display 0.3s ease;
}

.story-desc {
  color: #FFF;
  font-family: "Interstate";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  /* 137.5% */
  letter-spacing: 0.64px;
  margin-bottom: 20px;
}

.story-content:hover .destination-desc {
  display: block;
}

.story-content:hover .destination-name {
  bottom: 40px;
}

.story-content:hover .destination-overlay {
  height: 60%;
}

.section-title {
  margin-top: 0px;
  font-family: Canaro;
  font-weight: 700;
  line-height: 70px;
}

.section-p {
  max-width: 734px;
}

p {
  font-family: 'Interstate';
  color: rgba(0, 0, 0, 0.70);
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  /* 144.444% */
  letter-spacing: 0.72px;
}

.story-container {
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 16px;
}

@media only screen and (max-width:767px) {

  .location,
  .stories-name,
  .stories-link {
    font-size: 16px;
  }

  .stories-desc {
    font-size: 14px;
  }

  .stories-container {
    display: block;
  }

  .stories-image {
    width: 100%;
    height: 293px;
    gap: 25px;
  }

  .stories-content {
    margin-top: 18px
  }

  .mobile-hidden {
    display: none
  }

  .section-title {
    font-size: 26px
  }

  .section {
    margin: 50px auto;
    padding: 16px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .mobile-hidden {
    display: none
  }

  .section-title {
    font-size: 36px;
  }

  .stories-container {
    display: flex;
    gap: 25px;
  }

  .stories-image {
    min-width: 280px;
    max-width: 280px;
    height: 173px;
  }

  .story-container {
    height: 500px;
  }

}

@media only screen and (min-width:1200px) {
  .page-margin {
    padding: 5rem 10rem;
  }

  .section-title {
    font-size: 46px;
  }

  .stories-container {
    display: flex;
    gap: 25px;
  }

  .stories-image {
    min-width: 280px;
    max-width: 280px;
    height: 173px;
  }

  .story-container {
    height: 100%;
  }
}

.stories-image {
  border-radius: 12px;
  background-size: cover;
}

.section {
  background: white;
  /*max-width: 1440px;*/
}

.location {
  text-align: center;
  font-family: "Interstate";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0.8px;
}

.story-overlay .location {
  color: white
}

.stories-content .location {
  color: black
}

.stories-name {
  color: #000!important;
  font-family: Canaro;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  margin: 18px 0;
}

.stories-desc {
  color: #000;
  font-family: "Interstate";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0.64px;
  margin-bottom: 15px;

}

.stories-link {
  color: #82CF45;
  font-family: Canaro;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  text-decoration: none;
}

.story-link {
  color: white;
  text-decoration: none;
  font-family: Canaro;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
}

.read-more {
  border-radius: 8px;
  border: 1px solid #FF6C0E;
  background: #FF6C0E;
  color: white;
  font-family: "Interstate";
}
</style>
<template>
  <div class="section page-margin">
    <div class="grid">
      <div class="col-12 xl:col-9">
        <h2 class="section-title text-5xl">Stories, Tips, and <span
            style="color: #82cf45;font-style: italic;">Guides</span></h2>
        <p class="section-p font-light">
          Uncover captivating stories, expert tips, and comprehensive guides curated to enhance your travel experiences,
          providing a wealth of knowledge and inspiration for your next adventure.
        </p>
      </div>
    </div>
    <div class="grid">
      <div class="col-12 xl:col-5 mobile-hidden">
        <div class="story-content">
          <a href="https://blog.vibeadventures.com/music-festivals-in-mexico/">
            <div class="story-container"
                 style="background-image:url(/images/stories/music-festivals-mexico.jpg)">
            </div>
          </a>
          <div class="story-overlay">
            <div style="position:relative;height: 100%;padding: 50px;">
              <span class="location font-light">
                <img src="/filter-icons/destinations.svg" /> <a class="text-white" href="https://blog.vibeadventures.com/category/latin-america/mexico/">Mexico</a>
              </span>
              <div class="story-name"><a class="text-white" href="https://blog.vibeadventures.com/music-festivals-in-mexico/">Music Festivals in Mexico: A Traveler’s Guide to Top Music Events</a></div>
              <div class="story-desc interstate-font font-light">
                The music festivals in Mexico are a way to navigate through an ocean of fascinating music. Experience the top music festivals in Mexico!🎵🎆
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 xl:col-7">
        <div class="stories-container" style="margin-bottom: 40px;">
          <a href="https://blog.vibeadventures.com/france-famous-places-to-visit/">
            <div class="stories-image"
                 style="background-image:url(/images/stories/france.jpg)">
            </div>
          </a>
          <div class="stories-content">
            <span class="location interstate-font font-light">
              <img src="/filter-icons/destinations.svg" /> <a class="text-black-alpha-90" href="https://blog.vibeadventures.com/category/europe/france/">France</a>
            </span>
            <h4 class="stories-name text-xl mt-2 mb-0"><a class="text-black-alpha-90" href="https://blog.vibeadventures.com/france-famous-places-to-visit/">France, Famous Places to Visit</a></h4>
            <div class="stories-desc interstate-font font-light">
              Discover France famous places to visit in this in-depth post. From Versailles to the lavender fields, we tell you what to do to know France!
            </div>
          </div>
        </div>
        <div class="stories-container" style="margin-bottom: 40px;">
          <div class="stories-image"
            style="background-image:url(/images/stories/quebec.jpg)">
          </div>
          <div class="stories-content">
            <span class="location interstate-font font-light">
              <img src="/filter-icons/destinations.svg" /> <a class="text-black-alpha-90" href="https://blog.vibeadventures.com/category/north-america/canada/">Canada</a>
            </span>
            <h4 class="stories-name text-xl mt-2 mb-0"><a class="text-black-alpha-90" href="https://blog.vibeadventures.com/christmas-in-quebec/">Christmas in Quebec: Experience a Winter Wonderland in Canada</a></h4>
            <div class="stories-desc interstate-font font-light">
              Dive into the magic of Christmas in Quebec in this post about the wonderful traditions in Canada. Come and find out their traditions!
            </div>
          </div>
        </div>
        <div class="stories-container">
          <div class="stories-image"
            style="background-image:url(/images/stories/ibiza.jpg)">
          </div>
          <div class="stories-content">
            <span class="location interstate-font font-light">
              <img src="/filter-icons/destinations.svg" /> <a class="text-black-alpha-90" href="https://blog.vibeadventures.com/category/europe/spain/">Spain</a>
            </span>
            <h4 class="stories-name text-xl mt-2 mb-0"><a class="text-black-alpha-90" href="https://blog.vibeadventures.com/what-to-do-in-ibiza/">What to Do in Ibiza: Sun-Soaked Adventures on the White Isle</a></h4>
            <div class="stories-desc interstate-font font-light">
              The island has unforgettable experiences, from a culture like Dalt Vila to sunsets — yes, they are just as stunning in Ibiza — this one at Es Vedrà.
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="col-12" style="text-align:center;margin-top:50px;">
    <a href="https://vibeadventures.com/travel-blog/">
      <Button
        label="Read More"
        style="padding: 12px 45px; border-radius: 8px; font-size: 18px;"
        severity="warning"
        class="read-more interstate-font" /></a>
    </div>
  </div>
</template>
<script setup>
import Button from 'primevue/button';
</script>
