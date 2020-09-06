<template lang="pug">
  div
    .tm-checkout__header
      span.uk-h2.uk-margin-remove {{ $lib.DELIVERY_PICKUPS }}
      .uk-divider-small
    .tm-form.uk-margin-medium-top
      .uk-fieldset
        checkout-delivery-pickup-item(
          v-for="item in items"
          :key="item.id"
          :item="item"
          v-model="currentPickup"
          :checked="item.id === currentPickup.id"
          @input="onInput")
      .uk-margin
        span Стоимость доставки:
        span.uk-text-emphasis.uk-margin-small-left.uk-text-large {{ formatDeliveryPrice }}
</template>

<script>
import { mapActions } from 'vuex'
import head from 'lodash/head'
import CheckoutDeliveryPickupItem from '@/components/Checkout/CheckoutDeliveryPickupItem'
import { getFormatPrice } from '@/components/helpers'

export default {
  name: 'CheckoutDeliveryPickup',
  components: { CheckoutDeliveryPickupItem },
  props: {
    items: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    currentPickup: null
  }),
  computed: {
    formatDeliveryPrice () {
      return getFormatPrice(0)
    }
  },
  created () {
    if (this.value) {
      this.currentPickup = this.value
    } else {
      this.setDefaultPickup()
    }
    this.setCheckoutFieldAction({ field: 'deliveryPrice', value: 0 })
  },
  methods: {
    ...mapActions({
      setCheckoutFieldAction: 'checkout/setField'
    }),
    onInput () {
      this.$emit('change', this.currentPickup)
    },
    setDefaultPickup () {
      this.currentPickup = head(this.items)
      this.$emit('change', this.currentPickup)
    }
  }
}
</script>
