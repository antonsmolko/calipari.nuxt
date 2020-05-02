<template lang="pug">
    div
        TopBar(:title="title")
            //.uk-navbar-item
                span.tm-topbar__control.uk-icon-link(data-uk-icon="arrow-down")
            .uk-navbar-item
                span.tm-topbar__control.uk-icon-link(data-uk-icon="settings" @click.prevent="onClick")
                    span.uk-badge(v-if="filterQty") {{ filterQty }}
        SlideYDownTransition
            div
                GalleryHero(
                    :title="title"
                    :backgroundPath="backgroundPath"
                    :grayscaleMod="true"
                    :intro="intro")
                section.uk-section(v-show="images.length")
                    .uk-container.uk-container-expand
                        div(ref="mosaic")
                            GalleryImage(
                                v-for="image in images"
                                :key="image.id"
                                :image="image"
                                @dislike="dislike"
                                )
                Observer(
                    :options="observerOptions"
                    @intersect="intersected")
</template>

<script>
import { mapState, mapActions } from 'vuex'

import VueScrollTo from 'vue-scrollto'
import GalleryHero from './GalleryHero'
import GalleryImage from './GalleryImage'
import TopBar from '~/components/layout/TopBar.vue'
import Observer from '~/components/Observer'
import Mosaic from '~/plugins/mosaic'

export default {
  name: 'Gallery',
  components: {
    GalleryHero,
    TopBar,
    Observer,
    GalleryImage
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    backgroundPath: {
      type: String,
      default: ''
    },
    intro: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      required: true
    },
    paginateEnd: {
      type: Boolean,
      default: false
    },
    filterQty: {
      type: [Number, String],
      default: null
    }
  },
  data: () => ({
    observerOptions: {
      threshold: 0.1
    },
    mosaic: null,
    mosaicOptions: {
      minRowHeight: 150,
      maxRowHeight: 300,
      refitOnResize: true,
      refitOnResizeDelay: false,
      defaultAspectRatio: 1,
      maxRowHeightPolicy: 'tail',
      highResImagesWidthThreshold: 850,
      responsiveWidthThreshold: 340,
      innerGap: 10
    },
    initialized: false,
    mosaicTmt: null
  }),
  computed: {
    ...mapState('images', {
      loading: state => state.loading,
      lastPreview: state => state.lastPreview
    })
  },
  watch: {
    images () {
      if (this.images.length) {
        const mosaicEl = this.$refs.mosaic
        this.mosaic = new Mosaic(mosaicEl, this.mosaicOptions)

        this.initMosaic()
      }
    },
    loading () {
      this.loading
        ? this.initialized = false
        : this.initMosaic()
    },
    paginateEnd () {
      if (this.paginateEnd) {
        this.setFieldsAction({ footer: true })
      }
    }
  },
  created () {
    this.setFieldsAction({ footer: false })
  },
  async mounted () {
    if (this.images.length) {
      const mosaicEl = this.$refs.mosaic
      this.mosaic = new Mosaic(mosaicEl, this.mosaicOptions)

      await this.initMosaic()
      if (this.lastPreview) {
        this.scrollToImage()
      }
    }
  },
  methods: {
    ...mapActions('images', {
      setImageFieldsAction: 'setFields'
    }),
    intersected () {
      if (this.initialized && !this.paginateEnd) {
        this.$emit('paginate')
      }
    },
    async initMosaic () {
      await this.initMosaicTmt()
      this.initialized = true
    },
    initMosaicTmt () {
      if (this.mosaicTmt) {
        clearTimeout(this.mosaicTmt)
      }
      return new Promise((resolve) => {
        this.mosaicTmt = setTimeout(() => {
          this.mosaic.init()
          resolve()
        }, 50)
      })
    },
    onClick () {
      this.$emit('filterOpen')
    },
    dislike (id) {
      this.$emit('dislike', id)
    },
    scrollToImage () {
      const options = {
        easing: 'ease-in-out',
        offset: -300,
        onDone: () => this.setImageFieldsAction({ lastPreview: null })
      }
      VueScrollTo.scrollTo(`#image-${this.lastPreview}`, 300, options)
    }
  }
}
</script>

<style>
@import '../../assets/scss/modules/_mosaic-gallery.scss';
</style>
