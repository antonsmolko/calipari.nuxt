<template lang="pug">
    .tm-editor__filter.tm-editor__panel
        h5.uk-h5.uk-margin-bottom Фильтр
        .uk-grid.uk-child-width-auto.uk-grid-small(data-uk-scrollspy="cls: uk-animation-slide-left-medium; delay: 500")
            editor-filter-item(
                icon="flip-h"
                :active="model.flip"
                @click="onFlip('flip')"
            )
            editor-filter-item(
                icon="black"
                :active="model.colorize === 'grayscale'"
                @click="onColorChange('grayscale')"
            )
            editor-filter-item(
                icon="sepia"
                :active="model.colorize === 'sepia'"
                @click="onColorChange('sepia')"
            )
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
    onFlip () {
      const model = this.model
      model.flip = !model.flip

      this.$emit('filtering', model)
    },
    onColorChange (value) {
      const model = this.model

      // if (model.colorize === value) {
      //   model.colorize = false
      // } else {
      //   model.colorize = value
      // }

      model.colorize = model.colorize !== value ? value : false

      // for (const key of Object.keys(model.colorize)) {
      //   if (key === value) {
      //     model.colorize[key] = !model.colorize[key]
      //   } else {
      //     model.colorize[key] = false
      //   }
      // }

      this.$emit('filtering', model)
    }
  }
}
</script>
