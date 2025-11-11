<style>
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

.newsletter-container {
  padding: 24px;
  background-color: #82cf45;
  color: #fff;
}

.newsletter-title {
  color: #FFF;
  font-family: 'Canaro';
  font-style: normal;
  font-weight: 700;
}

.newsletter-desc {
  color: #FFF;
  font-family: "Interstate";
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.72px;
}

.newsletter-background {
  background-color: #82cf45;
  border-radius: 12px;
}

.newsletter-image {
  width: 100%;
  height: 100%;
  border-radius: 16px
}

@media only screen and (max-width:767px) {
  .newsletter-container {
    border-radius: 0 0px 16px 16px;
  }

  .newsletter-title {
    font-size: 24px;
    margin-top: 24px
  }

  .newsletter-desc,
  .newsletter-mail {
    font-size: 14px;
  }

  .newsletter-mail {
    width: 180px;
  }

  .section {
    margin: 50px auto;
    padding: 16px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .newsletter-container {
    border-radius: 0 10px 10px 0px
  }

  .newsletter-title {
    font-size: 36px;
    margin-top: 50px;
  }

  .newsletter-desc,
  .newsletter-mail {
    font-size: 16px;
  }

  .newsletter-mail {
    width: 250px;
  }

  .section {
    margin: 70px auto;
    padding: 0px 1%;
  }
}

@media only screen and (min-width:1200px) {
  .page-margin {
    padding: 1rem 10rem;
  }

  .newsletter-container {
    border-radius: 16px;
  }

  .newsletter-desc,
  .newsletter-mail {
    font-size: 16px;
  }

  .newsletter-mail {
    width: 300px;
  }

  .section {
    padding: 5rem 10rem;
  }
}

#new-susbscriber {
  border-radius: 8px;
  border: 1px solid #FF6C0E;
  background: #FFF;
  display: flex;
}

.newsletter-form {
  padding: 9px;
  display: flex;
  background: white;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid orange;
}

.subscribe {
  background-color: #FF6C0E;
  border: #FF6C0E;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
}

.terms {
  text-decoration: underline;
  color: white;
}

.newsletter-mail {
  border: none;
}

.section {
  background: white;
}
</style>

<template>
  <!-- Falta optimizar para telefono y tablet -->
  <div style="max-width: 1240px; margin: 0 auto">
    <div class="grid newsletter-background">
      <div class="col-12 md:col-7 newsletter-container" style="height: 15rem;">
          <h2 class="newsletter-title text-5xl my-0 md:mt-5">Sign Up <span class="font-light text-900">For Our Newsletter</span></h2>
          <p class="newsletter-desc text-base my-0 md:my-2">Stay ahead of the travel curve with the latest trends, exclusive deals, and insider tips — straight to your inbox</p>
      </div>
      <div class="col-12 md:col-5">
        <form id="new_subscriber" class="newsletter-form my-0 md:mt-7 mx-3 md:mx-0" action="https://vibeadventures.ipzmarketing.com/f/k_KL8d4Kgqg" accept-charset="UTF-8" method="post">
          <input style="outline: none;" class="newsletter-mail" required="required" aria-required="true"
                 placeholder="Enter your email address" type="email" name="subscriber[email]" id="subscriber_email">
          <Button :disabled="!termsAccepted" label="Subscribe" severity="warning" class="subscribe interstate-font" type="submit" name="commit" value="Enviar"
                  :style="{padding: '0.6rem 1rem', backgroundColor: '#FF6C0E', border: 'none', cursor: termsAccepted ? 'pointer' : 'not-allowed'}" />
        </form>
        <p class="newsletter-desc text-base mx-3 md:mx-0"><input type="checkbox" id="accept_terms" v-model="termsAccepted"> I have read and accept the  <a href="https://vibeadventures.com/privacy-policy-2/" target="_blank" rel="noopener" class="terms">Privacy policy</a>.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';

const termsAccepted = ref(false);
</script>
