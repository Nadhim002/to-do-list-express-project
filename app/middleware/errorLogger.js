import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const relativeFilePath = "../../logs/error.log"
const absoluteFilePath = path.resolve(__dirname, relativeFilePath)

function errLogger(err, req, res, next) {

  const errMessage = err.message + " " + `time : ${Date.now().toString() }`
  const methodAndEndPoint = `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`

  const logMessage =  methodAndEndPoint + "\n" +  errMessage +"\n"

  fs.appendFile(absoluteFilePath, logMessage, (err) => {
    if (err) {
      console.log("Could not write error log")
    }
  })

  res.status(500).json({"errMessage" : err.message  , errStack : err.stack  })

  next()

}

export default errLogger

