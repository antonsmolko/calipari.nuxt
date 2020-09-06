import { postTypes } from '@/plugins/config'

export const state = () => ({
  item: {},
  types: []
})

export const mutations = {
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
  getItem ({ commit }, post) {
    return this.$api.$get(`/posts/${post}`)
      .then(response => commit('SET_FIELD', { field: 'item', value: response }))
  },
  getTypes ({ commit }) {
    return this.$api.$get('/posts/types')
      .then(response => commit('SET_FIELD', { field: 'types', value: response }))
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
  defaultType: state => state.types.length
    ? postTypes.find(type => state.types.includes(type.index))
    : null,
  availableTypes: state => state.types.length
    ? postTypes.filter(type => state.types.includes(type.index))
    : null
}
