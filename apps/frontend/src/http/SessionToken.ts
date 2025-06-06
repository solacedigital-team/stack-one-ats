import { hc } from "@repo/api-client";

export const retrieveConnectSessionToken = async () => {
	try {
		const connectSessionResponse =
			await hc.api["session-token"]["connect-session"].$post();

		if (!connectSessionResponse.ok) {
			throw new Error(`HTTP error! status: ${connectSessionResponse.status}`);
		}

		const response = await connectSessionResponse.json();

		if ("token" in response) {
			return { token: response.token };
		}

		throw new Error("Failed to get session token");
	} catch (error) {
		console.error("Error fetching connect session token:", error);
		throw error;
	}
};
