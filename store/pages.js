export const state = () => ({
  title: '',
  alias: '',
  long_title: '',
  intro: '',
  image_path: '',
  description: '',
  keywords: ''
})

export const mutations = {
  SET_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state, field)) {
        state[field] = value !== null ? value : ''
      }
    }
  },
  SET_FIELD (state, { field, value }) {
    state[field] = value
  },
  CLEAR_FIELDS (state) {
    for (const field of Object.keys(state)) {
      state[field] = ''
    }
  }
}

export const actions = {
  getItem ({ commit }, page) {
    return this.$api.$get(`/pages/${page}`)
      .then(response => commit('SET_FIELDS', response))
  },
  clearFields ({ commit }) {
    commit('CLEAR_FIELDS')
  }
}

export const getters = {
}
