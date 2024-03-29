<template lang="pug">
  .tm-form__input.uk-width-1-1
    uk-textarea(
      :title="title"
      :name="name"
      icon="comment"
      :class="{ 'uk-config-danger': vField && vField.$error }")
      template(#input)
        textarea.uk-textarea.uk-form-large.uk-box-shadow-medium(
          :rows="rows"
          v-model="currentValue"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="onInput")
      template(#notification)
        .under-input-notice.uk-position-relative(v-if="vRules && vField && vField.$error")
          input-notification-require(v-if="!vField.required && vRules.required" :name="title")
          input-notification-min-string(v-else-if="!vField.minLength && vRules.minLength" :name="title" :min="min")
</template>

<script>
import UkTextarea from '@/components/form/Input/UkTextarea'
import {
  InputNotificationRequire,
  InputNotificationMinString
} from './input-notifications'

const touchMap = new WeakMap()

export default {
  name: 'VTextarea',
  components: {
    UkTextarea,
    InputNotificationRequire,
    InputNotificationMinString
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
    rows: {
      type: Number,
      default: 5
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
    }
  },
  watch: {
    model () {
      if (this.vModelEnable) {
        this.currentValue = this.model
      }
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
        this.$store.dispatch(`${this.storeModule}${this.dispatchName}`, {
          field: this.name,
          value
        })

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
    }
  }
}
</script>

<style scoped>
.tm-form__input {
  text-align: left;
}
</style>
