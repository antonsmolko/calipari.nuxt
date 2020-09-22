<template lang="pug">
    .tm-editor__gallery.tm-editor__panel
        editor-panel-heading(title="Галлерея")
        .tm-editor__gallery-slider-container
          .tm-editor__right-bar-slider.uk-position-relative.uk-visible-toggle.uk-light(
            tabindex="-1"
            data-uk-slider="finite: true"
            data-uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 500")
            ul.uk-grid.uk-grid-small.uk-slider-items(
              data-uk-grid
              data-uk-lightbox="animation: slide")
              li.tm-editor__gallery-item(
                v-for="(item, index) in items"
                :key="index")
                a.uk-inline.uk-link-toggle.uk-width-1-1(
                  :href="getUrl(item)"
                  data-type="image"
                  tabindex="1"
                  :data-caption="`Изображение Арт. ${article} в интерьере`")
                  uk-image.uk-position-relative.uk-position-z-index(
                    :name="item"
                    :height="150"
                    :alt="`Изображение арт. ${article} в интерьере`")
</template>

<script>
import { getS3ImageUrl } from '@/helpers'
import EditorPanelHeading from './EditorPanelHeading'
export default {
  name: 'EditorInfo',
  components: {
    EditorPanelHeading
  },
  props: {
    article: {
      type: [Number, String],
      required: true
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    getUrl (name) {
      return getS3ImageUrl({ name })
    }
  }
}
</script>
