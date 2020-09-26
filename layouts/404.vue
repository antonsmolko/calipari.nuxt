<template lang="pug">
  .tm-layout__container(v-if="onLoad" :class="pageBg")
    notification(
      v-for="notification in notifications"
      :key="notification.id"
      :item="notification")
    navbar
    nuxt(keep-alive :keep-alive-props="{ max: 10 }" :key="$route.fullPath")
    slide-y-down-transition(mode="out-in")
      bottom-bar(v-if="bottomBar")
    menu
</template>
<script>
import { mapState } from 'vuex'
import TopBar from '@/components/layout/TopBar.vue'
import BottomBar from '@/components/layout/BottomBar.vue'
import Notification from '@/components/notifications/Notification'
import Menu from '@/components/layout/OffCanvas/OffCanvasMenu.vue'
import EditorNavbarContent from '@/components/Editor/EditorNavbarContent'
import syncProfile from '@/components/mixins/syncProfile'
import notifications from '@/components/mixins/notifications'
import layoutTimePeriod from '@/components/mixins/layoutTimePeriod'
import { refreshTokens } from '@/helpers'

export default {
  components: {
    EditorNavbarContent,
    TopBar,
    BottomBar,
    Notification,
    Menu
  },
  mixins: [notifications, layoutTimePeriod, syncProfile],
  metaInfo () {
    return {
      title: '404',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          vmid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.BASE_URL + this.$route.fullPath }
      ],
      bodyAttrs: {
        class: this.pageBg
      }
    }
  },
  data () {
    return {
      onLoad: false,
      timeInterval: null
    }
  },
  computed: {
    ...mapState({
      editorEnable: state => state.editorEnable
    }),
    isDarkPeriod () {
      return this.timePeriod === 'evening' || this.timePeriod === 'night'
    },
    pageBg () {
      switch (this.timePeriod) {
        case ('morning'):
          return 'tm-light-bg'
        case ('day'):
          return 'tm-light-grey-bg'
        case ('evening'):
          return 'tm-teal-bg'
        case ('night'):
          return 'tm-dark-grey-bg'
        default:
          return ''
      }
    }
  },
  async mounted () {
    if (this.$auth.loggedIn) {
      await refreshTokens(this.$auth)
    }
    this.setThemeByTimePeriod()
    this.timeInterval = setInterval(() => {
      this.setThemeByTimePeriod()
    }, 10 * 60 * 1000)
    this.onLoad = true

    this.syncProfile() // @mixin: "syncProfile"
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    setThemeByTimePeriod () {
      const date = new Date()
      this.currentHour = date.getHours()
      this.setTimePeriod()
      this.setDarkPeriod()
    },
    setTimePeriod () {
      this.setFieldsAction({ timePeriod: this.getTimePeriod() })
    },
    getTimePeriod () {
      if (this.currentHour > 5 && this.currentHour < 11) {
        return 'morning'
      }
      if (this.currentHour >= 11 && this.currentHour < 18) {
        return 'day'
      }
      if (this.currentHour >= 18 && this.currentHour < 22) {
        return 'evening'
      }
      return 'night'
    },
    setDarkPeriod () {
      this.setFieldsAction({ darkPeriod: this.isDarkPeriod })
    }
  }
}
</script>
