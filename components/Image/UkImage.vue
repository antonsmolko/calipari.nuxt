<template lang="pug">
    img(:data-src="url"
        :alt="alt"
        data-uk-img)
</template>

<script>
import { getS3ImageUrl } from '~/helpers'

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
    }
  },
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
  }
}
</script>
