<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userJoin } from '../../api/user'
import axios from 'axios'

const { VITE_VUE_API_URL_USER } = import.meta.env

const route = useRoute()
const router = useRouter()

const user = ref({
  userId: '1',
  userName: '1',
  userPass: '1',
  emailId: '1',
  emailDomain: '1',
  imgSrc: '1'
})

const image = ref('')

// const fileInfo = ref({
//   saveFolder: '1',
//   originalFile: '1',
//   saveFile: '1',
//   // 나중에 여길 session의 userId값으로 고쳐
//   userId: '1'
// })

const onFileInfo = (event) => {
  user.value.imgSrc = event.target.files[0]
  // fileInfo.value.originalFile = event.target.files[0].name
  console.log(user.value.imgSrc)
}

const onTest = () => {
  const formData = new FormData()
  formData.append('userId', user.value.userId)
  formData.append('userPass', user.value.userPass)
  formData.append('userName', user.value.userName)
  formData.append('emailId', user.value.emailId)
  formData.append('emailDomain', user.value.emailDomain)
  formData.append('imgSrc', user.value.imgSrc)

  axios
    .post(VITE_VUE_API_URL_USER + '/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('파일 업로드 성공')
    })
    .catch((error) => {
      console.log('에러')
    })
}

const onJoin = () => {
  userJoin(
    user.value,
    ({ data }) => {
      console.log('회원가입 성공')
      moveHome()
    },
    (error) => {
      console.log('회원가입 실패')
    }
  )
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
        <div id="result-view-pwd" class="mb-3"></div>
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
        <button type="button" id="btn-join" class="w-100 btn signup-btn" @click="onTest">
          테스트 버튼
        </button>
        <button type="button" id="btn-join" class="w-100 btn signup-btn" @click="onJoin">
          회원가입
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
