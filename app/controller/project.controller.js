import { Project } from "../model/project.model.js"

export function createProject(req, res, next) {

  const project = new Project(req.body)

  if (! project["name"] ){
    res.status(400).json({ msg: `Project Name is mandatory for Creating Projects` })
    return
  }

  project.createProject((err, lastId) => {

    if (err) {
      console.log(err.message)
      res.json({ msg: "Something went Worng " })
      return
    }

    res.status(200).json({ msg: `Project has been added with id - ${lastId}` })
  })
}

export function updateProject(req, res, next) {
  const idToUpdate = parseInt(req.params?.id)

  if (isNaN(idToUpdate)) {
    res.status(400).json({ msg: `Project ID must be a Number` })
    return
  }

  const project = new Project(req.body)

  project.updateProject(
    idToUpdate,

    function (err, changes) {
      if (err) {
        console.log(err.message)
        res.json({ msg: "Something went Worng " })
        return
      }

      if (changes) {
        res
          .status(200)
          .json({
            msg: `Project with Id ${idToUpdate} has been updated sucessfully`,
          })
        return
      }

      res.status(400).json({ msg: `Project Id ${idToUpdate} not found` })
    }
  )
}

export function deleteProject(req, res, next) {
  const idToDelete = parseInt(req.params?.id)

  if (isNaN(idToDelete)) {
    res.status(400).json({ msg: `Project ID must be a Number` })
    return
  }

  Project.deleteProject(idToDelete, (err, changes) => {
    if (err) {
      console.log(err.message)
      res.json({ msg: "Something went Worng " })
      return
    }

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
}

export function getProject(req, res, next) {

  const idToGet = parseInt(req.params?.id)

  if (isNaN(idToGet)) {
    res.status(400).json({ msg: `Project ID must be a Number` })
    return
  }

  Project.getProject(
    idToGet,

    (err, data) => {

      if (err) {
        console.log(err.message)
        res.json({ msg: "Something went Wrong " })
        return
      }

      if( data ){
        res.status(200).json(data)
        return
      }

      res.status(400).json({ msg: `Project Id ${idToGet} not found` })

    }
  )
}

export function getAllProject( req, res, next) {
  
    Project.getAllProject(

      (err, data) => {
  
        if (err) {
          console.log(err.message)
          res.json({ msg: "Something went Wrong " })
          return
        }
  
        res.status(200).json(data)
    
      }
    )
  }


// 

