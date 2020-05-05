<template lang="pug">
    .div
        label.uk-form-label(v-if="labelName") {{ labelName }}
        .tm-select(:class="{ 'tm-error': error }")
            .tm-select__icon(v-if="icon")
                i.uk-icon(:data-uk-icon="icon")
            vue-select(
                :name="name"
                :class="{ 'vs--error': error, 'tm-select__form-icon': icon }"
                @input="onInput"
                @search="onSearch"
                :clearable="false"
                :loading="isLoading"
                :label="label"
                :value="value"
                :placeholder="placeholder"
                :options="options"
                :disabled="disabled"
                :map-keydown="handlerKeydown")
                template(#open-indicator="{ attributes }")
                    span(v-bind="attributes" data-uk-icon="chevron-down")
                template(#no-options)
                    | Введите запрос
                template(#spinner="{ loading }")
                    div(v-if="loading" data-uk-spinner)
                template(#footer)
                    slot(name="footer")
</template>

<script>
import VueSelect from 'vue-select'

export default {
  name: 'VSelect',
  components: { VueSelect },
  props: {
    name: {
      type: String,
      default: ''
    },
    labelName: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'label'
    },
    icon: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Object, String, Array, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    noOptionsText: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    },
    onSearch (value) {
      this.$emit('search', value)
    },
    handlerKeydown: (map, vm) => ({
      ...map,
      38: (e) => {
        e.preventDefault()
        if (vm.typeAheadPointer > 0) {
          vm.typeAheadPointer -= 1
        }
      },
      40: (e) => {
        e.preventDefault()
        if (vm.typeAheadPointer < vm.options.length - 1) {
          vm.typeAheadPointer += 1
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/vue-select/vue-select';
.tm-select {
    position: relative;
    &__icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: $global-control-large-height;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        color: $global-muted-color;
        .tm-error & {
            color: $form-danger-color;
        }
        .uk-light & {
            color: $inverse-global-muted-color;
        }
    }
    &__form-icon .vs__dropdown-toggle {
        padding-left: 32px;
    }
}
</style>
