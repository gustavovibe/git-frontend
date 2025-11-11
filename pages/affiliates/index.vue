<template>
  <div style="position: relative;">
    <div class="gradient"></div>
    <div
        class="cover"
        style="
      background-image: url('https://images.pexels.com/photos/951537/pexels-photo-951537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-position: center;
      background-size: cover;
      ">
      <div class="group-affiliate">
        <p class="affiliate-title text-4xl lg:text-5xl mt-0 text-white-alpha-90 canaro-font font-bold mx-3 lg:w-7">Transform your passion into earnings with our travel affiliate program.</p>
        <div class="card">
          <Button label="Become an Affiliate" class="affiliate-button back-orange-vibe mx-3"/>
        </div>
      </div>
    </div>
  </div>
  <div class="mx-5 lg:mx-8">
    <h1 class="interstate-font text-center">Who is our <span class="text-green-vibe">affiliate</span> program for?</h1>
    <p class="text-center text-xl">The Vibe Adventures Affiliate Program is for all travel enthusiasts. Whether you are a blogger, travel professional, or just a passionate traveler, you can earn by promoting our trips. Become a part of our affiliate program and transform your travel passion into earnings!</p>
  </div>
  <br>
</template>

<script setup>
import Button from 'primevue/button';

</script>

<style scoped>
.p-button{
  border-color: #FF6C0F;
}
div.gradient{
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-image: linear-gradient(to top, black 0%, transparent 18rem);
  opacity: 0.7;
}

@media only screen and (max-width:767px){
  .affiliate-title{
    position: relative;
    top: 7rem;
  }
  .cover{
    height: 70vh;
  }
  div.gradient{
    height: 70vh;
  }
  .affiliate-button{
    position: relative;
    top: 8rem;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1199px){
  .affiliate-title{
    position: relative;
    top: 12rem;
  }
  .cover{
    height: 40vh;
  }
  .affiliate-button{
    position: relative;
    top: 10rem;
  }
  div.gradient{
    height: 40vh;
  }
}
@media only screen and (min-width:1200px){
  .cover{
    height: 450px;
  }
  div.gradient{
    height: 450px;
    background-image: linear-gradient(to top, black 0%, transparent 22rem);
  }
  .group-affiliate{
    margin: 0 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 20rem;
  }
}

</style>