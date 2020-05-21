<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        GalleryLayout(
            :title="item.title"
            :backgroundPath="item.image_path"
            :keyValue="item.id"
        )
</template>

<script>
import { mapState, mapActions } from 'vuex'

import GalleryLayout from '~/components/Gallery/GalleryLayout'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  name: 'Category',
  metaInfo () {
    return {
      title: this.pageTitle,
      bodyAttrs: {
        class: 'tm-category'
      }
    }
  },
  components: {
    GalleryLayout
  },
  mixins: [setLayout, scrollToTop],
  async fetch ({ store, params, redirect }) {
    const category = await store.getters['categories/getItemByAlias'](params.category)
    if (!category) {
      return redirect('/notfound')
    }
    store.commit('categories/SET_FIELD', { field: 'item', value: category })
    await store.dispatch('tags/getItemsByCategoryId', category.id)
  },
  computed: {
    ...mapState({
      item: state => state.categories.item
    })
  },
  created () {
    this.setFieldAction({ field: 'pageTitle', value: this.item.title })
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
      this.setCategoriesFieldAction({ field: 'tags', value: [] })
      this.setImagesFieldAction({ field: 'items', value: [] })
    }
    next()
  }
}
</script>
