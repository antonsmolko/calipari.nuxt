<template lang="pug">
  li
    a.uk-inline.uk-link-toggle.uk-width-1-1(
      :href="url"
      data-type="image"
      tabindex="1"
      :data-caption="item.title")
      uk-image.uk-position-relative.uk-position-z-index(
        :name="item.path"
        :width="800"
        :height="600"
        :alt="item.title")
      .uk-position-cover.uk-flex.uk-flex-middle.uk-flex-center(v-if="imgLoaded")
        .uk-text-muted(data-uk-spinner="ratio: 2")
</template>

<script>
import { getS3ImageUrl } from '~/helpers'

export default {
  name: 'PortfolioSlide',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    imgLoaded: true
  }),
  computed: {
    url () {
      return getS3ImageUrl({ name: this.item.path })
    },
    thumbUrl () {
      return getS3ImageUrl({
        name: this.item.path,
        width: 800,
        height: 600
      })
    }
  },
  created () {
    this.loadImgAsync(this.thumbUrl)
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
