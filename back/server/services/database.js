const mysql = require("mysql")

async function mysql_connection() {
  return await new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: MYSQL_CONFIG.host,
      user: MYSQL_CONFIG.user,
      password: MYSQL_CONFIG.password,
      database: MYSQL_CONFIG.database,
    })

    connection.connect((err) => {
      if (err) reject(err)
      connection.end()
      resolve(connection)
    })
  }).catch((error) => false)
}

async function send_query(query) {
  return await new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: MYSQL_CONFIG.host,
      user: MYSQL_CONFIG.user,
      password: MYSQL_CONFIG.password,
      database: MYSQL_CONFIG.database,
    })
    connection.connect()
    connection.query(query, (error, results) => {
      if (error) {
        console.log("Произошла ошибка в mysql запросе: ", error)
        return reject(false)
      }
      connection.end()
      if (results) {
        console.log("Результаты запроса: ", results)
        return resolve(results)
      }
      return resolve(true)
    })
  }).catch((error) => {
    console.log("Произошла ошибка в функции send_query: ", error)
    return resolve(false)
  })
}

async function get_users() {
  response = await send_query(`SELECT * FROM \`${MYSQL_CONFIG.table}\``)
  if (!response) return false
  let data = {}
  response.forEach((element, index) => {
    data[index] = element
  })
  return data
}

module.exports = {
  send_query,
  get_users,
  mysql_connection,
}