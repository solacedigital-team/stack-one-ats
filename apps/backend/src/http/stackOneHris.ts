import axios from "axios";
import { config } from "../env.js";
import { AxiosError } from "./errorHandler.js";

export type EmployeeData = {
	id: string;
	first_name: string;
	last_name: string;
	remote_id: string;
	created_at: string;
	updated_at: string;
};

export type ListEmployeesResponse = {
	data: EmployeeData[];
};


export const getEmployees = async (accountId: string, next: string) => {
	let url = `${config.STACKONE_HRIS_URL}/employees?page_size=25`;

	if (next) {
		url += `&next=${encodeURIComponent(next)}`;
	}

	try {
		const response = await axios.get<ListEmployeesResponse>(url, {
			headers: {
				accept: "application/json",
				"x-account-id": `${accountId}`,
				authorization: `Basic ${config.STACKONE_API_KEY}`,
			},
		});
		return response.data.data;
	} catch (error) {
		AxiosError(error);
	}
};
