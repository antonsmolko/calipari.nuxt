<template lang="pug">
  .tm-payment-card-list
    .uk-grid.uk-grid-small.uk-flex-column.uk-flex-middle(data-uk-grid)
      payment-card(
        v-for="card in cards"
        :key="cards.id"
        :item="card"
        @change="handleChange"
        @delete="handleDelete")
    .tm-payment__footer.uk-margin-medium-top
      button.uk-button.uk-button-primary(
        :disabled="!selectedPaymentId"
        @click="pay")
        span(v-html="payButtonText")
        i.uk-margin-small-left.uk-text-muted.uk-animation-fade(
          v-if="paymentProcess"
          data-uk-spinner="ratio: 0.7")
      .tm-payment__notice.uk-margin-top
        span.uk-text-muted.uk-text-small
          | Нажимая кнопку, вы принимаете&nbsp;
          nuxt-link.uk-link(to="/policy") условия сервиса
</template>

<script>
import { mapState, mapActions } from 'vuex'
import head from 'lodash/head'
import PaymentCard from '@/components/Payment/Cards/PaymentCard'
import { getFormatPrice } from '@/helpers'

export default {
  name: 'PaymentCards',
  components: { PaymentCard },
  props: {
    cards: {
      type: Array,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    paymentProcess: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    confirmContent: '<p class="tm-text-medium">Вы уверены что хотите удалить карту?</p>'
  }),
  computed: {
    ...mapState('payment', {
      selectedPaymentId: state => state.selectedPaymentId,
      paymentStatus: state => state.status
    }),
    payButtonText () {
      return `Заплатить <b>${getFormatPrice(this.amount)}</b>`
    }
  },
  methods: {
    ...mapActions({
      deletePaymentActions: 'checkout/deletePayment',
      setPaymentFieldAction: 'payment/setField'
    }),
    handleChange (id) {
      this.setPaymentFieldAction({ field: 'selectedPaymentId', value: id })
    },
    pay () {
      this.$emit('pay')
    },
    handleDelete (id) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Удалить',
        cancel: 'Отменить'
      }

      modal.confirm(this.confirmContent)
        .then(() => {
          this.deletePaymentActions(id)
          if (this.cards.length && this.selectedPaymentId === id) {
            const value = head(this.cards).id
            this.setPaymentFieldAction({ field: 'selectedPaymentId', value })
          }
        })
    }
  }
}
</script>

<style scoped>
.tm-payment-card-list {
  padding-top: 5px;
}
</style>
