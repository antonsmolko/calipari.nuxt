import omit from 'lodash/omit'
import { getFilterString } from '../helpers'
import { isFieldLengthValid } from '~/helpers'
import { form } from '~/plugins/config'

const isLengthValid = isFieldLengthValid(form.BASE_MIN_LENGTH)

export const state = () => ({
  enabled: false,
  invalid: false,
  createdAt: null,
  customer: {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: ''
  },
  delivery: null,
  street: null,
  locality: null,
  apartments: null,
  pvz: null,
  pickup: null,
  comment: '',
  deliveryPrice: 0,
  version: 1
})

export const mutations = {
  SET_CUSTOMER_FIELD (state, { field, value }) {
    state.customer[field] = value
  },
  SET_CUSTOMER_FIELDS (state, payload) {
    for (const field of Object.keys(state.customer)) {
      if (Object.hasOwnProperty.call(payload, field)) {
        state.customer[field] = payload[field]
      }
    }
  },
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  },
  ENABLE (state, { createdAt, price }) {
    state.enabled = true
    state.createdAt = createdAt
  }
}

export const actions = {
  setCustomerField ({ commit }, payload) {
    commit('SET_CUSTOMER_FIELD', payload)
  },
  setCustomerFields ({ commit }, payload) {
    commit('SET_CUSTOMER_FIELDS', payload)
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  enable ({ commit }, payload) {
    commit('ENABLE', payload)
  },
  orderConfirm ({ commit, getters }) {
    const headers = this.$auth.loggedIn
      ? { Authorization: this.$auth.getToken('local') }
      : {}

    return this.$api.$post('/orders', getters.orderDetails, { headers })
      .then(response => commit('notifications/ADD_ITEM', {
        status: 'success',
        message: `Поздравляем! Ваш заказ № ${response} создан. Мы скоро с Вами свяжемся для уточнения деталей.`
      }, { root: true }))
  }
}

export const getters = {
  deliveryIsInvalid: (state, getters, rootState, rootGetters) => {
    const delivery = rootGetters['delivery/getItemById'](state.delivery)

    if (delivery !== null) {
      switch (delivery.alias) {
        case 'cdek':
          return getters.localityIsInvalid || getters.pvzIsInvalid
        case 'cdek_courier':
          return getters.localityIsInvalid || getters.addressIsInvalid
        default:
          return false
      }
    }

    return true
  },
  addressIsInvalid: state => state.street === null || !isLengthValid(state.street) || state.apartments === null,
  personalIsInvalid: (state) => {
    return !isLengthValid(state.customer.first_name) ||
    !isLengthValid(state.customer.last_name) ||
    !isLengthValid(state.customer.middle_name) ||
    !state.customer.phone.match(form.PHONE_REGEXP)
  },
  localityIsInvalid: state => state.locality === null ||
    !Object.hasOwnProperty.call(state.locality, 'name') ||
    !Object.hasOwnProperty.call(state.locality, 'id'),
  pvzIsInvalid: state => state.pvz === null ||
    !Object.hasOwnProperty.call(state.pvz, 'name') ||
    !Object.hasOwnProperty.call(state.pvz, 'address') ||
    !Object.hasOwnProperty.call(state.pvz, 'code'),
  totalPrice: (state, getters, rootState, rootGetters) => {
    const cartPrice = rootGetters['cart/totalPrice']

    return cartPrice + state.deliveryPrice
  },
  orderDetails: (state, getters, rootState) => {
    return {
      userId: rootState.auth.user ? rootState.auth.user.id : null,
      items: JSON.stringify(rootState.cart.items.map((item) => {
        const filterString = getFilterString(item.filter)
        return { ...omit(item, ['id', 'imageName']), filterString }
      })),
      customer: JSON.stringify(state.customer),
      delivery: JSON.stringify(getters.deliveryDetails),
      comment: state.comment
    }
  },
  deliveryDetails: (state, getters, rootState, rootGetters) => {
    const delivery = rootGetters['delivery/getItemById'](state.delivery)

    let details = {}

    switch (delivery.alias) {
      case 'pickup':
        details = { pickup: state.pickup.value }
        break
      case 'cdek':
        details = {
          locality: state.locality,
          pvz: state.pvz,
          price: state.deliveryPrice
        }
        break
      case 'cdek_courier':
        details = {
          locality: state.locality,
          street: state.street,
          apartments: state.apartments,
          price: state.deliveryPrice
        }
        break
    }

    return { id: state.delivery, ...details }
  },
  localityString: (state, getters) => {
    const delivery = getters.deliveryDetails

    return delivery.locality
      ? `${delivery.locality.countryName}, ${delivery.locality.regionName}, ${delivery.locality.cityName}`
      : ''
  },
  fullName: state => `${state.customer.last_name} ${state.customer.first_name} ${state.customer.middle_name}`
}
