<template lang="pug">
  section.tm-albums.uk-section.uk-section-large.uk-section-default
    .albums.uk-width-1-1(data-uk-scrollspy="start")
      .albums-side.albums-left(class="uk-width-expand@s" ref="albumsLeft")
      .tm-albums__content
        .uk-card.uk-card-primary.uk-card-body.uk-height-1-1.uk-box-shadow-large
          h2.uk-heading-small.uk-margin-remove Более 10 000 изображений
          .uk-divider-small
          p.uk-text-large.uk-margin-large-top Каталог по 30 темам, интерьерам и цветовым гаммам на любой вкус
          a.tm-albums__button.uk-button.uk-button-secondary.uk-margin-top(href="") Каталог
      .albums-side.albums-right(class="uk-width-expand@s" ref="albumsRight")
</template>

<script>
// import '~/plugins/albums/scss/albums.scss'

import Albums from '~/plugins/albums/Albums'
import Album from '~/plugins/albums/Album'
import spriteMatrix from '~/plugins/albums/sprite-matrix'

const albumsLeftSideList = [
  { h: 0, v: 0, s: 2, sprite: '4, 0' },
  { h: 0, v: 2, s: 1, sprite: '6, 14' },
  { h: 0, v: 3, s: 1, sprite: '13, 0' },
  { h: 0, v: 4, s: 2, sprite: '0, 0' },
  { h: 0, v: 6, s: 1, sprite: '5, 14' },
  { h: 1, v: 2, s: 1, sprite: '17, 0' },
  { h: 1, v: 3, s: 1, sprite: '0, 14' },
  { h: 1, v: 6, s: 1, sprite: '2, 14' },
  { h: 2, v: 0, s: 1, sprite: '6, 12' },
  { h: 2, v: 1, s: 2, sprite: '2, 0' },
  { h: 2, v: 3, s: 1, sprite: '14, 11' },
  { h: 2, v: 4, s: 1, sprite: '16, 3' },
  { h: 2, v: 5, s: 2, sprite: '4, 6' },
  { h: 3, v: 0, s: 1, sprite: '16, 4' },
  { h: 3, v: 3, s: 2, sprite: '2, 10' },
  { h: 4, v: 0, s: 2, sprite: '2, 2' },
  { h: 4, v: 2, s: 1, sprite: '16, 1' },
  { h: 4, v: 5, s: 1, sprite: '1, 14' },
  { h: 4, v: 6, s: 1, sprite: '15, 2' },
  { h: 5, v: 2, s: 1, sprite: '16, 13' },
  { h: 5, v: 3, s: 1, sprite: '10, 12' },
  { h: 5, v: 4, s: 1, sprite: '11, 12' },
  { h: 5, v: 5, s: 2, sprite: '0, 8' },
  { h: 6, v: 0, s: 1, sprite: '10, 13' },
  { h: 6, v: 1, s: 1, sprite: '14, 13' },
  { h: 6, v: 2, s: 2, sprite: '0, 10' },
  { h: 6, v: 4, s: 1, sprite: '17, 13' },
  { h: 7, v: 0, s: 1, sprite: '14, 1' },
  { h: 7, v: 1, s: 1, sprite: '12, 12' },
  { h: 7, v: 4, s: 1, sprite: '3, 14' },
  { h: 7, v: 5, s: 1, sprite: '12, 13' },
  { h: 7, v: 6, s: 1, sprite: '17, 1' },
  { h: 8, v: 0, s: 1, sprite: '13, 11' },
  { h: 8, v: 1, s: 1, sprite: '12, 11' },
  { h: 8, v: 2, s: 1, sprite: '4, 14' },
  { h: 8, v: 3, s: 1, sprite: '17, 12' },
  { h: 8, v: 4, s: 1, sprite: '15, 0' },
  { h: 8, v: 5, s: 2, sprite: '4, 8' },
  { h: 9, v: 0, s: 2, sprite: '4, 10' },
  { h: 9, v: 2, s: 1, sprite: '13, 12' },
  { h: 9, v: 3, s: 2, sprite: '0, 12' },
  { h: 10, v: 2, s: 1, sprite: '14, 12' },
  { h: 10, v: 5, s: 1, sprite: '16, 12' },
  { h: 10, v: 6, s: 1, sprite: '15, 12' }
]
const albumsRightSideList = [
  { h: 0, v: 0, s: 1, sprite: '15, 10' },
  { h: 0, v: 1, s: 1, sprite: '7, 13' },
  { h: 0, v: 2, s: 2, sprite: '8, 0' },
  { h: 0, v: 4, s: 1, sprite: '12, 2' },
  { h: 0, v: 5, s: 1, sprite: '13, 2' },
  { h: 0, v: 6, s: 1, sprite: '14, 2' },
  { h: 1, v: 0, s: 2, sprite: '0, 6' },
  { h: 1, v: 4, s: 1, sprite: '12, 0' },
  { h: 1, v: 5, s: 2, sprite: '4, 12' },
  { h: 2, v: 2, s: 1, sprite: '17, 3' },
  { h: 2, v: 3, s: 1, sprite: '12, 3' },
  { h: 2, v: 4, s: 1, sprite: '16, 2' },
  { h: 3, v: 0, s: 1, sprite: '16, 10' },
  { h: 3, v: 1, s: 1, sprite: '13, 3' },
  { h: 3, v: 2, s: 1, sprite: '7, 14' },
  { h: 3, v: 3, s: 2, sprite: '2, 4' },
  { h: 3, v: 5, s: 1, sprite: '14, 10' },
  { h: 3, v: 6, s: 1, sprite: '14, 9' },
  { h: 4, v: 0, s: 1, sprite: '11, 13' },
  { h: 4, v: 1, s: 1, sprite: '16, 0' },
  { h: 4, v: 2, s: 1, sprite: '17, 10' },
  { h: 4, v: 5, s: 1, sprite: '13, 9' },
  { h: 4, v: 6, s: 1, sprite: '12, 10' },
  { h: 5, v: 0, s: 2, sprite: '0, 4' },
  { h: 5, v: 2, s: 1, sprite: '14, 3' },
  { h: 5, v: 3, s: 1, sprite: '12, 1' },
  { h: 5, v: 4, s: 2, sprite: '0, 2' },
  { h: 5, v: 6, s: 1, sprite: '13, 10' },
  { h: 6, v: 2, s: 1, sprite: '17, 4' },
  { h: 6, v: 3, s: 1, sprite: '13, 1' },
  { h: 6, v: 6, s: 1, sprite: '15, 1' },
  { h: 7, v: 0, s: 1, sprite: '15, 3' },
  { h: 7, v: 1, s: 2, sprite: '2, 12' },
  { h: 7, v: 3, s: 1, sprite: '17, 11' },
  { h: 7, v: 4, s: 1, sprite: '17, 3' },
  { h: 7, v: 5, s: 1, sprite: '15, 11' },
  { h: 7, v: 6, s: 1, sprite: '15, 9' },
  { h: 8, v: 0, s: 1, sprite: '17, 9' },
  { h: 8, v: 3, s: 2, sprite: '10, 0' },
  { h: 8, v: 5, s: 1, sprite: '15, 8' },
  { h: 8, v: 6, s: 1, sprite: '16, 9' },
  { h: 9, v: 0, s: 2, sprite: '6, 0' },
  { h: 9, v: 2, s: 1, sprite: '14, 8' },
  { h: 9, v: 5, s: 2, sprite: '4, 2' },
  { h: 10, v: 2, s: 1, sprite: '13, 8' },
  { h: 10, v: 3, s: 1, sprite: '12, 8' },
  { h: 10, v: 4, s: 1, sprite: '12, 9' }
]

export default {
  data: () => ({
    albums: null
  }),
  mounted () {
    const albumLeftElement = this.$refs.albumsLeft
    const albumRightElement = this.$refs.albumsRight

    this.albums = new Albums(
      spriteMatrix,
      [...albumsRightSideList.map((album) => {
        return new Album(album, albumRightElement)
      }),
      ...albumsLeftSideList.map(album => new Album(album, albumLeftElement))]
    )

    this.albums.init()
  },
  beforeDestroy () {
    this.albums.destroy()
    this.albums = null
  }
}
</script>

<style lang="scss">
@import '../../plugins/albums/scss/albums';

.tm-albums {

    .albums {
        position: relative;
        padding-top: $global-large-margin;
        .albums-side {
            width: 50%;
            overflow: hidden;
        }
        @include media-mob($s) {
            padding-top: 0;
        }
    }

    &__content {
        position: absolute;
        padding: 0 $global-small-gutter;
        z-index: 2;
        left: 0;
        top: 0;
        text-align: center;

        .uk-card-primary {
            background: $primary-transparent-gradient;
            background-image: $primary-transparent-gradient;
        }
        @include media-mob($s) {
            width: $width-large-width;
            position: relative;
            left: inherit;
            top: inherit;
            padding: 0;
            margin: 0 -$global-small-margin;
            .uk-card-primary {
                background: $primary-gradient;
            }
            .uk-card-body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        @include media-mob($m) {
            width: $width-xlarge-width;
        }
    }
}
</style>
