<template lang="pug">
  .tm-textures__item
    section.tm-textures__content.uk-section.uk-section-large.uk-section-default.uk-padding-remove-bottom.uk-position-relative.uk-position-z-index
      .uk-container
        .tm-textures__header(data-uk-scrollspy="cls:uk-animation-slide-bottom-small; delay: 300")
          h2.uk-heading-small.uk-margin-remove {{ title }}
          .uk-divider-small
        .uk-grid.uk-margin-medium-top(data-uk-grid)
          .tm-textures__description(class="uk-width-3-5@s" data-uk-scrollspy="cls:uk-animation-slide-bottom-small; delay: 300")
            .tm-textures__description-text(v-html="description")
            hr.uk-margin
            .tm-textures__bottom.tm-text-medium
              .tm-textures__spec
                span.tm-textures__spec-heading.uk-h4.uk-text-muted Ширина —
                span.tm-textures__spec-value.uk-text-large {{ width }} см
              .tm-textures__spec
                span.tm-textures__spec-heading.uk-h4.uk-text-muted Цена —
                span.tm-textures__spec-value.uk-text-large {{ cost }} ₽/м<sup>2</sup>
          .tm-textures__pattern(class="uk-width-3-4 uk-width-2-5@s" data-uk-scrollspy="cls:uk-animation-slide-bottom-small; delay: 700")
            div(data-uk-lightbox)
              a.uk-inline.uk-transition-toggle(:href="textureUrl" data-type="image" tabindex="1" :data-caption="title")
                uk-image.uk-box-shadow-large(
                  :name="textureSrc"
                  :width="600"
                  :alt="title")
    section.tm-textures__sample.uk-section(
      v-if="isSafariBrowser"
      :data-uk-height-viewport="`offset-top: ${true}; offset-bottom: ${sampleBottomOffset}`")
      .uk-background-cover(:data-src="exampleUrl" data-uk-img)
    section.tm-textures__sample.uk-section.uk-background-cover.uk-background-fixed(
      v-else
      :data-uk-height-viewport="`offset-top: ${true}; offset-bottom: ${sampleBottomOffset}`"
      :data-src="exampleUrl"
      data-uk-img)
</template>

<script>
import { mapState } from 'vuex'
import { getS3ImageUrl } from '@/helpers'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    textureSrc: {
      type: String,
      required: true
    },
    exampleSrc: {
      type: String,
      required: true
    },
    sampleBottomOffset: {
      type: [String, Number],
      default: 0
    }
  },
  data: () => ({
    baseImageUrl: `${process.env.baseImageUrl}`
  }),
  computed: {
    ...mapState({
      browser: state => state.browser
    }),
    isSafariBrowser () {
      return this.browser === 'Safari'
    },
    textureUrl () {
      return getS3ImageUrl({ name: this.textureSrc })
    },
    exampleUrl () {
      return getS3ImageUrl({ name: this.exampleSrc })
    }
  }
}
</script>
<style lang="scss">
.tm-textures {
  &__content {
    .uk-container {
      margin-bottom: -$global-large-margin;
    }
  }

  &__spec {
    &-heading {
      display: inline-block;
      width: 120px;
      @include media-mob($m) {
        width: $width-small-width;
      }
    }

    &-value {
      color: $global-emphasis-color;
    }
  }

  &__pattern {
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__bottom {
    @include media-mob($s) {
      padding-bottom: $global-xlarge-margin;
    }
  }
  &__sample {
    position: relative;
    overflow: hidden;
    z-index: 0;
    .uk-background-cover {
      position: fixed;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
      z-index: -1;
    }
  }
}
</style>
