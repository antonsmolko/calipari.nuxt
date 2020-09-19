<template lang="pug">
  div
    .tm-editor.uk-light.uk-position-relative(
      v-if="$fetchState.pending || !responseData"
      data-uk-height-viewport="offset-top: true")
      .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center.uk-text-muted
        span.uk-text-large Загружается редактор...
        .uk-margin-top.uk-tex-muted(data-uk-spinner="ratio: 3")
    .tm-editor.uk-light.uk-position-relative(
      v-else-if="$fetchState.error"
      data-uk-height-viewport="offset-top: true")
      .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center.uk-text-muted
        p.uk-text-large {{ $fetchState.error.message }}
    .tm-editor.uk-light(v-else)
      .tm-editor__frame(data-uk-height-viewport="offset-top: true")
        .tm-editor__left-bar(data-uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100")
          editor-collection(
            v-if="artCollection.length"
            title="Арт-коллекция"
            v-model="orderSettings.currentImage"
            @click="changeArtCollectionItem"
            :loading="artCollectionLoading"
            :items="artCollection")
          editor-collection(
            v-if="colorCollection.length"
            title="Цветовая коллекция"
            v-model="orderSettings.currentImage"
            @click="changeColorCollection"
            :loading="colorCollectionLoading"
            :items="colorCollection")
          editor-sizes(
            :maxWidth="maxWidth"
            :maxHeight="maxHeight"
            :minValue="minInputValue"
            :ratio="orderSettings.currentImage.ratio"
            :locked="ratioLocked"
            v-model="orderSettings.sizes"
            @ratio-locked-change="handleRatioLockedChange")
          editor-filter(v-model="orderSettings.filter")
          editor-texture(
            v-model="orderSettings.texture"
            :items="textures")
        .tm-editor__workspace
          .tm-editor__workspace-header.uk-flex.uk-flex-between.uk-margin
            .uk-flex
              editor-panel-heading.uk-margin-remove(title="Изображение")
              .tm-editor__workspace-article.uk-margin-small-left {{ orderSettings.currentImage.article }}
            image-like.tm-editor__like(
              :liked="liked"
              @like="onLike")
          cropper.tm-editor__image-cropper(
            :image="orderSettings.currentImage"
            :ratio="sizesRatio"
            :active="!ratioLocked"
            :filter="orderSettings.filter"
            @cropped="getCropData")
        .tm-editor__right-bar(data-uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100")
          editor-preview(
            :image="orderSettings.currentImage"
            :orderSizes="orderSettings.sizes"
            :cropData="cropData"
            :ratioLocked="ratioLocked"
            :filter="orderSettings.filter"
            :texture="orderTexture.name")
          editor-info(
            :article="orderSettings.currentImage.article"
            :width="orderSettings.sizes.width"
            :height="orderSettings.sizes.height"
            :flipH="orderSettings.filter.flipH"
            :flipV="orderSettings.filter.flipV"
            :colorEffect="orderColorEffectName"
            :texture="orderTexture.name")
          editor-purchase(:price="orderPrice" @confirm="onConfirm")
      editor-bottom-bar(:price="orderPrice" @confirm="onConfirm")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import some from 'lodash/some'

import EditorSizes from '@/components/Editor/EditorSizes'
import EditorFilter from '@/components/Editor/EditorFilter'
import EditorTexture from '@/components/Editor/EditorTexture'
import EditorCollection from '@/components/Editor/EditorCollection'
import Cropper from '@/components/Editor/Cropper/Cropper'
import EditorPreview from '@/components/Editor/EditorPreview'
import EditorInfo from '@/components/Editor/EditorInfo'
import EditorPurchase from '@/components/Editor/EditorPurchase'
import EditorBottomBar from '@/components/Editor/EditorBottomBar'
import ImageLike from '@/components/Gallery/ImageLike'
import EditorPanelHeading from '@/components/Editor/EditorPanelHeading'
import scrollToTop from '@/components/mixins/scrollToTop'
import closeEditorMethods from '@/components/mixins/closeEditorMethods'
import { filterSet, hash } from '@/helpers'

export default {
  components: {
    EditorSizes,
    EditorFilter,
    EditorTexture,
    EditorCollection,
    Cropper,
    EditorPreview,
    EditorInfo,
    EditorPurchase,
    EditorBottomBar,
    ImageLike,
    EditorPanelHeading
  },
  mixins: [scrollToTop, closeEditorMethods],
  async fetch () {
    await this.$store.dispatch('setFields', {
      pageTitle: 'Редактор',
      bottomBar: false,
      footer: false,
      editorEnable: true
    })
    if (!this.$route.params.id) {
      await this.$router.push('/notfound')
    }
    await this.$store.dispatch('images/getItemFromEditor', this.$route.params.id)
      .then(() => {
        this.orderSettings.currentImage = this.image
        this.orderSettings.texture = this.textures[0].id
        this.setCropData(this.image)
        this.responseData = true
      })
      .catch((error) => {
        if (error.status === 404) {
          this.$router.push('/notfound')
        }
      })
  },
  data: () => ({
    orderSettings: {
      currentImage: null,
      filter: {
        flipH: false,
        flipV: false,
        colorize: false
      },
      texture: null,
      sizes: {
        width: 0,
        height: 0
      }
    },
    ratioLocked: true,
    minInputValue: 90,
    sizeFactor: 3,
    cropData: {
      width: null,
      height: null,
      x: 0,
      y: 0
    },
    colorCollectionLoading: false,
    artCollectionLoading: false,
    responseData: false
  }),
  computed: {
    ...mapState({
      image: state => state.images.item,
      colorCollection: state => state.images.colorCollection,
      artCollection: state => state.images.artCollection,
      textures: state => state.textures.items,
      fromWishList: state => state.images.isWishList
    }),
    onLoad () {
      return this.textures.length &&
        this.orderSettings.texture &&
        this.image &&
        this.image.ratio
    },
    maxWidth () {
      return this.orderSettings.currentImage.max_print_width
        ? this.orderSettings.currentImage.max_print_width
        : Math.round(this.orderSettings.currentImage.width / this.sizeFactor)
    },
    maxHeight () {
      return Math.round(this.maxWidth / this.orderSettings.currentImage.ratio)
    },
    sizesRatio () {
      return Math.round(this.orderSettings.sizes.width / this.orderSettings.sizes.height * 1000) / 1000
    },
    orderTexture () {
      return this.$store.getters['textures/getItemById'](this.orderSettings.texture)
    },
    orderColorEffectName () {
      return filterSet[this.orderSettings.filter.colorize]
        ? filterSet[this.orderSettings.filter.colorize]
        : '—'
    },
    orderPrice () {
      const textureTax = this.orderTexture.price
      const orderArea = Math.round(this.orderSettings.sizes.width * this.orderSettings.sizes.height / 100) / 100

      return Math.round(orderArea * textureTax / 100) * 100
    },
    cartItemData () {
      return {
        hash: hash(),
        image_id: this.orderSettings.currentImage.id,
        width_cm: this.orderSettings.sizes.width,
        height_cm: this.orderSettings.sizes.height,
        texture_id: this.orderSettings.texture,
        filter: this.orderSettings.filter,
        x: Math.round(this.cropData.x),
        y: Math.round(this.cropData.y),
        width_px: Math.round(this.cropData.width),
        height_px: Math.round(this.cropData.height)
      }
    },
    liked () {
      return this.$store.getters['wishList/liked'](this.orderSettings.currentImage.id)
    }
  },
  // created () {
  // await this.$store.dispatch('images/getItemFromEditor', this.$route.params.id)
  //   .catch((error) => {
  //     console.log(error.status)
  //   })
  // await this.$store.dispatch('setFields', {
  //   pageTitle: 'Редактор',
  //   bottomBar: false,
  //   footer: false,
  //   editorEnable: true
  // })
  //   console.log(this.image)
  //   this.orderSettings.currentImage = this.image
  //   this.orderSettings.texture = this.textures[0].id
  //   this.cropData.width = this.image.width
  //   this.cropData.height = this.image.height
  // },
  beforeDestroy () {
    this.setFieldAction({
      field: 'editorEnable',
      value: false
    })
    this.setImagesFieldsAction({
      item: null,
      colorCollection: [],
      isWishList: false
    })
  },
  methods: {
    ...mapActions({
      setImagesFieldsAction: 'images/setFields',
      setImagesFieldAction: 'images/setField',
      addToCartAction: 'cart/addItem',
      addNotificationAction: 'notifications/addItem',
      setFieldsAction: 'setFields',
      toggleLikeAction: 'wishList/toggle',
      removeImageAction: 'images/removeItem',
      addImageAction: 'images/addItem',
      getImageColorCollectionImagesAction: 'images/getItemColorCollectionImages',
      getImageArtCollectionImagesAction: 'images/getItemArtCollectionImages'
    }),
    handleRatioLockedChange () {
      this.ratioLocked = !this.ratioLocked
    },
    getCropData (value) {
      this.cropData = value
    },
    changeArtCollectionItem (image) {
      if (!some(this.colorCollection, { id: image.id })) {
        this.ratioLocked = true
        this.setCropData(image)
        if (image.hasColorCollection) {
          this.colorCollectionLoading = true
          this.getImageColorCollectionImagesAction(image.id)
            .then(() => {
              this.colorCollectionLoading = false
            })
        }
      }
      if (!image.hasColorCollection) {
        this.setImagesFieldAction({
          field: 'colorCollection',
          value: []
        })
      }
    },
    changeColorCollection (image) {
      if (image.hasArtCollection && !some(this.artCollection, { id: image.id })) {
        this.artCollectionLoading = true
        this.getImageArtCollectionImagesAction(image.id)
          .then(() => {
            this.artCollectionLoading = false
          })
      }
      if (!image.hasArtCollection) {
        this.setImagesFieldAction({
          field: 'artCollection',
          value: []
        })
      }
    },
    async onConfirm () {
      try {
        await this.addToCartAction(this.cartItemData)
        await this.addNotificationAction({
          message: 'Проект добавлен в корзину!',
          status: 'success'
        })
        this.onClose()
      } catch (e) {
        return e
      }
    },
    onLike () {
      const image = this.orderSettings.currentImage
      this.toggleLikeAction(image.id)
      if (this.fromWishList) {
        this.liked
          ? this.addImageAction(image)
          : this.removeImageAction(image.id)
      }
    },
    setCropData (image) {
      this.$set(this.cropData, 'width', image.width)
      this.$set(this.cropData, 'height', image.height)
      this.$set(this.cropData, 'x', 0)
      this.$set(this.cropData, 'y', 0)
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name === 'wishlist') {
        vm.setImagesFieldAction({
          field: 'isWishList',
          value: true
        })
      }
    })
  }
}
</script>

<style lang="scss">
/* ========================================================================
Component: Editor
========================================================================== */
$editor-gutter: 2px;
$editor-background: darken($global-secondary-background, 5%);
$editor-bottom-bar-box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.16);
$editor-top-bar-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);

.tm-editor {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  background-color: $editor-background;

  /* Top Bar
  ========================================================================== */

  &__top-bar {
    box-shadow: $editor-top-bar-box-shadow;
  }

  /* Frame
  ========================================================================== */

  &__frame {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    padding-top: $editor-gutter;
    @include media_mob($s) {
      flex-direction: row;
    }
    @include media_mob($l) {
      flex-wrap: nowrap;
    }
  }

  /* Panel
  ========================================================================== */

  &__panel {
    width: inherit;
    background-color: $editor-background-color;
    padding: $global-small-gutter;
    box-sizing: border-box;

    &:not(:last-child) {
      margin-bottom: $editor-gutter;
    }

    @include media_mob($xs) {
      padding: $global-small-gutter $global-margin;
    }
    @include media_mob($qhd) {
      padding-top: $global-medium-margin;
      padding-bottom: $global-medium-margin;
    }

    .tm-editor__left-bar & {
      @include media_mob($s) {
        padding-left: $global-gutter;
      }
      @include media_mob($m) {
        padding-left: $global-medium-margin;
      }
    }

    .tm-editor__right-bar & {
      @include media_mob($l) {
        padding-right: $global-medium-margin;
      }
    }
  }

  /* Left Bar
  ========================================================================== */

  &__left-bar {
    display: flex;
    flex-direction: column;
    order: 2;
    width: 100%;
    @include media_mob($s) {
      order: 1;
      width: 320px;
      max-width: calc(50% - 1px);
    }
    @include media_mob($m) {
      width: 350px;
    }
    @include media_mob($l) {
      width: 310px;
    }
    @include media_mob($xl) {
      width: 430px;
    }

    &-slider {
      margin-left: -$global-small-gutter;
      padding: 0 $global-small-gutter;
      @include media-mob($s) {
        margin-left: -$global-gutter;
        padding: 0 $global-margin 0 $global-gutter;
      }
      @include media-mob($m) {
        margin-left: -$global-medium-margin;
        padding: 0 $global-margin 0 $global-medium-margin;
      }
    }
  }

  /* Sizes
  ========================================================================== */

  &__sizes {
    &-input {
      border: 1px solid $inverse-global-border;
      box-sizing: border-box;
      padding: 0;
      width: 72px;

      .uk-inline {
        width: inherit;
      }

      &.uk-form-danger {
        background: transparent;
        border-color: $form-danger-border;

        .uk-input {
          color: $form-danger-color;
        }
      }

      .uk-input {
        font-size: .9em;
        font-weight: normal;
        text-align: right;
        padding-right: 30px !important;
      }

      .uk-form-icon {
        font-weight: normal;
        width: 32px;
        font-size: 16px;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }

  /* Ratio Lock */

  $vueboxW: 12;
  $vueboxH: $vueboxW * 2;
  $background-image: url("data:image/svg+xml,%3Csvg width='" + $vueboxW + "' height='" + $vueboxH + "' viewBox='0 0 10 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='black' stroke-width='1.1' d='M7.2,11.2v4.4c0,1-0.6,1.6-1.6,1.6h-1c-1,0-1.6-0.6-1.6-1.6v-4.4'/%3E%3Cpath fill='none' stroke='black' stroke-width='1.1' d='M2.8,8.6V4.2c0-1,0.6-1.6,1.6-1.6h1c1,0,1.6,0.6,1.6,1.6v4.4'/%3E%3Cpath fill='none' stroke='black' stroke-width='1.1' d='M4.9,12.7L5,7.1'/%3E%3C/svg%3E");
  $inverse-background-image: url("data:image/svg+xml,%3Csvg width='" + $vueboxW + "' height='" + $vueboxH + "' viewBox='0 0 10 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' stroke='white' stroke-width='1.1' d='M7.2,11.2v4.4c0,1-0.6,1.6-1.6,1.6h-1c-1,0-1.6-0.6-1.6-1.6v-4.4'/%3E%3Cpath fill='none' stroke='white' stroke-width='1.1' d='M2.8,8.6V4.2c0-1,0.6-1.6,1.6-1.6h1c1,0,1.6,0.6,1.6,1.6v4.4'/%3E%3Cpath fill='none' stroke='white' stroke-width='1.1' d='M4.9,12.7L5,7.1'/%3E%3C/svg%3E");

  &__ratio-lock {
    width: $vueboxW + px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::before, &::after {
      content: '';
      display: block;
      width: $vueboxW / 2 + px;
      height: $vueboxH / 2 + px;
      border-right: 1px solid dimgray;
    }

    &::before {
      border-top: 1px solid dimgray;
    }

    &::after {
      border-bottom: 1px solid dimgray;
    }

    &-input {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);

      &:checked + .tm-editor__ratio-lock-icon {
        opacity: .8;
      }
    }

    &-icon {
      display: block;
      width: $vueboxW + px;
      height: $vueboxH + px;
      margin: 5px 0;
      opacity: .3;
      background-image: $inverse-background-image;
      cursor: pointer;
      transition: opacity .25s ease;
    }
  }

  /* Workspace
  ========================================================================== */

  &__workspace {
    z-index: 1;
    display: flex;
    width: 100%;
    order: 1;
    flex-grow: 1;
    flex-direction: column;
    background-color: lighten($editor-background-color, 5%);
    box-sizing: border-box;
    padding: $global-small-gutter $global-small-gutter $global-margin $global-small-gutter;
    margin-bottom: $editor-gutter;

    &-article {
      font-size: 0.9em;
      font-weight: normal;
      background-color: $global-secondary-background;
      padding: 0 7px;
      height: 24px;
      line-height: 24px;
      margin-top: -2px;
      border-radius: 2px;
    }

    @include media-device(mobile-portrait) {
      height: 340px;
    }
    @include media-mob($se) {
      height: 340px;
    }
    @include media-mob($s) {
      width: 310px;
      height: auto;
      order: 2;
      min-width: calc(50% - 1px);
      margin-bottom: 0;
      margin-left: $editor-gutter;
      padding: $global-margin $global-gutter $global-margin $global-margin;
    }
    @include media-mob($m) {
      padding: $global-margin $global-medium-margin $global-margin $global-margin;
    }
    @include media-mob($l) {
      padding: $global-margin $global-margin $global-medium-margin $global-margin;
      margin: 0 $editor-gutter;
    }
    @include media-mob($qhd) {
      padding: $global-medium-margin $global-margin $global-gutter * 2 $global-margin;
    }
  }

  /* Like
  ========================================================================== */

  &__like {
    padding: 0 !important;
  }

  /* Right Bar
  ========================================================================== */

  &__right-bar {
    width: 100%;
    height: inherit;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    order: 3;
    margin-top: $editor-gutter;
    margin-bottom: $bottom-bar-height;
    @include media_mob($s) {
      order: 3;
      width: 100%;
      flex-direction: row;
    }
    @include media_mob($l) {
      width: 320px;
      flex-direction: column;
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  /* Preview
  ========================================================================== */

  &__preview {
    width: 100%;
    @include media_mob($s) {
      width: 320px;
      max-width: calc(50% - 1px);
      margin-right: $editor-gutter;
      padding-left: $global-gutter;
    }
    @include media_mob($m) {
      width: 350px;
      padding-left: $global-medium-margin;
    }
    @include media_mob($l) {
      width: 100%;
      max-width: inherit;
      margin-right: 0;
      padding-left: $global-margin;
    }

    #preview-container {
      width: 100%;
      max-height: 240px;
      height: 240px;
      @include media_mob($l) {
        max-height: 160px;
        height: 160px;
      }
      @include media_mob($xl) {
        max-height: 200px;
        height: 200px;
      }
      @include media_mob($qhd) {
        max-height: 300px;
        height: 300px;
      }
    }

    #preview-crop {
      overflow: hidden;
      margin: 0 auto;
      box-shadow: 0 7px 20px -10px #000;
      @include media_mob($l) {
        margin: 0 auto;
      }

      img {
        max-width: inherit;
      }
    }
  }

  /* Info
    ========================================================================== */

  &__info {
    width: 100%;
    @include media_mob($s) {
      width: 310px;
      flex-grow: 1;
      min-width: calc(50% - 1px);
      padding-right: $global-gutter;
    }
    @include media_mob($m) {
      padding-right: $global-medium-margin;
    }
    @include media_mob($l) {
      width: 100%;
      margin-bottom: $editor-gutter !important;
    }

    &-item {
      display: flex;
      line-height: 1.2;

      &:not(:last-child) {
        margin-bottom: 7px;
      }

      color: rgba(#fff, .5);
    }

    &-value {
      color: $global-inverse-color;
      @include media_mob($l) {
        width: 150px;
      }
    }
  }

  /* Purchase
  ========================================================================== */

  &__purchase {
    width: 100%;
    padding: $global-medium-margin $global-medium-margin $global-medium-margin $global-margin;
    line-height: 1;

    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-price {
      display: block;
      font-size: 1.8em;
    }

    &-rub {
      font-weight: $base-body-font-weight;
      padding-left: $global-small-margin / 2;
    }
  }

  /* Image Cropper
  ========================================================================== */

  &__image-cropper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-grow: 1;
    transition: transform .5s ease;
  }

  &__image-cropper, &__preview #preview-crop {
    img {
      transition: filter .25s ease;
    }

    &.grayscale {
      img {
        filter: grayscale(1);
      }
    }

    &.sepia {
      img {
        filter: brightness(0.95) grayscale(1) sepia(0.4);
      }
    }
  }

  /* Bottom Bar
  ========================================================================== */

  &__bottom-bar {
    box-shadow: $editor-bottom-bar-box-shadow;

    .uk-navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: $bottom-bar-height;
    }

    &-price {
      font-size: $global-large-font-size;
      color: $global-inverse-color;
      font-weight: normal;
      margin-left: $global-small-margin;

      &-rub {
        padding-left: 3px;
        font-weight: 200;
      }
    }
  }
}

#image {
  max-width: 100%;
}
</style>
