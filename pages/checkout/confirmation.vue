<template lang="pug">
  page(v-if="!$fetchState.pending")
    template(#main)
      checkout-layout(
        v-show="!deliveryIsInvalid && enabled"
        title="Подтверждение"
        :price="totalPrice"
        buttonNextIcon="check"
        buttonNextStyle="uk-button-danger"
        :altContent="true"
        @confirm="onNext")
        template(#alt-content)
          slide-y-down-transition(v-show="pageTitle && !pending")
            section.uk-section(:class="{ 'uk-light': darkPeriod }")
              cart-list(v-if="items.length" :items="items")
              .uk-container.uk-margin-medium(v-if="items.length && sales.length")
                hr
              sale-list(
                v-if="sales.length"
                :items="sales"
                @delete="deleteSale")
              .uk-container.uk-margin-medium(v-if="sales.length")
                hr(v-if="items.length")
              .uk-container.uk-margin-medium-top
                .tm-confirmation__info.uk-grid(
                  class="uk-child-width-1-2@s"
                  data-uk-grid)
                  .tm-confirmation__details
                    checkout-order-details-item(
                      heading="Оплата"
                      content="Безналичный расчет")
                    checkout-order-details-item(
                      heading="ФИО"
                      :content="fullName")
                    checkout-order-details-item(
                      heading="Email"
                      :content="customer.email")
                    checkout-order-details-item(
                      heading="Телефон"
                      :content="customer.phone")
                    checkout-order-details-item(
                      heading="Способ доставки"
                      :content="delivery.title")
                    checkout-order-details-item(
                      heading="Населенный пункт"
                      :content="locality")
                    checkout-order-details-item(
                      v-if="delivery.alias === 'cdek' && !deliveryIsInvalid"
                      heading="Пункт выдачи заказа"
                      :content="deliveryDetails.pvz.address")
                    checkout-order-details-item(
                      v-else-if="!deliveryIsInvalid"
                      heading="Адрес доставки"
                      :content="address")
                    checkout-order-details-item(
                      v-if="deliveryDetails.price"
                      heading="Стоимость доставки"
                      :content="deliveryFormatPrice")
                  .tm-confirmation__comment.uk-flex.uk-flex-column
                    label.uk-form-label Комментарий к заказу
                    textarea.uk-textarea.uk-flex-1.uk-box-shadow-medium(
                      :value="comment"
                      @input="onInputComment")
                .uk-width-1-1.uk-margin-large-top(class="uk-visible@l")
                  .uk-flex.uk-flex-between.uk-flex-middle
                    button.uk-button.uk-button-danger(
                      @click.prevent="onPrev") Назад
                    .uk-flex.uk-flex-middle
                      span.tm-total-price.uk-text-emphasis {{ totalFormatPrice }}
                      button.uk-button.uk-button-danger.uk-margin-left(
                        @click.prevent="onNext") Оформить

          .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(
            :class="{ 'uk-light': darkPeriod }"
            v-if="pending")
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
import SaleList from '@/components/Cart/SaleList'
import CheckoutOrderDetailsItem from '@/components/Checkout/CheckoutOrderDetailsItem'

export default {
  components: {
    Page,
    CheckoutOrderDetailsItem,
    CheckoutLayout,
    CartList,
    SaleList
  },
  mixins: [scrollToTop],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  async fetch () {
    await Promise.all([
      this.getDeliveryItemsAction(),
      this.getCartSalesAction()
    ])
    this.setFieldAction({ field: 'pageTitle', value: 'Оформление заказа. Подтверждение' })
  },
  data: () => ({
    pending: false
  }),
  computed: {
    ...mapState({
      items: state => state.cart.items,
      sales: state => state.cart.sales,
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
      setCartFieldsAction: 'cart/setFields',
      getCartSalesAction: 'cart/getAvailableCartSales',
      getDeliveryItemsAction: 'delivery/getItems',
      deleteSaleAction: 'cart/deleteSale'
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
    },
    deleteSale (id) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Удалить',
        cancel: 'Отменить'
      }

      modal.confirm(this.$conf.beforeCartItemDeletingConfirmationContent)
        .then(() => this.deleteSaleAction(id))
    }
  }
}
</script>

<style lang="scss">
.tm-confirmation__comment {
  .uk-textarea {
    min-height: 200px;
  }
}
</style>
