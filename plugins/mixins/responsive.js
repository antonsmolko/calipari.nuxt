import Vue from 'vue'

const Responsive = {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          responsive: false
        }
      },
      mounted () {
        this.onResponsiveInverted()
        window.addEventListener('resize', this.onResponsiveInverted)
      },
      beforeDestroy () {
        window.removeEventListener('resize', this.onResponsiveInverted)
      },
      methods: {
        onResponsiveInverted () {
          if (window.innerWidth < 1200) {
            this.responsive = true
          } else {
            this.responsive = false
          }
        }
      }
    })
  }
}

Vue.use(Responsive)
