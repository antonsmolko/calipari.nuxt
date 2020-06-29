<template lang="pug">
    Page
        template(#main)
            main
                TopBar(:title="pageTitle")
                    .uk-navbar-item
                        button.uk-close(type="button", data-uk-close, @click="onClose")
                template(v-if="responseData")
                    section.tm-section__hero.uk-section.uk-position-relative(
                        :class="{ 'uk-light': darkPeriod }")
                        .uk-container.uk-position-relative.uk-position-z-index(
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
                            .uk-margin-large-top
                                h1.uk-heading-small {{ pageTitle }}
                                .uk-divider-small.uk-margin-medium-bottom
                                p.tm-text-medium.uk-text-muted.uk-margin {{ item.date }}
                                .tm-text-medium.uk-text-left(v-if="item.intro" v-html="item.intro")
                    section.uk-section.uk-section-default.uk-padding-remove-top.uk-margin-xlarge-top.tm-flex-grow
                        .tm-post__main-image-container.uk-container.uk-margin-medium-bottom
                            img.uk-width-1-1.uk-box-shadow-large(
                                :data-src="`${baseImageUrl}/${item.image_path}`"
                                :alt="item.title"
                                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 300"
                                data-uk-img)
                        .uk-container.uk-container-small
                            .tm-post__content(
                                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 300"
                                v-html="item.content")
                            ul.uk-pagination.uk-margin-medium(
                                data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 300")
                                li(v-if="item.previous"): nuxt-link(:to="`/blog/${item.previous}`")
                                    span.uk-margin-small-right(data-uk-pagination-previous)
                                    | Предыдущая
                                li.uk-margin-auto-left(v-if="item.next"): nuxt-link(:to="`/blog/${item.next}`")
                                    | Следующая
                                    span.uk-margin-small-left(data-uk-pagination-next)

</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import scrollToTop from '~/components/mixins/scrollToTop'
import setLayout from '~/components/mixins/setLayout'

export default {
  name: 'Post',
  scrollToTop: true,
  components: {
    Page,
    TopBar
  },
  mixins: [setLayout, scrollToTop],
  // metaInfo () {
  //   return {
  //     script: [
  //       { src: '//cdn.iframe.ly/embed.js?api_key=cbf6e83443222ac53bca55', charset: 'utf-8', async: true }
  //     ]
  //   }
  // },
  data: () => ({
    responseData: false,
    baseImageUrl: `${process.env.baseUrl}/image/widen/800`
  }),
  computed: {
    ...mapState({
      item: state => state.posts.item
    })
  },
  created () {
    this.getItemAction(this.$route.params.post)
      .then(() => this.setFieldAction({
        field: 'pageTitle',
        value: this.item.title
      }))
      .then(() => {
        this.responseData = true
      })
  },
  beforeDestroy () {
    this.setPostsField({ field: 'item', value: {} })
  },
  methods: {
    ...mapActions({
      getItemAction: 'posts/getItem',
      setPostsField: 'posts/setField'
    }),
    onClose () {
      this.$router.push('/blog')
    }
  }
}
</script>

<style lang="scss">
    .tm-post {
    &__main-image-container {
        margin-top: -$global-large-margin;
        @include media_mob($l) {
            margin-top: -$global-xlarge-margin;
        }
    }
}
</style>
