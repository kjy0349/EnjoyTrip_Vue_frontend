<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { detailArticle, deleteArticle } from '@/api/board'
import { writeComment, getComments, deleteComment } from '@/api/comment'
import CommentItem from './comment/CommentItem.vue'

const route = useRoute()
const router = useRouter()

// const articleno = ref(route.params.articleno);
const { articleno } = route.params

const article = ref({})
const comments = ref([
  {
    commentNo: 0,
    userId: '',
    articleNo: 0,
    content: '',
    registerTime: ''
  },
  {
    commentNo: 1,
    userId: '1',
    articleNo: 1,
    content: '댓글1',
    registerTime: '1'
  },
  {
    commentNo: 2,
    userId: '2',
    articleNo: 2,
    content: '댓글2',
    registerTime: '2'
  },
  {
    commentNo: 3,
    userId: '3',
    articleNo: 3,
    content: '댓글3',
    registerTime: '3'
  }
])

onMounted(() => {
  getArticle()
})

const getArticle = () => {
  detailArticle(articleno, ({ data }) => {
    article.value = data.data
    console.log(article.value)
  })
}

const moveList = () => {
  router.push({ name: 'board' })
}
function moveModify() {
  console.log(articleno)
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
}

function onCreateComment() {
  console.log(comments.value.content)
  alert(comments.value.content)
  comments.value.articleNo = articleno
  // TODO: 세션에 있는 유저의 ID값을 가져와서 content.value.userId값에 넣을 것
  // 그리고 writeComment함수를 통해 댓글을 저장할 것
  // 그리고 이 페이지를 새로고침 할 것

  router.go()
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
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">{{ article.userId }}</span> <br />
                <span class="text-secondary fw-light">
                  {{ article.registerTime }} 조회 : {{ article.hit }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <!-- 댓글 입력 -->
          <div class="row d-flex justify-content-center">
            <!-- <div class="col-md-8 col-lg-6"> -->
            <div>
              <div class="card shadow-0 border" style="background-color: #f0f2f5">
                <div class="card-body p-4">
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="addANote"
                      class="form-control"
                      placeholder="댓글"
                      v-model="comments.content"
                      @keyup.enter="onCreateComment"
                    />
                  </div>
                  <CommentItem
                    v-for="comment in comments"
                    :key="comment.commentNo"
                    :comment="comment"
                  />
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

<style scoped></style>
