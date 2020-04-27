<template lang="pug">
    tr.tm-order-table__content.uk-grid-small.uk-box-shadow-medium(data-uk-grid)
        td.tm-order-table__preview(
            class="uk-width-1-2 uk-width-1-4@s"
            data-uk-lightbox)
            a.tm-order-table__lightbox.uk-inline.uk-transition-toggle(
                tabindex="0"
                :data-caption="dataCaption"
                :href="imageUrl")
                img.uk-box-shadow-medium(
                    :src="imageUrl"
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
                span.tm-order-table__params-value.uk-text-emphasis {{ item.texture.name }}
            .tm-order-table__params-item
                span.tm-order-table__params-heading.uk-text-muted Эффекты
                span.tm-order-table__params-value.uk-text-emphasis {{ filterString }}
        td.tm-order-table__count
            span.uk-box-shadow-small.tm-text-medium.uk-background-default
                span.tm-order-table__count-x ×
                span.tm-order-table__count-value {{ item.qty }}
        td.tm-order-table__price(class="uk-width-1-2 uk-width-1-4@s uk-width-auto@m")
            span.tm-order-table__price-heading.uk-text-muted Цена
            span.tm-order-table__price-value.uk-text-emphasis {{ formatPrice }}
</template>

<script>
import { getArticle, getFilterString, getFormatPrice } from '~/helpers'

export default {
  name: 'OrderItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl () {
      return `${process.env.baseUrl}${this.item.imagePath}`
    },
    article () {
      return getArticle(this.item.imageId)
    },
    formatPrice () {
      return getFormatPrice(this.item.price)
    },
    filterString () {
      return getFilterString(this.item.filter)
    },
    dataCaption () {
      /* eslint-disable */
      return `
        Изображение: ${this.article} |
        Ширина: ${this.item.width} см |
        Высота: ${this.item.height} см |
        Фактура: «${this.item.texture.name}» |
        Эффекты: ${this.filterString} |
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
