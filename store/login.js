export const state = () => ({
  form: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    old_password: '',
    service: '',
    social_id: ''
  }
})

export const mutations = {
  SET_FORM_FIELDS (state, payload) {
    for (const field of Object.keys(payload)) {
      if (Object.hasOwnProperty.call(state.form, field)) {
        state.form[field] = payload[field]
      }
    }
  },
  UPDATE_FORM_FIELD (state, payload) {
    state.form[payload.field] = payload.value
  },
  CLEAR_FORM_FIELDS (state) {
    for (const field of Object.keys(state.form)) {
      state.form[field] = ''
    }
  },
  UPDATE_FORM_FIELDS (state, payload) {
    for (const field of Object.keys(state.form)) {
      state.form[field] = payload[field] === null ? '' : payload[field]
    }
  }
}

export const actions = {
  setFormFields ({ commit }, payload) {
    commit('SET_FORM_FIELDS', payload)
  },
  updateFormField (context, payload) {
    context.commit('UPDATE_FORM_FIELD', payload)
  },
  clearFormFields (context) {
    context.commit('CLEAR_FORM_FIELDS')
  }
}

export const getters = {
}
