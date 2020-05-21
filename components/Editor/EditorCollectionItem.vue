<template lang="pug">
    li.tm-editor__collection-item
        .uk-panel(:class="{'active': isActive }", @click="onClick")
            img.tm-editor__collection-thumb(
                :src="`${baseUrl}/widen/200/${item.path}`",
                :alt="item.article")
</template>

<script>
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
    }
  },
  data: () => ({
    baseUrl: `${process.env.baseUrl}/image`
  }),
  computed: {
    isActive () {
      return this.item.id === this.model.id
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
            width: 80px;
        }
    }
</style>
