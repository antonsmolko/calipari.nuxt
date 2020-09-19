<template lang="pug">
  li
    a.uk-inline.uk-transition-toggle(
      :data-caption="dataCaption"
      data-type="image"
      tabindex="1"
      :href="itemImagePath")
      img.uk-box-shadow-small(
        :data-src="itemThumbPath"
        :alt="item.article"
        data-uk-img)
</template>

<script>
import { getFormatPrice, getS3ImageUrl } from '@/helpers'

export default {
  name: 'OrderListItemSlide',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    dataCaption () {
      /* eslint-disable */
      return `
        Изображение: ${this.item.article} |
        Ширина: ${this.item.width} см |
        Высота: ${this.item.height} см |
        Фактура: «${this.item.texture}» |
        Эффекты: ${this.item.filter} |
        Цена: ${getFormatPrice(this.item.price)}`
      /* eslint-enable */
    },
    itemThumbPath () {
      return this.item.sale
        ? getS3ImageUrl({ name: this.item.image_path, height: 200 })
        : this.item.thumb_path
    },
    itemImagePath () {
      return this.item.sale
        ? getS3ImageUrl({ name: this.item.image_path })
        : this.item.image_path
    }
  }
}
</script>
