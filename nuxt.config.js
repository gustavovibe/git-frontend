export default defineNuxtConfig({
  // AÑADIR ESTO: Configura el motor Nitro
  nitro: {
    // Asegura que usa el preset de Node.js, perfecto para contenedores
    preset: 'node-server', 
    serveStatic: true, // Si usas alguna ruta estática
  },

  // AÑADIR ESTO: Configura el servidor a nivel de Nuxt
  server: {
    // Estas configuraciones generalmente son para desarrollo,
    // pero pueden actuar como fallback en el servidor si no hay env vars.
    host: '0.0.0.0', 
    port: 8080
  },
  app: {
    head: {
      title: "Vibe Adventures",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }], // Move the link property here
      script: [
        { src: 'https://accounts.google.com/gsi/client', async: true, defer: true },
        {
          src: 'https://apis.google.com/js/platform.js',
          async: true,
          defer: true,
        },
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIjpGancr9vQByFa1MUst_eo29spVtSmM",
          async: true,
          defer: true
        },
        {
          src: "https://cdn.gravitec.net/storage/e1eb502b026b42b32acb2017a8ee82a0/client.js",
          async: true,
          defer: true
        },
        {
        src: 'https://widget.cxgenie.ai/widget.js',
          'data-aid': '7ac93916-b970-4599-aa7f-542295bece05', // <--- IMPORTANT: Replace with your actual ID
          'data-lang': 'en',
          body: true,
          async: true,
          defer: true,
        },
        {
          src: 'https://www.google.com/recaptcha/enterprise.js?render=6Lfoj4sqAAAAAHLT71BIUo5OwjQOU-nYfcKkHdqr',
          body: true,
          async: true,
          defer: true,
        },
      ],
    },
  },

  devtools: { enabled: false },

  css: [
    "@/assets/main.css",
    "@/scss/lara-light-green/theme.scss",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
  ],

  alias: {
    "@src": "/src",
  },

  modules: ["nuxt-primevue", "@pinia/nuxt"],

  pinia: {
    storesDirs: ["./store/**"],
  },

  primevue: {
    options: {
      ripple: true,
    },
    components: {
      include: ["*"],
    },
  },

  plugins: ["~/plugins/primevue.js", "~/plugins/pinia.js"],

  imports: {
    dirs: ["store"],
  },

  runtimeConfig: {
    public: {
      // Don't forget prefix "NUXT_PUBLIC_"
      FRONTEND_URL: process.env.NUXT_PUBLIC_FRONTEND_URL || "https://travelpackages.vibeadventures.com",
      BACKEND_URL: process.env.NUXT_PUBLIC_BACKEND_URL || "https://vibeadventures.be",
      KIWIAPI_URL: process.env.NUXT_PUBLIC_KIWIAPI_URL || "https://api.tequila.kiwi.com",
      KIWIAPI_KEY: process.env.NUXT_PUBLIC_KIWIAPI_KEY || "QGWd943iYcYa581oo0nm_m8Kl-BOL0an",
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "167487643212-ni76uekjp19lp8n4clos8ea5hdggj8qj.apps.googleusercontent.com",
    },
  },

  compatibilityDate: "2025-02-25",
});