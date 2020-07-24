<template lang="pug">
    Page
        template(#main)
            main(:class="{ 'uk-light': darkPeriod }")
                section.uk-section.uk-text-center
                    .uk-container
                        .uk-margin-large-bottom
                            h1.uk-heading-small.uk-margin-remove Оплата
                            span.uk-text-lead {{ payment.description }}
                            .uk-divider-small
                        FadeTransition(v-show="responseData")
                            #payment-form
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/layout/Page.vue'
export default {
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
  data: () => ({
    checkout: null,
    responseData: false
  }),
  computed: {
    ...mapState('payment', {
      payment: state => state.item
    })
  },
  async mounted () {
    // const hash = this.$route.params.hash
    // this.createPaymentAction(hash)
    //   .then(() => console.log(this.payment))
    // Инициализация виджета. Все параметры обязательные.
    const hash = this.$route.params.hash
    await this.createPaymentAction(hash)
    this.checkout = await new window.YandexCheckout({
      confirmation_token: this.payment.confirmation.confirmation_token, // Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
      return_url: 'https://localhost:3000/payment/complete', // Ссылка на страницу завершения оплаты
      error_callback (error) {
        throw error
      }
    })

    await this.checkout.render('payment-form')
    // console.log(this.checkout)
    this.responseData = true
    // Отображение платежной формы в контейнере
    // this.checkout.render('payment-form')
  },
  methods: {
    ...mapActions('payment', {
      createPaymentAction: 'create'
    })
  }
}
</script>
