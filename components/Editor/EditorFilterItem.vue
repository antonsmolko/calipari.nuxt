<template lang="pug">
    .tm-editor__filter-item
        button.tm-editor__filter-button.uk-button(
            type='button',
            :data-uk-icon="`icon: ${icon}; ratio: 1.2`",
            :class="{'active': active}",
            @click='onClick')
</template>

<script>
export default {
  name: 'EditorFilterItem',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
