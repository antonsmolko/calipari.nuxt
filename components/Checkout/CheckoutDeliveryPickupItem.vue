<template lang="pug">
  label.tm-checkout__delivery-item
    input.tm-checkout__delivery-radio.uk-radio(
      type="radio"
      name="pickup"
      :checked="checked"
      @input="onInput")
    span.tm-checkout__delivery-heading
      span.uk-text-small.uk-display-block {{ item.locality }}
      span.uk-text-emphasis {{ item.address }}
</template>

<script>
export default {
  name: 'CheckoutDeliveryPickupItem',
  model: {
    prop: 'model',
    event: 'input'
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.item)
    }
  }
}
</script>

<style>
.tm-checkout__delivery-item {
  cursor: pointer;
}
</style>
