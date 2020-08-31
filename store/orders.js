export const state = () => ({
  item: null,
  items: []
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  SET_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state, field)) {
      state[field] = value
    }
  },
  UPDATE_ORDERS (state, payload) {
    state.items = state.items.map((order) => {
      return order.number === payload.number ? payload : order
    })
  }
}

export const actions = {
  getItems ({ commit }) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$get('/profile/orders', {
      headers: { Authorization: token }
    })
      .then(response => commit('SET_ITEMS', response))
  },
  getItem ({ commit }, number) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$get(`/profile/orders/${number}`, {
      headers: { Authorization: token }
    })
      .then(response => commit('SET_FIELD', { field: 'item', value: response }))
  },
  getItemByHash ({ commit }, hash) {
    return this.$api.$get(`/orders/${hash}`)
      .then((response) => {
        commit('SET_FIELD', { field: 'item', value: response.order })
        return response
      })
  },
  cancel ({ commit }, number) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$get(`/profile/orders/${number}/cancel`, {
      headers: { Authorization: token }
    })
      .then((response) => {
        commit('SET_FIELD', { field: 'item', value: response })
        commit('UPDATE_ORDERS', response)
      })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
}
