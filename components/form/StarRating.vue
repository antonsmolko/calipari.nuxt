<template lang="pug">
  .tm-form__input.uk-width-1-1
    label.tm-form__label(v-if="title") {{ title }}
    .tm-star-rating
      .tm-star-rating__mark(:class="`star-${mark}`")
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    mark: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/modules/star-rating';
</style>
