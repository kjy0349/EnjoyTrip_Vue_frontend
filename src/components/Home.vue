<script setup></script>

<template>
  <header class="bg-dark py-5">
    <div class="container px-5">
      <div class="row gx-5 align-items-center justify-content-center">
        <div class="col-lg-8 col-xl-7 col-xxl-6">
          <div class="my-5 text-center text-xl-start">
            <h1 class="display-5 fw-bolder text-white mb-2">동행 친구를 찾아보세요.</h1>
            <p class="lead fw-normal text-white-50 mb-4">
              동행 친구를 구하기위한 다양한 정보와 커뮤니티를 제공합니다. 약간의 용기만 있다면,
              당신도 할 수 있어요.
            </p>
            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
              <router-link :to="{ name: 'tripinfo' }" class="btn btn-primary btn-lg px-4 me-sm-3"
                >시작해보기</router-link
              >
              <a class="btn btn-outline-light btn-lg px-4" href="#features">배워보기</a>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
          <img class="img-fluid rounded-3 my-5" src="@/assets/img/plane.jpg" alt="..." />
        </div>
      </div>
    </div>
  </header>

  <!-- Features section-->
  <section class="py-5" id="features">
    <div class="container px-5 my-5">
      <div class="row gx-5">
        <div class="col-lg-4 mb-5 mb-lg-0">
          <h2 class="fw-bolder mb-0">동행하기 좋은 날</h2>
        </div>
        <div class="col-lg-8">
          <div class="row gx-5 row-cols-1 row-cols-md-2">
            <div class="col mb-5 h-100">
              <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i class="bi bi-collection"></i>
              </div>
              <h2 class="h5">동행 구하기</h2>
              <p class="mb-0">
                전국에 있는 다양한 사람들과 만나보세요. <br />
                EnjoyTrip은 전역에서 서비스 됩니다.
              </p>
            </div>
            <div class="col mb-5 h-100">
              <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i class="bi bi-building"></i>
              </div>
              <h2 class="h5">쉽게 보는 사용자 정보</h2>
              <p class="mb-0">
                동행하고 싶은 사람을 쉽게 찾을 수 있습니다. <br />
                나이, 사진 등 나와 맞는 요소를 통해 동행을 찾아보세요.
              </p>
            </div>
            <div class="col mb-5 mb-md-0 h-100">
              <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i class="bi bi-toggles2"></i>
              </div>
              <h2 class="h5">내 맘대로 여행경로</h2>
              <p class="mb-0">
                전국 각지에 있는 여행 정보를 통해 나만의 여행 경로를 만들어보세요.<br />
                완전히 무료.
              </p>
            </div>
            <div class="col h-100">
              <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i class="bi bi-toggles2"></i>
              </div>
              <h2 class="h5">쉽고 빠른 동행인 선택</h2>
              <p class="mb-0">
                "클릭" 한 번으로 동행을 시작해보세요. <br />
                놀랍도록 빠르게 동행을 구할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial section-->
  <div class="py-5 bg-light">
    <div class="container px-5 my-5">
      <div class="row gx-5 justify-content-center">
        <div class="col-lg-10 col-xl-7">
          <div class="text-center">
            <div class="fs-4 mb-4 fst-italic">
              EnjoyTrip 서비스를 통해 결혼에 골인했습니다! <br />이 서비스가 없었다면 전 아직도 혼자
              살고 있겠죠..
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <img class="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" />
              <div class="fw-bold">
                9반
                <span class="fw-bold text-primary mx-1">/</span>
                무직, 백수
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  font-size: 1.5rem;
}
</style>
