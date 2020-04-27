module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // '@/assets/main.css'
    { src: '@/assets/scss/styles.scss', lang: 'scss' }
  ],
  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: './plugins/mixins/validation' },
    // { src: './plugins/mixins/notifications' },
    { src: './plugins/axios' },
    { src: './plugins/uikit', ssr: false },
    { src: './plugins/app-components' },
    { src: './plugins/vuelidate' },
    { src: './plugins/vue2-transitions' },
    // Lang Libs
    { src: './plugins/lang/ru/validationLib.js' }
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'https://manager.npmrundev.ru/api/'
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite'
  ],
  styleResources: {
    scss: [
      '@/assets/scss/styles.scss'
    ]
  },
  svgSprite: {
    // manipulate module options
  },
  /*
    /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://manager.npmrundev.ru/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'post',
            propertyName: 'token'
          },
          register: {
            url: 'auth/register',
            method: 'post',
            propertyName: 'data'
          },
          user: {
            url: 'auth',
            method: 'get',
            propertyName: 'data'
          },
          logout: {
            url: 'auth/logout',
            method: 'get'
          }
        }
      }
    },
    redirect: {
      login: '/login',
      home: '/'
    },
    plugins: [
      '~/plugins/auth'
    ]
  },
  // Route animations
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
    }
  },
  loaders: {
    vue: {
      transformAssetUrls: {
        img: 'data-src',
        div: 'data-src'
      }
    }
  }
}
