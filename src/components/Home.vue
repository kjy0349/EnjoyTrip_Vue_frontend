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
        <div class="carousel-item active">
          <img src="@/assets/img/boat.jpg" class="w-100" alt="..." />
        </div>
        <div class="carousel-item active">
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

  <!-- 메인 화면 사진 슬라이드 -->
  <!-- <div
    id="carouselExampleCaptions"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="..." class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div> -->

  <div class="container">
    <h1 class="fw-light text-center text-lg-start mt-4 mb-0">Thumbnail Gallery</h1>

    <hr class="mt-2 mb-5" />

    <div class="row text-center text-lg-start">
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/pWkk7iiCoDM/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/aob0ukAYfuI/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/EUfxH-pze7s/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/M185_qYH8vg/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/sesveuG_rNo/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/AvhMzHwiE_0/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/2gYsZUmockw/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/EMSDtjVHdQ8/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/8mUEy0ABdNE/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/G9Rfc1qccH4/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/aJeH0KcFkuc/400x300"
            alt=""
          />
        </a>
      </div>
      <div class="col-lg-3 col-md-4 col-6">
        <a href="#" class="d-block mb-4 h-100">
          <img
            class="img-fluid img-thumbnail"
            src="https://source.unsplash.com/p2TQ-3Bh3Oo/400x300"
            alt=""
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
