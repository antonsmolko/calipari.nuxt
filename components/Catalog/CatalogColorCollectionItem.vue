<template lang="pug">
  .uk-panel
    nuxt-link.uk-link-reset(
      :to="{ name: 'catalog-color-collections-collection', params: { collection: item.alias } }")
      uk-image.uk-box-shadow-medium(
        :name="item.image_path"
        :width="width"
        :height="height"
        :alt="item.title")
      h3.tm-catalog__title {{ item.title }}
</template>

<script>

export default {
  name: 'CatalogColorCollectionItem',
  props: {
    item: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    }
  }
}
</script>
