import dotenv from "dotenv"
import express from "express"

import taskRouter from "./app/routes/task.routes.js"
import projectRouter from "./app/routes/project.routes.js"
import commentRouter from "./app/routes/comment.routes.js"

import logger from "./app/middleware/logger.js"
import  errLogger  from "./app/middleware/errorLogger.js"

dotenv.config()

const PORT =  process.env.PORT || 8080

const app = express()

app.use( express.json() )
app.use( express.urlencoded( { extended : true } ) )

app.use( logger )

app.get("/", ( req  , res  ) => { res.status(200).json( { msg : "Server Working " }  ) } )

app.use( "/task" , taskRouter )
app.use( "/project" , projectRouter )
app.use("/comment" , commentRouter  )

app.use( errLogger )

app.listen( PORT , () => { console.log(`Server started at http://localhost:${PORT}/`) } )