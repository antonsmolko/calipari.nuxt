<template lang="pug">
  page(v-if="!$fetchState.pending")
    template(#main)
      main
        top-bar(:title="pageTitle")
        section.tm-textures__hero.uk-section.uk-flex(
          :class="{ 'uk-light': darkPeriod }"
          data-uk-parallax="bgy: 100"
          :data-uk-height-viewport="`offset-top: ${true}; offset-bottom: ${bottomOffset}`")
          .tm-textures__hero-container.uk-container.uk-flex-1
            .tm-textures__hero-content.uk-margin-xlarge-bottom(
              data-uk-scrollspy="cls: uk-animation-slide-bottom-small"
              class="uk-width-large@s uk-width-xlarge@l")
              .uk-margin-large-bottom
                h1.uk-heading-medium.uk-text-background.uk-margin-remove Материалы
                .uk-divider-small
              div
                span.tm-text-medium В нашем интернет-магазине Вы сможете купить любые фотообои на стену из более чем 7 000 подобранных изображений и из 40 млн. фото из фотобанков. Все фотообои производятся на заказ по Вашим размерам и именно под Вашу стену. Заполните размеры, оформите заявку и уже через 3 дня заказ будет у Вас.
        section-texture-item(
          v-for="item in items"
          :key="item.id"
          :title="item.name"
          :description="item.description"
          :width="item.width"
          :cost="item.price"
          :sampleBottomOffset="bottomOffset"
          :textureSrc="item.sample_path"
          :exampleSrc="item.background_path"
          :seamless="Boolean(item.seamless)")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import SectionTextureItem from '@/components/Textures/SectionTextureItem'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import pageMeta from '@/components/mixins/pageMeta'
import { getBreakPointByKey } from '@/helpers'

export default {
  name: 'Textures',
  components: {
    Page,
    SectionTextureItem,
    TopBar
  },
  mixins: [setLayout, scrollToTop, pageMeta],
  async fetch () {
    await Promise.all([
      this.getItemsAction(),
      this.getPageAction('textures')
    ])
    await this.setFieldAction({ field: 'pageTitle', value: this.page.title })
  },
  computed: {
    ...mapState({
      items: state => state.textures.items,
      breakPoint: state => state.breakPoint
    }),
    bottomOffset () {
      const mediumBreakPoint = getBreakPointByKey('m')
      return this.breakPoint.value <= mediumBreakPoint.value
        ? '60px'
        : 0
    }
  },
  methods: {
    ...mapActions({
      getItemsAction: 'textures/getItems',
      setFieldAction: 'setField'
    })
  }
}
</script>
<style lang="scss">
.tm-textures {
  &__hero {
    background-image: url('/img/bg/bg-textures-1.png');
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 90%;
    align-items: center;
    @include media-mob($l) {
      background-size: 85%;
    }
    @include media-mob($xl) {
      background-size: 85%;
    }
    @include media-mob($xxl) {
      background-size: 80%;
    }
    @include media-desk($se) {
      &-content {
        .tm-text-medium {
          font-size: 1rem;
        }
      }
    }
    @include media-portrait() {
      background-image: url('/img/bg/bg-textures-m.png');
      background-size: contain;
      background-position: bottom center;
      align-items: flex-start;
    }
    @include media-mob-portrait($s) {
      background-size: 80%;
      background-position: bottom right;
      padding-top: $section-large-padding-vertical-m;
      &-container {
        display: flex;
        justify-content: center;
      }
    }
    @include media-mob-portrait($m) {
      padding-top: $section-large-padding-vertical-m;
    }
  }
}
</style>
