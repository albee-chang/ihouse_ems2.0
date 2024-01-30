<template>
    <ul class="list-unstyled d-flex page-box mb-4" v-if="navWhereRef === 'access'">
        <li class="page-item">
            <router-link to="/access/accountManger" class="page-link fs-4">帳號</router-link>
        </li>
        <li class="page-item">
            <router-link to="/access/pageManger" class="page-link fs-4">頁面</router-link>
        </li>
    </ul>
    <ul class="list-unstyled d-flex page-box mb-4" v-if="navWhereRef === 'devices'">
        <li class="page-item">
            <router-link to="/devices/devicesManger" class="page-link fs-4">裝置列表</router-link>
        </li>
        <li class="page-item">
            <router-link to="/devices/locationManger" class="page-link fs-4">點位列表</router-link>
        </li>
    </ul>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps([
  'navWhere'
])
const navWhereRef = ref(props.navWhere)
</script>
