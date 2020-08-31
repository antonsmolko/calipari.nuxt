<template lang="pug">
  div
    label.tm-form__label(v-if="title") {{ title }}
    .uk-inline.uk-width-1-1
      span.uk-form-icon(
        v-if="icon"
        :data-uk-icon="icon")
      slot(name="input")
        textarea.uk-textarea.uk-form-large.uk-box-shadow-medium(
          :rows="rows"
          :value="value"
          @input="onInput")
      slot(name="notification")
</template>

<script>
export default {
  name: 'UkTextarea',
  props: {
    value: {
      type: [Number, String],
      default: ''
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
    rows: {
      type: Number,
      default: 5
    }
  },
  methods: {
    onInput (e) {
      const value = e.target.value
      this.$emit('input', {
        field: this.name,
        value
      })
    }
  }
}
</script>

<style scoped>
.uk-textarea.uk-form-large {
  line-height: 1.3;
  padding: 12px 12px 12px 40px;
}

.uk-form-icon {
  align-items: flex-start;
  margin-top: 18px;
}
</style>
