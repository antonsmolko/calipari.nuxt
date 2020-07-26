<template lang="pug">
    Page
        template(#main)
            main
                TopBar(:title="pageTitle")
                    .uk-navbar-item
                        button.uk-close(type="button", data-uk-close, @click="onClose")
                SlideYDownTransition(v-show="pageTitle")
                    section.tm-orders.uk-section(
                        v-if="items.length"
                        :class="{ 'uk-light': darkPeriod }")
                        .uk-container
                            OrderListItem(
                                v-for="item in items"
                                :key="item.number"
                                :order="item"
                                @pay="onPay"
                                @cancel="onCancel")
                    section.uk-section.uk-section-xlarge.uk-text-center(
                        v-else :class="{ 'uk-light': darkPeriod }")
                        .uk-container
                            span.uk-heading-small Список заказов пуст
                            .uk-margin-medium-top
                                nuxt-link.uk-button.uk-button-primary(to="/profile") Назад
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/layout/Page.vue'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
import TopBar from '~/components/layout/TopBar'
import OrderListItem from '~/components/Orders/OrderListItem'
export default {
  name: 'Orders',
  scrollToTop: true,
  components: {
    Page,
    TopBar,
    OrderListItem
  },
  middleware: ['auth'],
  mixins: [scrollToTop, setLayout],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  async fetch ({ store }) {
    await store.dispatch('profile/getOrders')
    store.commit('SET_FIELDS', { pageTitle: 'Заказы' })
  },
  computed: {
    ...mapState({
      items: state => state.profile.orders
    })
  },
  methods: {
    ...mapActions({
      cancelOrderAction: 'profile/cancelOrder',
      addNotificationAction: 'notifications/addItem',
      createPaymentAction: 'payment/create'
    }),
    onPay (hash) {
      this.$router.push({ path: '/payment', query: { hash } })
    },
    onCancel (number) {
      this.cancelOrderAction(number)
        .then(() => this.addNotificationAction({
          message: `Заказ № ${number} успешно отменен.`,
          status: 'success'
        }))
    },
    onClose () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="scss">
    .tm-order-list {
        &__item {
            &:not(:last-child) {
                margin-bottom: $global-medium-margin;
            }

            @include media-mob($l) {
                &:not(:last-child) {
                    margin-bottom: $global-large-margin;
                }
            }
        }

        &__table {
            tr {
                @include media-desk($hm) {
                    display: flex;
                    flex-direction: column;
                    th {
                        display: none;
                    }
                }

                th {
                    font-family: $base-heading-font-family;
                    font-weight: $base-heading-font-weight;
                    text-transform: $base-heading-text-transform;
                    font-size: 1rem;
                    color: $global-muted-color;
                    @include media-mob($m) {
                        font-size: $global-font-size;
                        font-weight: $base-heading-font-weight;
                    }
                }

                td {
                    font-size: 16px;
                    font-weight: $base-strong-font-weight;
                    color: $global-emphasis-color;

                    &::before {
                        content: attr(data-label);
                        display: block;
                        width: 50%;
                        float: left;
                        font-family: $base-heading-font-family;
                        font-weight: $base-heading-font-weight;
                        text-transform: $base-heading-text-transform;
                        color: $global-muted-color;
                        text-align: left;
                        font-size: 16px;
                    }

                    &:not(:last-child) {
                        margin-bottom: 5px;
                    }

                    > span {
                        display: inline-block;
                        width: 50%;
                        line-height: 1.2;
                    }

                    @include media-mob($hm) {
                        font-size: 15px;
                        > span {
                            width: inherit;
                        }
                        &:last-child {
                            text-align: right;
                        }
                        &::before {
                            display: none;
                        }
                    }
                    @include media-mob($m) {
                        font-size: $global-small-font-size;
                    }
                }
            }
        }

        &__thumbs {
            padding-bottom: $global-small-gutter;
            margin-bottom: -$global-small-gutter;
            margin-right: -$global-small-gutter;

            li {
                height: 120px;

                img {
                    height: 100%;
                    width: auto;
                }

                &:last-child {
                    padding-right: $global-small-gutter;
                }
            }
        }
    }
</style>
