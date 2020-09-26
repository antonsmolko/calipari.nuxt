<template lang="pug">
  page(v-if="!$fetchState.pending && page")
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        gallery-layout(
          v-if="items.length"
          mode="imageKeys"
          title="Избранное"
          :isWishList="true"
          :keyValue="items")
          template(#hero)
            gallery-hero(
              :title="title"
              :backgroundPath="backgroundPath"
              :grayscaleMod="true")
        template(v-else)
          top-bar(title="Избранное")
            .uk-navbar-item
              button.uk-close.tm-topbar__control(type="button", data-uk-close, @click="onClose")
          .uk-section.uk-section-xlarge
            .uk-container
              .uk-text-center
                span.uk-heading-small Список пуст
                p.tm-text-medium Воспользуйтесь каталогом, чтобы добавить изображения
                nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/catalog") В каталог
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import GalleryLayout from '@/components/Gallery/GalleryLayout'
import GalleryHero from '@/components/Gallery/GalleryHero'
import TopBar from '@/components/layout/TopBar'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import pageMeta from '@/components/mixins/pageMeta'

export default {
  name: 'WishList',
  scrollToTop: true,
  components: {
    Page,
    TopBar,
    GalleryLayout,
    GalleryHero
  },
  mixins: [setLayout, scrollToTop, pageMeta],
  async fetch () {
    if (this.items.length) {
      await this.getTagsAction(this.items)
    }
    this.setFieldAction({ field: 'pageTitle', value: 'Избранное' })
  },
  computed: {
    ...mapState('wishList', {
      items: state => state.items
    })
  },
  methods: {
    ...mapActions({
      getTagsAction: 'tags/getItemsByImageKeys',
      clearFiltersAction: 'filter/clearFilters',
      setCategoriesFieldAction: 'categories/setField',
      setImagesFieldAction: 'images/setField'
    }),
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name !== 'editor-id') {
      this.clearFiltersAction()
      this.setCategoriesFieldAction({
        field: 'tags',
        value: []
      })
      this.setImagesFieldAction({
        field: 'items',
        value: []
      })
    }
    next()
  }
}
</script>
