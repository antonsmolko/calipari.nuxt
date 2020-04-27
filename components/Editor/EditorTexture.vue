<template lang="pug">
    .tm-editor__texture.tm-editor__panel.uk-light
        h5.uk-h5.uk-margin-bottom Фактуры
        .uk-position-relative.uk-visible-toggle.uk-light(
            tabindex="-1"
            data-uk-slider="finite: true"
            data-uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 500")
            ul.uk-grid.uk-grid-small.uk-slider-items(data-uk-grid)
                editor-texture-item(
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    v-model="activeItem"
                    @click="onClick")
            ul.uk-slider-nav.uk-dotnav.uk-flex-center.uk-margin
</template>

<script>
import EditorTextureItem from './EditorTextureItem'
export default {
  name: 'EditorTexture',
  components: { EditorTextureItem },
  model: {
    prop: 'model',
    event: 'click'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    model: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    activeItem: null
  }),
  created () {
    this.activeItem = this.model
  },
  methods: {
    onClick () {
      this.$emit('click', this.activeItem)
    }
  }
}
</script>
