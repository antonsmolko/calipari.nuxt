export const state = () => ({
  items: []
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  }
}

export const actions = {
  getItems ({ commit }) {
    return this.$api.$get('/purchase-steps')
      .then(response => commit('SET_ITEMS', response))
  }
}

export const getters = {
}
