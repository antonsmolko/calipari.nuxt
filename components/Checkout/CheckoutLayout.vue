<template lang="pug">
  div(v-show="isEnabled")
    top-bar(
      :title="title")
      //.uk-navbar-item(class="uk-visible@l")
          //span.uk-h5.tm-total-price__heading Цена
          //span.uk-text-large.uk-text-emphasis {{ formatPrice }}
      .uk-navbar-item
        button.uk-close(type="button", data-uk-close, @click="onClose")
    section.uk-section(
      v-if="!altContent"
      :class="{ 'uk-light': darkPeriod }"
      data-uk-height-viewport="offset-top: true; offset-bottom: true")
      .uk-container
        slot(name="content")
    slot(name="alt-content")
    slide-y-down-transition(mode="out-in")
      checkout-bottom-bar(
        :price="formatPrice"
        :nextIcon="buttonNextIcon"
        :nextDisabled="invalid"
        :buttonNextStyle="buttonNextStyle"
        @next="onNext")
    .uk-padding(class="uk-hidden@l")
</template>
<script>
import { mapState } from 'vuex'
import { getFormatPrice } from '@/components/helpers'
import TopBar from '@/components/layout/TopBar'
import CheckoutBottomBar from '@/components/Checkout/CheckoutBottomBar'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'

export default {
  name: 'CheckoutLayout',
  components: {
    CheckoutBottomBar,
    TopBar
  },
  mixins: [scrollToTop, setLayout],
  props: {
    title: {
      type: String,
      default: null
    },
    price: {
      type: Number,
      required: true
    },
    buttonNextText: {
      type: String,
      default: 'Далее'
    },
    buttonNextIcon: {
      type: String,
      default: 'chevron-right'
    },
    buttonNextStyle: {
      type: String,
      default: 'uk-button-primary'
    },
    altContent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formatPrice () {
      return getFormatPrice(this.price)
    },
    ...mapState({
      invalid: state => state.checkout.invalid,
      enabled: state => state.checkout.enabled
    }),
    cartQty () {
      return this.$store.getters['cart/qty']
    },
    isEnabled () {
      return this.enabled && this.cartQty
    }
  },
  created () {
    if (!this.isEnabled) {
      this.$router.push('/')
    }
    this.setFieldsAction({
      bottomBar: false,
      footer: false
    })
  },
  methods: {
    onPrev () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onNext () {
      this.$emit('confirm')
    },
    onClose () {
      this.$router.push('/')
    }
  }
}
</script>
