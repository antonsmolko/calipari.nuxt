export const state = () => ({
  searched: [],
  selected: null,
  tags: [],
  loading: false
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
    state[field] = value
  },
  SET_SELECTED (state, payload) {
    state.selected = { ...payload }
  }
}

export const actions = {
  getSearchedResult ({ commit }, query) {
    commit('SET_FIELD', { field: 'loading', value: true })

    return this.$api.$get(`/catalog/search/${query}`)
      .then((response) => {
        commit('SET_FIELDS', {
          searched: response,
          loading: false
        })
      })
  },
  setField ({ commit }, payload) {
    commit('SET_FIELD', payload)
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  setSelected ({ commit }, payload) {
    commit('SET_SELECTED', payload)
  }
}

export const getters = {
  imagePath: state => state.selected
    ? state.selected.image_path : null,
  key: state => state.selected ? state.selected.id : null,
  mode: state => state.selected ? state.selected.type : null
  // tags: (state, getters, rootState) => {
  //   const searchedType = state.searched.type
  //   switch (searchedType) {
  //     case 'category':
  //       return rootState.categories.tags
  //     case 'collection':
  //       return rootState.collections.tags
  //   }
  // }
}
