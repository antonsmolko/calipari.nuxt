import unionBy from 'lodash/unionBy'
import union from 'lodash/union'
import sumBy from 'lodash/sumBy'
import values from 'lodash/values'
import sum from 'lodash/sum'
import map from 'lodash/map'
import filter from 'lodash/filter'
import {
  refreshTokens,
  getDiscountPrice,
  getItemPrice,
  action
} from '@/helpers'

export const state = () => ({
  items: [],
  saleKeys: [],
  sales: [],
  totalPrice: null,
  version: 1
})

export const mutations = {
  SET_ITEM_QTY (state, { id, qty }) {
    state.items.map((item) => {
      if (item.id === id) {
        item.qty = qty
      }
    })
  },
  DELETE_ITEM (state, id) {
    state.items = state.items.filter(item => item.id !== id)
  },
  SET_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state, field)) {
      state[field] = value
    }
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
  },
  UNION_SALE_KEYS (state, payload) {
    state.saleKeys = union(state.saleKeys, payload)
  },
  DELETE_SALE (state, id) {
    state.saleKeys = state.saleKeys.filter(item => item !== id)
  }
}

export const actions = {
  async addItem ({ dispatch }, item) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    return this.$auth.loggedIn
      ? dispatch('addItemWithAuth', item)
      : dispatch('createItem', item)
  },
  setItemQty ({ commit }, { id, qty }) {
    return this.$api.$patch(`/cart-items/${id}`, { qty })
      .then(() => commit('SET_ITEM_QTY', { id, qty }))
  },
  async sync ({ state, dispatch }) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }

    const itemKeys = map(state.items, 'id')
    const saleKeys = state.saleKeys

    this.$auth.loggedIn
      ? dispatch('authSync', { itemKeys, saleKeys })
      : dispatch('guestSync')
  },
  authSync ({ state, commit }, payload) {
    const token = this.$auth.strategy.token.get()
    const headers = token ? { Authorization: token } : {}

    return this.$api.$post('/carts/sync', payload, { headers })
      .then((response) => {
        commit('SET_FIELD', { field: 'items', value: response.items })
        commit('SET_FIELD', { field: 'saleKeys', value: response.sale_keys })
      })
  },
  guestSync ({ state, dispatch }) {
    return Promise.all([
      dispatch('guestItemsSync', map(state.items, 'id')),
      dispatch('guestSalesSync', state.saleKeys)
    ])
  },
  guestItemsSync ({ commit }, items) {
    return this.$api.$post('/cart-items/sync', { items })
      .then(response => commit('SET_FIELD', { field: 'items', value: response }))
  },
  guestSalesSync ({ commit }, keys) {
    return this.$api.$post('/sales/sync', { keys })
      .then(response => commit('SET_FIELD', { field: 'saleKeys', value: response }))
  },
  addItemWithAuth ({ commit }, item) {
    const token = this.$auth.strategy.token.get()
    const headers = { Authorization: token }

    return action(this.$api, 'post', commit, {
      url: '/carts/add-item',
      payload: item,
      config: { headers },
      thenContent: response => commit('SET_FIELD', { field: 'items', value: response.data })
    })
  },
  createItem ({ commit }, item) {
    return action(this.$api, 'post', commit, {
      url: '/cart-items',
      payload: item,
      thenContent: response => commit('UNION_ITEMS', [response.data])
    })
  },
  deleteItem ({ commit }, id) {
    return this.$api.$delete(`/cart-items/${id}`)
      .then(response => commit('DELETE_ITEM', id))
  },
  getProject ({ commit }, key) {
    return this.$api.$post('/cart-items/get-project', { key })
      .then(response => commit('UNION_ITEMS', [response]))
  },
  async addSale ({ commit, dispatch }, id) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    return this.$auth.loggedIn
      ? dispatch('addSaleWithAuth', id)
      : commit('UNION_SALE_KEYS', [id])
  },
  addSaleWithAuth ({ commit }, id) {
    const token = this.$auth.strategy.token.get()
    const headers = { Authorization: token }

    return this.$api.$get(`/carts/add-sale/${id}`, { headers })
      .then((response) => {
        commit('SET_FIELD', { field: 'saleKeys', value: map(response, 'id') })
        commit('SET_FIELD', { field: 'sales', value: response })
      })
  },
  async deleteSale ({ state, commit, dispatch }, id) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }

    this.$auth.loggedIn
      ? dispatch('detachSale', id)
      : commit('DELETE_SALE', id)

    return state.saleKeys.length
      ? dispatch('getCartSales')
      : commit('SET_FIELD', { field: 'sales', value: [] })
  },
  detachSale ({ commit }, id) {
    const token = this.$auth.strategy.token.get()
    const headers = { Authorization: token }

    return this.$api.$get(`/carts/detach-sale/${id}`, { headers })
      .then((response) => {
        commit('SET_FIELD', { field: 'saleKeys', value: map(response, 'id') })
        commit('SET_FIELD', { field: 'sales', value: response })
      })
  },
  getCartSales ({ state, commit }) {
    return action(this.$api, 'post', commit, {
      url: '/sales/get-by-keys',
      payload: { keys: state.saleKeys },
      thenContent: (response) => {
        commit('SET_FIELD', { field: 'saleKeys', value: map(response.data, 'id') })
        commit('SET_FIELD', { field: 'sales', value: response.data })
      }
    })
  },
  getAvailableCartSales ({ state, commit }) {
    return action(this.$api, 'post', commit, {
      url: '/sales/get-available-by-keys',
      payload: { keys: state.saleKeys },
      thenContent: response => commit('SET_FIELD', { field: 'sales', value: response.data })
    })
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
  qty: (state) => {
    const cartItemsCount = sumBy(state.items, item => item.qty)
    const salesCount = state.saleKeys.length

    return cartItemsCount + salesCount
  },
  totalPrice: (state, getters) => {
    const cartItemsTotalPrice = sumBy(state.items, item => getters.itemPrice(item))
    const availableSales = filter(state.sales, 'is_available')
    const salesTotalPrice = sumBy(availableSales, item => getDiscountPrice(item.old_price, item.discount))

    return cartItemsTotalPrice + salesTotalPrice
  },
  itemPrice: (state, getters, rootState, rootGetters) => (item) => {
    const texture = rootGetters['textures/getItemById'](item.texture_id)
    const texturePrice = texture.price
    const addedCosts = item.added_costs ? sum(values(item.added_costs)) : 0
    const price = getItemPrice(item.width, item.height, texturePrice)

    return price * item.qty + addedCosts
  },
  checkSaleInCart: state => id => state.saleKeys.includes(id)
}
