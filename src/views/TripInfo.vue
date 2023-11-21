<script setup>
import { onMounted, ref } from 'vue'
import { getCityOptions, getAttractionList } from '@/api/map.js'
import draggable from 'vuedraggable'
import { useRouter } from 'vue-router'
import { usePlanStore } from '@/api/plan'

const router = useRouter()
const isShow = ref(false)
const tripdata = ref()
const plandata = ref([])
const planStore = usePlanStore()

let map = null

const SELECT_ID = 'search-area-sido'
getCityOptions(SELECT_ID)

async function showAttractionList() {
  const result = await getAttractionList()
  tripdata.value = result.data.data
  if (tripdata.value.length > 0) {
    isShow.value = true
    displayMarkers(tripdata)
  } else isShow.value = false

  console.log(tripdata.value)
}

const markers = ref([])
const displayMarkers = (data) => {
  // 마커 이미지의 이미지 주소입니다
  if (markers.length > 0) {
    for (let marker of markers) {
      marker.setMap(null)
    }
    markers.clear()
  }
  data.value.forEach((position) => {
    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new kakao.maps.Size(40, 40)
    let imageSrc
    switch (parseInt(position.contentTypeId)) {
      case 12:
        imageSrc = 'src/assets/markers/big-wheel.png'
        break
      case 14:
        imageSrc = 'src/assets/markers/culture.png'
        break
      case 15:
        imageSrc = 'src/assets/markers/concert.png'
        break
      case 25:
        imageSrc = 'src/assets/markers/travel-bag.png'
        break
      case 28:
        imageSrc = 'src/assets/markers/kitesurf.png'
        break
      case 32:
        imageSrc = 'src/assets/markers/accommodation.png'
        break
      case 38:
        imageSrc = 'src/assets/markers/shopping-cart.png'
        break
      case 39:
        imageSrc = 'src/assets/markers/restaurant.png'
        break
    }
    // 마커 이미지를 생성합니다
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(position.latitude, position.longitude), // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage // 마커 이미지
    })
    markers.value.push(marker)

    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    // 별도의 이벤트 메소드를 제공하지 않습니다
    let iwContent = ``
    // console.log(position)
    if (position.firstImage) {
      iwContent = `
          <div class="infowindow p-3">
            <div style="font-size: 14px"></div>
            <img style="width: 200px; height:200px"src="${position.firstImage}">
            <div style="font-size: 14px">${position.title}</div>
            <div style="font-size: 14px">${position.addr1}</div>
            </div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    } else {
      iwContent = `
          <div class="infowindow p-3">
            <div style="font-size: 14px">${position.title}</div>
            <div style="font-size: 14px">${position.addr1}</div>
            </div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    }
    // 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent
    })

    // 마커에 마우스오버 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'mouseover', function () {
      // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
      infowindow.open(map, marker)
    })

    // 마커에 마우스아웃 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'mouseout', function () {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      infowindow.close()
    })
    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  })
  // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
  map.setCenter(new kakao.maps.LatLng(data.value[0].latitude, data.value[0].longitude))
  // function moveCenter(lat, lng) {
  //   map.setCenter(new kakao.maps.LatLng(lat, lng))
  // }
}
// select로 검색어 기반으로 가져 온 다음에... makeList에 list로 넘겨줌

const initMap = () => {
  // 카카오지도
  let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
    }

  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  map = new kakao.maps.Map(mapContainer, mapOption)

  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  let mapTypeControl = new kakao.maps.MapTypeControl()

  // 지도 확대 축소 등의 컨트롤
  // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
  // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

  //// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  let zoomControl = new kakao.maps.ZoomControl()
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    let kakaoScript = document.createElement('script')
    kakaoScript.setAttribute(
      'src',
      'http://dapi.kakao.com/v2/maps/sdk.js?appkey=f6c8dcd7ddf262b08eb75f9c0aa14c38&libraries=services,clusterer,drawing&autoload=false'
    )
    document.head.appendChild(kakaoScript)
    kakaoScript.onload = () => {
      kakao.maps.load(() => {
        initMap()
      })
    }
  }
})

const moveTripPlan = () => {
  planStore.addPlan(plandata.value)
  router.push({ name: 'trip-plan' })
}
</script>

<template>
  <div class="content row">
    <div class="col-md-6">
      <!-- 관광지 검색 start -->
      <div class="d-flex my-3">
        <select id="search-area-sido" class="form-select me-2">
          <option value="0" selected>검색 할 지역 선택(시/도)</option>
        </select>
        <!-- <select id="search-area-gu" class="form-select me-2">
              <option value="0" selected>검색 할 지역 선택(구/군)</option>
            </select> -->
        <select id="search-content-id" class="form-select me-2">
          <option value="0" selected>관광지 유형</option>
          <option value="12">관광지</option>
          <option value="14">문화시설</option>
          <option value="15">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
        <input
          id="search-keyword"
          class="form-control me-2"
          type="search"
          placeholder="검색어"
          aria-label="검색어"
        />
        <button
          id="btn-search"
          class="btn btn-outline-primary"
          type="button"
          @click="showAttractionList()"
        >
          검색
        </button>
      </div>
      <!-- kakao map start -->
      <div id="map" class="mt-3" style="width: 100%; height: 80vh"></div>
      <!-- kakao map end -->
      <!-- 관광지 검색 end -->
    </div>
    <div class="col-md-3">
      <p style="text-align: center; font-size: large" class="m-3">여행지 리스트</p>
      <table class="table table-striped">
        <!-- v-model로 양방향 바인딩, tag에 어떤 html요소로 작동할지 -->
        <!-- template안에 #item태그를 달고 그안에 요소는 element로받는다( 다른 이름 안돼) -->
        <!-- 그리고 무조건 한 요소로 묶어줘야함 안그러면 에러남, 난 tr로 묶었음 -->
        <!-- 그리고 저 안에 주석도 달면 안됨... 요소로 인식하는듯 ㅋㅋ -->
        <!-- :group 하면 이렇게 옵션을 지정해 줄 수 있는데, pull: clone하게 되면 복사를 하고 put: false를 하면 값이 이쪽으로는 들어오지 못한다
          한마디로 복제밖에 못한다. 그리고 name이 중요한데 이 name이 같은 놈들끼리 드래그 앤 드롭을 할 수 있기 때문이다 -->

        <draggable
          v-model="tripdata"
          tag="tbody"
          :group="{ name: 'place', pull: 'clone', put: false }"
          item-key="contentId"
          style="display: block; height: 80vh; overflow: auto"
        >
          <template #item="{ element }">
            <tr>
              <td>
                <img :src="element.firstImage" style="width: 120px; height: 120px" />
              </td>
              <td>
                <tr>
                  <td>{{ element.title }}</td>
                </tr>
                <tr>
                  <td>{{ element.addr1 }}</td>
                </tr>
              </td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
    <div class="col-md-3">
      <div class="row my-3">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <p class="justify-text-center" style="font-size: large">여행경로추가</p>
        </div>
        <div class="col-md-3"></div>
      </div>
      <draggable
        v-model="plandata"
        tag="div"
        group="place"
        item-key="contentId"
        draggable="false"
        style="display: block; height: 80vh; overflow: auto"
      >
        <template #item="{ element }">
          <div class="m-2">
            <img :src="element.firstImage" style="width: 120px; height: 120px" />
            {{ element.title }}
          </div>
        </template>
      </draggable>
      <div class="row my-3">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <button class="btn btn-danger" @click="moveTripPlan">Go to Plan</button>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
