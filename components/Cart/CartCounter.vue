<template lang="pug">
    .tm-product-counter.uk-box-shadow-small
        input.tm-product-counter__input.uk-input.uk-form-width-xsmall(
            type="number" min="min" max="max" step="step" v-model="model")
        .tm-product-counter__controls
            span.tm-product-counter__up.uk-icon(
                :disabled="isMax"
                data-uk-icon="chevron-up"
                @click="countUp")
            span.tm-product-counter__down.uk-icon(
                :disabled="isMin"
                data-uk-icon="chevron-down"
                @click="countDown")
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'count'
  },
  props: {
    max: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    model: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    count: 1
  }),
  computed: {
    isMax () {
      return this.count >= this.max
    },
    isMin () {
      return this.count <= this.min
    }
  },
  created () {
    this.count = this.model
  },
  methods: {
    countUp () {
      this.count = this.count + 1 < this.max ? this.count + 1 : this.max
      this.$emit('count', this.count)
    },
    countDown () {
      this.count = this.count - 1 > this.min ? this.count - 1 : this.min
      this.$emit('count', this.count)
    }
  }
}
</script>

<style lang="scss">
.tm-product-counter {
    display: flex;
    width: 75px;
    align-items: center;
    background: $global-inverse-color;
    box-sizing: border-box;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        -moz-appearance: textfield;
        appearance: none;
        margin: 0;
    }
    input {
        font-size: $global-font-size;
        color: $global-color !important;
        text-align: center;
        border: 0 none;
        background: $global-inverse-color;
        @include media-desk($hm) {
            height: 36px;
        }
    }

    &__controls {
        > span {
            display: block;
            color: $global-color;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            cursor: pointer;
            &[disabled="disabled"] {
                color: $global-muted-color;
                cursor: inherit;
            }
            @include media-desk($hm) {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>
