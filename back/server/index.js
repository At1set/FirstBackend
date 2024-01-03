const http = require('http')
const { config, MYSQL_CONFIG, mimeTypes } = require("./config.js");
const fs = require('fs');
const path = require('path');
const { unescape } = require("querystring")

const middlewares = require("./services/Middlewares/middleware.js")

const user_controller = require("./services/User-controler.js")
const dataBase = require("./services/database.js");
const ApiError = require('./services/Exceptions/Api-error.js');


var server = http.createServer(async (req, res) => {
  try {
    await middlewares.main(res)

    URL = req.url
    console.log(URL)

    let data = ""
    switch (URL) {
      case "/":
        return await user_controller.sendfile(res, "html/index.html")
      case "/api/users":
        data = await dataBase.get_users()
        if (data) {
          return user_controller.sendEnd(res, JSON.stringify(data), 200, {
            "Content-type": "application/json",
          })
        } else
          return user_controller.sendEnd(
            res,
            JSON.stringify({ status: error }),
            500,
            {
              "Content-type": "application/json",
            }
          )
      case "/registration":
        await user_controller.registration(req, res)
        break
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
            return user_controller.sendEnd(
              res,
              JSON.stringify({
                message: "Данные не были получены сервером!",
              }),
              500,
              { "Content-type": "application/json" }
            )
          })
        return user_controller.sendEnd(
          res,
          JSON.stringify({ status: "Ok" }),
          200,
          { "Content-type": "application/json" }
        )
      default:
        URL = unescape(URL)
        console.log("Запрос на ", URL)
        const extname = String(path.extname(URL)).toLowerCase()
        if (extname in mimeTypes) user_controller.sendfile(res, URL)
        else throw ApiError.NotFound()
        break
    }
  } catch (error) {
    middlewares.ErrorHandler(error, req, res)
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