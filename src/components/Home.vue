<script setup></script>

<template>
  <div class="ps-5 pt-5 pe-5">
    <h3 class="fw-semibold">여러 관광지를 보여드립니다!</h3>
  </div>
  <div class="p-5">
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/img/boat.jpg" class="w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/boat.jpg" class="w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/img/boat.jpg" class="w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
