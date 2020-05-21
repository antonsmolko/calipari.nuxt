<template lang="pug">
    .uk-panel(class="uk-width-1-2@s uk-width-1-3@m")
        .tm-mosaic__image.uk-box-shadow-small
            .tm-mosaic__image-spinner.uk-text-muted.uk-position-z-index(
                v-show="imgLoaded"
                data-uk-spinner="ratio: 2"
                data-no-mosaic="true")
            span.tm-mosaic__article {{ item.article }}
            span.tm-mosaic__like(
                :class="{ 'uk-active': liked }"
                @click="onLike")
                span(data-uk-icon="heart")
            nuxt-link.uk-link-reset(
                :to="`/editor/${item.id}`")
                .tm-mosaic__container.uk-position-relative
                    img.uk-box-shadow-medium(
                        :data-src="url"
                        :alt="item.title"
                        data-uk-img)
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CollectionImageSection',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    imgLoaded: true,
    baseUrl: `${process.env.baseUrl}/image/widen`
  }),
  computed: {
    url () {
      return `${this.baseUrl}/500/${this.item.path}`
    },
    liked () {
      return this.$store.getters['wishList/liked'](this.item.id)
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
    this.loadImgAsync(this.url)
      .then(() => { this.imgLoaded = false })
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
    &__article, &__like {
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
}
</style>
