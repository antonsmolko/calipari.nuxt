<template lang="pug">
    .tm-navbar.uk-box-shadow-medium
        .tm-navbar__background
        .uk-navbar-container.uk-light.uk-navbar-transparent
            .uk-container
                nav(data-uk-navbar)
                    .uk-navbar-left
                        .uk-navbar-item
                            nuxt-link.tm-logo.uk-logo.uk-icon(to="/" data-uk-icon="calipari")
                    .uk-navbar-center(class="uk-visible@m")
                        ul.uk-navbar-nav
                            li: nuxt-link(to="/catalog")  Каталог
                            li: nuxt-link(to="/textures") Материалы
                            li: a(href="#") Информация
                            li: a(href="#") Портфолио
                            li: a(href="#") Контакты
                    .uk-navbar-right
                        ul.uk-navbar-nav.tm-navbar-icon(class="uk-visible@m")
                            li.uk-navbar-item
                                nuxt-link(to="/search" data-uk-icon="search")
                            li.uk-navbar-item
                                nuxt-link(to="/wishlist" data-uk-icon="heart")
                                    span.uk-badge(v-if="likeQty") {{ likeQty }}
                            li.uk-navbar-item
                                nuxt-link(to="/cart" data-uk-icon="bag")
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
                                    nuxt-link(to="/login" data-uk-icon="user")
                        a.uk-navbar-toggle(href="#menu" data-uk-toggle data-uk-icon="menu" class="uk-hidden@m")
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

<style lang="scss">
.tm-navbar {
    z-index: 10;
    &__gravatar {
        width: 36px;
        height: 36px;
        border-radius: 500px;
        overflow: hidden;
    }
}
</style>
