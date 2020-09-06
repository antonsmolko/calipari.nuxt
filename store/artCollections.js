import { action } from './mixins/action'

export const state = () => ({
  item: null
})

export const mutations = {
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
  getItem ({ commit }, collection) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/art-collections/${collection}`,
      thenContent: (response) => {
        commit('SET_FIELD', { field: 'item', value: response.data })
        return response.data
      }
    })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
}
