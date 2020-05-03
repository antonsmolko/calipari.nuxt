<template lang="pug">
    main
        TopBar(:title="pageTitle")
            .uk-navbar-item
                button.uk-close(type="button", data-uk-close, @click="onClose")
        SlideYDownTransition(v-show="pageTitle")
            section.uk-section.uk-position-relative(
                v-if="order.items.length"
                :class="{ 'uk-light': darkPeriod }"
                data-uk-height-viewport="offset-top: true; offset-bottom: true")
                .uk-container.tm-cart__container
                    SlideYDownTransition(mode="out-in")
                        .tm-cart__content
                            table.tm-order-table
                                tbody
                                    OrderItem(
                                        v-for="(item, index) in order.items"
                                        :key="index"
                                        :item="item"
                                    )
                    .tm-order-details.uk-grid.uk-grid-small.uk-grid-match.uk-margin-medium-top(
                        data-uk-grid class="uk-child-width-1-2@s")
                        .tm-order-details__block.tm-order-details__base-info
                            .uk-card.uk-card-small.uk-card-body
                                h4.uk-h4.uk-text-background Заказ
                                OrderDetailsItem(heading="Номер" :content="order.number")
                                OrderDetailsItem(heading="Дата" :content="order.date")
                                OrderDetailsItem(heading="Статус" :content="order.status.title")
                        .tm-order-details__block.tm-order-details__delivery
                            .uk-card.uk-card-small.uk-card-body
                                h4.uk-h4.uk-text-background Детали доставки
                                OrderDetailsItem(heading="Доставка" :content="order.delivery.title")
                                OrderDetailsItem(heading="Адрес" :content="order.delivery.address")
                                OrderDetailsItem(heading="Получатель" :content="order.customer.name")
                                OrderDetailsItem(heading="Телефон" :content="order.customer.phone")
                        .tm-order-details__block.tm-order-details__comment(v-if="order.comment")
                            .uk-card.uk-card-small.uk-card-body
                                h4.uk-h4.uk-text-background Комментарий
                                OrderDetailsItem(:content="order.comment")
                        .tm-order-details__block.tm-order-details__price
                            .uk-card.uk-card-small.uk-card-body
                                h4.uk-h4.uk-text-background Цена
                                OrderDetailsItem(
                                    heading="Заказ"
                                    :content="getFormatPrice(order.price - order.delivery.price)")
                                OrderDetailsItem(
                                    heading="Доставка"
                                    :content="getFormatPrice(order.delivery.price)")
                                OrderDetailsItem(
                                    class="tm-order-details__total"
                                    heading="Итого"
                                    :content="getFormatPrice(order.price)")
                    .tm-order-details__buttons.uk-margin-medium-top(
                        v-if="order.status.alias === 'processing' || order.status.alias === 'confirmed'"
                        class="uk-visible@l")
                        button.uk-button.tm-button-success.uk-margin-right(
                            v-if="order.status.alias === 'confirmed'"
                            @click="onPay") Оплатить
                        button.uk-button.uk-button-danger(@click="onCancel") Отменить
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopBar from '~/components/layout/TopBar'
import OrderItem from '~/components/Orders/OrderItem'
import OrderDetailsItem from '~/components/Orders/OrderDetailsItem'
import { getFormatPrice } from '~/helpers'

export default {
  scrollToTop: true,
  components: {
    TopBar,
    OrderItem,
    OrderDetailsItem
  },
  // middleware: ['auth'],
  async fetch ({ route, store }) {
    const orderNumber = route.params.number
    await store.dispatch('profile/getOrder', orderNumber)
    store.commit('SET_FIELDS', { pageTitle: `Заказ # ${orderNumber}` })
  },
  computed: {
    ...mapState('profile', {
      order: state => state.order
    })
  },
  methods: {
    ...mapActions({
      cancelOrderAction: 'profile/cancelOrder',
      addNotificationAction: 'notifications/addItem'
    }),
    onClose () {
      this.$router.push('/profile/orders')
    },
    getFormatPrice (price) {
      return getFormatPrice(price)
    },
    onPay () {
      this.$router.push(`/payment/${this.order.hash_number}`)
    },
    onCancel () {
      this.cancelOrderAction(this.order.number)
        .then(() => {
          this.addNotificationAction({
            message: `Заказ № ${this.order.number} успешно отменен.`,
            status: 'success'
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
        @include media-desk($hm) {
            &:nth-child(odd) {
                .uk-card {
                    margin: 0 0 0 (-$global-gutter);
                    padding: $global-margin $global-margin $global-margin $global-gutter;
                }
            }
            &:nth-child(even) {
                .uk-card {
                    margin: 0 (-$global-gutter) 0 0;
                    padding: $global-margin $global-gutter $global-margin $global-margin;
                }
            }
        }
        @include media-desk($s) {
            &:nth-child(odd), &:nth-child(even) {
                .uk-card {
                    margin: 0 (-$global-small-gutter);
                    padding: $global-margin $global-small-gutter;
                }
            }
        }
    }
    &__total {
        font-size: $global-large-font-size !important;
    }
}
</style>
