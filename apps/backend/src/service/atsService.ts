import { getJobs , getApplications } from '../http/stackOneAts.js';

export const listAllJobs = async (accountId: string, next: string) => {
  return await getJobs(accountId, next);
};

export const listAllApplications = async (accountId: string, next: string) => {
  return await getApplications(accountId, next);
};