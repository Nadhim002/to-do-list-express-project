import { Project } from "../model/project.model.js"

// @desc  Create new project
// @route  POST /project

export function createProject(req, res, next) {
  const project = new Project(req.body)

  if (!project["name"]) {
    res
      .status(400)
      .json({ msg: `Project Name is mandatory for Creating Projects` })
    return
  }

  if( !project["user_id"] ){
    res
    .status(400)
    .json({ msg: `User id is mandatory for Creating Projects` })
   return

  }

  project
    .createProject()
    .then(([lastID, _]) => {
      res
        .status(200)
        .json({ msg: `Project has been added with id - ${lastID}` })
    })
    .catch( err => next(err))
}

// @desc   Update a project  by ID
// @route  PUT /project/:id

export function updateProject(req, res, next) {
  
  const idToUpdate = parseInt(req.params?.id)

  if (isNaN(idToUpdate)) {
    res.status(400).json({ msg: `Project ID must be a Number` })
    return
  }

  const project = new Project(req.body)

  if (!project["name"]) {
    res
      .status(400)
      .json({ msg: `Project Name is mandatory for Updating Projects` })
    return
  }

  project
    .updateProject(idToUpdate)
    .then(([_, changes]) => {
      if (changes) {
        res
          .status(200)
          .json({ msg: `Project  with id - ${idToUpdate} has been updated ` })
        return
      }

      res
        .status(400)
        .json({ msg: `Project  with id - ${idToUpdate} has not found` })
    })
    .catch((err) => next(err))
}

// @desc   Delete a project by ID
// @route  DELETE /project/:id

export function deleteProject(req, res, next) {
  const idToDelete = parseInt(req.params?.id)

  if (isNaN(idToDelete)) {
    res.status(400).json({ msg: `Project ID must be a Number` })
    return
  }

  Project.deleteProject(idToDelete)
    .then(([_, changes]) => {
      if (changes) {
        res
          .status(200)
          .json({
            msg: `Project with Id ${idToDelete} has been deletes sucessfully`,
          })
        return
      }

      res.status(400).json({ msg: `Project Id ${idToDelete} not found` })
    })
    .catch((err) => next(err))
}

// @desc   Get a single project by ID
// @route  GET /project/:id

export function getProject(req, res, next) {
  const idToGet = parseInt(req.params?.id)

  if (isNaN(idToGet)) {
    res.status(400).json({ msg: `Project ID must be a Number` })
    return
  }

  Project.getProject(idToGet)
    .then((data) => {
      if (data) {
        res.status(200).json(data)
        return
      }

      res.status(400).json({ msg: `Project Id ${idToGet} not found` })
    })
    .catch((err) => {
      next(err)
    })
}

// @desc   Get all projects
// @route  GET /project

export function getAllProject(req, res, next) {

  Project.getAllProject()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
    
}
