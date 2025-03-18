import { db, taskTable } from "../config/drizzle.config.js"
import { and, eq, gte, lte , gt  } from "drizzle-orm"

export class Task {

  constructor(task) {
    this.content = task.content
    this.description = task.description || "No Description"
    this.dueDate = task.dueDate || null
    this.isCompleted = task.isCompleted || 0
    this.projectId = task.projectId
  }

  createTask() {
    return db
      .insert(taskTable)
      .values({
        taskContent: this.content,
        taskDescription: this.description,
        dueDate: this.dueDate,
        isCompleted: this.isCompleted,
        projectId: this.projectId,
      })
      .returning()
  }

  updateTask(idToUpdate) {
    return db
      .update(taskTable)
      .set({
        taskContent: this.content,
        taskDescription: this.description,
        dueDate: this.dueDate,
        isCompleted: this.isCompleted,
        projectId: this.projectId,
      })
      .where(eq(taskTable.taskId, idToUpdate))
      .returning()
  }

  static deleteTask(idToDelete) {
    return db.delete(taskTable).where(eq(taskTable.taskId, idToDelete)).returning() 
  }

  static getTask(filters) {

    const constraints = []

    if( filters.lastSeenTaskId ){
      constraints.push(gt(taskTable.taskId , filters.lastSeenTaskId))
    }

    if (filters.dueStartDate) {
      constraints.push(gte(taskTable.dueDate, filters.dueStartDate))
    }

    if (filters.dueEndDate) {
      constraints.push(lte(taskTable.dueDate, filters.dueEndDate))
    }

    if (filters.CreatedStartDate) {
      constraints.push(gte(taskTable.createdAt, filters.CreatedStartDate))
    }

    if (filters.CreatedEndDate) {
      constraints.push(lte(taskTable.createdAt, filters.CreatedEndDate))
    }

    if (filters.isCompleted) {
      constraints.push(lte(taskTable.isCompleted, filters.isCompleted))
    }

    if ( filters.projectId ){
      constraints.push(eq(taskTable.projectId, filters.projectId))
    }

    return db.select().from( taskTable ).where(and(...constraints)).limit( filters.pageSize )

  }
}
