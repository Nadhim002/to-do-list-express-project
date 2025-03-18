import sqlite3 from "sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const relativePath = "../database/database.db"
const absolutePath = path.resolve(__dirname, relativePath)

const sqlite = sqlite3.verbose()

const DB = new sqlite.Database( absolutePath , sqlite3.OPEN_READWRITE ,  connectedCallBack )

function connectedCallBack(err) {
  if (err) {
    console.log(err.message)
    return
  }

  console.log("DB Connection Created Sucessfully")
}

class dBCallWithPromise {
  
  static run(sqlQuery, values) {
    if (!values) {
      values = []
    }

    return new Promise(function (res, rej) {
      DB.run(sqlQuery, values, function (err) {
        if (err) {
          rej(err)
        }

        res([this.lastID, this.changes])
      })
    })
  }

  static get(sqlQuery, values) {
    if (!values) {
      values = []
    }

    return new Promise(function (res, rej) {
      DB.get(sqlQuery, values, function (err, row) {
        if (err) {
          rej(err)
        }

        res(row)
      })
    })
  }

  static all( sqlQuery, values ) {

    if (!values) {
      values = []
    }

    return new Promise(function (res, rej) {
      DB.all(sqlQuery, values, function (err, rows) {
        if (err) {
          rej(err)
        }

        res(rows)
      })
    })
  }
}

export default dBCallWithPromise 