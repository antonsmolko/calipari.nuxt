<template lang="pug">
    section.uk-section(:class="css")
        .uk-container
            .tm-filter__content(class="uk-width-1-2@m")
                template(v-if="title")
                    h2.uk-h2 {{ title }}
                    .uk-divider-small.uk-margin-medium-bottom
                .tm-filter__category
                    slot
</template>

<script>
export default {
  name: 'SectionFilters',
  props: {
    title: {
      type: String,
      default: null
    },
    css: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.tm-filter {
    @include media-mob($m) {
        &::before {
            content: '';
            position: fixed;
            display: block;
            height: 100vh;
            width: calc(50vw - #{$global-medium-margin});
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 0;
            will-change: background;
            background-image: url('/img/bg/bg-megapolice.jpg');
            background-repeat: no-repeat;
            background-position: 40%;
            background-size: cover;
            opacity: 0;
            animation: fade-in 1.5s ease forwards;
        }
    }

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
        margin-left: auto;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: .2;
    }
}
</style>
