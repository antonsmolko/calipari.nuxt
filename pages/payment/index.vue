<template lang="pug">
  Page
    template(#main)
      main
        TopBar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-close, @click="close")
        SlideYDownTransition
          section.uk-section.uk-text-center(
            v-if="!$fetchState.pending && order"
            :class="{ 'uk-light': darkPeriod }")
            .uk-container
              .uk-margin-large-bottom
                h1.uk-heading-small.uk-margin-remove Оплата
                span.uk-text-lead Заказ № {{ order.number }}
                .uk-divider-small
              .uk-position-relative
                template(v-if="!paid")
                  .uk-flex.uk-flex-center(v-if="cardsLength")
                    ul.uk-tab(data-uk-tab="connect: #payments-tab-content; animation: uk-animation-fade")
                      li.tm-tab__item(@click="handleTabClick('cards')")
                        a(href="#") Мои карты
                      li.tm-tab__item(@click="handleTabClick('form')")
                        a(href="#") Яндекс.Касса
                  ul.uk-switcher(v-if="cardsLength" id="payments-tab-content")
                    li
                      payment-cards(
                        v-if="order.price"
                        :cards="cards"
                        :amount="order.price"
                        :paymentProcess="paymentProcess"
                        @pay="payWithId")
                    li(v-if="order.number")
                      payment-form(:enable="formEnable" :orderNumber="order.number")
                  payment-form(
                    v-if="!cardsLength && order.number"
                    :orderNumber="order.number"
                    :enable="formEnable")
                SlideYDownTransition
                  div(v-if="paid")
                    p.tm-text-medium Заказ уже оплачен!
                    nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/") На главную
</template>

<script>
import { mapState, mapActions } from 'vuex'
import head from 'lodash/head'
import Page from '@/components/layout/Page.vue'
import PaymentCards from '@/components/Payment/Cards/PaymentCards'
import PaymentForm from '@/components/Payment/PaymentForm'
import TopBar from '@/components/layout/TopBar'
import scrollToTop from '@/components/mixins/scrollToTop'

export default {
  scrollToTop: true,
  middleware ({ route, redirect }) {
    const paymentHash = route.query.hash

    if (!paymentHash) {
      redirect('/notfound')
    }
  },
  components: { Page, TopBar, PaymentCards, PaymentForm },
  mixins: [scrollToTop],
  metaInfo () {
    return {
      script: [
        { src: 'https://kassa.yandex.ru/checkout-ui/v2.js' }
      ],
      title: this.pageTitle
    }
  },
  async fetch () {
    this.setFieldAction({ field: 'pageTitle', value: 'Оплата заказа' })
    await this.getOrderByHash(this.$route.query.hash)
      .then(response => this.$store.commit('payment/SET_FIELD', {
        field: 'status',
        value: response.status
      }))
  },
  data: () => ({
    formEnable: false,
    paymentProcess: false
  }),
  computed: {
    ...mapState({
      payment: state => state.payment.item,
      cards: state => state.checkout.cards,
      order: state => state.orders.item,
      paymentStatus: state => state.payment.status
    }),
    paid () {
      return this.paymentStatus === 'paid'
    },
    cardsLength () {
      return this.cards.length
    }
  },
  watch: {
    cardsLength () {
      if (!this.cardsLength) {
        this.setPaymentFieldAction({ field: 'status', value: 'enabled' })
        this.formEnable = true
      }
    }
  },
  created () {
    this.syncCardsAction()
    if (this.cardsLength) {
      const value = head(this.cards).id
      this.setPaymentFieldAction({ field: 'selectedPaymentId', value })
    } else {
      this.formEnable = true
    }
  },
  beforeDestroy () {
    this.setOrderField({ field: 'item', value: null })
  },
  methods: {
    ...mapActions({
      setOrderField: 'orders/setField',
      getOrderByHash: 'orders/getItemByHash',
      setPaymentFieldAction: 'payment/setField',
      payWithIdAction: 'payment/createWithId',
      syncCardsAction: 'checkout/syncCards'
    }),
    handleTabClick (value) {
      if (value === 'form' && this.paymentStatus !== 'initiated') {
        this.formEnable = true
      }
    },
    payWithId () {
      this.paymentProcess = true
      this.payWithIdAction(this.order.number)
        .then((response) => {
          if (response.status === 'success') {
            this.close()
          }
        })
    },
    close () {
      const redirectPath = this.$auth.loggedIn ? '/profile/orders' : '/'
      this.$router.push(redirectPath)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setPaymentFieldAction({ field: 'status', value: null })
    next()
  }
}
</script>
