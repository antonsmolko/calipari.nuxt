<template>
  <div class="observer" />
</template>

<script>
export default {
  name: 'Observer',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    observer: null
  }),
  mounted () {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect')
      }
    }, this.options)

    this.observer.observe(this.$el)
  },
  destroyed () {
    this.observer.disconnect()
  }
}
</script>
