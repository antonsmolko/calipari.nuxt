import lib from '@/plugins/lang/ru/lib'

export default async ({ $auth, store, redirect }) => {
  if ($auth.loggedIn) {
    await store.dispatch('profile/getDetails')
    const personalIsInvalid = store.getters['profile/personalIsInvalid']

    if (personalIsInvalid) {
      redirect('/profile/personal', { from: '/checkout/delivery' })
      store.commit('notifications/ADD_ITEM', {
        message: lib.NOTICE_PERSONAL_FIELDS_VALIDATION,
        status: 'primary',
        timeout: 10000
      })
    }
    const authUserDetails = store.state.profile.form
    const email = $auth.user.email
    store.commit('checkout/SET_CUSTOMER_FIELDS', { ...authUserDetails, email })
    store.commit('checkout/SET_FIELDS', {
      locality: authUserDetails.locality,
      pvzs: [],
      pvz: null,
      street: authUserDetails.street,
      apartments: authUserDetails.apartments
    })

    const localityIsInvalid = store.getters['profile/localityIsInvalid']
    let priceQuery = null

    if (!localityIsInvalid) {
      priceQuery = authUserDetails.locality.postCodeArray
    } else if (authUserDetails.postal_code) {
      priceQuery = authUserDetails.postal_code
    }

    const currentDelivery = store.getters['checkout/getCurrentDelivery']

    priceQuery && !currentDelivery.pickup
      ? store.dispatch('delivery/getPrice', { query: priceQuery })
      : store.commit('delivery/SET_FIELDS', { deliveryPrice: 0 })
  }
}
