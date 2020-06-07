import head from 'lodash/head'
export const state = () => ({
  purchaseSteps: [],
  interiors: [],
  currentInteriorIndex: 0,
  currentSlideIndex: 0,
  currentInterior: null,
  currentSlide: null
})

export const mutations = {
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = typeof value === 'object'
          ? Object.assign({}, value)
          : value
      }
    }
  },
  SET_FIELD (state, { field, value }) {
    state[field] = value
  },
  SET_ITEMS (state, payload) {
    state.items = payload
  }
}

export const actions = {
  getPurchaseSteps ({ commit }) {
    return this.$api.$get('/home-purchase-steps')
      .then(response => commit('SET_FIELD', { field: 'purchaseSteps', value: response }))
  },
  getInteriors ({ commit }) {
    return this.$api.$get('/home-interiors')
      .then(response => commit('SET_FIELD', { field: 'interiors', value: response }))
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
  firstInterior: state => head(state.interiors)
}
