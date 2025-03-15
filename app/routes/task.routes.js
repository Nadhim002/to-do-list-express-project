import express from "express"
import { createTask , getTask ,  updateTask  ,  deleteTask   } from "../controller/task.controller.js"


// In GET endpoint of tasks, user should be able to filter by project_id, due_date, is_completed and created at


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