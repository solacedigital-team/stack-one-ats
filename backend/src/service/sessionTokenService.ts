import { getSessionToken } from '../http/stackOneSession';

export const connectStackOneSession = async (origin_owner_id: string, origin_owner_name: string) => {
  return await getSessionToken(origin_owner_id, origin_owner_name);
};