import dBCallWithPromise from "../config/promiseBasedDbCalls.js"

export class Task {

  constructor(task) {
    this.content = task.content
    this.description = task.description || "No Description"
    this.dueDate = task.dueDate || null
    this.isCompleted = task.isCompleted || 0
    this.project_id = task.project_id
  }

  createTask() {
    const sqlQuery =
      "insert into tasks ( task_content , task_description , due_date  , is_completed , project_id ) values( ? , ? , ? , ? , ? )"
    const values = [
      this.content,
      this.description,
      this.dueDate,
      this.isCompleted,
      this.project_id,
    ]
    return dBCallWithPromise.run(sqlQuery, values)
  }

  updateTask(id) {
    const sqlQuery =
      "update tasks set task_content = ? , task_description = ? ,  due_date = ? , is_completed  = ? , project_id  = ?   where task_id = ? "
    const values = [
      this.content,
      this.description,
      this.dueDate,
      this.isCompleted,
      this.project_id,
      id,
    ]
    return dBCallWithPromise.run(sqlQuery, values)
  }

  static deleteTask(id) {
    const sqlQuery = " delete from  tasks  where task_id = ?"

    const values = [id]
    return dBCallWithPromise.run(sqlQuery, values)
  }

  static getTask(filters) {

    let sqlQuery = " select * from tasks"
    let sqlAdder = []
    const values = []

    if( filters.due_start_date ){
      sqlAdder.push( " due_date >= ? " )
      values.push( filters.due_start_date )
    }

    if ( filters.due_end_date ){
      sqlAdder.push( " due_date <= ? " )
      values.push( filters.due_end_date )
    }

    if( filters.created_start_date ){
      sqlAdder.push( " created_at >= ? " )
      values.push( filters.created_start_date )
    }

    if ( filters.created_end_date ){
      sqlAdder.push( " created_at <= ? " )
      values.push( filters.created_end_date )
    }

    if ( filters.isCompleted ){
      sqlAdder.push( " is_completed = ? " )
      values.push( filters.isCompleted )
    }

    if( values.length > 0 ){
      sqlQuery += " where " + sqlAdder.join("and")

    }

    return dBCallWithPromise.all(sqlQuery, values)

  }

}

