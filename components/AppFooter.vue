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

.footer {
  background: black
}

.footer-title {
  color: #82CF45;
  margin-bottom: 5px;
  font-family: 'Canaro';
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  text-align: left;
}

.footer-grid {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-link {
  color: #FFF;
  font-family: "Interstate";
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.88px;
  display: block;
}

.support-image {
  height: auto;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.payment-image {
  width: 100%;
  /*height: 70px;*/
  background: white;
  border-radius: 8px;
}

.phone-num{
  text-decoration: none;
}

@media only screen and (max-width:767px) {
  .footer-title {
    font-size: 18px
  }

  .footer-link {
    font-size: 12px;
  }

  .support-image {
    width: 45%;
    border-radius: 4px;
    margin-right: 3%;
  }

  .gap-right {
    padding-right: 0px;
  }

  .support-images {
    display: flex;
  }

  .footer-end {
    display: block;
  }

  .desktop-hidden {
    display: block
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .footer-title {
    font-size: 18px
  }

  .footer-link {
    font-size: 14px;
    margin-top: 10px;
  }

  .support-image {
    width: 75%;
  }

  .gap-right {
    padding-right: 50px;
  }

  .support-images {
    display: block
  }

  .footer-end {
    display: flex;
    justify-content: space-between;
  }

  .desktop-hidden {
    display: none
  }
}

@media only screen and (min-width:1200px) {
  .footer-title {
    font-size: 20px
  }

  .footer-link {
    font-size: 16px;
    margin-top: 12px;
  }

  .support-image {
    width: 65%;
    height: auto;
  }

  .gap-right {
    padding-right: 70px;
  }

  .support-images {
    display: block
  }

  .footer-end {
    display: flex;
    justify-content: space-between;
  }

  .desktop-hidden {
    display: none
  }
}

.footer-company {
  padding: 12px
}

.footer-terms {
  display: flex;
  justify-content: space-between;
  padding: 12px
}

.social-grid col {
  text-align: center
}

.social-link {
  width: 100%;
  display: block;
  text-align: center;
}

hr {
  width: 95%;
  margin-left: 0;
}
.scroll-button {
  position: fixed;
  bottom: 80px;
  right: 27px;
  width: 60px;
  height: 130px;
  border: 2px solid #8DD636;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8DD636;
  cursor: pointer;
  transition: transform 0.3s;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
}

.scroll-button:hover {
  transform: scale(1.1);
}

.scroll-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-size: 20px;
  margin-top: 8px;
  font-weight: bold;
}
@media only screen and (max-width: 600px) {
  .scroll-button{
    bottom: 80px;
    right: 15px;
    width: 50px;
  }
  .footer-link{
    font-size: 16px;
  }
}
</style>

<template>
  <div class="scroll-button" v-show="showScrollButton" @click="scrollToTop">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#8DD636" stroke-width="1.5" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z"/>
      <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
    </svg>
    <span class="scroll-text">up</span>
  </div>
  <div class="footer">
    <div class="grid footer-grid">
      <div class="col-12 md:col-6 lg:col-3 gap-right text-center md:text-left lg:text-left">
        <h5 class="footer-title">Company</h5>
        <hr>
        <div class="grid">
          <div class="col-6 flex flex-column align-items-start">
            <a class="footer-link mt-4 lg:mt-3" href="/about-us">About us</a>
            <a class="footer-link mt-5 lg:mt-4" href="https://blog.vibeadventures.com/">Blog</a>
            <a class="footer-link mt-5 lg:mt-4" href="/affiliates">Affiliates</a>
          </div>
          <div class="col-6 flex flex-column align-items-start">
            <a class="footer-link mt-4 lg:mt-3" href="/faqs">FAQ</a>
            <a class="footer-link underline mt-5 lg:mt-4" @click.prevent="contact = true">Contact us</a>
          </div>
        </div>
        <Dialog v-model:visible="contact" dismissableMask modal>
          <template #header>
            <div class="contact-title">
              Get In <span style="color: #82cf45; font-style: italic">Touch</span>
            </div>
          </template>
          <contactlink />
        </Dialog>
      </div>
      <div class="col-12 md:col-6 lg:col-3 gap-right text-center md:text-left lg:text-left">
        <h5 class="footer-title">Customer Support</h5>
        <hr>
        <div class="grid mb-4">
          <div class="col-5 lg:col-3" style="align-self: center; display: flex; justify-content: center;">
            <svg class="phone" width="34" height="34" viewBox="0 0 34 34" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M8.24306 16.4478C9.24881 18.2632 10.407 20.0066 11.9158 21.5974C13.4243 23.1971 15.3013 24.6531 17.7348 25.8936C17.9143 25.9833 18.085 25.9833 18.2375 25.9205C18.471 25.8308 18.7045 25.6419 18.9381 25.4082C19.1176 25.2285 19.342 24.9408 19.5758 24.6262C20.5096 23.3948 21.6684 21.8671 23.3025 22.6311C23.3385 22.6488 23.3656 22.6671 23.4013 22.6848L28.852 25.8213C28.87 25.8302 28.8882 25.8485 28.9059 25.8573C29.6245 26.3516 29.9205 27.1156 29.9294 27.9784C29.9294 28.8593 29.6062 29.8475 29.1303 30.6835C28.5017 31.7889 27.5767 32.5169 26.5079 33.0023C25.4933 33.4697 24.3617 33.7214 23.2748 33.8831C21.5688 34.1346 19.9704 33.9729 18.3357 33.4697C16.7373 32.9757 15.1298 32.1577 13.3698 31.0703L13.2441 30.9892C12.436 30.4861 11.5649 29.9467 10.7119 29.309C7.57763 26.945 4.38993 23.53 2.31534 19.7732C0.573055 16.6187 -0.378744 13.2125 0.142255 9.96801C0.429732 8.18862 1.19283 6.57094 2.52203 5.50154C3.68051 4.56698 5.24295 4.05443 7.26331 4.23442C7.49684 4.25214 7.70324 4.38727 7.81115 4.58471L11.3043 10.4983C11.8165 11.1634 11.879 11.8194 11.6006 12.4754C11.3671 13.0148 10.9003 13.5091 10.2626 13.9762C10.0742 14.1379 9.84977 14.2996 9.61625 14.4705C8.83489 15.0367 7.9459 15.6927 8.25108 16.4658L8.24306 16.4478ZM29.8597 4.98428C30.5774 4.98428 31.159 5.56661 31.159 6.28462C31.159 7.00264 30.5771 7.58497 29.8597 7.58497C29.1422 7.58497 28.5604 7.00264 28.5604 6.28462C28.5604 5.56661 29.142 4.98428 29.8597 4.98428ZM20.9451 4.97957C21.6645 4.97957 22.2475 5.56301 22.2475 6.28268C22.2475 7.00236 21.6645 7.58552 20.9451 7.58552C20.2258 7.58552 19.6436 7.00236 19.6436 6.28268C19.6436 5.56301 20.226 4.97957 20.9451 4.97957ZM25.5622 4.97957C26.2816 4.97957 26.8646 5.56301 26.8646 6.28268C26.8646 7.00236 26.2816 7.58552 25.5622 7.58552C24.8428 7.58552 24.2604 7.00236 24.2604 6.28268C24.2604 5.56301 24.8428 4.97957 25.5622 4.97957ZM20.2022 0C19.2289 0 18.3963 0.342808 17.7035 1.02842C17.0107 1.71404 16.6759 2.54752 16.6759 3.52942V9.72322C16.6759 10.7048 17.0181 11.5383 17.7035 12.2242C18.3886 12.9098 19.2214 13.2524 20.2022 13.2524H23.0997C22.8974 14.0313 22.6481 14.7715 22.3369 15.4648C22.0331 16.1662 21.5118 16.8361 20.7955 17.4749C22.1733 17.1166 23.3955 16.5791 24.4776 15.8699C25.5522 15.1688 26.4863 14.2885 27.2569 13.2521H30.4736C31.447 13.2521 32.2798 12.9015 32.9727 12.2239C33.6655 11.5381 34 10.7046 34 9.72295V3.52942C34 2.55527 33.6577 1.72179 32.9727 1.02842C32.287 0.335054 31.4545 0 30.4734 0C27.3435 0 23.3321 0 20.2022 0Z"
                  fill="white" />
            </svg>
          </div>
					<div class="col-7 lg:col-9 flex flex-column justify-content-center">
            <a href="tel:+12015001310" class="flex text-white text-lg phone-num" style="margin-top: 12px">🇺🇸<span class="underline pl-2">+1-201-500-1310</span></a>
            <a href="tel:+447440963840" class="flex text-white text-lg phone-num" style="margin-top: 12px">🇬🇧<span class="underline pl-2">+44-7440-963840</span></a>
            <a href="tel:+525585266910" class="flex text-white text-lg phone-num" style="margin-top: 12px">🇲🇽<span class="underline pl-2">+52-55-8526-6910</span></a>
          </div>
        </div>
        <a class="footer-link">Mon-Sun: <br class="desktop-hidden">9:00 a.m. - 11 p.m. (EST)</a>
      </div>
      <div class="col-12 md:col-6 lg:col-3 gap-right">
        <h5 class="footer-title">Supporting</h5>
        <hr>
        <div class="support-images flex flex-column flex-wrap align-content-center">
          <img src="/images/support-footer-1.png" class="support-image mt-4">
          <img src="/images/support-footer-2.png" class="support-image mt-4">
          <img src="/images/support-footer-3.jpg" class="support-image mt-4">
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <h5 class="footer-title">Follow us</h5>
        <hr>
        <div class="grid social-grid mt-4">
          <div class="col">
            <a href="https://www.facebook.com/VibeAdventures" target="_blank" rel="noopener" class="social-link">
              <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M3.378 22V11.965H0V8.054H3.378V5.17C3.378 1.823 5.423 0 8.41 0C9.84 0 11.07 0.107 11.428 0.154V3.652L9.357 3.653C7.733 3.653 7.418 4.424 7.418 5.557V8.054H11.292L10.787 11.964H7.418V22"
                      fill="white" />
              </svg>
            </a>
          </div>
          <div class="col">
            <a href="https://www.instagram.com/vibe.adventures" target="_blank" rel="noopener" class="social-link">
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.4742 11C15.4742 8.9375 13.8242 7.2875 11.7617 7.2875C9.69922 7.2875 8.04922 8.9375 8.04922 11C8.04922 13.0625 9.69922 14.7125 11.7617 14.7125C13.8242 14.7125 15.4742 13.0625 15.4742 11ZM17.3992 11C17.3992 14.1625 14.9242 16.6375 11.7617 16.6375C8.59922 16.6375 6.12422 14.1625 6.12422 11C6.12422 7.8375 8.59922 5.3625 11.7617 5.3625C14.9242 5.3625 17.3992 7.8375 17.3992 11ZM18.9117 5.0875C18.9117 5.9125 18.3617 6.4625 17.5367 6.4625C16.7117 6.4625 16.1617 5.9125 16.1617 5.0875C16.1617 4.2625 16.7117 3.7125 17.5367 3.7125C18.3617 3.7125 18.9117 4.4 18.9117 5.0875ZM11.7617 1.925C10.1117 1.925 6.67422 1.7875 5.29922 2.3375C4.33672 2.75 3.51172 3.575 3.23672 4.5375C2.68672 5.9125 2.82422 9.35 2.82422 11C2.82422 12.65 2.68672 16.0875 3.23672 17.4625C3.51172 18.425 4.33672 19.25 5.29922 19.525C6.67422 20.075 10.2492 19.9375 11.7617 19.9375C13.2742 19.9375 16.8492 20.075 18.2242 19.525C19.1867 19.1125 19.8742 18.425 20.2867 17.4625C20.8367 15.95 20.6992 12.5125 20.6992 11C20.6992 9.4875 20.8367 5.9125 20.2867 4.5375C20.0117 3.575 19.1867 2.75 18.2242 2.475C16.8492 1.7875 13.4117 1.925 11.7617 1.925ZM22.7617 11V15.5375C22.7617 17.1875 22.2117 18.8375 20.9742 20.2125C19.7367 21.45 18.0867 22 16.2992 22H7.22422C5.57422 22 3.92422 21.45 2.54922 20.2125C1.40167 18.9252 0.765727 17.262 0.761719 15.5375V6.4625C0.761719 4.675 1.44922 3.025 2.54922 1.7875C3.92422 0.6875 5.57422 0 7.22422 0H16.2992C17.9492 0 19.5992 0.55 20.9742 1.7875C22.1218 3.07477 22.7577 4.738 22.7617 6.4625V11Z"
                    fill="white" />
              </svg>
            </a>
          </div>
          <div class="col">
            <a href="https://www.youtube.com/channel/UCQ9qyA-fVkdXarHBlzDCUBA?view_as=subscriber" target="_blank"
               rel="noopener" class="social-link">
              <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.8617 15.8245V7.21148L20.928 11.4311L12.8617 15.8245ZM30.817 5.12808C30.817 5.12808 30.52 3.02048 29.6103 2.09208C28.4553 0.875481 27.1617 0.868881 26.5677 0.798481C22.3195 0.488281 15.9472 0.488281 15.9472 0.488281H15.934C15.934 0.488281 9.56172 0.488281 5.31352 0.798481C4.71952 0.868881 3.42592 0.875481 2.27092 2.09318C1.36122 3.02158 1.06422 5.12918 1.06422 5.12918C1.06422 5.12918 0.761719 7.60418 0.761719 10.0792V12.4002C0.761719 14.8752 1.06422 17.3491 1.06422 17.3491C1.06422 17.3491 1.36122 19.4567 2.27092 20.3851C3.42592 21.6028 4.94392 21.5643 5.61822 21.6919C8.04702 21.9273 15.9406 21.9999 15.9406 21.9999C15.9406 21.9999 22.3195 21.9889 26.5677 21.6809C27.1617 21.6094 28.4553 21.6039 29.6103 20.3851C30.5211 19.4567 30.817 17.3491 30.817 17.3491C30.817 17.3491 31.1195 14.8741 31.1195 12.3991V10.0781C31.1195 7.60308 30.817 5.12808 30.817 5.12808Z"
                      fill="white" />
              </svg>

            </a>
          </div>
          <div class="col">
            <a href="https://twitter.com/vibe_adventures" target="_blank" rel="noopener" class="social-link">
              <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.5207 9.316L21.7117 0H19.7717L12.6597 8.089L6.97973 0H0.429734L9.01773 12.231L0.427734 22H2.36973L9.87973 13.458L15.8767 22H22.4287L13.5207 9.316ZM10.8627 12.339L9.99273 11.121L3.06873 1.43H6.04873L11.6377 9.25L12.5077 10.469L19.7717 20.635H16.7897L10.8627 12.339Z"
                    fill="white" />
              </svg>
            </a>
          </div>
          <div class="col">
            <a href="https://www.pinterest.com/vibe_adventures/" target="_blank" rel="noopener" class="social-link">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5.07771 21.4975C5.63071 20.5975 6.45771 19.1195 6.76471 17.9415C6.92971 17.3065 7.60971 14.7165 7.60971 14.7165C8.05171 15.5595 9.34471 16.2735 10.7197 16.2735C14.8127 16.2735 17.7617 12.5115 17.7617 7.83549C17.7617 3.35349 14.1047 0.000488281 9.39571 0.000488281C3.53971 0.000488281 0.428711 3.93049 0.428711 8.21049C0.428711 10.2005 1.48871 12.6765 3.18371 13.4655C3.44071 13.5855 3.57871 13.5325 3.63771 13.2845C3.68271 13.0955 3.91171 12.1745 4.01471 11.7455C4.03398 11.6781 4.03544 11.6068 4.01897 11.5386C4.0025 11.4704 3.96864 11.4077 3.92071 11.3565C3.35971 10.6765 2.91071 9.42649 2.91071 8.26049C2.91071 5.26849 5.17671 2.37349 9.03771 2.37349C12.3717 2.37349 14.7067 4.64449 14.7067 7.89349C14.7067 11.5625 12.8527 14.1055 10.4407 14.1055C9.10871 14.1055 8.11071 13.0035 8.43071 11.6535C8.81471 10.0405 9.55471 8.30049 9.55471 7.13649C9.55471 6.09449 8.99571 5.22549 7.83771 5.22549C6.47671 5.22549 5.38271 6.63349 5.38271 8.52049C5.38271 9.72149 5.78871 10.5345 5.78871 10.5345C5.78871 10.5345 4.44371 16.2185 4.19671 17.2775C3.92471 18.4495 4.03171 20.0955 4.14971 21.1695C4.14971 21.1695 4.11971 21.8715 4.41171 21.9855C4.70471 22.1005 5.07771 21.4975 5.07771 21.4975Z"
                      fill="white" />
              </svg>
            </a>
          </div>
          <div class="col">
            <a href="https://www.tiktok.com/@vibeadventures" target="_blank" rel="noopener" class="social-link">
              <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.7201 5.51103C17.55 5.51072 16.4141 5.11644 15.4955 4.39174C14.4374 3.55699 13.7169 2.36764 13.467 1.04318C13.4013 0.700416 13.3667 0.352409 13.3638 0.00341797L9.90485 0.00341797V9.81728L9.90062 15.1929C9.90062 16.6295 8.99973 17.8486 7.75032 18.2767C7.32319 18.4232 6.86877 18.4727 6.42012 18.4214C5.97147 18.3702 5.53988 18.2196 5.15676 17.9806C4.69277 17.6887 4.30946 17.2851 4.04195 16.8066C3.77444 16.3281 3.63131 15.7901 3.62567 15.242C3.60029 13.4247 5.01465 11.9425 6.76399 11.9425C7.10827 11.9425 7.44072 12.0017 7.75032 12.1075V8.46111C7.42295 8.41119 7.09051 8.38496 6.75299 8.38496C4.8387 8.38496 3.0496 9.21153 1.76974 10.6997C0.795351 11.8395 0.22051 13.2669 0.132907 14.764C0.0153257 16.7411 0.712355 18.6201 2.06327 20.0068C2.26121 20.2098 2.46931 20.3993 2.68755 20.5736C3.84032 21.499 5.27483 22.0023 6.75299 22C7.62863 21.9995 8.49519 21.8226 9.30104 21.4801C10.1069 21.1375 10.8355 20.6361 11.4436 20.0059C12.6901 18.7252 13.3871 17.0081 13.3858 15.2208L13.368 7.19376C13.961 7.66928 14.614 8.06467 15.3102 8.36974C16.3955 8.8452 17.5459 9.08632 18.7302 9.08547V5.51103C18.7311 5.51187 18.7218 5.51103 18.7201 5.51103Z"
                    fill="white" />
              </svg>
            </a>
          </div>
        </div>
        <h5 class="footer-title">Payment Methods</h5>
        <hr>
        <img src="/images/payments.png" class="payment-image mt-4">
      </div>
    </div>
    <hr style="width:100%;">
    <div class="footer-end footer-grid">
      <div class="footer-company">
        <a class="footer-link">© {{ currentYear }} Vibe Adventures</a>
      </div>
      <div class="footer-terms">
        <a href="https://vibeadventures.com/booking-terms-conditions/" target="_blank" rel="noopener"
           class="footer-link" style="padding-right: 20px;">Terms & Conditions</a>
        <a href="https://vibeadventures.com/privacy-policy-2/" target="_blank" rel="noopener"
           class="footer-link">Privacy Policy</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentYear = ref(new Date().getFullYear())
import {onMounted, onBeforeUnmount, ref} from "vue";
import Dialog from "primevue/dialog";
import contactlink from "~/components/ContactLink.vue";

const showContact = () => {
  contact.value = true;
};

const contact = ref(false);

const showScrollButton = ref(false);

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 1200;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

</script>
