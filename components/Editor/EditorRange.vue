<template lang="pug">
    .tm-editor__sizes-range.uk-flex.uk-flex-middle
        touch-range.uk-range(
            :class="css"
            :min="min",
            :max="max",
            :step="1",
            :value="value"
            @input="onInput")
        editor-range-input(
            :invalid="isInvalid",
            :min="min",
            :max="max",
            :value="value"
            @input="onInput")
</template>

<script>
import TouchRange from '@miyaoka/vue-touch-range'
import EditorRangeInput from './EditorRangeInput'

export default {
  name: 'EditorRange',
  components: {
    TouchRange,
    EditorRangeInput
  },
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 1000
    },
    invalid: {
      type: Boolean,
      default: false
    },
    css: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
    },
    defaultValue: {
      type: Number,
      default: null
    }
  },
  computed: {
    isInvalid () {
      return this.value < this.min || this.value > this.max
    }
  },
  watch: {
    defaultValue () {
      this.onInput(this.defaultValue)
    }
  },
  created () {
    this.onInput(this.defaultValue)
  },
  methods: {
    onInput (value) {
      this.$emit('input', Math.round(+value))
    }
  }
}
</script>
