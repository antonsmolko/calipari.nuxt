import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '72ab38c9-5e6e-4821-8b46-fdba57deff99',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
} // настройки плагина

Vue.use(YmapPlugin, settings)
