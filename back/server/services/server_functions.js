const path = require('path')
const fs = require('fs')
const { mimeTypes } = require("../config.js")

function sendfile(res, filePath) {
  let ext = path.extname(filePath)
  res.setHeader("Content-type", mimeTypes[ext])
  fs.readFile(
    path.join("./back/public/", filePath),
    { encoding: "utf-8", flag: "r" },
    (err, data) => {
      if (err) {
        console.log(err)
        res.statusCode = 404
        res.end()
      }
      return res.end(data)
    }
  )
}

function sendEnd(res, data, statusCode = 200, resHeaders) {
  res.writeHead(statusCode, resHeaders)
  return res.end(data)
}

module.exports = {
  sendfile,
  sendEnd,
}