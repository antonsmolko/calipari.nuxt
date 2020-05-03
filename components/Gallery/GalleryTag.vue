<template lang="pug">
    .tm-gallery__tag
        span.tm-gallery__tag-active.uk-h5.uk-text-muted.uk-margin-right(v-if="active") {{ title }}
        a.uk-h5.uk-link.uk-link-heading.uk-margin-right(
            v-else
            href="#"
            @click.prevent="onClick") {{ title }}
</template>

<script>
export default {
  name: 'GalleryTag',
  props: {
    item: {
      type: Object,
      default: () => null
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      return this.item ? this.item.title : 'Все'
    }
  },
  methods: {
    onClick () {
      const value = this.item ? this.item.id : null
      this.$emit('click', value)
    }
  }
}
</script>

<style lang="scss">
.tm-gallery__tag {
    line-height: 1.7;
    &-active {
        position: relative;
        &::before {
            content: '';
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            background: $primary-gradient;
        }
        .uk-light & {
            &::before {
                background: $inverse-global-color;
            }
        }
        @include media-mob($m) {
            &::before {
                margin-top: 2px;
            }
        }
    }
}
</style>
