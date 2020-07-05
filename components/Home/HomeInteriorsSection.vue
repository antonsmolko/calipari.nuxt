<template lang='pug'>
    section.tm-interiors.uk-section.uk-section-large.uk-section-default(id="home-interiors" v-if="firstInterior")
        .uk-container.uk-container-large
            .uk-width-1-1.uk-position-relative
                .uk-position-relative(data-uk-height-match)
                    .uk-width-1-1.uk-position-relative.uk-position-z-index(class="uk-width-1-6@m")
                        .tm-interiors__heading.uk-margin-large-bottom(
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 200"
                            class="uk-width-medium uk-width-large@m")
                            h2.uk-heading-small Фотообои для&nbsp;Вашего интерьера
                        ul.tm-interiors__tab.uk-tab-right(
                            ref="tab"
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 200"
                            data-uk-tab="connect: #content-tab-left; animation: uk-animation-fade")
                            li(v-for="(item, index) in items"
                               :key="item.id"
                               @click="handleTabClick(item, index)")
                               a.uk-h5.uk-margin-remove(href='#') {{ item.title }}
                        ul.uk-invisible.tm-visibility-hidden(id="content-tab-left")
                            li(v-for="item in items" :key="item.id")
                    .tm-interiors__tab-content.uk-width-1-1.uk-flex.uk-flex-right
                        .tm-interiors__slideshow.uk-position-relative(
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 200"
                            class="uk-width-5-6@m"
                            ref="slider"
                            @beforeitemhide="handleBeforeSlideItemHide"
                            @itemshown="handleSlideItemShown"
                            data-uk-slideshow)
                            SlideYDownTransition(
                                mode="in-out"
                                :delay="100"
                                :duration="500")
                                ul.uk-slideshow-items.uk-child-width-1-1(v-show="!tabOn" v-if="currentInterior")
                                    li(v-for="(slide, index) in currentInterior.slides"
                                        :key="slide.id"
                                        :data-slide-index="index"
                                        :data-slide-id="slide.id")
                                        .tm-interiors__background.uk-background-cover(
                                            :data-src="`${baseInteriorImageUrl}/${slide.background_path}`"
                                            data-uk-img)
                            .uk-margin-top.uk-position-relative.uk-position-z-index
                                a.uk-padding-small.uk-link-text(data-uk-slidenav-previous data-uk-slideshow-item="previous" href="#")
                                a.uk-padding-small.uk-link-text(data-uk-slidenav-next data-uk-slideshow-item="next" href="#")
                SlideYDownTransition(mode="out-in" v-if="currentSlide")
                    CollectionImageItem.uk-position-bottom-right(
                        v-if="!slideOn && !tabOn"
                        anchor="home-interiors"
                        :item="currentSlide.image")
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import head from 'lodash/head'
import find from 'lodash/find'
import CollectionImageItem from '~/components/Catalog/Collection/CollectionImageItem'

const _debounce = debounce(fn => fn(), 500)

export default {
  components: {
    CollectionImageItem
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    baseInteriorImageUrl: `${process.env.baseUrl}/image/show`,
    baseImageUrl: `${process.env.baseUrl}/image/widen/500`,
    slideOn: false,
    tabOn: false,
    sliderElem: null
  }),
  computed: {
    ...mapState({
      lastPreview: state => state.images.lastPreview,
      currentInteriorIndex: state => state.home.currentInteriorIndex,
      currentSlideIndex: state => state.home.currentSlideIndex,
      currentInterior: state => state.home.currentInterior,
      currentSlide: state => state.home.currentSlide
    }),
    ...mapGetters('home', [
      'firstInterior'
    ])
  },
  created () {
    if (!this.lastPreview || !this.currentInterior) {
      this.init()
    }
  },
  mounted () {
    this.sliderElem = this.$refs.slider
    if (this.lastPreview && this.currentInterior) {
      this.setLastState()
    }
  },
  methods: {
    ...mapActions({
      setImageFieldAction: 'images/setField',
      setHomeFieldsAction: 'home/setFields',
      setHomeFieldAction: 'home/setField'
    }),
    async handleTabClick (interior, index) {
      this.tabOn = true
      await this.setNextInterior(interior, index)
      this.tabOn = false
    },
    handleSlideItemShown (e) {
      if (!this.lastPreview) {
        const slideEl = e.target
        const slideId = this.tabOn
          ? this.getFirstSlideId(this.currentInterior)
          : slideEl.getAttribute('data-slide-id')
        const slideIndex = this.tabOn
          ? 0
          : slideEl.getAttribute('data-slide-index')
        const slide = this.getSlide(this.currentInterior, slideId)
        this.setHomeFieldsAction({
          currentSlideIndex: slideIndex,
          currentSlide: slide
        })
        this.slideOn = false
      }
    },
    async setNextInterior (interior, index) {
      const slideId = await this.getFirstSlideId(interior)
      const currentSlide = this.getSlide(interior, slideId)
      this.$uikit.slideshow(this.sliderElem).show(0)
      await this.setHomeFieldsAction({
        currentInterior: interior,
        currentSlide,
        currentInteriorIndex: index,
        currentSlideIndex: 0
      })
    },
    getFirstSlideId (interior) {
      return head(interior.slides).id
    },
    getSlide (interior, slideId) {
      return find(interior.slides, slide => +slide.id === +slideId)
    },
    handleBeforeSlideItemHide () {
      this.slideOn = true
    },
    init () {
      const slideId = this.getFirstSlideId(this.firstInterior)
      this.setHomeFieldsAction({
        currentInterior: this.firstInterior,
        currentSlide: this.getSlide(this.firstInterior, slideId),
        currentInteriorIndex: 0,
        currentSlideIndex: 0
      })
    },
    async setLastState () {
      const tabElem = this.$refs.tab
      await this.$uikit.tab(tabElem).show(this.currentInteriorIndex)
      await this.$uikit.slideshow(this.sliderElem).show(this.currentSlideIndex)
      await _debounce(this.clearLastPreview)
    },
    clearLastPreview () {
      this.setImageFieldAction({ field: 'lastPreview', value: null })
      this.slideOn = false
    }
  }
}
</script>
<style lang="scss">
.tm-interiors {
    &__heading {
        @include media_mob($m) {
            padding-top: $global-margin;
        }
    }
    &__tab {
        @include media_desk($m) {
            flex-flow: row nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
            margin-left: 0;
            border-bottom: $tab-border-width solid $tab-border;
            &::before {
                border-bottom: none;
                border-left: none;
            }
            li {
                &:first-child {
                    padding-left: 0;
                }
                &:not(:last-child) {
                    margin-bottom: 0;
                }
                &:not(:first-child) {
                    padding-left: $global-small-margin;
                }
                > a {
                    border-left: none;
                    border-bottom: 2px solid transparent;
                }
            }
        }
        @include media_mob($m) {
            width: $width-small-width;
        }
    }
    &__tab-content {
        @include media_desk($s) {
            width: 100vw;
            max-width: inherit;
            margin-left: -$global-small-gutter;
            margin-right: -$global-small-gutter;
        }
        @include media_mob($m) {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    &__slideshow {
        .uk-slideshow-items {
            height: 340px;
            @include media_mob($s) {
                height: 450px;
            }
            @include media_mob($m) {
                height: 500px;
            }
            @include media_mob($l) {
                height: 600px;
            }
            @include media_mob($xl) {
                height: 700px;
            }
            li {
                height: inherit;
                //opacity: .7;
            }
        }
    }
    &__background {
        height: inherit;
    }
    .tm-mosaic__image {
        width: 50%;
        @include media_mob($s) {
            width: $width-medium-width;
            margin-right: $global-medium-margin;
        }
    }
}
</style>
