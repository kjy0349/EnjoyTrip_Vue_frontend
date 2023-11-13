<template>
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

const articles = ref([])

onMounted(() => {
  getArticles()
})

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
