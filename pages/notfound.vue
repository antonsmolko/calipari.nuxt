<template lang="pug">
    Page
        template(#main)
            main
                TopBar(:title="pageTitle")
                    .uk-navbar-item
                        button.uk-close(type="button", data-uk-close, @click="onClose")
                section.uk-section.uk-section-xlarge.uk-text-center(:class="{ 'uk-light': darkPeriod }")
                    .uk-container
                        span.uk-heading-small {{ pageTitle }}
                        p.tm-text-medium Страница не найдена!
                        nuxt-link.uk-button.uk-button-primary.uk-margin-medium-top(to="/") На главную
</template>

<script>
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
export default {
  components: {
    Page,
    TopBar
  },
  mixins: [setLayout, scrollToTop],
  created () {
    this.setFieldAction({ field: 'pageTitle', value: 'Ошибка 404' })
  },
  methods: {
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
