<template lang="pug">
    label.tm-filter__item
        .tm-filter__preview(v-if="type")
            template(v-if="type === 'image'")
                uk-image.uk-box-shadow-medium(
                    :name="filter['image_path']"
                    :width="120"
                    :height="80"
                    :alt="filter.title")
            template(v-else-if="type === 'color'")
                .tm-filter__color.uk-box-shadow-medium(:style="`background-color: ${filter.alias}`")
            template(v-else-if="type === 'icon'")
                .tm-filter__icon.uk-box-shadow-medium
                    span.uk-icon(:data-uk-icon="`icon: ${filter['alias']}; ratio: 1.25`")
        h2.uk-h5.tm-filter__title {{ filter.title }}
        span.tm-filter__image-count ({{ filter.images_count }})
        input.tm-filter__checkbox.uk-checkbox(
            type="checkbox"
            @input="toggleCheck"
            :disabled="disabled"
            :value="value"
            :checked="isSelected"
        )
</template>

<script>
export default {
  name: 'FilterItem',
  props: {
    filter: {
      type: Object,
      required: true
    },
    filterField: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Boolean, Object, Number],
    // eslint-disable-next-line vue/require-default-prop
    model: [String, Boolean, Object, Number, Array]
  },
  data: () => ({
    baseImageUrl: `${process.env.baseImageUrl}/fit/120/80/`
  }),
  computed: {
    isSelected () {
      return this.$store.getters['filter/isSelected'](this.filterField, this.filter.id)
    }
  },
  methods: {
    toggleCheck (e) {
      if (!this.disabled) {
        this.$emit('toggle', +e.target.value)
      }
    }
  }
}
</script>

<style lang="scss">
.tm-filter {

    &__item {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7px 0;
        transition: background .25s ease-in-out;
        &::before, &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            transition: background .25s ease-in-out;
        }
        &::after {
            width: 40px;
        }
        &::before {
            width: 100vw;
            left: 100%;
        }
        &::after {
            right: 100%;
        }
        &:hover {
            background: $global-background;
            &::before, &::after {
                background: $global-background;
            }
        }
        .tm-section__muted & {
            &:hover {
                background: $global-background;
                &::before, &::after {
                    background: $global-background;
                }
            }
        }

        .uk-light & {
            &:hover {
                background: rgba(#000, .08);
                &::before, &::after {
                    background: rgba(#000, .08);
                }
            }
        }
        @include media-mob($s) {
            padding: 10px 0;
        }
    }

    &__preview {
        flex: none;
        width: 60px;
        height: 40px;
        margin-right: $global-small-margin;
        img {
            width: inherit;
            height: inherit;
            object-fit: cover;
            display: block;
        }
        @include media-mob($s) {
            width: 90px;
            height: 60px;
            margin-right: $global-margin;
        }
    }

    &__color {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: $global-small-margin;
        border: 1px solid $global-inverse-color;
        box-sizing: border-box;
        @include media-mob($s) {
            width: 60px;
            height: 60px;
            margin-left: $global-small-gutter;
        }
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: $global-small-margin;
        background: rgba(#000, .08);
        box-sizing: border-box;

        .uk-light & {
            background: rgba(#fff, .08);
        }

        @include media-mob($s) {
            width: 60px;
            height: 60px;
            margin-left: $global-small-gutter;
        }
    }

    &__title {
        line-height: 1.2;
        margin: 0 $global-small-margin 0 0;
        @include media-mob($s) {
            margin: 0 $global-margin 0 0;
        }
    }

    &__image-count {
        margin-left: auto;
        margin-right: $global-small-margin;
        line-height: 1;
        font-size: $global-small-font-size;
        color: $global-muted-color;
    }

    &__checkbox {
        flex: none;
        margin-top: 2px;
    }
}
</style>
