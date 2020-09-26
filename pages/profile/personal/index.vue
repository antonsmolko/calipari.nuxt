<template lang="pug">
  page
    template(#main)
      main
        top-bar(
          :title="pageTitle")
          .uk-navbar-item
            button.uk-close(type="button", data-uk-icon="icon: close; ratio: 1.1", @click="onClose")
        slide-y-down-transition
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
                      v-input(
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
                        dispatchName="setAccountField"
                        @control="nameControl")
                    div
                      v-input(
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
                        dispatchName="setAccountField"
                        @control="emailControl")
                  .uk-margin-medium-top
                    nuxt-link.uk-button.uk-button-primary(to="/reset-password") Сбросить пароль
                  .uk-grid(data-uk-grid class="uk-child-width-1-2@m")
                    div.uk-margin-large-top
                      h2.uk-h2.uk-margin-bottom Личные данные
                      form(@submit.prevent="handleCheckout")
                        .uk-grid.uk-grid-small.uk-flex-column(data-uk-grid)
                          uk-input(
                            title="Фамилия"
                            name="last_name"
                            icon="last-name"
                            :value="form.last_name"
                            @input="handleVInput")
                          uk-input(
                            title="Имя"
                            name="first_name"
                            icon="first-name"
                            :value="form.first_name"
                            @input="handleVInput")
                          uk-input(
                            title="Отчество"
                            name="middle_name"
                            icon="middle-name"
                            :value="form.middle_name"
                            @input="handleVInput")
                          phone-input(
                            :value="form.phone"
                            :vDelay="true"
                            :vField="$v.form.phone"
                            :vRules="{ phone: true }"
                            :module="storeModule")
                          .uk-margin-medium-top(v-if="fromRoute")
                            button.uk-button.uk-button-primary(
                              :disabled="$v.form.$invalid"
                              type="submit"
                              @click.prevent="onCheckout") Продолжить оформление заказа
                    div.uk-margin-large-top
                      h2.uk-h2.uk-margin-bottom Данные доставки
                      .uk-grid.uk-grid-small.uk-flex-column(data-uk-grid)
                        uk-input(
                          title="Почтовый индекс"
                          name="postal_code"
                          icon="hashtag"
                          :value="form.postal_code"
                          @input="handleInput")
                        v-select(
                          name="locality"
                          labelName="Регион / город"
                          icon="world"
                          @input="localityInput"
                          @search="localitySearch"
                          :isLoading="settlementsLoading"
                          label="name"
                          :value="!localityIsInvalid ? form.locality.name : ''"
                          :placeholder="!localityIsInvalid ? '' : 'Введите населенный пункт'"
                          :options="settlements"
                          noOptionsText="Введите город")
                        uk-input(
                          title="Улица"
                          name="street"
                          icon="location"
                          :value="form.street"
                          @input="handleInput")
                        uk-input(
                          title="Дом / Строение / Корпус / Квартира"
                          name="apartments"
                          icon="home"
                          :value="form.apartments"
                          @input="handleInput")
                  .uk-margin-large-top(v-if="cards.length")
                    h2.uk-h2.uk-margin-bottom Привязанные карты
                    .uk-grid(data-uk-grid class="uk-child-width-1-2@m")
                      payment-card(
                        v-for="card in cards"
                        :key="card.id"
                        :item="card"
                        :selectable="false"
                        @delete="handleCardDelete")
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { email, minLength, required } from 'vuelidate/lib/validators'
import debounce from 'lodash/debounce'
import Page from '@/components/layout/Page'
import PaymentCard from '@/components/Payment/Cards/PaymentCard'
import TopBar from '@/components/layout/TopBar'
import VInput from '@/components/form/VInput'
import UkInput from '@/components/form/Input/UkInput'
import PhoneInput from '@/components/form/PhoneInput'
import VSelect from '@/components/form/Select/VSelect'
import setLayout from '@/components/mixins/setLayout'
import scrollToTop from '@/components/mixins/scrollToTop'
import syncProfile from '@/components/mixins/syncProfile'
import noindexPageMeta from '@/components/mixins/noindexPageMeta'

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
    PhoneInput,
    PaymentCard
  },
  mixins: [
    setLayout,
    scrollToTop,
    syncProfile,
    noindexPageMeta
  ],
  data: () => ({
    responseData: false,
    nameIsEdited: false,
    emailIsEdited: false,
    searchedLocality: '',
    storeModule: 'profile',
    inputAction: 'setField'
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
    form: {
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
          return this.$conf.form.PHONE_REGEXP.test(value)
        },
        touch: false
      }
    }
  },
  computed: {
    ...mapState({
      account: state => state.profile.account,
      form: state => state.profile.form,
      settlements: state => state.delivery.settlements,
      settlementsLoading: state => state.delivery.settlementsLoading,
      cards: state => state.checkout.cards
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
      .then(() => {
        this.syncCardsAction()
        this.responseData = true
      })
  },
  methods: {
    ...mapActions({
      setProfileFieldAction: 'profile/setFormField',
      setAccountFieldsAction: 'profile/setAccountFields',
      updateAction: 'profile/update',
      getDetailsAction: 'profile/getDetails',
      updateAccountNameAction: 'profile/updateAccountName',
      updateAccountEmailAction: 'profile/updateAccountEmail',
      setDeliveryFieldsAction: 'delivery/setFields',
      getSettlementsAction: 'delivery/getSettlements',
      setCheckoutFieldsAction: 'checkout/setFields',
      deleteCardAction: 'checkout/deleteCard',
      syncCardsAction: 'checkout/syncCards'
    }),
    handleVInput ({ field, value }) {
      this.setProfileFieldAction({ field, value })
      this.$v.form[field].$touch()
      _debounce(this.updateAction)
    },
    handleInput ({ field, value }) {
      this.setProfileFieldAction({ field, value })
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
        this.setCheckoutFieldsAction({
          pvzs: [],
          pvz: null
        })
        this.setDeliveryFieldsAction({ deliveryPrice: 0 })
      }
      this.setProfileFieldAction({ field: 'locality', value: locality })
      this.updateAction()
    },
    isNotEqualByPreviousLocalityId (id) {
      return !this.localityIsInvalid
        ? this.form.locality.id !== id
        : false
    },
    handleCheckout () {
      if (!this.$v.form.$invalid) {
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
    },
    handleCardDelete (id) {
      const modal = this.$uikit.modal

      modal.labels = {
        ok: 'Удалить',
        cancel: 'Отменить'
      }

      modal.confirm('<p class="tm-text-medium">Вы уверены что хотите удалить карту?</p>')
        .then(() => this.deleteCardAction(id))
    }
  }
}
</script>
