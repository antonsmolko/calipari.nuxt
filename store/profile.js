import { isFieldLengthValid, isPhoneValid } from '~/helpers'
import { form } from '~/plugins/config'
const isLengthValid = isFieldLengthValid(form.BASE_MIN_LENGTH)

export const state = () => ({
  fields: {
    first_name: null,
    last_name: null,
    middle_name: null,
    phone: null,
    postal_code: null,
    locality: null,
    street: null,
    apartments: null
  },
  account: {
    name: '',
    email: ''
  }
})

export const mutations = {
  SET_ACCOUNT_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state.account, field)) {
      state.account[field] = value
    }
  },
  SET_ACCOUNT_FIELDS (state, payload) {
    for (const field of Object.keys(payload)) {
      if (Object.hasOwnProperty.call(state.account, field)) {
        state.account[field] = payload[field]
      }
    }
  },
  SET_FIELDS (state, payload) {
    for (const field of Object.keys(payload)) {
      if (Object.hasOwnProperty.call(state.fields, field)) {
        state.fields[field] = payload[field]
      }
    }
  },
  RESPONSE_SET_FIELDS (state, payload) {
    for (const field of Object.keys(payload)) {
      if (Object.hasOwnProperty.call(state.fields, field)) {
        field === 'locality'
          ? state.fields[field] = JSON.parse(payload[field])
          : state.fields[field] = payload[field]
      }
    }
  },
  SET_FIELD (state, { field, value }) {
    if (Object.hasOwnProperty.call(state, field)) {
      state[field] = value
    }
  }
}

export const actions = {
  getDetails ({ commit }) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$get('/profile/details', {
      headers: { Authorization: token }
    })
      .then(response => commit('RESPONSE_SET_FIELDS', response))
  },
  update ({ state }) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$post('/profile/details', state.fields, {
      headers: { Authorization: token }
    })
  },
  updateAccountName ({ commit, state }) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$post('/profile/name', { name: state.account.name }, {
      headers: { Authorization: token }
    })
      .then(() => commit('notifications/ADD_ITEM', {
        message: 'Имя успешно обновлено!',
        status: 'success'
      }, { root: true }))
  },
  updateAccountEmail ({ state }) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$post('/profile/email', { email: state.account.email }, {
      headers: { Authorization: token }
    })
  },
  getOrders ({ commit }) {
    const token = this.$auth.strategy.token.get()

    return this.$api.$get('/profile/orders', {
      headers: { Authorization: token }
    })
      .then(response => commit('SET_ORDERS', response))
  },
  setFields ({ commit }, payload) {
    commit('SET_FIELDS', payload)
  },
  setAccountField ({ commit }, payload) {
    commit('SET_ACCOUNT_FIELD', payload)
  },
  setAccountFields ({ commit }, payload) {
    commit('SET_ACCOUNT_FIELDS', payload)
  }
}

export const getters = {
  personalIsInvalid: (state) => {
    return !isLengthValid(state.fields.first_name) ||
      !isLengthValid(state.fields.last_name) ||
      !isLengthValid(state.fields.middle_name) ||
      !isPhoneValid(state.fields.phone)
  },
  localityIsInvalid: state => !state.fields.locality ||
    !Object.hasOwnProperty.call(state.fields.locality, 'name') ||
    !Object.hasOwnProperty.call(state.fields.locality, 'id')
}
