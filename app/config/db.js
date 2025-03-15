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
                                            is_favorite integer default 0 ,
                                            user_id integer not null , 
                                            FOREIGN KEY ( user_id ) REFERENCES users( user_id ) ON DELETE CASCADE
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

const sqlQueryToCreateUserTable = `
                                    create table if not exists users(
                                            user_id integer primary key AUTOINCREMENT , 
                                            user_name text not null ,
                                            user_mail text not null unique 
                                    ) ;
                                  `

const sqlQueryToCreateCommentTable =  `
                                      create table if not exists comments (
                                          comment_id integer primary key   AUTOINCREMENT , 
                                          comment_content text not null , 
                                          project_id integer not null , 
                                          task_id integer , 
                                          FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE , 
                                          FOREIGN KEY (task_id) REFERENCES tasks(task_id) ON DELETE CASCADE 
                                      ) ; 
                                      `

const sqlQueryForeignKeyEnabling =  ' PRAGMA foreign_keys = ON ; '

DB.exec(  sqlQueryForeignKeyEnabling + sqlQueryToCreateProjectTable + sqlQueryToCreateTaskTable + sqlQueryToCreateUserTable + sqlQueryToCreateCommentTable  , 

        function(err) {
          if (err) {
            console.log(err.message)
            return
          }
        
          console.log("Table Created Sucessfully")
          
        }
        
)


export default DB 