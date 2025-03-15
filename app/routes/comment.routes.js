import express from "express"
import { createComment , getComment , updateComment , deleteComment } from  "../controller/comment.controller.js"

const commentRouter = express.Router() 

commentRouter.post("/" ,  createComment )

commentRouter.get("/:projectId" , getComment )

commentRouter.patch("/:id" , updateComment  )

commentRouter.delete("/:id"  , deleteComment  )


export default commentRouter  

// Generate fake data and insert into todos and projects. Projects 1 million and Todos 10 million
// Add a users table, Columns - name, email should be unique. One user can have multiple projects. On user deletion their data should be deleted from the database
// Add a is_favorite boolean column to the projects table. Default value is false. user should be able to update this column in PUT request
// Add a comments table. Columns - content, posted_at, etc. Comments can be added on both project and tasks. All CRUD endpoints to be implemented

// create table if not exists comments (
//     comment_id integer primary key   AUTOINCREMENT , 
//     comment_content text not null , 
//     project_id integer  , 
//     task_id integer , 
//     FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE , 
//     FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE 
//     CHECK ( project_id IS NOT NULL OR task_id IS NOT NULL  )
// ) ; 