<script setup>
import { ref } from 'vue'
import { FwbInput } from 'flowbite-vue'

const name = ref('')
const pass = ref('')
</script>

<template>
  <fwb-input v-model="name" placeholder="ID 입력.." label="아이디" />
  <fwb-input v-model="name" placeholder="PASS 입력.." label="비밀번호" />
</template>

<style scoped></style>
