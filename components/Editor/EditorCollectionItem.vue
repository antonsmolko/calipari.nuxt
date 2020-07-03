<template lang="pug">
    li.tm-editor__collection-item
        .uk-panel(:class="{'active': isActive }", @click="onClick")
            img(:class="thumbStyle"
                :src="thumbPath",
                :alt="item.article")
</template>

<script>
export default {
  name: 'EditorColorCollectionItem',
  model: {
    prop: 'model',
    event: 'click'
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'color'
    }
  },
  data: () => ({
    baseUrl: `${process.env.baseUrl}/image`
  }),
  computed: {
    isActive () {
      return this.item.id === this.model.id
    },
    thumbPath () {
      return this.type === 'art'
        ? `${this.baseUrl}/heighten/100/${this.item.path}`
        : `${this.baseUrl}/widen/200/${this.item.path}`
    },
    thumbStyle () {
      return this.type === 'art'
        ? 'tm-editor__collection-thumb-art'
        : 'tm-editor__collection-thumb-color'
    }
  },
  methods: {
    onClick () {
      this.$emit('click', this.item)
    }
  }
}
</script>
<style lang="scss">
    .tm-editor {
        &__collection-item {
            .uk-panel {
                cursor: pointer;
                border: 1px solid transparent;
                &.active {
                    border-color: $global-inverse-color;
                }
            }
        }
        &__collection-thumb {
            &-art, &-color {
                height: 50px;
                @include media_mob($xxl) {
                    height: 70px;
                }
            }
        }
    }
</style>
