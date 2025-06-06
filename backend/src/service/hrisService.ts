import { getEmployees } from '../http/stackOneHris';

export const listAllEmployees = async (accountId: string, next: string) => {
  return await getEmployees(accountId, next);
};
