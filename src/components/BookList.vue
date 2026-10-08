<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import db from '../firebase/init'

const books = ref([])
let stopWatchingBooks

const booksQuery = query(
  collection(db, 'books'),
  where('isbn', '>', 1000),
  orderBy('isbn'),
  limit(10),
)

const updateBook = async (book) => {
  await updateDoc(doc(db, 'books', book.id), {
    isbn: Number(book.isbn),
    name: book.name,
  })
}

const deleteBook = async (id) => {
  await deleteDoc(doc(db, 'books', id))
}

onMounted(() => {
  stopWatchingBooks = onSnapshot(booksQuery, (querySnapshot) => {
    books.value = querySnapshot.docs.map((book) => ({
      id: book.id,
      isbn: book.data().isbn,
      name: book.data().name,
    }))
  })
})

onBeforeUnmount(() => {
  stopWatchingBooks?.()
})
</script>

<template>
  <section>
    <h2>Books with ISBN &gt; 1000</h2>

    <div v-for="book in books" :key="book.id" class="row g-2 align-items-end mb-3">
      <div class="col-sm-3">
        <label :for="`isbn-${book.id}`" class="form-label">ISBN</label>
        <input
          :id="`isbn-${book.id}`"
          v-model="book.isbn"
          class="form-control"
          type="number"
          required
        />
      </div>
      <div class="col-sm-5">
        <label :for="`name-${book.id}`" class="form-label">Name</label>
        <input :id="`name-${book.id}`" v-model="book.name" class="form-control" required />
      </div>
      <div class="col-sm-4">
        <button type="button" class="btn btn-primary me-2" @click="updateBook(book)">
          Update
        </button>
        <button type="button" class="btn btn-danger" @click="deleteBook(book.id)">
          Delete
        </button>
      </div>
    </div>
  </section>
</template>
