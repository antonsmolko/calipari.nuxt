import path from 'path'
import fs from 'fs'
import imageminMozjpeg from 'imagemin-mozjpeg'
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'
const baseUrl = 'https://manager.calipari.ru'

export default {
  mode: 'universal',
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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoHairline/LatoHairline.woff', type: 'font/woff', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoThin/LatoThin.woff', type: 'font/woff', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoLight/LatoLight.woff', type: 'font/woff', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoRegular/LatoRegular.woff', type: 'font/woff', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoHairline/LatoHairline.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoThin/LatoThin.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoLight/LatoLight.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      { rel: 'preload', as: 'font', href: '/fonts/LatoRegular/LatoRegular.woff2', type: 'font/woff2', crossorigin: 'anonymous' }
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
    ]
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
    { src: './plugins/vuelidate' },
    { src: './plugins/mixins/pageSettings' },
    { src: './plugins/vue2-transitions' },
    { src: './plugins/vue-carousel-3d', ssr: false },
    { src: './plugins/vue-meta' },
    { src: './plugins/lang/ru/validationLib.js' }, // Lang Libs
    { src: './plugins/lang/ru/lib.js' },
    { src: './plugins/config.js' },
    { src: './plugins/mixins/timePeriod.js' },
    { src: '~/plugins/ymap.js', mode: 'client' }
  ],
  env: {
    baseUrl
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
    // '@nuxtjs/auth',
    '@nuxtjs/auth-next',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
    'nuxt-trailingslash-module',
    'nuxt-webfontloader',
    'cookie-universal-nuxt',
    ['nuxt-vuex-localstorage', {
      ...(isDev && {
        mode: 'debug'
      }),
      localStorage: ['cart', 'wishList', 'checkout'] //  If not entered, “localStorage” is the default value
    }],
    'vue-scrollto/nuxt'
  ],
  webfontloader: {
    events: false,
    google: {
      families: ['Open+Sans:300,400:cyrillic&display=swap']
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
  },
  /*
    /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${baseUrl}/api`,
    https: true,
    credentials: true
    // proxy: true
  },
  // proxy: {
  //   '/api/': 'https://manager.calipari.ru/api'
  // },
  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: `${baseUrl}/api`,
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
            method: 'post',
            propertyName: 'data'
          },
          user: {
            url: '/auth/me',
            method: 'post',
            propertyName: 'data'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60,
          tokenRequired: true
        },
        autoRefresh: true
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
    //     push: true,
    //     pushAssets: (req, res, publicPath, preloadFiles) => preloadFiles
    //     .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    //   },
    compressor: false,
    // bundleRenderer: {
    //   shouldPreload: (file, type) => {
    //     return ['script', 'style', 'font'].includes(type)
    //   }
    // },
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
              }
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
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
    }
  }
}
