import values from 'lodash/values'
import { noDiff, getParamsString } from '../helpers'
import action from './mixins/action'

export const state = () => ({
  selected: {
    topics: [],
    colors: [],
    interiors: [],
    tags: [],
    formats: []
  },
  current: {
    topics: [],
    colors: [],
    interiors: [],
    tags: [],
    formats: []
  },
  fields: {
    topics: [],
    colors: [],
    interiors: [],
    tags: [],
    formats: []
  },
  loading: false
})

export const mutations = {
  SET_FIELDS (state, payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state.fields, key)) {
        state.fields[key] = value
      }
    }
  },
  CLEAR_FIELDS (state) {
    for (const key of Object.keys(state.fields)) {
      state.fields[key] = []
    }
  },
  TOGGLE_SELECTED (state, { field, value }) {
    const index = state.selected[field].indexOf(value)
    index === -1
      ? state.selected[field].splice(1, 0, value)
      : state.selected[field].splice(index, 1)
  },
  SET_CURRENT (state) {
    for (const [key, value] of Object.entries(state.selected)) {
      state.current[key] = [...value]
    }
  },
  SET_SELECTED (state) {
    for (const [key, value] of Object.entries(state.current)) {
      state.selected[key] = [...value]
    }
  },
  CLEAR_SELECTED (state) {
    for (const key of Object.keys(state.selected)) {
      state.selected[key] = []
    }
  },
  CLEAR_FILTERS (state) {
    for (const key of Object.keys(state.selected)) {
      state.selected[key] = []
      state.current[key] = []
    }
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}

export const actions = {
  getFilters ({ commit }, { filter, condition = null }) {
    commit('SET_LOADING', true)
    const baseUrl = condition ? `/catalog/filters/${condition}` : '/catalog/filters'
    const params = getParamsString({ filter })
    const url = params ? `${baseUrl}${params}` : baseUrl

    return action(this.$axios, 'get', commit, {
      url,
      thenContent: (response) => {
        commit('SET_FIELDS', response.data)
        commit('SET_LOADING', false)
      }
    })
  },
  clearFields ({ commit }) {
    commit('CLEAR_FIELDS')
  },
  async toggleSelected ({ commit }, payload) {
    return await commit('TOGGLE_SELECTED', payload)
  },
  clearFilters ({ commit }) {
    commit('CLEAR_FILTERS')
  },
  setCurrent ({ commit }) {
    commit('SET_CURRENT')
  },
  setSelected ({ commit }) {
    commit('SET_SELECTED')
  },
  clearSelected ({ commit }) {
    commit('CLEAR_SELECTED')
  }
}

export const getters = {
  isSelected: state => (field, id) => state.selected[field].includes(id),
  isSelectedDiff: state => !noDiff(state.current, state.selected),
  selectedQty: state => values(state.selected).flat().length,
  currentQty: state => values(state.current).flat().length,
  selectedFieldQty: state => field => state.selected[field].length
}
