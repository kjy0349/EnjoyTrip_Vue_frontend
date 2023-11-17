<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/api/member'

const router = useRouter()

const memberStore = useMemberStore()

const { isLogin } = storeToRefs(memberStore)
const { userLogin, getUserInfo } = memberStore
// const { changeMenuState } = useMenuStore()

const loginUser = ref({
  userId: '',
  userPwd: ''
})

const onLogin = async () => {
  console.log('login ing!!!! !!!')
  await userLogin(loginUser.value)
  let token = sessionStorage.getItem('accessToken')
  console.log('111. ', token)
  console.log('isLogin: ', isLogin)
  if (isLogin) {
    console.log('로그인 성공아닌가???')
    getUserInfo(token)
    // changeMenuState()
  }
  router.push('/')
}
</script>

<template>
  <div class="form-floating mb-3">
    <input
      v-model="loginUser.userId"
      type="id"
      class="form-control"
      id="floatingInput"
      placeholder="name@example.com"
    />
    <label for="floatingInput">UserId</label>
  </div>
  <div class="form-floating mb-3">
    <input
      v-model="loginUser.userPwd"
      type="password"
      class="form-control"
      id="floatingPassword"
      placeholder="Password"
    />
    <label for="floatingPassword">Password</label>
  </div>

  <button type="button" class="btn btn-secondary" :to="{ name: 'home' }" @click="onLogin">
    로그인
  </button>
</template>

<style scoped></style>
