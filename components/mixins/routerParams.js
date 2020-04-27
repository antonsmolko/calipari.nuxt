export default {
  computed: {
    getType () {
      return this.$store.getters['notifications/getType'](this.$route.query.status)
    }
  },
  async mounted () {
    if (this.$route.query instanceof Object) {
      const message = this.$route.query.message
      await this.$store.dispatch('login/setFormFields', this.$route.query)

      if (message) {
        await this.$store.dispatch('notifications/addItem', {
          status: this.getType || 'primary',
          message
        })
      }
    }
  }
}
