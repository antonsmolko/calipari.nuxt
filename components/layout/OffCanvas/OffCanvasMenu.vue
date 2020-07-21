<template lang="pug">
    .tm-offcanvas-menu(id="off-canvas-menu"
        data-uk-offcanvas="overlay: true"
        ref="menu")
        .uk-offcanvas-bar
            ul.uk-nav.uk-nav-primary.uk-text-left(
                data-uk-scrollspy="cls:uk-animation-slide-left-medium")
                li.uk-nav-header: span.uk-h4 Главное меню
                menu-link(to="/catalog" title="Каталог" @click="onClose")
                menu-link(to="/textures" title="Материалы" @click="onClose")
                menu-link(to="/portfolio" title="Портфолио" @click="onClose")
                menu-link(to="/contacts" title="Контакты" @click="onClose")
                menu-link(to="/search" title="Поиск" @click="onClose")
                menu-link(to="/blog" title="Блог" @click="onClose")
                li.uk-nav-header: span.uk-h4 Информация
                menu-link(to="/" title="Оплата, Доставка" @click="onClose")
                menu-link(to="/" title="Политика конфиденциальности" @click="onClose")
                menu-link(to="/" title="Договор оферты" @click="onClose")
</template>

<script>
import OffCanvasLink from './OffCanvasLink'
export default {
  name: 'OffCanvasMenu',
  components: {
    'menu-link': OffCanvasLink
  },
  data: () => ({
    menuElem: null
  }),
  mounted () {
    this.menuElem = this.$refs.menu
  },
  methods: {
    onClose () {
      this.$uikit.offcanvas(this.menuElem).hide()
    }
  }
}
</script>

<style>
.tm-offcanvas-menu {
    z-index: 3000;
}
</style>
