<template lang="pug">
  page
    template(#main)
      main(v-show="page")
        top-bar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-close, @click="onClose")
        section.tm-section__hero.uk-section.uk-position-relative(:class="{ 'uk-light': darkPeriod }")
          .uk-container.uk-position-relative.uk-position-z-index(
            data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
            .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge
              h1.uk-heading-small {{ pageTitle }}
              .uk-divider-small.uk-margin-large-bottom
        section.uk-section.uk-section-default(v-if="page.content")
          .uk-container.uk-container(v-html="page.content")
</template>

<script>
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import pageMeta from '@/components/mixins/pageMeta'

export default {
  name: 'Policy',
  components: {
    Page,
    TopBar
  },
  mixins: [setLayout, scrollToTop, pageMeta],
  async fetch () {
    await this.getPageAction('policy')
    this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  methods: {
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
