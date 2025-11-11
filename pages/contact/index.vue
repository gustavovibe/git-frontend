<template>
  <!-- <div>
    <img class="w-full" src="/public/filter-icons/Background.png" alt="">
  </div> -->
  <div class="hero-image">
  <div class="hero-content">
    <h1 class="title font-semibold mx-5 lg:mx-0">Contact<span class="text-green-vibe"> Us</span> </h1>
  </div>
</div>
  
  <!-- Main container with 70% width and centered -->
  <div class="flex justify-content-center mb-3">
    <div class="p-4 md:w-8"> <!-- w-8 is roughly 70% in PrimeFlex -->
      <!-- Cards Grid -->
      <div class="grid justify-content-center mb-4 canaro-font text-600">
        <!-- Online Form Card -->
        <div class="col-12 md:col-6 lg:col-4 p-2">
          <div 
            class="contact-card"
            :class="{ active: activeTab === 'form' }"
            @click="activeTab = 'form'"
          >
            <div class="text-center">
              <div class="icon mb-3">
                <i class="pi pi-envelope"></i>
              </div>
              <h2>Online Form</h2>
              <h3 class="block mb-3 font-light">
                Submit a request and we will respond via email as soon as possible.
              </h3>
              <h3 class="block mb-2 font-light"><span style="font-weight: bold;">Available:</span> 24/7</h3>
            </div>
          </div>
        </div>

        <!-- Call Card -->
        <div class="col-12 md:col-6 lg:col-4 p-2">
          <div 
            class="contact-card"
            :class="{ active: activeTab === 'call' }"
            @click="activeTab = 'call'"
          >
            <div class="text-center">
              <div class="icon mb-3">
                <i class="pi pi-phone"></i>
              </div>
              <h2>Call</h2>
              <h3 class="block mb-3 font-light">
                Call one of our travel experts.
              </h3>
              <br>
              <h3 class="block mb-2 font-light"><span style="font-weight: bold;">Available:</span> 9:00 AM-11:00 PM (EST)</h3>
            </div>
          </div>
        </div>

        <!-- Chat Card -->
        <div class="col-12 md:col-6 lg:col-4 p-2">
          <div 
            class="contact-card"
            :class="{ active: activeTab === 'chat' }"
            @click="activeTab = 'chat'"
          >
            <div class="text-center">
              <div class="icon mb-3">
                <i class="pi pi-comments"></i>
              </div>
              <h2>Chat</h2>
              <h3 class="block mb-3 font-light">
                Chat with one of our travel experts.
              </h3>
              <br>
              <h3 class="block mb-2 font-light"><span style="font-weight: bold;">Available:</span> 9:00 AM-11:00 PM (EST)</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="grid justify-content-center mt-3">
        <div class="col-12">
          <!-- Form Content -->
          <div 
            v-if="activeTab === 'form'" 
            :class="['tab-content', { active: activeTab === 'form' }]"
          >
            <ContactUsv2 />
          </div>

          <!-- Call Content -->
          <div
            v-if="activeTab === 'call'"
            :class="['tab-content', { active: activeTab === 'call' }]"
            class="px-6 py-4 bg-gray-50 rounded-md canaro-font"
          >
            <h2 class="mb-4 text-3xl font-bold mt-0">Call <span class="green">us</span></h2>

            <div class="grid md:grid-cols-2">
              <div class="flex flex-col md:flex-row items-start md:items-center md:p-3 md:mx-4">
                <div class="green md:mr-4 md:mr-0 sm:mr-2 phone-icon c" >
                  <div class="icon mb-3">
                    <i class="pi pi-phone"></i>
                  </div>
                </div>
                <ul class="list-none p-0 space-y-2 md:space-y-0 md:ml-4 mt-0">
                  <li class="flex items-center my-6">
                      <img src="/usa.png" alt="United States Flag" class="flag-icon mr-2">
                      <a href="tel:+12015001310" class="text-gray-800 hover:underline">
                          +1-201-500-1310
                      </a>
                  </li>

                  <li class="flex items-center my-6">
                      <img src="/uk.png" alt="United Kingdom Flag" class="flag-icon mr-2">
                      <a href="tel:+447440963840" class="text-gray-800 hover:underline">
                          +44-7440-963840
                      </a>
                  </li>

                  <li class="flex items-center my-6">
                      <img src="/mex.png" alt="Mexico Flag" class="flag-icon mr-2">
                      <a href="tel:+525585266910" class="text-gray-800 hover:underline">
                          +52-55-8526-6910
                      </a>
                  </li>
                </ul>
              </div>

              <div class="text-center lg:text-left">
                <p class="font-semibold text-gray-700 mb-3">Mon-Sun:</p>
                <ul class="list-none p-0 mb-6 space-y-2">
                  <li>9:00 AM - 9 PM (EST)</li>
                  <li>8:00 AM - 8 PM (CDT)</li>
                  <li>7:00 AM - 7 PM (MST)</li>
                  <li>6:00 AM - 6 PM (PST)</li>
                </ul>

                <p class="text-gray-600 italic">
                  Support is available in English and Spanish.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ContactUsv2 from '~/components/ContactUsv2.vue';
import { ref } from 'vue';
const { $cxgenie } = useNuxtApp();
const activeTab = ref('form');


watch(activeTab, (newValue) => {
  if(newValue == 'chat'){
    window.openCXGenieChatWidget();
  }	
});
</script>

<style scoped>
.contact-card {
  background-color: #FFF;
  border: 4px solid #CCC;
  border-radius: 4px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 295px;
}

.contact-card.active {
  border-color: #82cf45;
}

.contact-card .icon {
  color: #82cf45;
}

.contact-card h3 {
  margin: 0 0 0.25rem 0;
}

.contact-card small {
  color: #6c757d;
  font-size: 0.875rem;
}

.contact-card .available {
  font-weight: bold;
  margin-top: 0.5rem;
}

.tab-content {
  padding: 1.5rem;
  border: 1px solid #FAFAFA;
  border-radius: 4px;
  background-color: #FAFAFA;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.tab-content.active {
  opacity: 1;
  transform: translateY(0);
}

/* PrimeFlex responsive adjustments */
@media screen and (max-width: 768px) {
  .contact-card {
    height: auto;
    min-height: 250px;
  }

  .contact-card .icon {
    font-size: 3rem;
  }
}
.icon>.pi{
  font-size: 3.5rem;
}
.hero-image {
 
  background-image: url('/images/vibeNobackground.jpg'); 
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 400px; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; 
}

.hero-content {
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 3rem; 
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); 
}
.chat-container{
  margin: 0 auto;
  height: 600px;
  width: 70%;
}
.green {
  color: #82cf45
}
.flag-icon {
  width: 24px;
  height: auto;
  vertical-align: middle; 
}
</style>