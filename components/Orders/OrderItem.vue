<template lang="pug">
    tr.tm-order-table__content.uk-grid-small.uk-box-shadow-medium(data-uk-grid)
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
                span.tm-order-table__params-value.uk-text-emphasis {{ item.texture }}
            .tm-order-table__params-item
                span.tm-order-table__params-heading.uk-text-muted Эффекты
                span.tm-order-table__params-value.uk-text-emphasis {{ item.filter }}
        td.tm-order-table__count
            span.uk-box-shadow-small.tm-text-medium.uk-background-default
                span.tm-order-table__count-x ×
                span.tm-order-table__count-value {{ item.qty }}
        td.tm-order-table__price(class="uk-width-1-2 uk-width-1-4@s uk-width-auto@m")
            span.tm-order-table__price-heading.uk-text-muted Цена
            span.tm-order-table__price-value.uk-text-emphasis {{ formatPrice }}
</template>

<script>
import { getFormatPrice } from '~/helpers'

export default {
  name: 'OrderItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatPrice () {
      return getFormatPrice(this.item.price)
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
    }
  },
  methods: {
    onDelete () {
      this.$emit('delete', this.item)
    }
  }
}
</script>

<style lang="scss">
    @import '../../assets/scss/modules/order';
</style>
