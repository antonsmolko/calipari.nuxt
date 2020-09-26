<template lang="pug">
  page(v-if="!$fetchState.pending && page")
    template(#main)
      main(:class="{ 'uk-light': darkPeriod }")
        top-bar(:title="pageTitle")
        catalog-section(
          title="По Темам"
          containerStyles="uk-container-large"
          gridStyles="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l")
          catalog-image-item(v-for="topic in topics" :key="topic.id" :item="topic")
        catalog-section(
          title="По Цветам"
          sectionStyles="tm-section__muted"
          containerStyles="uk-container-small"
          gridStyles="uk-flex-center uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-6@l")
          catalog-color-item(v-for="color in colors" :key="color.id" :item="color")
        catalog-section(
          title="Интерьеры"
          gridStyles="uk-child-width-1-2 uk-child-width-1-3@m")
          catalog-image-item(
            v-for="interior in interiors"
            :key="interior.id"
            :item="interior"
            :width="400"
            :height="400")
</template>

<script>
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import CatalogSection from '@/components/Catalog/CatalogSection'
import CatalogImageItem from '@/components/Catalog/CatalogImageItem'
import CatalogColorItem from '@/components/Catalog/CatalogColorItem'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import page from '@/components/mixins/page'

export default {
  name: 'Catalog',
  components: {
    Page,
    TopBar,
    CatalogSection,
    CatalogImageItem,
    CatalogColorItem
  },
  mixins: [setLayout, scrollToTop, page],
  async fetch () {
    await this.getPageAction('catalog')
    this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  computed: {
    topics () {
      return this.$store.getters['categories/getItemsByType']('topics')
    },
    colors () {
      return this.$store.getters['categories/getItemsByType']('colors')
    },
    interiors () {
      return this.$store.getters['categories/getItemsByType']('interiors')
    }
  }
}
</script>
