<template lang="pug">
    li.tm-editor__texture-item
        .uk-panel(:class="{'active': isActive }", @click="onClick")
            img.tm-editor__texture-thumb(
                :src="`https://manager.npmrundev.ru/image/crop/200/200/${item.sample_path}`",
                :alt="item.name")
            span.tm-editor__texture-title.uk-text-truncate {{ item.name }}
</template>

<script>
export default {
  name: 'EditorTextureItem',
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
      type: Number,
      default: null
    }
  },
  computed: {
    isActive () {
      return this.item.id === this.model
    }
  },
  methods: {
    onClick () {
      this.$emit('click', this.item.id)
    }
  }
}
</script>
