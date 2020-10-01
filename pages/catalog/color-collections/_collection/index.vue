<template lang="pug">
  page(v-if="!$fetchState.pending && responseData")
    template(#main)
      main
        top-bar(:title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-close, @click="onClose")
        section.uk-section.uk-section-large.uk-position-relative.uk-text-center.uk-position-z-index(
          :class="{ 'uk-light': darkPeriod }"
          data-uk-scrollspy="cls:uk-animation-slide-bottom-small")
          .uk-container.uk-container-large
            h2.uk-heading-small {{ colorCollection.title }}
            .uk-divider-small.uk-margin-large-bottom
            .uk-grid.uk-grid-small(
              data-uk-grid
              data-uk-height-match
              data-uk-scrollspy="target: > *; cls: uk-animation-fade; delay: 50")
              .uk-panel(
                v-for="item in colorCollection.images"
                class="uk-width-1-2@s uk-width-1-3@m")
                collection-image-item(
                  :artBadge="true"
                  :item="item"
                  :key="item.id")
        .uk-position-fixed.uk-width-1-1.uk-height-viewport.uk-position-top(
          data-uk-scrollspy="cls: uk-animation-fade; delay: 50")
          .tm-section__semitransparent-background.uk-position-cover.uk-background-cover.uk-background-fixed(
            v-show="backgroundPath"
            :data-src="url" data-uk-img)
          .tm-category__background-default(
            v-if="!backgroundPath")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import CollectionImageItem from '@/components/Catalog/Collection/CollectionImageItem'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import scrollToImage from '@/components/mixins/scrollToImage'
import { getS3ImageUrl } from '@/helpers'

export default {
  name: 'ColorCollection',
  metaInfo () {
    return {
      title: this.colorCollection.meta_title || this.pageTitle,
      meta: [
        {
          skip: process.env.NODE_ENV === 'production',
          vmid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        },
        {
          vmid: 'description',
          name: 'description',
          content: this.colorCollection.description || ''
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: this.colorCollection.keywords || ''
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.BASE_URL + this.$route.fullPath }
      ]
    }
  },
  components: {
    Page,
    TopBar,
    CollectionImageItem
  },
  mixins: [
    setLayout,
    scrollToTop,
    scrollToImage
  ],
  async fetch () {
    if (!this.$route.params.collection) {
      await this.$router.push('/notfound')
    }
    await this.getColorCollectionAction(this.$route.params.collection)
      .catch((error) => {
        if (error.status === 404) {
          this.$router.push('/notfound')
        }
      })
    await this.setFieldAction({ field: 'pageTitle', value: this.colorCollection.title })
    this.responseData = true
  },
  data: () => ({
    responseData: false
  }),
  computed: {
    ...mapState({
      colorCollection: state => state.colorCollections.item
    }),
    ...mapGetters('colorCollections', [
      'mainImage'
    ]),
    backgroundPath () {
      return this.mainImage ? this.mainImage.path : null
    },
    url () {
      return this.backgroundPath
        ? getS3ImageUrl({
          name: this.backgroundPath,
          grayscale: true
        })
        : ''
    }
  },
  beforeDestroy () {
    this.setColorCollectionFieldAction({ field: 'item', value: {} })
  },
  methods: {
    ...mapActions({
      setImageFieldAction: 'images/setField',
      getColorCollectionAction: 'colorCollections/getItem',
      setColorCollectionFieldAction: 'colorCollections/setField'
    }),
    onClose () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/catalog')
    }
  }
}
</script>
