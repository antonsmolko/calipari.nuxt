import { mapState, mapActions } from 'vuex'
import { getS3ImageUrl } from '@/helpers'

export default {
  metaInfo () {
    return {
      title: this.page.meta_title || this.page.title || this.pageTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          skip: process.env.NODE_ENV === 'production',
          hid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.page.description || ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.page.keywords || ''
        },
        {
          property: 'og:url',
          content: process.env.BASE_URL + this.fullPath
        },
        {
          property: 'og:type', content: 'website'
        },
        {
          property: 'og:title',
          content: this.page.meta_title || this.page.title || this.pageTitle
        },
        {
          property: 'og:description',
          content: this.page.description || ''
        },
        {
          property: 'og:site_name',
          content: this.getSettingValueByKey('site_name')
        },
        {
          property: 'og:locale', content: 'ru_RU'
        },
        {
          property: 'og:image',
          content: this.ogImageUrl
        },
        {
          property: 'og:image:alt',
          content: this.getSettingValueByKey('default_og_image_alt')
        },
        { name: 'msapplication-TileColor', content: '#292C30' },
        { name: 'msapplication-TileColor', content: '/favicon/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#292C30' }
      ],
      link: [
        { rel: 'canonical', href: process.env.BASE_URL + this.fullPath },
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
    }
  },
  computed: {
    ...mapState({
      page: state => state.pages.fields
    }),
    fullPath () {
      return this.$route.fullPath === '/' ? '' : this.$route.fullPath
    },
    ogImageUrl () {
      const name = this.page.image_path || this.getSettingValueByKey('default_og_image')
      return getS3ImageUrl({ name, width: 600 })
    }
  },
  methods: {
    ...mapActions({
      getPageAction: 'pages/getItem'
    }),
    getSettingValueByKey (key) {
      const setting = this.$store.getters['settings/getSettingByKey'](key)

      return setting.value
    }
  }
}
