import { mapState } from 'vuex'

export default {
  metaInfo () {
    return {
      title: this.pageTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          vmid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      pageTitle: state => state.pageTitle
    })
  }
}
