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

export default {
  name: 'Category',
  scrollToTop: true,
  components: {
    GalleryLayout
  },
  mixins: [setLayout],
  async fetch ({ store, params }) {
    await store.$api.$get(`/catalog/categories/${params.category}`)
      .then((response) => {
        store.commit('categories/SET_ITEM', response)
        store.commit('SET_FIELDS', {
          pageTitle: response.title,
          footer: false
        })
      })
  },
  computed: {
    ...mapState({
      item: state => state.categories.item
    })
  },
  mounted () {
    window.scrollTo(0, 0)
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
