import dBCallWithPromise from "./app/config/promiseBasedDbCalls.js"

const BATCH_SIZE = 10000
const NO_OF_PROJECTS = 1000000

async function fakeUserGenerator(noOfusers) {
  const values = []

  for (let user = 1; user < noOfusers + 1; user++) {
    values.push([`User-${user}`, `user${user}@gmail.com`])
  }

  const sqlQuery = `INSERT INTO users (user_name, user_mail) VALUES ${values
    .map(() => "(?, ?)")
    .join(", ")}`
  const flatValues = values.flat()

  return dBCallWithPromise.run(sqlQuery, flatValues)
}

async function fakeProjectCreater(nooFProjects, batchSize) {
  let promiseResolver = []

  let userIds = await dBCallWithPromise.all("select user_id from users")

  userIds = userIds.map((user_id) => user_id.user_id)
  const colors = ["red", "white", "black", "yellow", "blue"]
  const colorsLength = colors.length

  for (let project = 0; project < nooFProjects / batchSize; project++) {
    const values = []

    for (let each = 0; each < batchSize; each++) {
      values.push([
        `project_${project}_${each}`,
        colors[Math.floor(Math.random() * colorsLength)],
        userIds[Math.floor(Math.random() * userIds.length)],
      ])
    }

    const flatValues = values.flat()
    const sqlQuery = `INSERT INTO projects (project_name,  color , user_id) VALUES ${values
      .map(() => "(?, ? , ? )")
      .join(", ")}`

    promiseResolver.push( dBCallWithPromise.run(sqlQuery, flatValues) )
  }

  return await Promise.all(promiseResolver)
}

const a = await fakeProjectCreater(NO_OF_PROJECTS , BATCH_SIZE )

