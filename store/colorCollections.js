import action from './mixins/action'

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
      url: `/catalog/color-collections/${collection}`,
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
  mainImage: state => state.item ? state.item.images.find(image => image.id === state.item.main_image_id) : null
}
