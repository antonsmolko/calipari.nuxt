<template lang="pug">
  .tm-mosaic__image.uk-box-shadow-small(:id="`image-${item.id}`")
    .tm-mosaic__image-spinner.uk-text-muted.uk-position-z-index(
      v-show="imgLoaded"
      data-uk-spinner="ratio: 2"
      data-no-mosaic="true")
    span.tm-mosaic__article {{ item.article }}
    image-like.tm-mosaic__like(
      :liked="liked"
      @like="onLike")
    image-color-collection-badge(
      v-if="colorBadge && item.colorCollection"
      :url="`/catalog/color-collections/${item.colorCollection}`")
    image-art-collection-badge(
      v-if="artBadge && item.artCollection"
      :url="`/catalog/art-collections/${item.artCollection}`")
    nuxt-link.uk-link-reset(
      :to="editorUrl")
      .tm-mosaic__container.uk-position-relative
        uk-image.uk-box-shadow-medium(
          :name="item.path"
          :width="600"
          :height="600 / this.imageRatio"
          :alt="item.title")
</template>

<script>
import { mapActions } from 'vuex'
import ImageLike from '@/components/Gallery/ImageLike'
import ImageColorCollectionBadge from '@/components/Gallery/ImageColorCollectionBadge'
import ImageArtCollectionBadge from '@/components/Gallery/ImageArtCollectionBadge'
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'CollectionImageItem',
  components: {
    ImageLike,
    ImageColorCollectionBadge,
    ImageArtCollectionBadge
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    anchor: {
      type: String,
      default: null
    },
    colorBadge: {
      type: Boolean,
      default: false
    },
    artBadge: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    imgLoaded: true
  }),
  computed: {
    imageUrl () {
      return getS3ImageUrl({
        name: this.item.path,
        width: 600,
        height: 600 / this.imageRatio
      })
    },
    editorUrl () {
      return this.anchor ? `/editor/${this.item.id}?anchor=${this.anchor}` : `/editor/${this.item.id}`
    },
    liked () {
      return this.$store.getters['wishList/liked'](this.item.id)
    },
    imageRatio () {
      return Math.round(this.item.width / this.item.height * 100) / 100
    }
  },
  watch: {
    liked () {
      if (!this.liked) {
        this.$emit('dislike', this.item.id)
      }
    }
  },
  created () {
    this.loadImgAsync(this.imageUrl)
      .then(() => {
        this.imgLoaded = false
      })
  },
  methods: {
    ...mapActions({
      toggleLikeAction: 'wishList/toggle'
    }),
    onLike () {
      this.toggleLikeAction(this.item.id)
    },
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

<style lang="scss" scoped>
.tm-mosaic {
  &__image {
    position: relative;
  }

  &__article, &__like, &__color-collection, &__art-collection {
    position: absolute;
    z-index: 1;
  }

  &__article {
    top: 0;
    left: 0;
  }

  &__like {
    right: 0;
    bottom: 0;
  }

  &__color-collection, &__art-collection {
    top: 0;
    right: 0;
  }
}
</style>
