<template lang="pug">
  .tm-form__input.uk-width-1-1
    label.tm-form__label {{ title }}
    .tm-star-rating-form
      input.tm-star-rating-form__input(type="radio" :id="`${idPrefix}-1`" :name="name" value="1" @input="onInput")
      label.tm-star-rating-form__star(:for="`${idPrefix}-1`" aria-label="Ужасно")
      input.tm-star-rating-form__input(type="radio" :id="`${idPrefix}-2`" :name="name" value="2" @input="onInput")
      label.tm-star-rating-form__star(:for="`${idPrefix}-2`" aria-label="Сносно")
      input.tm-star-rating-form__input(type="radio" :id="`${idPrefix}-3`" :name="name" value="3" @input="onInput")
      label.tm-star-rating-form__star(:for="`${idPrefix}-3`" aria-label="Нормально")
      input.tm-star-rating-form__input(type="radio" :id="`${idPrefix}-4`" :name="name" value="4" @input="onInput")
      label.tm-star-rating-form__star(:for="`${idPrefix}-4`" aria-label="Хорошо")
      input.tm-star-rating-form__input(type="radio" :id="`${idPrefix}-5`" :name="name" value="5" @input="onInput")
      label.tm-star-rating-form__star(:for="`${idPrefix}-5`" aria-label="Отлично")
</template>

<script>
export default {
  name: 'StarRatingForm',
  props: {
    title: {
      type: String,
      default: 'Оценка за качество'
    },
    name: {
      type: String,
      default: 'rate'
    },
    idPrefix: {
      type: String,
      default: 'rate'
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/modules/star-rating';
</style>
