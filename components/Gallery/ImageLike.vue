<template lang="pug">
  span.tm-image__like(
    :class="{ 'uk-active': liked }"
    @click="like")
    span.tm-image__like-inner
      span(data-uk-icon="icon: heart; ratio: 0.9")
</template>

<script>
export default {
  name: 'ImageLike',
  props: {
    liked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    like () {
      this.$emit('like')
    }
  }
}
</script>

<style lang="scss">
.tm-image__like {
  display: block;
  cursor: pointer;
  padding: $global-small-margin $base-mosaic-badge-margin $base-mosaic-badge-margin $global-small-margin;
  text-align: center;
  line-height: 22px;
  &-inner {
    display: block;
    width: 22px;
    height: 22px;
    svg path {
      stroke: transparent !important;
      fill: lightgray;
      transition: fill .25s ease;
    }
  }
  &:hover {
    .uk-icon {
      svg path {
        fill: whitesmoke;
      }
    }
  }

  &.uk-active {
    .uk-icon {
      svg path {
        fill: orangered;
      }
    }
  }
}
</style>
