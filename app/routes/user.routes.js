import { addUser , deleteuser } from "../controller/user.controller.js"

import express from  "express"

const userRouter = express.Router() 

userRouter.post("/" , addUser )

userRouter.delete("/:id" ,deleteuser  )

export default userRouter