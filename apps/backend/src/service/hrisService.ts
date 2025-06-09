import { getEmployees } from "../http/stackOneHris.js";

export const listAllEmployees = async (accountId: string, next: string) => {
	return await getEmployees(accountId, next);
};
