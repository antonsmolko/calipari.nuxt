<template lang="pug">
  .tm-payment__cards
    .uk-grid.uk-grid-small.uk-flex-column.uk-flex-middle(data-uk-grid)
      payment-card.uk-width-xlarge(
        v-for="card in cards"
        :key="cards.id"
        :item="card"
        @change="handleChange"
        @delete="handleDelete")
    .tm-payment__footer.uk-margin-medium-top
      button.tm-payment__pay-button.uk-button.uk-button-primary.uk-margin-auto(
        :disabled="!selectedPaymentId || paymentProcess"
        @click="pay")
        span(v-html="payButtonText")
        i.tm-payment__pay-button-spinner.uk-margin-small-left.uk-text-muted.uk-animation-fade(
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
    confirmContent: '<p class="tm-text-medium">Вы уверены, что хотите удалить карту?</p>'
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
      deleteCardAction: 'checkout/deleteCard',
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
          this.deleteCardAction(id)
          if (this.cards.length && this.selectedPaymentId === id) {
            const value = head(this.cards).id
            this.setPaymentFieldAction({ field: 'selectedPaymentId', value })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tm-payment__cards {
  padding-top: 5px;
}
.tm-payment-card {
  &:not(:first-child) {
    margin-top: $global-small-gutter;
  }
}
.tm-payment__pay-button {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background .25s ease, color .25s ease;
  &:disabled {
    background: lighten($global-primary-background, 3%);
    color: $inverse-global-muted-color;
    &:hover {
      background: lighten($global-primary-background, 3%);
      color: $inverse-global-muted-color;
    }
  }
  &-spinner {
    margin-right: -10px;
  }
}
</style>
