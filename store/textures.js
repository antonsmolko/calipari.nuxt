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
    return this.$api.$get('/manager/textures')
      .then(response => commit('SET_ITEMS', response))
  },
  clearItems ({ commit }) {
    commit('SET_ITEMS', [])
  }
}

export const getters = {
  getItemById: state => id => state.items.find(item => item.id === id)
}
