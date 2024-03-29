<template lang="pug">
  page
    template(#main)
      main
        top-bar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-icon="icon: close; ratio: 1.1", @click="onClose")
        slide-y-down-transition(v-show="pageTitle")
          section.uk-section.uk-position-relative(
            v-if="!$fetchState.pending && order"
            :class="{ 'uk-light': darkPeriod }"
            data-uk-height-viewport="offset-top: true; offset-bottom: true")
            slide-y-down-transition(mode="out-in")
              .tm-cart__content
                template(v-if="order.items.length")
                  .uk-container
                    .tm-checkout__header
                      span.uk-h2.uk-margin-remove Проекты
                      .uk-divider-small
                  .uk-container.tm-container__cart-items
                    table.tm-order-table
                      tbody
                        order-item(
                          v-for="item in order.items"
                          :key="item.id"
                          :item="item")
                template(v-if="order.sales.length")
                  .uk-container.tm-container__expand-mobile
                    hr.uk-margin-medium-top.uk-margin-medium-bottom(v-if="order.items.length")
                  sale-list(v-if="order.sales" :items="order.sales")
            .uk-container.tm-container__expand-mobile
              hr.uk-margin-medium-top.uk-margin-medium-bottom
              .tm-order-details.uk-grid.uk-grid-small.uk-grid-match.uk-margin-medium-top(
                data-uk-grid class="uk-child-width-1-2@s")
                .tm-order-details__block.tm-order-details__base-info
                  .uk-card.uk-card-small.uk-card-body.uk-box-shadow-medium
                    h4 Заказ
                    order-details-item(heading="Номер" :content="order.number")
                    order-details-item(heading="Дата" :content="order.date")
                    order-details-item(
                      heading="Статус"
                      :content="order.status.title"
                      :contentCss="statusCss")
                .tm-order-details__block.tm-order-details__delivery
                  .uk-card.uk-card-small.uk-card-body.uk-box-shadow-medium
                    h4.uk-h4 Детали доставки
                    order-details-item(heading="Доставка" :content="order.delivery.title")
                    order-details-item(heading="Адрес" :content="order.delivery.address")
                    order-details-item(heading="Получатель" :content="order.customer.name")
                    order-details-item(heading="Телефон" :content="phoneFormat")
                .tm-order-details__block.tm-order-details__comment(v-if="order.comment")
                  .uk-card.uk-card-small.uk-card-body
                    h4.uk-h4 Комментарий
                    order-details-item(:content="order.comment")
                .tm-order-details__block.tm-order-details__price
                  .uk-card.uk-card-small.uk-card-body.uk-box-shadow-medium
                    h4.uk-h4 Цена
                    order-details-item(
                      heading="Заказ"
                      :content="getFormatPrice(order.price)")
                    order-details-item(
                      heading="Доставка"
                      :content="getFormatPrice(order.delivery.price)")
                    order-details-item(
                      class="tm-order-details__total"
                      heading="Итого"
                      :content="getFormatPrice(order.price + order.delivery.price)")
              .tm-order-details__buttons.uk-margin-medium-top(
                v-if="order.status.alias === 'processing' || order.status.alias === 'confirmed'"
                class="uk-visible@l")
                button.uk-button.tm-button-success.uk-margin-right(
                  v-if="order.status.alias === 'confirmed'"
                  @click="pay") Оплатить
                nuxt-link.uk-button.tm-button-success.uk-margin-right(
                  :to="`/reviews/create?hash=${order.hash}`"
                  v-if="order.status.alias === 'completed' && !order.has_review") Написать отзыв
                button.uk-button.uk-button-danger(
                  @click="cancel"
                  :disabled="sending") Отменить
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar'
import OrderItem from '@/components/Orders/OrderItem'
import SaleList from '@/components/Cart/SaleList'
import OrderDetailsItem from '@/components/Orders/OrderDetailsItem'
import scrollToTop from '@/components/mixins/scrollToTop'
import { getFormatPrice, getPhoneFormat } from '@/helpers'
import noindexPageMeta from '@/components/mixins/noindexPageMeta'

export default {
  scrollToTop: true,
  middleware: 'auth',
  components: {
    Page,
    TopBar,
    OrderItem,
    SaleList,
    OrderDetailsItem
  },
  mixins: [scrollToTop, noindexPageMeta],
  async fetch () {
    const orderNumber = this.$route.params.number
    this.setFieldAction({ field: 'pageTitle', value: `Заказ № ${orderNumber}` })
    await this.getItemAction(orderNumber)
  },
  data: () => ({
    sending: false
  }),
  computed: {
    ...mapState('orders', {
      order: state => state.item
    }),
    statusCss () {
      switch (this.order.status.alias) {
        case 'canceled':
          return 'uk-label uk-label-danger tm-text-medium'
        case 'completed':
          return 'uk-label uk-label-success tm-text-medium'
        default:
          return 'uk-label tm-text-medium'
      }
    },
    phoneFormat () {
      return getPhoneFormat(this.order.customer.phone)
    }
  },
  beforeDestroy () {
    this.setOrdersFieldAction({ field: 'item', value: null })
  },
  methods: {
    ...mapActions({
      getItemAction: 'orders/getItem',
      cancelAction: 'orders/cancel',
      setOrdersFieldAction: 'orders/setField',
      addNotificationAction: 'notifications/addItem'
    }),
    onClose () {
      this.$router.push('/profile/orders')
    },
    getFormatPrice (price) {
      return getFormatPrice(price)
    },
    pay () {
      this.$router.push({
        path: '/payment',
        query: { hash: this.order.hash_number }
      })
    },
    cancel () {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Подтвердить',
        cancel: 'Отменить'
      }

      modal.confirm('<p class="tm-text-medium">Вы уверены, что хотите отменить заказ?</p>')
        .then(() => {
          this.sending = true
          this.cancelAction(this.order.number)
            .then(() => {
              this.addNotificationAction({
                message: `Заказ № ${this.order.number} успешно отменен.`,
                status: 'success'
              })
              this.sending = false
            })
        })
    }
  }
}
</script>

<style lang="scss">
.tm-order-details {
  &__block {
    .uk-card {
      background: $background-smoke;

      .uk-light & {
        background: $inverse-background-smoke;
      }
    }

    //@include media-desk($hm) {
    //  &:nth-child(odd) {
    //    .uk-card {
    //      //margin: 0 0 0 (-$global-gutter);
    //      padding: $global-margin $global-margin $global-margin $global-gutter;
    //    }
    //  }
    //  &:nth-child(even) {
    //    .uk-card {
    //      margin: 0 (-$global-gutter) 0 0;
    //      padding: $global-margin $global-gutter $global-margin $global-margin;
    //    }
    //  }
    //}
    //@include media-desk($s) {
    //  &:nth-child(odd), &:nth-child(even) {
    //    .uk-card {
    //      //margin: 0 (-$global-small-gutter);
    //      padding: $global-margin $global-small-gutter;
    //    }
    //  }
    //}
  }

  &__total {
    font-size: $global-large-font-size !important;
  }
}
</style>
