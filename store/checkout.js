import omit from 'lodash/omit'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import { isFieldLengthValid, refreshTokens } from '../helpers'
import { form } from '~/plugins/config'
const isCardEqual = (object, other) => isEqual(omit(object, 'id'), omit(other, 'id'))
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
  defaultCreditCard: null,
  cards: [],
  version: 2
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
  SET_FIELD (state, { field, value }) {
    state[field] = value
  },
  ENABLE (state, { createdAt, price }) {
    state.enabled = true
    state.createdAt = createdAt
  },
  ADD_CARD (state, payment) {
    state.cards = uniqWith([...state.cards, payment], isCardEqual)
  },
  DELETE_CARD (state, id) {
    state.cards = state.cards.filter(payment => payment.id !== id)
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
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  },
  enable ({ commit }, payload) {
    commit('ENABLE', payload)
  },
  orderConfirm ({ commit, getters }) {
    const headers = this.$auth.loggedIn
      ? { Authorization: this.$auth.strategy.token.get() }
      : {}

    return this.$api.$post('/orders', getters.orderDetails, { headers })
      .then(response => commit('notifications/ADD_ITEM', {
        status: 'success',
        message: `Поздравляем! Ваш заказ № ${response} создан. Мы скоро с Вами свяжемся для уточнения деталей.`
      }, { root: true }))
  },
  async syncCards ({ state, commit }) {
    if (!this.$auth.loggedIn) {
      return
    }
    await refreshTokens(this.$auth)
    const token = this.$auth.strategy.token.get()
    return this.$api.$post('/profile/cards/sync', state.cards, {
      headers: { Authorization: token }
    })
      .then(response => commit('SET_FIELD', { field: 'cards', value: response }))
  },
  async deleteCard ({ commit, dispatch }, id) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    this.$auth.loggedIn
      ? dispatch('deleteCardAuth', id)
      : commit('DELETE_CARD', id)
  },
  deleteCardAuth ({ commit }, id) {
    const token = this.$auth.strategy.token.get()
    const headers = { Authorization: token }

    return this.$api.$get(`/profile/cards/${id}/remove`, { headers })
      .then(response => commit('DELETE_CARD', id))
  }
}

export const getters = {
  deliveryIsInvalid: (state, getters, rootState, rootGetters) => {
    const delivery = rootGetters['delivery/getItemById'](state.delivery)

    if (delivery !== null && delivery) {
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
      items: rootState.cart.items.map(item => item.id),
      customer: JSON.stringify(state.customer),
      delivery: JSON.stringify(getters.deliveryDetails),
      comment: state.comment
    }
  },
  deliveryDetails: (state, getters, rootState, rootGetters) => {
    const delivery = rootGetters['delivery/getItemById'](state.delivery)

    let details = {}

    if (delivery !== null && delivery) {
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
