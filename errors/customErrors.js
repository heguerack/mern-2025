import { StatusCodes } from 'http-status-codes'

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError' //optional
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequest'
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnAuthenticatedError'
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export class UnUNAUTHORIZEDError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnUNAUTHORIZEDError'
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
