<template lang="pug">
    Page
        template(#main)
            main
                TopBar(
                    :title="pageTitle")
                    .uk-navbar-item
                        button.uk-close(type="button", data-uk-close, @click="onClose")
                SlideYDownTransition
                    section.uk-section(
                        v-if="responseData"
                        :class="{ 'uk-light': darkPeriod }"
                        data-uk-height-viewport="offset-top: true; offset-bottom: true")
                        .uk-container
                            .uk-flex.uk-flex-center
                                .uk-width-large(class="uk-width-1-1@m")
                                    h2.uk-h2.uk-margin-bottom Аккаунт
                                    .uk-grid.uk-grid-row-small(
                                        data-uk-grid class="uk-child-width-1-2@m")
                                        div
                                            VInput(
                                                title="Имя"
                                                :label="true"
                                                icon="user"
                                                name="name"
                                                :controlBtn="true"
                                                :controlBtnIcon="nameIsEdited ? 'check' : 'pencil'"
                                                :disabled="!nameIsEdited"
                                                :trim="false"
                                                :min="2"
                                                :value="account.name"
                                                :vField="$v.account.name"
                                                :vRules="{ required: true, minLength: true }"
                                                :vDelay="true"
                                                module="profile"
                                                dispatchName="setAccountFields"
                                                @control="nameControl")
                                        div
                                            VInput(
                                                title="Email"
                                                :label="true"
                                                icon="mail"
                                                name="email"
                                                :controlBtn="true"
                                                :controlBtnIcon="emailIsEdited ? 'check' : 'pencil'"
                                                :disabled="!emailIsEdited"
                                                :value="account.email"
                                                :vField="$v.account.email"
                                                :vRules="{ required: true, email: true }"
                                                :vDelay="true"
                                                module="profile"
                                                dispatchName="setAccountFields"
                                                @control="emailControl")
                                    .uk-margin-medium-top
                                        nuxt-link.uk-button.uk-button-primary(to="/reset-password") Сбросить пароль
                                    .uk-grid(data-uk-grid class="uk-child-width-1-2@m")
                                        div.uk-margin-large-top
                                            h2.uk-h2.uk-margin-bottom Личные данные
                                            form(@submit.prevent="handleCheckout")
                                                .uk-grid.uk-grid-small.uk-flex-column(data-uk-grid)
                                                    UkInput(
                                                        title="Фамилия"
                                                        name="last_name"
                                                        icon="last-name"
                                                        :value="fields.last_name"
                                                        @input="handleVInput")
                                                    UkInput(
                                                        title="Имя"
                                                        name="first_name"
                                                        icon="first-name"
                                                        :value="fields.first_name"
                                                        @input="handleVInput")
                                                    UkInput(
                                                        title="Отчество"
                                                        name="middle_name"
                                                        icon="middle-name"
                                                        :value="fields.middle_name"
                                                        @input="handleVInput")
                                                    UkInput(
                                                        title="Телефон"
                                                        name="phone"
                                                        icon="phone")
                                                        template(#input)
                                                            input(
                                                                class="uk-input uk-form-large uk-box-shadow-medium"
                                                                v-mask="$configForm.PHONE_MASK"
                                                                :value="fields.phone"
                                                                :tokens="token"
                                                                @focus="handleControlPhone"
                                                                @input="handleControlPhone"
                                                                :masked="true")
                                                        template(#notification)
                                                            .under-input-notice.uk-position-relative(
                                                                v-if="$v.fields.phone.$error")
                                                                InputNotificationPhone(
                                                                    v-if="!$v.fields.phone.testPhone"
                                                                    name="Телефон")
                                                    .uk-margin-medium-top(v-if="fromRoute")
                                                        button.uk-button.uk-button-primary(
                                                            :disabled="$v.fields.$invalid"
                                                            type="submit"
                                                            @click.prevent="onCheckout") Продолжить оформление заказа
                                        div.uk-margin-large-top
                                            h2.uk-h2.uk-margin-bottom Данные доставки
                                            .uk-grid.uk-grid-small.uk-flex-column(data-uk-grid)
                                                UkInput(
                                                    title="Почтовый индекс"
                                                    name="postal_code"
                                                    icon="hashtag"
                                                    :value="fields.postal_code"
                                                    @input="handleInput")
                                                VSelect(
                                                    name="locality"
                                                    labelName="Регион / город"
                                                    icon="world"
                                                    @input="localityInput"
                                                    @search="localitySearch"
                                                    :isLoading="settlementsLoading"
                                                    label="name"
                                                    :value="!localityIsInvalid ? fields.locality.name : ''"
                                                    :placeholder="!localityIsInvalid ? '' : 'Введите населенный пункт'"
                                                    :options="settlements"
                                                    noOptionsText="Введите город")
                                                UkInput(
                                                    title="Улица"
                                                    name="street"
                                                    icon="location"
                                                    :value="fields.street"
                                                    @input="handleInput")
                                                UkInput(
                                                    title="Дом / Строение / Корпус / Квартира"
                                                    name="apartments"
                                                    icon="home"
                                                    :value="fields.apartments"
                                                    @input="handleInput")
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { email, minLength, required } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import debounce from 'lodash/debounce'
import Page from '~/components/layout/Page'
import TopBar from '~/components/layout/TopBar'
import VInput from '~/components/form/VInput'
import UkInput from '~/components/form/Input/UkInput'
import VSelect from '~/components/form/Select/VSelect'
import { InputNotificationPhone } from '~/components/form/input-notifications'
import setLayout from '~/components/mixins/setLayout'
import scrollToTop from '~/components/mixins/scrollToTop'
const _debounce = debounce(value => value(), 300)
export default {
  name: 'Personal',
  middleware: 'auth',
  scrollToTop: true,
  components: {
    Page,
    TopBar,
    VInput,
    UkInput,
    VSelect,
    InputNotificationPhone
  },
  directives: { mask },
  mixins: [setLayout, scrollToTop],
  metaInfo () {
    return {
      title: this.pageTitle
    }
  },
  data: () => ({
    responseData: false,
    nameIsEdited: false,
    emailIsEdited: false,
    searchedLocality: '',
    token: {
      '#': { pattern: /\d/ }
    }
  }),
  validations: {
    account: {
      name: {
        required,
        minLength: minLength(2),
        touch: false
      },
      email: {
        required,
        email,
        touch: false
      }
    },
    fields: {
      first_name: {
        required,
        minLength: minLength(2),
        touch: false
      },
      last_name: {
        required,
        minLength: minLength(2),
        touch: false
      },
      middle_name: {
        required,
        minLength: minLength(2),
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
      account: state => state.profile.account,
      fields: state => state.profile.fields,
      settlements: state => state.delivery.settlements,
      settlementsLoading: state => state.delivery.settlementsLoading
    }),
    ...mapGetters('profile', [
      'localityIsInvalid'
    ]),
    fromRoute () {
      return this.$route.query.from
    }
  },
  created () {
    this.setFieldsAction({
      pageTitle: 'Персональные данные',
      topBar: true
    })
    if (this.$auth.user) {
      this.setAccountFieldsAction({
        name: this.$auth.user.name,
        email: this.$auth.user.email
      })
    }
    this.getDetailsAction()
      .then(() => (this.responseData = true))
  },
  methods: {
    ...mapActions({
      setProfileFieldsAction: 'profile/setFields',
      setAccountFieldsAction: 'profile/setAccountFields',
      updateAction: 'profile/update',
      getDetailsAction: 'profile/getDetails',
      updateAccountNameAction: 'profile/updateAccountName',
      updateAccountEmailAction: 'profile/updateAccountEmail',
      setDeliveryFieldsAction: 'delivery/setFields',
      getSettlementsAction: 'delivery/getSettlements',
      setCheckoutFieldsAction: 'checkout/setFields'
    }),
    handleVInput ({ field, value }) {
      this.setProfileFieldsAction({ [field]: value })
      this.$v.fields[field].$touch()
      _debounce(this.updateAction)
    },
    handleInput ({ field, value }) {
      this.setProfileFieldsAction({ [field]: value })
      _debounce(this.updateAction)
    },
    nameControl () {
      if (this.nameIsEdited) {
        this.updateAccountNameAction()
          .then(() => {
            this.$auth.fetchUser()
          })
      }
      this.nameIsEdited = !this.nameIsEdited
    },
    emailControl () {
      if (this.emailIsEdited) {
        this.updateAccountEmailAction()
      }
      this.emailIsEdited = !this.emailIsEdited
    },
    localitySearch (value) {
      this.searchedLocality = value
      _debounce(this.searchLocality)
    },
    searchLocality () {
      if (this.searchedLocality) {
        this.getSettlementsAction({ query: this.searchedLocality })
      }
    },
    localityInput (value) {
      value
        ? this.setLocality(value)
        : this.clearSettlements()
    },
    setLocality (locality) {
      if (this.isNotEqualByPreviousLocalityId(locality.id)) {
        this.setCheckoutFieldsAction({ pvzs: [], pvz: null })
        this.setDeliveryFieldsAction({ deliveryPrice: 0 })
      }
      this.setProfileFieldsAction({ locality })
      this.updateAction()
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
      this.$v.fields.phone.$touch()
      this.setProfileFieldsAction({ phone: maskedValue })
      if (maskedValue.match(this.$configForm.PHONE_REGEXP)) {
        _debounce(this.updateAction)
      }
    },
    isNotEqualByPreviousLocalityId (id) {
      return !this.localityIsInvalid
        ? this.fields.locality.id !== id
        : false
    },
    handleCheckout () {
      if (!this.$v.fields.$invalid) {
        this.onCheckout()
      }
    },
    onCheckout () {
      this.$router.push('/checkout/delivery')
    },
    onClose () {
      this.fromRoute
        ? this.$router.push(this.fromRoute)
        : window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/profile')
    }
  }
}
</script>
