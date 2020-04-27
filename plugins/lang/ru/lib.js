import Vue from 'vue'

/**
 * Языковые константы
 * @param opt
 * @returns {{SNAKE_CASE_ALPHA_EN: string, MAX_FILE: string, MAX_ARRAY: string, MIN_ARRAY: string, MAX_NUMERIC: string, SAME_AS_PASSWORD: string, NUM: string, KEBAB_CASE_ALPHA_EN: string, REQUIRED: string, UNIQUE: string, NUM_DOT: string, ALPHA_NUM: string, EMAIL: string, MIN_STRING: string, IMAGE: string, MIN_NUMERIC: string, CONFIRMED: string, MAX_STRING: string, MIN_FILE: string}}
 */

const lib = Object.freeze({
  // Delivery
  DELIVERY_PICKUP: 'Самовывоз',
  DELIVERY_PICKUPS: 'Пункты самовывоза',
  DELIVERY_CDEK: 'Компания CDEK',
  DELIVERY_CDEK_COURIER: 'Курьер CDEK',
  // Editor | Checkout
  FILTER_FLIP: 'Отражение',
  FILTER_GRAYSCALE: 'ЧБ',
  FILTER_SEPIA: 'Сепия',
  // Profile | Personal
  NOTICE_PERSONAL_FIELDS_VALIDATION: 'Для продолжения оформления заказа заполните все поля ЛИЧНЫХ ДАННЫХ. Допустимые значения для текстовых полей не менее двух символов.'
})

Vue.prototype.$lib = lib

export default lib
