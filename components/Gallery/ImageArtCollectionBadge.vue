<template lang="pug">
    nuxt-link.tm-mosaic__art-collection(
        :to="url"
        data-no-mosaic="true")
        span(data-uk-icon="thumbrects")
</template>

<script>
export default {
  name: 'ImageArtCollectionBadge',
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.tm-mosaic {
    &__art-collection {
        display: block;
        background: rgba($global-secondary-background, .5);
        line-height: 1;
        padding: 1px;
        margin: $base-mosaic-badge-margin;
        cursor: pointer;
        svg {
            rect {
                fill: darkgrey;
                &.r1 {
                    animation: art-mosaic 2s infinite linear forwards;
                }
                &.r2 {
                    animation: art-mosaic 2s 1s infinite linear forwards;
                }
                &.r3 {
                    animation: art-mosaic 2s .5s infinite linear forwards;
                }
                &.r4 {
                    animation: art-mosaic 2s 1.5s infinite linear forwards;
                }
            }
        }
    }
}
@keyframes art-mosaic {
    from, to {
        fill: seashell;
    }
    25% {
        fill: darkgrey;
    }
    50% {
        fill: darkgrey;
    }
    75% {
        fill: darkgrey;
    }
}
</style>
