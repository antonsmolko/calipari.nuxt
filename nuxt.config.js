import path from 'path'
import https from 'https'
import fs from 'fs'
import axios from 'axios'
import imageminMozjpeg from 'imagemin-mozjpeg'
require('dotenv').config()
const ImageminPlugin = require('imagemin-webpack-plugin').default

const isDev = process.env.NODE_ENV !== 'production'
const isLocal = process.env.DEV_MODE === 'local'
const devBaseUrl = isLocal ? process.env.LOCAL_BASE_URL : process.env.BASE_URL
const baseUrl = !isDev ? process.env.BASE_URL : devBaseUrl
const baseApiUrl = process.env.API_BASE_URL
const imageProvider = process.env.IMAGE_PROVIDER // s3, local
const localImageEndpoint = `${baseApiUrl}/api/image`
const s3ImageEndpoint = process.env.S3_IMAGE_ENDPOINT
const awsBucket = process.env.AWS_BUCKET

export default {
  ...(!isDev && {
    modern: 'client'
  }),
  /*
  ** Headers of the page
  */

  head: {
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#093256' },
      ...[isDev && { name: 'robots', content: 'noindex, nofollow' }],
      { name: 'msapplication-TileColor', content: '#292C30' },
      { name: 'msapplication-TileColor', content: '/favicon/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#292C30' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'apple-touch-icon', sizes: '192x192', href: '/favicon/apple-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/manifest.json' }
    ]
  },
  rootDir: __dirname,
  serverMiddleware: [
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#3B8070',
  //   background: 'white'
  // },
  /*
  ** Global CSS
  */
  css: [
    // '@/assets/main.css'
    './assets/scss/styles.scss'
  ],
  router: {
    prefetchLinks: false,
    linkExactActiveClass: 'uk-active',
    middleware: [
      'clearValidationErrors'
    ],
    extendRoutes (routes, resolve) {
      routes.push({
        name: '404',
        path: '*',
        component: resolve(__dirname, 'pages/notfound/index.vue')
      })
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: './plugins/axios' },
    { src: './plugins/api' },
    { src: './plugins/uikit', ssr: false },
    // { src: './plugins/resize-observer' },
    { src: './plugins/app-components' },
    { src: './plugins/vuelidate', ssr: false },
    { src: './plugins/mixins/pageSettings' },
    { src: './plugins/vue2-transitions', ssr: false },
    { src: './plugins/vue-carousel-3d', ssr: false },
    { src: './plugins/vue-meta' },
    { src: './plugins/lang/ru/validationLib.js' }, // Lang Libs
    { src: './plugins/lang/ru/lib.js' },
    { src: './plugins/config.js' },
    { src: './plugins/mixins/timePeriod.js' },
    { src: './plugins/ymap.js', mode: 'client' }
    // { src: './plugins/fileapi', mode: 'client' }
  ],
  env: {
    isDev,
    baseUrl,
    baseApiUrl,
    imageProvider,
    localImageEndpoint,
    s3ImageEndpoint,
    awsBucket
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/dotenv', { systemvars: true }],
    '@nuxtjs/pwa'
  ],
  /*
  ** PWA
   */
  // pwa: {
  //   meta: {
  //     title: 'Calipari',
  //     author: 'Anton Smolko',
  //     theme_color: '#292C30'
  //   },
  //   manifest: {
  //     name: 'Calipari application',
  //     short_name: 'Calipari app',
  //     lang: 'ru'
  //   }
  // },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
    // 'nuxt-trailingslash-module',
    'nuxt-webfontloader',
    // 'cookie-universal-nuxt',
    'nuxt-user-agent',
    ['nuxt-vuex-localstorage', {
      ...(isDev && {
        mode: 'debug'
      }),
      localStorage: ['cart', 'wishList', 'checkout'] //  If not entered, “localStorage” is the default value
    }],
    'vue-scrollto/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/redirect-module'
  ],
  sitemap: {
    hostname: baseUrl,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: [
      '/_icons',
      '/checkout/invite',
      '/checkout/personal',
      '/checkout/delivery',
      '/checkout/confirmation',
      '/payment',
      '/payment/complete',
      '/profile',
      '/profile/personal',
      '/profile/orders',
      '/review',
      '/social-callback'
    ],
    routes: async () => {
      const api = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      })
      const { data } = await api.get(`${baseApiUrl}/api/sitemap`)

      return data
    }
  },
  webfontloader: {
    events: false,
    custom: {
      families: [
        'Roboto Condensed:n3,n4',
        'Oswald:n2,n3'
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400&display=swap',
        'https://fonts.googleapis.com/css?family=Oswald:200,300&display=swap'
      ]
    },
    timeout: 5000
  },
  styleResources: {
    scss: [
      './assets/scss/_variables.scss',
      './assets/scss/_mixins.scss'
    ]
  },
  svgSprite: {
    // manipulate module options
    output: '~/static/img/svg/sprite'
  },
  /*
    /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${baseApiUrl}/api`,
    https: true,
    credentials: true
    // proxy: true
  },
  // proxy: {
  //   '/api/': {
  //     target: `${baseApiUrl}/api`
  //   }
  // },
  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: `${baseApiUrl}/api`,
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post'
          },
          refresh: {
            url: '/auth/refresh',
            method: 'post'
          },
          register: {
            url: '/auth/register',
            method: 'post'
          },
          user: {
            url: '/auth/me',
            method: 'post'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          }
        },
        user: {
          property: 'data'
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60,
          tokenRequired: true
        }
      }
    },
    redirect: {
      login: '/login',
      home: '/'
    },
    plugins: [
      '~/plugins/authExtension'
    ]
  },
  render: {
    // http2: {
    //   push: true,
    //   pushAssets: null
    // },
    compressor: false,
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    },
    resourceHints: false,
    etag: false,
    static: {
      etag: false
    }
  },
  // Route animations
  layoutTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    optimizeCss: false,
    // analyze: true,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    optimization: {
      minimize: !isDev
    },
    ...(!isDev && {
      extractCSS: {
        ignoreOrder: true
      }
    }),
    transpile: ['intersection-observer'],
    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: ['advanced', {
              autoprefixer: false,
              cssDeclarationSorter: false,
              zindex: false,
              discardComments: {
                removeAll: true
              },
              reduceIdents: false
            }]
          }
        })
      },
      ...(!isDev && {
        preset: {
          browsers: 'cover 99.5%',
          autoprefixer: true
        }
      }),

      order: 'cssnanoLast'
    },
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    extend (config, ctx) {
      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
      const vueSvgLoader = [
        {
          loader: 'vue-svg-loader',
          options: {
            svgo: false
          }
        }
      ]
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '90',
          speed: 7,
          strip: true
        },
        jpegtran: {
          progressive: true

        },
        gifsicle: {
          interlaced: true
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true
          })

        ]
      })
      if (!ctx.isDev) { config.plugins.push(imageMinPlugin) }

      config.module.rules.forEach((rule) => {
        if (rule.test.toString() === ORIGINAL_TEST) {
          rule.test = /\.(png|jpe?g|gif|webp)$/i
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
              }
            }
          ]
        }
      })
      //  Create the custom SVG rule
      const svgRule = {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: vueSvgLoader
          },
          {
            resourceQuery: /data/,
            loader: 'url-loader'
          },
          {
            resourceQuery: /raw/,
            loader: 'raw-loader'
          },
          {
            loader: 'file-loader' // By default, always use file-loader
          }
        ]
      }

      config.module.rules.push(svgRule) // Actually add the rule
    },
    extractCSS: true
  },
  loaders: {
    vue: {
      transformAssetUrls: {
        img: 'data-src',
        div: 'data-src'
      }
    }
  },
  server: {
    ...(isLocal && {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
      }
    })
  }
}
