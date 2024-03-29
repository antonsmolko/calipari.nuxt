<template lang="pug">
  section.tm-section__textures.uk-section.uk-section-large.uk-padding-remove-bottom.uk-position-relative.uk-position-z-index
    .uk-width-1-1(data-uk-parallax="y: -150,-80; media: @m")
      .tm-logo-background.uk-position-top-center
        span.uk-icon(data-uk-icon="icon: calipari; ratio: 10")
    .uk-container.uk-container-large
      .uk-margin-large-bottom.uk-text-center.uk-width-large.uk-margin-auto.uk-position-relative
        h2.uk-heading-small Качественные <br>материалы
        .uk-divider-small.uk-margin-large-bottom
        span.uk-text-large Качественная фактура, 100% стыковка, насыщенность цвета
    .uk-container.uk-container-large.uk-padding-remove(
      data-uk-parallax="y: 50,0; viewport: 0.3; media: @m")
      carousel3d.tm-carousel-3d(
        :width="500"
        :height="500"
        :border="0"
        :display="5"
        :space="carouselSpace"
        :inverseScaling="100"
        :perspective="0"
        :controls-visible="true"
        :controls-prev-html="'<span data-uk-icon=\"icon: chevron-left; ratio: 1.5\" class=\"uk-text-muted\"></span>'"
        :controls-next-html="'<span data-uk-icon=\"icon: chevron-right; ratio: 1.5\" class=\"uk-text-muted\"></span>'"
        :controls-width="40"
        :controls-height="60"
        :clickable="false")
        slide.tm-carousel-3d__slide(
          v-for="(item, i) in items"
          :index="i"
          :key="item.id"
          :title="item.name"
          :width="item.width"
          :price="item.price")
          template(slot-scope="{ index, isCurrent, leftIndex, rightIndex }")
            figure
              uk-image(
                :name="item.sample_path"
                :width="500"
                :height="500"
                :alt="item.name")
              .tm-carousel-3d__slide-vignette
            fade-transition(mode="out-in")
              .tm-carousel-3d__overlay.uk-text-center.uk-dark(
                v-show="isCurrent")
                span.tm-carousel-3d__slide-title.uk-h2 {{ item.name }}
                .tm-carousel-3d__overlay-bottom
                  .tm-carousel-3d__overlay-bottom-item
                    span.tm-carousel-3d__overlay-bottom-title.uk-text-uppercase.uk-text-muted Ширина
                    span.uk-text-emphasis.tm-text-medium {{ getWidthText(item) }}
                  .tm-carousel-3d__overlay-bottom-item
                    span.tm-carousel-3d__overlay-bottom-title.uk-text-uppercase.uk-text-muted Цена, м<sup>2</sup>
                    span.uk-text-emphasis.tm-text-medium {{ item.price }} ₽
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomeTexturesSection',
  computed: {
    ...mapState({
      items: state => state.textures.items,
      brakePoint: state => state.breakPoint
    }),
    carouselSpace () {
      if (this.brakePoint.value >= 1200) {
        return 300
      }
      if (this.brakePoint.value >= 800) {
        return 200
      }
      return 110
    }
  },
  methods: {
    getWidthText (item) {
      return item.seamless ? 'Бесшовная' : `${item.width} см`
    }
  }
}
</script>

<style lang="scss">
.tm-section__textures {
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background: white;
    background-image: url('/img/svg/section-background-image-lines.svg');
    background-position-x: 50%;
    clip-path: polygon(100% 0, 100% 83%, 50% 87%, 0 83%, 0 0);
    @include media_mob($m) {
      clip-path: polygon(100% 0, 100% 82%, 50% 88%, 0 82%, 0 0);
    }
  }
}

.tm-carousel-3d {
  &__slide {
    &.current {
      position: relative;
    }

    figure {
      position: relative;
    }

    &-vignette {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(rgba(#fff, 0), rgba(#fafafa, 0.7));
    }
    &-title {
      display: block;
      @include media-desk($s) {
        margin-bottom: $global-small-margin;
      }
    }
  }

  &__overlay {
    display: block;
    position: absolute;
    top: 50%;
    left: $global-large-margin;
    right: $global-large-margin;
    transform: translateY(-50%);

    &-bottom {
      &-title {
        &::after {
          content: " — "
        }
      }

      @include media_mob($s) {
        display: flex;
        justify-content: center;
        &-item {
          &:not(:last-child) {
            margin-right: $global-margin;
          }
        }
      }
    }
  }

  .next, .prev {
    -webkit-tap-highlight-color: transparent;
  }
}

.carousel-3d-slide {
  padding: 40px 50px 60px;
  background: transparent !important;

  figure {
    border: 1px solid white;
    box-shadow: 0 8px 50px -6px rgba(0, 0, 0, .16);
  }
}
</style>
