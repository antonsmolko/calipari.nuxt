<template lang="pug">
  .uk-grid.uk-grid-small(
    :id="`image-${item.image_id}`"
    data-uk-grid)
    div(class="uk-width-1-3@m"
      data-uk-scrollspy="cls:uk-animation-slide-fade; delay: 300")
      .uk-card.uk-card-body.uk-card-default.uk-height-1-1.uk-box-shadow-medium.uk-text-center.uk-flex.uk-flex-center.uk-flex-column
        span.uk-text-muted {{ item.date }}
        span.uk-h2.uk-display-block.uk-margin-remove {{ item.title }}
        nuxt-link.tm-text-medium.uk-link.uk-link-text.uk-margin-top(:to="`/editor/${item.image_id}`")
          | Артикул — {{ item.article }}
    div(class="uk-width-2-3@m"
      data-uk-scrollspy="cls: uk-animation-slide-right-small; delay: 300")
      .uk-height-1-1.uk-position-relative(data-uk-slider)
        .uk-position-relative.uk-visible-toggle
          .uk-slider-container
            ul.uk-slider-items.uk-grid.uk-grid-small.uk-flex-middle(
              class="uk-child-width-1-2@s"
              data-uk-grid
              data-uk-lightbox="animation: slide")
              portfolio-slide(
                v-for="item in item.images"
                :key="item.index"
                :item="item")
          a.uk-position-center-left.uk-position-small.uk-hidden-hover(
            href="#" data-uk-slidenav-previous data-uk-slider-item="previous")
          a.uk-position-center-right.uk-position-small.uk-hidden-hover(
            href="#" data-uk-slidenav-next data-uk-slider-item="next")
        ul.tm-portfolio__item-dotnav.uk-slider-nav.uk-dotnav.uk-position-absolute.uk-margin-top
</template>

<script>
import PortfolioSlide from '@/components/Portfolio/PortfolioSlide'

export default {
  name: 'PortfolioItem',
  components: { PortfolioSlide },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
.tm-portfolio__item {
  &-dotnav {
    @include media-desk($xs) {
      margin-left: $global-small-margin - 4px;
    }
  }
}
</style>
