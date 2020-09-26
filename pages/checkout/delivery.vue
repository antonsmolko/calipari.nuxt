<template lang="pug">
  page(v-if="!$fetchState.pending")
    template(#main)
      checkout-layout(
        v-show="!personalIsInvalid && enabled"
        title="Способы доставки"
        :price="totalPrice"
        @confirm="onNext")
        template(#content)
          .uk-grid.uk-grid-divider.uk-flex-center(data-uk-grid)
            div(class="uk-width-xlarge@s uk-width-1-2@m")
              checkout-delivery-list(
                :items="items"
                @change="changeDelivery"
                :defaultValue="selectDeliveryId")
            div(class="uk-width-xlarge@s uk-width-1-2@m")
              checkout-delivery-pickup(
                v-if="selectDelivery.alias === 'pickup-bryansk'"
                :items="selectDelivery.pickups"
                :value="pickup"
                @change="changePickup")
              checkout-delivery-c-d-e-k(
                v-else-if="selectDelivery.alias === 'cdek'")
              checkout-delivery-c-d-e-k-courier(
                v-else-if="selectDelivery.alias === 'cdek-courier'")
            .uk-inline.uk-margin-medium-top.uk-margin-auto-left(
              class="uk-width-xlarge@s uk-width-1-2@m uk-visible@l")
              .uk-flex.uk-flex-between
                button.uk-button.uk-button-danger(
                  @click.prevent="onPrev") Назад
                button.uk-button.uk-button-primary(
                  :disabled="invalid"
                  @click.prevent="onNext"
                  type="submit") Продолжить
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import Page from '@/components/layout/Page.vue'
import CheckoutLayout from '@/components/Checkout/CheckoutLayout'
import CheckoutDeliveryList from '@/components/Checkout/CheckoutDeliveryList'
import CheckoutDeliveryPickup from '@/components/Checkout/CheckoutDeliveryPickup'
import CheckoutDeliveryCDEK from '@/components/Checkout/CheckoutDeliveryCDEK'
import CheckoutDeliveryCDEKCourier from '@/components/Checkout/CheckoutDeliveryCDEKCourier'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'

export default {
  name: 'Delivery',
  components: {
    Page,
    CheckoutDeliveryCDEKCourier,
    CheckoutDeliveryCDEK,
    CheckoutDeliveryPickup,
    CheckoutDeliveryList,
    CheckoutLayout
  },
  middleware: ['personalValid'],
  mixins: [scrollToTop, setLayout],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  async fetch () {
    if (this.personalIsInvalid) {
      const path = this.$auth.loggedIn
        ? {
          path: '/profile/personal',
          query: { from: '/checkout/delivery' }
        }
        : '/checkout/personal'
      await this.$router.push(path)
    }
    await Promise.all([
      this.setDefaultDelivery(),
      this.setCheckoutInvalid(this.deliveryIsInvalid),
      this.setFieldsAction({ pageTitle: 'Оформление заказа. Способы доставки' })
    ])
  },
  computed: {
    ...mapState({
      items: state => state.delivery.items,
      selectDeliveryId: state => state.checkout.delivery,
      pickup: state => state.checkout.pickup,
      enabled: state => state.checkout.enabled,
      invalid: state => state.checkout.invalid
    }),
    ...mapGetters({
      defaultDeliveryId: 'delivery/defaultItemId',
      totalPrice: 'checkout/totalPrice',
      deliveryIsInvalid: 'checkout/deliveryIsInvalid',
      personalIsInvalid: 'checkout/personalIsInvalid'
    }),
    selectDelivery () {
      return this.$store.getters['delivery/getItemById'](this.selectDeliveryId)
    }
  },
  watch: {
    deliveryIsInvalid () {
      this.setCheckoutInvalid(this.deliveryIsInvalid)
    }
  },
  methods: {
    ...mapActions({
      setCheckoutFieldAction: 'checkout/setField'
    }),
    setDefaultDelivery () {
      if (this.selectDeliveryId === null || this.selectDelivery === undefined) {
        this.setCheckoutFieldAction({
          field: 'delivery',
          value: this.defaultDeliveryId
        })
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
      this.setCheckoutFieldAction({
        field: 'delivery',
        value
      })
    },
    changePickup (value) {
      this.setCheckoutFieldAction({
        field: 'pickup',
        value
      })
    },
    setCheckoutInvalid (value) {
      this.setCheckoutFieldAction({
        field: 'invalid',
        value
      })
    }
  }
}
</script>

<style lang="scss">
.tm-checkout {
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
