import axios from "axios";
import { config } from "../env.js";
import { AxiosError } from "./errorHandler.js";

export interface StatusReason {
	code: string;
	description: string;
	timestamp: string;
}

export interface Account {
	id: string;
	provider: string;
	provider_name: string;
	status: string;
	status_reasons: StatusReason[];
	origin_owner_id: string;
	origin_owner_name: string;
	origin_username: string;
	credentials: Record<string, unknown>;
	setup_information: Record<string, unknown>;
	label: string;
	created_at: string;
	updated_at: string;
}

export const getAllAccounts = async () => {
	const url = `${config.STACKONE_BASE_URL}/accounts`;
	try {
		const response = await axios.get<Account[]>(url, {
			headers: {
				accept: "application/json",
				authorization: `Basic ${config.STACKONE_API_KEY}`,
			},
		});

		return response.data;
	} catch (error) {
		AxiosError(error);
	}
};

export const getAccountMeta = async (id: string) => {
	const url = `${config.STACKONE_BASE_URL}/accounts/${id}/meta`;
	try {
		const response = await axios.get<{ category: "ats" | "hris" }>(url, {
			headers: {
				accept: "application/json",
				authorization: `Basic ${config.STACKONE_API_KEY}`,
			},
		});

		return response.data;
	} catch (error) {
		AxiosError(error);
	}
};
