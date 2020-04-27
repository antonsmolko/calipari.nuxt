<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        SlideYDownTransition(v-show="pageTitle")
            section.tm-profile__section.uk-section(data-uk-height-viewport="offset-top: true; offset-bottom: true")
                .uk-container.uk-container-xsmall.uk-margin-large-bottom
                    .tm-profile__header.uk-margin-large-bottom
                        .tm-profile__avatar.uk-margin-bottom
                            img(:data-src="$auth.user.gravatar_medium" :alt="$auth.user.name" data-uk-img)
                        .tm-section__heading
                            h1.uk-margin-remove {{ $auth.user.name }}
                            .uk-divider-small
                    ul.uk-list.tm-profile__list
                        li: nuxt-link.uk-link-heading(to="/wishlist"): span.uk-h4.uk-margin-remove Избранное
                        li: nuxt-link.uk-link-heading(to="/cart"): span.uk-h4.uk-margin-remove Корзина
                        li: nuxt-link.uk-link-heading(to="/profile/orders"): span.uk-h4.uk-margin-remove Заказы
                        li: nuxt-link.uk-link-heading(to="/profile/personal"): span.uk-h4.uk-margin-remove Персональные данные
                        li: a.uk-link-heading.uk-h4.uk-margin-remove(@click.prevent="logout") Выйти
</template>
<script>
import setLayout from '~/components/mixins/setLayout'
export default {
  middleware: 'auth',
  scrollToTop: true,
  mixins: [setLayout],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  data () {
    return {
      image: false,
      visibility: true
    }
  },
  created () {
    this.setFieldsAction({
      pageTitle: 'Профиль',
      topBar: true
    })
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
