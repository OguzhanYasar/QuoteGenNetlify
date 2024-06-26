// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: 'Nuxt 3 Firebase Quote Generator',
      short_name: 'Quote Generator',
      description: 'Een quote generator met Firebase',
      start_url: '.',
      theme_color: '#3182ce',
      background_color: '#3182ce',
      display: 'standalone',
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any, maskable",
        },
      ]
    },
  },
})
