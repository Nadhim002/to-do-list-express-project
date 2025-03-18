import dBCallWithPromise from "./app/config/promiseBasedDbCalls.js"

const NO_OF_USERS = 1000 

const NO_OF_PROJECTS = 1000000
const BATCH_SIZE_FOR_PROEJCT = 10000

const NO_OF_TASKS = 10000000  
const BATCH_SIZE_FOR_TASK = 100000

async function fakeUserGenerator(noOfusers) {
  const values = []

  for (let user = 1; user < noOfusers + 1; user++) {
    values.push([`User-${user}`, `user${user}@gmail.com`])
  }

  const sqlQuery = `INSERT INTO users (user_name, user_mail) VALUES ${values
    .map(() => "(?, ?)")
    .join(", ")}`
  const flatValues = values.flat()

  return await dBCallWithPromise.run(sqlQuery, flatValues)
}


async function fakeProjectCreater(nooFProjects, batchSize) {

  let promiseResolver = []
    
  let userIds = await dBCallWithPromise.all("select user_id from users")

  userIds = userIds.map((user_id) => user_id.user_id)
  const colors = ["red", "white", "black", "yellow", "blue"]
  const colorsLength = colors.length
    
  for ( let batchNo =  1 ; batchNo < nooFProjects / batchSize + 1 ; batchNo++ ) {
  
    const values = []

    for (let entry = 1 ; entry < batchSize + 1 ; entry++) {
      values.push([
        `project_${batchNo}_${entry}`,
        colors[Math.floor(Math.random() * colorsLength)],
        userIds[Math.floor(Math.random() * userIds.length)],
      ])
    }

    const flatValues = values.flat()
    const sqlQuery = `INSERT INTO projects (project_name,  color , user_id) VALUES ${values
      .map(() => "(?, ? , ? )")
      .join(", ")}`

    promiseResolver.push(dBCallWithPromise.run(sqlQuery, flatValues))
  }

  return  Promise.all(promiseResolver)
}

async function createFakeTasks(totalProjects, totalTasks, batchSize) {

  const tasksPerProject = Math.ceil(totalTasks / totalProjects)
  const projectsPerBatch = Math.floor(batchSize / tasksPerProject)
  const totalBatches = Math.ceil(totalProjects / projectsPerBatch)

  console.log( "Total No Of batches "  , totalBatches )

  for (let batchNum = 0; batchNum < totalBatches; batchNum++) {

    console.log( "Working on Batch :  "  , batchNum + 1 ) 

    const offset = batchNum * projectsPerBatch
    const limit = projectsPerBatch
    
    const projectIds = await extractProjectIds(limit, offset)
    await createTasksForProjects(projectIds, tasksPerProject)
    
  }
  
  return Promise.resolve()
}

async function extractProjectIds(limit, offset) {
  return await dBCallWithPromise
    .all("SELECT project_id FROM projects LIMIT ? OFFSET ?", [limit, offset])
    .then((data) => data.map(row => row.project_id))
}

async function createTasksForProjects(projectIds, tasksPerProject) {

  return  Promise.all(
    projectIds.map(projectId => createTasksForSingleProject(projectId, tasksPerProject))
  )

}

async function createTasksForSingleProject(projectId, tasksCount) {
  const values = []
  
  for (let taskNum = 1; taskNum <= tasksCount; taskNum++) {
    values.push([
      `content_${projectId}_${taskNum}`,
      `description_${projectId}_${taskNum}`,
      new Date().toISOString().split('T')[0],
      Math.random() < 0.5 ? 0 : 1,
      projectId
    ])
  }
    
  const sqlQuery = `INSERT INTO tasks (task_content, task_description, due_date, is_completed, project_id) VALUES ${values.map(() => "(?, ?, ?, ?, ?)").join(", ")}`
  const flatValues = values.flat()
  
  return dBCallWithPromise.run(sqlQuery, flatValues)
}

export function fakeDataGenerator(req, res, next) {
  dBCallWithPromise
    .run("BEGIN TRANSACTION") 
    .then(() => fakeUserGenerator(NO_OF_USERS))
    .then(() => {
      console.log(`${NO_OF_USERS} users have been created`)
      return fakeProjectCreater(NO_OF_PROJECTS, BATCH_SIZE_FOR_PROEJCT)
    })
    .then(() => {
      console.log(`${NO_OF_PROJECTS} projects have been created`)
      return createFakeTasks( NO_OF_PROJECTS ,NO_OF_TASKS, BATCH_SIZE_FOR_TASK)
    })
    .then(() => {
      console.log(`${NO_OF_TASKS} tasks have been created`)
      return dBCallWithPromise.run("COMMIT")
    })
    .then(() => {
      res.status(200).json({ msg: "Successfully created all data" })
    })
    .catch((err) => {
      dBCallWithPromise.run("ROLLBACK").catch(console.error)
      next(err)
    })
}
