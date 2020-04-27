<template lang="pug">
    .tm-confirmation__details-item.uk-grid-collapse(data-uk-grid)
        span.tm-confirmation__details-heading.uk-text-muted(
            class="uk-width-2-5@m") {{ heading }}
        span.tm-confirmation__details-content.uk-text-emphasis(
            class="uk-width-3-5@m") {{ content }}
</template>

<script>
export default {
  name: 'CheckoutOrderDetailsItem',
  props: {
    heading: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.tm-confirmation__details {
    &-item {
        margin-bottom: $global-small-margin;
    }
    &-heading {
        font-size: .9em;
        line-height: 1.2;
        @include media_mob($m) {
            line-height: 1.3;
            font-size: 1em;
        }
    }
    &-content {
        line-height: 1.3;
        font-size: $global-font-size;
        @include media_mob($m) {
            font-size: 1em;
        }
    }
}
</style>
