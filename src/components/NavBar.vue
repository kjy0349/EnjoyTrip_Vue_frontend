<script setup>
import { storeToRefs } from 'pinia'
import { useMemberStore } from '@/api/member'
const store = useMemberStore()
const { isLogin, userInfo } = storeToRefs(store)
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
              <router-link
                :to="{ name: 'myplan' }"
                class="text-decoration-none text-black nav-link"
                v-show="isLogin"
                >내 여행 계획들</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'tboard' }" class="text-decoration-none text-black nav-link"
                >동행 구하기</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'board' }" class="text-decoration-none text-black nav-link"
                >Q&A 게시판</router-link
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
                <li>
                  <RouterLink
                    v-show="!isLogin"
                    :to="{ name: 'user' }"
                    class="dropdown-item text-decoration-none text-black"
                    >로그인</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    v-show="!isLogin"
                    :to="{ name: 'user-join' }"
                    class="dropdown-item text-decoration-none text-black"
                    >회원가입</RouterLink
                  >
                </li>
                <li v-show="isLogin" class="dropdown-item text-decoration-none text-black">
                  <a @click="store.userLogout(userInfo.userId)">로그아웃</a>
                </li>
                <div v-show="isLogin">
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <RouterLink
                      :to="{ name: 'user-info', params: { modifyFlag: true } }"
                      class="dropdown-item text-decoration-none text-black"
                      >회원정보</RouterLink
                    >
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
