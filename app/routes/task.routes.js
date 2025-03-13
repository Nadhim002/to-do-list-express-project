import express from "express"
import { createTask , getTask ,  updateTask  ,  deleteTask  } from "../controller/task.controller.js"

const taskRouter = express.Router()

// Create
taskRouter.post( "/" , createTask )

// Read
taskRouter.get( "/:id" , getTask )

// Update
taskRouter.put( "/:id" , updateTask )

// Delete
taskRouter.delete( "/:id" , deleteTask )


export default taskRouter 