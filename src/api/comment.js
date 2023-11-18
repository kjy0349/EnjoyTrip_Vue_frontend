import { commentAxios } from '../util/http-commons'

const comment = commentAxios()

function getComments(articleno, success, fail) {
  comment.get(`/${articleno}`).then(success).catch(fail)
}

function writeComment(commentObj, success, fail) {
  console.log('2 , writeComment')
  comment.post(`/write`, JSON.stringify(commentObj)).then(success).catch(fail)
}

function deleteComment(commentno, success, fail) {
  comment.delete(`/${commentno}`).then(success).catch(fail)
}

export { getComments, writeComment, deleteComment }
