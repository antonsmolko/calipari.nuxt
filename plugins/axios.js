import errorsLibrary from '~/plugins/lang/ru/errorsLib'

export default function ({ $axios, store, redirect }) {
  $axios.onResponse((response) => {
    if (response.data.message) {
      store.dispatch('notifications/addItem', {
        message: response.data.message,
        status: response.data.status
      })
    }
  })

  $axios.onError((err) => {
    const error = err.response

    switch (error.status) {
      case 404:
        redirect('/notfound')
        store.dispatch('notifications/addItem', {
          message: errorsLibrary.ERROR_NOTFOUND
        })
        break
      case 422:
        for (const message of Object.values(error.data.errors)) {
          store.dispatch('notifications/addItem', { message, status: 'danger' })
        }
        break
      case (error.status >= 500):
        store.dispatch('notifications/addItem', {
          message: errorsLibrary.ERROR_DEFAULT,
          status: 'danger'
        })
        break
      default:
        store.dispatch('notifications/addItem', {
          message: error.data.message,
          status: 'danger'
        })
    }

    return Promise.reject(error)
  })

  $axios.onRequest(() => {
    store.dispatch('validations/clearErrors')
  })
}
