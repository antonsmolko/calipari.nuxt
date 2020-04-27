<template lang="pug">
    client-only
        .tm-editor__bottom-bar.tm-navbar.tm-bottombar.uk-position-bottom.uk-position-fixed.uk-background-secondary.uk-light(
            class="uk-hidden@l")
            div(data-uk-navbar)
                .uk-navbar-item
                    span.uk-h5.uk-margin-remove Цена
                    span.tm-editor__bottom-bar-price {{ price }}
                        span.tm-editor__bottom-bar-price-rub ₽
                .uk-navbar-item
                    button.uk-button.uk-button-small.uk-button-danger(
                        type="button"
                        @click="onClick") В корзину
</template>

<script>
export default {
  name: 'EditorBottomBar',
  props: {
    price: {
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    onClick () {
      this.$emit('confirm')
    }
  }
}
</script>
