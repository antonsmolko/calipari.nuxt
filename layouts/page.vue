<template lang="pug">
    transition(name="fade" mode="out-in")
        div(v-if="onLoad")
            Notification(
                v-for="(notification, index) in notifications"
                :key="index"
                :status="notification.status"
                :message="notification.message"
            )
            Navbar
            TopBar(:title="title")
            nuxt
            Footer
            BottomBar
        .uk-position-center.uk-flex.uk-flex-column.uk-flex-middle.uk-padding.uk-text-center(v-else)
            .uk-margin-top(data-uk-spinner="ratio: 3")
</template>

<script>
import { mapState } from 'vuex'

import TopBar from '~/components/layout/TopBar.vue'
import BottomBar from '~/components/layout/BottomBar.vue'
import Notification from '~/components/notifications/Notification'
import notifications from '~/components/mixins/notifications'

export default {
  components: {
    TopBar,
    BottomBar,
    Notification
  },
  mixins: [notifications],
  metaInfo () {
    return {
      title: this.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  data () {
    return {
      onLoad: false
    }
  },
  computed: {
    ...mapState([
      'title'
    ])
  },
  mounted () {
    this.onLoad = true
  }
}
</script>
