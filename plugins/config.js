import Vue from 'vue'

/**
 * Настройки для форм
 */
const form = Object.freeze({
  BASE_MIN_LENGTH: 2,
  PHONE_MASK: '+7 (###) ### ####',
  PHONE_REGEXP: /(\+7\s\()\d{3}\)\s(\d{3})\s(\d{4})/,
  PHONE_START_WITH: '+7 ('
})

Vue.prototype.$configForm = form

/**
 * Типы статей блого
 */
const postTypes = [
  { title: 'Новости', index: 'news' },
  { title: 'Гид', index: 'guide' },
  { title: 'Акции', index: 'stocks' },
  { title: 'События', index: 'events' }
]

Vue.prototype.$postTypes = postTypes

export {
  form,
  postTypes
}
