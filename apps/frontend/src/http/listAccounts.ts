import { hc } from "@repo/api-client";
import { errorHandler, handleResponse } from "./apiUtils";

export const listAccounts = async () => {
	try {
		const response = await hc.api.accounts.$get();
		return await handleResponse(response);
	} catch (error) {
		errorHandler(error);
	}
};

export const listAccountsByCategory = async (category: "hris" | "ats") => {
	try {
		const response = await hc.api.accounts.category[":category"].$get({
			param: { category },
		});

		return await handleResponse(response);
	} catch (error) {
		errorHandler(error);
	}
};
