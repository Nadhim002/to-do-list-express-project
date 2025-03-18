import { Task } from "../model/task.model.js"

// @desc   Create a new task
// @route  POST /task

export function createTask(req, res, next) {
  const task = new Task(req.body)

  if (!task["content"]) {
    res.status(400).json({ msg: "Task content Cannot be empty" })
    return
  }

  if (!task["projectId"]) {
    res.status(400).json({ msg: "Project ID for task is mandotary" })
    return
  }

  task
    .createTask()
    .then((createdRow) => {
      res.status(200).json(createdRow)
    })
    .catch((err) => {
      if (
        err.code.includes("SQLITE_CONSTRAINT") &&
        err.message.includes("FOREIGN KEY")
      ) {
        res
          .status(400)
          .json({ msg: `No Project Found with id ${task.projectId}` })
        return
      }

      next(err)
    })
}

// @desc   Update a task by ID
// @route  PUT /task/:id

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

  if (!task["projectId"]) {
    res.status(400).json({ msg: "Project ID for task is mandotary" })
    return
  }

  task
    .updateTask(idToUpdate)
    .then((updatedRow) => {
      if (updatedRow.length > 0) {
        res.status(200).json(updatedRow)
        return
      }

      res
        .status(400)
        .json({ msg: `Task  with id - ${idToUpdate} has is not available` })
    })
    .catch((err) => next(err))
}

// @desc   Delete a task by ID
// @route  DELETE /task/:id

export function deleteTask(req, res, next) {
  const idToDelete = req.params?.id

  if (isNaN(idToDelete)) {
    res.status(400).json({ msg: `Task ID must be a Number` })
    return
  }

  Task.deleteTask(idToDelete)
    .then((deleteRow) => {

      console.log( deleteRow )

      if ( deleteRow.length > 0 ) {
        res.status(200).json(deleteRow)
        return
      }

      res.status(400).json({ err: `The Task with ${idToDelete} is not Found` })
    })
    .catch((err) => next(err))
}

// @desc   Get all tasks using filters
// @route  GET /task

export function getTask(req, res, next) {
  const filters = new filterTaskHelper(req.body)

  Task.getTask(filters)
    .then((rows) => {
      res.status(200).json(rows)
    })
    .catch((err) => next(err))
}

function filterTaskHelper(filters) {

  this.lastSeenTaskId = parseInt(filters.lastSeenTaskId)
  this.pageSize = parseInt(filters.pageSize) || 10 

  this.dueStartDate = filters.dueStartDate
  this.dueEndDate = filters.dueEndDate

  this.isCompleted = [0, 1].includes(Number(filters.isCompleted))
    ? 0
    : Number(filters.isCompleted)

  this.CreatedStartDate = filters.CreatedStartDate
  this.CreatedEndDate = filters.CreatedEndDate
  this.projectId = filters.projectId
  
}
