<template lang="pug">
    .tm-layout__container(
        v-if="onLoad"
        :class="pageBg")
        Navbar
            template(#content)
                .uk-container.uk-container-expand
                    nav(data-uk-navbar)
                        .uk-navbar-left
                            .uk-navbar-item
                                span.tm-logo.uk-logo.uk-icon.uk-margin-small-right(data-uk-icon="calipari")
                                h1.uk-h4.uk-margin-remove.uk-text-muted Редактор
                        .uk-navbar-right
                            .uk-navbar-item
                                button.uk-close(type='button', data-uk-close, @click='onClose')
        FadeTransition(mode="out-in")
            nuxt
</template>
<script>
import { mapActions } from 'vuex'
import EditorTopBar from '~/components/Editor/EditorTopBar'
import layoutTimePeriod from '~/components/mixins/layoutTimePeriod'
export default {
  components: {
    EditorTopBar
  },
  mixins: [layoutTimePeriod],
  metaInfo () {
    return {
      title: 'Calipari Редактор'
    }
  },
  methods: {
    ...mapActions('images', {
      setImagesFieldAction: 'setField'
    }),
    onClose () {
      window.history.length > 1 ? this.goBack() : this.goCatalog()
    },
    goBack () {
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
