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
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  },
  getItemByAlias ({ commit }, alias) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/categories/${alias}`,
      thenContent: response => commit('SET_FIELD', { field: 'item', value: response.data })
    })
  },
  getItems ({ commit }) {
    return action(this.$api, 'get', commit, {
      url: '/catalog/categories',
      thenContent: response => commit('SET_FIELD', { field: 'items', value: response.data })
    })
  }
}

export const getters = {
  getItemByAlias: state => alias => state.items.find(item => item.alias === alias),
  getItemsByType: state => type => state.items.filter(item => item.type === type)
}
