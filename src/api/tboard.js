import { tboardAxios } from '../util/http-commons'

const tboard = tboardAxios()

function listArticle(pgno, pageSize, success, fail) {
  tboard.get(`/list?pgno=${pgno}&pageSize=${pageSize}`).then(success).catch(fail)
}

function totalPage(success, fail) {
  tboard.get(`/total`).then(success).catch(fail)
}

function detailArticle(articleno, success, fail) {
  tboard.get(`/list/no/${articleno}`).then(success).catch(fail)
  // return tboard.get(`/list/no/${articleno}`)
}

function searchArticleBySubject(subject, param, success, fail) {
  if (subject.value === '') {
    listArticle(param.value.pgno, param.value.pageSize, success, fail)
  } else tboard.get(`/list/subject/${subject.value}`).then(success).catch(fail)
}

function writeArticle(article, success, fail) {
  tboard.post(`/write`, JSON.stringify(article)).then(success).catch(fail)
}

function modifyArticle(article, success, fail) {
  tboard.put(``, JSON.stringify(article)).then(success).catch(fail)
}

function deleteArticle(articleno, success, fail) {
  tboard.delete(`/${articleno}`).then(success).catch(fail)
}

function getTripRoutes(userId, success, fail) {
  tboard.get(`/route/${userId}`).then(success).catch(fail)
}

function getTripRouteDetails(planId, success, fail) {
  tboard.get(`/plan/${planId}`).then(success).catch(fail)
}
function getArticleUserInfo(userId, success, fail) {
  tboard.get(`/userinfo/${userId}`).then(success).catch(fail)
}

export {
  listArticle,
  totalPage,
  writeArticle,
  detailArticle,
  modifyArticle,
  deleteArticle,
  getTripRoutes,
  searchArticleBySubject,
  getTripRouteDetails,
  getArticleUserInfo
}
