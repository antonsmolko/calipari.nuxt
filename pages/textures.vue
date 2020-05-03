<template lang="pug">
    main
        section.tm-textures__hero.uk-section.uk-flex.uk-flex-middle.uk-background-cover(
            data-uk-height-viewport="offset-top: true")
            .uk-container
                .tm-textures__hero-content.uk-margin-xlarge-bottom(
                    class="uk-width-large@s uk-width-xlarge@m")
                    .uk-margin-large-bottom
                        h1.uk-margin-remove Материалы
                        .uk-divider-small
                    div
                    .tm-text-medium В нашем интернет-магазине Вы сможете купить любые фотообои на стену из более чем 7 000 подобранных изображений и из 40 млн. фото из фотобанков. Все фотообои производятся на заказ по Вашим размерам и именно под Вашу стену. Заполните размеры, оформите заявку и уже через 3 дня заказ будет у Вас.
        SectionTextureItem(
            v-for="item in items"
            :key="item.id"
            :title="item.name"
            :description="item.description"
            :width="item.width"
            :cost="item.price"
            :textureSrc="item.sample_path"
            :exampleSrc="item.background_path"
        )
</template>

<script>
import { mapState } from 'vuex'
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
  components: { SectionTextureItem },
  mixins: [setLayout, scrollToTop],
  async fetch ({ store }) {
    await store.$api.$get('/manager/textures')
      .then((response) => {
        store.commit('textures/SET_ITEMS', response)
        store.commit('SET_FIELDS', { pageTitle: 'Материалы' })
      })
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
        background-image: url('/img/bg/bg-polygons.webp');
        @include media-portrait() {
            background-image: url('/img/bg/bg-polygons-m.webp');
        }
    }
    &__item {
        section {
            padding-bottom: 0 !important;
            margin-bottom: -$global-large-margin;
        }
    }
    &__sample {
        min-height: 500px;
        max-height: 150vw;
        height: 100vh;
    }
    &__spec {
        &:not(:first-child) {
            margin-left: $global-margin;
        }
        &-value {
            margin-left: $global-small-margin / 2;
            font-weight: $base-strong-font-weight;
            color: $global-emphasis-color;
        }
    }
    &__pattern {
        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }
    &__bottom {
        @include media-mob($s) {
            padding-bottom: $global-xlarge-margin;
        }
    }
}
</style>
