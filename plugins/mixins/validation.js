import Vue from 'vue'
import { mapState } from 'vuex'

const Validation = {
  install (Vue, options) {
    Vue.mixin({
      computed: {
        ...mapState({
          validationErrors: state => state.validations.errors,
          form: state => state.login.form
        })
      }
    })
  }
}

Vue.use(Validation)
