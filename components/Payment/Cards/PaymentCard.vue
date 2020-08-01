<template lang="pug">
  .tm-payment-card.uk-width-xlarge
    .tm-payment-card__container.uk-box-shadow-medium.tm-background__smoke
      label.uk-flex.uk-flex-middle.uk-flex-between
        input.uk-radio(
          name="card"
          type="radio"
          :value="item.id"
          :checked="selected"
          @click="change")
        .tm-payment-card__info.uk-text-left
          span.tm-payment-card__number.uk-h4 {{ formatCardNumber }}
          .tm-payment-card__info-footer
            span.tm-payment-card__expire.uk-h5.uk-text-muted {{ cardExpiry }}
            //img.payment-card__bank-logo
        .tm-payment-card__type
          svg-icon(:name="`payment/${cardType}`")
        .tm-payment-card__trash
          button.uk-icon-button(data-uk-icon="trash" @click="onDelete")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PaymentCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      selectedPaymentId: state => state.payment.selectedPaymentId
    }),
    formatCardNumber () {
      const cardNumber = `${this.item.first6}******${this.item.last4}`

      return cardNumber.match(/.{1,4}/g).join(' ')
    },
    cardExpiry () {
      return `${this.item.expiry_month}  /${this.item.expiry_year}`
    },
    cardType () {
      return this.item.card_type.toLowerCase()
    },
    selected () {
      return this.item.id === this.selectedPaymentId
    }
  },
  methods: {
    change () {
      this.$emit('change', this.item.id)
    },
    onDelete () {
      this.$emit('delete', this.item.id)
    }
  }
}
</script>

<style lang="scss">
  .tm-payment-card {
    cursor: pointer;
    &:not(:first-child) {
      margin-top: $global-small-gutter;
    }
    &__container {
      padding: 0 $global-small-gutter;
    }
    &__info {
      padding: $global-small-gutter 0;
    }
    &__type {
      svg {
        width: 40px;
        height: 30px;
      }
    }
    @include media-desk($se) {
      &__type {
        display: none;
      }
    }
    @include media-mob($s) {
      &__container {
        padding: 0 $global-gutter;
      }
      &__info {
        padding: $global-gutter 0;
      }
      &__number {
        font-size: $global-large-font-size;
      }
      &__type {
        svg {
          width: 60px;
          height: 45px;
        }
      }
    }
  }
</style>
