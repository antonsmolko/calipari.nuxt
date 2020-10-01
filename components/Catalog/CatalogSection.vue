<template lang="pug">
  section.tm-catalog__section.uk-section.uk-section-large.uk-text-center(
    data-uk-scrollspy="cls:uk-animation-slide-bottom-small"
    :class="sectionStyles")
    .uk-container(:class="containerStyles")
      h2.uk-heading-small {{ title }}
      .uk-divider-small.uk-margin-large-bottom
      .uk-grid.uk-grid-small(
        :class="gridStyles"
        data-uk-grid
        data-uk-scrollspy="target: > *; cls: uk-animation-fade; delay: 50")
        slot
</template>

<script>
export default {
  name: 'CatalogSection',
  props: {
    title: {
      type: String,
      default: ''
    },
    sectionStyles: {
      type: [String, Object],
      default: ''
    },
    containerStyles: {
      type: String,
      default: ''
    },
    gridStyles: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
.tm-catalog__title {
  font-size: 0.95rem;
  margin-top: $global-small-margin;
  margin-bottom: 0;
  color: $global-color;
  line-height: 1.2;
  height: 36px;
  @include media-mob($s) {
    font-size: 1.1rem;
    margin-top: $global-small-gutter;
  }
  @include media-mob($m) {
    height: 50px;
  }
}
</style>
