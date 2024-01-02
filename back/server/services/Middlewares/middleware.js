const cors = require("./cors.js")

async function main(res) {
  cors.disable_cors(res)
}

module.exports = {
  main,
  cors,
}