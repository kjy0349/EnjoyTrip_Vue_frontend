import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import BoardList from "@/components/board/BoardList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board',
      name: 'board-list',
      component: BoardList
    }
  ]
})

export default router;
