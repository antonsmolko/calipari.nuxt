import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('notifications', {
      notifications: state => state.items,
      notificationTypes: state => state.types
    })
  }
}
