import { action } from '@/helpers'

export const state = () => ({
  item: null,
  items: [],
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
  getItemsByImageKeys ({ commit }, keys) {
    return action(this.$api, 'post', commit, {
      url: '/catalog/images/wish-list/tags',
      payload: { keys },
      thenContent: response => commit('SET_FIELD', { field: 'items', value: response.data })
    })
  },
  getItemsByCategoryId ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/categories/${id}/tags`,
      thenContent: response => commit('SET_FIELD', { field: 'items', value: response.data })
    })
  },
  getItemsByCollectionId ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/collections/${id}/tags`,
      thenContent: response => commit('SET_FIELD', { field: 'items', value: response.data })
    })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  }
}

export const getters = {
}
