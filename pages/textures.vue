<template lang="pug">
    Page(v-if="!$fetchState.pending")
        template(#main)
            main
                TopBar(:title="pageTitle")
                section.tm-textures__hero.uk-section.uk-flex.uk-flex-middle(
                    :class="{ 'uk-light': darkPeriod }"
                    data-uk-height-viewport="offset-top: true")
                    .tm-textures__hero-container.uk-container.uk-flex-1
                        .tm-textures__hero-content.uk-margin-xlarge-bottom(
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small"
                            class="uk-width-large@s uk-width-xlarge@m")
                            .uk-margin-large-bottom
                                h1.uk-heading-medium.uk-text-background.uk-margin-remove Материалы
                                .uk-divider-small
                            div
                                span.tm-text-medium В нашем интернет-магазине Вы сможете купить любые фотообои на стену из более чем 7 000 подобранных изображений и из 40 млн. фото из фотобанков. Все фотообои производятся на заказ по Вашим размерам и именно под Вашу стену. Заполните размеры, оформите заявку и уже через 3 дня заказ будет у Вас.
                SectionTextureItem(
                    v-for="item in items"
                    :key="item.id"
                    :title="item.name"
                    :description="item.description"
                    :width="item.width"
                    :cost="item.price"
                    :textureSrc="item.sample_path"
                    :exampleSrc="item.background_path")
</template>

<script>
import { mapState } from 'vuex'
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import SectionTextureItem from '~/components/sections/Textures/SectionTextureItem'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'

export default {
  metaInfo () {
    return {
      title: 'Материалы'
    }
  },
  name: 'Textures',
  components: {
    Page,
    SectionTextureItem,
    TopBar
  },
  mixins: [setLayout, scrollToTop],
  async fetch () {
    await this.$store.dispatch('textures/getItems')
      .then(() => this.$store.dispatch('setField', { field: 'pageTitle', value: 'Материалы' }))
  },
  computed: {
    ...mapState('textures', [
      'items'
    ])
  }
}
</script>
<style lang="scss">
.tm-textures {
    &__hero {
        background-image: url('/img/bg/bg-textures.png');
        background-repeat: no-repeat;
        background-position: bottom right -100%;
        background-size: 90%;
        @include media_mob($l) {
            background-size: 85%;
        }
        @include media_mob($xl) {
            background-size: 85%;
        }
        @include media_mob($xxl) {
            background-size: 80%;
        }
        @include media-portrait() {
            background-image: url('/img/bg/bg-textures.png');
            background-size: contain;
            background-position: bottom center;
            &-container {
                display: flex;
                justify-content: center;
                padding-bottom: 20vh;
            }
        }
    }
}
</style>
