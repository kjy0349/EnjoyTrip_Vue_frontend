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
  <a-pagination
    v-model:current="param.pgno"
    :total="total"
    @change="onPageChanged"
    show-less-items
  />
</template>

<script setup>
import BoardListItem from './item/BoardListItem.vue'
import { useRouter } from 'vue-router'
import { listArticle, totalPage } from '@/api/board'
import { onMounted, ref } from 'vue'
import { searchArticleBySubject } from '../../api/board'

const articles = ref([])
const searchValue = ref('')
const total = ref(0)
const router = useRouter()
const param = ref({
  pgno: 1,
  // 몇 개의 리스트 받아올꺼야
  pageSize: 10
})

const moveWrite = () => {
  router.push({ name: 'board-write' })
}

onMounted(async () => {
  await getArticles()
  getTotal()
})

const search = () => {
  searchArticleBySubject(
    searchValue,
    param,
    ({ data }) => {
      articles.value = data.data
    },
    (error) => {
      console.log(error)
    }
  )
}

const getTotal = () => {
  totalPage(
    ({ data }) => {
      total.value = data.data
      console.log('total : ' + total.value)
    },
    (error) => {
      console.log(error)
    }
  )
}

const getArticles = async () => {
  await listArticle(
    param.value.pgno,
    param.value.pageSize,
    ({ data }) => {
      articles.value = data.data
    },
    (error) => {
      console.log(error)
    }
  )
}

const onPageChanged = () => {
  console.log(param.value.pgno)
  getArticles()
  console.log(articles.value)
}
</script>

<style scoped></style>
