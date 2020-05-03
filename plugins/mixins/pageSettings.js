import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

const PageSettings = {
  install (Vue, options) {
    Vue.mixin({
      scrollToTop: true,
      computed: {
        ...mapState({
          pageTitle: state => state.pageTitle,
          bottomBar: state => state.bottomBar,
          footer: state => state.footer
        })
      },
      methods: {
        ...mapActions({
          setFieldsAction: 'setFields'
        })
      }
    })
  }
}

Vue.use(PageSettings)
