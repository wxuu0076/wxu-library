<script setup>
import { ref } from 'vue'
import axios from 'axios'

const COUNT_BOOKS_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:5001/fit5032-6461f/us-central1/countBooks'
  : 'https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/countBooks'

const count = ref(null)
const hasError = ref(false)

const getBookCount = async () => {
  count.value = null
  hasError.value = false

  try {
    const response = await axios.get(COUNT_BOOKS_URL)
    count.value = response.data.count
  } catch (error) {
    console.error('Unable to get the book count:', error)
    hasError.value = true
  }
}
</script>

<template>
  <section class="mx-auto" style="max-width: 40rem">
    <h1>Book Counter</h1>
    <button type="button" class="btn btn-primary my-3" @click="getBookCount">
      Get Book Count
    </button>

    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-else-if="hasError">error</p>
  </section>
</template>
