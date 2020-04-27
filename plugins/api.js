import https from 'https'
import errorsLibrary from '~/plugins/lang/ru/errorsLib'

export default function ({ $axios, store, redirect }, inject) {
  const api = $axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })

  // Set baseURL to something different
  // api.setBaseURL('https://my_api.com')

  // Inject to context as $api
  inject('api', api)

  api.onResponse((response) => {
    if (response.data.message) {
      store.dispatch('notifications/addItem', {
        message: response.data.message,
        status: response.data.status
      })
    }
  })

  api.onError((error) => {
    if (error.response.status === 422) {
      for (const message of Object.values(error.response.data.errors)) {
        store.dispatch('notifications/addItem', {
          message,
          status: 'danger'
        })
      }
    } else if (error.response.status !== 500) {
      store.dispatch('notifications/addItem', {
        message: error.response.data.message,
        status: error.response.data.status
      })
    }
    if (error.response.status === 500) {
      store.dispatch('notifications/addItem', {
        message: errorsLibrary.ERROR_DEFAULT,
        status: 'danger'
      })
    }
    return Promise.reject(error)
  })

  api.onRequest(() => {
    store.dispatch('validations/clearErrors')
  })
}
