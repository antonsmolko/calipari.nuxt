<template lang="pug">
    li
        section.uk-section.uk-section-small(:class="css")
            .uk-container
                .tm-filter__content(class="uk-width-1-2@m")
                    a.uk-accordion-title(href="#" @click.prevent="onClick")
                        span.tm-filter__heading.uk-h3.uk-margin-remove {{ title }}
                            SlideYDownTransition
                                span.tm-filter__badge.uk-badge(v-if="qty") {{ qty }}
                    .uk-accordion-content
                        template(v-if="!loading")
                            .tm-filter__category
                                slot
                        .tm-filter__spinner(data-uk-spinner v-else)
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SectionFilters',
  props: {
    title: {
      type: String,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    css: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState('filter', {
      loading: state => state.loading
    }),
    qty () {
      return this.$store.getters['filter/selectedFieldQty'](this.field)
    }
  },
  methods: {
    onClick () {
      this.$emit('toggle', this.field)
    }
  }
}
</script>

<style lang="scss">
.tm-filter {
    &__section-muted {
        position: relative;
        &::before {
            content: '';
            position: absolute;
            display: block;
            width: 100vw;
            top: 0;
            bottom: 0;
            right: 0;
            background: $global-muted-background;
        }

        .uk-light & {
            &::before {
                background: rgba($global-background, .08);
            }
        }

        .uk-container {
            position: relative;
        }

        @include media-mob($m) {
            &::before {
                width: calc(50vw + #{$global-medium-margin});
            }
        }
    }

    .uk-section {
        margin-left: auto;

        .uk-container {
            display: flex;
        }
    }

    &__content {
        position: relative;
        margin-left: auto;
    }
    &__spinner {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, 5%);
        opacity: .5;
        line-height: 40px;
        @include media_mob($se) {
            line-height: 41px;
        }
        @include media_mob($l) {
            line-height: 43px;
        }
    }
    &__heading {
        position: relative;
    }
    &__badge {
        position: absolute;
        bottom: 70%;
        left: 100%;
        min-width: 18px;
        height: 18px;
        font-size: 12px;
        font-weight: normal;
        padding: 0 3px;
        line-height: 18px;
    }
}
</style>
