<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <!-- JSON arrays -->
    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>

      <p>
        Our <code>authors.json</code> contains an array of author objects.
      </p>

      <h3>Iterating through Arrays</h3>

      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>

      <p>Authors born after 1850:</p>

      <ul>
        <li
          v-for="author in modernAuthors"
          :key="author.id"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>

      <p>Famous works:</p>

      <ul>
        <li
          v-for="work in allFamousWorks"
          :key="work"
        >
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>

      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>

      <p>{{ austen?.name }}'s works:</p>

      <ul>
        <li
          v-for="work in austen?.famousWorks || []"
          :key="work.title"
        >
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <!-- JSON object -->
    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>

      <p>
        Our <code>bookstores.json</code> is a JSON object.
      </p>

      <h3>Accessing Properties</h3>

      <p>Company: {{ bookstores.name }}</p>
      <p>Total Stores: {{ bookstores.totalStores }}</p>

      <h3>Iterating Object Properties</h3>

      <p>Store Types:</p>

      <ul>
        <li
          v-for="(numberOfStores, storeType) in bookstores.storeTypes"
          :key="storeType"
        >
          {{ storeType }}: {{ numberOfStores }}
        </li>
      </ul>

      <h3>Nested Objects</h3>

      <p>Opening Hours:</p>

      <ul>
        <li
          v-for="(hours, day) in bookstores.openingHours"
          :key="day"
        >
          {{ day }}: {{ hours.open }} – {{ hours.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>

      <p>We operate in: {{ bookstores.countries.join(", ") }}</p>
      <p>Our #1 seller: {{ bookstores.topSellers[0] }}</p>
    </section>

    <!-- v-if and v-else -->
    <section class="lab-section">
      <h2>v-if &amp; v-else</h2>

      <p>Toggle visibility based on a condition.</p>

      <button @click="showMessage = !showMessage">
        Toggle Message
      </button>

      <p
        v-if="showMessage"
        class="message success"
      >
        ✨ You're a Vue superstar! ✨
      </p>

      <p
        v-else
        class="message"
      >
        Click the button to see a message.
      </p>
    </section>

    <!-- Author highlight -->
    <section class="lab-section">
      <h2>
        Attribute, Class and Style Binding with
        <code>v-bind</code>
      </h2>

      <p>Highlighting Specific Authors:</p>
      <p>Click an author to highlight them.</p>

      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :title="`Click to highlight ${author.name}`"
          :style="{
            cursor: 'pointer',
            backgroundColor:
              selectedAuthorId === author.id
                ? '#42b883'
                : '#f0f0f0',
            color:
              selectedAuthorId === author.id
                ? 'white'
                : '#333333',
            fontWeight:
              selectedAuthorId === author.id
                ? 'bold'
                : 'normal'
          }"
          @click="
            selectedAuthorId =
              selectedAuthorId === author.id
                ? null
                : author.id
          "
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"

import authors from "../assets/json/authors.json"
import bookstores from "../assets/json/bookstores.json"

const showMessage = ref(false)
const selectedAuthorId = ref(null)

const modernAuthors = computed(() =>
  authors.filter((author) => author.birthYear > 1850)
)

const allFamousWorks = computed(() =>
  authors.flatMap((author) =>
    author.famousWorks.map((work) => work.title)
  )
)

const orwell = computed(() =>
  authors.find((author) => author.name === "George Orwell")
)

const austen = computed(() =>
  authors.find((author) => author.name === "Jane Austen")
)
</script>

<style scoped>
.json-lab {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}

h1 {
  text-align: center;
}

.lab-section {
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

.message {
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
}

.success {
  color: #42b883;
  background-color: #e7faf3;
  border: 1px solid #42b883;
}

code {
  padding: 2px 5px;
  background-color: #e0e0e0;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  padding: 10px;
  margin: 5px 0;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>