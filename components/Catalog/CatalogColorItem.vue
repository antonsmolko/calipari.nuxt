<template lang="pug">
    nuxt-link.tm-catalog__colors-item.uk-link-reset(
        :to="{ name: 'catalog-category', params: { category: item.alias } }")
        .tm-catalog__colors-sample.uk-border-circle.uk-box-shadow-small(
            :style="`background: ${item.alias}`")
        h3.tm-catalog__title {{ item.title }}
</template>

<script>
export default {
  name: 'CatalogColorItem',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
<style lang="scss">
.tm-catalog__colors {
    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &-sample {
        display: block;
        width: 70px;
        height: 70px;
    }
}
</style>
