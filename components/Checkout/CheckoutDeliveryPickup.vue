<template lang="pug">
    div
        .tm-checkout__header
            span.uk-h2.uk-margin-remove {{ $lib.DELIVERY_PICKUPS }}
            .uk-divider-small
        .tm-form.uk-margin-medium-top
            .uk-fieldset
                CheckoutDeliveryPickupItem(
                    v-for="item in items"
                    :key="item.key_name"
                    :item="item"
                    v-model="currentPickup"
                    :checked="item.key_name === value.key_name"
                    @input="onInput"
                )
            .uk-margin
                span Стоимость доставки:
                span.uk-text-emphasis.uk-margin-small-left.uk-text-large {{ formatDeliveryPrice }}
</template>

<script>
import { mapActions } from 'vuex'
import CheckoutDeliveryPickupItem from './CheckoutDeliveryPickupItem'
import { getFormatPrice } from '~/components/helpers'

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
      required: true
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
    this.currentPickup = this.value
    this.setCheckoutFieldsAction({ deliveryPrice: 0 })
  },
  methods: {
    ...mapActions({
      setCheckoutFieldsAction: 'checkout/setFields'
    }),
    onInput () {
      this.$emit('change', this.currentPickup)
    }
  }
}
</script>
