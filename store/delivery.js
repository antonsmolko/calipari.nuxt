export const state = () => ({
  items: [],
  settlements: [],
  settlementsLoading: false,
  pvzs: [],
  pvzsLoading: false,
  pvzsNotFound: false
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  }
}

export const actions = {
  getItems ({ commit }) {
    return this.$api.$get('/delivery')
      .then(response => commit('SET_ITEMS', response))
  },
  getSettlements ({ commit }, payload) {
    commit('SET_FIELDS', { settlementsLoading: true })

    return this.$api.$post('/cdek/settlements', payload)
      .then((response) => {
        commit('SET_FIELDS', {
          settlements: response,
          settlementsLoading: false
        })
      })
  },
  getPvzs ({ dispatch, commit }, payload) {
    commit('SET_FIELDS', { pvzsLoading: true })

    return this.$api.$post('/cdek/pvzs', payload)
      .then((response) => {
        const value = response.length ? response : []
        commit('SET_FIELDS', {
          pvzs: value,
          pvzsNotFound: !value.length,
          pvzsLoading: false
        })
      })
  },
  getPrice ({ commit }, query) {
    return this.$api.$post('/cdek/price', query)
      .then(response => commit('checkout/SET_FIELDS', { deliveryPrice: response }, { root: true }))
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  }
}

export const getters = {
  defaultItemId: state => state.items.length > 0 ? state.items[0].id : null,
  getItemById: state => id => state.items.find(item => item.id === id)
}
