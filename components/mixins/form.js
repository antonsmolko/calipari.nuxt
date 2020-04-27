import { mapState } from 'vuex'
export default {
  middleware: ['clearValidationErrors'],
  computed: {
    ...mapState({
      validationErrors: state => state.validations.errors,
      form: state => state.login.form
    })
  },
  created () {
    this.$store.dispatch('login/clearFormFields')
  },
  beforeRouteLeave (to, from, next) {
    this.$v.$reset()
    next()
  }
}
