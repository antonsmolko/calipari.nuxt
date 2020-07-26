<template lang="pug">
    Page
        template(#main)
            main(:class="{ 'uk-light': darkPeriod }")
                section.uk-section.uk-text-center
                    .uk-container
                        .uk-margin-large-bottom
                            h1.uk-heading-small.uk-margin-remove Оплата
                            span.uk-text-lead(v-if="initiated") {{ payment.description }}
                            .uk-divider-small
                        .uk-position-relative
                            #payment-form(v-show="initiated")
                            .uk-position-top.uk-flex.uk-flex-middle(v-show="!initiated && !paid")
                                .uk-margin-auto.uk-text-muted(data-uk-spinner="ratio: 3")
                            SlideYDownTransition
                                div(v-if="paid")
                                    p.tm-text-medium Заказ уже оплачен!
                                    nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/") На главную
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/layout/Page.vue'

export default {
  middleware ({ route, redirect }) {
    const paymentHash = route.query.hash

    if (!paymentHash) {
      redirect('/notfound')
    }
  },
  scrollToTop: true,
  components: { Page },
  metaInfo () {
    return {
      script: [
        { src: 'https://kassa.yandex.ru/checkout-ui/v2.js' }
      ],
      title: 'Оплата'
    }
  },
  async fetch () {
    await this.$store.dispatch('payment/create', {
      hash: this.$route.query.hash,
      paymentMethodId: this.$store.state.checkout.paymentMethodId
    })
  },
  data: () => ({
    checkout: null,
    responseData: false
  }),
  computed: {
    ...mapState('payment', {
      payment: state => state.item,
      paymentStatus: state => state.status
    }),
    initiated () {
      return this.paymentStatus === 'initiated'
    },
    paid () {
      return this.paymentStatus === 'paid'
    },
    created () {
      return this.paymentStatus === 'created'
    },
    colorScheme () {
      return this.darkPeriod
        ? {
          background: '#222222',
          controlPrimaryContent: '#FFFFFF',
          controlSecondary: '#666666',
          border: '#444444',
          text: '#DBDCE0'
        }
        : {}
    }
  },
  watch: {
    paymentStatus () {
      if (this.created) {
        this.initializeYandexWidget()
      }
    }
  },
  methods: {
    ...mapActions('payment', {
      createPaymentAction: 'create',
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
            ...this.colorScheme
          }
        },
        error_callback (error) {
          throw error
        }
      })
      await this.checkout.render('payment-form')
      this.setPaymentFieldAction({ field: 'status', value: 'initiated' })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setPaymentFieldAction({ field: 'item', value: null })
    this.setPaymentFieldAction({ field: 'status', value: null })
    next()
  }
}
</script>
