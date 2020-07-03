<template lang="pug">
    .tm-editor__preview.tm-editor__panel
        editor-panel-heading(title="Превью")
        div(id="preview-container" ref="preview" data-uk-lightbox)
            a.uk-display-block.uk-transition-toggle(
                id="preview-crop"
                tabindex="0"
                :data-caption="imageDataCaption"
                :href="`${baseUrl}/order-full/${preview.width}/${preview.height}/${preview.x}/${preview.y}/${flipH}/${flipV}/${colorize}/${image.path}`"
                :class="[filter.colorize]",
                :style="cropStyles")
                img(:src="`${baseUrl}/widen/500/${image.path}`",
                    :style="imageStyles"
                    :alt="image.article")
</template>

<script>
import EditorPanelHeading from './EditorPanelHeading'
import { getFilterDetailsString } from '~/helpers'

export default {
  name: 'EditorPreview',
  components: {
    EditorPanelHeading
  },
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
    baseUrl: `${process.env.baseUrl}/image`
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
        transform: `translateX(${this.scaleX}) translateY(${this.scaleY})`
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
      return this.filter.flipH ? -1 : 1
    },
    scaleY () {
      return this.filter.flipV ? -1 : 1
    },
    imageStyles () {
      const translateX = this.cropData.x * this.sizeFactor
      const translateY = this.cropData.y * this.sizeFactor
      if (!this.ratioLocked) {
        return this.orderRatio > this.imageRatio
          ? {
            width: `${this.cropSizes.width}px`,
            height: 'auto',
            transform: `translate(${-translateX}px, ${-translateY}px) scaleX(${this.scaleX}) scaleY(${this.scaleY})`
          }
          : {
            width: 'auto',
            height: `${this.cropSizes.height}px`,
            transform: `translate(${-translateX}px, ${-translateY}px) scaleX(${this.scaleX}) scaleY(${this.scaleY})`
          }
      }

      return { width: '100%', height: 'auto', transform: `translate(0, 0)  scaleX(${this.scaleX}) scaleY(${this.scaleY})` }
    },
    preview () {
      return {
        width: Math.round(this.cropData.width),
        height: Math.round(this.cropData.height),
        x: Math.round(this.cropData.x),
        y: Math.round(this.cropData.y)
      }
    },
    flipH () {
      return Number(this.filter.flipH)
    },
    flipV () {
      return Number(this.filter.flipV)
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
        Эффекты: ${this.filterDetailsString}`
      /* eslint-enable */
    },
    filterDetailsString () {
      return getFilterDetailsString(this.filter)
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
