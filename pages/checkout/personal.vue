<template lang="pug">
    CheckoutLayout(
        title="Персональные данные"
        :price="totalPrice"
        @confirm="onNext"
    )
        template(#content)
            SlideYDownTransition(v-show="sectionTitle")
                .uk-flex.uk-flex-center
                    .uk-width-xlarge(class="uk-width-1-1@m")
                        .tm-checkout__header
                            span.uk-h2.uk-margin-remove {{ sectionTitle }}
                            .uk-divider-small
                        .uk-margin-medium-top
                            form.tm-form(
                                @submit.prevent="onNext")
                                .uk-grid.uk-grid-row-collapse(data-uk-grid class="uk-child-width-1-2@m")
                                    .uk-margin-bottom
                                        VInput(
                                            class="uk-margin"
                                            title="Фамилия"
                                            :label="true"
                                            icon="last-name"
                                            name="last_name"
                                            :value="customer.last_name"
                                            module="checkout"
                                            :min="$configForm.BASE_MIN_LENGTH"
                                            :vField="$v.customer.last_name"
                                            :vRules="{ required: true, minLength: true }"
                                            :vDelay="true"
                                            dispatchName="setCustomerFields"
                                        )
                                        VInput(
                                            class="uk-margin"
                                            title="Имя"
                                            :label="true"
                                            icon="first-name"
                                            name="first_name"
                                            :value="customer.first_name"
                                            module="checkout"
                                            :min="$configForm.BASE_MIN_LENGTH"
                                            :vField="$v.customer.first_name"
                                            :vRules="{ required: true, minLength: true }"
                                            :vDelay="true"
                                            dispatchName="setCustomerFields"
                                        )
                                        VInput(
                                            class="uk-margin"
                                            title="Отчество"
                                            :label="true"
                                            icon="middle-name"
                                            name="middle_name"
                                            :value="customer.middle_name"
                                            module="checkout"
                                            :min="$configForm.BASE_MIN_LENGTH"
                                            :vField="$v.customer.middle_name"
                                            :vRules="{ required: true, minLength: true }"
                                            :vDelay="true"
                                            dispatchName="setCustomerFields"
                                        )
                                    div
                                        VInput(
                                            class="uk-margin"
                                            title="Email"
                                            :label="true"
                                            icon="mail"
                                            name="email"
                                            :value="customer.email"
                                            module="checkout"
                                            :vField="$v.customer.email"
                                            :vRules="{ required: true, email: true }"
                                            :vDelay="true"
                                            dispatchName="setCustomerFields"
                                        )
                                        UkInput(
                                            title="Телефон"
                                            name="phone"
                                            icon="phone"
                                        )
                                            template(#input)
                                                input(
                                                    class="uk-input uk-form-large uk-box-shadow-medium"
                                                    v-mask="$configForm.PHONE_MASK"
                                                    :value="customer.phone"
                                                    :tokens="token"
                                                    @focus="handleControlPhone"
                                                    @input="handleControlPhone"
                                                    :masked="true"
                                                )
                                            template(#notification)
                                                .under-input-notice.uk-position-relative(v-if="$v.customer.phone.$error")
                                                    InputNotificationPhone(v-if="!$v.customer.phone.testPhone" name="Телефон")
                                        .uk-inline.uk-margin.uk-margin-medium-top.uk-width-1-1(class="uk-visible@l")
                                            .uk-flex.uk-flex-between
                                                button.uk-button.uk-button-danger(
                                                    type="button"
                                                    @click.prevent="onPrev"
                                                ) Назад
                                                button.uk-button.uk-button-primary(
                                                    @click.prevent="onNext"
                                                    type="submit"
                                                    :disabled="$v.$invalid"
                                                ) Продолжить
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import VInput from '~/components/form/VInput'
import UkInput from '~/components/form/Input/UkInput'
import setLayout from '~/components/mixins/setLayout'
import CheckoutLayout from '~/components/Checkout/CheckoutLayout'
import { InputNotificationPhone } from '~/components/form/input-notifications'

export default {
  name: 'Personal',
  components: {
    CheckoutLayout,
    VInput,
    UkInput,
    InputNotificationPhone
  },
  middleware: ['guest'],
  directives: { mask },
  mixins: [setLayout],
  metaInfo () {
    return {
      title: 'Оформление заказа. Персональная информация'
    }
  },
  data: () => ({
    sectionTitle: null,
    token: {
      '#': { pattern: /\d/ }
    }
  }),
  validations: {
    customer: {
      first_name: {
        required,
        minLength: minLength(2),
        touch: false
      },
      middle_name: {
        required,
        minLength: minLength(2),
        touch: false
      },
      last_name: {
        required,
        minLength: minLength(2),
        touch: false
      },
      email: {
        required,
        email,
        touch: false
      },
      phone: {
        required,
        testPhone (value) {
          return this.$configForm.PHONE_REGEXP.test(value)
        },
        touch: false
      }
    }
  },
  computed: {
    ...mapState({
      customer: state => state.checkout.customer
    }),
    ...mapGetters({
      totalPrice: 'cart/totalPrice'
    }),
    isInvalid () {
      return this.$v.$invalid
    }
  },
  watch: {
    isInvalid () {
      this.setCheckoutInvalid(this.isInvalid)
    }
  },
  created () {
    this.setCheckoutInvalid(this.isInvalid)
    this.setSectionTitle()
    this.setFieldsAction({ pageTitle: 'Оформление заказа. Персональная информация' })
  },
  methods: {
    ...mapActions({
      setCheckoutFieldsAction: 'checkout/setFields',
      setCustomerFieldsAction: 'checkout/setCustomerFields',
      getAuthUserDetailsAction: 'profile/getDetails',
      setCheckoutCustomerFieldsAction: 'checkout/setCustomerFields',
      setProfileFieldsAction: 'profile/setFields',
      updateAction: 'profile/update'
    }),
    setSectionTitle () {
      this.sectionTitle = !this.$v.$dirty && !this.$v.$invalid
        ? 'Подтвердите свои персональные данные'
        : 'Введите свои персональные данные'
    },
    onPrev () {
      this.$router.push('/checkout/invite')
    },
    onNext () {
      this.$router.push('/checkout/delivery')
    },
    setCheckoutInvalid (value) {
      this.setCheckoutFieldsAction({ invalid: value })
    },
    handleControlPhone (e) {
      const input = e.target
      const value = input.value
      const startWith = this.$configForm.PHONE_START_WITH
      let maskedValue = value
      if ((value.length < 4) || !value.startsWith(startWith)) {
        input.value = startWith
        maskedValue = startWith
      }
      this.$v.customer.phone.$touch()
      this.setCustomerFieldsAction({ phone: maskedValue })
    }
  }
}
</script>
