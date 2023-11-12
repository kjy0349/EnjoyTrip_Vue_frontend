<script setup>
import { localAxios } from '@/util/http-commons'
import { onMounted, reactive } from 'vue'

const local = localAxios()
local.get('info/sidoinfo').then(({ data }) => {
  let sel = document.getElementById('search-area-sido')
  data.data.forEach((area) => {
    let opt = document.createElement('option')
    opt.setAttribute('value', area.sidoCode)
    opt.appendChild(document.createTextNode(area.sidoName))
    sel.appendChild(opt)
  })
})

let positions // marker 배열.
function makeList(trips) {
  if (trips) {
    let tripList = ``
    positions = []
    document.querySelector('table').setAttribute('style', 'display: ;')
    trips.forEach((area) => {
      tripList += `
              <tr onclick="moveCenter(\${area.latitude}, \${area.longitude});">
                <td><img src="\${area.firstImage}" width="40%" height="40%" onError="url(assets/img/sample.png)"></td>
                <td> \${area.title}</td>
                <td>\${area.addr1} \${area.addr2}</td>
                <td>\${area.latitude}</td>
                <td>\${area.longitude}</td>
              </tr>
            `
      let str = `\${area.firstImage}`
      if (!str) str = `\${area.secondImage}`
      let markerInfo = {
        title: area.title,
        latlng: new kakao.maps.LatLng(`\${area.latitude}`, `\${area.longitude}`),
        addr: `\${area.addr1} \${area.addr2}`,
        type: `\${area.contentTypeId}`,
        image: `\${area.firstImage}`
      }
      positions.push(markerInfo)
    })
    document.querySelector('#trip-list').innerHTML = tripList
    displayMarker()
  } else {
    alert('검색 결과가 존재하지 않습니다.')
  }
}

const tripdata = reactive([])

const getList = () => {
  let keyword = document.getElementById('search-keyword').value
  let response
  if (keyword.length > 0) {
    let sidoCode = document.getElementById('search-area-sido').value
    let contentId = document.getElementById('search-content-id').value
    let keyword = document.getElementById('search-keyword').value

    response = local
      .get('info/attinfo/' + contentId + '/' + sidoCode + '/' + keyword)
      .then(({ data }) => {
        tripdata.value = data.data
      })
  } else {
    alert('검색어를 입력해주세요.')
    // let sidoCode = document.getElementById('search-area-sido').value
    // let contentId = document.getElementById('search-content-id').value

    // response = local.get('info/attinfo/' + contentId + '/' + sidoCode)
    // .then(({data}) => console.log(data))
  }
}
// select로 검색어 기반으로 가져 온 다음에... makeList에 list로 넘겨줌

onMounted(() => {
  let kakaoScript = document.createElement('script')
  kakaoScript.setAttribute(
    'src',
    'http://dapi.kakao.com/v2/maps/sdk.js?appkey=f6c8dcd7ddf262b08eb75f9c0aa14c38&libraries=services,clusterer,drawing&autoload=false'
  )
  document.head.appendChild(kakaoScript)
  kakaoScript.onload = () => {
    kakao.maps.load(() => {
      // 카카오지도
      let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
        }

      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      let map = new kakao.maps.Map(mapContainer, mapOption)

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      let mapTypeControl = new kakao.maps.MapTypeControl()

      // 지도 확대 축소 등의 컨트롤
      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT)

      //// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new kakao.maps.ZoomControl()
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

      let markers = []
      function displayMarker() {
        // 마커 이미지의 이미지 주소입니다
        if (markers.length > 0) {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
          }
          markers = []
        }
        positions.forEach(function (position) {
          // 마커 이미지의 이미지 크기 입니다
          let imageSize = new kakao.maps.Size(40, 40)
          let imageSrc
          switch (parseInt(position.type)) {
            case 12:
              imageSrc = '${root}/assets/img/big-wheel.png'
              break
            case 14:
              imageSrc = '${root}/assets/img/culture.png'
              break
            case 15:
              imageSrc = '${root}/assets/img/concert.png'
              break
            case 25:
              imageSrc = '${root}/assets/img/travel-bag.png'
              break
            case 28:
              imageSrc = '${root}/assets/img/kitesurf.png'
              break
            case 32:
              imageSrc = '${root}/assets/img/accommodation.png'
              break
            case 38:
              imageSrc = '${root}/assets/img/shopping-cart.png'
              break
            case 39:
              imageSrc = '${root}/assets/img/restaurant.png'
              break
          }
          // 마커 이미지를 생성합니다
          let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

          // 마커를 생성합니다
          let marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: position.latlng, // 마커를 표시할 위치
            title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage // 마커 이미지
          })
          markers.push(marker)

          // 커스텀 오버레이에 표시할 컨텐츠 입니다
          // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
          // 별도의 이벤트 메소드를 제공하지 않습니다
          let iwContent = ``
          if (position.image.length != 0) {
            iwContent = `
          <div class="infowindow p-3">
            <div style="font-size: 14px">\${position.title}</div>
            <img style="width: 200px; height:200px"src="\${position.image}">
            <div style="font-size: 14px">\${position.addr}</div>
            </div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          } else {
            iwContent = `
          <div class="infowindow p-3">
            <div style="font-size: 14px">\${position.title}</div>
            <div style="font-size: 14px">\${position.addr}</div>
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
        map.setCenter(positions[0].latlng)
      }

      function moveCenter(lat, lng) {
        map.setCenter(new kakao.maps.LatLng(lat, lng))
      }
    })
  }
})
</script>

<template>
  {{ tripdata }}
  <div class="content row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
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
        <button id="btn-search" class="btn btn-outline-primary" type="button" @click="getList()">
          검색
        </button>
      </div>
      <!-- kakao map start -->
      <div id="map" class="mt-3" style="width: 100%; height: 400px"></div>
      <!-- kakao map end -->
      <div class="row">
        <table class="table table-striped" style="display: none">
          <thead>
            <tr>
              <th>대표이미지</th>
              <th>관광지명</th>
              <th>주소</th>
              <th>위도</th>
              <th>경도</th>
            </tr>
          </thead>
          <tbody id="trip-list"></tbody>
        </table>
      </div>
      <!-- 관광지 검색 end -->
    </div>
  </div>
  <div class="col-md-2"></div>
</template>

<style scoped></style>
