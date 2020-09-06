<template lang="pug">
  .uk-container.tm-cart__container
    h2.uk-h3 Проекты
    slide-y-down-transition(mode="out-in")
      .tm-cart__content
        table.tm-order-table
          tbody
            cart-item(
              v-for="item in items"
              :key="item.id"
              :item="item"
              :texture="getTexture(item.details.texture_id)"
              :price="getPrice(item.details)"
              @delete="onDelete")
    cart-modal
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartModal from '@/components/Cart/CartModal'
import CartItem from '@/components/Cart/CartItem'

export default {
  name: 'CartList',
  components: {
    CartItem,
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
    getPrice (itemDetails) {
      return this.$store.getters['cart/itemPrice'](itemDetails)
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
