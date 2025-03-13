import express from "express"
import { createProject , getProject , getAllProject ,updateProject , deleteProject  } from "../controller/project.controller.js"

const projectRouter = express.Router()


// Create
projectRouter.post( "/" , createProject )

// get all 
projectRouter.get( "/" , getAllProject )

// Read
projectRouter.get( "/:id" , getProject )

// Update
projectRouter.put( "/:id" , updateProject  )

// Delete
projectRouter.delete( "/:id" , deleteProject )

export default  projectRouter 

