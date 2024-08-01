import { getAllAccounts } from "../http/stackOneAccounts";

export const listAllAccounts = async () => {
    return await getAllAccounts();
};