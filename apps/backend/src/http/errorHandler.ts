import axios from "axios";
import {
	ForbiddenRequestError,
	InvalidRequestError,
	NotImplementedError,
	PreconditionFailedError,
	ServerError,
	TooManyRequestsError,
	UnhandledError,
} from "../errors/stackoneErrors.js";

export const AxiosError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		const errorMessage = error.response?.data?.message || "An error occurred";
		switch (error.response?.status) {
			case 400:
				throw new InvalidRequestError(errorMessage);
			case 403:
				throw new ForbiddenRequestError(errorMessage);
			case 412:
				throw new PreconditionFailedError(errorMessage);
			case 429:
				throw new TooManyRequestsError(errorMessage);
			case 500:
				throw new ServerError(errorMessage);
			case 501:
				throw new NotImplementedError(errorMessage);
			default:
				throw new UnhandledError(
					`Unexpected error: ${error.response?.status} - ${errorMessage}`,
				);
		}
	}
	throw new UnhandledError(`Unexpected error: ${error}`);
};
