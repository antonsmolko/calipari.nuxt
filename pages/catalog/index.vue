<template lang="pug">
    main(:class="{ 'uk-light': darkPeriod }")
        TopBar(:title="topBarTitle")
        CatalogSection(
            title="По Темам"
            containerStyles="uk-container-large"
            gridStyles="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l")
            CatalogTopicItem(v-for="topic in topics" :key="topic.id" :item="topic")
        CatalogSection(
            title="По Цветам"
            sectionStyles="tm-section__muted"
            containerStyles="uk-container-small"
            gridStyles="uk-flex-center uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-6@l")
            CatalogColorItem(v-for="color in colors" :key="color.id" :item="color")
        CatalogSection(
            title="Интерьеры"
            gridStyles="uk-child-width-1-2 uk-child-width-1-3@m")
            CatalogInteriorItem(v-for="interior in interiors" :key="interior.id" :item="interior")
</template>

<script>
import TopBar from '~/components/layout/TopBar.vue'
import CatalogSection from '~/components/Catalog/CatalogSection'
import CatalogTopicItem from '~/components/Catalog/CatalogTopicItem'
import CatalogColorItem from '~/components/Catalog/CatalogColorItem'
import CatalogInteriorItem from '~/components/Catalog/CatalogInteriorItem'
import setLayout from '~/components/mixins/setLayout'

export default {
  name: 'Catalog',
  scrollToTop: true,
  metaInfo () {
    return {
      title: 'Каталог'
    }
  },
  components: {
    TopBar,
    CatalogSection,
    CatalogTopicItem,
    CatalogColorItem,
    CatalogInteriorItem
  },
  mixins: [setLayout],
  async fetch ({ store }) {
    await store.$api.$get('/catalog/categories')
      .then(response => store.commit('categories/SET_ITEMS', response))
  },
  data: () => ({
    topBarTitle: 'Каталог'
  }),
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
    this.setFieldsAction({ pageTitle: 'Каталог' })
  }
}
</script>
