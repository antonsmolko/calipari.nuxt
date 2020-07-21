import unionBy from 'lodash/unionBy'
import { getParamsString } from '../helpers'
import action from './mixins/action'

export const state = () => ({
  item: null,
  items: [],
  artCollection: [],
  colorCollection: [],
  pagination: {
    per_page: 30,
    total: 0,
    current_page: 1,
    from: 0,
    to: 0,
    sort_by: 'id',
    sort_order: 'asc'
  },
  loading: false,
  lastPreview: null,
  isWishList: false
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
  SET_FIELD (state, { field, value }) {
    state[field] = value
  },
  REMOVE_ITEM (state, id) {
    state.items = state.items.filter(item => item.id !== id)
  },
  ADD_ITEM (state, item) {
    state.items = unionBy(state.items, [item], 'id')
  }
}

export const actions = {
  getItem ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/images/${id}`,
      thenContent: response => commit('SET_FIELD', { field: 'item', value: response.data })
    })
  },
  getItemFromEditor ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/images/${id}/editor`,
      thenContent: (response) => {
        const { item, colorCollection, artCollection } = response.data
        commit('SET_FIELDS', { item, colorCollection, artCollection })
      }
    })
  },
  getItemColorCollectionImages ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/images/${id}/color-collection-images`,
      thenContent: response => commit('SET_FIELD', { field: 'colorCollection', value: response.data })
    })
  },
  getItemArtCollectionImages ({ commit }, id) {
    return action(this.$api, 'get', commit, {
      url: `/catalog/images/${id}/art-collection-images`,
      thenContent: response => commit('SET_FIELD', { field: 'artCollection', value: response.data })
    })
  },
  getItems ({ state, commit, rootState }, { restrictiveElement, increasePage = false, clear = false }) {
    commit('SET_FIELD', { field: 'loading', value: true })

    const baseUrl = '/catalog/images'
    const filter = { ...rootState.filter.currents, ...restrictiveElement }
    const pagination = {
      current_page: increasePage
        ? state.pagination.current_page + 1
        : state.pagination.current_page,
      per_page: state.pagination.per_page,
      sort_order: state.pagination.sort_order,
      sort_by: state.pagination.sort_by
    }
    const params = getParamsString({ filter, pagination })
    const url = params ? `${baseUrl}${params}` : baseUrl

    return action(this.$api, 'get', commit, {
      url,
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
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  },
  removeItem ({ commit }, id) {
    commit('REMOVE_ITEM', id)
  },
  addItem ({ commit }, item) {
    commit('ADD_ITEM', item)
  }
}

export const getters = {
  paginateEnd: state => state.pagination.total === state.items.length
}
