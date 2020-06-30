import { refreshTokens } from '~/helpers'

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
  async toggle ({ commit, dispatch }, id) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    this.$auth.loggedIn
      ? dispatch('toggleAuth', id)
      : commit('TOGGLE', id)
  },
  async sync ({ state, commit }) {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    const token = this.$auth.strategy.token.get()
    const likes = state.items
    const headers = token ? { Authorization: token } : {}

    return this.$api.$post('/profile/wishlist/sync', { likes }, { headers })
      .then(response => commit('SET_ITEMS', response))
  },
  toggleAuth ({ commit }, id) {
    const token = this.$auth.strategy.token.get()
    const headers = { Authorization: token }

    return this.$api.$get(`/profile/wishlist/${id}/toggle`, { headers })
      .then(response => commit('SET_ITEMS', response))
  }
}

export const getters = {
  liked: state => id => state.items.includes(id),
  qty: state => state.items.length
}
