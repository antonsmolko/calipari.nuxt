<template lang="pug">
    nuxt-link.tm-mosaic__color-collection(
        :to="url"
        data-no-mosaic="true")
        span(data-uk-icon="thumbcircles")
</template>

<script>
export default {
  name: 'ImageColorCollectionBadge',
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
    &__color-collection {
        display: block;
        background: rgba($global-secondary-background, .5);
        line-height: 1;
        padding: 1px;
        margin: $base-mosaic-badge-margin;
        cursor: pointer;

        .uk-icon {
            margin: auto;
        }
        svg {
            circle {
                &.c1 {
                    animation: color-spinner-1 2s infinite linear forwards;
                }
                &.c2 {
                    animation: color-spinner-2 2s infinite linear forwards;
                }
                &.c3 {
                    animation: color-spinner-3 2s infinite linear forwards;
                }
                &.c4 {
                    animation: color-spinner-4 2s infinite linear forwards;
                }
            }
        }
    }
}
@keyframes color-spinner-1 {
    from, to {
        fill: deeppink;
    }
    25% {
        fill: deepskyblue;
    }
    50% {
        fill: mediumspringgreen;
    }
    75% {
        fill: yellow;
    }
}
@keyframes color-spinner-2 {
    from, to {
        fill: yellow;
    }
    25% {
        fill: deeppink;
    }
    50% {
        fill: deepskyblue;
    }
    75% {
        fill: mediumspringgreen;
    }
}
@keyframes color-spinner-3 {
    from, to {
        fill: mediumspringgreen;
    }
    25% {
        fill: yellow;
    }
    50% {
        fill: deeppink;
    }
    75% {
        fill: deepskyblue;
    }
}
@keyframes color-spinner-4 {
    from, to {
        fill: deepskyblue;
    }
    25% {
        fill: mediumspringgreen;
    }
    50% {
        fill: yellow;
    }
    75% {
        fill: deeppink;
    }
}
</style>
