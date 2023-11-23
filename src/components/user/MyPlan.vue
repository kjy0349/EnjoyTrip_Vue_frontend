<script setup>
import { onMounted, ref } from 'vue'
import { useMemberStore } from '@/api/member'
import { getMyTripInfos } from '@/api/user'
import { detailArticle, getTripRouteDetails, getTripArticlesById } from '@/api/tboard'
const store = useMemberStore()
const userInfo = store.userInfo
const pickedTripLists = ref([])
const myTripLists = ref([])
onMounted(async () => {
  await getMyTripInfos(userInfo.userId, ({ data }) => {
    pickedTripLists.value = data.data
  })
  for (let article of pickedTripLists.value) {
    getTripRouteDetails(article.planId, ({ data }) => {
      article.image = data.data[0].firstImage
    })
  }
  await getTripArticlesById(userInfo.userId, ({ data }) => {
    myTripLists.value = data.data
  })
  for (let article of myTripLists.value) {
    getTripRouteDetails(article.planId, ({ data }) => {
      article.image = data.data[0].firstImage
    })
  }
})
// getTripRouteDetails(article.value.planId, ({ data }) => {
//   routeDetails.value = data.data
// })
</script>

<template>
  <div class="row">
    <p style="text-align: start; font-size: larger" v-if="myTripLists.length > 0">
      내가 작성한 여행 계획들
    </p>
    <p style="text-align: start; font-size: larger" v-else>
      내가 작성한 여행 계획이 존재하지 않습니다.
    </p>
    <div class="row">
      <div
        class="card col"
        style="width: 18rem"
        v-for="(article, index) in myTripLists"
        :key="article.articleNo"
      >
        <img class="card-img-top" :src="article.image" alt="Card image cap" />
        <div class="card-body h-50">
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
    <p class="mt-5" style="text-align: start; font-size: larger" v-if="pickedTripLists.length > 0">
      내가 뽑힌 여행 계획들
    </p>
    <p style="text-align: start; font-size: larger" v-else>
      내가 뽑힌 여행 계획이 존재하지 않습니다.
    </p>
    <div class="row">
      <div
        class="card col"
        style="width: 18rem"
        v-for="(article, index) in pickedTripLists"
        :key="article.articleNo"
      >
        <img class="card-img-top" :src="article.image" alt="Card image cap" />
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
  </div>
</template>

<style scoped></style>
