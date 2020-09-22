<template lang="pug">
  Page(v-if="!$fetchState.pending")
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        GalleryLayout(
          :title="item.title"
          :backgroundPath="item.image_path"
          :keyValue="item.id")
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Page from '@/components/layout/Page.vue'
import GalleryLayout from '@/components/Gallery/GalleryLayout'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'

export default {
  name: 'Category',
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  components: {
    Page,
    GalleryLayout
  },
  mixins: [setLayout, scrollToTop],
  async fetch () {
    await this.getCategoryByAliasAction(this.$route.params.category)
    await this.$store.dispatch('tags/getItemsByCategoryId', this.item.id)
    await this.$store.dispatch('setField', {
      field: 'pageTitle',
      value: this.item.title
    })
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
      getCategoryByAliasAction: 'categories/getItemByAlias'
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
