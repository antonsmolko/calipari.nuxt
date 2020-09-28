<template lang="pug">
  ServiceBottomBar
    .uk-navbar-left
      .uk-navbar-item
        span.uk-icon-button.uk-button-muted(
          data-uk-icon="chevron-left"
          @click.prevent="onPrev")
    .uk-navbar-center
      .uk-navbar-item.tm-total__price
        span.tm-total-price__value.uk-text-emphasis {{ price }}
    .uk-navbar-right
      .uk-navbar-item
        button.uk-icon-button(
          :data-uk-icon="nextIcon"
          :class="buttonNextStyle"
          :disabled="nextDisabled"
          @click.prevent="onNext")
</template>

<script>
import ServiceBottomBar from '@/components/layout/ServiceBottomBar'

export default {
  name: 'CheckoutBottomBar',
  components: { ServiceBottomBar },
  props: {
    price: {
      type: String,
      required: true
    },
    nextDisabled: {
      type: Boolean,
      default: false
    },
    nextIcon: {
      type: String,
      default: 'chevron-right'
    },
    buttonNextStyle: {
      type: String,
      default: 'uk-button-primary'
    }
  },
  methods: {
    onNext () {
      this.$emit('next')
    },
    onPrev () {
      this.$emit('prev')
    }
  }
}
</script>
<style lang="scss">
.tm-total-price {
  &__heading {
    margin: 5px $global-small-margin 0 0 !important;
  }

  &__value {
    font-size: 2rem;
    font-weight: 200;
  }
}
</style>
