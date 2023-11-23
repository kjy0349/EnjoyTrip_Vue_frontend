<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useMemberStore } from '@/api/member'
import { deleteComment } from '@/api/comment'
import { getArticleUserInfo } from '@/api/tboard'

const router = useRouter()
const memberStore = useMemberStore()

const { VITE_VUE_API_URL_USER } = import.meta.env
// const memberStore = useMemberStore()
// console.log(memberStore.userInfo.userId)

const props = defineProps({
  comment: Object,
  userId: String
})

const userInfo = ref(memberStore.userInfo)
const cmt = ref(props.comment)
const commentUserInfo = ref({})

onMounted(() => {
  loadImg()
  getArticleUserInfoFun()
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
const getArticleUserInfoFun = () => {
  console.log('1 글쓴이 정보 가져와')
  getArticleUserInfo(
    cmt.value.userId,
    ({ data }) => {
      commentUserInfo.value = data.data
      console.log('commentUserInfo')
      console.log(commentUserInfo.value)
    },
    (error) => {
      console.log(error)
    }
  )
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

const moveUserDetail = (userId) => {
  if (userId == userInfo.value.userId) {
    router.push({ name: 'user-info' })
  } else {
    router.push({ name: 'user-detail', params: { userId } })
  }
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <p>{{ comment.content }}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          <button
            class="btn btn-sm btn-danger"
            v-show="comment.userId == userInfo.userId"
            @click="onCommentDelete"
          >
            삭제
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img
            :src="img"
            alt="avatar"
            class="rounded-circle shadow-1-strong"
            width="40"
            height="40"
            @click="moveUserDetail(comment.userId)"
          />
          <img
            v-if="commentUserInfo.gender == '남자'"
            src="@/assets/img/male.png"
            style="width: 0.8rem; height: 0.8rem; display: inline"
            class="ms-2"
          />
          <img
            v-else
            src="@/assets/img/female.png"
            style="width: 0.8rem; height: 0.8rem"
            class="ms-2"
          />
          <div class="dropdown">
            <p
              type="button"
              class="small mb-0 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ comment.userId }}
            </p>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li>
                <a class="dropdown-item" @click="moveUserDetail(comment.userId)">프로필 보기</a>
              </li>
              <li><a class="dropdown-item">유저의 계획 보기</a></li>
            </ul>
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <p class="small text-muted mb-0">Upvote?</p>
            <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem"></i>
            <p class="small text-muted mb-0">3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
