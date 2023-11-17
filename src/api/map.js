import { localAxios } from '@/util/http-commons'
const local = localAxios()

function getCityOptions(selectId) {
  local.get('info/sidoinfo').then(({ data }) => {
    console.log(data)
    let sel = document.getElementById(selectId)
    data.data.forEach((area) => {
      let opt = document.createElement('option')
      opt.setAttribute('value', area.sidoCode)
      opt.appendChild(document.createTextNode(area.sidoName))
      sel.appendChild(opt)
    })
  })
}

async function getAttractionList() {
  let keyword = document.getElementById('search-keyword').value
  if (keyword.length > 0) {
    let sidoCode = document.getElementById('search-area-sido').value
    let contentId = document.getElementById('search-content-id').value
    let keyword = document.getElementById('search-keyword').value

    return await local.get('info/attinfo/' + contentId + '/' + sidoCode + '/' + keyword)
  } else {
    alert('검색어를 입력해주세요.')
  }
}

export { getCityOptions, getAttractionList }
