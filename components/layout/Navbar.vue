<template lang="pug">
    .tm-navbar.uk-box-shadow-medium(data-uk-sticky)
        .tm-navbar__background
        .uk-navbar-container.uk-light.uk-navbar-transparent
            slot(name="content")
                .uk-container
                    nav(data-uk-navbar)
                        .uk-navbar-left
                            .uk-navbar-item
                                nuxt-link.tm-logo.uk-logo.uk-icon(to="/" data-uk-icon="calipari")
                        .uk-navbar-center(class="uk-visible@l")
                            ul.uk-navbar-nav
                                li: nuxt-link(to="/catalog")  Каталог
                                li: nuxt-link(to="/textures") Материалы
                                li: nuxt-link(to="/sales") Распродажа
                                li: nuxt-link(to="/blog") Блог
                                li: nuxt-link(to="/portfolio") Портфолио
                                li: nuxt-link(to="/reviews") Отзывы
                                li: nuxt-link(to="/contacts") Контакты
                        .uk-navbar-right
                            ul.uk-navbar-nav.tm-navbar-icon(class="uk-visible@m")
                                li.uk-navbar-item
                                    nuxt-link(to="/search" data-uk-icon="icon: search; ratio: 1.1")
                                li.uk-navbar-item
                                    nuxt-link(to="/wishlist" data-uk-icon="icon: heart; ratio: 1.1")
                                        span.uk-badge(v-if="likeQty") {{ likeQty }}
                                li.uk-navbar-item
                                    nuxt-link(to="/cart" data-uk-icon="icon: bag; ratio: 1.1")
                                        span.uk-badge(v-if="cartQty") {{ cartQty }}
                                template(v-if="$auth.loggedIn")
                                    li.uk-navbar-item
                                        nuxt-link(to="/profile")
                                            .tm-navbar__gravatar
                                                img(:data-src="$auth.user.gravatar_small"
                                                    :alt="$auth.user.name"
                                                    data-uk-img)
                                template(v-else)
                                    li.uk-navbar-item
                                        nuxt-link(to="/login" data-uk-icon="icon: user; ratio: 1.1")
                            button.uk-navbar-toggle(
                                data-uk-toggle="target: #off-canvas-menu"
                                data-uk-icon="icon: ll-menu; ratio: 1.1"
                                class="uk-hidden@l")
</template>

<script>
export default {
  computed: {
    cartQty () {
      return this.$store.getters['cart/qty']
    },
    likeQty () {
      return this.$store.getters['wishList/qty']
    }
  }
}
</script>

<style lang="scss" scoped>
.tm-navbar {
  z-index: 10;
  height: 36px;
  .uk-navbar {
    max-height: 36px;
  }
  .uk-navbar-nav > li > a,
  .uk-navbar-nav > li > span,
  .uk-navbar-item,
  .uk-navbar-toggle {
    min-height: 36px;
  }
  .tm-logo {
    width: 72px;
    height: 24px;
    margin-top: 4px;
  }
  &__gravatar {
      width: 24px;
      height: 24px;
      border-radius: 500px;
      overflow: hidden;
  }
  @include media-desk ($m){
    height: 36px;
    .uk-navbar {
      max-height: 36px;
    }
    .uk-navbar-item, .uk-navbar-toggle {
      min-height: 36px;
    }
    .tm-logo {
      width: 60px;
      height: 20px;
      margin-top: 3px;
    }
  }
}
</style>
