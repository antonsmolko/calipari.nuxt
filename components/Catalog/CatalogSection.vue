<template lang="pug">
    section.tm-catalog__topics.uk-section.uk-section-large.uk-text-center(
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
