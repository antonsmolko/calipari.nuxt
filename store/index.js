export const state = () => ({
  pageTitle: '',
  bottomBar: true,
  footer: true,
  darkPeriod: false,
  timePeriod: false
})

export const mutations = {
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value
      }
    }
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await Promise.all([
      dispatch('textures/getItems'),
      dispatch('categories/getItems'),
      dispatch('settings/getItems'),
      dispatch('delivery/getItems')
    ])
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  }
}

export const getters = {}
