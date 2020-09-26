<template lang="pug">
  div
    .tm-checkout__header
      span.uk-h2.uk-margin-remove Выберите доставку
      .uk-divider-small
    .uk-flex.uk-flex-column.uk-flex-center.uk-margin-medium-top
      form.tm-form(@submit.prevent)
        fieldset.uk-fieldset
          checkout-delivery-item(
            v-for="item in items"
            :key="item.id"
            :item="item"
            :checked="item.id === defaultValue"
            @input="onInput")
</template>

<script>
import CheckoutDeliveryItem from '@/components/Checkout/CheckoutDeliveryItem'

export default {
  name: 'CheckoutDeliveryList',
  components: { CheckoutDeliveryItem },
  props: {
    items: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: Number,
      default: null
    }
  },
  methods: {
    onInput (value) {
      this.$emit('change', value)
    }
  }
}
</script>
