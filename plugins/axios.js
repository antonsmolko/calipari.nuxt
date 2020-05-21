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
    // return Promise.reject(error)

    // if (error.response.status === 404) {
    //   return redirect('/notfound')
    // }
    // if (error.response.status === 500) {
    //   return store.dispatch('notifications/addItem', {
    //     message: errorsLibrary.ERROR_DEFAULT,
    //     status: 'danger'
    //   })
    // }
    // if (error.response.status === 422) {
    //   for (const message of Object.values(error.response.data.errors)) {
    //     store.dispatch('notifications/addItem', {
    //       message,
    //       status: 'danger'
    //     })
    //   }
    // } else if (error.response.status !== 500) {
    //   store.dispatch('notifications/addItem', {
    //     message: error.response.data.message,
    //     status: error.response.data.status
    //   })
    // }

    // return Promise.reject(error)
  })

  $axios.onRequest(() => {
    store.dispatch('validations/clearErrors')
  })
}
