<template lang="pug">
  page(v-if="!$fetchState.pending")
    template(#main)
      main
        top-bar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-icon="icon: close; ratio: 1.1", @click="onClose")
        section.uk-section.uk-section-xlarge.uk-text-center(:class="{ 'uk-light': darkPeriod }")
          .uk-container
            span.uk-heading-small {{ pageTitle }}
            p.tm-text-medium Страница не найдена!
            nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/") На главную
</template>

<script>
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import noindexPageMeta from '@/components/mixins/noindexPageMeta'

export default {
  layout: '404',
  name: 'Notfound',
  components: {
    Page,
    TopBar
  },
  mixins: [setLayout, scrollToTop, noindexPageMeta],
  fetch () {
    this.setFieldAction({ field: 'pageTitle', value: 'Ошибка 404' })
  },
  methods: {
    onClose () {
      this.$router.push('/')
    }
  }
}
</script>
