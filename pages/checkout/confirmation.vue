<template lang="pug">
  Page
    template(#main)
      CheckoutLayout(
        v-show="!deliveryIsInvalid && enabled"
        title="Подтверждение"
        :price="totalPrice"
        buttonNextIcon="check"
        buttonNextStyle="uk-button-danger"
        @confirm="onNext")
        template(#content)
          SlideYDownTransition(v-show="pageTitle && !pending")
            div
              CartList(:items="items")
              .uk-container.uk-margin-medium-top
                .tm-confirmation__info.uk-grid(
                  class="uk-child-width-1-2@s"
                  data-uk-grid)
                  .tm-confirmation__details
                    CheckoutOrderDetailsItem(
                      heading="Оплата"
                      content="Безналичный расчет")
                    CheckoutOrderDetailsItem(
                      heading="ФИО"
                      :content="fullName")
                    CheckoutOrderDetailsItem(
                      heading="Email"
                      :content="customer.email")
                    CheckoutOrderDetailsItem(
                      heading="Телефон"
                      :content="customer.phone")
                    CheckoutOrderDetailsItem(
                      heading="Способ доставки"
                      :content="delivery.title")
                    CheckoutOrderDetailsItem(
                      heading="Населенный пункт"
                      :content="locality")
                    CheckoutOrderDetailsItem(
                      v-if="delivery.alias === 'cdek' && !deliveryIsInvalid"
                      heading="Пункт выдачи заказа"
                      :content="deliveryDetails.pvz.address")
                    CheckoutOrderDetailsItem(
                      v-else-if="!deliveryIsInvalid"
                      heading="Адрес доставки"
                      :content="address")
                    CheckoutOrderDetailsItem(
                      v-if="deliveryDetails.price"
                      heading="Стоимость доставки"
                      :content="deliveryFormatPrice")
                  .tm-confirmation__comment.uk-flex.uk-flex-column
                    label.uk-form-label Комментарий к заказу
                    textarea.uk-textarea.uk-flex-1.uk-box-shadow-medium(
                      :value="comment"
                      @input="onInputComment")
                .uk-width-1-1.uk-margin-large-top(class="uk-visible@l")
                  .uk-flex.uk-flex-between
                    button.uk-button.uk-button-danger(
                      @click.prevent="onPrev") Назад
                    .uk-flex.uk-flex-middle
                      span.uk-h5.tm-total-price__heading Цена
                      span.uk-text-large.uk-text-emphasis {{ totalFormatPrice }}
                      button.uk-button.uk-button-danger.uk-margin-left(
                        @click.prevent="onNext") Оформить

          .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-if="pending")
            span.uk-text-large Подождите<br>Заказ отправляется...
            .uk-margin-top.uk-tex-muted(data-uk-spinner="ratio: 3")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import CheckoutLayout from '@/components/Checkout/CheckoutLayout'
import { getFormatPrice } from '@/components/helpers'
import scrollToTop from '@/components/mixins/scrollToTop'
import CartList from '@/components/Cart/CartList'
import CheckoutOrderDetailsItem from '@/components/Checkout/CheckoutOrderDetailsItem'

export default {
  components: {
    Page,
    CheckoutOrderDetailsItem,
    CheckoutLayout,
    CartList
  },
  mixins: [scrollToTop],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  async fetch ({ store }) {
    store.commit('SET_FIELDS', { pageTitle: 'Оформление заказа. Подтверждение' })
    await store.$api.$get('/delivery')
      .then(response => store.commit('delivery/SET_ITEMS', response))
  },
  data: () => ({
    pending: false
  }),
  computed: {
    ...mapState({
      items: state => state.cart.items,
      customer: state => state.checkout.customer,
      comment: state => state.checkout.comment,
      enabled: state => state.checkout.enabled,
      deliveryId: state => state.checkout.delivery,
      pickup: state => state.checkout.pickup
    }),
    ...mapGetters('checkout', [
      'totalPrice',
      'deliveryDetails',
      'fullName',
      'localityString',
      'deliveryIsInvalid'
    ]),
    totalFormatPrice () {
      return getFormatPrice(this.totalPrice)
    },
    deliveryFormatPrice () {
      return getFormatPrice(this.deliveryDetails.price)
    },
    delivery () {
      return this.$store.getters['delivery/getItemById'](this.deliveryId)
    },
    locality () {
      return this.delivery.pickup
        ? this.pickup.locality
        : this.localityString
    },
    address () {
      return this.delivery.pickup
        ? this.pickup.address
        : this.deliveryDetails.address
    }
  },
  created () {
    if (this.deliveryIsInvalid) {
      this.$router.push('/checkout/delivery')
    }
  },
  methods: {
    ...mapActions({
      orderConfirmAction: 'checkout/orderConfirm',
      setCheckoutFieldsAction: 'checkout/setFields',
      setCheckoutFieldAction: 'checkout/setField',
      setCartFieldsAction: 'cart/setFields'
    }),
    onPrev () {
      this.$router.push('/checkout/delivery')
    },
    async onNext () {
      this.pending = true
      await this.orderConfirmAction()
      await this.setCartFieldsAction({
        items: [],
        totalPrice: null
      })
      await this.$router.push('/')
      await this.setCheckoutFieldsAction({
        enabled: false,
        comment: ''
      })
      this.pending = false
    },
    onInputComment (e) {
      const value = e.target.value
      this.setCheckoutFieldAction({
        field: 'comment',
        value
      })
    }
  }
}
</script>

<style lang="scss">
.tm-checkout {
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: $global-medium-margin;

    .uk-button {
      margin-left: $global-margin;
    }
  }

  .tm-total-price__heading {
    margin: 5px $global-small-margin 0 0 !important;
  }
}

.tm-confirmation__comment {
  .uk-textarea {
    min-height: 200px;
  }
}
</style>
