<template lang="pug">
  .tm-layout__container(v-if="onLoad" :class="pageBg")
    notification(
      v-for="notification in notifications"
      :key="notification.id"
      :item="notification")
    navbar
      template(#content v-if="editorEnable")
        editor-navbar-content
    nuxt(keep-alive :keep-alive-props="{ max: 10 }" :key="$route.fullPath")
    slide-y-down-transition(mode="out-in")
    off-canvas-menu
</template>
<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
import TopBar from '@/components/layout/TopBar.vue'
import Notification from '@/components/notifications/Notification'
import OffCanvasMenu from '@/components/layout/OffCanvas/OffCanvasMenu.vue'
import EditorNavbarContent from '@/components/Editor/EditorNavbarContent'
import notifications from '@/components/mixins/notifications'
import syncProfile from '@/components/mixins/syncProfile'
import layoutTimePeriod from '@/components/mixins/layoutTimePeriod'
import { refreshTokens, getCurrentBreakPoint } from '@/helpers'

const _throttle = throttle(fn => fn(), 50)

export default {
  name: 'Default',
  middleware: ({ $auth }) => {
    refreshTokens($auth)
  },
  components: {
    EditorNavbarContent,
    TopBar,
    Notification,
    OffCanvasMenu
  },
  mixins: [notifications, layoutTimePeriod, syncProfile],
  metaInfo () {
    return {
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
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
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    this.setThemeByTimePeriod()
    this.timeInterval = setInterval(() => {
      this.setThemeByTimePeriod()
    }, 10 * 60 * 1000)
    this.onLoad = true

    this.syncProfile() // @mixin: "syncProfile"
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    clearInterval(this.timeInterval)
  },
  methods: {
    handleResize () {
      _throttle(this.setCurrentBreakPoint)
    },
    setCurrentBreakPoint () {
      this.setFieldAction({
        field: 'breakPoint',
        value: getCurrentBreakPoint(window.innerWidth)
      })
    },
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
