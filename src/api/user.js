import { userAxios } from '../util/http-commons'
import axios from 'axios'

const user = userAxios()

function userLogin(userId, password, success, fail) {
  // 여기까진 잘 옴
  user.post(`/login`, JSON.stringify({ userId, password })).then(success).catch(fail)
}
function userJoin(userDto, success, fail) {
  // 여기까진 잘 옴
  console.log(userDto)
  user.post(`/join`, JSON.stringify(userDto)).then(success).catch(fail)
}

export { userLogin, userJoin }
