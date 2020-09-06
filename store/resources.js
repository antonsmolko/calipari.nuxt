import unionBy from 'lodash/unionBy'
import { action } from './mixins/action'

export const state = () => ({
  items: [],
  pagination: {
    per_page: 15,
    total: 0,
    current_page: 1,
    from: 0,
    to: 0,
    sort_by: 'id',
    sort_order: 'desc'
  },
  lastPreview: null,
  loading: false
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = unionBy(state.items, payload, 'id')
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
      per_page: 5,
      total: 0,
      current_page: 1,
      from: 0,
      to: 0,
      sort_by: 'id',
      sort_order: 'desc'
    }
  },
  SET_PAGINATION_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      state.pagination[field] = value
    }
  },
  SET_FIELD (state, { field, value }) {
    state[field] = value
  }
}

export const actions = {
  getItems ({ state, commit, rootState }, { url, increasePage = false, clear = false }) {
    commit('SET_FIELD', { field: 'loading', value: true })

    const pagination = {
      current_page: increasePage
        ? state.pagination.current_page + 1
        : state.pagination.current_page,
      per_page: state.pagination.per_page,
      sort_order: state.pagination.sort_order,
      sort_by: state.pagination.sort_by
    }

    return action(this.$api, 'post', commit, {
      url,
      payload: pagination,
      thenContent: (response) => {
        commit('SET_PAGINATION', response.data.pagination)
        clear
          ? commit('SET_FIELD', { field: 'items', value: response.data.data })
          : commit('SET_ITEMS', response.data.data)
        commit('SET_FIELD', { field: 'loading', value: false })
      }
    })
  },
  updatePaginationFields ({ commit }, payload) {
    commit('SET_PAGINATION_FIELDS', payload)
  },
  resetPagination ({ commit }) {
    commit('RESET_PAGINATION')
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
}
