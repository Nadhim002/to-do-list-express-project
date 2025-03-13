import dotenv from "dotenv"
import express from "express"

import taskRouter from "./app/routes/task.routes.js"
import projectRouter from "./app/routes/project.routes.js"

import logger from "./app/middleware/logger.js"

dotenv.config()

const PORT =  process.env.PORT || 8080

const app = express()

app.use( express.json() )
app.use( express.urlencoded( { extended : true } ) )

app.use( logger )

app.get("/", ( req  , res  ) => { res.status(200).json({msg : "Server Working "} ) } )

app.use( "/task" , taskRouter )
app.use( "/project" , projectRouter )


app.listen( PORT , () => { console.log(`Server started at http://localhost:${PORT}/`) } )