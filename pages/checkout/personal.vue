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
                                        VInput(
                                            class="uk-margin"
                                            title="Телефон"
                                            :label="true"
                                            icon="receiver"
                                            type="phone"
                                            name="phone"
                                            :value="customer.phone"
                                            module="checkout"
                                            :vField="$v.customer.phone"
                                            :vRules="{ required: true }"
                                            :vDelay="true"
                                            dispatchName="setCustomerFields"
                                        )
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
import VInput from '~/components/form/VInput'
import setLayout from '~/components/mixins/setLayout'
import CheckoutLayout from '~/components/Checkout/CheckoutLayout'

export default {
  name: 'Personal',
  components: {
    CheckoutLayout,
    VInput
  },
  middleware: ['guest'],
  mixins: [setLayout],
  metaInfo () {
    return {
      title: 'Оформление заказа. Персональная информация'
    }
  },
  data: () => ({
    sectionTitle: null
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
    }
  }
}
</script>
