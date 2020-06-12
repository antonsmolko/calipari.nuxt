<template lang="pug">
    span.tm-image__like(
        :class="{ 'uk-active': liked }"
        @click="like")
        span(data-uk-icon="heart")
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
    position: relative;
    color: $inverse-global-color;
    cursor: pointer;
    svg path {
        fill: rgba($global-secondary-background, .3);
    }

    &.uk-active {
        color: $inverse-global-emphasis-color;
        .uk-icon {
            svg path {
                fill: tomato;
            }
        }
    }
}
</style>
