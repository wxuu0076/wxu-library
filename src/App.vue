<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-container">
    <BHeader />
    <main class="main-box container pb-5">
      <router-view></router-view>
    </main>
  </div>
</template>
