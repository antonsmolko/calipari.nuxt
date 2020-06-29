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

  api.onError((err) => {
    const error = err.response

    if (error.status === 404) {
      store.dispatch('notifications/addItem', {
        message: errorsLibrary.ERROR_NOTFOUND
      })
      return Promise.reject(error)
    }
    if (error.status === 422) {
      for (const message of Object.values(error.data.errors)) {
        store.dispatch('notifications/addItem', { message, status: 'danger' })
      }
      return Promise.reject(error)
    }
    if (error.status >= 500) {
      store.dispatch('notifications/addItem', {
        message: errorsLibrary.ERROR_DEFAULT,
        status: 'danger'
      })
      return Promise.reject(error)
    }
  })

  api.onRequest(() => {
    store.dispatch('validations/clearErrors')
  })
}
