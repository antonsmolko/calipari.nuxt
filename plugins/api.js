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
    switch (error.status) {
      case 404:
        return redirect('/notfound')
      case 500:
        return store.dispatch('notifications/addItem', {
          message: errorsLibrary.ERROR_DEFAULT,
          status: 'danger'
        })
      case 422:
        for (const message of Object.values(error.data.errors)) {
          store.dispatch('notifications/addItem', { message, status: 'danger' })
        }
        return Promise.reject(error)
      default:
        return store.dispatch('notifications/addItem', {
          message: error.data.message,
          status: error.data.status
        })
    }
  })

  api.onRequest(() => {
    store.dispatch('validations/clearErrors')
  })
}
