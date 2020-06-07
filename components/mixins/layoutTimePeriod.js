export default {
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
