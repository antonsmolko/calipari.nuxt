<template lang="pug">
  nuxt-link.tm-mosaic__color-collection(
    :to="url"
    data-no-mosaic="true")
    span.tm-mosaic__color-collection-inner
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
    cursor: pointer;
    padding: $base-mosaic-badge-margin $base-mosaic-badge-margin $global-small-margin $global-small-margin;
    &-inner {
      display: block;
      background: rgba($global-secondary-background, .5);
      line-height: 1;
      padding: 1px;
      border-radius: 2px;

      .uk-icon {
        margin: auto;
      }

      svg {
        circle {
          &.c1 {
            animation: color-mosaic 2s infinite linear forwards;
          }

          &.c2 {
            animation: color-mosaic 2s .5s infinite linear forwards;
          }

          &.c3 {
            animation: color-mosaic 2s 1s infinite linear forwards;
          }

          &.c4 {
            animation: color-mosaic 2s 1.5s infinite linear forwards;
          }
        }
      }
    }
  }
}

@keyframes color-mosaic {
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
</style>
