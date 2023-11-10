import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import BoardList from "@/components/BoardList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/board',
      name: 'board',
      component: compute(() => {import('')})
    }
  ]
})

export default router;
