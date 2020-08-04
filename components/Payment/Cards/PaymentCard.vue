<template lang="pug">
  .tm-payment-card
    .tm-payment-card__container.uk-box-shadow-medium.tm-background__smoke.uk-flex.uk-flex-between.uk-flex-middle
      label.tm-payment-card__label.uk-flex.uk-flex-middle.uk-flex-between
        input.uk-radio(
          v-if="selectable"
          name="card"
          type="radio"
          :value="item.id"
          :checked="selected"
          @click="change")
        .tm-payment-card__info.uk-text-left
          span.tm-payment-card__number.uk-text-emphasis {{ formatCardNumber }}
          .tm-payment-card__info-footer
            span.tm-payment-card__expire.uk-text-muted {{ cardExpiry }}
        .tm-payment-card__type
          svg-static-sprite(:name="cardType" module="payment")
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
    },
    selectable: {
      type: Boolean,
      default: true
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
      return `${this.item.expiry_month} / ${this.item.expiry_year}`
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
    &__container {
      padding: 0 $global-small-gutter;
    }
    &__label {
      flex-grow: 1;
      margin-right: $global-margin;
    }
    &__info {
      padding: $global-small-gutter 0;
    }
    &__number {
      font-size: 1.2rem;
    }
    &__type {
      svg {
        width: 40px;
        height: 30px;
      }
    }
    @include media-desk($se) {
      &__label {
        margin-right: $global-gutter;
      }
      &__type {
        display: none;
      }
    }
    @include media-mob($s) {
      &__label {
        margin-right: $global-medium-margin;
      }
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
