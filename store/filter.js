import action from './mixins/action'

export const state = () => ({
  topics: [],
  colors: [],
  interiors: [],
  tags: []
})

export const mutations = {
  SET_FILTERS (state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      state[key] = value
    }
  },
  CLEAR_FILTER (state) {
    for (const key of Object.keys(state)) {
      state[key] = []
    }
  }
}

export const actions = {
  getFiltersByCategory ({ commit }, id) {
    return action(this.$axios, 'get', commit, {
      url: `/catalog/categories/${id}/filters`,
      thenContent: response => commit('SET_FILTERS', response.data)
    })
  },
  getFiltersByImages ({ commit }, payload) {
    return action(this.$axios, 'post', commit, {
      url: '/catalog/categories/filters/wish-list',
      payload,
      thenContent: response => commit('SET_FILTERS', response.data)
    })
  },
  clearFilter ({ commit }) {
    commit('CLEAR_FILTER')
  }
}

export const getters = {
}
