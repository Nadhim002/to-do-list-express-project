import dBCallWithPromise from "../config/promiseBasedDbCalls.js"

export class Comment {
  constructor(comment) {
    this.comment_content = comment.commentContent
    this.project_id = Number(comment.projectId)
    this.task_id = Number(comment.taskId) || null
  }

  createComment() {
    const sqlQuery =
      "insert into comments ( comment_content ,  project_id ,  task_id  ) values ( ? , ? , ?  )"
      
    return dBCallWithPromise.run(sqlQuery, [
      this.comment_content,
      this.project_id,
      this.task_id,
    ])
  }

  static updateComment(commentId, contentToUpdate) {
    const sqlQuery =
      "update comments set comment_content = ? where comment_id = ?"
    return dBCallWithPromise.run(sqlQuery, [commentId, contentToUpdate])
  }

  static getComment(projectId) {
    const sqlQuery = "select * from comments where project_id  = ? "
    return dBCallWithPromise.all(sqlQuery, [projectId])
  }

  static deleteComment(commentId) {
    const sqlQuery = ` delete from comments where comment_id = ? `
    return dBCallWithPromise.run(sqlQuery, [commentId])
  }
}
