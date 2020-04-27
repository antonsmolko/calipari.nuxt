import { hash } from '~/helpers'

export const state = () => ({
  items: [],
  types: [
    'primary',
    'success',
    'warning',
    'danger'
  ]
})

export const mutations = {
  ADD_ITEM (state, { message, status, timeout = null }) {
    state.items.push({
      id: hash(),
      message,
      status,
      timeout
    })
  },
  CLEAR_ITEMS (state) {
    state.items = []
  },
  DELETE_ITEM (state, id) {
    state.items = state.items.filter(item => item.id !== id)
  }
}

export const actions = {
  addItem ({ commit }, payload) {
    commit('ADD_ITEM', payload)
  },
  clearItems ({ commit }) {
    commit('CLEAR_ITEMS')
  },
  deleteItem ({ commit }, id) {
    commit('DELETE_ITEM', id)
  }
}

export const getters = {
  getType: state => routeStatus => state.types.find(status => status === routeStatus)
}
