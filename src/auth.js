import { readonly, ref } from 'vue'

const isAuthenticated = ref(false)

export const authState = readonly(isAuthenticated)

export const login = (username, password) => {
  const isValid = username === 'library' && password === 'week5'
  isAuthenticated.value = isValid
  return isValid
}

export const logout = () => {
  isAuthenticated.value = false
}
