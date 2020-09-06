<template lang="pug">
  Page(v-if="!$fetchState.pending && page.title")
    template(#main)
      main(v-show="page")
        TopBar(:title="pageTitle")
        section.tm-section__hero.uk-section.uk-position-relative(:class="{ 'uk-light': darkPeriod }")
          .uk-container.uk-position-relative.uk-position-z-index(
            data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
            .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge
              h1.uk-heading-medium {{ pageTitle }}
              .uk-divider-small.uk-margin-large-bottom
              .tm-text-medium(v-if="page.content" v-html="page.content")
        section.uk-section.uk-padding-remove-top.tm-section__expand-mobile.tm-flex-grow(:class="{ 'uk-light': darkPeriod }")
          .uk-container.uk-container-large
            .uk-grid.uk-grid-small(v-if="items.length"
              data-uk-grid="masonry: true"
              class="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@xl")
              sale-item(
                v-for="item in items"
                :key="item.id"
                :item="item"
                @addToCart="addToCart")
        Observer(:options="observerOptions" @intersect="intersected")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import SaleItem from '@/components/Sales/SaleItem'
import Observer from '@/components/Observer'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'

export default {
  name: 'Sales',
  components: {
    Page,
    TopBar,
    SaleItem,
    Observer
  },
  mixins: [setLayout, scrollToTop],
  metaInfo () {
    return {
      title: this.page.long_title,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.page.description
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.page.keywords
        }
      ]
    }
  },
  async fetch () {
    await Promise.all([
      this.getItemsAction({ url: '/sales', clear: true }),
      this.getPageAction('sales')
    ])

    this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  data: () => ({
    observerOptions: {
      threshold: 0.1
    }
  }),
  computed: {
    ...mapState({
      page: state => state.pages.fields,
      items: state => state.resources.items,
      pagination: state => state.resources.pagination,
      lastPreview: state => state.images.lastPreview
    })
  },
  methods: {
    ...mapActions({
      getPageAction: 'pages/getItem',
      getItemsAction: 'resources/getItems',
      setImageFieldAction: 'images/setField',
      addToCartAction: 'cart/addSale',
      addNotificationAction: 'notifications/addItem'
    }),
    intersected () {
      if (this.items.length !== this.pagination.total) {
        this.getItemsAction({ url: '/sales', increasePage: true })
      }
    },
    async addToCart (id) {
      try {
        await this.addToCartAction(id)
        await this.addNotificationAction({
          message: 'Товар добавлен в корзину!',
          status: 'success'
        })
        this.onClose()
      } catch (e) {
        return e
      }
    }
  }
}
</script>
