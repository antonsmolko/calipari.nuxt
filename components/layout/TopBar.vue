<template lang="pug">
    .tm-topbar(data-uk-sticky)
        .uk-navbar-container
            .uk-container
                div(data-uk-navbar)
                    .uk-navbar-left
                        .uk-navbar-item.uk-flex.uk-flex-column.uk-flex-top
                            span.tm-topbar__lead(v-if="lead") {{ lead }}
                            h1.uk-h4.tm-topbar__heading.uk-margin-remove.uk-text-truncate {{ title }}
                    .uk-navbar-right
                        slot
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    lead: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.tm-topbar {
    z-index: 10;
    &__heading {
        max-width: calc(100vw - #{$global-gutter} - 44px);
        color: $global-emphasis-color !important;
        @include media_mob($se) {
            max-width: $width-medium-width;
        }
        @include media_mob($s) {
            max-width: $width-large-width;
        }
        @include media_mob($m) {
            max-width: $width-xlarge-width;
        }
        @include media_mob($l) {
            max-width: $width-xxlarge-width;
        }
    }

    &__lead {
        display: block;
        font-size: 10px;
    }

    &__control {
        position: relative;
        color: $global-emphasis-color !important;
        cursor: pointer;

        .uk-badge {
            position: absolute;
            bottom: 70%;
            left: 70%;
            min-width: 13px;
            height: 13px;
            font-size: 10px;
            font-weight: 600;
            line-height: 1.3;
            padding: 0 3px;
            margin-left: 2px;
            z-index: 1;
            background: $global-primary-background;
            color: $inverse-global-emphasis-color;
        }
    }
}
</style>
