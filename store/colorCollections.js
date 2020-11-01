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
      url: '/catalog/color-collections',
      thenContent: ({ data }) => {
        commit('SET_FIELD', { field: 'items', value: data })
        return data
      }
    })
  },
  getItem ({ commit }, collection) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/color-collections/${collection}`,
      thenContent: ({ data }) => {
        commit('SET_FIELD', { field: 'item', value: data })
        return data
      }
    })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
  mainImage: state => state.item ? state.item.images?.find(image => image.id === state.item.main_image_id) : null
}
