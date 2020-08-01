<template lang="pug">
    Page
        template(#main)
            main
                TopBar(:title="pageTitle")
                section.tm-section__hero.uk-section.uk-position-relative.uk-padding-remove-bottom(:class="{ 'uk-light': darkPeriod }")
                    .uk-container.uk-position-relative.uk-position-z-index(
                        data-uk-scrollspy="cls: uk-animation-slide-bottom-small")
                        .uk-margin-large-top.uk-margin-medium-bottom.uk-width-xxlarge
                            h1.uk-heading-medium {{ pageTitle }}
                            .uk-divider-small.uk-margin-large-bottom
                        .tm-contacts__hero-content.uk-width-1-1.uk-position-relative.uk-position-z-index
                            .tm-contacts__card.uk-card.uk-card-primary.uk-card-body.uk-width-medium.uk-box-shadow-large(
                                data-uk-parallax="y: 0,50; media: @m")
                                span.uk-h3 Брянск, Россия
                                p.tm-text-medium Мы доставляем заказы по всей стране
                    .uk-position-relative
                        yandex-map(
                            ymap-class="ymap-container__content"
                            :coords="center"
                            :zoom="11"
                            :options="ymapOptions"
                            :scroll-zoom="false"
                            :controls="[]"
                            @map-was-initialized="init"
                            @click="onClick")
                            ymap-marker(
                                v-for="(marker, i) in markers"
                                :key="i"
                                :coords="[marker.lat, marker.mag]"
                                :marker-id="i"
                                hint-content="some hint")
                        .tm-contacts__spinner.uk-position-cover.uk-flex.uk-flex-middle(v-show="!mapInit")
                            .uk-margin-auto.uk-text-muted(data-uk-spinner="ratio: 3")
                section.uk-section.uk-section-large.tm-section__muted
                    .uk-container.uk-position-relative
                        .uk-grid.uk-flex-center(
                            data-uk-grid
                            data-uk-scrollspy="cls: uk-animation-slide-bottom-small; delay: 300")
                            div(class="uk-width-xlarge@s uk-width-2-5@m")
                                h3.uk-h3.uk-text-primary Пункты самовывоза
                                p {{ getSettingValueByKey('pickup_1') }}
                                p {{ getSettingValueByKey('pickup_2') }}
                                h3.uk-h3.uk-text-primary Свяжитесь с нами
                                a.uk-link.uk-link-muted.uk-display-block.tm-text-medium(
                                    :href="`tel:${getSettingValueByKey('company_phone')}`")
                                    | {{ phoneFormat }}
                                a.uk-link.uk-link-muted.uk-display-block.tm-text-medium(
                                    :href="`mail:${getSettingValueByKey('company_email')}`")
                                    | {{ getSettingValueByKey('company_email') }}
                                h3.uk-h3.uk-text-primary Подписывайтесь на нас
                                a.uk-link.uk-link-muted.uk-text-uppercase.uk-margin-right(
                                    :href="getSettingValueByKey('vk_account')") Vkontakte
                                a.uk-link.uk-link-muted.uk-text-uppercase.uk-margin-right(
                                    :href="getSettingValueByKey('facebook_account')") Facebook
                                a.uk-link.uk-link-muted.uk-text-uppercase(
                                    :href="getSettingValueByKey('instagram_account')") Instagram
                            div(class="uk-width-xlarge@s uk-width-3-5@m")
                                h3.uk-h3.uk-text-primary Обратная связь
                                form.uk-grid.uk-flex-column(data-uk-grid)
                                    UkInput.uk-width-1-1(
                                        name="name"
                                        icon="user")
                                    UkInput.uk-width-1-1(
                                        name="phone"
                                        icon="phone")
                                    UkTextarea.uk-width-1-1(
                                        name="message"
                                        icon="comment"
                                        :rows="7")
                                    .uk-width-1-1.uk-margin-top
                                        p.uk-text-small.uk-margin-right()
                                            | Нажимая кнопку «Отправить», я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
                                            nuxt-link(to="/policy") политикой конфиденциальности
                                        button.uk-button.uk-button-primary(type="submit") Отправить
</template>

<script>
import Page from '~/components/layout/Page.vue'
import TopBar from '~/components/layout/TopBar.vue'
import UkInput from '~/components/form/Input/UkInput'
import UkTextarea from '~/components/form/Input/UkTextarea'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
import { getPhoneFormat } from '~/helpers'

export default {
  name: 'Contacts',
  components: {
    Page,
    UkTextarea,
    TopBar,
    UkInput
  },
  mixins: [setLayout, scrollToTop],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  data: () => ({
    center: [53.272154, 34.371165],
    ymapOptions: {
      zoom: 1
    },
    markers: [
      { lat: 53.209427, mag: 34.458332 },
      { lat: 53.320060, mag: 34.280951 }
    ],
    mapInit: false
  }),
  computed: {
    phoneFormat () {
      return getPhoneFormat(this.phone)
    },
    phone () {
      return this.getSettingValueByKey('company_phone')
    }
  },
  created () {
    this.setFieldAction({ field: 'pageTitle', value: 'Контакты' })
  },
  methods: {
    onClick (e) {
      this.coords = e.get('coords')
    },
    init () {
      this.mapInit = true
    },
    getSettingValueByKey (key) {
      const setting = this.$store.getters['settings/getSettingByKey'](key)
      return setting.value
    }
  }
}
</script>

<style lang="scss">
.tm-contacts {
    &__hero-content {
        padding-top: $global-xlarge-margin;
        @include media_mob($s) {
            padding-top: $global-medium-margin;
        }
        @include media_mob($xl) {
            padding-top: 0;
        }
    }
    &__card {
        position: absolute;
        top: 0;
        @include media_desk($s) {
            right: 0;
            width: 100%;
        }
        @include media_mob($s) {
            right: $global-small-gutter;
        }
        @include media_mob($l) {
            right: $global-gutter;
        }
        @include media-mob($xl) {
            top: -$global-medium-margin;
            right: -$global-margin;
        }
    }
}
.ymap-container {
    &__content {
        width: 100%;
        height: 400px;
        margin: 0;
    }
}
[class$="-ground-pane"] {
    filter: grayscale(1);
}
</style>
