<template lang="pug">
    SlideXLeftTransition(mode="in-out")
        tr.tm-order-table__content.uk-grid-small.uk-box-shadow-medium(
            :class="{'uk-light': darkPeriod }"
            data-uk-grid)
            td.tm-order-table__preview(
                class="uk-width-1-2 uk-width-1-4@s"
                data-uk-lightbox)
                a.tm-order-table__lightbox.uk-inline.uk-transition-toggle(
                    tabindex="0"
                    :data-caption="imageDataCaption"
                    :href="`${fullBaseUrl}/${item.cropWidth}/${item.cropHeight}/${item.x}/${item.y}/${flip}/${colorize}/${item.imageName}`")
                    img.uk-box-shadow-medium(
                        :src="`${fullBaseUrl}/${item.cropWidth}/${item.cropHeight}/${item.x}/${item.y}/${flip}/${colorize}/${item.imageName}`"
                        :alt="article")
            td.tm-order-table__params(class="uk-width-1-2 uk-width-1-4@s uk-width-1-3@m")
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Артикул
                    nuxt-link.tm-order-table__params-value.uk-link.uk-link-text(
                        :to="`/editor/${item.imageId}`"
                    ) {{ article }}
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Размеры
                    span.tm-order-table__params-value.uk-text-emphasis {{ item.width }} см × {{ item.height }} см
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Материал
                    span.tm-order-table__params-value.uk-text-emphasis {{ texture.name }}
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Эффекты
                    span.tm-order-table__params-value.uk-text-emphasis {{ filterString }}
            td.tm-order-table__counter
                CartCounter(@count="onCount" v-model="count")
            td.tm-order-table__price(class="uk-width-1-2 uk-width-1-4@s uk-width-auto@m")
                span.tm-order-table__price-heading.uk-text-muted Цена
                span.tm-order-table__price-value.uk-text-emphasis {{ formatPrice }}
            td.tm-order-table__trash: button.uk-icon-button(data-uk-icon="trash" @click="onDelete")
</template>

<script>
import { mapActions } from 'vuex'
import CartCounter from './CartCounter'
import { getFilterString, getFormatPrice } from '~/helpers'

export default {
  components: { CartCounter },
  model: {
    prop: 'model',
    event: 'count'
  },
  props: {
    model: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      required: true
    },
    texture: {
      type: Object,
      default: () => {}
    },
    price: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    count: 1,
    fullBaseUrl: `${process.env.baseUrl}/image/order-item-full`,
    thumbBaseUrl: `${process.env.baseUrl}/image/order-item-thumb`
  }),
  computed: {
    formatPrice () {
      return getFormatPrice(this.price)
    },
    article () {
      return this.item.imageId.toString().padStart(5, '0')
    },
    flip () {
      return +this.item.filter.flip
    },
    colorize () {
      return this.item.filter.colorize ? this.item.filter.colorize : 0
    },
    filterString () {
      return getFilterString(this.item.filter)
    },
    imageDataCaption () {
      /* eslint-disable */
      return `
        Изображение: ${this.article} |
        Ширина: ${this.item.width} см |
        Высота: ${this.item.height} см |
        Фактура: «${this.texture.name}» |
        Эффекты: ${this.filterString} |
        Цена: ${this.formatPrice}`
      /* eslint-enable */
    }
  },
  created () {
    this.count = this.item.qty
  },
  methods: {
    ...mapActions('cart', {
      setItemQtyAction: 'setItemQty'
    }),
    onCount (value) {
      this.count = value
      this.setItemQtyAction({ id: this.item.id, qty: value })
    },
    onDelete () {
      this.$emit('delete', this.item.id)
    }
  }
}
</script>
