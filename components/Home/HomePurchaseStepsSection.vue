<template lang="pug">
    section.uk-section.uk-section-large.uk-section-default
        .uk-container.uk-container-large
            h2.uk-heading-small.uk-width-large Как купить фотообои
            .uk-divider-small
            .uk-margin-xlarge-top.uk-flex.uk-flex-right
                div(class="uk-width-4-5@m")
                    .uk-card.uk-grid-column-collapse(
                        v-for="(item, index) in items"
                        :key="item.id"
                        class="uk-child-width-1-2@s"
                        data-uk-grid)
                        div(data-uk-scrollspy="cls: uk-animation-fade; delay: 300"
                            :class="{ 'uk-flex-last@s': !(item.id % 2) }")
                            img.uk-box-shadow-large(:data-src="`${baseImageUrl}/${item.image_path}`"
                                :alt="item.title"
                                data-uk-img)
                        .uk-card-body.tm-card__number(
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 500"
                            :data-num="index + 1")
                            h3.uk-card-title {{ item.title }}
                            div(v-html="item.description")
</template>

<script>
export default {
  name: 'HomePurchaseStepsSection',
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    baseImageUrl: `${process.env.baseImageUrl}/show`
  })
}
</script>
