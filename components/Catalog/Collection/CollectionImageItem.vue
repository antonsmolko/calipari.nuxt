<template lang="pug">
  .tm-mosaic__image.uk-box-shadow-small(:id="`image-${item.id}`")
    span.tm-mosaic__article {{ item.article }}
    image-like.tm-mosaic__like(:liked="liked" @like="onLike")
    image-color-collection-badge(
      v-if="colorBadge && item.colorCollection"
      :url="`/catalog/color-collections/${item.colorCollection}`")
    image-art-collection-badge(
      v-if="artBadge && item.artCollection"
      :url="`/catalog/art-collections/${item.artCollection}`")
    nuxt-link.uk-link-reset(:to="editorUrl")
      .tm-mosaic__container.uk-position-relative
        uk-image.uk-box-shadow-medium(
          :name="item.path"
          :width="600"
          :height="imageHeight"
          fit="cover"
          :alt="item.title")
</template>

<script>
import { mapActions } from 'vuex'
import ImageLike from '@/components/Gallery/ImageLike'
import ImageColorCollectionBadge from '@/components/Gallery/ImageColorCollectionBadge'
import ImageArtCollectionBadge from '@/components/Gallery/ImageArtCollectionBadge'

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
  computed: {
    editorUrl () {
      return this.anchor ? `/editor/${this.item.id}?anchor=${this.anchor}` : `/editor/${this.item.id}`
    },
    liked () {
      return this.$store.getters['wishList/liked'](this.item.id)
    },
    imageHeight () {
      return Math.round(600 / this.imageRatio)
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
  methods: {
    ...mapActions({
      toggleLikeAction: 'wishList/toggle'
    }),
    onLike () {
      this.toggleLikeAction(this.item.id)
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
    position: absolute;
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
