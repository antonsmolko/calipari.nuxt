import Vue from 'vue'

// import UiKit framework
import UIkit from 'uikit'
import Icons from '../assets/js/uikit/icons/uikit-icons'

UIkit.use(Icons)
UIkit.container = '#__nuxt'

Vue.prototype.$uikit = UIkit
