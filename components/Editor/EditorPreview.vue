<template lang="pug">
    .tm-editor__preview.tm-editor__panel
        h5.uk-h5.uk-margin-bottom Превью
        div(id="preview-container" ref="preview" data-uk-lightbox)
            a.uk-display-block.uk-transition-toggle(
                id="preview-crop"
                tabindex="0"
                :data-caption="imageDataCaption"
                :href="`${url}/${preview.width}/${preview.height}/${preview.x}/${preview.y}/${flip}/${colorize}/${image.path}`"
                :class="[filter.colorize]",
                :style="cropStyles")
                img(
                    :src="`https://manager.npmrundev.ru/image/widen/500/${image.path}`",
                    :style="imageStyles"
                    :alt="image.article")
</template>

<script>
import { getFilterString } from '~/helpers'

export default {
  name: 'EditorPreview',
  props: {
    image: {
      type: Object,
      required: true
    },
    ratioLocked: {
      type: Boolean,
      default: true
    },
    cropData: {
      type: Object,
      default: () => null
    },
    filter: {
      type: Object,
      default: () => {}
    },
    texture: {
      type: String,
      required: true
    },
    orderSizes: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    container: null,
    maxWidth: null,
    maxHeight: null,
    url: `${process.env.baseUrl}/image/order-item-full`
  }),
  computed: {
    orderRatio () {
      return this.cropData.width && this.cropData.height
        ? this.cropData.width / this.cropData.height
        : this.image.width / this.image.height
    },
    imageRatio () {
      return this.image.ratio
        ? this.image.ratio
        : this.image.width / this.image.height
    },
    containerRatio () {
      return this.maxWidth / this.maxHeight
    },
    sizeFactor () {
      return this.cropData.width
        ? this.cropSizes.width / this.cropData.width
        : this.cropSizes.width / this.image.width
    },
    cropStyles () {
      return {
        width: `${this.cropSizes.width}px`,
        height: `${this.cropSizes.height}px`,
        transform: `translateX(${this.scaleX})`
      }
    },
    cropSizes () {
      if (this.ratioLocked) {
        return this.imageRatio > this.containerRatio
          ? { width: this.maxWidth, height: this.maxWidth / this.imageRatio }
          : { width: this.maxHeight * this.imageRatio, height: this.maxHeight }
      }

      return this.orderRatio > this.containerRatio
        ? { width: this.maxWidth, height: this.maxWidth / this.orderRatio }
        : { width: this.maxHeight * this.orderRatio, height: this.maxHeight }
    },
    scaleX () {
      return this.filter.flip ? -1 : 1
    },
    imageStyles () {
      const translateX = this.cropData.x * this.sizeFactor
      const translateY = this.cropData.y * this.sizeFactor
      if (!this.ratioLocked) {
        return this.orderRatio > this.imageRatio
          ? {
            width: `${this.cropSizes.width}px`,
            height: 'auto',
            transform: `translate(${-translateX}px, ${-translateY}px) scaleX(${this.scaleX})`
          }
          : {
            width: 'auto',
            height: `${this.cropSizes.height}px`,
            transform: `translate(${-translateX}px, ${-translateY}px) scaleX(${this.scaleX})`
          }
      }

      return { width: '100%', height: 'auto', transform: `translate(0, 0)  scaleX(${this.scaleX})` }
    },
    preview () {
      return {
        width: Math.round(this.cropData.width),
        height: Math.round(this.cropData.height),
        x: Math.round(this.cropData.x),
        y: Math.round(this.cropData.y)
      }
    },
    flip () {
      return +this.filter.flip
    },
    colorize () {
      return this.filter.colorize ? this.filter.colorize : 0
    },
    imageDataCaption () {
      /* eslint-disable */
      return `Изображение: ${this.image.article} |
        Ширина: ${this.orderSizes.width} см |
        Высота: ${this.orderSizes.height} см |
        Фактура: «${this.texture}» |
        Эффекты: ${this.filterString}`
      /* eslint-enable */
    },
    filterString () {
      return getFilterString(this.filter)
    }
  },
  mounted () {
    this.container = this.$refs.preview
    this.setMaxSizes()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    setMaxSizes () {
      this.maxWidth = this.container.offsetWidth
      this.maxHeight = this.container.offsetHeight
    },
    handleResize () {
      this.setMaxSizes()
    }
  }
}
</script>
