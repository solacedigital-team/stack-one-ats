class StackOneError extends Error {
    code: string;
    status: number;

    constructor(message: string, code: string, status: number) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

class InvalidRequestError extends StackOneError {
    constructor(message: string) {
        super(message, 'INVALID_REQUEST', 400);
    }
}

class ForbiddenRequestError extends StackOneError {
    constructor(message: string) {
        super(message, 'FORBIDDEN_REQUEST', 403);
    }
}

class PreconditionFailedError extends StackOneError {
    constructor(message: string) {
        super(message, 'PRECONDITION_FAILED',   412);
    }
}

class TooManyRequestsError extends StackOneError {
    constructor(message: string) {
        super(message, 'TOO_MANY_REQUESTS', 429);
    }
}

class ServerError extends StackOneError {
    constructor(message: string) {
        super(message, 'SERVER_ERROR', 500);
    }
}

class NotImplementedError extends StackOneError {
    constructor(message: string) {
        super(message, 'NOT_IMPLEMENTED', 501);
    }
}

class UnhandledError extends StackOneError {
    constructor(message: string) {
        super(message, 'UNHANDLED_ERROR', 500);
    }
}

export { InvalidRequestError, ForbiddenRequestError, PreconditionFailedError, TooManyRequestsError, ServerError, NotImplementedError, UnhandledError };
