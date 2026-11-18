export class AppError extends Error {
    status;
    isOperational;
    constructor(message, status) {
        super(message);
        this.status = status;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
