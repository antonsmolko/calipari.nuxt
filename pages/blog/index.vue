<template lang="pug">
    Page
        template(#main)
            main(v-show="page")
                TopBar(:title="pageTitle")
                    .uk-navbar-item(v-if="availableTypes.length")
                        ul.tm-navbar__tab(data-uk-tab)
                            li.tm-navbar__tab-item(v-for="type in availableTypes"
                                :key="type.index"
                                :class="{ 'uk-active': type.index === currentTypeIndex }")
                                a.uk-text-small(:href="type.index" @click="changeType(type.index)")
                                    | {{ type.title }}
                section.tm-section__hero.uk-section.uk-position-relative.uk-text-center(:class="{ 'uk-light': darkPeriod }")
                    .uk-container.uk-position-relative.uk-position-z-index(
                        data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
                        .uk-margin-large-top.uk-margin-medium-bottom
                            h1.uk-heading-medium {{ pageTitle }}
                            .uk-divider-small.uk-margin-large-bottom
                            .tm-text-medium(v-if="page.content" v-html="page.content")
                section.uk-section.uk-section-default
                    .uk-container.uk-container-large
                        .uk-flex.uk-flex-center.uk-margin-medium-bottom
                            ul.tm-tab(data-uk-tab)
                                li.tm-tab__item(v-for="type in availableTypes"
                                   :key="type.index"
                                   :class="{ 'uk-active': type.index === currentTypeIndex }")
                                    a(:href="type.index" @click="changeType(type.index)")
                                        | {{ type.title }}
                        .uk-grid(v-if="items.length"
                                data-uk-grid="masonry: true"
                                class="uk-child-width-1-2@s uk-child-width-1-3@m")
                            div(v-for="item in items"
                                :key="item.id"
                                data-uk-scrollspy="cls: uk-animation-fade; delay: 300")
                                .uk-card.uk-card-default.uk-box-shadow-medium
                                    .uk-card-media-top
                                        nuxt-link.uk-link-reset(:to="`/blog/${item.alias}`")
                                            img(:data-src="`${imgBaseUrl}/${item.image_path}`"
                                                :alt="item.title"
                                                data-uk-img)
                                    .uk-card-body
                                        h3.uk-card-title
                                            nuxt-link.uk-link-heading(:to="`/blog/${item.alias}`") {{ item.title }}
                                        span.uk-text-small.uk-text-meta {{ item.date }}
                                        p(v-if="item.intro") {{ item.intro }}
                                        nuxt-link.uk-link-muted(:to="`/blog/${item.alias}`")
                                            span(data-uk-icon="chevron-right") Подробнее
                        .uk-width-1-1.uk-flex.uk-flex-center.uk-margin-large-top(v-else)
                            .uk-spinner(data-uk-spinner ratio="3")
                        Observer(
                            :options="observerOptions"
                            @intersect="intersected")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import Observer from '~/components/Observer'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  name: 'Blog',
  scrollToTop: true,
  components: {
    Page,
    TopBar,
    Observer
  },
  mixins: [setLayout, scrollToTop],
  async fetch ({ store }) {
    await Promise.all([
      store.dispatch('pages/getItem', 'blog'),
      store.dispatch('posts/getTypes')
    ])
    const defaultPostType = store.getters['posts/defaultType']

    if (defaultPostType) {
      await store.dispatch('resources/getItems', {
        url: `/posts/${defaultPostType.index}/list`,
        clear: true
      })
    }
  },
  data: () => ({
    observerOptions: {
      threshold: 0.1
    },
    currentTypeIndex: null
  }),
  computed: {
    ...mapState({
      page: state => state.pages,
      items: state => state.resources.items,
      pagination: state => state.resources.pagination,
      lastPreview: state => state.resources.lastPreview
    }),
    ...mapGetters('posts', [
      'availableTypes',
      'defaultType'
    ]),
    imgBaseUrl () {
      return `${process.env.baseUrl}/image/fit/600/400`
    }
  },
  created () {
    this.currentTypeIndex = this.defaultType ? this.defaultType.index : null
    this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  methods: {
    ...mapActions({
      getItemsAction: 'resources/getItems',
      setResourceFieldAction: 'resources/setField',
      resetPaginationAction: 'resources/resetPagination'
    }),
    changeType (type) {
      window.scrollTo(0, 0)
      this.resetPaginationAction()
      this.currentTypeIndex = type
      this.getItemsAction({
        url: `/posts/${type}/list`,
        clear: true
      })
    },
    intersected () {
      if (this.currentTypeIndex && this.items.length !== this.pagination.total) {
        this.getItemsAction({
          url: `/posts/${this.currentTypeIndex}/list`,
          increasePage: true
        })
      }
    },
    scrollToItem () {
      const options = {
        easing: 'ease-in-out',
        offset: 100,
        onDone: () => this.setImageFieldAction({ field: 'lastPreview', value: null })
      }
      VueScrollTo.scrollTo(`#post-${this.lastPreview}`, 300, options)
    }
  }
}
</script>

<style lang="scss" scoped>
.tm-navbar {
    &__tab {
        margin-bottom: 5px;
        &-item {
            @include media_desk($s) {
                padding-left: 0;
                a {
                    font-size: 12px;
                    padding: 5px 10px;
                }
            }
            @include media_desk($xs) {
                a {
                    padding: 5px;
                }
            }
        }
    }
}
.tm-tab {
    @include media_desk($se) {
        margin-left: 0;
        &__item {
            padding-left: 0;
            a {
                padding: 5px 10px;
                font-size: $global-small-font-size;
            }
        }
    }
}
</style>
