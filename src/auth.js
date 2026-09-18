import { readonly, ref } from 'vue'

const isAuthenticated = ref(false)
const activeFirebaseRole = ref(null)

const firebaseRolesByEmail = {
  'admin@week7.test': 'admin',
  'user@week7.test': 'user',
}

export const authState = readonly(isAuthenticated)
export const firebaseRole = readonly(activeFirebaseRole)

export const login = (username, password) => {
  const isValid = username === 'library' && password === 'week5'
  isAuthenticated.value = isValid
  return isValid
}

export const logout = () => {
  isAuthenticated.value = false
}

export const setFirebaseRole = (email) => {
  activeFirebaseRole.value = firebaseRolesByEmail[email?.trim().toLowerCase()] ?? 'user'
  return activeFirebaseRole.value
}

export const clearFirebaseRole = () => {
  activeFirebaseRole.value = null
}
