<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BHeader from './components/BHeader.vue'

const route = useRoute()
const showHeader = computed(() => !['CountBookAPI', 'GetAllBookAPI'].includes(route.name))
</script>

<template>
  <div class="main-container">
    <BHeader v-if="showHeader" />
    <main class="main-box container pb-5">
      <router-view></router-view>
    </main>
  </div>
</template>
