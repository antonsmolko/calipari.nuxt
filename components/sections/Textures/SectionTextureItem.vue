<template lang="pug">
    .tm-textures__item
        section.uk-section.uk-section-xlarge.uk-section-default
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
                    .tm-textures__pattern(class="uk-width-3-4 uk-width-2-5@s" data-uk-lightbox data-uk-scrollspy="cls:uk-animation-slide-bottom-small; delay: 700")
                        div
                            a.uk-inline.uk-transition-toggle(:href="`${baseUrl}/show/${textureSrc}`" tabindex="0" :data-caption="title")
                                img.uk-box-shadow-large(:data-src="`${baseUrl}/widen/600/${textureSrc}`" data-uk-img)
        section.tm-textures__sample.uk-section.uk-background-fixed.uk-background-cover(:data-src="`${baseUrl}/show/${exampleSrc}`" data-uk-img)
</template>

<script>
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
    }
  },
  data: () => ({
    baseUrl: `${process.env.baseUrl}/image`
  })
}
</script>
<style lang="scss">
    .tm-textures {
        &__item {
            section {
                padding-bottom: 0 !important;
                margin-bottom: -$global-large-margin;
            }
        }
        &__sample {
            min-height: 500px;
            max-height: 150vw;
            height: 100vh;
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
    }
</style>
