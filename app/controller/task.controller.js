import { Task } from "../model/task.model.js"

export function createTask(req, res, next) {

  const task = new Task(req.body)

  if (!task["content"]) {
    res.status(400).json({ msg: "Task content Cannot be empty" })
    return
  }

  if (!task["project_id"]) {
    res.status(400).json({ msg: "Project ID for task is mandotary" })
    return
  }

  task
    .createTask()
    .then( ( [lastID, _] ) => {
      res.status(200).json({ msg: `Task has been added with id - ${lastID}` })
    })
    .catch((err) => {

      if (
        err.code.includes("SQLITE_CONSTRAINT") &&
        err.message.includes("FOREIGN KEY")
      ) {
        res
          .status(400)
          .json({ msg: `No Project Found with id ${task.project_id}` })
        return
      }

      next(err)

    })

}

export function updateTask(req, res, next) {
  const idToUpdate = req.params?.id

  if (isNaN(idToUpdate)) {
    res.status(400).json({ msg: `Task ID must be a Number` })
    return
  }

  const task = new Task(req.body)

  if (!task["content"]) {
    res.status(400).json({ msg: "Task content Cannot be empty" })
    return
  }

  if (!task["project_id"]) {
    res.status(400).json({ msg: "Project ID for task is mandotary" })
    return
  }

  task.updateTask( idToUpdate )
      .then( ([ _ , change ]) => {

        if (change) {
          res
            .status(200)
            .json({ msg: `Task  with id - ${idToUpdate} has been Updated` })
          return
        }
    
        res
          .status(400)
          .json({ msg: `Task  with id - ${idToUpdate} has is not available` })
      }
       )
      .catch( err => next(err) )

}

export function deleteTask(req, res, next) {
  const idToDelete = req.params?.id

  if (isNaN(idToDelete)) {
    res.status(400).json({ msg: `Task ID must be a Number` })
    return
  }

  Task.deleteTask(idToDelete)
        .then( ( [_ , change ]) => {

          if (change) {
            res.status(200).json({ msg: `The Task with ${idToDelete} is deleted` })
            return
          }
      
          res.status(400).json({ msg: `The Task with ${idToDelete} is not Found` })

        }
        )
        .catch( err => next(err) )


}

export function getTask(req, res, next) {
  const idToGet = req.params?.id

  if (isNaN(idToGet)) {
    res.status(400).json({ msg: `Task ID must be a Number` })
    return
  }

  Task.getTask(idToGet)
  .then( ( row ) => {


    if (row) {
      res.status(200).json(row)
      return
    }

    res.status(400).json({ msg: `The Task with ${idToGet} is not Found` })

  }
  )
  .catch( err => next(err) )


}
