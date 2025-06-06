import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import {
	ForbiddenRequestError,
	InvalidRequestError,
	NotImplementedError,
	PreconditionFailedError,
	ServerError,
	TooManyRequestsError,
	UnhandledError,
} from "../errors/stackoneErrors.js";

export const isKnownError = (
	error: unknown,
): error is
	| InvalidRequestError
	| ForbiddenRequestError
	| PreconditionFailedError
	| TooManyRequestsError
	| ServerError
	| NotImplementedError
	| UnhandledError => {
	return (
		error instanceof InvalidRequestError ||
		error instanceof ForbiddenRequestError ||
		error instanceof PreconditionFailedError ||
		error instanceof TooManyRequestsError ||
		error instanceof ServerError ||
		error instanceof NotImplementedError ||
		error instanceof UnhandledError
	);
};

export const handleErrorResponse = (error: unknown, c: Context) => {
	if (isKnownError(error)) {
		return c.json(
			{ code: error.code, message: error.message },
			error.status as ContentfulStatusCode,
		);
	}
	return c.json({ message: "An unexpected error occurred." }, 500);
};
