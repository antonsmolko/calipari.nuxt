<template lang="pug">
  .uk-background-cover(:data-src="url" data-uk-img)
    slot
</template>

<script>
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'UkImageBackground',
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
    }
  },
  computed: {
    url () {
      return getS3ImageUrl({
        name: this.name,
        height: this.height,
        width: this.width,
        grayscale: this.grayscale,
        fit: 'cover'
      })
    }
  }
}
</script>
