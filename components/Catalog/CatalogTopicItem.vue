<template lang="pug">
    .uk-panel
        nuxt-link.tm-topics__item.uk-link-reset(
            :to="{ name: 'catalog-category', params: { category: item.alias } }")
            .tm-catalog__topics-image
                img.uk-box-shadow-medium(
                    :data-src="`https://manager.npmrundev.ru/image/fit/400/250/${item.image_path}`"
                    :alt="item.title"
                    data-uk-img)
            h3.tm-catalog__title {{ item.title }}
</template>

<script>
export default {
  name: 'CatalogTopicItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.tm-catalog {
    &__topics-image {
        background: $global-secondary-background;
    }
}
</style>
