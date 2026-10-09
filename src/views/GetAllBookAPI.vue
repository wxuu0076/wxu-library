<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const GET_ALL_BOOKS_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:5001/fit5032-6461f/us-central1/getAllBooks'
  : 'https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/getAllBooks'

const jsonData = ref(null)
const formattedJson = computed(() => JSON.stringify(jsonData.value, null, 2))

const getAllBooksAPI = async () => {
  try {
    const response = await axios.get(GET_ALL_BOOKS_URL)
    jsonData.value = response.data
  } catch (error) {
    console.error('Unable to get books:', error)
    jsonData.value = { error: 'Unable to get books' }
  }
}

onMounted(getAllBooksAPI)
</script>

<template>
  <pre>{{ formattedJson }}</pre>
</template>
