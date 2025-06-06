export const handleResponse = async <T>(response: Response) => {
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return (await response.json()) as T;
};

export const errorHandler = (error: unknown) => {
	console.error("API Error:", error);
	throw error;
};
