<template lang="pug">
    .uk-panel
        nuxt-link.uk-link-reset(
            :to="{ name: 'catalog-category', params: { category: item.alias } }")
            .tm-catalog__image-container.uk-position-relative
                img.uk-box-shadow-medium(
                    v-show="!imgLoaded"
                    :data-src="url"
                    :alt="item.title"
                    data-uk-img)
                .uk-flex.uk-flex-center.uk-flex-middle.uk-text-muted.uk-box-shadow-medium(
                    v-show="imgLoaded")
                    .uk-position-center.uk-position-z-index(data-uk-spinner="ratio: 2")
                    img.tm-catalog__image-init-bg(:src="initImgSrc" alt="")
            h3.tm-catalog__title {{ item.title }}
</template>

<script>
export default {
  name: 'CatalogImageItem',
  props: {
    item: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 250
    }
  },
  data: () => ({
    baseImageUrl: `${process.env.baseImageUrl}/fit`,
    initImgSrc: '/img/bg/category/category-init-thumb.jpg',
    imgLoaded: true,
    img: null
  }),
  computed: {
    url () {
      return `${this.baseImageUrl}/${this.width}/${this.height}/${this.item.image_path}`
    }
  },
  async mounted () {
    await this.loadImageAsync()
    this.imgLoaded = false
  },
  methods: {
    loadImageAsync () {
      this.img = new Image()
      this.img.src = this.url
      return new Promise((resolve) => {
        this.img.onload = resolve
      })
    }
  }
}
</script>
<style lang="scss">
.tm-catalog__image {
    &-init-bg {
        width: 100%;
        height: auto;
        display: block;
        opacity: .08;
    }
}
</style>
