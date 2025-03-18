import { sql } from 'drizzle-orm';
import  DB  from './db.js'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sqliteTable, integer, text  } from 'drizzle-orm/sqlite-core';

export const db = drizzle( DB )

export const userTable = sqliteTable( "users" , {
    userId : integer("user_id").primaryKey( { autoIncrement : true} ) , 
    userName : text("user_name").notNull() , 
    userMail : text("user_mail").notNull().unique()
})

export const projectTable = sqliteTable( "projects" , {
    projectId : integer("project_id").primaryKey( { autoIncrement : true} ) ,
    projectName : text("project_name").notNull() , 
    color : text("color").notNull() , 
    isFavorite : integer("is_favorite").default(0) ,
    userId : integer("user_id").notNull().references( () => userTable.userId   , {onDelete : "cascade"}  )
})                          

export const taskTable = sqliteTable("tasks" , {
    taskId : integer("task_id").primaryKey( {autoIncrement : true } ) , 
    taskContent : text("task_content").notNull() , 
    taskDescription : text("task_description").notNull() , 
    dueDate : text("due_date") , 
    isCompleted : integer("is_completed").notNull() ,
    createdAt : text("created_at").default( sql`CURRENT_TIMESTAMP` ) , 
    projectId : integer("project_id").notNull().references( () => projectTable.projectId , {onDelete : "cascade"} )
} )

export const commentTable = sqliteTable("comments" , {
    commentId : integer("comment_id").primaryKey( {autoIncrement : true } ) , 
    commentContent : text("comment_content").notNull() , 
    taskId :  integer("task_id").references( () => taskTable.taskId , {onDelete : "cascade"} ) ,
    projectId : integer("project_id").references( () => projectTable.projectId , {onDelete : "cascade"} )
    } )


 