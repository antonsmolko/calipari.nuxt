<template lang="pug">
  uk-input(
    :title="title"
    :name="name"
    icon="phone")
    template(#input)
      input(
        class="uk-input uk-form-large uk-box-shadow-medium"
        v-mask="$conf.form.PHONE_MASK"
        :value="value"
        :tokens="token"
        @focus="onInput"
        @input="onInput"
        :masked="true")
    template(#notification)
      .under-input-notice.uk-position-relative(v-if="vRules && vField && vField.$error")
        input-notification-phone(v-if="!vField.testPhone && vRules.phone" :name="title")
</template>

<script>
import { mask } from 'vue-the-mask'
import UkInput from '@/components/form/Input/UkInput'
import { InputNotificationPhone } from '@/components/form/input-notifications'
const touchMap = new WeakMap()

export default {
  name: 'PhoneInput',
  components: {
    UkInput,
    InputNotificationPhone
  },
  directives: { mask },
  props: {
    differ: {
      type: Boolean,
      default: false
    },
    module: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'phone'
    },
    title: {
      type: String,
      default: 'Телефон'
    },
    label: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    token: {
      '#': { pattern: /\d/ }
    },
    valueReference: '',
    currentValue: ''
  }),
  computed: {
    storeModule () {
      return this.module ? `${this.module}/` : ''
    }
  },
  created () {
    this.valueReference = this.value
    this.currentValue = this.value
  },
  methods: {
    onInput (e) {
      const input = e.target
      const value = input.value
      this.currentValue = value

      const startWith = this.$conf.form.PHONE_START_WITH
      let maskedValue = value

      if ((value.length < 4) || !value.startsWith(startWith)) {
        input.value = startWith
        maskedValue = startWith
      }

      if (this.vField && this.vDelay) {
        this.setValidationDelay(this.vField, maskedValue)
      } else if (this.vField) {
        this.touched(this.vField, maskedValue)
      }

      this.$store.dispatch(`${this.storeModule}${this.dispatchName}`, { field: this.name, value: maskedValue })

      this.$emit('input', { [this.name]: maskedValue })
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
      this.isDiffer(value, this.valueReference)
        ? v.$touch()
        : v.$reset()
    },
    isDiffer (a, b) {
      return a !== b
    }
  }
}
</script>
