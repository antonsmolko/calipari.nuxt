import values from 'lodash/values'
import head from 'lodash/head'
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
  currents: {
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
  SYNC_CURRENTS (state) {
    for (const [key, value] of Object.entries(state.selected)) {
      state.currents[key] = [...value]
    }
  },
  SYNC_SELECTED (state) {
    for (const [key, value] of Object.entries(state.currents)) {
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
      state.currents[key] = []
    }
  },
  SET_CURRENT_TAG (state, payload) {
    state.currents.tags = [payload].slice(0, 1)
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
  syncCurrents ({ commit }) {
    commit('SYNC_CURRENTS')
  },
  syncSelected ({ commit }) {
    commit('SYNC_SELECTED')
  },
  clearSelected ({ commit }) {
    commit('CLEAR_SELECTED')
  },
  setCurrentTag ({ commit }, payload) {
    commit('SET_CURRENT_TAG', payload)
  }
}

export const getters = {
  isSelected: state => (field, id) => state.selected[field].includes(id),
  isSelectedDiff: state => !noDiff(state.currents, state.selected),
  selectedQty: state => values(state.selected).flat().length,
  currentQty: state => values(state.currents).flat().length,
  selectedFieldQty: state => field => state.selected[field].length,
  isTagged: (state, getters) => getters.currentQty === 1 && state.currents.tags.length === 1,
  activeTag: (state, getters) => getters.isTagged
    ? head(state.currents.tags)
    : null
}
