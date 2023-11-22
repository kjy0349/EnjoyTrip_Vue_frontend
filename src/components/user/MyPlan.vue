<script setup>
import { onMounted, ref } from 'vue'
import { useMemberStore } from '@/api/member'
import { getMyTripInfos } from '@/api/user'
import { detailArticle, getTripRouteDetails, getArticleUserInfo } from '@/api/tboard'
const store = useMemberStore()
const userInfo = store.userInfo
const ownTripLists = ref()
onMounted(() => {
  getMyTripInfos(userInfo.userId, ({ data }) => {
    ownTripLists.value = data.data
    ownTripLists.value.forEach((response) => {
      getTripRouteDetails(response.planId, ({ data }) => {
        console.log(data.data)
      })
    })
    // ownTripLists.value += getTripRouteDetails(value.planId)
  })
})
// getTripRouteDetails(article.value.planId, ({ data }) => {
//   routeDetails.value = data.data
// })
</script>

<template>
  <div class="row">
    <div
      class="card col"
      style="width: 18rem"
      v-for="(article, index) in ownTripLists"
      :key="article.articleNo"
    >
      <img class="card-img-top" src="..." alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">게시글 제목 : {{ article.subject }}</h5>
        <p class="card-text overflow-hidden">
          {{ article.content }}
        </p>
        <p class="card-text">예상 경비 : {{ article.cost }}</p>
        <router-link
          :to="{
            name: 'tboard-view',
            params: { articleno: article.articleNo, userId: article.userId }
          }"
          class="btn btn-primary"
          >게시글로 이동하기</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
