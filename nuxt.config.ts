// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // TODO: Change to desired target - static/server, ssr: true/false.
  //       Keep ssr: true if you are using SSG to generate HTML - otherwise app is going to be client side only.
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  // TODO: Documentation says this should be named "head", but with that name it doesn't work.
  app: {
    head: {
      title: 'Jagu Nuxt template',
      // TODO: Add your own fonts (change in assets/css/style.css as well).
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'  },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@500&family=Poppins:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
