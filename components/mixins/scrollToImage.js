import { mapState, mapActions } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import debounce from 'lodash/debounce'
const _debounce = debounce(fn => fn(), 2000)

export default {
  computed: {
    ...mapState({
      lastPreview: state => state.images.lastPreview
    })
  },
  mounted () {
    this.scrollToImageProcess()
  },
  watch: {
    responseData () {
      if (this.responseData) {
        this.scrollToImageProcess()
      }
    }
  },
  methods: {
    ...mapActions({
      setImageFieldAction: 'images/setField'
    }),
    scrollToImageProcess () {
      this.$nextTick(function () {
        if (this.lastPreview) {
          const image = document.querySelector(`#image-${this.lastPreview}`)
          if (image) {
            this.scrollToImage()
          }
        }
      })
    },
    scrollToImage () {
      const options = {
        easing: 'ease-in-out',
        offset: -300,
        onDone: () => _debounce(this.clearLastPreview)
      }
      VueScrollTo.scrollTo(`#image-${this.lastPreview}`, 300, options)
    },
    clearLastPreview () {
      this.setImageFieldAction({ field: 'lastPreview', value: null })
    }
  }
}
