<template lang="pug">
  .tm-image__examples-gallery(data-no-mosaic="true")
    .tm-image__examples-gallery-inner(
      data-no-mosaic="true"
      data-uk-lightbox="animation: slide"
      data-uk-icon="icon: album; ratio: 0.9"
      ref="gallery"
      @click="onClick")
      div(
        data-no-mosaic="true"
        v-for="(item, index) in items")
        a(data-no-mosaic="true"
          :key="index"
          :href="getUrl(item)"
          data-type="image"
          tabindex="1"
          :data-caption="`Изображение Арт. ${article} в интерьере`")
</template>

<script>
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'ImageExamplesGallery',
  props: {
    article: {
      type: [String, Number],
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    getUrl (name) {
      return getS3ImageUrl({ name })
    },
    onClick () {
      const gallery = this.$refs.gallery
      const lightbox = this.$uikit.lightbox(gallery)

      lightbox.show(0)
    }
  }
}
</script>

<style lang="scss">
.tm-image__examples-gallery {
  display: block;
  cursor: pointer;
  padding: $global-small-margin $global-small-margin $base-mosaic-badge-margin $base-mosaic-badge-margin;
  text-align: center;
  line-height: 22px;
  &-inner {
    display: block;
    background: rgba($global-secondary-background, .5);
    line-height: 1;
    padding: 3px;
    border-radius: $label-border-radius;
    color: $global-inverse-color;
  }
}
</style>
