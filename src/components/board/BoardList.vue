<template>
  <div class="row justify-content-end">
    <div class="col-2 my-3">
      <input
        id="search-keyword"
        class="form-control"
        type="search"
        placeholder="검색어"
        aria-label="검색어"
        v-model="searchValue"
      />
    </div>
    <div class="col-1 my-3">
      <button id="btn-search" class="btn btn-outline-primary" type="button" @click="search">
        검색
      </button>
    </div>
    <div class="col-2 my-3">
      <button type="button" class="btn btn-secondary" @click="moveWrite">글쓰기</button>
    </div>
  </div>
  <table class="table table-striped">
    <thead>
      <tr class="text-center">
        <th scope="col">No</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">조회수</th>
        <th scope="col">작성일</th>
      </tr>
    </thead>
    <tbody>
      <BoardListItem
        v-for="article in articles"
        :key="article.articleNo"
        :article="article"
      ></BoardListItem>
    </tbody>
  </table>
</template>

<script setup>
import BoardListItem from './item/BoardListItem.vue'
import { useRouter } from 'vue-router'
import { listArticle } from '@/api/board'
import { onMounted, ref } from 'vue'
import { searchArticleBySubject } from '../../api/board'

const articles = ref([])
const searchValue = ref('')

onMounted(() => {
  getArticles()
})

const search = () => {
  searchArticleBySubject(
    searchValue,
    ({ data }) => {
      articles.value = data.data
    },
    (error) => {
      console.log(error)
    }
  )
}

const getArticles = () => {
  listArticle(
    ({ data }) => {
      articles.value = data.data
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<style scoped></style>
