import errorsLibrary from '~/plugins/lang/ru/errorsLib'

export default function ({ $auth, $axios, store, redirect }) {
  $axios.onResponse((response) => {
    if (response.data.message && response.data.type !== 'modal') {
      store.dispatch('notifications/addItem', {
        message: response.data.message,
        status: response.data.status,
        timeout: response.data.timeout || null
      })
    }
  })

  $axios.onError((err) => {
    const error = err.response

    switch (error.status) {
      case 401:
        if (error.data.message) {
          store.dispatch('notifications/addItem', {
            message: error.data.message,
            status: 'danger'
          })
        }
        $auth.logout()
        break
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
        if (error.data.message) {
          store.dispatch('notifications/addItem', {
            message: error.data.message,
            status: 'danger'
          })
        }
    }
  })

  $axios.onRequest(() => {
    store.dispatch('validations/clearErrors')
  })
}
