import DB from "../config/db.js"
import dBCallWithPromise from "../config/promiseBasedDbCalls.js"

export class Project {
  constructor(project) {
    this.name = project.name
    this.color = project.color ?? "White"
    this.is_favorite = project.is_favorite ?? 0
  }

  createProject() {
    const sqlQuery =
      "insert into projects ( project_name , color , is_favorite  ) values( ? , ? , ? )"
    const values = [this.name, this.color, this.is_favorite]
    return dBCallWithPromise.run(sqlQuery, values)
  }

  updateProject(id) {
    const sqlQuery =
      "update projects set project_name = ? ,  color = ? ,  is_favorite = ?   where project_id = ? "
    const values = [this.name, this.color, this.is_favorite, id]
    return dBCallWithPromise.run(sqlQuery, values)
  }

  static getProject(id) {
    const sqlQuery = " select * from projects  where project_id = ? "
    const values = [id]
    return dBCallWithPromise.get(sqlQuery, values)
  }

  static getAllProject() {
    const sqlQuery = " select * from projects  "
    return dBCallWithPromise.all(sqlQuery)
  }

  static deleteProject(id) {
    const sqlQuery = " delete from  projects  where project_id = ?"
    const values = [id]
    return dBCallWithPromise.run(sqlQuery, values)
  }
}
