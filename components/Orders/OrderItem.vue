<template lang="pug">
  slide-x-left-transition(mode="in-out")
    tr.uk-grid-small.uk-box-shadow-medium(data-uk-grid)
      td.tm-order-table__preview(
        class="uk-width-1-2 uk-width-1-4@s"
        data-uk-lightbox)
        a.tm-order-table__lightbox.uk-inline.uk-transition-toggle(
          tabindex="0"
          :data-caption="dataCaption"
          :href="item.image_path")
          img.uk-box-shadow-medium(
            :data-src="item.thumb_path"
            :alt="item.article"
            data-uk-img)
      td.tm-order-table__params(class="uk-width-1-2 uk-width-1-4@s uk-width-1-3@m")
        .tm-order-table__params-item
          span.tm-order-table__params-heading.uk-text-muted Артикул
          nuxt-link.tm-order-table__params-value.uk-link.uk-link-text(
            :to="`/editor/${item.image_id}`"
          ) {{ item.article }}
        .tm-order-table__params-item
          span.tm-order-table__params-heading.uk-text-muted Размеры
          span.tm-order-table__params-value.uk-text-emphasis {{ item.width }} см × {{ item.height }} см
        .tm-order-table__params-item
          span.tm-order-table__params-heading.uk-text-muted Материал
          span.tm-order-table__params-value.uk-text-emphasis {{ textureName }}
        .tm-order-table__params-item
          span.tm-order-table__params-heading.uk-text-muted Эффекты
          span.tm-order-table__params-value.uk-text-emphasis {{ filterString }}
      td.tm-order-table__counter(v-if="isCart")
        cart-counter(@count="onCount" :value="item.qty")
      td.tm-order-table__count(v-else)
        span.uk-box-shadow-small.tm-text-medium.uk-background-default
          span.tm-order-table__count-x ×
          span.tm-order-table__count-value {{ item.qty }}
      td.tm-order-table__price(class="uk-width-1-2 uk-width-1-4@s uk-width-auto@m")
        span.tm-order-table__price-value.uk-text-emphasis {{ formatPrice }}
          sup.uk-text-primary.tm-order-table__price-note(
            v-if="addedCostsContent"
            :data-uk-tooltip="addedCostsContent") *
      td.tm-order-table__trash(v-if="isCart")
        button.uk-icon-button(data-uk-icon="trash" @click="onDelete")
</template>

<script>
import { mapActions } from 'vuex'
import CartCounter from '@/components/Cart/CartCounter'
import { getFormatPrice, getAddedCostsContent } from '@/helpers'

export default {
  name: 'OrderItem',
  components: { CartCounter },
  props: {
    item: {
      type: Object,
      required: true
    },
    isCart: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    count: 1
  }),
  computed: {
    filterString () {
      return this.item.filter || '—'
    },
    formatPrice () {
      return this.isCart ? getFormatPrice(this.cartItemPrice) : getFormatPrice(this.item.price)
    },
    textureName () {
      return this.isCart ? this.cartItemTextureName : this.item.texture
    },
    cartItemTextureName () {
      const texture = this.$store.getters['textures/getItemById'](this.item.texture_id)

      return texture.name
    },
    cartItemPrice () {
      return this.$store.getters['cart/itemPrice'](this.item)
    },
    dataCaption () {
      /* eslint-disable */
      return `
        Изображение: ${this.item.article} |
        Ширина: ${this.item.width} см |
        Высота: ${this.item.height} см |
        Фактура: «${this.item.texture}» |
        Эффекты: ${this.filter} |
        Цена: ${this.formatPrice}`
      /* eslint-enable */
    },
    addedCostsContent () {
      return this.item.added_costs
        ? getAddedCostsContent(this.item.added_costs)
        : null
    }
  },
  methods: {
    ...mapActions('cart', {
      setItemQtyAction: 'setItemQty'
    }),
    onDelete () {
      this.$emit('delete', this.item.id)
    },
    onCount (value) {
      this.count = value
      this.setItemQtyAction({
        id: this.item.id,
        qty: value
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/modules/order';
</style>
