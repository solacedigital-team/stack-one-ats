import { AccountData, hc } from "@repo/api-client";
import { errorHandler } from "./apiUtils";

export const listAccounts = async () => {
    try {
        const response = await hc.api.accounts.$get();
        return await response.json();
    } catch (error) {
        throw errorHandler(error);
    }
};

export const listAccountsByCategory = async (category: "hris" | "ats") => {
    try {
        const response = await hc.api.accounts.category[":category"].$get({
            param: { category },
        });
        return await response.json();
    } catch (error) {
        throw errorHandler(error);
    }
};

export const getAccountById = async (accountId: string): Promise<AccountData> => {
    try {
        const response = await hc.api.accounts[":id"].$get({
            param: { id: accountId },
        });

        if (!response.ok) {
            throw new Error(`Account with ID ${accountId} not found`);
        }
        const data = await response.json();
        if (!data) {
            throw new Error(`Account with ID ${accountId} not found`);
        }
        return data;
    } catch (error) {
        throw errorHandler(error);
    }
};
