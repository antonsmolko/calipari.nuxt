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
import { mapState, mapActions } from 'vuex'

import Page from '@/components/layout/Page.vue'
import GalleryLayout from '@/components/Gallery/GalleryLayout'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import page from '@/components/mixins/page'

export default {
  name: 'Category',
  components: {
    Page,
    GalleryLayout
  },
  mixins: [setLayout, scrollToTop, page],
  metaInfo () {
    return {
      title: this.item.meta_title || this.pageTitle,
      meta: [
        {
          skip: process.env.isDev,
          vmid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.item.description
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.item.keywords
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.BASE_URL + this.$route.fullPath }
      ]
    }
  },
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
