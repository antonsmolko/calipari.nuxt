<template lang="pug">
  page.tm-profile
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        slide-y-down-transition(v-show="pageTitle")
          section.tm-profile__section.uk-section(
            data-uk-height-viewport="offset-top: true; offset-bottom: true")
            .uk-container.uk-container-xsmall.uk-margin-large-bottom
              .tm-profile__header.uk-margin-large-bottom
                .tm-profile__avatar.uk-margin-bottom
                  img(:data-src="$auth.user.gravatar_medium"
                    :alt="$auth.user.name"
                    data-uk-img)
                .tm-section__heading
                  h1.uk-margin-remove {{ $auth.user.name }}
                  .uk-divider-small
              ul.uk-list.tm-profile__list
                li
                  nuxt-link.uk-link-heading(to="/wishlist")
                    span.uk-h4.uk-margin-remove Избранное
                li
                  nuxt-link.uk-link-heading(to="/cart")
                    span.uk-h4.uk-margin-remove Корзина
                li
                  nuxt-link.uk-link-heading(to="/profile/orders")
                    span.uk-h4.uk-margin-remove Заказы
                li
                  nuxt-link.uk-link-heading(to="/profile/personal")
                    span.uk-h4.uk-margin-remove Персональные данные
                li
                  a.uk-link-heading.uk-h4.uk-margin-remove(
                    @click.prevent="logout") Выйти
</template>
<script>
import Page from '@/components/layout/Page.vue'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import noindexPageMeta from '@/components/mixins/noindexPageMeta'

export default {
  middleware: 'auth',
  scrollToTop: true,
  components: { Page },
  mixins: [setLayout, scrollToTop, noindexPageMeta],
  created () {
    this.setFieldsAction({
      pageTitle: 'Профиль',
      topBar: true
    })
  },
  methods: {
    async logout () {
      await this.$router.push('/')
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">
.tm-profile {
  &__section {
    @include media-mob($s) {
      display: flex;
      align-items: center;
    }
  }
  .uk-container {
    width: 100%;
    box-sizing: border-box;
  }
  &__container {
    box-shadow: $global-medium-box-shadow;
    padding: $global-gutter ($global-small-gutter - 4px);
    @include media-mob($s) {
      padding: $global-medium-margin ($global-gutter - 8px);
    }
    @include media-mob($m) {
      padding: $global-medium-margin ($global-medium-gutter - 8px);
    }
    @include media-mob($l) {
      padding: $global-medium-margin $global-large-margin;
    }
    @include media-mob($xxl) {
      padding: 60px 100px;
    }
  }
  &__header {
    @include media-mob($s) {
      display: flex;
      align-items: center;
    }
  }
  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    margin-bottom: $global-small-margin;
    background: #ccc;
    box-shadow: $global-medium-box-shadow;
    background-image: center / contain no-repeat url('/img/avatar.jpg');
    @include media-mob($s) {
      width: 120px;
      height: 120px;
      margin-bottom: 0;
      margin-right: $global-gutter;
    }
    img {
      width: inherit;
      height: auto;
      display: block;
    }
  }
  &__list {
    > li {
      &:nth-child(n+2) {
        margin-top: $global-margin;
      }
      @include media-mob($xl) {
        &:nth-child(n+2) {
          margin-top: $global-gutter;
        }
      }
    }
  }
  hr {
    border-color: $global-border;
  }
}
</style>
