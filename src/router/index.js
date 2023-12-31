import { createRouter, createWebHistory } from 'vue-router'
import { useMemberStore } from '@/api/member'

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore()
  let token = sessionStorage.getItem('accessToken')
  console.log('로그인 처리 전', memberStore.userInfo, token)

  if (memberStore.userInfo != null && token) {
    console.log('토큰 유효성 체크하러 가자!!!!')
    await memberStore.getUserInfo(token)
  }
  if (!memberStore.isValidToken || memberStore.userInfo == null) {
    alert('로그인이 필요한 페이지입니다..')
    // next({ name: "login" });
    router.push({ name: 'user' })
  } else {
    memberStore.isLogin = true
    console.log('로그인 했다!!!!!!!!!!!!!.')
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/tripinfo',
      name: 'tripinfo',
      component: () => import('@/views/TripInfo.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/TheBoardView.vue'),
      redirect: { name: 'board-list' },
      children: [
        {
          path: 'list',
          name: 'board-list',
          component: () => import('@/components/board/BoardList.vue')
        },
        {
          path: 'view/:articleno?/:userId',
          name: 'board-view',
          component: () => import('@/components/board/BoardView.vue'),
          beforeEnter: onlyAuthUser
        },
        {
          path: 'write',
          name: 'board-write',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/board/BoardWrite.vue')
        },
        {
          path: 'modify/:articleno',
          name: 'board-modify',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/board/BoardModify.vue')
        }
      ]
    },
    {
      path: '/tboard',
      name: 'tboard',
      component: () => import('@/views/TripBoardView.vue'),
      redirect: { name: 'tboard-list' },
      children: [
        {
          path: 'tlist',
          name: 'tboard-list',
          component: () => import('@/components/trip_board/TripBoardList.vue'),
          immediate: true
        },
        {
          path: 'view/:articleno?/:userId',
          name: 'tboard-view',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/trip_board/TripBoardDetailView.vue')
        },
        {
          path: 'write',
          name: 'tboard-write',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/trip_board/TripBoardWrite.vue')
        },
        {
          path: 'modify/:articleno',
          name: 'tboard-modify',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/trip_board/TripBoardModify.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/TheUserView.vue'),
      redirect: { name: 'user-login' },
      children: [
        {
          path: 'login',
          name: 'user-login',
          component: () => import('@/components/user/UserLogin.vue')
        },
        {
          path: 'join',
          name: 'user-join',
          component: () => import('@/components/user/UserJoin.vue')
        },
        {
          path: 'info/:modifyFlag',
          name: 'user-info',
          beforeEnter: onlyAuthUser,
          component: () => import('@/components/user/UserInfo.vue')
        },
        {
          path: 'f-info/:userId',
          name: 'user-detail',
          component: () => import('@/components/trip_board/item/TripUserDetailItem.vue')
        }
      ]
    },
    {
      path: '/trip-plan',
      name: 'trip-plan',
      beforeEnter: onlyAuthUser,
      component: () => import('@/views/TripPlanView.vue')
    },
    {
      path: '/my-plan',
      name: 'myplan',
      component: () => import('@/views/MyPlanView.vue'),
      redirect: { name: 'planinfo' },
      children: [
        {
          path: '/plan-info',
          name: 'planinfo',
          component: () => import('@/components/user/MyPlan.vue')
        }
      ]
    }
  ]
})

export default router
