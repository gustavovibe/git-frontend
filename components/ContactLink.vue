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

.icon-box {
  background: #82CF45;
  text-align: center;
  padding: 20px;
  border-radius: 16px;
  color: white;
  font-family: 'Interstate';
  height: 100%;
}

.icon-box a {
  color: white;
}

.contact-title {
  font-family: 'Canaro';
  text-align: center;
  display: block;
  width: 100%;
}

.schedule,
.contact-footer {
  font-family: 'Interstate';
  text-align: center
}

.contact-footer {
  font-style: italic;
}

.contact-subtitle {
  font-family: 'Canaro';
}

@media only screen and (max-width:767px) {

  .contact-desc,
  .contact-footer {
    font-size: 14px;
  }

  .contact-subtitle,
  .schedule {
    font-size: 18px;
  }

  .section {
    margin: 50px auto;
  }

  .contact-title {
    font-size: 28px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {

  .contact-desc,
  .contact-footer {
    font-size: 20px;
  }

  .contact-subtitle,
  .schedule {
    font-size: 22px;
  }

  .section {
    margin: 70px auto;
  }

  .contact-title {
    font-size: 38px;
  }
}

@media only screen and (min-width:1200px) {

  .contact-desc,
  .contact-footer {
    font-size: 18px;
  }

  .contact-subtitle,
  .schedule {
    font-size: 24px;
  }


  .contact-title {
    font-size: 48px;
  }
}
</style>

<template>
  <p class="schedule">Mon to Sun : <span>9 am - 9 pm EST</span></p>
  <div class="grid">
    <div class="col-6 lg:col-3">
      <div class="icon-box">
        <img src="/contact-icons/chat.svg" class="contact-icon" />
        <p class="contact-subtitle">Chat With Us</p>
        <p class="contact-desc">
          <a href="https://chatting.page/kvik8bpanziisdn0zm9wqabtuqx14fab" target="_blank" rel="noopener">Chat with
            us</a> during operating hours.
        </p>
      </div>
    </div>
    <div class="col-6 lg:col-3">
      <div class="icon-box">
        <img src="/contact-icons/call.svg" class="contact-icon" />
        <p class="contact-subtitle">Call Us</p>
        <p class="contact-desc">
          <a href="tel:+12015001310">&#x1F1FA;&#x1F1F8; +1-201-500-1310</a><br>
          <a href="tel:+447440963840">&#x1F1EC;&#x1F1E7; +44-7440-963840</a><br>
          <a href="tel:+525585266910">&#x1F1F2;&#x1F1FD; +52-55-8526-6910</a><br>
        </p>
      </div>
    </div>
    <div class="col-6 lg:col-3">
      <div class="icon-box">
        <img src="/contact-icons/whatsapp.svg" class="contact-icon" />
        <p class="contact-subtitle">WhatsApp Us</p>
        <p class="contact-desc">
          <a href="https://api.whatsapp.com/send/?phone=%2B525531086693&text&type=phone_number&app_absent=0"
            target="_blank" rel="noopener">Text us</a> and we'll respond during business hours.
        </p>
      </div>
    </div>
    <div class="col-6 lg:col-3">
      <div class="icon-box">
        <img src="/contact-icons/mail.svg" class="contact-icon" />
        <p class="contact-subtitle">Email Us</p>
        <p class="contact-desc">
          <a href="mailto:hello@vibeadventures.com">Send us an email</a>, and we'll get back to you soon.
        </p>
      </div>
    </div>
  </div>
  <p class="contact-footer">If you call us outside of operating hours, please leave a voice message with your phone
    number, and we will get back to you as soon as possible.</p>
</template>

<script setup></script>