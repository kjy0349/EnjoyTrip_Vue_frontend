<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useMemberStore } from '@/api/member'
import { deleteComment } from '@/api/comment'

const router = useRouter()
const memberStore = useMemberStore()

const { VITE_VUE_API_URL_USER } = import.meta.env
// const memberStore = useMemberStore()
// console.log(memberStore.userInfo.userId)

const props = defineProps({
  comment: Object
})

// const userInfo = ref({
//   userId: '',
//   userName: '',
//   userPass: '',
//   emailId: '',
//   emailDomain: '',
//   imgSrc: ''
// })
const userInfo = ref(memberStore.userInfo)
const cmt = ref(props.comment)

onMounted(() => {
  loadImg()
})

const img = ref('')

const loadImg = () => {
  axios
    .get(VITE_VUE_API_URL_USER + `/file/${props.comment.userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((data) => {
      img.value = data.config.url
    })
    .catch((error) => {
      console.log('에러')
    })
}

const onCommentDelete = () => {
  console.log('commentNo')
  console.log(cmt.value.commentNo)
  deleteComment(
    cmt.value.commentNo,
    () => {
      console.log('댓글 삭제 성공!')
      router.go()
    },
    (error) => {
      console.log('댓글 삭제 실패!')
      console.log(error)
    }
  )
}
</script>

<template>
  <!-- <div class="card mb-4">
    <div class="card-body">
      <template v-if="userInfo != null">
        <template v-if="cmt.userId == userInfo.userId">
          <div class="d-flex justify-content-end">
            <button @click="onCommentDelete">삭제</button>
          </div>
        </template>
      </template>
      <p>{{ comment.content }}</p>

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img :src="img" alt="avatar" width="25" height="25" />
          <p class="small mb-0 ms-2">{{ comment.userId }}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          <p class="small text-muted mb-0">추천수</p>
          <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem"></i>
          <p class="small text-muted mb-0">3</p>
        </div>
      </div>
    </div>
  </div> -->
  <div class="card mb-4">
    <div class="card-body">
      <p>{{ comment.content }}</p>

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img :src="img" alt="avatar" width="25" height="25" />
          <p class="small mb-0 ms-2">{{ comment.userId }}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          <p class="small text-muted mb-0">Upvote?</p>
          <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem"></i>
          <p class="small text-muted mb-0">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
