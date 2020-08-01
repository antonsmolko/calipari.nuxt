export const state = () => ({
  fields: {
    title: '',
    alias: '',
    long_title: '',
    content: '',
    image_path: '',
    description: '',
    keywords: ''
  }
})

export const mutations = {
  SET_ITEM_FIELDS (state, payload) {
    for (const [field, value] of Object.entries(payload)) {
      if (Object.hasOwnProperty.call(state.fields, field)) {
        state.fields[field] = value !== null ? value : ''
      }
    }
  },
  SET_ITEM_FIELD (state, { field, value }) {
    state.fields[field] = value
  },
  CLEAR_ITEM_FIELDS (state) {
    for (const field of Object.keys(state.fields)) {
      state.fields[field] = ''
    }
  }
}

export const actions = {
  getItem ({ commit }, page) {
    return this.$api.$get(`/pages/${page}`)
      .then(response => commit('SET_ITEM_FIELDS', response))
  },
  clearItemFields ({ commit }) {
    commit('CLEAR_ITEM_FIELDS')
  }
}

export const getters = {
}
