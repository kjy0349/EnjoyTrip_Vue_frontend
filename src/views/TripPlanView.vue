<script setup>
import { ref, computed } from 'vue'
import TripItem from '@/components/common/TripItem.vue'
// import draggable from 'vuedraggable'
import { usePlanStore } from '@/api/plan'
import { storeToRefs } from 'pinia'
import router from '../router'
import { useMemberStore } from '@/api/member'
import { insertPlanInfo } from '@/api/info'

const memberStore = useMemberStore()
const userInfo = memberStore.userInfo

const planStore = usePlanStore()

const { plan } = storeToRefs(planStore)

const startDate = ref()
const endDate = ref()
const dateCalFlag = ref(false)

// const planPlaces = ref([])

const planPlaces = ref(new Map())

const diffDateFun = computed(() => {
  const diffSec = new Date(endDate.value).getTime() - new Date(startDate.value).getTime()
  const diffDate = ref(diffSec / (24 * 60 * 60 * 1000) + 1)
  return diffDate.value
})

const setFlag = () => {
  dateCalFlag.value = true
}

const appendPlace = (place) => {
  if (planPlaces.value.size < diffDateFun.value) {
    planPlaces.value.set(planPlaces.value.size, place)
  } else {
    alert('이미 모든 일자의 계획을 채웠습니다.')
  }
}

const goMain = () => {
  router.push({ name: 'tripinfo' })
}

const insertTime = () => {
  let i = 0
  planPlaces.value.forEach((place, key) => {
    // place는 다 잘 나와
    const temp = new Date(startDate.value)
    const routeDetail = {
      planId: '',
      contentId: '',
      placeDate: ''
    }
    routeDetail.contentId = place.contentId
    temp.setDate(temp.getDate() + i)
    routeDetail.placeDate = temp
    console.log(routeDetail)
    routeDetailList.value.push(routeDetail)
    i += 1
  })
  console.log(routeDetailList.value)
}

const makeTripPlan = () => {
  if (!startDate.value || !endDate.value) {
    alert('종료일과 시작일을 선택해주세요.')
  } else if (diffDateFun.value >= 30) {
    alert('계획의 길이가 너무 큽니다.')
  } else {
    insertTime()
    insertPlanInfo(
      tripRoute.value,
      routeDetailList.value,
      () => {
        alert('계획 등록 성공!')
        console.log('plan 등록 성공')
        goMain()
      },
      (error) => {
        alert('여행 경로 이름을 다시 지어주세요')
        console.log('실패')
      }
    )
  }
}

const tripRoute = ref({
  userId: userInfo.userId,
  title: ''
})

const routeDetailList = ref([])

const reset = () => {
  planPlaces.value.clear()
}

// Computed나 watch로 값 변경될때마다 바꿔
// const dateA = new Date('2022/06/01');
// const dateB = new Date('2022/05/01');
// const diffMSec = dateA.getTime() - dateB.getTime();
// const diffDate = diffMSec / (24 * 60 * 60 * 1000);
// console.log(`날짜의 차이는 ${diffDate}일 입니다.`);  // 결과: '날짜의 차이는 31일입니다.'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4 mt-5">
        <h1>나만의 경로 만들기</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        시작일
        <input type="date" v-model="startDate" />
      </div>
      <div class="col-2">
        종료일
        <input type="date" v-model="endDate" @change="setFlag" />
      </div>
      <div class="col-4"></div>
      <div class="col-4 d-flex justify-content-center" style="display: inline-block">
        <span>총 일수 : </span>
        <span v-if="dateCalFlag">{{ diffDateFun }}</span>
        <span v-else>0</span>
      </div>
    </div>
    <div class="row mt-5 shadow p-3 bg-body-tertiary rounded">
      <TripItem
        v-for="place in plan"
        :key="place.contentId"
        :place="place"
        @click="appendPlace(place)"
      ></TripItem>
    </div>
    <div class="row mt-5" v-if="dateCalFlag">
      <div class="col-2 shadow p-3 bg-body-tertiary rounded" v-for="i in diffDateFun" :key="i">
        <div>{{ i }} 일차</div>
        <div style="height: 150px">
          <TripItem v-if="planPlaces.get(i - 1)" :place="planPlaces.get(i - 1)"></TripItem>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end my-3">
        <button class="btn btn-warning" @click="reset">초기화</button>
      </div>
    </div>

    <div class="input-group mt-3">
      <span class="input-group-text">여행 경로 이름</span>
      <input class="form-control" aria-label="With textarea" v-model="tripRoute.title" />
    </div>
    <div class="row mt-5">
      <div class="col-4"></div>
      <div class="col-4 d-flex justify-content-center">
        <button class="btn btn-primary" @click="makeTripPlan">계획 만들기 완성!</button>
      </div>
      <div class="col-4"></div>
    </div>
    <div class="row mt-1">
      <div class="col-4"></div>
      <div class="col-4 d-flex justify-content-center">
        <button class="btn btn-danger" @click="goMain">돌아가기</button>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<style scoped></style>
