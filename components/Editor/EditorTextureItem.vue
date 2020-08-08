<template lang="pug">
  li.tm-editor__texture-item(:data-seamless="item.seamless")
    .uk-panel.uk-position-relative(:class="{'active': isActive }", @click="onClick")
      i.tm-editor__texture-icon.uk-icon(:data-uk-icon="textureIcon" :data-uk-tooltip="tooltipText")
      img.tm-editor__texture-thumb(
        :data-src="`${localImageEndpoint}/crop/150/150/${item.sample_path}`",
        :alt="item.name"
        data-uk-img)
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
  data: () => ({
    localImageEndpoint: `${process.env.localImageEndpoint}`
  }),
  computed: {
    isActive () {
      return this.item.id === this.model
    },
    textureIcon () {
      return this.item.seamless ? 'seamless' : 'stripes'
    },
    tooltipText () {
      return this.item.seamless ? 'Бесшовная' : 'Полоса'
    }
  },
  methods: {
    onClick () {
      this.$emit('click', this.item.id)
    }
  }
}
</script>
<style lang="scss">
.tm-editor {
  &__texture-item {
    user-select: none;
  }
  &__texture-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: auto;
    color: #BCBCBC;
  }
}
</style>
