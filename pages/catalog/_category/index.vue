<template lang="pug">
  page(v-if="!$fetchState.pending")
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        gallery-layout(
          :title="item.title"
          :backgroundPath="item.image_path"
          :keyValue="item.id")
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Page from '@/components/layout/Page.vue'
import GalleryLayout from '@/components/Gallery/GalleryLayout'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import dynamicPageMeta from '@/components/mixins/dynamicPageMeta'

export default {
  name: 'Category',
  components: {
    Page,
    GalleryLayout
  },
  mixins: [
    setLayout,
    scrollToTop,
    dynamicPageMeta
  ],
  async fetch () {
    await this.getCategoryByAliasAction(this.$route.params.category)
    await this.getTagsByCategoryId(this.item.id)
    await this.setFieldAction({ field: 'pageTitle', value: this.item.title })
  },
  computed: {
    ...mapState({
      item: state => state.categories.item
    })
  },
  methods: {
    ...mapActions({
      clearFiltersAction: 'filter/clearFilters',
      setCategoriesFieldAction: 'categories/setField',
      setImagesFieldAction: 'images/setField',
      getCategoryByAliasAction: 'categories/getItemByAlias',
      getTagsByCategoryId: 'tags/getItemsByCategoryId'
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'editor-id') {
      this.clearFiltersAction()
      this.setCategoriesFieldAction({
        field: 'tags',
        value: []
      })
      this.setImagesFieldAction({
        field: 'items',
        value: []
      })
    }
    next()
  }
}
</script>
