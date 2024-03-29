<template lang="pug">
  page
    template(#main)
      main
        top-bar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-icon="icon: close; ratio: 1.1", @click="close")
        slide-y-down-transition(v-show="!$fetchState.pending && pageTitle")
          section.tm-orders.uk-section(
            v-if="items.length"
            :class="{ 'uk-light': darkPeriod }")
            .uk-container.tm-container__expand-mobile
              order-list-item(
                v-for="item in items"
                :key="item.number"
                :order="item"
                @pay="pay"
                @cancel="cancel")
          section.uk-section.uk-section-xlarge.uk-text-center(
            v-else :class="{ 'uk-light': darkPeriod }")
            .uk-container
              span.uk-heading-small Список заказов пуст
              .uk-margin-medium-top
                nuxt-link.uk-button.uk-button-primary(to="/profile") Назад
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import setLayout from '@/components/mixins/setLayout'
import OrderListItem from '@/components/Orders/OrderListItem'
import TopBar from '@/components/layout/TopBar'
import scrollToTop from '@/components/mixins/scrollToTop'
import noindexPageMeta from '@/components/mixins/noindexPageMeta'

export default {
  name: 'Orders',
  scrollToTop: true,
  components: {
    Page,
    TopBar,
    OrderListItem
  },
  middleware: 'auth',
  mixins: [scrollToTop, setLayout, noindexPageMeta],
  async fetch () {
    this.setFieldAction({ field: 'pageTitle', value: 'Заказы' })
    await this.getItemsAction()
  },
  computed: {
    ...mapState({
      items: state => state.orders.items
    })
  },
  beforeDestroy () {
    this.setOrdersField({ field: 'items', value: [] })
  },
  methods: {
    ...mapActions({
      setOrdersField: 'orders/setField',
      getItemsAction: 'orders/getItems',
      cancelOrderAction: 'orders/cancel',
      addNotificationAction: 'notifications/addItem',
      createPaymentAction: 'payment/create'
    }),
    pay (hash) {
      this.$router.push({
        path: '/payment',
        query: { hash }
      })
    },
    cancel (number) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Подтвердить',
        cancel: 'Отменить'
      }

      modal.confirm('<p class="tm-text-medium">Вы уверены, что хотите отменить заказ?</p>')
        .then(() => {
          this.cancelOrderAction(number)
            .then(() => this.addNotificationAction({
              message: `Заказ № ${number} успешно отменен.`,
              status: 'success'
            }))
        })
    },
    close () {
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
