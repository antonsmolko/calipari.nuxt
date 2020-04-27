export const state = () => ({
  items: {}
})

export const mutations = {
  SET_ITEMS (state, payload) {
    payload.forEach((item) => {
      const { alias, settings } = item
      state.items[alias] = settings
    })
  }
}

export const actions = {
  getItems ({ commit }) {
    return this.$api.$get('/settings')
      .then(response => commit('SET_ITEMS', response))
  }
}

export const getters = {
  defaultPickup: state => state.items.pickups[0]
}
