<template lang="pug">
    .tm-editor.uk-light(v-if="onLoad")
        EditorTopBar(@close="onClose")
        .tm-editor__frame(data-uk-height-viewport="offset-top: true")
            .tm-editor__left-bar(data-uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100")
                EditorSizes(
                    :maxWidth="maxWidth"
                    :maxHeight="maxHeight"
                    :minValue="minInputValue"
                    :ratio="image.ratio"
                    v-model="orderSettings.sizes"
                    @ratio-locked-change="handleRatioLockedChange"
                )
                EditorFilter(v-model="orderSettings.filter")
                EditorTexture(
                    v-model="orderSettings.texture"
                    :items="textures")
            .tm-editor__workspace
                .tm-editor__workspace-header.uk-flex.uk-flex-between.uk-margin
                    .uk-flex
                        span.uk-h5.uk-margin-remove Изображение
                        .tm-editor__workspace-article.uk-margin-small-left {{ image.article }}
                Cropper.tm-editor__image-cropper(
                    :image="image"
                    :ratio="sizesRatio"
                    :active="!ratioLocked"
                    :filter="orderSettings.filter"
                    @cropped="getCropData")
            .tm-editor__right-bar(data-uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100")
                EditorPreview(
                    :image="image"
                    :orderSizes="orderSettings.sizes"
                    :cropData="cropData"
                    :ratioLocked="ratioLocked"
                    :filter="orderSettings.filter"
                    :texture="orderTexture.name"
                )
                EditorInfo(
                    :article="image.article"
                    :width="orderSettings.sizes.width"
                    :height="orderSettings.sizes.height"
                    :flip="orderSettings.filter.flip"
                    :colorEffect="orderColorEffectName"
                    :texture="orderTexture.name"
                )
                EditorPurchase(:price="orderPrice" @confirm="onConfirm")
        EditorBottomBar(:price="orderPrice" @confirm="onConfirm")
</template>

<script>
import { mapState, mapActions } from 'vuex'

import EditorTopBar from '~/components/Editor/EditorTopBar'
import EditorSizes from '~/components/Editor/EditorSizes'
import EditorFilter from '~/components/Editor/EditorFilter'
import EditorTexture from '~/components/Editor/EditorTexture'
import Cropper from '~/components/Editor/Cropper/Cropper'
import EditorPreview from '~/components/Editor/EditorPreview'
import EditorInfo from '~/components/Editor/EditorInfo'
import EditorPurchase from '~/components/Editor/EditorPurchase'
import EditorBottomBar from '~/components/Editor/EditorBottomBar'
import { filterSet, hash } from '~/helpers'

export default {
  layout: 'editor',
  scrollToTop: true,
  components: {
    EditorTopBar,
    EditorSizes,
    EditorFilter,
    EditorTexture,
    Cropper,
    EditorPreview,
    EditorInfo,
    EditorPurchase,
    EditorBottomBar
  },
  async fetch ({ store, params }) {
    await store.$api.$get(`/catalog/images/${params.id}`)
      .then(response => store.commit('images/SET_FIELDS', { item: response }))
  },
  data: () => ({
    orderSettings: {
      filter: {
        flip: false,
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
    }
  }),
  computed: {
    ...mapState({
      image: state => state.images.item,
      textures: state => state.textures.items
    }),
    onLoad () {
      return this.textures.length &&
        this.orderSettings.texture &&
        this.image &&
        this.image.ratio
    },
    maxWidth () {
      return Math.round(this.image.width / this.sizeFactor)
    },
    maxHeight () {
      return Math.round(this.maxWidth / this.image.ratio)
    },
    sizesRatio () {
      return Math.round(this.orderSettings.sizes.width / this.orderSettings.sizes.height * 1000) / 1000
    },
    orderTexture () {
      return this.$store.getters['textures/getItemById'](this.orderSettings.texture)
    },
    orderColorEffectName () {
      return filterSet[this.orderSettings.filter.colorize] ? filterSet[this.orderSettings.filter.colorize] : '-'
    },
    orderPrice () {
      const textureTax = this.orderTexture.price
      const orderArea = Math.round(this.orderSettings.sizes.width * this.orderSettings.sizes.height / 100) / 100

      return Math.round(orderArea * textureTax / 100) * 100
    },
    cartGoodData () {
      return {
        id: hash(),
        imageId: this.image.id,
        imageName: this.image.path,
        width: this.orderSettings.sizes.width,
        height: this.orderSettings.sizes.height,
        texture: this.orderSettings.texture,
        filter: this.orderSettings.filter,
        x: Math.round(this.cropData.x),
        y: Math.round(this.cropData.y),
        cropWidth: Math.round(this.cropData.width) || this.image.width,
        cropHeight: Math.round(this.cropData.height) || this.image.height,
        qty: 1
      }
    }
  },
  created () {
    this.orderSettings.texture = this.textures[0].id
    this.cropData.width = this.image.width
    this.cropData.height = this.image.height
  },
  destroyed () {
    this.setImageFieldsAction({ image: {} })
  },
  methods: {
    ...mapActions({
      setImageFieldsAction: 'images/setFields',
      addToCartAction: 'cart/addItem',
      addNotificationAction: 'notifications/addItem'
    }),
    onClose () {
      this.$router.go(-1) ? this.$router.go(-1) : this.$router.push('/catalog')
    },
    handleRatioLockedChange (value) {
      this.ratioLocked = value
    },
    getCropData (value) {
      this.cropData = value
    },
    onConfirm () {
      this.addToCartAction(this.cartGoodData)
      this.addNotificationAction({
        message: 'Ваш товар добавлен в корзину!',
        status: 'success'
      })
      this.onClose()
    }
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
        width: 100%;
        background-color: $editor-background-color;
        padding: $global-small-gutter;
        box-sizing: border-box;

        &:not(:last-child) {
            margin-bottom: $editor-gutter;
        }

        @include media_mob($xs) {
            padding: $global-margin;
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
        @include media_mob($xl) {
            width: 430px;
        }
    }

    /* Sizes
    ========================================================================== */

    &__sizes {
        &-input {
            border: 1px solid $inverse-global-border;
            box-sizing: border-box;
            padding: 0;
            //min-width: 72px;
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

    /* Filter
    ========================================================================== */

    &__filter-button {
        width: 100%;
        background-color: rgba(#fff, .1);
        height: 40px;
        border: 1px solid transparent;
        border-radius: 0;
        padding: 0 20px;
        line-height: inherit;
        @include media-mob($m) {
            padding: 0 25px;
        }

        &.active {
            border-color: $global-inverse-color;
            color: $global-inverse-color;
        }
    }

    /* Texture
    ========================================================================== */

    &__texture {
        flex-grow: 1;

        &-item {
            cursor: pointer;
            width: 25%;
            @include media_mob($s) {
                width: 95px;
            }
            @include media_mob($l) {
                width: 85px;
            }
            @include media_mob($xl) {
                width: 110px;
            }

            > .active, &:hover {
                opacity: 1;

                .tm-editor__texture-thumb {
                    opacity: 1;
                }

                .tm-editor__texture-title {
                    color: #fff;
                }
            }
        }

        &-thumb {
            display: block;
            width: 100%;
            height: auto;
            opacity: .5;
            transition: opacity .25s ease;
        }

        &-title {
            display: block;
            transition: color .25s ease;
            font-size: $global-small-font-size;
            margin-top: 5px;
        }
    }

    /* Workspace
    ========================================================================== */

    &__workspace {
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
            padding: $global-small-margin / 2 $global-small-margin;
            line-height: 1;
        }

        @include media_device(mobile-portrait) {
            height: 340px;
        }
        @include media_mob($se) {
            height: 340px;
        }
        @include media_mob($s) {
            width: 310px;
            height: auto;
            order: 2;
            min-width: calc(50% - 1px);
            margin-bottom: 0;
            margin-left: $editor-gutter;
            padding: $global-margin $global-gutter $global-margin $global-margin;
        }
        @include media_mob($m) {
            padding: $global-margin $global-medium-margin $global-margin $global-margin;
        }
        @include media_mob($l) {
            padding: $global-margin $global-margin $global-medium-margin $global-margin;
            margin: 0 $editor-gutter;
        }
        @include media_mob($qhd) {
            padding: $global-medium-margin $global-margin $global-gutter * 2 $global-margin;
        }
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
            // @include media_mob($se) {
            //     margin: 0;
            // }
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
            align-items: center;
            line-height: 1.2;

            &:not(:last-child) {
                margin-bottom: 7px;
            }

            color: rgba(#fff, .5);
        }

        &-value {
            color: $global-inverse-color;
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

        .scale-x {
            transform: scaleX(-1);
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
