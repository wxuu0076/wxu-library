<script setup>
import { ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import BookList from '../components/BookList.vue'
import db from '../firebase/init'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
  await addDoc(collection(db, 'books'), {
    isbn: Number(isbn.value),
    name: name.value,
  })

  isbn.value = ''
  name.value = ''
}
</script>

<template>
  <section class="mx-auto" style="max-width: 40rem">
    <h1>Add Book</h1>

    <form class="mb-5" @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input id="isbn" v-model="isbn" class="form-control" type="number" required />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" v-model="name" class="form-control" type="text" required />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <BookList />
  </section>
</template>
