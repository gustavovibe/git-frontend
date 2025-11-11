<template>
  <div class="gradient"></div>
  <div
      class="cover"
      style="
        background-image: url('https://images.pexels.com/photos/462023/pexels-photo-462023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
        background-position: center;
        background-size: cover;
      ">
    <h1 class="text-center relative m-0 text-white text-5xl lg:text-7xl canaro-fonnt font-semibold heading">About us</h1>
  </div>
  <div class="main-spacing">
    <Breadcrumb :model="items" class="my-2">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span :style="{ color: item.label === 'Home' ? '#808080' : '#82cf45' }"
                  class="font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Breadcrumb>
    <div class="flex md:flex-row flex-column justify-content-around my-3 mx-2">
      <a href="#story">
        <Button class="my-1 lg:m-0" label="Story" outlined />
      </a>
      <a href="#vibe-adventures">
        <Button class="my-1 lg:m-0" label="What is Vibe Adventures" outlined />
      </a>
      <a href="#mission">
        <Button class="my-1 lg:m-0" label="Mission" outlined />
      </a>
      <a href="#history">
        <Button class="my-1 lg:m-0" label="History" outlined />
      </a>
      <a href="#team">
        <Button class="my-1 lg:m-0" label="Team" outlined />
      </a>
    </div>
    <div>
      <div id="story">
        <h3 class="text-3xl">Our story</h3>
        <p class="text-lg text-justify">Vibe Adventures was founded by <a class="text-green-vibe" href="/about-us/our-team">Alex Veka</a> in 2018 as a small-group tour operator to offer travel experiences beyond the typical tourist destinations , focusing on less-traveled paths. Since then, we’ve expanded from organizing local tours and adventures in Mexico and Central America to becoming an international online travel agency, offering over 20,000 multi-day small-group adventures worldwide. Our platform  seamlessly integrates these tours with flight options, making personalized travel more accessible than ever.</p>
      </div>
      <div id="vibe-adventures" class="flex mt-5 flex-column lg:flex-row lg:align-items-center">
        <div class="mr-0 lg:mr-5">
          <h3 class="text-3xl">What is Vibe Adventures?</h3>
          <p class="text-lg text-justify">Vibe Adventures is a online travel agency offering over <strong>20,000 multi-day adventure vacation packages</strong> worldwide. We provide travelers with seamless, personalized experiences, integrating flights and small-group multi-day adventures into <strong>dynamic packages</strong>.
            Our platform promotes authentic and sustainable travel by partnering with vetted local operators, ensuring each trip is both immersive and responsible.
            With offices in United States and Mexico, Vibe Adventures travel experts are here to support travelers throughout their booking journey, delivering unparalleled customer service and unforgettable adventures.</p>
        </div>
        <div>
          <iframe
              src="https://www.youtube.com/embed/qssyTG-0GPg"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              style="margin: 0 auto"
              class="flex video-vibe"
          >
          </iframe>
        </div>
      </div>
      <div class="vibe-characteristics mt-7 mb-5">
        <div class="flex flex-column md:flex-row justify-content-evenly align-items-center flex-wrap">
          <div class="card-characteristic flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#82cf45" class="bi bi-flag icon-char" viewBox="0 0 16 16">
              <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"/>
            </svg>
            <div class="text-green-vibe text-5xl font-bold">
              2018
            </div>
            <div class="text-3xl">founded</div>
          </div>
          <div class="card-characteristic flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#82cf45" class="bi bi-map" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
            </svg>
            <div class="text-green-vibe text-5xl font-bold">
              20.000 +
            </div>
            <div class="text-3xl">adventures</div>
          </div>
          <div class="card-characteristic flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#82cf45" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
            <div class="text-green-vibe text-5xl font-bold">
              150+
            </div>
            <div class="text-3xl">countries</div>
          </div>
          <div class="card-characteristic flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#82cf45" class="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
            </svg>
            <div class="text-green-vibe text-5xl font-bold">
              <20 people
            </div>
            <div class="text-3xl">small groups only</div>
          </div>
          <div class="card-characteristic flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#82cf45" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
            </svg>
            <div class="text-green-vibe text-5xl font-bold">
              100%
            </div>
            <div class="text-3xl">confirmed trips</div>
          </div>
        </div>
      </div>
      <div id="mission" class="flex flex-column lg:flex-row">
        <div class="m-auto">
          <h5 class="text-green-vibe text-4xl text-center">Vision</h5>
          <div class="text-center font-semibold text-lg">Empower travelers through dynamic vacation packaging</div>
          <p class="text-center text-lg">Vibe Adventures' vision is to help travelers easily and affordably book their dream vacations using dynamic packaging technology that connects travelers with top-tier travel products worldwide, including organized adventures, flights, day tours, accommodations, insurance, and more.</p>
        </div>
        <div class="m-auto">
          <h5 class="text-green-vibe text-4xl text-center">Mission</h5>
          <div class="text-center font-semibold text-lg">Make vacations more adventurous & accessible</div>
          <p class="text-center text-lg">To become a leading provider of adventure vacation packages, making it simple and affordable for travelers to craft their dream holidays with authentic local experiences, while ensuring that booking is always easy, flexible, and hassle-free.</p>
        </div>
      </div>
      <div id="history">
        <h3 class="text-3xl">Our history</h3>
        <div class="card">
          <Carousel
              :value="slides"
              :numVisible="4"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
              circular
              :autoplayInterval="5000"
          >
            <template #item="slotProps">
              <div class="border-1 surface-border border-round m-2 p-3 history-cards">
                <div class="mb-3">
                  <div class="relative mx-auto flex justify-content-center align-items-center">
                    <div v-html="slotProps.data.svg"></div>
                  </div>
                </div>
                <div class="mb-3 font-bold text-center text-white text-3xl">{{ slotProps.data.title }}</div>
                <div class="text-center text-lg text-white">{{ slotProps.data.description }}</div>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
      <div id="team" class="mb-5">
        <h3 class="text-3xl">Our team</h3>
        <div class="card">
          <Carousel
              :value="slidesTeam"
              :numVisible="4"
              :numScroll="1"
              :responsiveOptions="responsiveOptionsTeam"
              circular
              :autoplayInterval="8000"
          >
            <template #item="slotProps">
              <div class="m-2 team-cards">
                <div class="mb-3">
                  <div class="relative mx-auto flex justify-content-center align-items-center">
                    <img :src="slotProps.data.image" style="height: 230px; width: 100%; object-fit: cover; border-radius: 5px" />
                  </div>
                </div>
                <div class="font-bold text-center text-xl">{{ slotProps.data.person }}</div>
                <div class="mb-1 text-center text-sm font-semibold">{{ slotProps.data.title }}</div>
                <div class="text-center text-sm text-justify">{{ slotProps.data.descriptionPerson }}</div>
              </div>
            </template>
          </Carousel>
        </div>
        <a class="no-underline" href="/about-us/our-team">
          <Button class="my-3 lg:flex lg:m-auto md:w-3" label="See all" outlined />
        </a>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import Breadcrumb from 'primevue/breadcrumb';
import Button from "primevue/button";
import Carousel from 'primevue/carousel';
const windowMobile = ref(false);
const checkMobile = () => {
  windowMobile.value = window.innerWidth <= 768;
};
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

const items = ref([
  {
    label: windowMobile.value ? '' : 'Home',
    icon: windowMobile.value ? 'pi pi-home' : '',
    route: '/'
  },
  { label: 'About us', route: '/about-us' }
]);

const slides = ref([
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
          </svg>`,
    title: '2018',
    description: 'Founded as a small-group tour operator.'
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-briefcase" viewBox="0 0 16 16">
            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
          </svg>`,
    title: '2019',
    description: 'Alliance with multiple travel agencies.'
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-virus" viewBox="0 0 16 16">
            <path d="M8 0a1 1 0 0 1 1 1v1.402c0 .511.677.693.933.25l.7-1.214a1 1 0 0 1 1.733 1l-.701 1.214c-.256.443.24.939.683.683l1.214-.701a1 1 0 0 1 1 1.732l-1.214.701c-.443.256-.262.933.25.933H15a1 1 0 1 1 0 2h-1.402c-.512 0-.693.677-.25.933l1.214.701a1 1 0 1 1-1 1.732l-1.214-.7c-.443-.257-.939.24-.683.682l.701 1.214a1 1 0 1 1-1.732 1l-.701-1.214c-.256-.443-.933-.262-.933.25V15a1 1 0 1 1-2 0v-1.402c0-.512-.677-.693-.933-.25l-.701 1.214a1 1 0 0 1-1.732-1l.7-1.214c.257-.443-.24-.939-.682-.683l-1.214.701a1 1 0 1 1-1-1.732l1.214-.701c.443-.256.261-.933-.25-.933H1a1 1 0 1 1 0-2h1.402c.511 0 .693-.677.25-.933l-1.214-.701a1 1 0 1 1 1-1.732l1.214.701c.443.256.939-.24.683-.683l-.701-1.214a1 1 0 0 1 1.732-1l.701 1.214c.256.443.933.261.933-.25V1a1 1 0 0 1 1-1m2 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0M6 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m5-3a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/>
          </svg>`,
    title: '2020',
    description: 'Surviving pandemic, free walking and virtual tours.'
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-person-arms-up" viewBox="0 0 16 16">
            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
            <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z"/>
          </svg>`,
    title: '2021',
    description: 'Recovered. launching new tours and destinations.'
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-bag-heart" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
          </svg>`,
    title: '2022',
    description: 'Online travel agency, publishing new operators.'
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-sun" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
          </svg>`,
    title: '2023',
    description: 'Diversification of product offering.'
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#fff" class="bi bi-bus-front-fill" viewBox="0 0 16 16">
            <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1"/>
          </svg>`,
    title: '2024',
    description: 'Dynamic packages for organized adventures.'
  }
]);

const slidesTeam = ref([
  {
    image: '/images/team/AlexVeka.png',
    person: 'Alex Veka',
    title: 'Founder & CEO',
    descriptionPerson: 'Armed with a Ms. and Ph.D. in international tourism, Alex brings 15+ years of travel industry expertise. Since founding Vibe Adventures in 2018, he has leveraged his marketing and business development skills to drive strategic growth and expansion.'
  },
  {
    image: '/images/team/GustavoMenchaca.png',
    person: 'Gustavo Menchaca',
    title: 'Head of Technology',
    descriptionPerson: 'Gustavo, a full-stack developer with 10+ years of experience, leads Vibe Adventures’ tech team and plays a pivotal role in product development and automating internal processes, ensuring resource optimization and operational efficiency.'
  },
  {
    image: '/images/team/XimenaLuna.jpg',
    person: 'Ximena Luna',
    title: 'Customer Success Manager',
    descriptionPerson: 'Meticulous and passionate about customer satisfaction, Ximena leads customer success at Vibe Adventures. Her background in the travel industry and deep love for travel enable her to deliver exceptional support, consistently elevating the customer experience.'
  },
  {
    image: '/images/team/SalmaAguilar.png',
    person: 'Salma Aguilar',
    title: 'Travel Product Manager',
    descriptionPerson: 'With a tourism management background, Salma ensures top product quality and expands our offerings. Her expertise guarantees diverse services tailored to our customers\' evolving needs, enhancing their experience.'
  },
  {
    image: '/images/team/AdamGonzalez.jpg',
    person: 'Adan Gonzalez',
    title: 'Full-Stack Developer & Data Analyst',
    descriptionPerson: 'An experienced full-stack developer specializing in creating and managing complex systems, Adan is also a data analyst who implements AI technologies for sales forecasting and inventory planning.'
  },
  {
    image: '/images/team/YaraVega.png',
    person: 'Yara Hernández',
    title: 'Frontend Developer & Designer',
    descriptionPerson: 'A front-end developer with solid web design skills, Yara manages the style and UI of our website. Her passion for programming and creativity and her hardworking and perfectionist nature ensure exceptional user experiences on our platform.'
  },
  {
    image: '/images/team/AntonioMartinez.jpeg',
    person: 'Antonio Martínez',
    title: 'Tour Content Manager & SEO Specialist',
    descriptionPerson: 'With a background in Hispanic languages and literature, Antonio is in charge of the platform\'s tour and destination pages. As an expert in copywriting and SEO, he excels at crafting engaging content and optimizing platform visibility.'
  },
  {
    image: '/images/team/MarianaMontes.png',
    person: 'Mariana Montes',
    title: 'Blog Content Manager & SEO Specialist',
    descriptionPerson: 'Certified in translation and interpretation for English and French, Mariana\'s true passion is creative writing. She crafts engaging, valuable, and entertaining content for our audience and optimizes it for better SEO performance.'
  },
  {
    image: '/images/team/SebGarrido.jpeg',
    person: 'Sebastián Garrido',
    title: 'PR & Community Manager',
    descriptionPerson: 'Sebastian is a PR & Community Manager with 4+ years of experience in journalism and media. Skilled in speech, video creation, and multilingual communication, he manages community engagement at Vibe Adventures, crafting compelling digital content.'
  },
  {
    image: '/images/team/JackFischl.png',
    person: 'Jack Fischl',
    title: 'Marketing & Operations Advisor',
    descriptionPerson: 'Jack, a seasoned marketing manager and former co-founder and COO of Keteka, a VC-backed marketplace for community-driven travel experiences, now enhances Vibe Adventures\' marketing and operations with his strategic insights and industry expertise.'
  },
  {
    image: '/images/team/AmeliaLeigner.png',
    person: 'Amelia Leigner',
    title: 'Product Development & Go-to-Market Advisor',
    descriptionPerson: 'With expertise in product innovation and go-to-market strategy, Amelia leverages her experience across various tech companies to help Vibe Adventures develop and launch a unique travel platform that resonates with users and meets market demands.'
  }
]);


const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 4,
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
const responsiveOptionsTeam = ref([
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>


<style scoped>
div.gradient{
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.7;
}
.p-breadcrumb {
  border: none;
}
.p-button.p-button-outlined {
  color: #82cf45!important;
  border: 1px solid;
  width: -webkit-fill-available;
}
.p-button.p-button-outlined:hover {
  color: #fff!important;
  background-color: #82cf45!important;
  border: 1px solid;
}
.p-button:focus {
  box-shadow: none !important;
}
.video-vibe{
  border-radius: 20px;
}
.card-characteristic{
  width: 195px;
  min-width: 190px;
}
.history-cards{
  background-color: #82cf45;
}
:deep(.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button) {
  background-color: #ff6c0e;
}
.team-cards{
  height: 400px;
}


@media only screen and (max-width:767px){
  .cover{
    height: 50vh;
  }
  div.gradient{
    width: 100%;
    height: 50vh;
    position: absolute;
    top: 5rem;
    bottom: 0;
    background-color: black;
    opacity: 0.1;
  }
  .heading{
    top: 10rem;
  }
  .video-vibe{
    width: 100%;
    height: 275px;
  }
  .card-characteristic{
    margin: 1rem 0;
  }
  .history-cards{
    height: 260px;
    min-height: 260px!important;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px){
  .cover{
    height: 40vh;
  }
  div.gradient{
    width: 100%;
    height: 40vh;
    position: absolute;
    top: 5rem;
    bottom: 0;
    background-color: black;
    opacity: 0.1;
  }
  .heading{
    top: 8rem;
  }
  .video-vibe{
    width: 560px;
    height: 275px;
  }
  .history-cards{
    height: 260px;
    min-height: 260px!important;
  }
}
@media only screen and (min-width:1200px){
  .cover{
    height: 450px;
  }
  div.gradient{
    width: 100%;
    height: 440px;
    position: absolute;
    top: 5rem;
    bottom: 0;
    background-color: black;
    opacity: 0.1;
  }
  .heading{
    top: 13rem;
  }
  .video-vibe{
    width: 460px;
    height: 255px;
  }
  .history-cards{
    height: 230px;
    min-height: 230px!important;
  }
}
</style>
