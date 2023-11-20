<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const places = ref(JSON.parse(route.params.places))

console.log(places.value)
</script>

<template>
  <div><h1>오긴왔음</h1></div>

  <div v-for="place in places" :key="place.contentId">
    <img :src="place.firstImage" style="width: 120px; height: 120px" />
    {{ place.title }}
  </div>
</template>

<style scoped></style>
