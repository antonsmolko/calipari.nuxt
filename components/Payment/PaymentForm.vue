<template lang="pug">
  .uk-position-relative
    #payment-form
    .uk-position-top.uk-flex.uk-flex-middle(v-show="creating")
      .uk-margin-auto.uk-text-muted(data-uk-spinner="ratio: 3")
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PaymentForm',
  props: {
    orderNumber: {
      type: String,
      required: true
    },
    enable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    checkout: null
  }),
  computed: {
    ...mapState({
      payment: state => state.payment.item,
      paymentStatus: state => state.payment.status,
      cards: state => state.checkout.savedPayments
    }),
    creating () {
      return this.paymentStatus === 'creating'
    },
    colorScheme () {
      return this.darkPeriod
        ? {
          background: '#343434',
          controlSecondary: '#444444',
          border: '#444444',
          text: '#DBDCE0'
        }
        : {}
    },
    cardsLength () {
      return this.cards.length
    }
  },
  watch: {
    enable () {
      this.formEnabled()
    }
  },
  created () {
    this.formEnabled()
  },
  methods: {
    ...mapActions('payment', {

      createAction: 'create',
      setPaymentFieldAction: 'setField'
    }),
    async initializeYandexWidget () {
      const confirmationToken = this.payment.confirmation.confirmation_token

      this.checkout = await new window.YandexCheckout({
        language: 'ru',
        confirmation_token: confirmationToken,
        return_url: `${process.env.baseUrl}/payment/complete?token=${confirmationToken}&id=${this.payment.id}`,
        customization: {
          colors: {
            controlPrimary: '#1E90FF',
            controlPrimaryContent: '#FFFFFF',
            ...this.colorScheme
          }
        },
        error_callback (error) {
          throw error
        }
      })
      await this.checkout.render('payment-form')
      this.setPaymentFieldAction({ field: 'status', value: 'initiated' })
    },
    async formEnabled () {
      if (this.enable && this.paymentStatus === 'enabled') {
        this.setPaymentFieldAction({ field: 'status', value: 'creating' })
        await this.createAction(this.orderNumber)
        await this.initializeYandexWidget()
      }
    }
  }
}
</script>
