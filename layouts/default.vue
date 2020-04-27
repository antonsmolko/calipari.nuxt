<template lang="pug">
    .tm-layout__container(v-if="onLoad" :class="pageBg")
        Notification(
            v-for="notification in notifications"
            :key="notification.id"
            :item="notification"
        )
        Navbar
        FadeTransition(mode="out-in")
            nuxt(keep-alive :keep-alive-props="{ max: 10 }" :key="$route.fullPath")
        Footer(v-if="footer")
        SlideYDownTransition(mode="out-in")
            BottomBar(v-if="bottomBar")
</template>
<script>
import TopBar from '~/components/layout/TopBar.vue'
import BottomBar from '~/components/layout/BottomBar.vue'
import Notification from '~/components/notifications/Notification'
import notifications from '~/components/mixins/notifications'

export default {
  name: 'Default',
  components: {
    TopBar,
    BottomBar,
    Notification
  },
  mixins: [notifications],
  metaInfo () {
    return {
      title: 'Главная',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
    this.setThemeByTimePeriod()
    this.timeInterval = setInterval(() => {
      this.setThemeByTimePeriod()
    }, 10 * 60 * 1000)
    this.onLoad = true
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
<style lang="scss">
@mixin beforeBg () {
    content: '';
    position: fixed;
    display: block;
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    will-change: background;
}

.tm-background {
    &-lines {
        position: relative;
        &::before {
            content: '';
            position: absolute;
            height: 100vh;
            width: 100vw;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            background-image: url('/img/svg/section-background-image-lines.svg');
            background-position-x: 50%;
            opacity: .7;
        }
    }
}

.tm-layout__container {
    position: relative;
    //min-height: calc(100vh - #{$navbar-height} * 3);
    //display: flex;
    //flex-direction: column;
    //justify-content: space-between;
    &.tm-teal-bg {
        &::before {
            @include beforeBg();
            animation: pseudoFadeIn $background-time-transition ease forwards;
            background-color: #185370;
            background: radial-gradient(circle at top right, #0D4968 0%, #185370 40%, #185370 60%, #093256 100%);
        }
    }
    &.tm-light-bg {
        &::before {
            @include beforeBg();
            animation: pseudoFadeIn $background-time-transition ease forwards;
            background-color: #EFEFEF;
            background: radial-gradient(circle at top center, #EFEFEF 0%, #FFFFFF 25%, #F8F8F8 60%, #E3E3E3 100%);
        }
    }
    &.tm-light-grey-bg {
        &::before {
            @include beforeBg();
            animation: pseudoFadeIn $background-time-transition ease forwards;
            background-color: #dddddd;
            background: radial-gradient(circle at top right, #cfcfcf 0%, #f1efef 40%, #efefef 60%, #eeeeee 100%);
        }
    }
    &.tm-dark-grey-bg {
        &::before {
            @include beforeBg();
            animation: pseudoFadeIn $background-time-transition ease forwards;
            background-color: #393C3E;
            background: radial-gradient(circle at top center, #4c5254 0%, #4B4E50 25%, #393E40 60%, #282c2e 100%);
        }
    }
    &.tm-cover-bg {
        &::before {
            content: '';
            background-position: center;
            background-size: cover;
        }
    }
}
.tm-main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
@keyframes pseudoFadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes pseudoFadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
