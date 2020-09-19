<template lang="pug">
  .tm-cart__items
    .uk-container
      .tm-checkout__header
        span.uk-h2.uk-margin-remove Проекты
        .uk-divider-small
    .uk-container.tm-container__cart-items
      slide-y-down-transition(mode="out-in")
        .tm-cart__content
          table.tm-order-table
            tbody
              order-item(
                v-for="item in items"
                :key="item.id"
                :item="item"
                :isCart="true"
                @delete="onDelete")
    cart-modal
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartModal from '@/components/Cart/CartModal'
import OrderItem from '@/components/Orders/OrderItem'

export default {
  name: 'CartList',
  components: {
    OrderItem,
    CartModal
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      textures: state => state.textures.items
    })
  },
  methods: {
    ...mapActions({
      deleteItemAction: 'cart/deleteItem'
    }),
    getTexture (id) {
      return this.$store.getters['textures/getItemById'](id)
    },
    onDelete (id) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Удалить',
        cancel: 'Отменить'
      }

      modal.confirm(this.$conf.beforeCartItemDeletingConfirmationContent)
        .then(() => this.deleteItemAction(id))
    }
  }
}
</script>

<style lang="scss">
table.tm-order-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
