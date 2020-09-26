<template lang="pug">
  client-only
    .tm-navbar.tm-bottombar.uk-position-bottom.uk-position-fixed.uk-background-secondary.uk-light(
      class="uk-hidden@l")
      ul.tm-iconnav.uk-navbar-nav.uk-flex.uk-flex-middle.uk-flex-between
        li(class="uk-visible@s"): nuxt-link(to="/" data-uk-icon="icon: home; ratio: 1.2")
          span.tm-bottombar__item-title Главная
        li: nuxt-link(to="/catalog" data-uk-icon="icon: album; ratio: 1.2")
          span.tm-bottombar__item-title Каталог
        li: nuxt-link(to="/search" data-uk-icon="icon: search; ratio: 1.2")
          span.tm-bottombar__item-title Поиск
        li: nuxt-link(to="/cart" data-uk-icon="icon: bag; ratio: 1.2")
          span.uk-badge(v-if="cartQty") {{ cartQty }}
          span.tm-bottombar__item-title Корзина
        li: nuxt-link(to="/wishlist" data-uk-icon="icon: heart; ratio: 1.2")
          span.uk-badge(v-if="likeQty") {{ likeQty }}
          span.tm-bottombar__item-title Wishlist
        template(v-if="$auth.loggedIn")
          li: nuxt-link.tm-logged-in(to="/profile")
            span.tm-bottombar__item-title Профиль
            .tm-navbar__gravatar
              img(:data-src="$auth.user.gravatar_small" :alt="$auth.user.name" data-uk-img)
        template(v-else)
          li: nuxt-link(to="/login" data-uk-icon="icon: user; ratio: 1.2")
            span.tm-bottombar__item-title Войти
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
.uk-navbar-nav {
  &.tm-iconnav {
    .tm-bottombar & {
      > li {
        min-width: inherit;
        flex-grow: 1;

        > a, > span {
          .tm-bottombar__item-title {
            padding-top: 5px;
            line-height: 1;
          }

          min-height: $bottom-bar-height !important;
          font-size: 9px;
          padding: 0 $global-small-margin;
          color: $global-inverse-color;

          .uk-badge {
            min-width: 14px;
            height: 14px;
            top: 9px;
            left: 55%;
            font-size: 10px;
            font-weight: 600;
            color: $global-color;
            padding: 0 3px;
            background-color: $global-inverse-color;
          }

          @include media-mob($s) {
            font-size: 10px;
            .uk-badge {
              left: 53%;
            }
          }
          @include media-mob($s) {
            font-size: 12px;
            .tm-bottombar__item-title {
              padding-top: 3px;
            }
          }
          @include media-mob($m) {
            .uk-badge {
              left: 52%;
            }
          }
        }

        &:first-child {
          border-left: none;
        }

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  &:hover {
    &::before {
      display: none;
    }
  }
}

.tm-bottombar {
  border-bottom: none;
  z-index: 1010;

  .uk-navbar, .uk-navbar-item {
    min-height: $bottom-bar-height;
  }
}

.tm-logged-in {
  justify-content: flex-end;

  .tm-navbar__gravatar {
    width: 24px;
    height: 24px;
    border-radius: 500px;
    overflow: hidden;
  }

  .tm-bottombar__item-title {
    padding-top: 3px;
  }
}

</style>
