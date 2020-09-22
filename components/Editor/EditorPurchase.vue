<template lang="pug">
    .tm-editor__panel(class="uk-visible@l")
        editor-panel-heading(title="Цена")
        .tm-editor__purchase-content.uk-flex-wrap
            span.tm-editor__purchase-price.uk-text-emphasis {{ formatPrice }}
            button.uk-button.uk-button-small.uk-button-danger(type='button' @click="onClick") В корзину
</template>

<script>
import EditorPanelHeading from './EditorPanelHeading'
import { getFormatPrice } from '~/helpers'

export default {
  name: 'EditorPurchase',
  components: {
    EditorPanelHeading
  },
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
