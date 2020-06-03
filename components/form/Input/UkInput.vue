<template lang="pug">
    div
        label.tm-form__label(v-if="title") {{ title }}
        .uk-inline.uk-width-1-1
            span.uk-form-icon(
                v-if="icon"
                :data-uk-icon="icon")
            slot(name="input")
                input.uk-input.uk-form-large.uk-box-shadow-medium(
                    :type="type"
                    :value="value"
                    @input="onInput")
            slot(name="notification")
</template>

<script>
export default {
  name: 'UkInput',
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput (e) {
      const value = e.target.value
      this.$emit('input', { field: this.name, value })
    }
  }
}
</script>

<style>

</style>
