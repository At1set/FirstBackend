const cors = require("./cors.js")
const ErrorHandler = require("./ErrorHandler.js")

async function main(res) {
  cors.disable_cors(res)
}

module.exports = {
  main,
  cors,
  ErrorHandler,
}