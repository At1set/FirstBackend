const path = require('path')
const fs = require('fs')
const { mimeTypes } = require("../config.js")
const dataBase = require("./database.js")
const { BadRequest } = require('./Exceptions/Api-error.js')

module.exports = class User_controller {
  static async sendfile (res, filePath) {
    return new Promise((resolve, reject) => {
      try {
        let ext = path.extname(filePath)
        fs.readFile(
          path.join("./back/public/", filePath),
          { encoding: "utf-8", flag: "r" },
          (err, data) => {
            if (err) {
              return reject(
                BadRequest(
                  `Сервер не может прочитать файл ${filePath}!`,
                  err.message
                )
              )
            }
            res.setHeader("Content-type", mimeTypes[ext])
            return resolve(res.end(data))
          }
        )
      } catch (error) {
        reject(error)
      }
    }).catch(error => {throw error;})
  }

  static sendEnd (res, data, statusCode = 200, resHeaders) {
    res.writeHead(statusCode, resHeaders)
    return res.end(data)
  }

  static async get_reqBody(req) {
    return new Promise((resolve, reject) => {
      let data = ""
      req.on("data", (chunk) => {
        data += chunk
      })
      req.on("end", async () => {
        try {
          const req_body = JSON.parse(data)
          resolve([req_body, null])
        } catch (error) {
          reject([null, error])
        }
      })
    }).catch((error) => error)
  }

  static async registration (req, res) {
    await new Promise(async (resolve, reject) => {
      try {
        const [req_body, error] = await this.get_reqBody(req)
        if (error) throw BadRequest("Не удалось прочитать тело запроса!", error.message) // Не удалось прочитать тело запроса
        let response = await dataBase.send_query(
          `INSERT IGNORE INTO first_backend (name, email, password) VALUES ('${req_body.name}', '${req_body.email}', '${req_body.password}')`
        )

        if (!response) {
          console.log("Сервер не смог занести данные в базу данных!")
          reject(error)
        }
        
        resolve(null)
      } catch (error) {
        reject(error)
      }
    }).catch(error => {
      throw error;
    })

    return this.sendEnd(res, JSON.stringify({ status: "Ok" }), 200, {"Content-type": "application/json"})
  }
}