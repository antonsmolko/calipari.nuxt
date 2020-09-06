import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      syncCartAction: 'cart/sync',
      syncWishListAction: 'wishList/sync',
      syncCardsAction: 'checkout/syncCards',
      addNotificationAction: 'notifications/addItem'
    }),
    syncProfile () {
      Promise.all([
        this.syncCardsAction(),
        this.syncCartAction(),
        this.syncWishListAction()
      ])
        .then(() => this.addNotificationAction({
          message: 'Профиль синхронизирован!',
          status: 'success'
        }))
    }
  }
}
