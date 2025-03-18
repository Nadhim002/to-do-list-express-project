import { db, projectTable } from "../config/drizzle.config.js"
import { eq  , gt } from "drizzle-orm"


export class Project {
  constructor(project) {
    this.projectName = project.projectName
    this.color = project.color ?? "White"
    this.isfavorite = parseInt(project.isfavorite) ?? 0
    this.userId = parseInt(project.userId)
  }

  createProject() {
    return db
      .insert(projectTable)
      .values({
        projectName: this.projectName,
        color: this.color,
        isFavorite: this.isfavorite,
        userId: this.userId,
      })
      .returning()
  }

  updateProject(projectId) {
    return db
      .update(projectTable)
      .set({
        projectName: this.projectName,
        color: this.color,
        isFavorite: this.isfavorite,
      })
      .where( eq(  projectTable.projectId , projectId) )
      .returning()
  }

  static getProject( userId  ,  pageSize  , lastSeenProjectId  ) {
      return db.select()
               .from( projectTable )
               .where( eq( projectTable.userId , userId  ) , gt( projectTable.projectId , lastSeenProjectId ) )
               .limit( pageSize  )

  }


  static deleteProject( projectId ) {

    return db.delete( projectTable )
                .where( eq(projectTable.projectId , projectId  ) )

  }

}
