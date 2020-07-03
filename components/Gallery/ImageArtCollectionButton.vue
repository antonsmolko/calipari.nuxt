<template lang="pug">
    nuxt-link.tm-mosaic__art-collection(
        :to="url"
        data-no-mosaic="true")
        span(data-uk-icon="thumbrects")
</template>

<script>
export default {
  name: 'ImageArtCollectionButton',
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
        svg {
            rect {
                &.r1 {
                    animation: rect-spinner-1 2s infinite linear forwards;
                }
                &.r2 {
                    animation: rect-spinner-2 2s infinite linear forwards;
                }
                &.r3 {
                    animation: rect-spinner-3 2s infinite linear forwards;
                }
                &.r4 {
                    animation: rect-spinner-4 2s infinite linear forwards;
                }
            }
        }
    }
}
@keyframes rect-spinner-1 {
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
@keyframes rect-spinner-2 {
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
@keyframes rect-spinner-3 {
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
@keyframes rect-spinner-4 {
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
