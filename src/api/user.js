import { userAxios } from '@/util/http-commons'
const user = userAxios()

async function userConfirm(params, success, fail) {
  console.log('param', params)
  await user.post(`/login`, params).then(success).catch(fail)
  console.log('userConfirm ok')
}
// async function userJoin(userDto, success, fail) {
//   user.post(`/join`, JSON.stringify(userDto)).then(success).catch(fail)
// }

async function findById(userid, success, fail) {
  user.defaults.headers['Authorization'] = sessionStorage.getItem('accessToken')
  await user.get(`/info/${userid}`).then(success).catch(fail)
}

async function tokenRegeneration(userinfo, success, fail) {
  user.defaults.headers['Refreshtoken'] = sessionStorage.getItem('refreshToken') //axios header에 refresh-token 셋팅
  await user.post(`/refresh`, userinfo).then(success).catch(fail)
}

async function logout(userid, success, fail) {
  await user.get(`/logout/${userid}`).then(success).catch(fail)
}

export { userConfirm, findById, tokenRegeneration, logout }
