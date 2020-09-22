<template lang="pug">
  page
    template(#main)
      main
        top-bar(:title="pageTitle")
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
                form.uk-grid.uk-grid-small.uk-flex-column(data-uk-grid @submit.prevent="onSubmit")
                  v-input.uk-width-1-1(
                    title="Имя"
                    :label="true"
                    name="name"
                    icon="user"
                    v-model="form.name"
                    :v-model-enable="true"
                    :vRules="{ required: true, minLength: true }"
                    :vField="$v.form.name")
                  phone-input(
                    :value="customer.phone"
                    :vDelay="true"
                    :vField="$v.customer.phone"
                    :vRules="{ phone: true, required: true }"
                    module="checkout"
                    dispatch-name="setCustomerField")
                  v-textarea.uk-width-1-1(
                    title="Сообщение"
                    :label="true"
                    :trim="false"
                    :min="2"
                    :maxlength="1000"
                    icon="comment"
                    name="message"
                    v-model="form.message"
                    :v-model-enable="true"
                    :rows="7"
                    :vField="$v.form.message"
                    :vRules="{ required: true, minLength: true }"
                    :vDelay="true")
                  .uk-width-1-1.uk-margin-top
                    p.uk-text-small.uk-margin-right()
                      | Нажимая кнопку «Отправить», я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
                      nuxt-link(to="/policy") политикой конфиденциальности
                    button.uk-button.uk-button-primary(type="submit" :disabled="$v.$invalid || sending")
                      | Отправить
                      i.tm-payment__pay-button-spinner.uk-margin-small-left.uk-text-muted.uk-animation-fade(
                        v-if="sending"
                        data-uk-spinner="ratio: 0.7")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { minLength, required } from 'vuelidate/lib/validators'
import Page from '@/components/layout/Page.vue'
import TopBar from '@/components/layout/TopBar.vue'
import VInput from '@/components/form/VInput'
import PhoneInput from '@/components/form/PhoneInput'
import VTextarea from '@/components/form/VTextarea'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import page from '@/components/mixins/page'
import { getPhoneFormat } from '@/helpers'

export default {
  name: 'Contacts',
  components: {
    Page,
    VTextarea,
    TopBar,
    VInput,
    PhoneInput
  },
  mixins: [setLayout, scrollToTop, page],
  async fetch () {
    await this.getPageAction('contacts')
    this.setFieldAction({
      field: 'pageTitle',
      value: this.page.title
    })
  },
  data: () => ({
    center: [53.272154, 34.371165],
    ymapOptions: {
      zoom: 1
    },
    markers: [
      {
        lat: 53.209427,
        mag: 34.458332
      },
      {
        lat: 53.320060,
        mag: 34.280951
      }
    ],
    mapInit: false,
    sending: false,
    form: {
      name: '',
      message: ''
    }
  }),
  validations: {
    customer: {
      phone: {
        required,
        testPhone (value) {
          return this.$conf.form.PHONE_REGEXP.test(value)
        },
        touch: false
      }
    },
    form: {
      name: {
        required,
        touch: false
      },
      message: {
        required,
        minLength: minLength(2),
        touch: false
      }
    }
  },
  computed: {
    ...mapState({
      customer: state => state.checkout.customer
    }),
    phoneFormat () {
      return getPhoneFormat(this.companyPhone)
    },
    companyPhone () {
      return this.getSettingValueByKey('company_phone')
    }
  },
  created () {
    this.$set(this.form, 'name', this.customer.first_name)
  },
  methods: {
    ...mapActions('feedback', {
      setFeedbackFieldAction: 'setFormField',
      sendFeedbackMailAction: 'sendFeedbackMail'
    }),
    onClick (e) {
      this.coords = e.get('coords')
    },
    init () {
      this.mapInit = true
    },
    getSettingValueByKey (key) {
      const setting = this.$store.getters['settings/getSettingByKey'](key)
      return setting.value
    },
    async onSubmit () {
      this.sending = true
      await this.sendFeedbackMailAction({
        page: this.page.title,
        name: this.form.name,
        phone: this.customer.phone,
        message: this.form.message
      })
      this.$set(this.form, 'message', '')
      this.$v.$reset()
      this.sending = false
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
