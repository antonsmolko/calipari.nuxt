<template lang="pug">
  page(v-if="!$fetchState.pending && page")
    template(#main)
      main(v-show="page")
        top-bar(:title="pageTitle")
        section.tm-section__hero.uk-section.uk-position-relative(:class="{ 'uk-light': darkPeriod }")
          .uk-container.uk-position-relative.uk-position-z-index(
            data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
            .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge
              h1.uk-heading-medium {{ pageTitle }}
              .uk-divider-small.uk-margin-large-bottom
              .tm-text-medium(v-if="page.content" v-html="page.content")
        section.uk-section.uk-section-large.uk-section-default.tm-flex-grow
          .uk-container.uk-container-large.tm-container__expand-mobile
            portfolio-item.uk-margin-xlarge(
              v-for="item in items"
              :key="item.id"
              :item="item")
        observer(
          :options="observerOptions"
          @intersect="intersected")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import PortfolioItem from '@/components/Portfolio/PortfolioItem'
import Observer from '@/components/Observer'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import page from '@/components/mixins/page'

export default {
  name: 'Portfolio',
  components: {
    Page,
    TopBar,
    PortfolioItem,
    Observer
  },
  mixins: [setLayout, scrollToTop, page],
  async fetch () {
    await this.getItemsAction({
      url: '/work-examples',
      clear: true
    })
    await this.getPageAction('portfolio')
    this.setFieldAction({
      field: 'pageTitle',
      value: this.page.title
    })
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
  mounted () {
    if (this.lastPreview) {
      this.scrollToItem()
    }
  },
  methods: {
    ...mapActions({
      getItemsAction: 'resources/getItems',
      setImageFieldAction: 'images/setField',
      getPageAction: 'pages/getItem'
    }),
    intersected () {
      if (this.items.length !== this.pagination.total) {
        this.getItemsAction({
          url: '/work-examples',
          increasePage: true
        })
      }
    },
    scrollToItem () {
      const options = {
        easing: 'ease-in-out',
        offset: 100,
        onDone: () => this.setImageFieldAction({
          field: 'lastPreview',
          value: null
        })
      }
      VueScrollTo.scrollTo(`#image-${this.lastPreview}`, 300, options)
    }
  }
}
</script>
