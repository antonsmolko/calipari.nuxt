<template lang="pug">
    section.tm-section__hero.uk-section.uk-position-relative
        .uk-container.uk-position-relative
            .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge(
                data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
                h1.uk-heading-medium {{ title }}
                .uk-divider-small
            p.tm-text-medium.uk-margin-large-bottom.uk-width-xxlarge(
                v-if="intro"
                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 500") {{ intro }}
            slot(name="sub-hero")
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
      default: null
    },
    intro: {
      type: String,
      default: ''
    }
  },
  computed: {
    liked () {
      return this.$store.getters['wishlist/liked'](this.image.id)
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

<style lang="scss">
.tm-section__hero {
    z-index: 3;
}
</style>
