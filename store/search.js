export const state = () => ({
  searched: [],
  selected: null,
  loading: false
})

export const mutations = {
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  },
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
  getSearchQuery ({ commit }, query) {
    commit('SET_FIELD', { field: 'loading', value: true })

    return this.$api.$get(`/search/${query}`)
      .then((response) => {
        commit('SET_FIELDS', {
          searched: response,
          loading: false
        })
      })
  }
}

export const getters = {
}
