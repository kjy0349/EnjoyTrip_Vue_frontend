<script setup>
import { ref } from 'vue'
import { useMemberStore } from '@/api/member'

const memberStore = useMemberStore()
</script>

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
                회원 탭
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <template v-if="memberStore.userInfo == null">
                  <li>
                    <RouterLink
                      :to="{ name: 'user' }"
                      class="dropdown-item text-decoration-none text-black"
                      >로그인</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      :to="{ name: 'user-join' }"
                      class="dropdown-item text-decoration-none text-black"
                      >회원가입</RouterLink
                    >
                  </li>
                </template>
                <template v-else>
                  <li>
                    <RouterLink
                      :to="{ name: 'user-info' }"
                      class="dropdown-item text-decoration-none text-black"
                      >회원정보</RouterLink
                    >
                  </li>
                  <li>
                    <!-- 로그 아웃 할줄 몰라잉 -->
                    로그아웃
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
