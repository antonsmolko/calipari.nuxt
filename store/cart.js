import unionBy from 'lodash/unionBy'
import values from 'lodash/values'
import sum from 'lodash/sum'
import { refreshTokens } from '@/helpers'

export const state = () => ({
  items: [],
  totalPrice: null,
  version: 1
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  SET_ITEM_QTY (state, { id, qty }) {
    state.items.map((item) => {
      if (item.id === id) {
        item.details.qty = qty
      }
    })
  },
  DELETE_ITEM (state, id) {
    state.items = state.items.filter(item => item.id !== id)
  },
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  },
  UNION_ITEMS (state, payload) {
    state.items = unionBy(state.items, payload, 'id')
  }
}

export const actions = {
  async addItem ({ dispatch }, item) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    this.$auth.loggedIn
      ? dispatch('add', item)
      : dispatch('createItem', item)
  },
  setItemQty ({ commit }, { id, qty }) {
    return this.$api.$patch(`/cart-items/${id}`, { qty })
      .then(() => commit('SET_ITEM_QTY', { id, qty }))
  },
  async syncItems ({ state, dispatch }) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    const items = state.items.map(item => item.id)

    this.$auth.loggedIn
      ? dispatch('syncItemsAuth', items)
      : dispatch('sync', items)
  },
  syncItemsAuth ({ state, commit }, items) {
    const token = this.$auth.strategy.token.get()
    const headers = token ? { Authorization: token } : {}

    return this.$api.$post('/carts/sync', { items }, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  sync ({ state, commit }, items) {
    return this.$api.$post('/cart-items/sync', { items })
      .then(response => commit('SET_ITEMS', response))
  },
  add ({ commit }, item) {
    const token = this.$auth.strategy.token.get()
    const headers = { Authorization: token }

    return this.$api.$post('/carts/add', item, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  createItem ({ commit }, item) {
    return this.$api.$post('/cart-items', item)
      .then(response => commit('UNION_ITEMS', [response]))
  },
  deleteItem ({ commit }, id) {
    return this.$api.$delete(`/cart-items/${id}`)
      .then(response => commit('DELETE_ITEM', id))
  },
  getProject ({ commit }, key) {
    return this.$api.$post('/cart-items/get-project', { key })
      .then(response => commit('UNION_ITEMS', [response]))
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  }
}

export const getters = {
  qty: state => state.items.reduce((qty, item) => qty + item.details.qty, 0),
  totalPrice: (state, getters) => state.items.reduce((total, item) => total + getters.itemPrice(item.details), 0),
  itemPrice: (state, getters, rootState, rootGetters) => (itemDetails) => {
    const texture = rootGetters['textures/getItemById'](itemDetails.texture_id)
    const textureTax = texture.price
    const addedCosts = itemDetails.added_costs ? sum(values(itemDetails.added_costs)) : 0
    const orderArea = Math.round(itemDetails.width_cm * itemDetails.height_cm / 100) / 100
    const price = Math.round(orderArea * textureTax / 100) * 100

    return price * itemDetails.qty + addedCosts
  }
}
