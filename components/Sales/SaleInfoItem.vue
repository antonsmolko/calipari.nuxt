<template lang="pug">
  .tm-sale-card__info-item
    span.tm-sale-card__info-title.uk-text-muted {{ title }}
    span.tm-sale-card__info-value.tm-text-medium.uk-text-emphasis {{ value }}
</template>

<script>
export default {
  name: 'SaleInfoItem',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss">
.tm-sale-card__info {
  &-item {
    &:not(:last-child) {
      margin-bottom: $global-small-margin;
    }
  }
  &-title {
    display: block;
    font-size: 0.85rem;
    line-height: 1;
  }
  &-value {
    //font-size: 1.1rem;
    @include media-mob($xl) {
      font-size: 1.1rem;
      line-height: 1.2;
    }
  }
}
</style>
