import { hc } from "@repo/api-client";

export const listEmployess = async (accountId: string) => {
    try {
        const response = await hc.api.hris.employees.$get(
            {},
            {
                headers: {
                    "x-account-id": accountId,
                },
            },
        );

        if (response.status !== 200) {
            throw new Error(`Failed to fetch employees: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees");
    }
};
