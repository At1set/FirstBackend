module.exports = class ApiError extends Error {
  status;
  message;
  errors;

  constructor (status, message, errors=[]) {
    super(message)
    this.status = status
    this.message = message
    this.errors = errors
  }

  static NotFound() {
    return new ApiError(404, "Данного ресурса не существует!")
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован!")
  }

  static BadRequest(message, errors) {
    return new ApiError(400, message, errors)
  }
}