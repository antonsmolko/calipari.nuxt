<template lang="pug">
    div
        .tm-checkout__header
            span.uk-h2.uk-margin-remove {{ $lib.DELIVERY_CDEK }}
            .uk-divider-small
        .tm-form.uk-margin-medium-top
            .uk-fieldset
                VSelect(
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
                VSelect(
                    class="uk-margin"
                    name="pvz"
                    labelName="Пункт вывоза заказа"
                    icon="location"
                    :error="pvzIsInvalid && $v.pvz.$dirty"
                    :disabled="!pvzs.length"
                    @input="pvzsInput"
                    :isLoading="pvzsLoading"
                    label="address"
                    :value="pvz"
                    :placeholder="pvzs.length ? 'Выберите пункт вывоза заказа' : ''"
                    :options="pvzs"
                    noOptionsText="Нет совпадений с поиском")
                    template(#footer v-if="pvzsNotFound")
                        span.uk-text-small.uk-text-danger В данном н.п. пункте нет пунктов самовывоза CDEK
                .uk-margin
                    span Стоимость доставки:
                    span.uk-text-emphasis.uk-margin-small-left.uk-text-large
                        | {{ price ? deliveryFormatPrice : 'нет данных' }}
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import { getFormatPrice } from '~/components/helpers'

import VSelect from '~/components/form/Select/VSelect'
import VInput from '~/components/form/VInput'

const _debounce = debounce(f => f(), 500)

export default {
  name: 'CheckoutDeliveryTcCdek',
  components: { VInput, VSelect },
  validations: {
    locality: {
      touch: false
    },
    pvz: {
      touch: false
    }
  },
  data: () => ({
    searchedLocality: ''
  }),
  computed: {
    ...mapState({
      locality: state => state.checkout.locality,
      pvz: state => state.checkout.pvz,
      settlements: state => state.delivery.settlements,
      settlementsLoading: state => state.delivery.settlementsLoading,
      pvzs: state => state.delivery.pvzs,
      pvzsLoading: state => state.delivery.pvzsLoading,
      pvzsNotFound: state => state.delivery.pvzsNotFound,
      price: state => state.checkout.deliveryPrice
    }),
    ...mapGetters('checkout', [
      'localityIsInvalid',
      'pvzIsInvalid'
    ]),
    deliveryFormatPrice () {
      return getFormatPrice(this.price)
    }
  },
  watch: {
    pvzIsInvalid () {
      this.pvzIsInvalid
        ? this.clearPvzs()
        : this.setDeliveryPrice(this.pvz)
    }
  },
  created () {
    this.initCdekFields()
    this.setDeliveryPrice(this.pvz)
  },
  methods: {
    ...mapActions({
      setDeliveryFieldsAction: 'delivery/setFields',
      setCheckoutFieldsAction: 'checkout/setFields',
      getSettlementsAction: 'delivery/getSettlements',
      getPvzsAction: 'delivery/getPvzs',
      getDeliveryPriceAction: 'delivery/getPrice'
    }),
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
        ? this.changeLocality(value)
        : this.initCdekFields()
      this.$v.locality.$touch()
    },
    pvzsInput (value) {
      value
        ? this.setPvz(value)
        : this.clearPvzs()
      this.$v.pvz.$touch()
    },
    setPvz (value) {
      this.setCheckoutFieldsAction({ pvz: value })
      this.setDeliveryPrice(value)
    },
    setDeliveryPrice (pvzs) {
      pvzs && Object.hasOwnProperty.call(pvzs, 'postal_code')
        ? this.getDeliveryPriceAction({ query: pvzs.postal_code })
        : this.clearDeliveryPrice()
    },
    clearPvzs () {
      this.setDeliveryFieldsAction({ pvzs: [] })
      this.clearPvz()
      this.clearDeliveryPrice()
    },
    clearPvz () {
      this.setCheckoutFieldsAction({ pvz: null })
    },
    clearDeliveryPrice () {
      this.setCheckoutFieldsAction({ deliveryPrice: 0 })
    },
    initCdekFields () {
      this.setDeliveryFieldsAction({ settlements: [] })
      if (!this.localityIsInvalid) {
        this.getPvzsAction({ query: this.locality.id })
        this.setDeliveryFieldsAction({ pvzsNotFound: false })
      } else {
        this.setDeliveryFieldsAction({ pvzs: [] })
      }
    },
    changeLocality (value) {
      if (this.isNotEqualByPreviousLocalityId(value.id)) {
        this.setCheckoutFieldsAction({
          street: null,
          apartments: null
        })
        this.clearPvzs()
      }
      this.setCheckoutFieldsAction({ locality: value })
      this.getPvzsAction({ query: value.id })
    },
    isNotEqualByPreviousLocalityId (id) {
      return !this.localityIsInvalid
        ? this.locality.id !== id
        : false
    }
  }
}
</script>
