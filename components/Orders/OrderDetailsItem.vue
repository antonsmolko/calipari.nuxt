<template lang="pug">
    .tm-order-details__item.uk-grid.uk-grid-small.uk-grid-row-collapse(data-uk-grid)
        span.tm-order-details__heading.uk-text-muted(
            v-if="heading"
            class="uk-width-1-3"
        ) {{ heading }}
        span.tm-order-details__value.uk-text-emphasis(
            class="uk-width-2-3"
            :class="contentCss"
        ) {{ content }}
</template>

<script>
export default {
  name: 'OrderDetailsItem',
  props: {
    heading: {
      type: String,
      default: null
    },
    content: {
      type: String,
      required: true
    },
    contentCss: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.tm-order-details {
    &__item {
        line-height: 1.4;
        &:not(:last-child) {
            margin-bottom: 5px;
        }
        @include media-range($s, $m) {
            font-size: $global-small-font-size;
        }
    }
}
</style>
