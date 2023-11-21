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

const planPlaces = ref([])

const diffDateFun = computed(() => {
  const diffSec = new Date(endDate.value).getTime() - new Date(startDate.value).getTime()
  const diffDate = ref(diffSec / (24 * 60 * 60 * 1000) + 1)
  return diffDate.value
})

const setFlag = () => {
  dateCalFlag.value = true
}
const appendPlace = (place) => {
  if (planPlaces.value.length < diffDateFun.value) {
    planPlaces.value.push(place)
  } else {
    alert('더는 못 넣어 이놈아..!!')
  }
}

const goMain = () => {
  router.push({ name: 'tripinfo' })
}

const insertTime = () => {
  let i = 0
  planPlaces.value.forEach((place) => {
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
  insertTime()
  insertPlanInfo(
    tripRoute.value,
    routeDetailList.value,
    () => {
      console.log('plan 등록 성공')
    },
    (error) => {
      console.log('실패')
    }
  )
}

const tripRoute = ref({
  userId: userInfo.userId,
  title: ''
})

const routeDetailList = ref([])

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
      <div class="col-4">
        <h1>나만의 경로 만들기</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-2">시작일</div>
      <div class="col-2">
        <input type="date" v-model="startDate" />
      </div>
      <div class="col-2">종료일</div>
      <div class="col-2">
        <input type="date" v-model="endDate" @change="setFlag" />
      </div>
      <div class="col-4" style="display: inline-block">
        <span>총 일수 : </span>
        <span v-if="dateCalFlag">{{ diffDateFun }}</span>
        <span v-else>0</span>
      </div>
    </div>
    <div class="row mt-5">
      <TripItem
        v-for="place in plan"
        :key="place.contentId"
        :place="place"
        @click="appendPlace(place)"
      ></TripItem>
    </div>
    <div class="row mt-5" v-if="dateCalFlag">
      <div class="col-3" v-for="i in diffDateFun" :key="i">
        <div>{{ i }} 일차</div>
      </div>
    </div>
    <div class="row mt-5" v-if="dateCalFlag">
      <TripItem v-for="place in planPlaces" :key="place.contentId" :place="place"></TripItem>
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
    <div class="input-group mt-3">
      <span class="input-group-text">여행 경로 이름</span>
      <input class="form-control" aria-label="With textarea" v-model="tripRoute.title" />
    </div>
    <!-- <draggable
        v-model="plan"
        :group="{ name: 'place', pull: 'clone', put: false }"
        item-key="contentId"
        class="row"
      >
        <template #item="{ element }">
          <TripItem :place="element"></TripItem>
        </template>
      </draggable> -->
  </div>
</template>

<style scoped></style>
