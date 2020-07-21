<template lang="pug">
    Page
        template(#main)
            main
                TopBar(title="Корзина")
                    .uk-navbar-item(class="uk-visible@l" v-if="items.length")
                        //span.tm-total-price__heading Цена
                        //span.uk-h3.uk-text-emphasis.uk-margin-right {{ totalFormatPrice }}
                        button.uk-button.uk-button-small.uk-button-danger(
                            @click.prevent="checkout") Оформить
                    .uk-navbar-item
                        button.uk-close(type="button", data-uk-close, @click="onClose")
                section.uk-section.uk-position-relative(
                    v-if="items.length"
                    :class="{ 'uk-light': darkPeriod }"
                    data-uk-height-viewport="offset-top: true; offset-bottom: true")
                    CartList(
                        :items="items")
                    .uk-container(class="uk-visible@l")
                        .tm-checkout__footer
                            span.tm-total-price__heading Цена
                            span.uk-text-large.uk-text-emphasis {{ totalFormatPrice }}
                            button.uk-button.uk-button-danger(@click.prevent="checkout") Оформить
                section.uk-section.uk-section-xlarge.uk-text-center(v-else :class="{ 'uk-light': darkPeriod }")
                    .uk-container
                        span.uk-heading-small Корзина пуста
                        p.tm-text-medium Воспользуйтесь каталогом, чтобы добавить заказ
                        nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/catalog") В каталог
                SlideYDownTransition(mode="out-in")
                    CartBottomBar(
                        v-if="items.length"
                        :price="totalPrice"
                        @checkout="checkout")
                .uk-padding(class="uk-hidden@l")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getFormatPrice } from '~/components/helpers'
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar'
import CartBottomBar from '~/components/Cart/CartBottomBar'
import CartList from '~/components/Cart/CartList'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
export default {
  components: {
    Page,
    CartList,
    CartBottomBar,
    TopBar
  },
  mixins: [setLayout, scrollToTop],
  metaInfo () {
    return {
      title: 'Корзина'
    }
  },
  async fetch () {
    await new Promise((resolve) => {
      this.$store.dispatch('setFields', { bottomBar: false, footer: false })
      resolve()
    })
  },
  data: () => ({
    confirmContent: `
        <p>Вы уверены?</p>
        <p>Данное действие удалит товар безвозвратно!</p>`
  }),
  computed: {
    ...mapState({
      items: state => state.cart.items
    }),
    ...mapGetters('cart', [
      'qty'
    ]),
    totalFormatPrice () {
      return getFormatPrice(this.totalPrice)
    },
    totalPrice () {
      return this.$store.getters['cart/totalPrice']
    }
  },
  watch: {
    qty () {
      this.setFieldAction({ field: 'bottomBar', value: !this.qty })
    }
  },
  created () {
    this.setFieldsAction({ bottomBar: !this.qty, pageTitle: 'Корзина' })
  },
  methods: {
    ...mapActions({
      checkoutEnableAction: 'checkout/enable'
    }),
    checkout () {
      this.checkoutEnableAction({
        createdAt: new Date()
      })
      this.$auth.loggedIn
        ? this.$router.push('/checkout/delivery')
        : this.$router.push('/checkout/invite')
    },
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.tm-checkout {
    &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: $global-medium-margin;
        .uk-button {
            margin-left: $global-margin;
        }
    }

    .tm-total-price__heading {
        margin: 5px $global-small-margin 0 0 !important;
    }
}
</style>
