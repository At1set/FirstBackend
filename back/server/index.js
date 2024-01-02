const http = require('http')
const mysql = require('mysql')
const { config, MYSQL_CONFIG, mimeTypes } = require("./config.js");
const fs = require('fs');
const path = require('path');
const { unescape } = require("querystring")

const middlewares = require("./services/Middlewares/middleware.js")

const { sendfile, sendEnd } = require("./services/server_functions.js")
const dataBase = require("./services/database.js")


let server = http.createServer(async (req, res) => {

  await middlewares.main(res)
  
  URL = req.url
  console.log(URL);

  let data = "";
  switch (URL) {
    case "/":
      return sendfile(res, "html/index.html")
    case "/api/users":
      data = await dataBase.get_users()
      if (data) {
        return sendEnd(res, JSON.stringify(data), 200, {
          "Content-type": "application/json",
        })
      } else return sendEnd(res, JSON.stringify({ status: error }), 500, {
        "Content-type": "application/json",
      })
    case "/registration":
      console.log("reg");
      data = ""
      req.on("data", (chunk) => {
        data += chunk
      })
      req
        .on("end", async () => {
          try {
            const res_body = JSON.parse(data)
            let response = await dataBase.send_query(
              `INSERT IGNORE INTO first_backend (name, email, password) VALUES ('${res_body.name}', '${res_body.email}', '${res_body.password}')`
            )
            response
              ? console.log(
                  `Данные пользователя ${res_body.name} были успешно занесены в базу данных!`
                )
              : console.log("Сервер не смог занести данные в базу данных!")
          } catch (error) {console.log(error);}
        })
        .on("error", (error) => {
          console.log(error)
          return sendEnd(
            res,
            JSON.stringify({
              message: "Данные не были получены сервером!",
            }),
            500,
            { "Content-type": "application/json" }
          )
        })
      return sendEnd(res,JSON.stringify({status: "Ok",}),200,{ "Content-type": "application/json" })
    case "login":
      data = ""
      req.on("data", (chunk) => {
        data += chunk
      })
      req
        .on("end", async () => {
          try {
            const res_body = JSON.parse(data)
          } catch (error) {}
        })
        .on("error", (error) => {
          console.log(error)
          return sendEnd(
            res,
            JSON.stringify({
              message: "Данные не были получены сервером!",
            }),
            500,
            { "Content-type": "application/json" }
          )
        })
      return sendEnd(res,JSON.stringify({status: "Ok",}),200,{ "Content-type": "application/json" })
    default:
      URL = unescape(URL)
      console.log("Запрос на ", URL)
      const extname = String(path.extname(URL)).toLowerCase()
      if (extname in mimeTypes) sendfile(res, URL)
      break
  }
})

const connect_toMysql = async () => {
  console.log("Подключение к базе данных...")
  let response = await dataBase.mysql_connection()
  return response
}

async function main() {
  const response = await connect_toMysql()

  if (response) console.log("Соединение с базой данных установлено!")
  else return console.log("Сервер не смог подключиться к базе данных!\nОстановка сервера...")

  const PORT = config.PORT
  const HOST = config.HOST
  server.listen(PORT, HOST, () => {
    return console.log(`Сервер стартовал на: http://${HOST}:${PORT}`)
  })
}
main()