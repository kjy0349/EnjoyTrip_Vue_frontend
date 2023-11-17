<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userJoin } from '../../api/user'

const route = useRoute()
const router = useRouter()

const user = ref({
  userId: '',
  userName: '',
  userPass: '',
  emailId: '',
  emailDomain: ''
})

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
        <button type="button" id="btn-join" class="w-100 btn signup-btn" @click="onJoin">
          회원가입
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
