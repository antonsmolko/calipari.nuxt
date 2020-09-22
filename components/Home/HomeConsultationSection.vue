<template lang="pug">
  section.tm-feedback.uk-section.uk-section-large.uk-section-primary
    .uk-container
      .tm-feedback__container(class="uk-child-width-1-2@m" data-uk-grid)
        div
          h2.uk-h2.uk-heading-small Получите бесплатную консультацию от&nbsp;дизайнера
        div
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
            .uk-inline.uk-margin.uk-margin-medium-top
              div(class="" data-uk-grid)
                p.uk-text-small(class="uk-width-expand@s")
                  | Нажимая кнопку «Отправить», я даю согласие на обработку персональных данных и соглашаюсь с&nbsp;
                  nuxt-link(to="/policy") политикой конфиденциальности
                div(class="uk-width-auto@s")
                  button.uk-button.uk-button-primary(type="submit" :disabled="$v.$invalid || sending")
                    | Отправить
                    i.tm-payment__pay-button-spinner.uk-margin-small-left.uk-animation-fade(
                      v-if="sending"
                      data-uk-spinner="ratio: 0.7")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { minLength, required } from 'vuelidate/lib/validators'
import VInput from '@/components/form/VInput'
import PhoneInput from '@/components/form/PhoneInput'
export default {
  name: 'HomeConsultationSection',
  components: { VInput, PhoneInput },
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    sending: false,
    form: {
      name: '',
      phone: ''
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
        minLength: minLength(2),
        touch: false
      }
    }
  },
  computed: {
    ...mapState({
      customer: state => state.checkout.customer
    })
  },
  created () {
    this.$set(this.form, 'name', this.customer.first_name)
  },
  methods: {
    ...mapActions({
      sendBackCallMailAction: 'feedback/sendBackCallMail'
    }),
    async onSubmit () {
      this.sending = true
      await this.sendBackCallMailAction({
        page: this.page,
        name: this.form.name,
        phone: this.customer.phone
      })
      this.sending = false
    }
  }
}
</script>
