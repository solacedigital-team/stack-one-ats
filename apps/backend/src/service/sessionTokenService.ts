import { getSessionToken } from "../http/stackOneSession.js";

export const connectStackOneSession = async () => {
	return await getSessionToken();
};
