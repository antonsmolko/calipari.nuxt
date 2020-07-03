import forOwn from 'lodash/forOwn'
import isEmpty from 'lodash/isEmpty'
import isInteger from 'lodash/isInteger'
import crc32 from 'crc-32'
import lib from '~/plugins/lang/ru/lib'
import { form } from '~/plugins/config'

export const getFilterDetailsString = (filter) => {
  const activeFilters = getActiveFilters(filter)

  return activeFilters.length
    ? activeFilters
      .map((filter) => {
        if (Object.hasOwnProperty.call(filterSet, filter.key)) {
          return filterSet[filter.key]
        } else if (Object.hasOwnProperty.call(filterSet, filter.value)) {
          return filterSet[filter.value]
        }
      })
      .join(', ')
    : '—'
}

function getActiveFilters (filter) {
  const activeFilters = []
  for (const [key, value] of Object.entries(filter)) {
    if (value) {
      activeFilters.push({ key, value })
    }
  }

  return activeFilters
}

export const isDifference = (a, b) => !!a.filter(i => !b.includes(i)).concat(b.filter(i => !a.includes(i))).length

export const noDiff = (a, b) => {
  if (isDifference(Object.keys(a), Object.keys(b))) {
    return false
  }
  for (const [key, value] of Object.entries(a)) {
    if (isDifference(b[key], value)) {
      return false
    }
  }

  return true
}

export const getFormatPrice = price => typeof price === 'number'
  ? price.toLocaleString('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  })
  : price

export const hash = () => {
  const date = new Date()
  return Math.abs(crc32.str(`${date.getTime()}|${Math.round(Math.random() * 1000)}`))
}

export const filterSet = {
  flipH: lib.FILTER_FLIP_H,
  flipV: lib.FILTER_FLIP_V,
  grayscale: lib.FILTER_GRAYSCALE,
  sepia: lib.FILTER_SEPIA
}

export const getArticle = (id) => {
  return id.toString().padStart(5, 0)
}

/**
 * @param length
 * @returns {function(string|null): boolean|boolean}
 */
export const isFieldLengthValid = length => field => Boolean(field) && (field.length >= length)

/**
 * Check customer phone number
 * @param phone
 * @returns {boolean|*}
 */
export const isPhoneValid = phone => Boolean(phone) && phone.match(form.PHONE_REGEXP)

/**
 * Get Params String
 * @param payload
 * @returns {*}
 */
export const getParamsString = (payload) => {
  const params = []

  forOwn(payload, (keys, field) => {
    forOwn(keys, (value, key) => {
      if (!isEmpty(value) || isInteger(value)) {
        const valueString = Array.isArray(value) ? value.join(';') : value
        params.push(`${field}[${key}]=${valueString}`)
      }
    })
  })

  return params.length ? `?${params.join('&')}` : null
}

export const getPhoneFormat = (str) => {
  if (!str) {
    return str
  }
  const pattern = /^([8]{1})[-( ]?([0-9]{3})[-) ]?([0-9]{3})[- ]?([0-9]{4})$/

  return str.replace(pattern, (match, p1, p2, p3, p4) => `+7 ${p2} ${p3} ${p4}`)
}

export const refreshTokens = async ($auth) => {
  const isTokenExpired = $auth.strategy.token.status().expired()
  const isRefreshExpired = $auth.strategy.refreshToken.status().expired()

  if (!$auth.loggedIn) {
    return
  }

  if (isRefreshExpired) {
    console.log('REFRESH EXPIRED !!!')
    await $auth.logout()

    return
  }

  if (isTokenExpired) {
    await $auth.refreshTokens()
  }
}
