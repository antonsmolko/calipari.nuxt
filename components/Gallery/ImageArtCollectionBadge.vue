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
                &.r1 {
                    animation: art-mosaic-1 2s infinite linear forwards;
                }
                &.r2 {
                    animation: art-mosaic-2 2s infinite linear forwards;
                }
                &.r3 {
                    animation: art-mosaic-3 2s infinite linear forwards;
                }
                &.r4 {
                    animation: art-mosaic-4 2s infinite linear forwards;
                }
            }
        }
    }
}
@keyframes art-mosaic-1 {
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
@keyframes art-mosaic-2 {
    from, to {
        fill: darkgrey;
    }
    25% {
        fill: darkgrey;
    }
    50% {
        fill: darkgrey;
    }
    75% {
        fill: seashell;
    }
}
@keyframes art-mosaic-3 {
    from, to {
        fill: darkgrey;
    }
    25% {
        fill: seashell;
    }
    50% {
        fill: darkgrey;
    }
    75% {
        fill: darkgrey;
    }
}
@keyframes art-mosaic-4 {
    from, to {
        fill: darkgrey;
    }
    25% {
        fill: darkgrey;
    }
    50% {
        fill: seashell;
    }
    75% {
        fill: darkgrey;
    }
}
</style>
