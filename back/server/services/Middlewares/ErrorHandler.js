const ApiError = require("../Exceptions/Api-error.js")
const { sendEnd } = require("../User-controler.js")

module.exports = function ErrorHandler(error, req, res, next) {
  console.log(error);

  if (error instanceof ApiError) {
    return sendEnd(res, JSON.stringify({message: error.message, errors: error.errors}), error.status, { "Content-type": "application/json" })
  } else {
    return sendEnd(res,JSON.stringify({message: "Произошла непредвиденная ошибка!", error: error.message}), 500, { "Content-type": "application/json" })
  }
}