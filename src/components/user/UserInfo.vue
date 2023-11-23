<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMemberStore } from '@/api/member'
import axios from 'axios'
import { deleteUser, modifyUser } from '@/api/user'
import InfoItem from '@/components/user/item/InfoItem.vue'
import { storeToRefs } from 'pinia'

const { VITE_VUE_API_URL_USER } = import.meta.env
const memberStore = useMemberStore()

const router = useRouter()
const route = useRoute()

const modifyFlag = ref(route.params.modifyFlag)
const img = ref('')
const { userInfo } = storeToRefs(memberStore)

onMounted(() => {
  loadImg()
  // loadTripRoute()
})

const loadImg = () => {
  axios
    .get(VITE_VUE_API_URL_USER + `/file/${userInfo.value.userId}`, {
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

const userDelete = () => {
  deleteUser(
    userInfo.value.userId,
    () => {
      console.log('성공!')
      router.push({ name: 'home' })
    },
    () => {
      console.log('실패!')
    }
  )
}

const userModify = () => {
  console.log('100살로 바꿈')
  console.log(userInfo.value)
  modifyUser(
    userInfo.value,
    () => {
      console.log('수정 성공!')
      router.push({ name: 'home' })
    },
    (error) => {
      console.log(error)
    }
  )
}

const moveUserModify = () => {
  console.log('수정 화면으로~')
  modifyFlag.value = false
}
const moveUserInfo = () => {
  console.log('취소')
  modifyFlag.value = true
}
</script>

<template>
  <InfoItem
    :modifyFlag="modifyFlag"
    :img="img"
    @moveUserModify="moveUserModify"
    @moveUserInfo="moveUserInfo"
    @userDelete="userDelete"
    @userModify="userModify"
  ></InfoItem>
</template>

<style scoped></style>
