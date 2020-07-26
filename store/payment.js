export const state = () => ({
  item: {},
  status: null,
  orderNumber: null,
  info: {}
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
  create ({ commit }, { hash, paymentMethodId = null }) {
    return this.$api.$post('/payment/create', { hash, paymentMethodId })
      .then((response) => {
        commit('SET_FIELD', { field: 'status', value: response.status })
        commit('SET_ITEM', response.payment)
      })
  },
  confirmCompleted ({ commit }, token) {
    return this.$api.$get(`payment/completion-confirmation/${token}`)
      .then(response => commit('SET_FIELD', { field: 'orderNumber', value: response }))
  },
  getPaymentRespond ({ commit }, id) {
    return this.$api.$get(`payment/${id}`)
      .then((response) => {
        console.log(response)
        // if (response.paymentMethodId) {
        //   commit('checkout/SET_FIELD', {
        //     field: 'paymentMethodId',
        //     value: response.paymentMethodId
        //   }, { root: true })
        // }
        // return response
      })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
  payment: state => state.item
}
