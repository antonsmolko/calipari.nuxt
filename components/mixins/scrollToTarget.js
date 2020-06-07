import { mapState, mapActions } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import debounce from 'lodash/debounce'
const _debounce = debounce(fn => fn(), 2000)

export default {
  computed: {
    ...mapState({
      scrollTo: state => state.scrollTo
    })
  },
  mounted () {
    if (this.scrollTo) {
      this.scrollToTarget(this.scrollTo)
    }
  },
  methods: {
    ...mapActions({
      setFieldAction: 'setField'
    }),
    scrollToTarget (target) {
      const options = {
        easing: 'ease-in-out',
        offset: 400,
        onDone: () => _debounce(this.clearLastPreview)
      }
      VueScrollTo.scrollTo(`#${target}`, 0, options)
    },
    clearLastPreview () {
      this.setFieldAction({ field: 'scrollTo', value: null })
    }
  }
}
