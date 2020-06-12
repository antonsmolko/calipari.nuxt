import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('images', {
      setImagesFieldAction: 'setField'
    }),
    onClose () {
      window.history.length > 1 ? this.goBack() : this.goCatalog()
    },
    goBack () {
      const anchor = this.$route.query.anchor
      if (anchor) {
        this.setFieldAction({ field: 'scrollTo', value: anchor })
      }
      this.setImagesFieldAction({ field: 'lastPreview', value: this.$route.params.id })
      this.$router.go(-1)
    },
    goCatalog () {
      this.setImagesFieldAction({ field: 'lastPreview', value: null })
      this.$router.push('/catalog')
    }
  }
}
