import array from 'lodash/array'
import { getParamsString } from '../helpers'
import action from './mixins/action'

export const state = () => ({
  item: null,
  items: [],
  pagination: {
    per_page: 30,
    total: 0,
    current_page: 1,
    from: 0,
    to: 0,
    sort_by: 'id',
    sort_order: 'asc'
  },
  tags: [],
  loading: false,
  lastPreview: null
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = array.unionBy(state.items, payload, 'id')
  },
  SET_PAGINATION (state, payload) {
    for (const [field] of Object.entries(state.pagination)) {
      if (Object.hasOwnProperty.call(payload, field)) {
        state.pagination[field] = payload[field]
      }
    }
  },
  RESET_PAGINATION (state) {
    state.pagination = {
      per_page: 30,
      total: 0,
      current_page: 1,
      from: 0,
      to: 0,
      sort_by: 'id',
      sort_order: 'asc'
    }
  },
  SET_PAGINATION_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      state.pagination[field] = value
    }
  },
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  },
  REMOVE_ITEM (state, id) {
    state.items = state.items.filter(item => item.id !== id)
  }
}

export const actions = {
  getItem ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/images/${id}`,
      thenContent: response => commit('SET_FIELDS', { item: response.data })
    })
  },
  getWishList ({ commit }, { key, filter, pagination }) {
    commit('SET_FIELDS', { loading: true })

    const baseUrl = '/catalog/images'
    const params = getParamsString({
      filter: { keys: key, ...filter },
      pagination
    })
    const url = params ? `${baseUrl}${params}` : baseUrl

    return action(this.$api, 'get', commit, {
      url,
      thenContent: (response) => {
        commit('SET_PAGINATION', response.data.pagination)
        commit('SET_ITEMS', response.data.data)
        commit('SET_FIELDS', { loading: false })
      }
    })
  },
  getCategoryItems ({ commit }, { key, filter, pagination }) {
    commit('SET_FIELDS', { loading: true })

    const baseUrl = '/catalog/images'
    const params = getParamsString({
      filter: { category: [key], ...filter },
      pagination
    })
    const url = params ? `${baseUrl}${params}` : baseUrl

    return action(this.$api, 'get', commit, {
      url,
      thenContent: (response) => {
        commit('SET_PAGINATION', response.data)
        commit('SET_ITEMS', response.data.data)
        commit('SET_FIELDS', { loading: false })
      }
    })
  },
  updatePaginationFields ({ commit }, payload) {
    commit('SET_PAGINATION_FIELDS', payload)
  },
  resetPagination ({ commit }) {
    commit('RESET_PAGINATION')
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  removeItem ({ commit }, id) {
    commit('REMOVE_ITEM', id)
  }
}

export const getters = {}
