import { boardAxios } from "../util/http-commons";

const board = boardAxios();

function listArticle(success, fail) {
  board.get(`/list`).then(success).catch(fail);
}

function detailArticle(articleno, success, fail) {
  board.get(`/list/no/${articleno}`).then(success).catch(fail);
}

function searchArticleBySubject(subject, success, fail) {
  if (subject.value == "") listArticle(success, fail);
  else board.get(`/list/subject/${subject.value}`).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  board.post(`/write`, JSON.stringify(article)).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  board.put(``, JSON.stringify(article)).then(success).catch(fail);
}
function deleteArticle(articleno, success, fail) {
  board.delete(`/${articleno}`).then(success).catch(fail);
}

export {
  listArticle,
  writeArticle,
  detailArticle,
  modifyArticle,
  deleteArticle,
  searchArticleBySubject,
};