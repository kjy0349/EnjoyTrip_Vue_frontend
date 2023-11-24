<script setup>
import { ref, reactive } from 'vue'
import { useMemberStore } from '@/api/member'
import { storeToRefs } from 'pinia'
const props = defineProps({
  modifyFlag: Boolean,
  img: String
})

const memberStore = storeToRefs(useMemberStore())
const { userInfo } = memberStore

console.log('1 userInfo userInfo')
console.log(userInfo)

const emit = defineEmits(['moveUserModify', 'moveUserInfo', 'userDelete', 'userModify'])
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

const userDelete = () => {
  emit('userDelete')
}

const userModify = () => {
  emit('userModify')
}

const moveUserModify = () => {
  emit('moveUserModify')
}
const moveUserInfo = () => {
  emit('moveUserInfo')
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <img :src="img" class="card-img-top" alt="User Profile" />
          <div class="card-body">
            <h5 class="card-title">{{ userInfo.userId }}</h5>
            <div class="card-text row">
              <div class="col-3"></div>
              <div class="col-9">
                <div class="ps-0 text-start ms-auto">
                  <strong>이름:</strong>
                  <input
                    class="ms-2"
                    :readonly="modifyFlag"
                    style="border: none"
                    v-model="userInfo.userName"
                  />
                </div>
                <div class="ps-0 text-start ms-auto">
                  <div v-if="modifyFlag">
                    <strong>Email:</strong>
                    {{ userInfo.emailId }} @ {{ userInfo.emailDomain }}
                  </div>
                  <div v-else-if="!modifyFlag">
                    <strong>EmailId:</strong>
                    <input
                      class="ms-2"
                      v-model="userInfo.emailId"
                      :readonly="modifyFlag"
                      style="border: none"
                    /><br />
                    <strong>EmailDomain:</strong>
                    <input
                      class="ms-2"
                      v-model="userInfo.emailDomain"
                      :readonly="modifyFlag"
                      style="border: none"
                    />
                  </div>
                </div>
                <div class="ps-0 text-start ms-auto">
                  <strong>MBTI:</strong>
                  <input
                    v-if="modifyFlag"
                    class="ms-2"
                    style="border: none"
                    v-model="userInfo.mbti"
                    :readonly="modifyFlag"
                    type="text"
                  />

                  <select v-else v-model="userInfo.mbti" class="me-5">
                    <option disabled value="">MBTI를 선택하세요.</option>
                    <option v-for="(item, index) in mbti" :key="item.index" :value="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="ps-0 text-start ms-auto">
                  <strong>성별:</strong>
                  <input
                    v-if="modifyFlag"
                    class="ms-2"
                    style="border: none"
                    :value="userInfo.gender"
                    :readonly="modifyFlag"
                    type="text"
                  />
                  <select v-else v-model="userInfo.gender">
                    <option disabled value="{{userInfo.gender}}">성별을 선택하세요.</option>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                  </select>
                </div>
                <div class="ps-0 text-start ms-auto">
                  <strong>나이:</strong>
                  <input
                    class="ms-2"
                    style="border: none"
                    v-model="userInfo.age"
                    :readonly="modifyFlag"
                  />
                </div>
                <div class="ps-0 text-start ms-auto">
                  <strong>자기소개:</strong>
                  <input
                    class="ms-2"
                    v-model="userInfo.content"
                    :readonly="modifyFlag"
                    style="border: none"
                  /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-4 justify-content-center"></div>
        <div class="col-4 justify-content-center">
          <template v-if="modifyFlag">
            <button class="btn btn-primary mx-1" @click="moveUserModify">수정하기</button>
            <button class="btn btn-danger mx-1" @click="userDelete">탈퇴하기</button>
          </template>
          <template v-if="!modifyFlag">
            <button class="btn btn-primary mx-1" @click="userModify">수정 완료</button>
            <button class="btn btn-danger mx-1" @click="moveUserInfo">취소</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
