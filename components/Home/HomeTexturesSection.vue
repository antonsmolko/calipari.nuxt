<template lang="pug">
    section.tm-section__textures.uk-section.uk-section-large.uk-section-default.uk-padding-remove-bottom.uk-position-relative.uk-position-z-index
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
                :space="300"
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
                            img(:src="`${baseUrl}/${item.sample_path}`"
                                :alt="item.name")
                            .tm-carousel-3d__slide-vignette
                        FadeTransition(mode="out-in")
                            .tm-carousel-3d__overlay.uk-text-center.uk-dark(
                                v-show="isCurrent")
                                .uk-heading-line
                                    span.uk-h2 {{ item.name }}
                                .tm-carousel-3d__overlay-bottom
                                    .tm-carousel-3d__overlay-bottom-item
                                        span.tm-carousel-3d__overlay-bottom-title.uk-text-uppercase.uk-text-muted Ширина
                                        span.uk-text-emphasis.tm-text-medium {{ item.width }} см
                                    .tm-carousel-3d__overlay-bottom-item
                                        span.tm-carousel-3d__overlay-bottom-title.uk-text-uppercase.uk-text-muted Цена, м<sup>2</sup>
                                        span.uk-text-emphasis.tm-text-medium {{ item.price }} ₽
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HomeTexturesSection',
  computed: {
    ...mapState('textures', [
      'items'
    ]),
    baseUrl () {
      return `${process.env.baseUrl}/image/widen/600`
    }
  }
}
</script>

<style lang="scss">
.tm-section__textures {
    clip-path: polygon(100% 0, 100% 83%, 50% 87%, 0 83%, 0 0);
    @include media_mob($m) {
        clip-path: polygon(100% 0, 100% 82%, 50% 88%, 0 82%, 0 0);
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
    background: transparent;
    figure {
        border: 1px solid white;
        box-shadow: 0 8px 50px -6px rgba(0,0,0,.16);
    }
}
</style>
