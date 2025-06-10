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
        console.error(`Account with ID ${id} not found`);
        throw new Error(`Account with ID ${id} not found`);
    }
    const meta = await getAccountMeta(id);
    if (!meta) {
        console.error(`Meta data for account ID ${id} not found`);
        throw new Error(`Meta data for account ID ${id} not found`);
    }
    return { ...account, meta };
};
