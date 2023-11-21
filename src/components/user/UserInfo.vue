<script setup>
import { onMounted, ref } from 'vue'
import { useMemberStore } from '@/api/member'
import axios from 'axios'

const { VITE_VUE_API_URL_USER } = import.meta.env
const memberStore = useMemberStore()

const img = ref('')
const userInfo = memberStore.userInfo

onMounted(() => {
  loadImg()
  // loadTripRoute()
})

const loadImg = () => {
  axios
    .get(VITE_VUE_API_URL_USER + `/file/${userInfo.userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((data) => {
      console.log('파일 업로드 성공')
      console.log(data)
      img.value = data.config.url
      console.log(img.value)
    })
    .catch((error) => {
      console.log('에러')
    })
}
</script>

<template>
  <!-- <div class="card">
    <img :src="img" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ userInfo.userId }}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </p>
    </div> -->
  <!-- 여기에 pinia에 있는 user정보를 뿌려 -->
  <!-- <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div> -->
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <img :src="img" class="card-img-top" alt="User Profile" />
          <div class="card-body">
            <h5 class="card-title">{{ userInfo.userName }}</h5>
            <p class="card-text">
              <strong>ID:</strong> {{ userInfo.userId }}<br />
              <strong>Email:</strong> {{ userInfo.emailId }}@{{ userInfo.emailDomain }} <br />
              <strong>MBTI:</strong> {{ userInfo.mbti }}<br />
              <strong>성별:</strong> {{ userInfo.gender }}<br />
              <strong>나이:</strong> {{ userInfo.age }}<br />
            </p>
          </div>
        </div>
      </div>
      <div>별점</div>
    </div>
  </div>
</template>

<style scoped></style>
