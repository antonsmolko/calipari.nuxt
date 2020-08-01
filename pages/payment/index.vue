<template lang="pug">
  Page
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        SlideYDownTransition
          section.uk-section.uk-text-center(v-if="!$fetchState.pending && order")
            .uk-container
              .uk-margin-large-bottom
                h1.uk-heading-small.uk-margin-remove Оплата
                span.uk-text-lead Заказ № {{ order.number }}
                .uk-divider-small
              .uk-position-relative
                template(v-if="!paid")
                  .uk-flex.uk-flex-center(v-if="cardLength")
                    ul.uk-tab(data-uk-tab="connect: #payments-tab-content; animation: uk-animation-fade")
                      li.tm-tab__item(@click="handleTabClick('cards')")
                        a(href="#") Мои карты
                      li.tm-tab__item(@click="handleTabClick('kassa')")
                        a(href="#") Яндекс.Касса
                  ul.uk-switcher(v-if="cardLength" id="payments-tab-content")
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
                    v-if="!cardLength && order.number"
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

export default {
  middleware ({ route, redirect }) {
    const paymentHash = route.query.hash

    if (!paymentHash) {
      redirect('/notfound')
    }
  },
  scrollToTop: true,
  components: { Page, PaymentCards, PaymentForm },
  metaInfo () {
    return {
      script: [
        { src: 'https://kassa.yandex.ru/checkout-ui/v2.js' }
      ],
      title: 'Оплата'
    }
  },
  async fetch () {
    await this.$store.dispatch('profile/getOrderByHashForPayment', this.$route.query.hash)
  },
  data: () => ({
    formEnable: false,
    paymentProcess: false
  }),
  computed: {
    ...mapState({
      payment: state => state.payment.item,
      cards: state => state.checkout.savedPayments,
      tabName: state => state.payment.tabName,
      order: state => state.profile.order,
      paymentStatus: state => state.payment.status
    }),
    paid () {
      return this.paymentStatus === 'paid'
    },
    cardLength () {
      return this.cards.length
    }
  },
  watch: {
    cardsLength () {
      if (!this.cardLength && this.paymentStatus === 'enabled') {
        this.formEnable = true
      }
    }
  },
  created () {
    if (this.cardLength) {
      const value = head(this.cards).id
      this.setPaymentFieldAction({ field: 'selectedPaymentId', value })
      this.setPaymentFieldAction({ field: 'tabName', value: 'cards' })
    } else {
      this.formEnable = true
    }
  },
  methods: {
    ...mapActions('payment', {
      setPaymentFieldAction: 'setField',
      payWithIdAction: 'createWithId'
    }),
    handleTabClick (value) {
      if (value === 'kassa' && this.paymentStatus !== 'initiated') {
        this.formEnable = true
      }
    },
    payWithId () {
      this.paymentProcess = true
      this.payWithIdAction(this.order.number)
        .then((response) => {
          this.paymentProcess = false
          if (response.status === 'success') {
            this.$router.push('/')
          }
        })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setPaymentFieldAction({ field: 'status', value: null })
    next()
  }
}
</script>
