import { action } from '@/store/mixins/action'
export const state = () => ({
  fields: {
    hash: '',
    comment: '',
    quality_rate: '',
    service_rate: ''
  },
  items: []
})

export const mutations = {
  SET_ITEMS (state, payload) {
    state.items = payload
  },
  SET_ITEM_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state.fields, field)) {
      state.fields[field] = value
    }
  },
  CLEAR_ITEM_FIELDS (state) {
    for (const field of Object.keys(state.fields)) {
      state.fields[field] = ''
    }
  }
}

export const actions = {
  send ({ commit }, payload) {
    return action(this.$api, 'post', commit, {
      url: '/reviews/store',
      payload,
      thenContent: response => commit('CLEAR_ITEM_FIELDS')
    })
  },
  setItemField ({ commit }, payload) {
    commit('SET_ITEM_FIELD', payload)
  }
}

export const getters = {
}
