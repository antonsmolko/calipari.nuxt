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
                    :href="`${fullBaseUrl}/${details.width_px}/${details.height_px}/${details.x}/${details.y}/${flipH}/${flipV}/${colorize}/${details.image_path}`")
                    img.uk-box-shadow-medium(
                        :src="`${thumbBaseUrl}/${details.width_px}/${details.height_px}/${details.x}/${details.y}/${flipH}/${flipV}/${colorize}/${details.image_path}`"
                        :alt="article")
            td.tm-order-table__params(class="uk-width-1-2 uk-width-1-4@s uk-width-1-3@m")
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Артикул
                    nuxt-link.tm-order-table__params-value.uk-link.uk-link-text(
                        :to="`/editor/${details.image_id}`"
                    ) {{ article }}
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Размеры
                    span.tm-order-table__params-value.uk-text-emphasis {{ details.width_cm }} см × {{ details.height_cm }} см
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Материал
                    span.tm-order-table__params-value.uk-text-emphasis {{ texture.name }}
                .tm-order-table__params-item
                    span.tm-order-table__params-heading.uk-text-muted Эффекты
                    span.tm-order-table__params-value.uk-text-emphasis {{ filterDetailsString }}
            td.tm-order-table__counter
                CartCounter(@count="onCount" v-model="count")
            td.tm-order-table__price(class="uk-width-1-2 uk-width-1-4@s uk-width-auto@m")
                span.tm-order-table__price-value.uk-text-emphasis {{ formatPrice }}
                  sup.uk-text-primary.tm-order-table__price-note(
                    v-if="addedCostsContent"
                    :data-uk-tooltip="addedCostsContent") *
            td.tm-order-table__trash: button.uk-icon-button(data-uk-icon="trash" @click="onDelete")
</template>

<script>
import { mapActions } from 'vuex'
import CartCounter from '@/components/Cart/CartCounter'
import { getFilterDetailsString, getFormatPrice, getAddedCostsContent } from '@/helpers'

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
    fullBaseUrl: `${process.env.localImageEndpoint}/order-full`,
    thumbBaseUrl: `${process.env.localImageEndpoint}/thumb`
  }),
  computed: {
    details () {
      return this.item.details
    },
    formatPrice () {
      return getFormatPrice(this.price)
    },
    article () {
      return this.details.image_id.toString().padStart(5, '0')
    },
    flipH () {
      return Number(this.details.filter.flipH)
    },
    flipV () {
      return Number(this.details.filter.flipV)
    },
    colorize () {
      return this.details.filter.colorize ? this.details.filter.colorize : 0
    },
    filterDetailsString () {
      return getFilterDetailsString(this.details.filter)
    },
    imageDataCaption () {
      /* eslint-disable */
      return `
        Изображение: ${this.article} |
        Ширина: ${this.details.width_cm} см |
        Высота: ${this.details.height_cm} см |
        Фактура: «${this.texture.name}» |
        Эффекты: ${this.filterDetailsString} |
        Цена: ${this.formatPrice}`
      /* eslint-enable */
    },
    addedCostsContent () {
      return this.item.details.added_costs
        ? getAddedCostsContent(this.item.details.added_costs)
        : null
    }
  },
  created () {
    this.count = this.details.qty
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

<style lang="scss">
    @import '../../assets/scss/modules/order';
</style>
