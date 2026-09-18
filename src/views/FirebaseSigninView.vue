<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setFirebaseRole } from '../auth'
import { firebaseApp } from '../firebase'

const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const feedback = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const auth = getAuth(firebaseApp)

const signIn = async () => {
  feedback.value = ''
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value)
    const role = setFirebaseRole(auth.currentUser.email)

    console.log('Firebase Sign In Successful')
    console.log('Current Firebase authenticated user:', auth.currentUser)
    console.log('Current role:', role)
    feedback.value = 'Sign in successful.'

    await router.push({ name: 'Home' })
  } catch (error) {
    console.error('Firebase sign in failed:', error.code, error.message)
    errorMessage.value = `${error.code ?? 'Sign-in error'}: ${error.message}`
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mx-auto" style="max-width: 32rem">
    <div v-if="route.query.loggedOut === 'true'" class="alert alert-success" role="status">
      You are logged out. The current Firebase user is null.
    </div>
    <h1>Firebase Sign In</h1>
    <p class="text-muted">Sign in with a Firebase Email/Password account.</p>

    <form @submit.prevent="signIn">
      <div class="mb-3">
        <label for="firebase-signin-email" class="form-label">Email</label>
        <input
          id="firebase-signin-email"
          v-model="email"
          class="form-control"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="mb-3">
        <label for="firebase-signin-password" class="form-label">Password</label>
        <input
          id="firebase-signin-password"
          v-model="password"
          class="form-control"
          type="password"
          autocomplete="current-password"
          required
        />
      </div>

      <div v-if="feedback" class="alert alert-success" role="status">{{ feedback }}</div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Signing in...' : 'Sign in with Firebase' }}
      </button>
    </form>
  </section>
</template>
