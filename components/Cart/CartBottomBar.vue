<template lang="pug">
  service-bottom-bar
    .uk-navbar-left
      .uk-navbar-item.tm-total__price
        span.tm-total-price__value.uk-text-emphasis {{ formatPrice }}
    .uk-navbar-right
      .uk-navbar-item
        button.uk-button.uk-button-small.uk-button-danger(
          @click.prevent="onCheckout") Оформить
</template>

<script>
import ServiceBottomBar from '@/components/layout/ServiceBottomBar'

export default {
  name: 'CartBottomBar',
  components: { ServiceBottomBar },
  props: {
    price: {
      type: Number,
      required: true
    }
  },
  computed: {
    formatPrice () {
      return typeof this.price === 'number'
        ? this.price.toLocaleString('ru-Ru', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0
        })
        : ''
    }
  },
  methods: {
    onCheckout () {
      this.$emit('checkout')
    }
  }
}
</script>
<style lang="scss">
.tm-total-price {
  &__heading {
    font-weight: 300;
    margin: 5px $global-small-margin 0 0 !important;
  }

  &__value {
    font-size: 2rem;
    font-weight: 200;
  }
}
</style>
