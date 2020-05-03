import action from './mixins/action'

export const state = () => ({
  item: {},
  items: [],
  tags: []
})

export const mutations = {
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
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
  },
  getItemTags ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/categories/${id}/tags`,
      thenContent: response => commit('SET_FIELD', { field: 'tags', value: response.data })
    })
  }
}

export const getters = {
  getItemByAlias: state => alias => state.items.find(item => item.alias === alias),
  getItemsByType: state => type => state.items.filter(item => item.type === type)
}
