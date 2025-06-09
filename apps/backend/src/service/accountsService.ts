import { getAccountMeta, getAllAccounts, getAccountById as getAccountByIdHttp } from "../http/stackOneAccounts.js";

export const listAllAccounts = async () => {
	return await getAllAccounts();
};

export const listAccountsByCategory = async (category: "hris" | "ats") => {
	const accounts = await getAllAccounts();
	if (!accounts) return [];

	// Array.filter() doesn't work with async predicates
	// We need to resolve all promises first, then filter
	const accountsWithMeta = await Promise.all(
		accounts.map(async (account) => {
			const meta = await getAccountMeta(account.id);
			return { account, isHris: meta?.category === category };
		}),
	);

	return accountsWithMeta
		.filter((item) => item.isHris)
		.map((item) => item.account);
};

export const getAccountById = async (id: string) => {
	const account = await getAccountByIdHttp(id);
	if (!account) {
		return null; // Or throw a specific error
	}
	const meta = await getAccountMeta(id);
	return { ...account, meta };
};
