<script setup>
const props = defineProps({
  comment: Object,
});
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <p>{{ comment.content }}</p>

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
            alt="avatar"
            width="25"
            height="25"
          />
          <p class="small mb-0 ms-2">{{ comment.userId }}</p>
        </div>
        <div class="d-flex flex-row align-items-center">
          <p class="small text-muted mb-0">추천수</p>
          <i
            class="far fa-thumbs-up mx-2 fa-xs text-black"
            style="margin-top: -0.16rem"
          ></i>
          <p class="small text-muted mb-0">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
