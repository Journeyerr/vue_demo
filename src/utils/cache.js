import Cookies from 'js-cookie'

export function cache(key, value) {
  return Cookies.set(key, value)
}

export function getCache(key) {
  return Cookies.get(key)
}

export function removeCache(key) {
  return Cookies.remove(key)
}

export function getCacheToJsonParse(key) {
  return JSON.parse(getCache(key))
}
