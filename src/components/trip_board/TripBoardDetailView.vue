<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { detailArticle, deleteArticle } from '@/api/tboard'
import { writeComment, getComments, deleteComment } from '@/api/tcomment'
import TripCommentItem from './comment/TripCommentItem.vue'
import { useMemberStore } from '@/api/member'
import axios from 'axios'

const { VITE_VUE_API_URL_USER } = import.meta.env
const memberStore = useMemberStore()
const route = useRoute()
const router = useRouter()
// const props = defineProps({ userId: String })

// const articleno = ref(route.params.articleno);
const { articleno, userId } = route.params

const article = ref({})
const comments = ref([])
const writeCommentObj = ref({
  userId: '',
  articleNo: '',
  content: ''
})

const sessionUserId = ref('')

const articleImg = ref('')
const sessionUserImg = ref('')

onMounted(async () => {
  await getArticle()
  await getSession()
  await loadArticleImg()
  await getCommentList()
})

const getSession = () => {
  if (memberStore.userInfo == null) {
    sessionUserId.value = ''
  } else {
    sessionUserId.value = memberStore.userInfo.userId
    loadSessionUserImg()
  }
}

const getArticle = () => {
  detailArticle(articleno, ({ data }) => {
    article.value = data.data
  })
}

const loadArticleImg = () => {
  axios
    .get(VITE_VUE_API_URL_USER + `/file/${userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((data) => {
      articleImg.value = data.config.url
    })
    .catch((error) => {
      console.log('에러')
    })
}

const loadSessionUserImg = () => {
  const userId = sessionUserId.value
  axios
    .get(VITE_VUE_API_URL_USER + `/file/${userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((data) => {
      sessionUserImg.value = data.config.url
    })
    .catch((error) => {
      console.log('에러')
    })
}

const moveList = () => {
  router.push({ name: 'board' })
}
function moveModify() {
  router.push({ name: 'board-modify', params: { articleno } })
}

function onDeleteArticle() {
  // const { articleno } = route.params;
  console.log(articleno + '번글 삭제하러 가자!!!')
  // API 호출
  deleteArticle(
    articleno,
    ({ data }) => {
      console.log('글 삭제 성공')
    },
    (error) => {
      console.log('글 삭제 실패')
    }
  )
  moveList()
}

const getCommentList = () => {
  // TODO: articleno에 종속돼있는 comment 리스트들 받아오기
  getComments(
    articleno,
    ({ data }) => {
      comments.value = data.data
      console.log('댓글 개수')
    },
    (error) => {
      console.log(error)
    }
  )
}

function onCreateComment() {
  if (memberStore.userInfo == null) {
    alert('로그인 후 댓글을 달아주세요!')
    router.push({ name: 'user-login' })
  } else {
    writeCommentObj.value.articleNo = articleno
    writeCommentObj.value.userId = memberStore.userInfo.userId
    // TODO: 세션에 있는 유저의 ID값을 가져와서 content.value.userId값에 넣을 것
    // 그리고 writeComment함수를 통해 댓글을 저장할 것
    // 그리고 이 페이지를 새로고침 할 것
    console.log('1 , onCreateComment')
    writeComment(
      writeCommentObj.value,
      () => {
        console.log('댓글 등록 성공')
        router.go()
      },
      (error) => {
        console.log('댓글 등록 에러')
      }
    )
    // router.go()
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="text-secondary px-5">
            {{ article.subject }}
          </h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img class="avatar me-2 float-md-start bg-light p-2 image" :src="articleImg" />
              <p>
                <span class="fw-bold">
                  <img src="@/assets/img/male.png" style="width: 1rem; height: 1rem" />
                  <img src="@/assets/img/female.png" style="width: 1rem; height: 1rem" />
                  {{ article.userId }}
                </span>
                <br />
                <span class="text-secondary fw-light">
                  {{ article.registerTime }} 조회 : {{ article.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : {{ comments.length }}</div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.planId }}번째 여행계획 선택됨 <br />
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <!-- 댓글 입력 -->
          <div class="row d-flex justify-content-center">
            <!-- <div class="col-md-8 col-lg-6"> -->
            <div>
              <TripCommentItem
                v-for="comment in comments"
                :key="comment.commentNo"
                :comment="comment"
                :userId="article"
              />
              <div class="card shadow-0 border" style="background-color: #f0f2f5">
                <div class="card-body p-4">
                  <!-- <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="addANote"
                      class="form-control"
                      placeholder="댓글"
                      v-model="writeCommentObj.content"
                      @keyup.enter="onCreateComment"
                      style="display: inline-block"
                    />
                    <button type="button" class="btn btn-primary btn-sm">댓글 작성</button>
                  </div> -->
                  <div class="card-footer py-3 border-0" style="background-color: #f8f9fa">
                    <div class="d-flex flex-start w-100">
                      <img
                        class="rounded-circle shadow-1-strong me-3"
                        :src="sessionUserImg"
                        alt="avatar"
                        width="40"
                        height="40"
                        v-if="sessionUserImg != ''"
                      />

                      <div class="form-outline w-100">
                        <textarea
                          type="text"
                          id="addANote"
                          class="form-control"
                          placeholder="댓글 작성..."
                          v-model="writeCommentObj.content"
                          @keyup.enter="onCreateComment"
                          rows="3"
                        />
                      </div>
                    </div>
                    <div class="float-end mt-2 pt-1">
                      <button type="button" class="btn btn-primary btn-sm" @click="onCreateComment">
                        댓글 작성
                      </button>
                      <button type="button" class="btn btn-outline-primary btn-sm">취소</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image {
  width: 150px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
