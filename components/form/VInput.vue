<template lang="pug">
  .tm-form__input.uk-width-1-1
    label.tm-form__label(v-if="label") {{ title }}
    .uk-inline.uk-width-1-1
      span.uk-form-icon(
        v-if="icon"
        :data-uk-icon="`icon: ${icon}`"
        :class="{ 'uk-text-danger': vField && vField.$error }")
      button.uk-form-icon.uk-form-icon-flip.uk-text-primary(
        :class="{ 'uk-text-danger': vField && vField.$error }"
        v-if="controlBtn"
        :data-uk-icon="controlButtonIcon"
        :disabled="vField && vField.$error"
        @click="onClick")
      input.uk-input.uk-form-large.uk-box-shadow-medium(
        :name="name"
        @input="onInput"
        v-model="currentValue"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="{ 'uk-config-danger': vField && vField.$error }")
    .under-input-notice.uk-position-relative(v-if="vRules && vField && vField.$error")
      InputNotificationRequire(v-if="!vField.required && vRules.required" :name="title")
      InputNotificationUnique(v-else-if="!vField.unique && vRules.unique" :name="title")
      InputNotificationMinString(v-else-if="!vField.minLength && vRules.minLength" :name="title" :min="min")
      InputNotificationAlias(v-else-if="!vField.alias && vRules.alias" :name="title")
      InputNotificationSameAsPassword(v-else-if="!vField.sameAsPassword && vRules.sameAsPassword" :name="title")
      InputNotificationEmail(v-else-if="!vField.email && vRules.email" :name="title")
</template>

<script>
import {
  InputNotificationRequire,
  InputNotificationUnique,
  InputNotificationMinString,
  InputNotificationAlias,
  InputNotificationSameAsPassword,
  InputNotificationEmail
} from './input-notifications'

const touchMap = new WeakMap()

export default {
  components: {
    InputNotificationRequire,
    InputNotificationUnique,
    InputNotificationMinString,
    InputNotificationAlias,
    InputNotificationSameAsPassword,
    InputNotificationEmail
  },
  model: {
    prop: 'model',
    event: 'input'
  },
  props: {
    differ: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    maxlength: {
      type: Number,
      default: 30
    },
    min: {
      type: Number,
      default: 2
    },
    module: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    label: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    vDelay: {
      type: Boolean,
      default: false
    },
    vField: {
      type: Object,
      required: true
    },
    vRules: {
      type: Object,
      default: null
    },
    dispatchName: {
      type: String,
      default: 'setFormField'
    },
    trim: {
      type: Boolean,
      default: true
    },
    controlBtn: {
      type: Boolean,
      default: false
    },
    controlBtnIcon: {
      type: String,
      default: 'pencil'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    model: {
      type: String,
      default: ''
    },
    vModelEnable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valueReference: '',
    currentValue: ''
  }),
  computed: {
    storeModule () {
      return this.module ? `${this.module}/` : ''
    },
    controlButtonIcon () {
      return this.vField && this.vField.$error ? 'ban' : this.controlBtnIcon
    }
  },
  created () {
    this.valueReference = this.value
    this.currentValue = this.vModelEnable ? this.model : this.value
  },
  methods: {
    onInput (e) {
      let value = e.target.value
      this.currentValue = value

      if (this.vField && this.vDelay) {
        this.setValidationDelay(this.vField, value)
      } else if (this.vField) {
        this.touched(this.vField, value)
      }

      value = this.trim ? value.trim() : value

      if (this.vModelEnable) {
        this.$emit('input', value)
      } else {
        this.$store.dispatch(`${this.storeModule}${this.dispatchName}`, { field: this.name, value })

        this.$emit('input', { [this.name]: value })
      }
    },
    setValidationDelay (v, value) {
      v.$reset()
      if (touchMap.has(v)) {
        clearTimeout(touchMap.get(v))
      }
      touchMap.set(v, setTimeout(() => {
        this.touched(this.vField, value)
      }, 500))
    },
    touched (v, value) {
      this.differ ? this.touchedDifferent(v, value) : v.$touch()
    },
    touchedDifferent (v, value) {
      this.isDiffer(value.trim(), this.valueReference)
        ? v.$touch()
        : v.$reset()
    },
    isDiffer (a, b) {
      return a !== b
    },
    onClick (e) {
      const value = e.target.value
      this.$emit('control', value)
    }
  }
}
</script>

<style scoped>
.tm-form__input {
  text-align: left;
}
</style>
