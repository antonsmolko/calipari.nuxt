import { action } from '@/helpers'

export const state = () => ({
  item: {},
  items: []
})

export const mutations = {
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
  getItems ({ commit }) {
    return action(this.$api, 'get', commit, {
      url: '/catalog/art-collections',
      thenContent: ({ data }) => {
        commit('SET_FIELD', { field: 'items', value: data })
        return data
      }
    })
  },
  getItem ({ commit }, collection) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/art-collections/${collection}`,
      thenContent: ({ data }) => commit('SET_FIELD', { field: 'item', value: data })
    })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
}
