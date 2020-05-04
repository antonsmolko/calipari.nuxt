<template lang="pug">
    div(data-uk-height-viewport="offset-top: true; offset-bottom: true")
        Gallery(
            v-if="!filterOpen"
            :title="title"
            :images="images"
            :tags="tags"
            :backgroundPath="backgroundPath"
            :intro="intro"
            :paginateEnd="paginateEnd"
            :filterQty="filterQty"
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
import setLayout from '~/components/mixins/setLayout'
import Gallery from '~/components/Gallery/Gallery'

export default {
  name: 'GalleryLayout',
  components: {
    Gallery,
    ImageFilter,
    TopBar
  },
  mixins: [setLayout],
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
    },
    intro: {
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
      tags: state => state.categories.tags,
      pagination: state => state.images.pagination,
      filter: state => state.filter.currents,
      lastPreview: state => state.images.lastPreview
    }),
    paginationData () {
      return {
        current_page: this.pagination.current_page,
        per_page: this.pagination.per_page,
        sort_order: this.pagination.sort_order,
        sort_by: this.pagination.sort_by
      }
    },
    paginateEnd () {
      return this.pagination.total === this.images.length
    },
    filterQty () {
      return this.$store.getters['filter/currentQty']
    },
    imagesRequest () {
      return {
        key: this.keyValue,
        filter: this.filterQty ? this.filter : null,
        pagination: this.paginationData
      }
    }
  },
  async mounted () {
    if (!this.lastPreview || !this.images.length) {
      await this.refreshItems()
    }
    this.responseData = true
  },
  methods: {
    ...mapActions({
      setFieldsAction: 'setFields',
      getCategoryItemsAction: 'images/getCategoryItems',
      getWishListAction: 'images/getWishList',
      updatePaginationFieldsAction: 'images/updatePaginationFields',
      setImagesFieldsAction: 'images/setFields',
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
      this.updatePaginationFieldsAction({
        current_page: this.pagination.current_page + 1
      })
      await this.getItemsByMode()
      this.setImagesFieldsAction({ loading: false })
    },
    async refreshItems () {
      this.clearFilterFieldsAction()
      this.clearImagePaginationState()
      await this.getItemsByMode()
    },
    clearImagePaginationState () {
      this.resetPaginationAction()
      this.setImagesFieldsAction({ items: [] })
    },
    async getItemsByMode () {
      this.mode === 'wishList'
        ? await this.getWishListAction(this.imagesRequest)
        : await this.getCategoryItemsAction(this.imagesRequest)
      // this.setImagesFieldsAction({ loading: false })
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
      await this.getItemsByMode()
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
