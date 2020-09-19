<template lang="pug">
  .tm-editor__sizes-input.uk-margin-small-left(:class="{'uk-config-danger' : invalid}")
    .uk-inline
      input.uk-input.uk-form-small(
        :class="{'uk-text-danger' : invalid}"
        type="number"
        :min="min"
        :max="max"
        step="1"
        :value="value"
        @change="onChange"
        @input="onInput"
        @keyup.enter="onKeyUpEnter")
      span.uk-form-icon.uk-form-icon-flip.uk-margin-remove(
        :class="{'uk-text-danger' : invalid}") см
</template>

<script>
export default {
  name: 'EditorRangeInput',
  props: {
    invalid: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 1000
    },
    value: {
      type: Number,
      default: null
    }
  },
  methods: {
    onInput (e) {
      const value = Number(e.target.value)
      this.$emit('input', value)
    },
    onChange (e) {
      const value = Number(e.target.value)
      const validValue = this.setValidValue(value)
      this.$emit('input', validValue)
    },
    onKeyUpEnter (e) {
      e.target.blur()
    },
    setValidValue (value) {
      return value < this.min
        ? this.min
        : value > this.max
          ? this.max
          : value
    }
  }
}
</script>

<style lang="scss">
.tm-editor {
  &__sizes-input {
    .uk-form-icon {
      line-height: 30px;
    }
  }
}
</style>
