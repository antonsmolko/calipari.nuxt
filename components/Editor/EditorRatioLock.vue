<template lang="pug">
    label.tm-editor__ratio-lock
        input.tm-editor__ratio-lock-input(
            type="checkbox",
            :checked="checked",
            @change="onChange")
        span.tm-editor__ratio-lock-icon
</template>

<script>
export default {
  name: 'EditorRatioLock',
  model: {
    prop: 'model',
    event: 'change'
  },
  props: {
    model: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    checked: true
  }),
  created () {
    this.checked = this.model
  },
  methods: {
    onChange () {
      this.checked = !this.checked
      this.$emit('change', this.checked)
    }
  }
}
</script>
