<template lang="pug">
    section.uk-section.tm-gallery__section
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
import { mapState, mapGetters, mapActions } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import GalleryImage from '~/components/Gallery/GalleryImage'
import Observer from '~/components/Observer'
import Mosaic from '~/plugins/mosaic'
export default {
  name: 'GalleryImageSection',
  components: {
    GalleryImage,
    Observer,
    Mosaic
  },
  props: {
    images: {
      type: Array,
      required: true
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
    }),
    ...mapGetters({
      activeTag: 'filter/activeTag',
      paginateEnd: 'images/paginateEnd'
    })
  },
  watch: {
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
  async mounted () {
    const mosaicEl = this.$refs.mosaic
    this.mosaic = new Mosaic(mosaicEl, this.mosaicOptions)

    await this.initMosaic()
    if (this.lastPreview) {
      this.scrollToImage()
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
    dislike (id) {
      this.initMosaic()
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
.tm-gallery__section {
    position: relative;
    z-index: 2;
}
</style>
