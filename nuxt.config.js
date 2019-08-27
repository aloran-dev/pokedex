import colors from 'vuetify/es5/util/colors'
import es from 'vuetify/es5/locale/es'

export default {
  mode: 'universal',

  htmlAttrs: {
    lang: 'es',
  },

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  loading: { color: '#fff' },

  css: [
  ],

  plugins: [
  ],

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  axios: {
    baseURL: 'https://pokeapi.co/api/v2/'
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { es },
      current: 'es',
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.red.darken2,
          accent: colors.grey.darken4,
          secondary: colors.yellow.lighten3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent4
        }
      }
    }
  },

  build: {
    extend (config, ctx) {
    }
  }
}
