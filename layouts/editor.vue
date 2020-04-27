<template lang="pug">
    div(v-if="onLoad")
        nuxt
</template>
<script>
export default {
  metaInfo () {
    return {
      title: 'Редактор',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  data () {
    return {
      onLoad: false
    }
  },
  mounted () {
    this.onLoad = true
  }
}
</script>
