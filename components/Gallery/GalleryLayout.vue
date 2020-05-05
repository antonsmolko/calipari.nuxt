<template lang="pug">
    div(data-uk-height-viewport="offset-top: true; offset-bottom: true")
        Gallery(
            v-if="!filterOpen"
            :title="title"
            :images="images"
            :tags="tags"
            :backgroundPath="backgroundPath"
            @tagging="handleTagging"
            @filterOpen="handleFilterOpen"
            @paginate="paginate"
            @dislike="dislike"
        )
        ImageFilter(
            v-if="filterOpen"
            :mode="mode"
            :keyValue="keyValue"
            :open="filterOpen"
            @close="handleFilterClose"
            @filter="handleFilter"
        )
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TopBar from '~/components/layout/TopBar.vue'
import ImageFilter from '~/components/ImageFilter/ImageFilter'
import Gallery from '~/components/Gallery/Gallery'

export default {
  name: 'GalleryLayout',
  components: {
    Gallery,
    ImageFilter,
    TopBar
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    keyValue: {
      type: [Number, Array],
      required: true
    },
    mode: {
      type: String,
      default: 'category'
    },
    backgroundPath: {
      type: String,
      default: ''
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
    filterElement () {
      return this.mode === 'wishList'
        ? { keys: this.keyValue }
        : { category: this.keyValue }
    }
  },
  async mounted () {
    if (!this.lastPreview || !this.images.length) {
      await this.refreshItems()
    }
    this.responseData = true
  },
  destroyed () {
    this.setFieldTagsAction({ field: 'items', value: [] })
  },
  methods: {
    ...mapActions({
      setFieldsAction: 'setFields',
      setFieldTagsAction: 'tags/setField',
      getItemsAction: 'images/getItems',
      updatePaginationFieldsAction: 'images/updatePaginationFields',
      setImagesFieldAction: 'images/setField',
      resetPaginationAction: 'images/resetPagination',
      removeItemAction: 'images/removeItem',
      clearFilterFieldsAction: 'filter/clearFields',
      clearFilterAction: 'filter/clearFilters',
      setCurrentTagAction: 'filter/setCurrentTag'
    }),
    handleFilterOpen () {
      this.filterOpen = true
      this.setFieldsAction({ bottomBar: false })
    },
    async handleFilter () {
      await this.refreshItems()
      this.filterOpen = false
      this.setFieldsAction({ bottomBar: true })
    },
    handleFilterClose () {
      this.filterOpen = false
      this.setFieldsAction({ bottomBar: true })
    },
    async paginate () {
      await this.getItems(true)
      this.setImagesFieldAction({ field: 'loading', value: false })
    },
    async refreshItems () {
      this.clearFilterFieldsAction()
      this.clearImagePaginationState()
      await this.getItems()
    },
    clearImagePaginationState () {
      this.resetPaginationAction()
      this.setImagesFieldAction({ field: 'items', value: [] })
    },
    async getItems (increasePage = false) {
      await this.getItemsAction({ filterElement: this.filterElement, increasePage })
    },
    dislike (id) {
      if (this.mode === 'wishList') {
        this.removeItemAction(id)
      }
    },
    handleTagging (tag) {
      tag !== null
        ? this.getTaggedImages(tag)
        : this.resetTags()
    },
    async getTaggedImages (tag) {
      await Promise.all([
        this.clearFilterFieldsAction(),
        this.clearImagePaginationState()
      ])
      await this.setCurrentTagAction(tag)
      await this.getItems()
    },
    resetTags () {
      this.clearFilterAction()
      this.refreshItems()
    }
  }
}
</script>

<style>
    @import '../../assets/scss/modules/_mosaic-gallery.scss';
</style>
