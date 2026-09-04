<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../auth'
import AccessDeniedView from './AccessDeniedView.vue'

const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')
const loginError = ref('')

const submitLogin = () => {
  if (login(username.value, password.value)) {
    const destination = typeof route.query.redirect === 'string' ? route.query.redirect : '/about'
    router.push(destination)
  } else {
    loginError.value = 'Invalid username or password.'
  }
}
</script>

<template>
  <section class="mx-auto" style="max-width: 32rem">
    <AccessDeniedView v-if="route.query.denied === 'true'" />
    <h1>Member Login</h1>
    <p class="text-muted">For this Week 5 demonstration, use library / week5.</p>
    <form @submit.prevent="submitLogin">
      <div class="mb-3">
        <label for="login-username" class="form-label">Username</label>
        <input id="login-username" v-model="username" class="form-control" type="text" />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input id="login-password" v-model="password" class="form-control" type="password" />
      </div>
      <div v-if="loginError" class="text-danger mb-3">{{ loginError }}</div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>
