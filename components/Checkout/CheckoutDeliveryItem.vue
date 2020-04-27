<template lang="pug">
    label.tm-checkout__delivery-item
        input.tm-checkout__delivery-radio.uk-radio(
            type="radio"
            name="delivery"
            :value="item.id"
            :checked="checked"
            @input="onInput(item.id)")
        span.tm-checkout__delivery-heading.uk-h4.uk-margin-remove {{ item.title }}
        span.uk-text-muted {{ item.description }}
</template>

<script>
export default {
  name: 'CheckoutDeliveryItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
