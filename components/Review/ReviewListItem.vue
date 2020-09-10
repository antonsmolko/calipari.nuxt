<template lang="pug">
  .tm-review-item.tm-background__smoke.uk-card.uk-card-small.uk-card-body.uk-box-shadow-medium
    .tm-review-item__header.uk-flex.uk-flex-middle
      .tm-review-item__gravatar.uk-box-shadow-medium.uk-text-center
        img(v-if="item.gravatar" :data-src="item.gravatar" :alt="item.customer_name" data-uk-img)
        i.uk-icon.tm-review-item__icon(v-else data-uk-icon="icon:user; ratio:1.5")
      .tm-review-item__heading
        span.uk-text-muted.uk-display-block {{ item.date }}
        span.uk-h3.tm-review-item__name {{ item.customer_name }}
    .tm-review-item__content.uk-margin-top
      span.tm-review-item__comment {{ item.comment }}
    hr
    .tm-review-item__rating.uk-grid.uk-grid-small.uk-grid-column-collapse.uk-margin-top(
      data-uk-grid class="uk-child-width-1-2@s uk-child-width-1-3@m")
      div
        star-rating(
          title="Оценка за качество"
          :mark="item.quality_rate")
      div
        star-rating(
          title="Оценка за сервис"
          :mark="item.service_rate")
    .tm-review-item__images.uk-margin-medium-top.uk-position-relative.uk-visible-toggle(
      v-if="item.images"
      data-uk-slider="finite: true"
      tabindex="-1")
      ul.uk-slider-items.uk-grid.uk-grid-small(data-uk-lightbox="animation: slide")
        li.tm-review-item__image(v-for="(image, index) in item.images" :key="index")
          a.uk-inline.uk-transition-toggle(
            :href="getImageUrl(image)"
            data-type="image"
            tabindex="1")
            img.uk-box-shadow-small.tm-border-radius__base(
              :data-src="getThumbUrl(image)"
              alt=""
              data-uk-img)
</template>

<script>
import StarRating from '@/components/form/StarRating'
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'ReviewListItem',
  components: { StarRating },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImageUrl (name) {
      return getS3ImageUrl({ name })
    },
    getThumbUrl (name) {
      return getS3ImageUrl({ name, height: 200 })
    }
  }
}
</script>

<style lang="scss">
.tm-review-item {
  &:not(:last-child) {
    margin-bottom: $global-margin;
  }
  @include media-mob($m) {
    &:not(:last-child) {
      margin-bottom: $global-gutter;
    }
  }
  @include media-mob($l) {
    &:not(:last-child) {
      margin-bottom: $global-medium-margin;
    }
  }
  &__gravatar {
    width: 50px;
    height: 50px;
    flex: none;
    border-radius: 500px;
    overflow: hidden;
    @include media-mob($s) {
      width: 70px;
      height: 70px;
    }
  }
  &__icon {
    line-height: 50px;
    @include media-mob($s) {
      line-height: 70px;
    }
  }
  &__heading {
    margin-left: $global-small-gutter;
    @include media-mob($s) {
      margin-left: $global-margin;
    }
  }
  &__name {
    @include media-desk($xs) {
      font-size: 1.2rem;
    }
  }
  &__images {
    margin-right: -$global-small-gutter - 5px;
    margin-left: -$global-small-gutter - 5px;

    li {
      height: 120px;

      > a {
        height: inherit;

        img {
          max-height: 100%;
          height: 100%;
          width: auto;
        }
      }
      &:first-child {
        padding-left: $global-gutter;
      }

      &:last-child {
        padding-right: $global-small-gutter + 5px;
      }
    }

    @include media-mob($s) {
      margin-right: -$global-margin;
      li {
        &:first-child {
          padding-left: $global-gutter + 5px;
        }

        &:last-child {
          padding-right: $global-margin;
        }
      }
    }
  }
}
</style>
