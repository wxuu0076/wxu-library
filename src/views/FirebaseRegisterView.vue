<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { firebaseApp } from '../firebase'

const router = useRouter()
const email = ref('')
const password = ref('')
const feedback = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const auth = getAuth(firebaseApp)

const register = async () => {
  feedback.value = ''
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value,
    )

    console.log('Firebase Register Successful')
    console.log('Registered Firebase user:', userCredential.user)
    feedback.value = 'Registration successful. You can now sign in.'

    await router.push({ name: 'FireLogin' })
  } catch (error) {
    console.error('Firebase registration failed:', error.code, error.message)
    errorMessage.value = `${error.code ?? 'Registration error'}: ${error.message}`
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mx-auto" style="max-width: 32rem">
    <h1>Create a Firebase Account</h1>
    <p class="text-muted">Register with an email address and password.</p>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="firebase-register-email" class="form-label">Email</label>
        <input
          id="firebase-register-email"
          v-model="email"
          class="form-control"
          type="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="mb-3">
        <label for="firebase-register-password" class="form-label">Password</label>
        <input
          id="firebase-register-password"
          v-model="password"
          class="form-control"
          type="password"
          autocomplete="new-password"
          minlength="6"
          required
        />
        <div class="form-text">Firebase passwords must contain at least 6 characters.</div>
      </div>

      <div v-if="feedback" class="alert alert-success" role="status">{{ feedback }}</div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Registering...' : 'Register with Firebase' }}
      </button>
    </form>
  </section>
</template>
