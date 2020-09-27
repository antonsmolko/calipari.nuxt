import { mapState, mapActions } from 'vuex'

export default {
  metaInfo () {
    return {
      title: this.page.meta_title || this.page.title || this.pageTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          skip: process.env.NODE_ENV === 'production',
          vmid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.page.description
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.page.keywords
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.BASE_URL + this.fullPath }
      ]
    }
  },
  computed: {
    ...mapState({
      page: state => state.pages.fields
    }),
    fullPath () {
      return this.$route.fullPath === '/' ? '' : this.$route.fullPath
    }
  },
  methods: {
    ...mapActions({
      getPageAction: 'pages/getItem'
    })
  }
}
