export const state = () => ({
  item: {}
})

export const mutations = {
  SET_ITEM (state, payload) {
    state.item = payload
  }
}

export const actions = {
  create ({ commit }, hash) {
    return this.$api.$get(`/payment/create/${hash}`)
      .then(response => commit('SET_ITEM', response))
  }
}

export const getters = {
  payment: state => state.item
}
