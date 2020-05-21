<template lang="pug">
    .tm-editor__collection.tm-editor__panel.uk-light
        h5.uk-h5.uk-margin-bottom(class="uk-visible@s") Коллекция
        .tm-editor__left-bar-slider.uk-position-relative.uk-visible-toggle.uk-light(
            tabindex="-1"
            data-uk-slider="finite: true"
            data-uk-scrollspy="cls: uk-animation-slide-right-medium; delay: 500")
            ul.uk-grid.uk-grid-small.uk-slider-items(data-uk-grid)
                editor-collection-item(
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
                    v-model="currentItem"
                    @click="onClick")
            ul.uk-slider-nav.uk-dotnav.uk-flex-center.uk-margin-top(class="uk-visible@m")
</template>

<script>
import EditorCollectionItem from './EditorCollectionItem'
export default {
  name: 'EditorTexture',
  components: { EditorCollectionItem },
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
      type: Object,
      default: null
    }
  },
  data: () => ({
    currentItem: null
  }),
  created () {
    this.currentItem = this.model
  },
  methods: {
    onClick () {
      this.$emit('click', this.currentItem)
    }
  }
}
</script>

<style lang="scss">
.tm-editor {
    &__collection {
        padding-right: 0 !important;
    }
}
</style>
