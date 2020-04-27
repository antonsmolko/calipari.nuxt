<template lang="pug">
    main
        TopBar(:title="pageTitle")
            .uk-navbar-item
                button.uk-close(type="button", data-uk-close, @click="onClose")
        SlideYDownTransition(v-show="pageTitle")
            section.tm-orders.uk-section(
                v-if="items.length"
                :class="{ 'uk-light': darkPeriod }")
                .uk-container
                    OrderListItem(
                        v-for="item in items"
                        :key="item.number"
                        :order="item"
                        @pay="onPay"
                    )
            section.uk-section.uk-section-xlarge.uk-text-center(
                v-else :class="{ 'uk-light': darkPeriod }")
                span.uk-heading-small Список заказов пуст
                .uk-margin-medium-top
                    nuxt-link.uk-button.uk-button-primary(to="/profile") Назад
</template>

<script>
import { mapState } from 'vuex'
import setLayout from '~/components/mixins/setLayout'
import TopBar from '~/components/layout/TopBar'
import OrderListItem from '~/components/Orders/OrderListItem'
export default {
  name: 'Orders',
  scrollToTop: true,
  components: {
    TopBar,
    OrderListItem
  },
  // middleware: ['auth'],
  mixins: [setLayout],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  async fetch ({ store }) {
    await store.dispatch('profile/getOrders')
    store.commit('SET_FIELDS', { pageTitle: 'Заказы' })
  },
  computed: {
    ...mapState({
      items: state => state.profile.orders
    })
  },
  methods: {
    onPay (orderNumber) {
      // console.log(orderNumber)
    },
    onClose () {
      this.$router.push('/profile')
    }
  }
}
</script>
