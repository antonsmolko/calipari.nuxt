import { mapState, mapActions } from 'vuex'

export default {
  metaInfo () {
    return {
      title: this.page.meta_title || this.page.title,
      meta: [
        ...[process.env.isDev && {
          vmid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }],
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
        { rel: 'canonical', href: process.env.BASE_URL + this.$route.fullPath }
      ]
    }
  },
  computed: {
    ...mapState({
      page: state => state.pages.fields
    })
  },
  methods: {
    ...mapActions({
      getPageAction: 'pages/getItem'
    })
  }
}
