import { prisma } from "@repo/db";
import { Hono } from "hono";
import { handleErrorResponse } from "./routesErrorHandler.js";

export const DbHealthRoute = new Hono().get("/", async (c) => {
	try {
		// Execute a simple query to verify database connection
		const result = await prisma.$queryRaw`SELECT 1 as connected`;

		// Convert any BigInt values to strings to avoid serialization issues
		const serializedResult = JSON.parse(
			JSON.stringify(result, (_, value) =>
				typeof value === "bigint" ? value.toString() : value,
			),
		);

		return c.json(
			{
				status: "ok",
				message: "Database connection successful",
				result: serializedResult,
			},
			200,
		);
	} catch (error: unknown) {
		console.log({ error });
		return handleErrorResponse(error, c);
	}
});
