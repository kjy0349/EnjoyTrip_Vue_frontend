import { commentAxios } from "../util/http-commons";

const comment = commentAxios();

function getComments(articleno, success, fail) {
  comment.get(`/${articleno}`).then(success).catch(fail);
}

function writeComment(comment, success, fail) {
  comment.post(`/write`, JSON.stringify(comment)).then(success).catch(fail);
}

function deleteComment(commentno, success, fail) {
  comment.delete(`/${commentno}`).then(success).catch(fail);
}

export { getComments, writeComment, deleteComment };
