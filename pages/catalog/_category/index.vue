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
    const category = await this.$store.getters['categories/getItemByAlias'](this.$route.params.category)
    if (!category) {
      await this.$router.push('/notfound')
    } else {
      await this.$store.dispatch('categories/setField', {
        field: 'item',
        value: category
      })
      await this.$store.dispatch('tags/getItemsByCategoryId', category.id)
      await this.$store.dispatch('setField', {
        field: 'pageTitle',
        value: category.title
      })
    }
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
      setImagesFieldAction: 'images/setField'
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
