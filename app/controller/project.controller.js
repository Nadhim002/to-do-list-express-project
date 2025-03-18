import { not } from "drizzle-orm"
import { Project } from "../model/project.model.js"

// @desc  Create new project
// @route  POST /project

export function createProject(req, res, next) {

  const project = new Project(req.body)

  if ( ! project["projectName"]) {
    res
      .status(400)
      .json({ msg: `Project Name is mandatory for Creating Projects` })
    return
  }

  if ( ! project["userId"]) {
    res.status(400).json({ msg: `User id is mandatory for Creating Projects` })
    return
  }

  if ( ! [ 0 ,1 ].includes( project["isfavorite"]  )  ){
    console.log( project.isfavorite , typeof project.isfavorite  )
    res.status(400).json({ msg: `Enter valid value for isFavorite Projects` })
    return
  }

  project
    .createProject()
    .then((createdRow) => {
      res
        .status(200)
        .json( createdRow )
    })
    .catch((err) => next(err))

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

  if (!project["projectName"]) {
    res
      .status(400)
      .json({ msg: `Project Name is mandatory for Updating Projects` })
    return
  }

  if ( ! [ 0 ,1 ].includes( project["isfavorite"]  )  ){
    res.status(400).json({ msg: `Enter valid value for isFavorite Projects` })
    return
  }



  project
    .updateProject(idToUpdate)
    .then(( updatedRow ) => {
      if (updatedRow.length > 0 ) {
        res
          .status(200)
          .json( updatedRow )
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
    .then(( deletedRow ) => {
      if (deletedRow.length > 0 ) {
        res.status(200).json(deletedRow)
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
    .then((returedRow) => {

      if ( returedRow.length > 0  ) {
        res.status(200).json(returedRow)
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
    .then((returedRows) => {
      res.status(200).json(returedRows)
    })
    .catch((err) => {
      next(err)
    })

}
