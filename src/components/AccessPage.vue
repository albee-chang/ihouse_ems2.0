<template>
  <div class="container">
    <ul class="list-unstyled d-flex page-box">
      <li><a class="text-decoration-none" href="#">帳號</a></li>
      <li><a class="text-decoration-none" href="#">頁面</a></li>
    </ul>
  </div>
  <h1>{{ msg }}</h1>

  <div class="card">
    
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>
