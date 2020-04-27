export const state = () => ({
  items: [],
  totalPrice: null,
  version: 1
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  ADD_ITEM (state, payload) {
    state.items.push(payload)
  },
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
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  }
}

export const actions = {
  addItem ({ commit, dispatch }, item) {
    this.$auth.loggedIn
      ? dispatch('add', { item })
      : commit('ADD_ITEM', item)
  },
  setItemQty ({ commit, dispatch }, payload) {
    return this.$auth.loggedIn
      ? dispatch('setQty', payload)
      : commit('SET_ITEM_QTY', payload)
  },
  deleteItem ({ commit, dispatch }, id) {
    this.$auth.loggedIn
      ? dispatch('delete', id)
      : commit('DELETE_ITEM', id)
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  sync ({ state, commit }) {
    const token = this.$auth.getToken('local')
    const items = state.items
    const headers = { Authorization: token }

    return this.$api.$post('/carts/sync', { items }, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  add ({ commit }, item) {
    const token = this.$auth.getToken('local')
    const headers = { Authorization: token }

    return this.$api.$post('/carts/add', { item }, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  delete ({ commit }, id) {
    const token = this.$auth.getToken('local')
    const headers = { Authorization: token }

    return this.$api.$delete(`/carts/${id}`, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  setQty ({ commit }, payload) {
    const token = this.$auth.getToken('local')
    const headers = { Authorization: token }

    return this.$api.$post('/carts/set-qty', payload, { headers })
      .then(() => commit('SET_ITEM_QTY', payload))
  }
}

export const getters = {
  getQty: state => state.items.reduce((qty, item) => qty + item.qty, 0),
  totalPrice: (state, getters) => state.items.reduce((total, item) => total + getters.itemPrice(item), 0),
  itemPrice: (state, getters, rootState, rootGetters) => (item) => {
    const texture = rootGetters['textures/getItemById'](item.texture)
    const textureTax = texture.price
    const orderArea = Math.round(item.width * item.height / 100) / 100
    const price = Math.round(orderArea * textureTax / 100) * 100

    return price * item.qty
  }
}
