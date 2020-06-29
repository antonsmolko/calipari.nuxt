<template lang="pug">
    .tm-editor__filter.tm-editor__panel
        h5.uk-h5.uk-margin-bottom Фильтр
        .uk-grid.uk-child-width-auto.uk-grid-small(
            data-uk-grid
            data-uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 500")
            editor-filter-item(
                icon="flip-h"
                :active="model.flipH"
                @click="onFlipH")
            editor-filter-item(
                icon="flip-v"
                :active="model.flipV"
                @click="onFlipV")
            editor-filter-item(
                icon="black"
                :active="model.colorize === 'grayscale'"
                @click="onColorChange('grayscale')")
            editor-filter-item(
                icon="sepia"
                :active="model.colorize === 'sepia'"
                @click="onColorChange('sepia')")
</template>

<script>
import EditorFilterItem from './EditorFilterItem'

export default {
  name: 'EditorFilter',
  components: { EditorFilterItem },
  model: {
    prop: 'model',
    event: 'filtering'
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onFlipH () {
      const model = this.model
      model.flipH = !model.flipH

      this.$emit('filtering', model)
    },
    onFlipV () {
      const model = this.model
      model.flipV = !model.flipV

      this.$emit('filtering', model)
    },
    onColorChange (value) {
      const model = this.model

      model.colorize = model.colorize !== value ? value : false

      this.$emit('filtering', model)
    }
  }
}
</script>
