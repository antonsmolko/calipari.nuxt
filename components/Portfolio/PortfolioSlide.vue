<template lang="pug">
    li
        a.uk-inline.uk-link-toggle.uk-width-1-1(
            :href="showUrl"
            :data-caption="item.title")
            img.uk-position-relative.uk-position-z-index(
                :data-src="fitUrl"
                :alt="item.title"
                data-uk-img)
            .uk-position-cover.uk-flex.uk-flex-middle.uk-flex-center(v-if="imgLoaded")
                .uk-text-muted(data-uk-spinner="ratio: 2")
</template>

<script>
export default {
  name: 'PortfolioSlide',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    imgLoaded: true
  }),
  computed: {
    fitUrl () {
      return `${process.env.baseImageUrl}/fit/800/600/${this.item.path}`
    },
    showUrl () {
      return `${process.env.baseImageUrl}/show/${this.item.path}`
    }
  },
  created () {
    this.loadImgAsync(this.fitUrl)
      .then(() => {
        this.imgLoaded = false
      })
  },
  methods: {
    loadImgAsync (url) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = resolve
      })
    }
  }
}
</script>
