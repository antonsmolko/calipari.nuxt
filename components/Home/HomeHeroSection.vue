<template lang="pug">
  section.uk-section.uk-padding-remove-vertical.uk-overflow-hidden
    .tm-hero.uk-container(:class="{ 'uk-light': darkPeriod }")
      .tm-hero__container(data-uk-grid)
        .tm-hero__strip-block(class="uk-width-1-2@m")
          .tm-hero__strip.uk-background-cover(
            data-src="/img/main/hero/strip-2.jpg"
            data-uk-img
            data-uk-scrollspy="cls:uk-animation-slide-top; delay: 500")
            img.tm-hero__strip-roll(:data-src="rollSrc" data-uk-img)
        .tm-hero__content(data-uk-scrollspy="cls:uk-animation-fade" class="uk-width-1-2@m")
          .tm-hero__heading
            i.tm-hero__logo.uk-icon(data-uk-icon="calipari")
            span.tm-hero__title.uk-h1.uk-margin-remove Студия печати<br>и дизайна
            span.tm-hero__lead.uk-margin-top Изготовление фотообоев<br>на заказ
            .tm-hero__email(class="uk-visible@m")
              a.tm-text-medium.uk-link-muted(href="") info@calipari.ru
          .tm-hero__phone(class="uk-visible@m")
            a.tm-text-medium.uk-link-muted(href="") +7 952 967 4204
      .tm-hero__socials(data-uk-scrollspy="cls:uk-animation-fade" class="uk-visible@m")
        a.uk-link-muted.uk-text-uppercase(href="") Vkontakte
        a.uk-link-muted.uk-text-uppercase(href="") Facebook
        a.uk-link-muted.uk-text-uppercase(href="") Instagram
</template>
<script>
export default {
  computed: {
    rollSrc () {
      return this.darkPeriod
        ? '/img/main/hero/roll.png'
        : '/img/main/hero/roll-light.png'
    }
  }
}
</script>
<style lang="scss">
.tm-hero {
  display: flex;
  flex-direction: column;
  height: calc(100vh - #{$navbar-height + $bottom-bar-height});
  align-items: center;
  position: relative;

  @include media-mob($m) {
    align-items: inherit;
    height: calc(100vh - #{$navbar-height});
  }

  @include media-portrait() {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  @include media-mob-portrait($s) {
    max-width: 370px;
  }

  @include media-mob-range($m, $l) {
    max-width: 650px;
  }

  @include media-mob-range($l, $xl) {
    max-width: 770px;
  }

  @include media-desk-landscape($m) {
    height: inherit;
    padding-bottom: $global-margin;
    padding-top: $global-margin;
  }

  @include media-desk-portrait($xs) {
    height: inherit;
    min-height: calc(100vh - #{$navbar-height * 2});
  }

  @include media-desk-portrait($se) {
    height: inherit;
  }

  &__container {
    @include media-portrait() {
      flex-direction: column;
      flex-grow: 1;
    }
    @include media-mob($m) {
      align-items: center;
    }
    @include media-desk-landscape($m) {
      justify-content: center;
    }
    @include media-desk-portrait($xs) {
      width: 290px;
    }
    @include media-desk-portrait($se) {
      width: 250px;
    }
  }

  &__strip-block {
    z-index: 1;
    @include media-mob-portrait($m) {
      width: 440px;
    }
    @include media-desk-landscape($m) {
      display: none;
    }
  }

  &__strip {
    height: 40vh;
    box-shadow: -3px 0 8px rgba(#000, .2);
    @include media-mob($m) {
      height: 80vh;
    }
    @include media-portrait() {
      height: 33vh;
    }
    @include media-mob-portrait($s) {
      height: 40vh;
    }
    @include media-mob-portrait($m) {
      height: 45vh;
    }
  }

  &__strip-roll {
    position: absolute;
    bottom: 0;
    width: 383px;
    max-width: inherit;
    height: auto;
    left: 50%;
    transform: translate(-50%, 85%);
    @include media-mob-portrait($s) {
      width: 450px;
    }
    @include media-mob-portrait($m) {
      width: 610px;
    }
    @include media-mob-landscape($m) {
      width: 465px;
    }
    @include media-mob-landscape($l) {
      width: 540px;
    }
    @include media-mob-landscape($xl) {
      width: 720px;
    }
    @include media-desk-portrait($xs) {
      width: 385px;
    }
    @include media-desk-portrait($se) {
      width: 335px;
    }
  }

  &__content {
    @include media-portrait() {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 6vh !important;
    }
    @include media-mob-portrait($m) {
      width: 440px;
      margin-top: 9vh !important;
    }
    @include media-mob-landscape($m) {
      margin-top: $global-margin;
    }
    @include media-mob-landscape($l) {
      margin-top: $global-medium-margin;
    }
    @include media-mob-landscape($xl) {
      margin-top: $global-large-margin;
    }
    @include media-desk-landscape($m) {
      width: 390px;
    }
    @include media-desk-landscape($m) {
      width: 290px;
    }
  }

  &__heading {
    position: relative;
    @include media-mob-portrait($s) {
      margin-top: $global-margin;
    }
    @include media-mob-landscape($m) {
      padding-left: $global-margin;
    }
    @include media-mob-landscape($xl) {
      padding-left: $global-medium-margin;
    }
  }

  &__brand-name, &__title, &__lead {
    display: block;
  }

  &__title {
    margin-bottom: $global-small-margin;
    white-space: nowrap;
    line-height: 1.3;
    @include media-mob-portrait($s) {
      font-size: 45.3px;
    }
    @include media-mob-portrait($m) {
      font-size: 63px;
    }
    @include media-mob-landscape($m) {
      font-size: 40px;
    }
    @include media-mob-landscape($l) {
      font-size: 50px;
    }
    @include media-mob-landscape($xl) {
      font-size: 60px;
    }
    @include media-desk-landscape($m) {
      font-size: 55px;
    }
    @include media-desk-landscape($m) {
      font-size: 40px;
    }
    @include media-desk-portrait($xs) {
      font-size: 40px;
    }
    @include media-desk-portrait($se) {
      font-size: 33.5px;
    }
  }

  &__lead {
    line-height: 1.4;
    font-size: 18px;
    @include media-mob-portrait($s) {
      font-size: 22px;
    }
    @include media-mob-portrait($m) {
      font-size: 24.5px;
    }
    @include media-mob-landscape($l) {
      font-size: 20.5px;
    }
    @include media-mob-landscape($xl) {
      font-size: 26.5px;
    }
    @include media-desk-landscape($m) {
      font-size: 18px;
    }
    @include media-desk-portrait($se) {
      font-size: 15px;
    }
  }

  &__socials, &__phone, &__email {
    &::before {
      position: absolute;
      display: block;
      background: $global-muted-color;
    }

    .uk-light & {
      &::before {
        background: $inverse-global-border;
      }
    }
    @include media-portrait() {
      display: none !important;
    }
  }

  &__logo {
    color: $logo-hero-color;
    .uk-light & {
      color: $logo-hero-light-color;
    }
    svg {
      width: 260px;
      @include media-mob($s) {
        width: 295px;
      }
      @include media-mob($m) {
        width: 260px;
      }
      @include media-mob-landscape($s) {
        width: 355px;
      }
      @include media-mob($m) {
        width: 260px;
      }
      @include media-mob-portrait($m) {
        width: 410px;
      }
      @include media-mob($l) {
        width: 325px;
      }
      @include media-mob($xl) {
        width: 390px;
      }
    }
  }

  &__socials {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: $global-small-margin !important;
    @include media-portrait() {
      display: flex;
      justify-content: space-between;
      margin-bottom: $global-margin !important;
      width: 220px;
    }
    @include media-mob-portrait($se) {
      width: 260px;
    }
    @include media-mob-portrait($s) {
      width: 370px;
      font-size: 16px;
      margin-bottom: $global-gutter !important;
    }
    @include media-mob-portrait($m) {
      width: 410px;
    }
    @include media-desk-landscape($m) {
      width: 360px;
    }
    @include media-mob-landscape($xs) {
      font-size: 14px;
    }
    @include media-mob-landscape($m) {
      display: block;
      position: absolute;
      top: calc(50% - #{$global-large-margin});
      right: calc(100% + #{$global-margin});
      transform: translateY(-50%);
      text-align: right;
      & > a {
        display: block;

        &:not(:last-child) {
          margin-bottom: $global-medium-margin;
        }
      }
      &::before {
        content: '';
        position: absolute;
        top: -($global-medium-margin + $global-small-margin);
        right: 0;
        width: 50vw;
        height: 1px;
      }
    }
    @include media-mob-landscape($l) {
      font-size: 16px;
      right: calc(100% + #{$global-large-margin});
      transform: translateY(-50%);
      text-align: right;
      & > a {
        display: block;

        &:not(:last-child) {
          margin-bottom: $global-medium-margin;
        }
      }
      &::before {
        top: -($global-medium-margin + $global-small-margin);
      }
    }
    @include media-mob-landscape($xl) {
      top: calc(50% - #{$global-large-margin} - #{$global-gutter});
      font-size: 1rem;
      right: calc(100% + #{$global-medium-margin});
    }
    @include media-mob-landscape($xxl) {
      top: calc(50% - #{$global-large-margin});
      right: calc(100% + #{$global-large-margin});
      & > a {
        &:not(:last-child) {
          margin-bottom: $global-large-margin;
        }
      }
      &::before {
        top: -$global-large-margin;
      }
    }
    @include media-mob-landscape($qhd) {
      top: calc(50% - #{$global-large-margin});
      right: calc(100% + #{$global-xlarge-margin});
    }
  }

  &__phone {
    position: relative;
    display: block;
    text-align: right;
    margin-top: $global-margin;
    @include media-mob-portrait($s) {
      margin-top: $global-medium-margin;
    }
    @include media-mob-landscape($m) {
      margin-top: $global-medium-margin;
      &::before {
        content: '';
        top: calc(100% + #{$global-small-margin});
        right: 0;
        height: 50vh;
        width: 1px;
      }
    }
    @include media-mob-landscape($xl) {
      margin-top: $global-large-margin;
    }
  }

  &__email {
    display: none;
    position: absolute;
    left: 100%;
    bottom: $global-small-margin;

    &::before {
      content: '';
      bottom: -$global-small-margin;
      left: 0;
      width: 50vw;
      height: 1px;
    }

    @include media-mob-landscape($m) {
      display: block;
    }
  }
}
</style>
