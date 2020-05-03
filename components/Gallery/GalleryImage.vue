<template lang="pug">
    .tm-mosaic__image.item.withImage.uk-box-shadow-small(
        data-uk-scrollspy="cls:uk-animation-fade; delay: 300"
        :id="`image-${image.id}`"
        :data-aspect-ratio="image.ratio"
        :style="`background-image: url('${url}')`")
        .tm-mosaic__image-spinner.uk-text-muted(
            v-show="imageLoaded"
            data-uk-spinner="ratio: 2"
            data-no-mosaic="true")
        span.tm-mosaic__inside(v-show="!imageLoaded")
            nuxt-link.tm-mosaic__overlay-link(
                :to="`/editor/${image.id}`"
                data-no-mosaic="true")
            span.tm-mosaic__inside-top
                span.tm-mosaic__article {{ image.article }}
                //span.tm-mosaic__like(
                    //:class="{ 'uk-active': liked }"
                    //@click="onLike")
                    //span(data-uk-icon="heart")
                //span.tm-mosaic__logo
                    span(data-uk-icon="icon: instagram; ratio: 1.2")
            span.tm-mosaic__inside-bottom
                //span.tm-mosaic__like.uk-active
                    //span(data-uk-icon="heart")
                span.tm-mosaic__like(
                    :class="{ 'uk-active': liked }"
                    @click="onLike")
                    span(data-uk-icon="heart")
                //nuxt-link.tm-mosaic__settings.uk-background-primary.uk-light(:to="`/editor/${image.id}`" data-no-mosaic="true")
                    span(data-uk-icon="settings")
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'GalleryImage',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    imageLoaded: true
  }),
  computed: {
    url () {
      return `${process.env.baseUrl}/image/heighten/400/${this.image.path}`
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
    this.loadImageAsync(this.url)
      .then(() => {
        this.imageLoaded = false
      })
  },
  methods: {
    ...mapActions({
      toggleLikeAction: 'wishList/toggle'
    }),
    onLike () {
      this.toggleLikeAction(this.image.id)
    },
    loadImageAsync (url) {
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
    $base-mosaic-margin: 8px;
    $base-mosaic-button-size: 36px;
    $mosaic-logo-size: 40px;

    &__image {
        position: relative;
        background-color: rgba($global-secondary-background, .2);
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

        &-top, &-bottom {
            width: inherit;
            display: flex;
            align-items: flex-start;
        }

        &-top {
            justify-content: space-between;
        }

        &-bottom {
            justify-content: flex-end;
        }
    }

    &__article {
        font-size: 13px;
        font-weight: normal;
        background: rgba($global-secondary-background, .5);
        color: $global-inverse-color;
        padding: 3px 5px;
        line-height: 1;
        margin: $base-mosaic-margin;
    }

    &__logo, &__like, &__settings {
        display: flex;
        user-select: none;
    }

    &__logo {
        height: $mosaic-logo-size;
        border-radius: 0 0 50px 50px;
        color: $accent-color;
        transform: rotate(45deg);
        transform-origin: top center;
        margin-right: -20px;
        padding: 0 $base-mosaic-margin $base-mosaic-margin;
        background-color: rgba($global-secondary-background, .8);

        .uk-icon {
            transform: rotate(-45deg);
            margin: auto auto 0;
        }
    }

    &__settings {
        width: $base-mosaic-button-size;
        height: $base-mosaic-button-size;
    }

    &__like, &__settings {
        margin: $base-mosaic-margin;
        color: $inverse-global-color;
        cursor: pointer;
        &:hover, &:focus, &:active {
            color: $inverse-global-emphasis-color;
        }

        .uk-icon {
            margin: auto;
        }
    }

    &__like {
        position: relative;
        color: $inverse-global-color;
        //background: rgba($global-secondary-background, .5);
        svg path {
            fill: rgba($global-secondary-background, .3);
        }

        &.uk-active {
            color: $inverse-global-emphasis-color;
            .uk-icon {
                svg path {
                    fill: $inverse-global-emphasis-color;
                }
            }
        }
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
