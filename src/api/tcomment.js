import { tcommentAxios } from '../util/http-commons'

const tcomment = tcommentAxios()

function getComments(articleno, success, fail) {
  tcomment.get(`/${articleno}`).then(success).catch(fail)
}

function writeComment(commentObj, success, fail) {
  console.log('2 , writeComment')
  tcomment.post(`/write`, JSON.stringify(commentObj)).then(success).catch(fail)
}

function deleteComment(commentno, success, fail) {
  tcomment.delete(`/${commentno}`).then(success).catch(fail)
}

function updateSelectedStatus(commentno, success, fail) {
  tcomment.put(`/${commentno}`).then(success).catch(fail)
}

export { getComments, writeComment, deleteComment, updateSelectedStatus }
