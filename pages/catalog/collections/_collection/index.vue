<template lang="pug">
    main
        TopBar(:title="pageTitle")
            .uk-navbar-item
                button.uk-close(type="button", data-uk-close, @click="onClose")
        section.uk-section.uk-section-large.uk-position-relative.uk-text-center.uk-position-z-index(
            :class="{ 'uk-light': darkPeriod }"
            data-uk-scrollspy="cls:uk-animation-slide-bottom-small")
            .uk-container.uk-container-large
                h2.uk-heading-small {{ collection.title }}
                .uk-divider-small.uk-margin-large-bottom
                .uk-grid.uk-grid-small(
                    data-uk-grid
                    data-uk-scrollspy="target: > *; cls: uk-animation-fade; delay: 50")
                    CollectionImageItem(
                        v-for="item in collection.images"
                        :item="item"
                        :key="item.id")
        .uk-position-fixed.uk-width-1-1.uk-height-viewport.uk-position-top(
            data-uk-scrollspy="cls: uk-animation-fade; delay: 50")
            .tm-section__semitransparent-background.uk-position-cover.uk-background-cover.uk-background-fixed(
                v-show="backgroundPath"
                :data-src="url" data-uk-img)
            .tm-category__background-default(
                v-if="!backgroundPath")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TopBar from '~/components/layout/TopBar.vue'
import CollectionImageItem from '~/components/Catalog/Collection/CollectionImageItem'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  name: 'Collection',
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  components: {
    TopBar,
    CollectionImageItem
  },
  mixins: [setLayout, scrollToTop],
  async fetch ({ store, params }) {
    await store.dispatch('collections/getItem', params.collection)
  },
  computed: {
    ...mapState({
      collection: state => state.collections.item
    }),
    ...mapGetters('collections', [
      'mainImage'
    ]),
    backgroundPath () {
      return this.mainImage ? this.mainImage.path : null
    },
    url () {
      return this.backgroundPath
        ? `${process.env.baseUrl}/image/grayscale/${this.backgroundPath}`
        : ''
    }
  },
  created () {
    this.setFieldAction({ field: 'pageTitle', value: this.collection.title })
  },
  beforeDestroy () {
    this.setCollectionsFieldAction({ field: 'item', value: null })
  },
  methods: {
    ...mapActions('collections', {
      setCollectionsFieldAction: 'setField'
    }),
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/catalog')
    }
  }
}
</script>
