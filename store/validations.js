export const state = () => ({
  errors: {}
})

// getters
export const getters = {
  errors (state) {
    return state.errors
  }
}

// mutations
export const mutations = {
  SET_ERRORS (state, errors) {
    state.errors = errors
  }
}

// actions
export const actions = {
  setErrors ({ commit }, errors) {
    commit('SET_ERRORS', errors)
  },
  clearErrors ({ commit }) {
    commit('SET_ERRORS', {})
  }
}
