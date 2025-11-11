<template>
  <div class="main-spacing">
    <Breadcrumb :model="items" class="my-2">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span :style="{ color: item.label === 'Our team' ? '#82cf45' : '#808080' }"
                  class="font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Breadcrumb>
    <h1 class="text-center text-6xl">Our team</h1>
    <div class="description">
      <p class="text-xl text-gray-500 text-center">Vibe Adventures is run by a team of passionate travelers & tourism professionals who know what real adventures are. Coming from different backgrounds, we are strongly united by our common <a href="/about-us#mission" class="text-gray-800">mission</a>:</p>
      <p class="text-xl text-gray-500 text-center font-italic">To simplify and make travel affordable, offering authentic local experiences with flexible, hassle-free booking for dream holidays.</p>
    </div>
    <div class="flex flex-wrap flex-column md:flex-row mb-8">
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/AlexVeka.png');"></div>
          <div class="m-3">
            <h4 class="my-1 text-lg">Alex Veka</h4>
            <p class="m-0">Founder & CEO</p>
            <p class="text-justify">Armed with a Ms. and Ph.D. in international tourism, Alex brings 15+ years of travel industry expertise. Since founding Vibe Adventures in 2018, he has leveraged his marketing and business development skills to drive strategic growth and expansion.</p>
          </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/GustavoMenchaca.png');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Gustavo Menchaca</h4>
          <p class="m-0">Head of Technology</p>
          <p class="text-justify">Gustavo, a full-stack developer with 10+ years of experience, leads Vibe Adventures’ tech team and plays a pivotal role in product development and automating internal processes, ensuring resource optimization and operational efficiency.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/XimenaLuna.jpg');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Ximena Luna</h4>
          <p class="m-0">Customer Success Manager</p>
          <p class="text-justify">Meticulous and passionate about customer satisfaction, Ximena leads customer success at Vibe Adventures. Her background in the travel industry and deep love for travel enable her to deliver exceptional support, consistently elevating the customer experience.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/SalmaAguilar.png');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Salma Aguilar</h4>
          <p class="m-0">Travel Product Manager</p>
          <p class="text-justify">With a tourism management background, Salma ensures top product quality and expands our offerings. Her expertise guarantees diverse services tailored to our customers' evolving needs, enhancing their experience.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/AdamGonzalez.jpg');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Adan Gonzalez</h4>
          <p class="m-0">Full-Stack Developer & Data Analyst</p>
          <p class="text-justify">An experienced full-stack developer specializing in creating and managing complex systems, Adan is also a data analyst who implements AI technologies for sales forecasting and inventory planning.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/YaraVega.png');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Yara Hernández</h4>
          <p class="m-0">Frontend Developer & Designer</p>
          <p class="text-justify">A front-end developer with solid web design skills, Yara manages the style and UI of our website. Her passion for programming and creativity and her hardworking and perfectionist nature ensure exceptional user experiences on our platform.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/AntonioMartinez.jpeg');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Antonio Martínez</h4>
          <p class="m-0">Tour Content Manager & SEO Specialist</p>
          <p class="text-justify">With a background in Hispanic languages and literature, Antonio is in charge of the platform's tour and destination pages. As an expert in copywriting and SEO, he excels at crafting engaging content and optimizing platform visibility.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/MarianaMontes.png');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Mariana Montes</h4>
          <p class="m-0">Blog Content Manager & SEO Specialist</p>
          <p class="text-justify">Certified in translation and interpretation for English and French, Mariana's true passion is creative writing. She crafts engaging, valuable, and entertaining content for our audience and optimizes it for better SEO performance.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/SebGarrido.jpeg');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Sebastián Garrido</h4>
          <p class="m-0">PR & Community Manager</p>
          <p class="text-justify">Sebastian is a PR & Community Manager with 4+ years of experience in journalism and media. Skilled in speech, video creation, and multilingual communication, he manages community engagement at Vibe Adventures, crafting compelling digital content.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/JackFischl.png');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Jack Fischl</h4>
          <p class="m-0">Marketing & Operations Advisor</p>
          <p class="text-justify">Jack, a seasoned marketing manager and former co-founder and COO of Keteka, a VC-backed marketplace for community-driven travel experiences, now enhances Vibe Adventures' marketing and operations with his strategic insights and industry expertise.</p>
        </div>
      </div>
      <div class="card">
        <div class="team-img" style="background-image: url('/images/team/AmeliaLeigner.png');"></div>
        <div class="m-3">
          <h4 class="my-1 text-lg">Amelia Leigner</h4>
          <p class="m-0">Product Development & Go-to-Market Advisor</p>
          <p class="text-justify">With expertise in product innovation and go-to-market strategy, Amelia leverages her experience across various tech companies to help Vibe Adventures develop and launch a unique travel platform that resonates with users and meets market demands.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "primevue/breadcrumb";
import {ref, onMounted} from "vue";

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
  { label: 'About us', route: '/about-us' },
  { label: 'Our team', route: '/our-team' }
]);
</script>

<style scoped>
.p-breadcrumb {
  border: none;
}
.team-img{
  background-size: cover;
  background-position: center;
  height: 250px;
  width: 100%;
}
.card{
  border: 1px solid var(--gray-200);
  margin: 1rem;
  border-radius: 5px;
}
@media only screen and (max-width:767px){
  .card{
    width: calc((100%) - 2rem);
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px){
  .card{
    width: calc((100%/3) - 2rem);
  }
}
@media only screen and (min-width:1200px){
  .description{
    max-width: 40%;
    margin: auto;
  }
  .card{
    width: calc((100%/4) - 2rem);
  }
}
</style>
