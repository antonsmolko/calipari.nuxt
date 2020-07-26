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
          this.responsive = window.innerWidth < 1200
        }
      }
    })
  }
}

Vue.use(Responsive)
