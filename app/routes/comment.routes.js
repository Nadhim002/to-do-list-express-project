import express from "express"
import { createComment , getComment , updateComment , deleteComment } from  "../controller/comment.controller.js"

const commentRouter = express.Router() 

commentRouter.post("/" ,  createComment )

commentRouter.get("/:projectId" , getComment )

commentRouter.patch("/:id" , updateComment  )

commentRouter.delete("/:id"  , deleteComment  )


export default commentRouter  
