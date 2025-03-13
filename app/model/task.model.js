import dBCallWithPromise from "../config/promiseBasedDbCalls.js"

export class Task {
  constructor(task) {
    this.content = task.content
    this.description = task.description || "No Description"
    this.dueDate = task.dueDate || null
    this.isCompleted = task.isCompleted || 0
    this.project_id = task.project_id
  }

  createTask(result) {
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

  updateTask(id, result) {
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

  static getTask(id, result) {
    const sqlQuery = " select * from tasks  where task_id = ? "
    const values = [id]
    return dBCallWithPromise.all(sqlQuery, values)
  }

  static deleteTask(id, result) {
    const sqlQuery = " delete from  tasks  where task_id = ?"

    const values = [id]
    return dBCallWithPromise.run(sqlQuery, values)
  }
}
