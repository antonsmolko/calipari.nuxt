<template>
  <span class="uk-hidden" />
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    component: null
  }),
  async mounted () {
    window.addEventListener('close', this.onClose)
    this.component = await this.$uikit.notification({
      message: this.item.message,
      status: this.item.status,
      pos: 'top-center',
      timeout: this.item.timeout || 5000
    })
  },
  beforeDestroy () {
    window.removeEventListener('close', this.onClose)
    this.component.$destroy()
    this.$store.dispatch('notifications/deleteItem', this.item.id)
  },
  methods: {
    onClose () {
      this.$store.dispatch('notifications/deleteItem', this.item.id)
    }
  }
}
</script>
