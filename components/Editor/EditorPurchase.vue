<template lang="pug">
    .tm-editor__purchase.tm-editor__panel(class="uk-visible@l")
        h5.uk-h5.uk-margin-bottom Цена
        .tm-editor__purchase-content.uk-flex-wrap
            span.tm-editor__purchase-price.uk-text-emphasis {{ formatPrice }}
            button.uk-button.uk-button-small.uk-button-danger.uk-margin(type='button' @click="onClick") В корзину
</template>

<script>
import { getFormatPrice } from '~/helpers'

export default {
  name: 'EditorPurchase',
  props: {
    price: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    formatPrice () {
      return getFormatPrice(this.price)
    }
  },
  methods: {
    onClick () {
      this.$emit('confirm')
    }
  }
}
</script>
