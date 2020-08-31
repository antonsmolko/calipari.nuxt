<template lang="pug">
  .tm-form__input.uk-width-1-1
    label.tm-form__label {{ title }}
    .tm-rating
      input.tm-rating__input(type="radio" :id="`${idPrefix}-1`" :name="name" value="1" @input="onInput")
      label.tm-rating__star(:for="`${idPrefix}-1`" aria-label="Ужасно")
      input.tm-rating__input(type="radio" :id="`${idPrefix}-2`" :name="name" value="2" @input="onInput")
      label.tm-rating__star(:for="`${idPrefix}-2`" aria-label="Сносно")
      input.tm-rating__input(type="radio" :id="`${idPrefix}-3`" :name="name" value="3" @input="onInput")
      label.tm-rating__star(:for="`${idPrefix}-3`" aria-label="Нормально")
      input.tm-rating__input(type="radio" :id="`${idPrefix}-4`" :name="name" value="4" @input="onInput")
      label.tm-rating__star(:for="`${idPrefix}-4`" aria-label="Хорошо")
      input.tm-rating__input(type="radio" :id="`${idPrefix}-5`" :name="name" value="5" @input="onInput")
      label.tm-rating__star(:for="`${idPrefix}-5`" aria-label="Отлично")
</template>

<script>
export default {
  name: 'StarRating',
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
$rating-count: 5;
$rating-base-size: 20;
$rating-size: #{$rating-base-size}px;
$rating-color: dimgray;
$rating-inverse-color: ghostwhite;
$rating-base-gutter: 15;
$rating-gutter: #{$rating-base-gutter}px;
$rating-item-width: $rating-base-size + $rating-base-gutter;

.tm-rating {
  position: relative;
  display: flex;
  width: calc((#{$rating-size} * #{$rating-count}) + (#{$rating-gutter} * (#{$rating-count} - 1)));
  height: $rating-size;
  background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='none' stroke='#{$rating-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  background-size: ($rating-size + $rating-gutter) $rating-size;
  background-repeat: repeat-x;
  .uk-light & {
    background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='none' stroke='#{$rating-inverse-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);

    &:focus {
      outline: none;
    }
  }

  &__star {
    position: absolute;
    top: 0;
    left: 0;
    width: $rating-size + $rating-gutter;
    height: $rating-size;
    margin: 0;
    appearance: none;
    font-size: inherit;
  }
}

.tm-rating__input:checked + .tm-rating__star, .tm-rating__star:hover {
  background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='#{$rating-color}' stroke='#{$rating-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  background-size: ($rating-size + $rating-gutter) $rating-size;
  background-repeat: repeat-x;
  cursor: pointer;
  .uk-light & {
    background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='#{$rating-inverse-color}' stroke='#{$rating-inverse-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  }
}

.tm-rating__star:hover ~ .tm-rating__star {
  background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='none' stroke='#{$rating-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  background-size: ($rating-size + $rating-gutter) $rating-size;
  background-repeat: repeat-x;
  .uk-light & {
    background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='none' stroke='#{$rating-inverse-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  }
}

.tm-review__rating {
  position: relative;
  width: #{$rating-base-size * $rating-count}px;
  height: $rating-size;
  background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='none' stroke='#{$rating-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  background-size: ($rating-size + $rating-gutter) $rating-size;
  background-repeat: repeat-x;
  .uk-light & {
    background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='none' stroke='#{$rating-inverse-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
  }

  &-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: $rating-size;
    margin: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='#{$rating-color}' stroke='#{$rating-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
    background-size: ($rating-size + $rating-gutter) $rating-size;
    background-repeat: repeat-x;
    .uk-light & {
      background-image: url("data:image/svg+xml,%3Csvg width='#{$rating-item-width}' height='20' viewBox='0 0 #{$rating-item-width} 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='#{$rating-inverse-color}' stroke='#{$rating-inverse-color}' stroke-width='1.01' points='10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27' /%3E%3C/svg%3E%0A");
    }
  }
}

/* Options */
@for $i from 1 through $rating-count {
  .tm-rating__star:nth-of-type(#{$i}) {
    width: #{$rating-base-size * $i + $rating-base-gutter * ($i - 1)}px;
    z-index: $rating-count - $i + 1;

    .star-#{$i} {
      width: 100% / $rating-count * $i;
    }
  }
}
</style>
