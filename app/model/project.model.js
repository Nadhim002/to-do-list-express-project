import DB from "../config/db.js"

export class Project {

  constructor(project) {
    this.name = project.name
    this.color = project.color ?? "White"
    this.is_favorite = project.is_favorite ?? 0
    
  }

  createProject( result ) {

    const sqlQuery = "insert into projects ( project_name , color , is_favorite  ) values( ? , ? , ? )"

    const values = [this.name, this.color, this.is_favorite]

    DB.run(sqlQuery, values, function (err) {
      if (err) {
        result(err, null)
        return
      }

      result(null, this.lastID)
    })
  }

  updateProject(id, result){

    const sqlQuery = "update projects set project_name = ? ,  color = ? ,  is_favorite = ?   where project_id = ? "

    const values = [ this.name, this.color, this.is_favorite , id ]

    DB.run(sqlQuery, values, function (err) {

      if (err) {
        result(err, null)
        return
      }

      result(null, this.changes )

    }
  )


  }

  static getProject(id, result) {

    const sqlQuery = " select * from projects  where project_id = ? "

    const values = [ id ]

    DB.get(sqlQuery, values, function ( err , data ) {

      if (err) {
        result(err, null)
        return
      }

      result( null, data )

    })

  }

  static getAllProject( result ) {

    const sqlQuery = " select * from projects  "

    DB.all( sqlQuery , function ( err , rows ) {

      if (err) {
        result(err, null)
        return
      }
      
      result( null, rows )

    })
  }

  static deleteProject(id, result) {


    const sqlQuery = " delete from  projects  where project_id = ?"

    const values = [ id ]

    DB.run(sqlQuery, values, function (err) {

      if (err) {
        result(err, null)
        return
      }

      result( null, this.changes )

    }

)

  }
}
