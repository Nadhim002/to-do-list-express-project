import  { db , commentTable } from "../config/drizzle.config.js"
import { eq } from "drizzle-orm"

export class Comment {
  constructor(comment) {
    this.commentContent = comment.commentContent
    this.projectId = Number(comment.projectId)
    this.taskId = Number(comment.taskId) || null
  }

  createComment() {

    return db.insert( commentTable )
             .values({
              commentContent : this.commentContent ,
              projectId : this.projectId , 
              taskId : this.taskId
             })
             .returning()

  }

  static updateComment( commentId , contentToUpdate ) {

    return db.update( commentTable )
             .set({
              commentContent : contentToUpdate
             })
             .where( eq( commentTable.commentId , commentId  ) )
             .returning()

  }

  static getComment( commentId ) {

    return db.select( )
             .from( commentTable )
             .where( eq( commentTable.commentId , commentId  ) )

  }

  static deleteComment(commentId) {

    return db.delete( commentTable )
             .where( eq( commentTable.commentId , commentId  ) )
             .returning()

  }
}
