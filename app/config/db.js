import Database from 'better-sqlite3'
import path from "path"
import { fileURLToPath } from "url"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const relativePath = "../database/database.db"
export const absolutePath = path.resolve(__dirname, relativePath)


const DB = new Database( absolutePath )


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

const sqlQuerytoAddIndex = `
                           create index if not exists project_user_id_index on projects( user_id ) ; 
                           create index if not exists task_project_id on tasks( project_id ) ; 
                           create index if not exists task_is_completed on tasks( is_completed ) ; 
                           create index if not exists task_due_date on tasks( due_date ) ; 
                           create index if not exists task_created_at on tasks( created_at ) ; 
                           create index if not exists comment_project_id on comments( project_id ) ; 
                           ` 

try {

  DB.exec(sqlQueryForeignKeyEnabling)
  DB.exec(sqlQueryToCreateUserTable)     
  DB.exec(sqlQueryToCreateProjectTable) 
  DB.exec(sqlQueryToCreateTaskTable)    
  DB.exec(sqlQueryToCreateCommentTable) 
  DB.exec(sqlQuerytoAddIndex)

  console.log("Table Created Sucessfully")
  
} catch (err) {
  console.error("Error creating tables:", err.message);
}

export default DB  