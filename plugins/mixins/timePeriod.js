import Vue from 'vue'
import { mapState } from 'vuex'

const timePeriod = {
  install (Vue, options) {
    Vue.mixin({
      computed: {
        ...mapState({
          timePeriod: state => state.timePeriod,
          darkPeriod: state => state.darkPeriod
        })
      }
    })
  }
}

Vue.use(timePeriod)
