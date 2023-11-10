import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import BoardList from "@/components/BoardList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainView,
    },
    {
      path: "/board",
      name: "BoardList",
      component: BoardList,
    },
  ],
});

export default router;
