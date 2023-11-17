<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { writeArticle, detailArticle, modifyArticle } from '../../../api/board'
import { useMemberStore } from '@/api/member'
import { storeToRefs } from 'pinia'
const memberStore = useMemberStore()
const userInfo = memberStore.userInfo

const router = useRouter()
const route = useRoute()

const props = defineProps({ type: String })

const article = ref({
  articleNo: 0,
  subject: '',
  content: '',
  userId: '',
  hit: 0,
  registerTime: ''
})

// 전달 받은 type이 글 수정(modify)라면 글 수정
if (props.type === 'modify') {
  let { articleno } = route.params
  console.log(articleno + '번글 얻어와서 수정할거야')
  // API 호출
  detailArticle(articleno, ({ data }) => {
    const userId = memberStore.userInfo.userId
    article.value = data.data
    if (userId !== article.value.userId) {
      alert('본인이 쓰지 않은 글은 수정 할 수 없습니다.')
      router.push({ name: 'board-list' })
    }
  })
} else {
  article.value.userId = userInfo.userId
}

const subjectErrMsg = ref('')
const contentErrMsg = ref('')
watch(
  () => article.value.subject,
  (value) => {
    let len = value.length
    if (len == 0 || len > 30) {
      subjectErrMsg.value = '제목을 확인해 주세요!!!'
    } else subjectErrMsg.value = ''
  },
  { immediate: true }
)
watch(
  () => article.value.content,
  (value) => {
    let len = value.length
    if (len == 0 || len > 500) {
      contentErrMsg.value = '내용을 확인해 주세요!!!'
    } else contentErrMsg.value = ''
  },
  { immediate: true }
)

function onSubmit() {
  // event.preventDefault();

  if (subjectErrMsg.value) {
    alert(subjectErrMsg.value)
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value)
  } else {
    // 글쓰기가 맞다면 글쓰기 함수 호출, 아니라면 update함수 호출
    props.type === 'write' ? writeArticleFunc() : updateArticle()
  }
}

function writeArticleFunc() {
  console.log('글등록하자!!', article.value)
  writeArticle(
    article.value,
    () => {
      console.log('글등록 성공')
      moveList()
    },
    (error) => {
      console.log('글 등록 에러')
    }
  )

  // API 호출
}

function updateArticle() {
  console.log(article.value.articleNo + '번글 수정하자!!', article.value)
  modifyArticle(
    article.value,
    () => {
      console.log('글 수정 성공')
      moveList()
    },
    (error) => {
      console.log('글 수정 에러')
    }
  )
  // API 호출
}

function moveList() {
  router.push({ name: 'board' })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        placeholder="작성자ID..."
        :value="userInfo.userId"
        disabled
      />
    </div>
    <div class="mb-3">
      <label for="subject" class="form-label">제목 : </label>
      <input type="text" class="form-control" v-model="article.subject" placeholder="제목..." />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="article.content" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'write'">
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
