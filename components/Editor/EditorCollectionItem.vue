<template lang="pug">
    li.tm-editor__collection-item
        .uk-panel(:class="{'active': isActive }", @click="onClick")
            img(:class="thumbStyle"
                :data-src="thumbPath",
                :alt="item.article"
                data-uk-img)
</template>

<script>
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'EditorCollectionItem',
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
  computed: {
    isActive () {
      return this.item.id === this.model.id
    },
    thumbPath () {
      return this.type === 'art'
        ? getS3ImageUrl({ name: this.item.path, height: 100 })
        : getS3ImageUrl({ name: this.item.path, width: 200 })
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
                height: 40px;
                @include media_mob($m) {
                    height: 50px;
                }
                @include media_mob($xxl) {
                    height: 70px;
                }
            }
        }
    }
</style>
