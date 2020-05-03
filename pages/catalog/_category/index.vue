<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        GalleryLayout(
            :title="item.title"
            :backgroundPath="item.image_path"
            :intro="item.description"
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
  scrollToTop: true,
  components: {
    GalleryLayout
  },
  mixins: [setLayout, scrollToTop],
  async fetch ({ store, params }) {
    const category = await store.getters['categories/getItemByAlias'](params.category)
    store.commit('categories/SET_FIELD', { field: 'item', value: category })
    await store.dispatch('categories/getItemTags', category.id)
    store.commit('SET_FIELDS', { pageTitle: category.title, footer: false })
  },
  computed: {
    ...mapState({
      item: state => state.categories.item
    })
  },
  methods: {
    ...mapActions('filter', {
      clearFiltersAction: 'clearFilters'
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'editor-id') {
      this.clearFiltersAction()
    }
    next()
  }
}
</script>
