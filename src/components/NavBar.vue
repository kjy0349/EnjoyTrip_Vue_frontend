<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border-bottom: 1px solid">
    <div class="container-fluid d-flex">
      <div class="justify-content-start">
        <router-link :to="{ name: 'home' }" class="navbar-brand" href="#">EnjoyTrip</router-link>
      </div>
      <div class="justify-content-end">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'board' }" class="text-decoration-none text-black nav-link"
                >게시판</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'tripinfo' }"
                class="text-decoration-none text-black nav-link"
                >여행지 정보</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                로그인
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
