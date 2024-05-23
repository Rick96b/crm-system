
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", 'shadcn-nuxt', 'nuxt-icon', '@pinia/nuxt',
  ['@nuxtjs/google-fonts', {
    families: {
      'Lato': {
        wght: [500, 600, 700],
        ital: [300]
      }
    }
  }]],
  pinia: {
    storesDirs: ['./store/**']
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})