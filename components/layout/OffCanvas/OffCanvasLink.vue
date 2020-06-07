<template lang="pug">
    li(@click="onClick")
        nuxt-link(:to="to")
            span.uk-h6 {{ title }}
</template>

<script>
export default {
  name: 'OffCanvasLink',
  props: {
    to: {
      type: String,
      default: '/'
    },
    title: {
      type: String,
      default: 'Главная'
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
