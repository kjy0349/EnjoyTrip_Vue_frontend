<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const moveWrite = () => {
  router.push({ name: 'board-write' })
}
</script>

<template>
  <div class="container">
    <div class="text-center row">
      <h1 class="text-success my-3">Q&A</h1>
      <p>여러분의 경험을 공유해주세요</p>
      <div class="row justify-content-end">
        <div class="col-2 my-3">
          <button type="button" class="btn btn-secondary" @click="moveWrite">글쓰기</button>
        </div>
        <input
          id="search-keyword"
          class="form-control col-2 me-2"
          type="search"
          placeholder="검색어"
          aria-label="검색어"
        />
        <button
          id="btn-search"
          class="btn btn-outline-primary col-2"
          type="button"
          @click="getList"
        >
          검색
        </button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
