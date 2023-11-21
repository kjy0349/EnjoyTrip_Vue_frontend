<script setup>
import TripBoardWriteItem from './item/TripBoardWriteItem.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글수정</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <!-- props로 글 작성인 걸 알려줄 write를 보냄 -->
        <TripBoardWriteItem type="modify" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
