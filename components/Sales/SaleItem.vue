<template lang="pug">
  .tm-sale-card.uk-flex
    .uk-box-shadow-medium.tm-background__smoke
      .tm-sale-card__preview(data-uk-lightbox)
        a.uk-inline.uk-transition-toggle(
          :href="imageUrl"
          data-type="image"
          tabindex="1"
          :data-caption="`Артикул: ${item.article}`")
          uk-image(
            :name="item.image_path"
            :width="800"
            :alt="item.article")
      .tm-sale-card__body.uk-grid.uk-grid-small.uk-grid-divider(data-uk-grid class="uk-child-width-1-1")
        .tm-sale-card__content.uk-grid.uk-grid-collapse.uk-flex-top(data-uk-grid class="uk-child-width-1-2")
          .tm-sale-card__info
            sale-info-item(title="Артикул" :value="item.article")
            sale-info-item(title="Размеры" :value="`${item.width_cm} см × ${item.height_cm} см`")
            sale-info-item(title="Фактура" :value="item.texture.name")
          .uk-box-shadow-small(data-uk-lightbox)
            a.uk-inline.uk-transition-toggle(
              :href="textureUrl"
              data-type="image"
              tabindex="1"
              :data-caption="textureCaption")
              img(:data-src="thumbUrl"
                  :alt="item.texture.name"
                  data-uk-img)
        .tm-sale-card__footer
          .tm-sale-card__price-block
            .tm-sale-card__discount-block.uk-flex.uk-flex-middle(v-if="item.is_available")
              span.tm-sale-card__old-price.tm-text-medium.uk-margin-small-right {{ formatOldPrice }}
              span.uk-label.uk-label-danger.tm-text-medium {{ item.discount }} %
          .uk-flex.uk-flex-between.uk-flex-middle.uk-width-1-1
            span.tm-sale-card__new-price.uk-text-emphasis(v-if="item.is_available") {{ formatNewPrice }}
            span.uk-text-muted.uk-text-large(v-else) Нет в наличии
            button.uk-button.uk-button-primary.uk-margin-remove-top(
              v-if="!cartMode"
              @click="addToCart"
              :disabled="checkInCart") В корзину
            button.uk-icon-button(v-else data-uk-icon="trash" @click="onDelete")
</template>

<script>
import UkImage from '@/components/Image/UkImage'
import UkImageBackground from '@/components/Image/UkImageBackground'
import SaleInfoItem from '@/components/Sales/SaleInfoItem'
import { getS3ImageUrl, getDiscountPrice, getFormatPrice } from '@/helpers'

export default {
  name: 'SaleItem',
  components: {
    UkImage,
    UkImageBackground,
    SaleInfoItem
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    cartMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    thumbUrl () {
      return `${process.env.localImageEndpoint}/crop/400/400/${this.item.texture.sample_path}`
    },
    textureUrl () {
      return getS3ImageUrl({ name: this.item.texture.sample_path, width: 600, height: 850 })
    },
    imageUrl () {
      return getS3ImageUrl({ name: this.item.image_path })
    },
    textureCaption () {
      const texture = this.item.texture

      return `Название: «${texture.name}» |
              Ширина полосы: ${texture.seamless ? 'Бесшовная' : texture.width + ' см'} |
              Цена: ${getFormatPrice(texture.price)} / м²`
    },
    formatOldPrice () {
      return getFormatPrice(this.item.old_price)
    },
    formatNewPrice () {
      const newPrice = getDiscountPrice(this.item.old_price, this.item.discount)

      return getFormatPrice(newPrice)
    },
    checkInCart () {
      return this.$store.getters['cart/checkSaleInCart'](this.item.id)
    }
  },
  methods: {
    addToCart () {
      this.$emit('addToCart', this.item.id)
    },
    onDelete () {
      this.$emit('delete', this.item.id)
    }
  }
}
</script>

<style lang="scss">
.tm-sale-card {
  flex-direction: column;
  border-radius: 1px;

  &__preview {
    width: 100%;
    border-radius: 1px 1px 0 0;
    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 1px;
    }
  }

  &__texture {
    img {
      width: 100%;
      display: block;
    }
  }

  &__body {
    padding: $global-margin $global-small-gutter - 4;
    @include media-mob($s) {
      padding: $global-margin;
    }
  }

  &__old-price {
    text-decoration: line-through;
  }

  &__new-price {
    font-size: 2rem;
  }
}
</style>