<template lang="pug">
  section.tm-gallery__section.uk-section
    .uk-container.uk-container-expand
      div(ref="mosaic")
        GalleryImage(
          v-for="image in images"
          :key="image.id"
          :image="image"
          @dislike="dislike")
    Observer(
      :options="observerOptions"
      @intersect="intersected")
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueScrollTo from 'vue-scrollto'
import debounce from 'lodash/debounce'
import GalleryImage from '~/components/Gallery/GalleryImage'
import Observer from '~/components/Observer'
import Mosaic from '~/plugins/mosaic'
const _debounce = debounce(fn => fn(), 2000)

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
      innerGap: 4
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
      this.setFieldAction({
        field: 'footer',
        value: this.paginateEnd
      })
    }
  },
  async mounted () {
    this.setFieldAction({
      field: 'footer',
      value: this.paginateEnd
    })
    const mosaicEl = this.$refs.mosaic
    this.mosaic = new Mosaic(mosaicEl, this.mosaicOptions)

    await this.initMosaic()

    if (this.lastPreview) {
      this.scrollToImage()
    }
  },
  methods: {
    ...mapActions('images', {
      setImageFieldAction: 'setField'
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
        })
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
        onDone: () => _debounce(this.clearLastPreview)
      }
      VueScrollTo.scrollTo(`#image-${this.lastPreview}`, 300, options)
    },
    clearLastPreview () {
      this.setImageFieldAction({
        field: 'lastPreview',
        value: null
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/modules/_mosaic-gallery.scss';

.tm-gallery__section {
  position: relative;
  z-index: 2;
  .uk-container {
    padding: 0 4px;
  }
}
</style>
