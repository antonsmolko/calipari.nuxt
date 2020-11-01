export const state = () => ({
  darkPeriod: false,
  pageTitle: '',
  bottomBar: true,
  footer: true,
  timePeriod: false,
  editorEnable: false,
  scrollTo: null,
  breakPoint: {},
  browser: null
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
    if (Object.hasOwnProperty.call(state, field)) {
      state[field] = value
    }
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }) {
    await Promise.all([
      dispatch('textures/getItems'),
      dispatch('categories/getItems'),
      dispatch('colorCollections/getItems'),
      dispatch('artCollections/getItems'),
      dispatch('settings/getItems'),
      dispatch('delivery/getItems')
    ])
    commit('SET_FIELD', { field: 'browser', value: this.$ua.browser() })
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  }
}

export const getters = {
}
