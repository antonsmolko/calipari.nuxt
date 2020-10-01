import { action } from '@/helpers'

export const state = () => ({
  item: {}
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
      thenContent: response => commit('SET_FIELD', { field: 'item', value: response.data })
    })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
}
