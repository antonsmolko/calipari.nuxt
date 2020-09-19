import isArray from 'lodash/isArray'
import { action } from '@/store/mixins/action'

export const state = () => ({
  fields: {
    hash: '',
    comment: '',
    quality_rate: '',
    service_rate: '',
    images: []
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
  ADD_IMAGE (state, payload) {
    state.fields.images.push(payload)
  },
  REMOVE_FILE (state, payload) {
    state.fields.images = state.fields.images.filter(n => n.name !== payload.name && n.size !== payload.size)
  },
  CLEAR_ITEM_FIELDS (state) {
    for (const field of Object.keys(state.fields)) {
      state.fields[field] = isArray(state.fields[field]) ? [] : ''
    }
  }
}

export const actions = {
  send ({ state, commit }, payload) {
    const form = new FormData()

    for (const [field, value] of Object.entries(payload)) {
      isArray(value)
        ? value.forEach(v => form.append(`${field}[]`, v))
        : form.append(field, value)
    }

    return action(this.$api, 'post', commit, {
      url: '/reviews/store',
      payload: form,
      thenContent: response => commit('CLEAR_ITEM_FIELDS')
    })
  },
  cropImage ({ commit }, image) {
    return action(this.$api, 'post', commit, {
      url: '/reviews/crop-review-image',
      payload: { image },
      thenContent: response => commit('UNION_FILES', response)
    })
  },
  setItemField ({ commit }, payload) {
    commit('SET_ITEM_FIELD', payload)
  },
  addImage ({ commit }, payload) {
    commit('ADD_IMAGE', payload)
  },
  removeFile ({ commit }, payload) {
    commit('REMOVE_FILE', payload)
  },
  clearItemFields ({ commit }) {
    commit('CLEAR_ITEM_FIELDS')
  }
}

export const getters = {
}
