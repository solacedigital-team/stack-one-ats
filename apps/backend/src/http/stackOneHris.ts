import axios from "axios";
import { config } from "../env.js";
import { AxiosError } from "./errorHandler.js";

export const getEmployees = async (accountId: string, next: string) => {
let url = `${config.STACKONE_HRIS_URL}/employees?page_size=25`;

	if (next) {
		url += `&next=${encodeURIComponent(next)}`;
	}

	try {
		const response = await axios.get(url, {
			headers: {
				accept: "application/json",
				"x-account-id": `${accountId}`,
				authorization: `Basic ${config.STACKONE_API_KEY}`,
			},
		});
		return response.data;
	} catch (error) {
		AxiosError(error);
	}
};
