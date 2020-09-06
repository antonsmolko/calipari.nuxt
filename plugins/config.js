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

/**
 * Типы статей блога
 */
const postTypes = [
  { title: 'Новости', index: 'news' },
  { title: 'Гид', index: 'guide' },
  { title: 'Акции', index: 'stocks' },
  { title: 'События', index: 'events' }
]

const beforeCartItemDeletingConfirmationContent = `
  <p class="uk-text-large">Вы уверены?</p>
  <p class="tm-text-medium">Подтвердите удаление позиции из корзины!</p>`

Vue.prototype.$conf = Object.freeze({
  form,
  postTypes,
  beforeCartItemDeletingConfirmationContent
})

export {
  form,
  postTypes,
  beforeCartItemDeletingConfirmationContent
}
