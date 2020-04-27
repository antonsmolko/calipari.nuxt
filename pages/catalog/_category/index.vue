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
import { mapState } from 'vuex'

import GalleryLayout from '~/components/Gallery/GalleryLayout'
import setLayout from '~/components/mixins/setLayout'

export default {
  name: 'Category',
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
    ...mapState('categories', {
      item: state => state.item
    })
  }
}
</script>
