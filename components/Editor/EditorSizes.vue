<template lang="pug">
    .tm-editor__sizes.tm-editor__panel
        editor-panel-heading(title="Размеры")
        .uk-flex
            .uk-flex-1
                editor-range.uk-margin-small-bottom(
                    css="range-width"
                    :min="minWidth"
                    :max="maxWidth"
                    :value="model.width"
                    :defaultValue="defaultWidth"
                    :invalid="widthInvalid"
                    @input="handleInputWidth")
                editor-range(
                    css="range-height"
                    :min="minHeight"
                    :max="maxHeight"
                    :value="model.height"
                    :defaultValue="defaultHeight"
                    :invalid="heightInvalid"
                    @input="handleInputHeight")
            .uk-margin-small-left.ratio-link
                editor-ratio-lock(:checked="locked" @change="handleRatioLockedChange")
</template>

<script>
import EditorPanelHeading from './EditorPanelHeading'
import EditorRange from './EditorRange'
import EditorRatioLock from './EditorRatioLock'
export default {
  name: 'EditorSizes',
  components: {
    EditorPanelHeading,
    EditorRange,
    EditorRatioLock
  },
  model: {
    prop: 'model',
    event: 'calculation'
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    maxWidth: {
      type: Number,
      default: 1
    },
    maxHeight: {
      type: Number,
      default: 1
    },
    minValue: {
      type: Number,
      default: 1
    },
    ratio: {
      type: Number,
      required: true
    },
    locked: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    widthInvalid () {
      return this.model.width < this.minWidth || this.model.width > this.maxWidth
    },
    heightInvalid () {
      return this.model.height < this.minHeight || this.model.height > this.maxHeight
    },
    minWidth () {
      return this.locked
        ? this.ratio > 1
          ? Math.round(this.minValue * this.ratio)
          : this.minValue
        : this.minValue
    },
    minHeight () {
      return this.locked
        ? this.ratio > 1
          ? this.minValue
          : Math.round(this.minValue / this.ratio)
        : this.minValue
    },
    defaultWidth () {
      return Math.round((this.maxWidth - this.minWidth) / 2 + this.minWidth)
    },
    defaultHeight () {
      return Math.round(this.defaultWidth / this.ratio)
    }
  },
  watch: {

  },
  methods: {
    handleInputWidth (value) {
      const model = this.getUpdatedModelByWidth(value)
      this.$emit('calculation', model)
    },
    handleInputHeight (value) {
      const model = this.getUpdatedModelByHeight(value)
      this.$emit('calculation', model)
    },
    getUpdatedModelByWidth (value) {
      const model = { ...this.model }
      model.width = value

      if (this.locked) {
        model.height = Math.round(value / this.ratio)
      }

      return model
    },
    getUpdatedModelByHeight (value) {
      const model = { ...this.model }
      model.height = value

      if (this.locked) {
        model.width = Math.round(value * this.ratio)
      }

      return model
    },
    handleRatioLockedChange () {
      // if (this.ratioLocked) {
      //   this.handleInputWidth(this.defaultWidth)
      // }

      this.$emit('ratio-locked-change')
    }
  }
}
</script>
