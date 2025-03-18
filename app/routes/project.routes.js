import express from "express"
import { createProject , getProjectByUserId  ,updateProject , deleteProject  } from "../controller/project.controller.js"

const projectRouter = express.Router()

// Create
projectRouter.post( "/" , createProject )


// Read
projectRouter.get( "/:id" , getProjectByUserId )

// Update
projectRouter.put( "/:id" , updateProject  )

// Delete
projectRouter.delete( "/:id" , deleteProject )

export default  projectRouter 

