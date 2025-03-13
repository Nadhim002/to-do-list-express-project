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

const sqlQueryToCreateProjectTable = `
                                    create table if not exists projects (
                                            project_id integer primary key  AUTOINCREMENT , 
                                            project_name text not null , 
                                            color text not null , 
                                            is_favorite integer default 0 
                                    ) ; 
                                    `

const sqlQueryToCreateTaskTable = `
                                    create table if not exists tasks  (
                                            task_id integer primary key   AUTOINCREMENT , 
                                            task_content text not null , 
                                            task_description text not null , 
                                            due_date datetime , 
                                            is_completed integer default 0 , 
                                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP ,
                                            project_id integer not null , 
                                            FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
                                    ) ; 
                                    `

DB.exec( 'PRAGMA foreign_keys = ON' )

DB.exec( sqlQueryToCreateProjectTable + sqlQueryToCreateTaskTable , 
        function(err) {
          if (err) {
            console.log(err.message)
            return
          }
        
          console.log("Table Created Sucessfully")
          
        }
)


export default DB 