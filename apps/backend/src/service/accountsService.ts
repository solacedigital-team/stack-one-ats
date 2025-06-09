import { getAccountMeta, getAllAccounts } from "../http/stackOneAccounts.js";

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

// need a getAccountById function that will containt account + meta ai
