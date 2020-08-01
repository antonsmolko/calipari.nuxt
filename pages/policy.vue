<template lang="pug">
    Page
        template(#main)
            main(v-show="page")
                TopBar(:title="pageTitle")
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
import { mapState } from 'vuex'
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  name: 'Policy',
  components: {
    Page,
    TopBar
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
  async fetch ({ store }) {
    await store.dispatch('pages/getItem', 'policy')
  },
  computed: {
    ...mapState({
      page: state => state.pages.fields
    })
  },
  created () {
    this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  methods: {
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
