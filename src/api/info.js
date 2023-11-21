import { infoAxios } from '../util/http-commons'

const info = infoAxios()

function insertPlanInfo(route, places, success, fail) {
  console.log('장소들 넘어왔나?')
  console.log(places)
  info.post(`/insert`, JSON.stringify({ route, places })).then(success).catch(fail)
}

export { insertPlanInfo }
