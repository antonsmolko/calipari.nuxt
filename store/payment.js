export const state = () => ({
  item: {},
  status: null,
  orderNumber: null,
  info: {},
  selectedPaymentId: null
})

export const mutations = {
  SET_ITEM (state, payload) {
    state.item = payload
  },
  SET_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state, field)) {
      state[field] = value
    }
  }
}

export const actions = {
  create ({ commit }, number) {
    return this.$api.$get(`/orders/${number}/payment-create`)
      .then((response) => {
        commit('SET_FIELD', { field: 'status', value: response.status })
        commit('SET_ITEM', response.payment)
      })
  },
  createWithId ({ state }, orderNumber) {
    return this.$api.$get(`/orders/${orderNumber}/pay-with-id/${state.selectedPaymentId}`)
      .then(response => response)
  },
  confirmation ({ commit }, token) {
    return this.$api.$get(`orders/payment-confirmation/${token}`)
      .then(response => commit('SET_FIELD', { field: 'orderNumber', value: response }))
  },
  getPaymentRespond ({ commit }, id) {
    return this.$api.$get(`payment/${id}`)
      .then((response) => {
        if (response.payment) {
          commit('checkout/ADD_CARD', response.payment, { root: true })
        }
        return response
      })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
  payment: state => state.item
}
