import { tboardAxios } from '../util/http-commons'

const board = tboardAxios()

function listArticle(pgno, pageSize, success, fail) {
  board.get(`/list?pgno=${pgno}&pageSize=${pageSize}`).then(success).catch(fail)
}

function totalPage(success, fail) {
  board.get(`/total`).then(success).catch(fail)
}

function detailArticle(articleno, success, fail) {
  board.get(`/list/no/${articleno}`).then(success).catch(fail)
}

function searchArticleBySubject(subject, param, success, fail) {
  if (subject.value === '') {
    listArticle(param.value.pgno, param.value.pageSize, success, fail)
  } else board.get(`/list/subject/${subject.value}`).then(success).catch(fail)
}

function writeArticle(article, success, fail) {
  board.post(`/write`, JSON.stringify(article)).then(success).catch(fail)
}

function modifyArticle(article, success, fail) {
  board.put(``, JSON.stringify(article)).then(success).catch(fail)
}

function deleteArticle(articleno, success, fail) {
  board.delete(`/${articleno}`).then(success).catch(fail)
}

export {
  listArticle,
  totalPage,
  writeArticle,
  detailArticle,
  modifyArticle,
  deleteArticle,
  searchArticleBySubject
}
