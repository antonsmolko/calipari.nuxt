<template lang="pug">
    .uk-container.tm-cart__container
        SlideYDownTransition(mode="out-in")
            .tm-cart__content
                table.tm-order-table
                    tbody
                        CartItem(
                            v-for="item in items"
                            :key="item.id"
                            :item="item"
                            :texture="getTexture(item.texture_id)"
                            :price="getPrice(item)"
                            @delete="onDelete")
        CartModal
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartModal from '~/components/Cart/CartModal'
import CartItem from '~/components/Cart/CartItem'

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
  data: () => ({
    confirmContent: `
        <p class="uk-text-large">Вы уверены?</p>
        <p class="tm-text-medium">Данное действие удалит товар безвозвратно!</p>`
  }),
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
    getPrice (item) {
      return this.$store.getters['cart/itemPrice'](item)
    },
    onDelete (id) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Удалить',
        cancel: 'Отменить'
      }

      modal.confirm(this.confirmContent)
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
