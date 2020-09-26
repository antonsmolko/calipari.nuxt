<template lang="pug">
  div
    .tm-checkout__header
      span.uk-h2.uk-margin-remove {{ $lib.DELIVERY_CDEK_COURIER }}
      .uk-divider-small
    .tm-form.uk-margin-medium-top
      .uk-fieldset
        v-select(
          class="uk-margin"
          name="locality"
          labelName="Регион / город"
          icon="world"
          :error="localityIsInvalid && $v.locality.$dirty"
          @input="localityInput"
          @search="localitySearch"
          :isLoading="settlementsLoading"
          label="name"
          :value="!localityIsInvalid ? locality.name : ''"
          :placeholder="!localityIsInvalid ? '' : 'Введите населенный пункт'"
          :options="settlements"
          noOptionsText="Введите город")
        v-input(
          class="uk-margin"
          title="Улица"
          icon="location"
          :label="true"
          name="street"
          :value="street"
          module="checkout"
          :vField="$v.street"
          :vRules="{ required: true }"
          :trim="false"
          dispatchName="setField")
        v-input(
          class="uk-margin"
          title="Дом / Корпус / Строение / Квартира"
          icon="home"
          :label="true"
          name="apartments"
          :value="apartments"
          module="checkout"
          :vField="$v.apartments"
          :vRules="{ required: true }"
          :trim="false"
          dispatchName="setField")
        .uk-margin
          span Стоимость доставки:
          span.uk-text-emphasis.uk-margin-small-left.uk-text-large
            | {{ price ? deliveryFormatPrice : 'нет данных' }}
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

import VueSelect from 'vue-select'
import debounce from 'lodash/debounce'
import { getFormatPrice } from '@/components/helpers'

import VSelect from '@/components/form/Select/VSelect'
import VInput from '@/components/form/VInput'

const _debounce = debounce(fn => fn(), 500)

export default {
  name: 'CheckoutDeliveryCDEKCourier',
  components: {
    VSelect,
    VInput,
    VueSelect
  },
  data: () => ({
    searchedLocality: ''
  }),
  validations: {
    locality: {
      touch: false
    },
    street: {
      required,
      touch: false
    },
    apartments: {
      required,
      touch: false
    }
  },
  computed: {
    ...mapState({
      locality: state => state.checkout.locality,
      street: state => state.checkout.street,
      apartments: state => state.checkout.apartments,
      settlements: state => state.delivery.settlements,
      settlementsLoading: state => state.delivery.settlementsLoading,
      price: state => state.checkout.deliveryPrice
    }),
    ...mapGetters('checkout', [
      'localityIsInvalid'
    ]),
    deliveryFormatPrice () {
      return getFormatPrice(this.price)
    }
  },
  created () {
    this.setDeliveryPrice(this.locality)
    if (this.localityIsInvalid) {
      this.clearSettlements()
    }
  },
  methods: {
    ...mapActions({
      setDeliveryFieldsAction: 'delivery/setFields',
      setCheckoutFieldsAction: 'checkout/setFields',
      getSettlementsAction: 'delivery/getSettlements',
      getDeliveryPriceAction: 'delivery/getPrice'
    }),
    searchLocality () {
      if (this.searchedLocality) {
        this.getSettlementsAction({ query: this.searchedLocality })
      }
    },
    localitySearch (value) {
      this.searchedLocality = value
      _debounce(this.searchLocality)
    },
    localityInput (value) {
      value
        ? this.setLocality(value)
        : this.clearSettlements()
      this.$v.locality.$touch()
    },
    setLocality (value) {
      this.setCheckoutFieldsAction({ locality: value })
      this.setDeliveryPrice(value)
      this.setCheckoutFieldsAction({ pvz: null })
    },
    setDeliveryPrice (locality) {
      locality && Object.hasOwnProperty.call(locality, 'postCodeArray')
        ? this.getDeliveryPriceAction({ query: locality.postCodeArray })
        : this.setCheckoutFieldsAction({ deliveryPrice: 0 })
    },
    clearSettlements () {
      this.setDeliveryFieldsAction({ settlements: [] })
    }
  }
}
</script>
