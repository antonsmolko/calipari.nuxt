<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        TopBar(:title="pageTitle")
        CatalogSection(
            title="По Темам"
            containerStyles="uk-container-large"
            gridStyles="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l")
            CatalogImageItem(v-for="topic in topics" :key="topic.id" :item="topic")
        CatalogSection(
            title="По Цветам"
            sectionStyles="tm-section__muted"
            containerStyles="uk-container-small"
            gridStyles="uk-flex-center uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-6@l")
            CatalogColorItem(v-for="color in colors" :key="color.id" :item="color")
        CatalogSection(
            title="Интерьеры"
            gridStyles="uk-child-width-1-2 uk-child-width-1-3@m")
            CatalogImageItem(
                v-for="interior in interiors"
                :key="interior.id"
                :item="interior"
                :width="500"
                :height="500")
</template>

<script>
import TopBar from '~/components/layout/TopBar.vue'
import CatalogSection from '~/components/Catalog/CatalogSection'
import CatalogImageItem from '~/components/Catalog/CatalogImageItem'
import CatalogColorItem from '~/components/Catalog/CatalogColorItem'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  name: 'Catalog',
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  components: {
    TopBar,
    CatalogSection,
    CatalogImageItem,
    CatalogColorItem
  },
  mixins: [setLayout, scrollToTop],
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
  },
  created () {
    this.setFieldAction({ field: 'pageTitle', value: 'Каталог' })
  }
}
</script>
