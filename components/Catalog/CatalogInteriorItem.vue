<template lang="pug">
    .uk-panel
        nuxt-link.tm-catalog__interiors-item.uk-link-reset(
            :to="{ name: 'catalog-category', params: { category: item.alias } }")
            img.tm-catalog__interiors-image.uk-box-shadow-medium(
                :data-src="`${baseUrl}${item.image_path}`"
                :alt="item.title"
                data-uk-img)
            h3.tm-catalog__title {{ item.title }}
</template>

<script>
export default {
  name: 'CatalogInteriorItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    baseUrl: `${process.env.baseUrl}/image/fit/400/250/`
  })
}
</script>
