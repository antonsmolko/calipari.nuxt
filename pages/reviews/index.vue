<template lang="pug">
  page(v-if="!$fetchState.pending && page")
    template(#main)
      main(v-show="page")
        top-bar(:title="pageTitle")
        section.tm-section__hero.uk-section.uk-position-relative(:class="{ 'uk-light': darkPeriod }")
          .uk-container.uk-position-relative.uk-position-z-index.uk-container-small(
            data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
            .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge
              h1.uk-heading-medium {{ pageTitle }}
              .uk-divider-small.uk-margin-large-bottom
              .tm-text-medium(v-if="page.content" v-html="page.content")
        section.uk-section.tm-flex-grow.tm-section__expand-mobile.uk-padding-remove-top(:class="{ 'uk-light': darkPeriod }")
          .uk-container.uk-container-small
            slide-y-down-transition
              .tm-review-list(v-if="items")
                review-list-item(
                  v-for="item in items"
                  :key="item.id"
                  :item="item")
        observer(
          :options="observerOptions"
          @intersect="intersected")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import ReviewListItem from '@/components/Review/ReviewListItem'
import Observer from '@/components/Observer'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import page from '@/components/mixins/page'

export default {
  components: {
    Page,
    TopBar,
    ReviewListItem,
    Observer
  },
  mixins: [setLayout, scrollToTop, page],
  async fetch () {
    await this.resetPaginationAction()
    await this.getItemsAction({ url: '/reviews', clear: true })
    await this.getPageAction('reviews')
    this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  data: () => ({
    observerOptions: {
      threshold: 0.1
    }
  }),
  computed: {
    ...mapState({
      items: state => state.resources.items,
      pagination: state => state.resources.pagination
    })
  },
  beforeDestroy () {
    this.resetPaginationAction()
  },
  methods: {
    ...mapActions({
      getItemsAction: 'resources/getItems',
      getPageAction: 'pages/getItem',
      resetPaginationAction: 'images/resetPagination'
    }),
    intersected () {
      if (this.items.length !== this.pagination.total) {
        this.getItemsAction({
          url: '/reviews',
          increasePage: true
        })
      }
    }
  }
}
</script>
