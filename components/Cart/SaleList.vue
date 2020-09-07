<template lang="pug">
  .tm-sale-list
    .uk-container
      .tm-checkout__header
        span.uk-h2.uk-margin-remove Товары с распродажи
        .uk-divider-small
      .tm-sale-list__container
    .uk-container.tm-sale-list__container
      .uk-grid.uk-grid-small(
        data-uk-grid="masonry: true"
        class="uk-child-width-1-2@s uk-child-width-1-3@m")
        sale-item(
          v-for="item in items"
          :key="item.id"
          :item="item"
          :cartMode="true"
          @delete="onDelete")
</template>

<script>
import SaleItem from '@/components/Sales/SaleItem'

export default {
  name: 'SaleList',
  components: { SaleItem },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    onDelete (id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style lang="scss">
.tm-sale-list__container {
  @include media-desk($xs) {
    padding: 0 4px;
  }
}
</style>
