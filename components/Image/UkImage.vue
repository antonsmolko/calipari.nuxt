<template lang="pug">
  .uk-position-relative
    .uk-text-muted.uk-position-center.uk-position-z-index(
      v-show="imgLoaded"
      data-uk-spinner="ratio: 2")
    img(:data-src="url"
      :alt="alt"
      :width="width"
      :height="height"
      :style="imgStyle"
      data-uk-img)
</template>

<script>
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'UkImage',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    grayscale: {
      type: Boolean,
      default: false
    },
    fit: {
      type: String,
      default: null
    },
    alt: {
      type: String,
      default: ''
    },
    imgStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    imgLoaded: true
  }),
  computed: {
    url () {
      return getS3ImageUrl({
        name: this.name,
        height: this.height,
        width: this.width,
        grayscale: this.grayscale,
        fit: this.fit
      })
    }
  },
  created () {
    this.loadImgAsync(this.url)
      .then(() => {
        this.imgLoaded = false
      })
  },
  methods: {
    loadImgAsync (url) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = resolve
      })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  border-radius: 1px;
}
</style>
