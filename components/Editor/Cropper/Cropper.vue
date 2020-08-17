<template lang="pug">
  div(:class="[filter.colorize]")
    .cropper(ref="cropper")
      .cropper__container
        .cropper__canvas(v-show="isCropperSet" ref="canvas")
          img(ref="image"
            :style="canvasStyle",
            :src="imageUrl",
            :alt="image.article")
          .cropper__crop-box(
            ref="cropBox"
            :class="{active: active}",
            :style="cropBoxStyle")
            .cropper__view-box
              FadeTransition
                img(v-show="imageLoad"
                  :src="imageUrl",
                  :alt="image.article",
                  :style="viewBoxStyle")
            span.cropper__dashed.dashed-h
            .cropper__dashed.dashed-v
            span.cropper__center
            span.cropper__facade
</template>

<script>
import { getS3ImageUrl } from '@/helpers'
import debounce from 'lodash/debounce'
import {
  EVENT_POINTER_DOWN,
  EVENT_POINTER_MOVE,
  EVENT_POINTER_UP
} from './constants'
import {
  addListener,
  removeListener
} from './utilities'
const _debounce = debounce(fn => fn(), 1)

export default {
  name: 'Cropper',
  props: {
    image: {
      type: Object,
      required: true
    },
    ratio: {
      type: Number,
      default: NaN
    },
    active: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Object,
      default: () => {
      }
    }
  },
  data: () => ({
    isCropperSet: false,
    cropper: null,
    canvas: null,
    canvasImage: null,
    cropBox: null,
    viewBoxStyles: {
      width: '',
      height: '',
      translateX: 0,
      translateY: 0
    },
    imageStyles: {
      width: 0,
      height: 0,
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1
    },
    naturalCropData: {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    },
    moveX: 0,
    moveY: 0,
    startMoveX: 0,
    startMoveY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    lastPageX: 0,
    lastPageY: 0,
    responsive: false,
    responsiveMaxHeight: 263,
    imageLoad: false,

    event: null
  }),
  computed: {
    translateX () {
      if ((this.lastTranslateX + this.moveX) <= 0) {
        return 0
      } else if ((this.lastTranslateX + this.moveX + this.viewBoxStyles.width) >= this.imageStyles.width) {
        return this.imageStyles.width - this.viewBoxStyles.width
      }

      return this.lastTranslateX + this.moveX
    },
    translateY () {
      if ((this.lastTranslateY + this.moveY) <= 0) {
        return 0
      } else if ((this.lastTranslateY + this.moveY + this.viewBoxStyles.height) >= this.imageStyles.height) {
        return this.imageStyles.height - this.viewBoxStyles.height
      }
      return this.lastTranslateY + this.moveY
    },
    aspectRatio () {
      return this.image.width / this.image.height
    },
    scaleImage () {
      return this.image.width / this.imageStyles.width
    },
    canvasStyle () {
      return {
        transform: `scale(${this.scaleX}, ${this.scaleY})`
      }
    },
    cropBoxStyle () {
      const transX = this.viewBoxStyles.translateX !== 0 ? `${this.viewBoxStyles.translateX}px` : 0
      const transY = this.viewBoxStyles.translateY !== 0 ? `${this.viewBoxStyles.translateY}px` : 0

      return {
        transform: `translateX(${transX}) translateY(${transY})`,
        width: `${this.viewBoxStyles.width}px`,
        height: `${this.viewBoxStyles.height}px`
      }
    },
    viewBoxStyle () {
      const transX = this.imageStyles.translateX !== 0 ? `${this.imageStyles.translateX}px` : 0
      const transY = this.imageStyles.translateY !== 0 ? `${this.imageStyles.translateY}px` : 0

      return {
        width: `${this.imageStyles.width}px`,
        height: `${this.imageStyles.height}px`,
        transform: `translateX(${transX}) scaleX(${this.scaleX}) translateY(${transY}) scaleY(${this.scaleY})`
      }
    },
    scaleX () {
      return this.filter.flipH ? -1 : 1
    },
    scaleY () {
      return this.filter.flipV ? -1 : 1
    },
    imageUrl () {
      return getS3ImageUrl({ name: this.image.path })
    }
  },
  watch: {
    ratio () {
      if (this.active) {
        if (this.ratio > this.aspectRatio) {
          this.viewBoxStyles.width = this.imageStyles.width
          this.viewBoxStyles.height = this.viewBoxStyles.width / this.ratio

          this.setNaturalCrop()
          this.setTranslate()
        } else {
          this.viewBoxStyles.height = this.imageStyles.height
          this.viewBoxStyles.width = this.viewBoxStyles.height * this.ratio

          this.setNaturalCrop()
          this.setTranslate('X', 'Y', 'width')
        }
      }
    },
    async image () {
      await this.removeListeners()
      await this.init()
      this.handleResize()
    },
    active () {
      if (this.active) {
        this.viewBoxStyles.width = this.imageStyles.width
        this.viewBoxStyles.height = this.imageStyles.height
      } else {
        this.cropBox.style.removeProperty('width')
        this.cropBox.style.removeProperty('height')
      }
      this.viewBoxStyles.translateX = 0
      this.viewBoxStyles.translateY = 0
      this.imageStyles.translateX = 0
      this.imageStyles.translateY = 0

      this.setNaturalCrop({
        width: this.image.width,
        height: this.image.height,
        x: 0,
        y: 0
      })

      this.resetCropMove()

      this.$emit('cropped', this.naturalCropData)
    },
    // translateX () {
    //   this.setNaturalCrop()
    // },
    // translateY () {
    //   this.setNaturalCrop()
    // },
    scaleX () {
      this.imageStyles.scaleX = this.scaleX ? -1 : 1
    },
    scaleY () {
      this.imageStyles.scaleY = this.scaleY ? -1 : 1
    },
    responsive () {
      if (this.responsive) {
        this.canvasImage.style.maxHeight = `${this.responsiveMaxHeight}px`
      }
    }
  },
  async mounted () {
    await this.init()
    await _debounce(this.handleResize)
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    this.removeListeners()
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    async init () {
      await this.setCropperElements()
      await this.setCropperMaxHeight(this.cropper.offsetHeight)
      addListener(this.cropBox, EVENT_POINTER_DOWN, (this.startCropMove = this.onStartCropMove.bind(this)))
      addListener(this.cropBox.ownerDocument, EVENT_POINTER_UP, (this.endCropMove = this.onEndCropMove.bind(this)))
      await this.loadImage(this.imageUrl)
        .then(() => {
          this.setImageSizes()
          this.imageLoad = true
        })
    },
    setCropperElements () {
      return new Promise((resolve) => {
        this.cropper = this.$refs.cropper
        this.canvasImage = this.$refs.image
        this.cropBox = this.$refs.cropBox
        this.canvas = this.$refs.canvas
        resolve()
      })
    },
    setCropperMaxHeight (maxHeight) {
      this.canvasImage.style.maxHeight = maxHeight + 'px'
      this.isCropperSet = true
    },
    handleResize () {
      if (this.isCropperSet) {
        this.setResponsive()
        const maxHeight = this.responsive
          ? this.responsiveMaxHeight
          : this.cropper.offsetHeight
        this.setCropperMaxHeight(maxHeight)
        this.setImageSizes()
        if (this.active) {
          this.responseCropBox()
        }
      }
    },
    onStartCropMove (e) {
      e.preventDefault()
      if (this.active) {
        addListener(this.cropBox.ownerDocument, EVENT_POINTER_MOVE, (this.cropMove = this.onCropMove.bind(this)))
        this.startMoveX = e.pageX
        this.startMoveY = e.pageY
      }
    },
    onEndCropMove () {
      this.lastTranslateX += this.moveX
      this.moveX = 0
      this.lastTranslateY += this.moveY
      this.moveY = 0

      removeListener(this.cropBox.ownerDocument, EVENT_POINTER_MOVE, this.cropMove)
    },
    onCropMove (e) {
      e.preventDefault()
      if (e.pageX < this.lastPageX) {
        if (this.translateX > 0) {
          this.moveX += e.pageX - this.startMoveX
        }
        this.startMoveX = e.pageX
      }

      if (e.pageX > this.lastPageX) {
        if ((this.translateX + this.viewBoxStyles.width) < this.imageStyles.width) {
          this.moveX += e.pageX - this.startMoveX
        }
        this.startMoveX = e.pageX
      }

      this.lastPageX = e.pageX

      this.imageStyles.translateX = -this.translateX
      this.viewBoxStyles.translateX = this.translateX

      // Y axis
      if (e.pageY < this.lastPageY) {
        if (this.translateY > 0) {
          this.moveY += e.pageY - this.startMoveY
        }
        this.startMoveY = e.pageY
      }

      if (e.pageY > this.lastPageY) {
        if ((this.translateY + this.viewBoxStyles.height) < this.imageStyles.height) {
          this.moveY += e.pageY - this.startMoveY
        }
        this.startMoveY = e.pageY
      }

      this.lastPageY = e.pageY

      this.imageStyles.translateY = -this.translateY
      this.viewBoxStyles.translateY = this.translateY

      this.setNaturalCrop()

      this.$emit('cropped', this.naturalCropData)
    },
    setImageSizes () {
      this.imageStyles.width = this.canvasImage.clientWidth
      this.imageStyles.height = this.canvasImage.clientHeight
    },
    setTranslate (translateAxis = 'Y', nullableAxis = 'X', side = 'height') {
      const translateValue = (this.imageStyles[side] - this.viewBoxStyles[side]) / 2

      this.viewBoxStyles[`translate${nullableAxis}`] = 0
      this.imageStyles[`translate${nullableAxis}`] = 0
      this.viewBoxStyles[`translate${translateAxis}`] = translateValue
      this.imageStyles[`translate${translateAxis}`] = -translateValue
      this[`lastTranslate${translateAxis}`] = this.viewBoxStyles[`translate${translateAxis}`]

      this.$emit('cropped', this.naturalCropData)
    },
    responseCropBox () {
      this.viewBoxStyles.width = this.naturalCropData.width / this.scaleImage
      this.viewBoxStyles.height = this.naturalCropData.height / this.scaleImage
      this.viewBoxStyles.translateX = this.naturalCropData.x / this.scaleImage
      this.viewBoxStyles.translateY = this.naturalCropData.y / this.scaleImage
      this.imageStyles.translateX = -this.viewBoxStyles.translateX
      this.imageStyles.translateY = -this.viewBoxStyles.translateY
    },
    setNaturalCrop (cropData = null) {
      const width = cropData ? cropData.width : this.viewBoxStyles.width * this.scaleImage
      const height = cropData ? cropData.height : this.viewBoxStyles.height * this.scaleImage
      const x = cropData ? cropData.x : this.viewBoxStyles.translateX * this.scaleImage
      const y = cropData ? cropData.y : this.viewBoxStyles.translateY * this.scaleImage

      this.$set(this.naturalCropData, 'width', width)
      this.$set(this.naturalCropData, 'height', height)
      this.$set(this.naturalCropData, 'x', x)
      this.$set(this.naturalCropData, 'y', y)
    },
    resetCropMove () {
      this.lastTranslateX = 0
      this.lastPageX = 0
      this.startMoveX = 0

      this.lastTranslateY = 0
      this.lastPageY = 0
      this.startMoveY = 0
    },
    setResponsive () {
      this.responsive = window.innerWidth < 640
    },
    loadImage (url) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = resolve
      })
    },
    removeListeners () {
      removeListener(this.cropBox, EVENT_POINTER_DOWN, this.startCropMove)
      removeListener(this.cropBox.ownerDocument, EVENT_POINTER_UP, this.endCropMove)
    }
  }
}
</script>

<style lang="scss">
/* ========================================================================
Component: Cropper
========================================================================== */

.cropper {
  &__container {
    width: 100%;
    height: 100%;
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    touch-action: none;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__canvas {
    position: relative;

    > img {
      display: block;
      width: auto;
      height: auto;
      margin: auto;
    }

    &::before {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: lighten($editor-background-color, 5%);
      opacity: 0.8;
      z-index: 1;
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: -1px;
      right: -1px;
      left: -1px;
      bottom: -1px;
      border: 1px solid rgba($global-border, .5);
    }
  }

  &__crop-box {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: 1px solid rgba(#aaa, 1);
    overflow: hidden;
    transition: top 1s, left 1s;
    z-index: 1;

    &.active {
      outline-color: #fff;
    }
  }

  &__view-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $global-secondary-background;

    img {
      display: block;
      width: 100%;
      height: 100%;
      max-height: none !important;
      max-width: none !important;
      min-height: 0 !important;
      min-width: 0 !important;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__facade {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: 0.5;
    position: absolute;

    &.dashed-h {
      border-bottom-width: 1px;
      border-top-width: 1px;
      height: calc(100% / 3);
      left: 0;
      top: calc(100% / 3);
      width: 100%;
    }

    &.dashed-v {
      border-left-width: 1px;
      border-right-width: 1px;
      height: 100%;
      left: calc(100% / 3);
      top: 0;
      width: calc(100% / 3);
    }
  }

  &__center {
    display: block;
    height: 0;
    left: 50%;
    opacity: 0.75;
    position: absolute;
    top: 50%;
    width: 0;

    &::before,
    &::after {
      background-color: #eee;
      content: ' ';
      display: block;
      position: absolute;
    }

    &::before {
      height: 1px;
      left: -3px;
      top: 0;
      width: 7px;
    }

    &::after {
      height: 7px;
      left: 0;
      top: -3px;
      width: 1px;
    }
  }
}
</style>
