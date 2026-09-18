<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import {
  authState,
  clearFirebaseRole,
  firebaseRole,
  logout as logoutWeek5,
  setFirebaseRole,
} from '../auth'
import { firebaseApp } from '../firebase'

const router = useRouter()
const firebaseAuth = getAuth(firebaseApp)
const firebaseUser = ref(firebaseAuth.currentUser)
let stopWatchingFirebaseAuth

const handleLogout = () => {
  logoutWeek5()
  router.push('/login')
}

const handleFirebaseLogout = async () => {
  try {
    await signOut(firebaseAuth)
    clearFirebaseRole()
    console.log('Firebase Logout Successful')
    console.log('Current Firebase user after logout:', firebaseAuth.currentUser)
    await router.push({ name: 'FireLogin', query: { loggedOut: 'true' } })
  } catch (error) {
    console.error('Firebase logout failed:', error.code, error.message)
  }
}

onMounted(() => {
  stopWatchingFirebaseAuth = onAuthStateChanged(firebaseAuth, (user) => {
    firebaseUser.value = user
    if (user?.email) {
      setFirebaseRole(user.email)
    } else {
      clearFirebaseRole()
    }
  })
})

onBeforeUnmount(() => {
  stopWatchingFirebaseAuth?.()
})
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills align-items-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" exact-active-class="active">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li v-if="!authState" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
        </li>
        <li v-else class="nav-item">
          <button type="button" class="nav-link" @click="handleLogout">Logout</button>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li v-if="!firebaseUser" class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li v-else class="nav-item">
          <button type="button" class="nav-link" @click="handleFirebaseLogout">
            Firebase Logout ({{ firebaseRole }})
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>
