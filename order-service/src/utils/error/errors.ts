import { StatusCodes } from "http-status-codes";

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly message: string;

  constructor(name: string, status: number, description: string) {
    super(description);
    this.name = name;
    this.status = status;
    this.message = description;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// Internal server error
export class APIError extends BaseError {
  constructor(message = "api error") {
    super("APIError", StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

// validation error
export class validationError extends BaseError {
  constructor(message = "validation error") {
    super("ValidationError", StatusCodes.BAD_REQUEST, message);
  }
}

// aauthentication error
export class AuthorizeError extends BaseError {
  constructor(message = "unauthorized access") {
    super("AuthorizeError", StatusCodes.UNAUTHORIZED, message);
  }
}

// not found error
export class NotFoundError extends BaseError {
  constructor(message = "resource not found") {
    super("NotFoundError", StatusCodes.NOT_FOUND, message);
  }
}
