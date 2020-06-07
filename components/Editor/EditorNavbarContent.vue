<template lang="pug">
    .uk-container.uk-container-expand
        nav(data-uk-navbar)
            .uk-navbar-left
                .uk-navbar-item
                    span.tm-logo.uk-logo.uk-icon.uk-margin-small-right(data-uk-icon="calipari")
                    h1.uk-h4.uk-margin-remove.uk-text-muted Редактор
            .uk-navbar-right
                .uk-navbar-item
                    button.uk-close(type='button', data-uk-close, @click='onClose')
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'EditorNavbarContent',
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
</script>
