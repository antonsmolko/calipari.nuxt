<template lang="pug">
    Page(v-if="responseData")
        template(#main)
            main
                TopBar(:title="pageTitle")
                    .uk-navbar-item
                        button.uk-close(type="button", data-uk-close, @click="onClose")
                section.uk-section.uk-section-large.uk-position-relative.uk-text-center.uk-position-z-index(
                    :class="{ 'uk-light': darkPeriod }"
                    data-uk-scrollspy="cls:uk-animation-slide-bottom-small")
                    .uk-container.uk-container-large
                        h2.uk-heading-small {{ artCollection.title }}
                        .uk-divider-small.uk-margin-large-bottom
                        .uk-grid.uk-grid-small(
                            data-uk-grid="masonry: true"
                            data-uk-scrollspy="target: > *; cls: uk-animation-fade; delay: 50")
                            .uk-panel(
                                v-for="item in artCollection.images"
                                class="uk-width-1-2@s uk-width-1-3@m")
                                CollectionImageItem(:item="item" :key="item.id")
                .uk-position-fixed.uk-width-1-1.uk-height-viewport.uk-position-top(
                    data-uk-scrollspy="cls: uk-animation-fade; delay: 50")
                    .tm-section__semitransparent-background.uk-position-cover.uk-background-cover.uk-background-fixed(
                        v-show="backgroundPath"
                        :data-src="url" data-uk-img)
                    .tm-category__background-default(
                        v-if="!backgroundPath")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import CollectionImageItem from '~/components/Catalog/Collection/CollectionImageItem'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
import scrollToImage from '~/components/mixins/scrollToImage'

export default {
  name: 'ArtCollection',
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  components: {
    Page,
    TopBar,
    CollectionImageItem
  },
  mixins: [setLayout, scrollToTop, scrollToImage],
  async fetch () {
    if (!this.$route.params.collection) {
      await this.$router.push('/notfound')
    }
    this.$store.dispatch('artCollections/setField', { field: 'item', value: null })
    await this.$store.dispatch('artCollections/getItem', this.$route.params.collection)
      .then((response) => {
        this.setFieldAction({ field: 'pageTitle', value: response.title })
        this.responseData = true
      })
      .catch((error) => {
        if (error.status === 404) {
          this.$router.push('/notfound')
        }
      })
  },
  data: () => ({
    responseData: false
  }),
  computed: {
    ...mapState({
      artCollection: state => state.artCollections.item
    }),
    backgroundPath () {
      return this.artCollection.background ? this.artCollection.background : null
    },
    url () {
      return this.backgroundPath
        ? `${process.env.baseUrl}/image/grayscale/${this.backgroundPath}`
        : ''
    }
  },
  methods: {
    ...mapActions({
      setImageFieldAction: 'images/setField'
    }),
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/catalog')
    }
  }
}
</script>
