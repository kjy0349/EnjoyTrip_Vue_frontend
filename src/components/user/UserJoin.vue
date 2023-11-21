<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const { VITE_VUE_API_URL_USER } = import.meta.env

const route = useRoute()
const router = useRouter()
const mbti = ref([
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ'
])

const user = ref({
  userId: '',
  userName: '',
  userPass: '',
  emailId: '',
  emailDomain: '',
  imgSrc: '',
  mbti: '',
  gender: '',
  age: 0
})

const onFileInfo = (event) => {
  user.value.imgSrc = event.target.files[0]
  console.log(user.value.imgSrc)
}

const onJoin = () => {
  const formData = new FormData()
  formData.append('userId', user.value.userId)
  formData.append('userPass', user.value.userPass)
  formData.append('userName', user.value.userName)
  formData.append('emailId', user.value.emailId)
  formData.append('emailDomain', user.value.emailDomain)
  formData.append('imgSrc', user.value.imgSrc)
  formData.append('mbti', user.value.mbti)
  formData.append('gender', user.value.gender)
  formData.append('age', user.value.age)

  axios
    .post(VITE_VUE_API_URL_USER + '/join', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('파일 업로드 성공')
      moveHome()
    })
    .catch((error) => {
      console.log('에러')
    })
}

const moveHome = () => {
  router.push({
    name: 'home'
  })
}
</script>

<template>
  <div class="container">
    <section class="content">
      <div class="signup-wrapper">
        <h1>회원가입</h1>
        <div class="mb-3">
          <input
            v-model="user.userName"
            type="text"
            class="form-control"
            id="userName"
            name="userName"
            aria-describedby="emailHelp"
            placeholder="이름"
          />
        </div>
        <div class="mb-3">
          <input
            v-model="user.userId"
            type="text"
            class="form-control"
            id="userId"
            name="userId"
            aria-describedby="emailHelp"
            placeholder="아이디"
          />
        </div>
        <div id="result-view" class="mb-3"></div>
        <div class="d-flex w-100 gap-2">
          <div class="mb-3 flex-grow-1">
            <input
              v-model="user.userPass"
              type="password"
              class="form-control"
              id="userPass"
              name="userPass"
              placeholder="비밀번호"
            />
          </div>
          <div class="mb-3 flex-grow-1">
            <input
              type="password"
              class="form-control"
              id="userpwdcheck"
              name="userpwdcheck"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div class="mb-3">
          <select v-model="user.mbti" class="me-5">
            <option disabled value="">MBTI를 선택하세요.</option>
            <option v-for="(item, index) in mbti" :key="item.index" :value="item">
              {{ item }}
            </option>
          </select>
          <select v-model="user.gender">
            <option disabled value="">성별을 선택하세요.</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        </div>
        <div class="mb-3">
          <select v-model="user.age">
            <option disabled value="">나이를 선택하세요.</option>
            <option v-for="i in 100" :key="index" :value="i">{{ i }}</option>
          </select>
        </div>
        <div class="mb-3 d-flex email form-control">
          <input
            v-model="user.emailId"
            type="text"
            class="border-0"
            id="emailId"
            name="emailId"
            placeholder="이메일"
          />
          <div class="border-0 form-control">@</div>
          <select
            v-model="user.emailDomain"
            class="border-0 form-select"
            name="emailDomain"
            id="emailDomain"
          >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
            <option value="ssafy.com">ssafy.com</option>
            <option value="google.com">google.com</option>
          </select>
        </div>
        <div class="mb-3 d-flex form-control">
          <input type="file" @change="onFileInfo" ref="servImage" />
        </div>
        <!-- <div class="mb-3 d-flex form-control">
          <img :src="img" alt="" />
          <button @click="loadImg">다운로드 버튼</button>
        </div> -->
        <button type="button" id="btn-join" class="w-100 btn signup-btn" @click="onJoin">
          회원가입
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
