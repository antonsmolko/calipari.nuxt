import { action } from '@/store/mixins/action'

export const state = () => ({
  form: {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
})

export const mutations = {
  SET_FORM_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state.form, field)) {
      state.form[field] = value
    }
  },
  CLEAR_FORM_FIELDS (state) {
    for (const field of Object.keys(state.form)) {
      state.form[field] = ''
    }
  }
}

export const actions = {
  setFormField ({ commit }, payload) {
    commit('SET_FORM_FIELD', payload)
  },
  clearFormFields ({ commit }) {
    commit('CLEAR_FORM_FIELDS')
  },
  sendFeedbackMail ({ commit }, payload) {
    return action(this.$api, 'post', commit, {
      url: '/mail/feedback',
      payload
    })
  },
  sendBackCallMail ({ commit }, payload) {
    return action(this.$api, 'post', commit, {
      url: '/mail/back-call',
      payload
    })
  }
}

export const getters = {
}
