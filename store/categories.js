import action from './mixins/action'

export const state = () => ({
  item: {},
  items: []
})

export const mutations = {
  SET_ITEM (state, payload) {
    state.item = payload
  },
  SET_ITEMS (state, payload) {
    state.items = payload
  }
}

export const actions = {
  getItemByAlias ({ commit }, alias) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/categories/${alias}`,
      thenContent: response => commit('SET_ITEM', response.data)
    })
  },
  getItems ({ commit }) {
    return action(this.$api, 'get', commit, {
      url: '/catalog/categories',
      thenContent: (response) => {
        commit('SET_ITEMS', response.data)
      }
    })
  }
}

export const getters = {
  getItemsByType: state => type => state.items.filter(item => item.type === type)
}
