export const state = () => ({
  items: [],
  version: 1
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  TOGGLE (state, id) {
    state.items.includes(id)
      ? state.items = state.items.filter(item => item !== id)
      : state.items.push(id)
  }
}

export const actions = {
  toggle ({ commit, dispatch }, id) {
    this.$auth.loggedIn
      ? dispatch('toggleAuth', id)
      : commit('TOGGLE', id)
  },
  sync ({ state, commit }) {
    const token = this.$auth.token.get()
    const items = state.items
    const headers = { Authorization: token }

    return this.$api.$post('/profile/wishlist/sync', { items }, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  toggleAuth ({ commit }, id) {
    const token = this.$auth.token.get()
    const headers = { Authorization: token }

    return this.$api.$get(`/profile/wishlist/${id}/toggle`, { headers })
      .then(response => commit('SET_ITEMS', response))
  }
}

export const getters = {
  liked: state => id => state.items.includes(id),
  qty: state => state.items.length
}
