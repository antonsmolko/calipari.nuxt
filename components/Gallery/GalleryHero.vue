<template lang="pug">
    section.uk-section.uk-position-relative
        .tm-section__semitransparent-background.uk-position-cover.uk-background-cover.uk-background-fixed(
            :data-src="url"
            data-uk-img)
        .uk-container
            .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge(
                data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
                h1.uk-heading-medium {{ title }}
                .uk-divider-small
            p.tm-text-medium.uk-margin-large-bottom.uk-width-xxlarge(
                v-if="intro"
                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 500") {{ intro }}
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'GalleryHero',
  props: {
    title: {
      type: String,
      required: true
    },
    backgroundPath: {
      type: String,
      required: true
    },
    intro: {
      type: String,
      default: ''
    },
    grayscaleMod: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    liked () {
      return this.$store.getters['wishlist/liked'](this.image.id)
    },
    url () {
      if (!this.backgroundPath) {
        return ''
      }

      return this.grayscaleMod
        ? `https://manager.npmrundev.ru/image/grayscale/${this.backgroundPath}`
        : `https://manager.npmrundev.ru/image/show/${this.backgroundPath}`
    }
  },
  methods: {
    ...mapActions({
      toggleLikeAction: 'likes/toggleLike'
    }),
    onLike () {
      this.toggleLikeAction(this.image.id)
    }
  }
}
</script>
