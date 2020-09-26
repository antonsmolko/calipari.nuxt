<template lang="pug">
  .tm-mosaic__image.item.withImage.uk-box-shadow-medium(
    data-uk-scrollspy="cls:uk-animation-fade; delay: 200"
    :id="`image-${image.id}`"
    :data-aspect-ratio="image.ratio"
    :style="`background-image: url('${url}')`")
    .tm-mosaic__image-spinner.uk-text-muted(
      v-show="imgLoaded"
      data-uk-spinner="ratio: 2"
      data-no-mosaic="true")
    span.tm-mosaic__inside(v-show="!imgLoaded")
      nuxt-link.tm-mosaic__overlay-link(
        :to="`/editor/${image.id}`"
        data-no-mosaic="true")
      span.tm-mosaic__article {{ image.article }}
      .tm-mosaic__collections(data-no-mosaic="true")
        image-color-collection-badge(
          v-if="image.colorCollection"
          :url="`/catalog/color-collections/${image.colorCollection.alias}`")
        image-art-collection-badge(
          v-if="image.artCollection"
          :url="`/catalog/art-collections/${image.artCollection.alias}`")
      image-examples-gallery.tm-mosaic__examples-gallery(
        v-if="image.examples && image.examples.length"
        :article="image.article"
        :items="image.examples")
      image-like.tm-mosaic__like(
        :liked="liked"
        @like="onLike")
</template>

<script>
import { mapActions } from 'vuex'
import ImageLike from '@/components/Gallery/ImageLike'
import ImageExamplesGallery from '@/components/Gallery/ImageExamplesGallery'
import ImageColorCollectionBadge from '@/components/Gallery/ImageColorCollectionBadge'
import ImageArtCollectionBadge from '@/components/Gallery/ImageArtCollectionBadge'
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'GalleryImage',
  components: {
    ImageLike,
    ImageColorCollectionBadge,
    ImageArtCollectionBadge,
    ImageExamplesGallery
  },
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    imgLoaded: true,
    imageHeight: 400
  }),
  computed: {
    url () {
      return getS3ImageUrl({
        name: this.image.path,
        height: this.imageHeight
      })
    },
    liked () {
      return this.$store.getters['wishList/liked'](this.image.id)
    }
  },
  watch: {
    liked () {
      if (!this.liked) {
        this.$emit('dislike', this.image.id)
      }
    }
  },
  created () {
    this.loadImgAsync(this.url)
      .then(() => {
        this.imgLoaded = false
      })
  },
  methods: {
    ...mapActions({
      toggleLikeAction: 'wishList/toggle'
    }),
    onLike () {
      this.toggleLikeAction(this.image.id)
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

<style lang="scss">
.tm-mosaic {
  &__image {
    position: relative;
    border-radius: 1px;
    z-index: 1;

    &-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
  }

  &__inside {
    position: relative;
    width: 100%;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    z-index: 1;
  }

  &__article {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    line-height: 1;
    background: rgba($global-secondary-background, .5);
    border-radius: 2px;
    font-size: 13px;
    color: $global-inverse-color;
    font-weight: normal;
    padding: 3px 4px;
    margin: $base-mosaic-badge-margin;
  }

  &__collections {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    a {
      &:not(:last-child) {
        padding-bottom: 2px;
      }
      &:not(:first-child) {
        padding-top: 2px;
      }
    }
  }

  &__examples-gallery {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__like {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  &__overlay-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
}
</style>
