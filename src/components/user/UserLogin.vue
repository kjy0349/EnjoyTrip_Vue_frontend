<script setup>
import { ref } from "vue";
import { userLogin } from "../../api/user";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const userId = ref("");
const password = ref("");

const user = ref({});

const onLogin = () => {
  // 잘 넘어왔어
  userLogin(
    userId.value,
    password.value,
    ({ data }) => {
      if (data.success) {
        console.log("login성공!");
        user.value = data.data;
        console.log(user.value);
      } else {
        console.log("login 실패!");
      }
    },
    (error) => {
      console.log("login 실패!");
    }
  );
  //   axios.post("http://localhost:8080/user/login", {
  //     userId: userId.value,
  //     password: password.value,
  //   });
  moveHome();
};
const moveHome = () => {
  router.push({
    name: "home",
  });
};
</script>

<template>
  <div class="form-floating mb-3">
    <input
      v-model="userId"
      type="id"
      class="form-control"
      id="floatingInput"
      placeholder="name@example.com"
    />
    <label for="floatingInput">UserId</label>
  </div>
  <div class="form-floating mb-3">
    <input
      v-model="password"
      type="password"
      class="form-control"
      id="floatingPassword"
      placeholder="Password"
    />
    <label for="floatingPassword">Password</label>
  </div>

  <button
    type="button"
    class="btn btn-secondary"
    :to="{ name: 'home' }"
    @click="onLogin"
  >
    로그인
  </button>
</template>

<style scoped></style>
