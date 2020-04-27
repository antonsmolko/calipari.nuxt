<template lang="pug">
    div(data-uk-height-viewport="offset-top: true; offset-bottom: true")
        Gallery(
            v-if="!filterOpen"
            :title="title"
            :images="images"
            :backgroundPath="backgroundPath"
            :intro="intro"
            :paginateEnd="paginateEnd"
            :filterQty="filterQty"
            @filterOpen="handleFilterOpen"
            @paginate="paginate"
            @dislike="dislike"
        )
        ImageFilter(
            v-if="filterOpen"
            :mode="mode"
            :keyValue="keyValue"
            :open="filterOpen"
            :value="filter"
            @reset="handleFilterReset"
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
    filter: {
      tags: [],
      categories: []
    },
    filterOpen: false,
    responseData: false
  }),
  computed: {
    ...mapState('images', {
      images: state => state.items,
      pagination: state => state.pagination
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
      return [...this.filter.tags, ...this.filter.categories].length
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
    await this.refreshItems()
    this.responseData = true
  },
  methods: {
    ...mapActions({
      setPageTitleAction: 'setFields',
      getCategoryItemsAction: 'images/getCategoryItems',
      getWishListAction: 'images/getWishList',
      updatePaginationFieldsAction: 'images/updatePaginationFields',
      setImagesFieldsAction: 'images/setFields',
      resetPaginationAction: 'images/resetPagination',
      removeItemAction: 'images/removeItem'
    }),
    handleFilterOpen () {
      this.filterOpen = true
      this.setFieldsAction({ bottomBar: false })
    },
    async handleFilter (value) {
      this.filter = value
      await this.refreshItems()
      this.filterOpen = false
      this.setFieldsAction({ bottomBar: true })
    },
    handleFilterReset (value) {
      this.filter.tags = []
      this.filter.categories = []
      this.clearImagePaginationState()
      this.refreshItems()
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
    },
    dislike (id) {
      if (this.mode === 'wishList') {
        this.removeItemAction(id)
      }
    }
  }
}
</script>

<style>
    @import '../../assets/scss/modules/_mosaic-gallery.scss';
</style>
