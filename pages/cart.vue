<template lang="pug">
  page(v-if="!$fetchState.pending && responseData")
    template(#main)
      main
        top-bar(title="Корзина")
          .uk-navbar-item(class="uk-visible@l" v-if="items.length")
            button.uk-button.uk-button-small.uk-button-danger(
              @click.prevent="checkout") Оформить
          .uk-navbar-item
            button.uk-close(type="button", data-uk-icon="icon: close; ratio: 1.1", @click="onClose")
        section.uk-section(v-if="items.length || sales.length"
          :class="{ 'uk-light': darkPeriod }"
          data-uk-height-viewport="offset-top: true; offset-bottom: true")
          cart-list(v-if="items.length" :items="items")
          template(v-if="sales.length")
            .uk-container.uk-margin-medium(v-if="items.length")
              hr
            sale-list(
              :class="{ 'uk-light': darkPeriod }"
              :items="sales"
              @delete="deleteSale")
            .uk-container.uk-margin-medium(v-if="totalPrice" class="uk-visible@l")
              hr
          .uk-container.uk-margin-medium(v-if="totalPrice" class="uk-visible@l")
            .tm-checkout__footer
              span.tm-total-price.uk-text-emphasis {{ totalFormatPrice }}
              button.uk-button.uk-button-danger(@click.prevent="checkout") Оформить
        section.uk-section.uk-section-xlarge.uk-text-center(v-else :class="{ 'uk-light': darkPeriod }")
          .uk-container
            span.uk-heading-small Корзина пуста
            p.tm-text-medium Воспользуйтесь каталогом, чтобы добавить заказ
            nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/catalog") В каталог
        slide-y-down-transition(mode="out-in")
          cart-bottom-bar(
            v-if="totalPrice"
            :price="totalPrice"
            @checkout="checkout")
        .uk-padding(class="uk-hidden@l")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { getFormatPrice } from '@/components/helpers'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar'
import CartBottomBar from '@/components/Cart/CartBottomBar'
import CartList from '@/components/Cart/CartList'
import SaleList from '@/components/Cart/SaleList'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'

export default {
  components: {
    Page,
    CartList,
    SaleList,
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
    const key = this.$route.query.key
    if (key) {
      await this.getProjectAction(key)
    }
    await new Promise((resolve) => {
      this.setFieldsAction({
        bottomBar: false,
        footer: false
      })
      resolve()
    })
    if (this.saleKeys.length) {
      await this.getCartSalesAction()
    }
    this.responseData = true
  },
  data: () => ({
    responseData: false
  }),
  computed: {
    ...mapState({
      items: state => state.cart.items,
      saleKeys: state => state.cart.saleKeys,
      sales: state => state.cart.sales
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
      this.setFieldAction({
        field: 'bottomBar',
        value: !this.qty
      })
    }
  },
  created () {
    this.setFieldsAction({
      bottomBar: !this.qty,
      pageTitle: 'Корзина'
    })
  },
  methods: {
    ...mapActions({
      checkoutEnableAction: 'checkout/enable',
      getProjectAction: 'cart/getProject',
      deleteSaleAction: 'cart/deleteSale',
      getCartSalesAction: 'cart/getCartSales',
      setFieldsAction: 'setFields'
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
    },
    deleteSale (id) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Удалить',
        cancel: 'Отменить'
      }

      modal.confirm(this.$conf.beforeCartItemDeletingConfirmationContent)
        .then(() => this.deleteSaleAction(id))
    }
  }
}
</script>

<style lang="scss">
.tm-checkout {
  &__footer {
    display: flex;
    align-items: center;

    .uk-button {
      margin-left: $global-margin;
    }
  }

  .tm-total-price__heading {
    margin: 5px $global-small-margin 0 0 !important;
  }
}
</style>
