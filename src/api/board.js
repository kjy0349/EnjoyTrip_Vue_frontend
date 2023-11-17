import { boardAxios } from "../util/http-commons";

const board = boardAxios();

function listArticle(pgno, pageSize, success, fail) {
  console.log("4");
  board
    .get(`/list?pgno=${pgno}&pageSize=${pageSize}`)
    .then(success)
    .catch(fail);
}

function totalPage(success, fail) {
  console.log("2");
  board.get(`/total`).then(success).catch(fail);
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
  totalPage,
  writeArticle,
  detailArticle,
  modifyArticle,
  deleteArticle,
  searchArticleBySubject,
};
