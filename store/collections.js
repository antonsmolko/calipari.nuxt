import action from './mixins/action'

export const state = () => ({
  item: null,
  tags: []
})

export const mutations = {
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
  getItem ({ commit }, collection) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/collections/${collection}`,
      thenContent: response => commit('SET_FIELD', { field: 'item', value: response.data })
    })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
  // getTagsByItemId ({ commit }, id) {
  //   return action(this.$api, 'get', commit, {
  //     url: `/catalog/collections/${id}/tags`,
  //     thenContent: response => commit('SET_FIELD', { field: 'tags', value: response.data })
  //   })
  // }
}

export const getters = {
  mainImage: state => state.item.images.find(image => image.id === state.item.main_image_id)
}
