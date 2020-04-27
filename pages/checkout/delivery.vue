<template lang="pug">
    CheckoutLayout(
        v-show="!personalIsInvalid && enabled"
        title="Способы доставки"
        :price="totalPrice"
        @confirm="onNext"
    )
        template(#content)
            SlideYDownTransition(v-show="pageTitle")
                .uk-grid.uk-grid-divider.uk-flex-center(data-uk-grid)
                    div(class="uk-width-xlarge@s uk-width-1-2@m")
                        CheckoutDeliveryList(
                            :items="items"
                            @change="changeDelivery"
                            :defaultValue="selectDeliveryId"
                        )
                    div(class="uk-width-xlarge@s uk-width-1-2@m")
                        CheckoutDeliveryPickup(
                            v-if="selectDelivery.alias === 'pickup'"
                            key="pickup.key_name"
                            :items="pickups"
                            :value="pickup"
                            @change="changePickup"
                        )
                        CheckoutDeliveryCDEK(
                            v-else-if="selectDelivery.alias === 'cdek'"
                            key="cdek")
                        CheckoutDeliveryCDEKCourier(
                            v-else-if="selectDelivery.alias === 'cdek_courier'"
                            key="cdek_courier")
                    .uk-inline.uk-margin-medium-top.uk-margin-auto-left(
                        class="uk-width-xlarge@s uk-width-1-2@m uk-visible@l")
                        .uk-flex.uk-flex-between
                            button.uk-button.uk-button-danger(
                                @click.prevent="onPrev"
                            ) Назад
                            button.uk-button.uk-button-primary(
                                :disabled="deliveryIsInvalid"
                                @click.prevent="onNext"
                                type="submit"
                            ) Продолжить
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import setLayout from '~/components/mixins/setLayout'
import CheckoutLayout from '~/components/Checkout/CheckoutLayout'
import CheckoutDeliveryList from '~/components/Checkout/CheckoutDeliveryList'
import CheckoutDeliveryPickup from '~/components/Checkout/CheckoutDeliveryPickup'
import CheckoutDeliveryCDEK from '~/components/Checkout/CheckoutDeliveryCDEK'
import CheckoutDeliveryCDEKCourier from '~/components/Checkout/CheckoutDeliveryCDEKCourier'

export default {
  name: 'Delivery',
  components: {
    CheckoutDeliveryCDEKCourier,
    CheckoutDeliveryCDEK,
    CheckoutDeliveryPickup,
    CheckoutDeliveryList,
    CheckoutLayout
  },
  middleware: ['personalValid'],
  mixins: [setLayout],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
    ...mapState({
      items: state => state.delivery.items,
      pickups: state => state.settings.items.pickups,
      selectDeliveryId: state => state.checkout.delivery,
      pickup: state => state.checkout.pickup,
      enabled: state => state.checkout.enabled
    }),
    ...mapGetters({
      defaultDeliveryId: 'delivery/defaultItemId',
      defaultPickup: 'settings/defaultPickup',
      totalPrice: 'checkout/totalPrice',
      deliveryIsInvalid: 'checkout/deliveryIsInvalid',
      personalIsInvalid: 'checkout/personalIsInvalid'
    }),
    selectDelivery () {
      return this.$store.getters['delivery/getItemById'](this.selectDeliveryId)
    }
  },
  created () {
    if (this.personalIsInvalid) {
      const path = this.$auth.loggedIn
        ? { path: '/profile/personal', query: { from: '/checkout/delivery' } }
        : '/checkout/personal'
      this.$router.push(path)
    }
    if (!this.pickup) {
      this.setCheckoutFieldsAction({ pickup: this.defaultPickup })
    }
    this.setDefaultDelivery()
    this.setFieldsAction({ pageTitle: 'Оформление заказа. Способы доставки' })
  },
  methods: {
    ...mapActions({
      setCheckoutFieldsAction: 'checkout/setFields'
    }),
    setDefaultDelivery () {
      if (this.selectDeliveryId === null || this.selectDelivery === undefined) {
        this.setCheckoutFieldsAction({ delivery: this.defaultDeliveryId })
      }
    },
    onPrev () {
      this.$auth.loggedIn
        ? this.$router.push('/cart')
        : this.$router.push('/checkout/personal')
    },
    onNext () {
      this.$router.push('/checkout/confirmation')
    },
    changeDelivery (value) {
      this.setCheckoutFieldsAction({ delivery: value })
    },
    changePickup (value) {
      this.setCheckoutFieldsAction({ pickup: value })
    }
  }
}
</script>

<style lang="scss">
.tm-checkout{
    &__delivery {
        &-item {
            display: flex;
            flex-wrap: wrap;
            &:not(:last-child) {
                margin-bottom: $global-small-margin;
            }
            @include media-mob($hm) {
                &:not(:last-child) {
                    margin-bottom: $global-margin;
                }
            }
            .uk-text-muted {
                width: 100%;
                padding-left: 18px + $global-small-margin;
            }
        }
        &-heading {
            flex: 1;
            padding-left: $global-small-margin;
        }
        &-radio {
            flex: none;
            margin-top: .35rem;
            @include media_mob($l) {
                margin-top: .45rem;
            }
        }
    }
    &__lead {
        &-data {
            &:not(:first-child) {
                margin-top: $global-small-margin;
            }
        }
    }
}
</style>
