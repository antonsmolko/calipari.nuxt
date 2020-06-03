<template lang="pug">
    div(data-uk-height-viewport="offset-top: true; offset-bottom: true")
        Gallery(
            v-if="!filterOpen"
            :title="title"
            :images="images"
            :enabled="!!keyValue"
            @filterOpen="handleFilterOpen"
            @paginate="paginate"
            @dislike="dislike")
            template(#hero)
                GalleryHero(:title="title")
                    template(#sub-hero)
                        slot(name="search")
                        .tm-gallery__tags.uk-flex.uk-flex-wrap(
                            data-uk-scrollspy="target: > div; cls: uk-animation-slide-bottom-small; delay: 50"
                            v-if="tags && tags.length")
                            GalleryTag(
                                :active="!filterQty"
                                @click="tagClick")
                            GalleryTag(
                                v-for="tag in tags"
                                :key="tag.id"
                                :item="tag"
                                :active="activeTag === tag.id"
                                @click="tagClick")
        ImageFilter(
            v-if="filterOpen"
            :mode="mode"
            :keyValue="keyValue"
            :open="filterOpen"
            @close="handleFilterClose"
            @filter="handleFilter")
        .tm-category__background.uk-position-fixed.uk-width-1-1.uk-height-viewport.uk-position-z-index.uk-position-top(
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
import Gallery from '~/components/Gallery/Gallery'
import GalleryHero from '~/components/Gallery/GalleryHero'
import GalleryTag from '~/components/Gallery/GalleryTag'
import ImageFilter from '~/components/ImageFilter/ImageFilter'

export default {
  name: 'GalleryLayout',
  components: {
    TopBar,
    Gallery,
    GalleryHero,
    GalleryTag,
    ImageFilter
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    keyValue: {
      type: [Number, Array],
      default: () => null
    },
    mode: {
      type: String,
      default: 'category'
    },
    isWishList: {
      type: Boolean,
      default: false
    },
    backgroundPath: {
      type: String,
      default: null
    }
  },
  data: () => ({
    filterOpen: false,
    responseData: false
  }),
  computed: {
    ...mapState({
      images: state => state.images.items,
      tags: state => state.tags.items,
      lastPreview: state => state.images.lastPreview
    }),
    ...mapGetters({
      filterQty: 'filter/currentQty',
      activeTag: 'filter/activeTag'
    }),
    url () {
      return this.backgroundPath
        ? `${process.env.baseUrl}/image/grayscale/${this.backgroundPath}`
        : ''
    },
    restrictiveFilterElement () {
      return this.mode === 'imageKeys'
        ? { restrictive_keys: this.keyValue }
        : { [`restrictive_${this.mode}`]: this.keyValue }
    }
  },
  async mounted () {
    if ((!this.lastPreview || !this.images.length) && this.keyValue) {
      await this.refreshItems()
    }
    this.responseData = true
  },
  methods: {
    ...mapActions({
      setFieldAction: 'setField',
      getItemsAction: 'images/getItems',
      resetPaginationAction: 'images/resetPagination',
      removeItemAction: 'images/removeItem',
      clearFilterFieldsAction: 'filter/clearFields',
      clearFilterAction: 'filter/clearFilters',
      setCurrentTagAction: 'filter/setCurrentTag'
    }),
    handleFilterOpen () {
      this.filterOpen = true
      this.setFieldAction({ field: 'bottomBar', value: false })
    },
    async handleFilter () {
      await this.refreshItems()
      this.filterOpen = false
      this.setFieldAction({ field: 'bottomBar', value: true })
    },
    handleFilterClose () {
      this.filterOpen = false
      this.setFieldAction({ field: 'bottomBar', value: true })
    },
    async paginate () {
      await this.getItems({ increasePage: true })
    },
    async refreshItems () {
      this.clearFilterFieldsAction()
      this.resetPaginationAction()
      await this.getItems({ clear: true })
    },
    async getItems (options = null) {
      await this.getItemsAction({
        restrictiveElement: this.restrictiveFilterElement,
        increasePage: options.increasePage || false,
        clear: options.clear || false
      })
    },
    dislike (id) {
      if (this.isWishList) {
        this.removeItemAction(id)
      }
    },
    tagClick (tag) {
      tag !== null
        ? this.getTaggedImages(tag)
        : this.resetTags()
    },
    async getTaggedImages (tag) {
      await Promise.all([
        this.clearFilterAction(),
        this.resetPaginationAction()
      ])
      await this.setCurrentTagAction(tag)
      await this.getItems({ clear: true })
    },
    resetTags () {
      this.clearFilterAction()
      this.refreshItems()
    }
  }
}
</script>

<style lang="scss">
.tm-category__background-default {
    background: rgba(#000, .08);
}
</style>
