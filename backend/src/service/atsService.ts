import { JobsList } from '../dto/jobsDto';
import { getJobs ,getApplications } from '../http/stackOneAts';


export const listAllJobs = async (accountId: string, next: string): Promise<JobsList> => {
  return await getJobs(accountId, next);
};

export const listAllApplications = async (accountId: string, next: string) => {
  return await getApplications(accountId, next);
};