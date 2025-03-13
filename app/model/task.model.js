import DB from "../config/db.js"

export class Task {
    constructor(task) {
      this.content = task.content
      this.description = task.description || "No Description"
      this.dueDate = task.dueDate || null
      this.isCompleted = task.isCompleted || 0
      this.project_id = task.project_id 
    }
  
    createTask(result) {
  
  
      const sqlQuery = "insert into tasks ( task_content , task_description , due_date  , is_completed , project_id ) values( ? , ? , ? , ? , ? )"
  
      const values = [ this.content ,  this.description  , this.dueDate ,  this.isCompleted ,   this.project_id ] 
  
      DB.run(sqlQuery, values, function (err) {
  
        if (err) {
          result(err, null)
          return
        }
  
        result(null, this.lastID)
  
      })
  
  
    }
  
    updateTask( id, result) {
  
  
      const sqlQuery = "update tasks set task_content = ? , task_description = ? ,  due_date = ? , is_completed  = ? , project_id  = ?   where id = ? "
  
      const values = [ this.content , this.description , this.dueDate , this.isCompleted , this.project_id , id   ]
  
  
      DB.run(sqlQuery, values, function (err) {
  
        if (err) {
          result(err, null)
          return
        }
  
        if( this.changes ){
          result(null, this.changes)
          return
        }
  
        result(null, null )
  
      })
  
    }
  
    static getTask( id, result ){
  
      const sqlQuery = " select * tasks  where id = ? "
  
      const values = [ id ]
  
      DB.all(sqlQuery, values, function ( err , data ) {
  
        if (err) {
          result(err, null)
          return
        }
  
        result( null, data )
  
      })
  
  
    }
  
  
    static deleteTask(id, result){
  
  
      const sqlQuery = " delete from  tasks  where id = ?"
  
      const values = [ id ]
  
      DB.run(sqlQuery, values, function (err) {
  
        if (err) {
          result(err, null)
          return
        }
  
        if( this.changes ){
          result(null, this.changes)
          return
        }
  
        result( null, null )
  
      }
  
  )
  
  
    }
  
  }
  
  
  // console.log( new Date().toString() )